/* Site Safety Checks: settings for this copy of the app.
   The Firebase values are not secret: access is controlled by firebase/firestore.rules. */
window.SSC_CONFIG = {
  firebase: {
    apiKey: 'PASTE_FROM_FIREBASE',
    authDomain: 'PASTE_FROM_FIREBASE',
    projectId: 'PASTE_FROM_FIREBASE',
    storageBucket: 'PASTE_FROM_FIREBASE',
    messagingSenderId: 'PASTE_FROM_FIREBASE',
    appId: 'PASTE_FROM_FIREBASE',
  },
  // Always supervisors. Must match the owner list in firebase/firestore.rules.
  owners: ['you@example.com'],
  // Optional: a Power Automate upload link built in for everyone. It can also be set in the app under Site settings.
  flowUrl: '',
};
