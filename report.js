/* Site Safety Checks: daily site tracker report.
   Shared by the app (tracker button) and the nightly GitHub job (scripts/daily-report.js),
   so both produce the same figures and the same PDF. */
(function (root) {
  const pad2 = n => String(n).padStart(2, "0");
  const parseISO = s => { if (!s) return null; const [y, m, d] = String(s).split("-").map(Number); return y ? new Date(y, m - 1, d) : null; };
  const iso = d => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const fmt = s => { const d = parseISO(s); return d ? pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1) + "/" + d.getFullYear() : ""; };
  const endOf = s => { const d = parseISO(s); return d ? d.getTime() + 864e5 - 1 : 0; };
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayName = s => { const d = parseISO(s); return d ? DAYS[(d.getDay() + 6) % 7] : ""; };
  const TZ = "Europe/London";
  const hhmm = ms => new Date(ms).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TZ });

  function activeOn(x, date) { const end = endOf(date); return (x.at || 0) <= end && (x.active !== false || (x.inactiveAt && x.inactiveAt > end)); }

  /* data: { people, mewps, subs, excused } — arrays of {id, ...fields} */
  function dayStatus(data, date) {
    const ex = (data.excused || []).filter(e => e.date === date);
    const closed = ex.some(e => e.kind === "site");
    const exP = new Set(ex.filter(e => e.kind === "person").map(e => e.refId)), exM = new Set(ex.filter(e => e.kind === "mewp").map(e => e.refId));
    const subs = (data.subs || []).filter(s => s.date === date).sort((a, b) => (a.at || 0) - (b.at || 0));
    const doneP = new Map(); subs.filter(s => s.type === "harness").forEach(s => (s.personIds || []).forEach(pid => { if (!doneP.has(pid)) doneP.set(pid, []); doneP.get(pid).push(s); }));
    const doneM = new Map(); subs.filter(s => s.type === "mewp").forEach(s => { if (!doneM.has(s.mewpId)) doneM.set(s.mewpId, []); doneM.get(s.mewpId).push(s); });
    const people = data.people || [], mewps = data.mewps || [];
    const expP = closed ? [] : people.filter(p => activeOn(p, date) && p.harness !== false && !exP.has(p.id) && !doneP.has(p.id));
    const expM = closed ? [] : mewps.filter(m => activeOn(m, date) && !exM.has(m.id) && !doneM.has(m.id));
    return {
      closed, subs, fails: subs.reduce((a, s) => a + (s.failCount || 0), 0), notUploaded: subs.filter(s => !s.uploaded).length,
      exBy: Object.fromEntries(ex.map(e => [e.kind + ":" + e.refId, e.by || ""])),
      h: { done: [...doneP.entries()], missing: expP, excused: people.filter(p => exP.has(p.id)), total: doneP.size + expP.length },
      m: { done: [...doneM.entries()], missing: expM, excused: mewps.filter(m => exM.has(m.id)), total: doneM.size + expM.length }
    };
  }

  /* opts: { config, logos: {okee, win}, generatedBy, flowConfigured } */
  function dailyReportDoc(data, date, opts) {
    opts = opts || {};
    const c = opts.config || {}, logos = opts.logos || {};
    const st = dayStatus(data, date);
    const pm = Object.fromEntries((data.people || []).map(p => [p.id, p])), mm = Object.fromEntries((data.mewps || []).map(m => [m.id, m]));
    const BLUE = "#238ECE", RED = "#C0281B", RBG = "#FBE3E0", GREEN = "#1B7A3E", GBG = "#E3F3E8", GREY = "#5A626C", LINE = "#B9C0C8", HEAD = "#F4F3F0";
    const tl = { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => LINE, vLineColor: () => LINE, paddingLeft: () => 4, paddingRight: () => 4, paddingTop: () => 3, paddingBottom: () => 3 };
    const th = t => ({ text: t, bold: true, color: "#fff", fillColor: BLUE, fontSize: 8 });
    const td = (t, x = {}) => ({ text: t == null ? "" : String(t), fontSize: 8.5, ...x });
    const none = t => ({ text: t, italics: true, color: GREY, fontSize: 8.5, margin: [0, 2, 0, 6] });
    const h2 = (t, n, bad) => ({ text: [{ text: t + "  " }, { text: String(n), color: bad && n ? RED : GREY }], bold: true, fontSize: 11, margin: [0, 12, 0, 4] });
    const table = (widths, head, rows) => ({ table: { headerRows: 1, dontBreakRows: true, widths, body: [head.map(th), ...rows] }, layout: tl });
    const failsFor = (s, name) => (s.fails || []).filter(f => s.type === "mewp" || !name || f.startsWith(name + ":")).map(f => s.type === "mewp" ? "Line " + f : f.replace(name + ": ", "")).join("; ");
    const ratio = (d, t) => ({ text: [{ text: String(d), bold: true, fontSize: 22, color: d < t ? RED : GREEN }, { text: " / " + t, fontSize: 12, color: GREY }] });

    const content = [];
    content.push({ columns: [
      logos.okee ? { image: logos.okee, width: 40 } : { text: "", width: 40 },
      { stack: [{ text: "DAILY SITE SAFETY TRACKER REPORT", fontSize: 14, bold: true, alignment: "center" }, { text: dayName(date) + " " + fmt(date), fontSize: 11, alignment: "center", margin: [0, 2, 0, 0] }, { text: "MEWP daily inspections · Harness checks", fontSize: 8, color: GREY, alignment: "center", margin: [0, 2, 0, 0] }], width: "*", margin: [0, 4, 0, 0] },
      logos.win ? { image: logos.win, width: 100, margin: [0, 8, 0, 0] } : { text: "", width: 100 }
    ], columnGap: 10, margin: [0, 0, 0, 8] });
    content.push({ table: { widths: ["auto", "*", "auto", "*"], body: [
      [td("Project", { bold: true, fillColor: HEAD }), td(c.project), td("Project No", { bold: true, fillColor: HEAD }), td(c.projectNo)],
      [td("Location / Area", { bold: true, fillColor: HEAD }), td(c.location), td("Contractor", { bold: true, fillColor: HEAD }), td(c.contractor)]
    ] }, layout: tl, margin: [0, 0, 0, 8] });
    if (st.closed) content.push({ text: "Site marked closed on this day. Nobody was expected to submit.", bold: true, color: GREY, margin: [0, 0, 0, 8] });

    // summary
    content.push({ table: { widths: ["*", "*", "*", "*"], body: [[
      { stack: [{ text: "HARNESS CHECKS", fontSize: 7.5, bold: true, color: GREY }, ratio(st.h.done.length, st.h.total), { text: st.h.missing.length ? st.h.missing.length + " not done" : "Everyone done", fontSize: 8, color: st.h.missing.length ? RED : GREEN }] },
      { stack: [{ text: "MEWP INSPECTIONS", fontSize: 7.5, bold: true, color: GREY }, ratio(st.m.done.length, st.m.total), { text: st.m.missing.length ? st.m.missing.length + " not done" : "All machines done", fontSize: 8, color: st.m.missing.length ? RED : GREEN }] },
      { stack: [{ text: "REPORTS SUBMITTED", fontSize: 7.5, bold: true, color: GREY }, { text: String(st.subs.length), bold: true, fontSize: 22 }, { text: "Harness " + st.subs.filter(s => s.type === "harness").length + " · MEWP " + st.subs.filter(s => s.type === "mewp").length, fontSize: 8, color: GREY }] },
      { stack: [{ text: "FAILED CHECKS", fontSize: 7.5, bold: true, color: GREY }, { text: String(st.fails), bold: true, fontSize: 22, color: st.fails ? RED : GREEN }, { text: opts.flowConfigured ? st.notUploaded + " report(s) not in SharePoint" : "", fontSize: 8, color: st.notUploaded ? RED : GREY }] }
    ]] }, layout: tl });

    // outstanding
    content.push(h2("Harness checks not done", st.h.missing.length, true));
    content.push(st.h.missing.length ? table(["*", "*"], ["Name", "Company"], st.h.missing.map(p => [td(p.name, { color: RED, bold: true }), td(p.company)])) : none(st.closed ? "Site closed." : "Nobody outstanding."));
    content.push(h2("MEWPs not inspected", st.m.missing.length, true));
    content.push(st.m.missing.length ? table(["*"], ["MEWP model / serial no"], st.m.missing.map(m => [td(m.label, { color: RED, bold: true })])) : none(st.closed ? "Site closed." : "All machines inspected."));

    // done
    content.push(h2("Harness checks done", st.h.done.length));
    content.push(st.h.done.length ? table([110, 90, 34, "*", 150], ["Name", "Company", "Time", "Failed checks", "Report"],
      st.h.done.map(([pid, ss]) => { const p = pm[pid] || {}; const f = ss.map(s => failsFor(s, p.name)).filter(Boolean).join("; ");
        return [td(p.name || "Removed person"), td(p.company), td(ss.map(s => hhmm(s.at)).join(", ")), td(f || "None", f ? { color: RED, fillColor: RBG } : { color: GREY }), td(ss.map(s => s.fileName).join("\n"), { fontSize: 6.5, color: GREY })]; })) : none("No harness checks submitted."));
    content.push(h2("MEWPs inspected", st.m.done.length));
    content.push(st.m.done.length ? table([110, 80, 80, 34, "*", 110], ["MEWP", "Operator", "Spotter", "Time", "Failed checks", "Report"],
      st.m.done.flatMap(([mid, ss]) => ss.map(s => { const f = failsFor(s); return [td((mm[mid] && mm[mid].label) || s.mewpLabel), td(s.operatorName), td(s.spotterName), td(hhmm(s.at)), td(f || "None", f ? { color: RED, fillColor: RBG } : { color: GREY }), td(s.fileName, { fontSize: 6.5, color: GREY })]; }))) : none("No MEWP inspections submitted."));

    // excused
    const exRows = st.h.excused.map(p => [td(p.name), td("Person · not on site"), td(st.exBy["person:" + p.id])]).concat(st.m.excused.map(m => [td(m.label), td("MEWP · not in use"), td(st.exBy["mewp:" + m.id])]));
    content.push(h2("Not on site / not in use", exRows.length));
    content.push(exRows.length ? table(["*", 120, 150], ["Name / MEWP", "Marked as", "Marked by"], exRows) : none("None marked."));

    // 14-day history
    const hist = []; for (let i = 0; i < 14; i++) { const d = iso(addDays(parseISO(date), -i)); hist.push([d, dayStatus(data, d)]); }
    content.push({ text: "Last 14 days", bold: true, fontSize: 11, margin: [0, 12, 0, 4], pageBreak: "before" });
    content.push(table([70, "*", "*", 50, 50], ["Date", "Harness checks", "MEWP inspections", "Failed", "Reports"], hist.map(([d, s]) => s.closed
      ? [td(dayName(d) + " " + fmt(d).slice(0, 5)), { text: "Site closed", colSpan: 2, fontSize: 8.5, color: GREY }, {}, td(s.fails), td(s.subs.length)]
      : [td(dayName(d) + " " + fmt(d).slice(0, 5), d === date ? { bold: true } : {}), td(s.h.done.length + " / " + s.h.total, s.h.missing.length ? { color: RED, bold: true } : {}), td(s.m.done.length + " / " + s.m.total, s.m.missing.length ? { color: RED, bold: true } : {}), td(s.fails, s.fails ? { color: RED, bold: true } : {}), td(s.subs.length)])));
    content.push({ text: "Red means someone or something was missed, or a check failed.", fontSize: 7.5, color: GREY, margin: [0, 4, 0, 0] });

    const generated = new Date().toLocaleString("en-GB", { timeZone: TZ, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    return {
      pageSize: "A4", pageMargins: [24, 24, 24, 30], info: { title: "Daily Site Safety Tracker " + date },
      footer: (cur, total) => ({ columns: [{ text: "Generated " + generated + (opts.generatedBy ? " · " + opts.generatedBy : "") + " · Site Safety Checks", fontSize: 7, color: GREY }, { text: cur + " / " + total, alignment: "right", fontSize: 7, color: GREY }], margin: [24, 8, 24, 0] }),
      content, defaultStyle: { font: "Roboto", fontSize: 8.5 }
    };
  }
  function summary(data, date) { const s = dayStatus(data, date); return { harnessDone: s.h.done.length, harnessExpected: s.h.total, mewpDone: s.m.done.length, mewpExpected: s.m.total, reports: s.subs.length, fails: s.fails, closed: s.closed }; }
  const fileName = (date, c) => "Daily-Tracker_" + date + ((c && (c.projectNo || c.project)) ? "_" + String(c.projectNo || c.project).replace(/[^\w\-]+/g, "-") : "") + ".pdf";

  const api = { dayStatus, dailyReportDoc, summary, fileName, activeOn };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.SSCReport = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
