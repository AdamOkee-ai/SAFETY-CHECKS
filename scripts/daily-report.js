/* Nightly daily site tracker report.
   Run by .github/workflows/daily-report.yml. Reads the tracker data from Firestore, builds the same PDF
   as the tracker's "Daily report (PDF)" button, saves it on the tracker and sends it to SharePoint.
   Logs only counts, never names: this repository and its job logs are public. */
process.env.TZ = process.env.TZ || 'Europe/London';
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const PdfPrinter = require('pdfmake');
const R = require('../report.js');

const pad2 = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
const CHUNK = 180000;

function reportDate() {
  const asked = (process.env.REPORT_DATE || '').trim();
  if (asked) { if (!/^\d{4}-\d{2}-\d{2}$/.test(asked)) throw new Error('REPORT_DATE must look like 2026-10-21'); return asked; }
  const now = new Date();
  // a run that GitHub starts late, after midnight, still reports on the day that just ended
  if (now.getHours() < 4) now.setDate(now.getDate() - 1);
  return iso(now);
}
function logos() {
  const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const get = name => { const m = app.match(new RegExp('const ' + name + ' = "(data:image/png;base64,[^"]+)"')); return m ? m[1] : null; };
  return { okee: get('LOGO_OKEE'), win: get('LOGO_WIN') };
}
function printer() {
  const ctx = {};
  new Function(fs.readFileSync(require.resolve('pdfmake/build/vfs_fonts.js'), 'utf8')).call(ctx);
  const f = n => Buffer.from(ctx.pdfMake.vfs[n], 'base64');
  return new PdfPrinter({ Roboto: { normal: f('Roboto-Regular.ttf'), bold: f('Roboto-Medium.ttf'), italics: f('Roboto-Italic.ttf'), bolditalics: f('Roboto-MediumItalic.ttf') } });
}
function toBuffer(def) {
  return new Promise((resolve, reject) => {
    const doc = printer().createPdfKitDocument(def); const chunks = [];
    doc.on('data', c => chunks.push(c)); doc.on('end', () => resolve(Buffer.concat(chunks))); doc.on('error', reject); doc.end();
  });
}

async function main() {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) throw new Error('The FIREBASE_SERVICE_ACCOUNT secret is missing. See README → Daily report.');
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
  const db = admin.firestore();
  const date = reportDate();
  const from = iso(new Date(new Date(date + 'T12:00:00').getTime() - 13 * 864e5));
  const all = async q => (await q.get()).docs.map(d => ({ id: d.id, ...d.data() }));
  const [people, mewps, subs, excused, cfgSnap] = await Promise.all([
    all(db.collection('people')), all(db.collection('mewps')),
    all(db.collection('submissions').where('date', '>=', from).where('date', '<=', date)),
    all(db.collection('excused').where('date', '>=', from).where('date', '<=', date)),
    db.collection('config').doc('site').get()
  ]);
  const config = cfgSnap.exists ? cfgSnap.data() : {};
  const flowUrl = String(config.flowUrl || '').trim();
  const data = { people, mewps, subs, excused };
  const summary = R.summary(data, date), fileName = R.fileName(date, config);
  console.log(`Report for ${date}: harness ${summary.harnessDone}/${summary.harnessExpected}, MEWP ${summary.mewpDone}/${summary.mewpExpected}, reports ${summary.reports}, failed checks ${summary.fails}${summary.closed ? ', site closed' : ''}`);

  const pdf = await toBuffer(R.dailyReportDoc(data, date, { config, logos: logos(), generatedBy: 'Automatic nightly report', flowConfigured: !!flowUrl }));
  const b64 = pdf.toString('base64');

  let uploaded = false;
  if (flowUrl) {
    try {
      const res = await fetch(flowUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        fileName, folder: 'Daily Tracker Reports', formType: 'Daily Site Tracker Report', date, project: config.project || '', projectNo: config.projectNo || '',
        names: '', failCount: summary.fails, language: 'en', submittedAt: new Date().toISOString(), contentBase64: b64 }) });
      uploaded = res.ok; console.log(uploaded ? 'Sent to SharePoint.' : 'SharePoint flow answered ' + res.status + '.');
    } catch (e) { console.log('Could not reach the SharePoint flow: ' + e.message); }
  } else console.log('No SharePoint upload link set in Site settings; report saved on the tracker only.');

  // save on the tracker (in pieces, like submitted reports)
  const parts = Math.ceil(b64.length / CHUNK) || 1; const batch = db.batch();
  for (let i = 0; i < parts; i++) {
    const ref = db.collection('dailyReports').doc(i ? date + '~' + i : date);
    batch.set(ref, i ? { data: b64.slice(i * CHUNK, (i + 1) * CHUNK), part: i, date } : { date, fileName, at: Date.now(), by: 'Automatic nightly report', summary, uploaded, parts, data: b64.slice(0, CHUNK) });
  }
  await batch.commit();
  console.log(`Saved ${fileName} (${Math.round(pdf.length / 1024)} KB) on the tracker.`);
  if (flowUrl && !uploaded) process.exitCode = 1; // shows the run as failed so it gets noticed
}
main().catch(e => { console.error('Daily report failed: ' + e.message); process.exit(1); });
