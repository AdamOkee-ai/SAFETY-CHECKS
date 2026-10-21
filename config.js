/* Site Safety Checks: settings for this copy of the app.
   The Firebase values are not secret: access is controlled by the Firestore security rules,
   which hold the owner (supervisor) email. Other supervisors are added in the app. */
window.SSC_CONFIG = {
  firebase: {
    apiKey: 'AIzaSyDFm_1OqBmqgjcSG19TfMbVjKnTNT5pZgM',
    authDomain: 'okee-safety.firebaseapp.com',
    projectId: 'okee-safety',
    storageBucket: 'okee-safety.firebasestorage.app',
    messagingSenderId: '845951504163',
    appId: '1:845951504163:web:3fd9b2f98c45c997574696',
  },
  // Owners are set in the Firestore rules (Firebase console), so no emails are kept in this public file.
  owners: [],
  // Optional: a Power Automate upload link built in for everyone. It can also be set in the app under Site settings.
  flowUrl: '',
};
