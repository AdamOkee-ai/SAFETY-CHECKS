# Site Safety Checks

OKEE's daily MEWP inspection and harness check app, with a site tracker for supervisors. It runs on a phone as a web app, in English, Romanian and Polish.

- **Site staff** open the link and pick their name from the site list. If their name is missing they can add it, and it's flagged for a supervisor to check. They don't need an account.
- **MEWP Daily Inspection:** one report per machine per day. All 33 checks, a note for every failed check, both sign-offs (name, title, signature) and the sheet details must be done before the PDF can be created. Comments are required when a check fails.
- **Harness Inspection Register:** one card per harness. The wearer, all 9 checks and the signature are required. The asset and serial numbers, the four dates, the drawing and plant refs and the comments are optional.
- **Every submitted report** creates a PDF, is uploaded to SharePoint (when the flow is set up) and is recorded on the site tracker.
- **Supervisors** sign in to see the tracker. For each day it shows how many people have done their harness check and how many MEWPs have been inspected, who and what is still missing, and a 14-day history. From the tracker they can download any report or the day's status as a CSV.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and styles |
| `app.js` | The checklists, tracker, site list and PDF reports |
| `firebase-shim.js` | Connects the app to Firebase: background sign-in for staff, supervisor sign-in, and data |
| `config.js` | Firebase project settings, owner emails, optional SharePoint upload link |
| `firebase/firestore.rules` | Security rules to paste into Firebase |
| `sw.js` | Offline layer. **Bump `VERSION` on every change** so phones pick up the update |

## One-off setup (about 20 minutes)

### 1. Firebase project (free plan is enough)
1. Go to <https://console.firebase.google.com>, then **Add project**. Name it, for example, `okee-safety-checks`.
2. **Build → Firestore Database → Create database**. Choose the `europe-west2` (London) location and start in production mode.
3. **Build → Authentication → Get started → Sign-in method**. Enable these three:
   - **Anonymous** (site staff)
   - **Google** (supervisors)
   - **Email/Password** (supervisors without Google)
4. **Authentication → Settings → Authorized domains**: add `YOUR-ORG.github.io`.
5. **Project settings (gear) → Your apps → Web app (`</>`)**: register an app, then copy the `firebaseConfig` values into `config.js`.
6. In the rules (next step), put the owner's email (lower case) in place of `you@example.com`. Keep the email out of `config.js`, because this repository is public. The app works out who the owners are from the rules.
7. **Firestore Database → Rules**: paste in the whole of `firebase/firestore.rules`, then click **Publish**.

### 2. GitHub Pages
1. Create a repository, for example `okee-app/SAFETY-CHECKS`, and upload all these files (keep the folders).
2. **Settings → Pages**: deploy from the `main` branch, root folder.
3. Open `https://YOUR-ORG.github.io/SAFETY-CHECKS/` on a phone, then use **Add to Home Screen**.

### 3. First supervisor steps
1. On the home screen, tap **Supervisor ›** and sign in with the owner's Google account.
2. **Site settings:** enter the project, project no., location, contractor, drawing ref and plant/system ref. These fill in automatically for everyone.
3. **Site list:** add the people (use **Add many at once** and paste `Name, Company` lines from a spreadsheet), then add the MEWPs on site. Untick *Needs a daily harness check* for anyone who doesn't work at height.
4. **Site settings → Supervisors:** add other supervisors' emails.

### 4. SharePoint upload (optional, needs Power Automate Premium)
The steps are in the app under **Site settings → SharePoint upload → How to set up the flow**. When the link is saved there, every phone uploads automatically. Without it, reports are still recorded on the tracker, and supervisors can download any PDF from there.

## Using the tracker
- **Not on site** removes a person from that day's count. **Not in use** does the same for a MEWP. **Mark site closed** removes everyone and everything for the day, for example on Sundays.
- **Removing** someone from the site list keeps their past reports, and they stop counting from the next day.
- Reports are stored in Firestore along with their PDFs, so the tracker is a full record even without SharePoint.

## Privacy note
Anyone with the link can read the names on the site list and submit a report. Only supervisors can read submitted reports, PDFs and the tracker.
