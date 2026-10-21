/* Site Safety Checks: Firebase layer for the hosted app.
   Site staff are signed in anonymously in the background (no account needed) and pick their name from the site list.
   Supervisors sign in with Google or email to see the tracker and manage the site list. */
const V = '10.14.1';
const base = 'https://www.gstatic.com/firebasejs/' + V + '/';
const CFG = window.SSC_CONFIG || {};
const OWNERS = (CFG.owners || []).map(e => e.toLowerCase());
const done = window.__sscResolve, failed = window.__sscReject;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- full-screen messages ---------- */
const gate = document.createElement('div'); gate.id = 'gate'; gate.hidden = true; document.body.appendChild(gate);
function showGate(html, closable) {
  gate.innerHTML = '<div class="gbox">' + (closable ? '<button class="glink gx" id="gX" type="button">Close</button>' : '') + html + '</div>'; gate.hidden = false;
  const x = gate.querySelector('#gX'); if (x) x.onclick = hideGate;
}
function hideGate() { gate.hidden = true; gate.innerHTML = ''; }

if (!CFG.firebase || !CFG.firebase.apiKey || String(CFG.firebase.apiKey).startsWith('PASTE')) {
  showGate('<h2>Almost ready</h2><p>This copy of the app is not connected to its Firebase project yet. Add the project settings to <code>config.js</code> (see README).</p>');
  failed(new Error('missing Firebase config'));
  throw new Error('SSC: missing Firebase config');
}

let fb;
try {
  const [app, auth, fsx] = await Promise.all(['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js'].map(f => import(base + f)));
  fb = { ...app, ...auth, ...fsx };
} catch (e) {
  showGate('<h2>Open once with signal</h2><p>This phone has not downloaded the app yet. Open it once with mobile data or Wi-Fi, then it also works with weak signal.</p><button class="gbtn" onclick="location.reload()">Try again</button>');
  failed(e); throw e;
}

const app = fb.initializeApp(CFG.firebase);
const auth = fb.getAuth(app);
let fs;
try { fs = fb.initializeFirestore(app, { localCache: fb.persistentLocalCache({ tabManager: fb.persistentMultipleTabManager() }) }); }
catch (e) { fs = fb.getFirestore(app); }

const nice = e => {
  const c = (e && e.code) || '';
  if (c.includes('popup-closed') || c.includes('cancelled-popup')) return 'Sign-in was closed before it finished.';
  if (c.includes('popup-blocked')) return 'The browser blocked the sign-in window. Allow pop-ups for this site and try again.';
  if (c.includes('unauthorized-domain')) return 'This web address is not allowed to sign in yet. Add it under Authentication → Settings → Authorized domains in Firebase.';
  if (c.includes('network')) return 'No signal. Signing in needs a connection.';
  if (c.includes('invalid-credential') || c.includes('wrong-password') || c.includes('user-not-found')) return 'That email and password do not match.';
  if (c.includes('email-already-in-use')) return 'That email already has an account. Use Sign in instead.';
  if (c.includes('weak-password')) return 'Use a password of at least 6 characters.';
  if (c.includes('invalid-email')) return 'That email address does not look right.';
  if (c.includes('admin-restricted') || c.includes('operation-not-allowed')) return 'This sign-in method is not switched on in Firebase yet (Authentication → Sign-in method).';
  return 'Could not sign in (' + (c || 'error') + ').';
};

/* ---------- supervisor sign-in ---------- */
function supervisorScreen(msg, mode) {
  const err = msg ? '<p class="gerr">' + esc(msg) + '</p>' : '';
  if (mode !== 'email') {
    showGate('<h2>Supervisor sign-in</h2><p>For the site tracker and site list. Site staff don’t need to sign in.</p>' + err +
      '<button class="gbtn" id="gGoogle" type="button">Sign in with Google</button><button class="gbtn alt" id="gEmail" type="button">Sign in with email</button>', true);
    gate.querySelector('#gGoogle').onclick = async () => { try { await fb.signInWithPopup(auth, new fb.GoogleAuthProvider()); location.reload(); } catch (e) { supervisorScreen(nice(e)); } };
    gate.querySelector('#gEmail').onclick = () => supervisorScreen('', 'email');
    return;
  }
  showGate('<h2>Sign in with email</h2>' + err +
    '<label class="gl">Email<input id="gE" type="email" autocomplete="email" inputmode="email"></label>' +
    '<label class="gl">Password<input id="gP" type="password" autocomplete="current-password"></label>' +
    '<button class="gbtn" id="gIn" type="button">Sign in</button><button class="gbtn alt" id="gNew" type="button">Create account</button>' +
    '<div class="glinks"><button class="glink" id="gReset" type="button">Forgot password</button><button class="glink" id="gBack" type="button">Back</button></div>', true);
  const E = () => gate.querySelector('#gE').value.trim(), P = () => gate.querySelector('#gP').value;
  gate.querySelector('#gIn').onclick = async () => { try { await fb.signInWithEmailAndPassword(auth, E(), P()); location.reload(); } catch (e) { supervisorScreen(nice(e), 'email'); } };
  gate.querySelector('#gNew').onclick = async () => {
    try { const c = await fb.createUserWithEmailAndPassword(auth, E(), P()); await fb.sendEmailVerification(c.user); verifyScreen(c.user); } catch (e) { supervisorScreen(nice(e), 'email'); }
  };
  gate.querySelector('#gReset').onclick = async () => { if (!E()) { supervisorScreen('Type your email first, then tap Forgot password.', 'email'); return; } try { await fb.sendPasswordResetEmail(auth, E()); supervisorScreen('A reset link is on its way to ' + E() + '.', 'email'); } catch (e) { supervisorScreen(nice(e), 'email'); } };
  gate.querySelector('#gBack').onclick = () => supervisorScreen();
}
function verifyScreen(user, msg) {
  showGate('<h2>Check your email</h2><p>We sent a link to <b>' + esc(user.email) + '</b>. Tap it, then come back and tap Continue.</p>' + (msg ? '<p class="gerr">' + esc(msg) + '</p>' : '') +
    '<button class="gbtn" id="gDone" type="button">Continue</button><div class="glinks"><button class="glink" id="gResend" type="button">Send the link again</button><button class="glink" id="gOut" type="button">Cancel</button></div>');
  gate.querySelector('#gDone').onclick = async () => { try { await user.reload(); await user.getIdToken(true); } catch (e) {} if (auth.currentUser && auth.currentUser.emailVerified) location.reload(); else verifyScreen(user, 'Not verified yet. Tap the link in the email first.'); };
  gate.querySelector('#gResend').onclick = async () => { try { await fb.sendEmailVerification(user); verifyScreen(user, 'Sent again.'); } catch (e) { verifyScreen(user, nice(e)); } };
  gate.querySelector('#gOut').onclick = () => fb.signOut(auth).then(() => location.reload());
}

async function roleOf(user) {
  if (!user || user.isAnonymous || !user.email) return 'operative';
  const verified = user.emailVerified || user.providerData.some(p => p.providerId === 'google.com');
  if (!verified) return 'operative';
  const email = user.email.toLowerCase();
  if (OWNERS.includes(email)) return 'supervisor';
  try { const s = await fb.getDoc(fb.doc(fs, 'members', email)); return s.exists() && s.data().role === 'supervisor' ? 'supervisor' : 'operative'; }
  catch (e) { try { return localStorage.getItem('ssc.role.' + email) || 'operative'; } catch (x) { return 'operative'; } }
}

/* ---------- the backend the app talks to ---------- */
const rid = () => fb.doc(fb.collection(fs, 'x')).id;
function makeBackend(user, role) {
  const q = (coll, filters) => (filters && filters.length) ? fb.query(fb.collection(fs, coll), ...filters.map(f => fb.where(f[0], f[1], f[2]))) : fb.collection(fs, coll);
  const ref = (coll, id) => fb.doc(fs, coll, id);
  return {
    kind: 'firebase', role, uid: user.uid, canSignIn: true, canUpload: true,
    me: user.isAnonymous ? null : { name: user.displayName || '', email: (user.email || '').toLowerCase() },
    watch: (coll, filters, cb, onErr) => fb.onSnapshot(q(coll, filters), qs => cb(qs.docs.map(d => ({ id: d.id, ...d.data() }))), e => onErr && onErr(e)),
    get: async (coll, id) => { const s = await fb.getDoc(ref(coll, id)); return s.exists() ? s.data() : null; },
    set: (coll, id, data) => fb.setDoc(ref(coll, id), data),
    update: (coll, id, data) => fb.updateDoc(ref(coll, id), data),
    remove: (coll, id) => fb.deleteDoc(ref(coll, id)),
    newId: rid,
    download: async (filename, blob) => {
      const mobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
      if (mobile && navigator.canShare) {
        const file = new File([blob], filename, { type: blob.type || 'application/octet-stream' });
        if (navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: filename }); return; } catch (e) { if (e && e.name === 'AbortError') throw { code: 'declined' }; } }
      }
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 30000);
    },
    signIn: () => supervisorScreen(),
    signOut: async () => { try { await fb.signOut(auth); } catch (e) {} location.reload(); },
  };
}

/* ---------- start ---------- */
let started = false;
fb.onAuthStateChanged(auth, async user => {
  if (started) return;
  if (!user) {
    try { await fb.signInAnonymously(auth); } // onAuthStateChanged fires again with the anonymous user
    catch (e) {
      showGate('<h2>Can’t connect</h2><p>' + esc(e && e.code === 'auth/admin-restricted-operation' ? 'Anonymous sign-in is not switched on in Firebase yet (Authentication → Sign-in method → Anonymous).' : 'Check the signal, then try again.') + '</p><button class="gbtn" onclick="location.reload()">Try again</button>');
      failed(e);
    }
    return;
  }
  const pwd = user.providerData.some(p => p.providerId === 'password');
  if (pwd && !user.emailVerified) { verifyScreen(user); return; }
  started = true;
  const role = await roleOf(user);
  if (!user.isAnonymous) { try { localStorage.setItem('ssc.role.' + user.email.toLowerCase(), role); } catch (e) {} }
  if (!user.isAnonymous && role !== 'supervisor') {
    showGate('<h2>Not a supervisor yet</h2><p>You are signed in as <b>' + esc(user.email) + '</b>, but this address has not been made a supervisor. Ask an owner to add it under Site settings → Supervisors.</p><button class="gbtn" type="button" id="gOut">Back to the forms</button>');
    gate.querySelector('#gOut').onclick = () => fb.signOut(auth).then(() => location.reload());
  }
  done(makeBackend(user, role));
});
