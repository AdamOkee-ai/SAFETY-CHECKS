/* Site Safety Checks app (form content + app). */
/* ---------- Form content (from the IFHS 87 MEWP sheet R3 and the Harness Site Inspection Register) ---------- */
const LANGS = { en: "English", ro: "Română", pl: "Polski" };

const MEWP_ITEMS = [
  // [line, English, Romanian, Polish]
  [1, "Operating and emergency controls are in proper working condition including EMO button or Emergency Stop Device.", "Controalele de operare și de urgență sunt în stare de funcționare corespunzătoare, inclusiv dispozitivul de oprire de urgență.", "Elementy obsługowe i awaryjne są sprawne, w tym przycisk EMO lub urządzenie zatrzymania awaryjnego."],
  [2, "Emergency lowering function tested and operates properly.", "Funcția de coborâre de urgență testată și funcționează corect.", "Funkcja opuszczania awaryjnego przetestowana i pracuje prawidłowo."],
  [3, "Lower operating controls successfully override the upper controls.", "Controalele de coborarea de urgenta înlocuiesc cu succes comenzile panoului principal.", "Dolne elementy sterujące z powodzeniem zastępują górne elementy sterujące."],
  [4, "Both upper and lower controls are adequately protected from inadvertent operation.", "Atât comenzile superioare, cât și cele inferioare sunt protejate în mod adecvat de operare accidentală.", "Górne i dolne elementy sterujące są odpowiednio zabezpieczone przed niezamierzona operacja."],
  [5, "Control Panel is clean and all buttons/switches are clearly visible (no paint over spray etc.)", "Panoul de control este curat și toate butoanele / comutatoarele sunt vizibile în mod clar (fără vopsea peste spray etc.)", "Panel controlny jest czystny i wszystkie przyciski/przełączniki widoczne (nie pomalowane itp.)"],
  [6, "All switches and mechanical guards are in good condition and properly installed.", "Toate întrerupătoarele și gărzile mecanice sunt în stare bună și instalate corect.", "Wszystkie przełączniki i osłony mechaniczne są w dobrym stanie. Prawidłowo zainstalowany."],
  [7, "All safety indicator lights work.", "Toate luminile indicatoare de siguranță funcționează.", "Wszystkie kontrolki bezpieczeństwa działają."],
  [8, "Drive controls are secured in their home position and function properly and are accurately labelled (up, down, left, right, forward, backward).", "Comenzile unității sunt securizate în poziția și funcția, poziționate corect și sunt etichetate cu precizie (sus, jos, stânga, dreapta, înainte, înapoi).", "Elementy sterowania napędem są zabezpieczone w pozycji wyjściowej i działają prawidłowo i dokładnie oznaczone (w górę, w dół, w lewo, w prawo, do przodu, do tyłu)."],
  [9, "Motion alarms are functional.", "Alarmele de mișcare sunt funcționale.", "Alarmy ruchu funkcjonują."],
  [10, "Safety decals are in place and readable (Serial No., SWL, etc.)", "Decalcomanii de siguranță sunt în vigoare și pot fi cititi (nr. de serie, limita incarcare, etc.)", "Naklejki bezpieczeństwa są na miejscu i czytelne (numer seryjny, SWL itp.)"],
  [11, "All guard rails are sound and in place (basket chains, pins, etc.)", "Toate șinele de protecție sunt functionale și la locul lor (lanțuri de coș, ace etc.)", "Wszystkie poręcze są sprawne i na swoim miejscu (łańcuchy kosza, sworznie itp.)"],
  [12, "Work platform and extension slides are clean, dry and clear of debris.", "Platforma de lucru și de extensie sunt curate, uscate și fără mizerii.", "Platforma robocza i prowadnice są czyste, suche i bez zanieczyszczeń."],
  [13, "Work platform extension slides in and out freely with safety locking pins in place to lock setting on models with extension platforms.", "Extensia platformei de lucru alunecă în și în exterior în mod liber cu pini de blocare a siguranței în loc pentru a bloca setarea pe modelele cu platforme de extensie.", "Przedłużenie platformy roboczej wsuwa i wysuwa się swobodnie z kołkami zabezpieczającymi w celu zablokowania ustawienia w modelach z platformami wysuwanymi."],
  [14, "Inspect for defects such as cracked welds, fuel leaks, hydraulic leaks, damaged control cables or wire harness, etc.", "Inspectați defectele, cum ar fi sudurile crăpate, scurgerile de combustibil, scurgerile hidraulice, cablurile de control deteriorate sau hamul de sârmă etc.", "Sprawdź, czy nie ma wad, takich jak pęknięte spawy, wycieki paliwa, wycieki hydrauliczne, uszkodzone przewodów sterujących lub wiązki przewodów itp."],
  [15, "Tyres and wheels are in good condition, with adequate air pressure if pneumatic.", "Anvelopele și roțile sunt în stare bună, cu o presiune adecvată a aerului dacă sunt pneumatice.", "Opony i koła są w dobrym stanie, ciśnienie powietrza jest odpowiednie, jeśli jest pneumatyczne."],
  [16, "Check nuts, bolts and other fasteners, including those securing basket to body of MEWP.", "Verificați piulițele, șuruburile și alte elemente de fixare, inclusiv cele care fixează coșul de corpul platformei.", "Sprawdź nakrętki, śruby i inne elementy mocujące, w tym te mocujące kosz do korpusu platformy."],
  [17, "Braking devices are operating properly.", "Dispozitivele de frânare funcționează corect.", "Urządzenia hamujące działają prawidłowo."],
  [18, "Check fluid levels (fuel, hydraulic, etc.)", "Verificați nivelurile de lichid (combustibil, hidraulic etc.)", "Sprawdź poziomy płynów (paliwo, hydraulika itp.)"],
  [19, "The manufacturer’s operations manual is stored on MEWP (in all languages of the operators).", "Manualul de operațiuni al producătorului este stocat in MEWP (în toate limbile operatorilor).", "Instrukcja obsługi producenta jest przechowywana na MEWP (w wielu językach)."],
  [20, "Current 3rd Party inspection certificate (and/or a GA1 form) stored on file and instruction book in the basket of machine. 3rd Party inspection certificate (and/or a GA1 form) date in order.", "Certificatul actual de inspecție de către terți (și/sau formularul GA1) stocat în MEWP. Data de inspecție a certificatului de terță parte (și/sau formularul GA1) în ordine.", "Aktualny certyfikat kontroli strony trzeciej (i/lub formularz GA1) przechowywany w MEWP. Data inspekcji certyfikatu strony trzeciej (i/lub formularz GA1) w kolejności."],
  [21, "The spotter is in place during: inspection and use of MEWP and is trained and competent to lower MEWP in the event of an emergency.", "Spotterul este în vigoare în timpul: inspecției și utilizării MEWP și este instruit și competent să coboare MEWP în caz de urgență.", "Obserwator jest na miejscu podczas: inspekcji i użytkowania MEWP oraz jest przeszkolony i kompetentny do opuszczania MEWP w nagłych przypadkach."],
  [22, "Floor conditions: Drop offs, holes, uneven surfaces, sloped floors, etc.", "Condiții de podea: căderi, găuri, suprafețe neuniforme, podele înclinate etc.", "Warunki podłoża: spadki, dziury, nierówne powierzchnie, pochyłe podłogi itp."],
  [23, "Housekeeping: Debris, floor obstructions, cords, construction material /supplies, etc.", "Curatenia: Resturi, obstrucții de podea, cabluri, materiale de construcție / consumabile etc.", "Sprzątanie: Gruz, przeszkody podłogowe, kable, materiały budowlane / materiały eksploatacyjne itp."],
  [24, "Outriggers, stabilisers (if required): General condition, pins/retainers, footplate. Spreader plates (present, condition, secure for travel). Interlocks (functioning, engaged)", "Bază extinsă, stabilizatori (dacă este necesar): Stare generală, știfturi/reținetoare, placa de picior. Plăci de împrăștiere (prezente, în stare, sigure pentru călătorie). Interblocări (funcționale, cuplate).", "Rozszerzona podstawa, stabilizatory (w razie potrzeby): stan ogólny, sworznie/trzymacze, płyta podstawy. Płyty rozpieraka (obecne, w dobrym stanie, bezpieczne do jazdy). Blokady (sprawne, sprzężone)."],
  [25, "Hazardous Energy: Electrical power cables or panels, chemical lines, gas lines, drain lines, utilities, etc.", "Energie periculoasă: Cabluri sau panouri electrice, linii chimice, linii de gaz, linii de scurgere, utilități etc.", "Energia niebezpieczna: kable lub panele zasilania elektrycznego, przewody chemiczne, przewody gazowe, wlazy kanalizacyjne, media itp."],
  [26, "Overhead Obstructions: Tight working conditions, adjacent structures, pipe racks, ceiling grids, etc.", "Obstrucții aeriene: condiții de lucru strânse, structuri adiacente, rafturi pentru țevi, grile de tavan etc.", "Przeszkody napowietrzne: ciasne warunki pracy, sąsiednie konstrukcje, stojaki na rury, kratki sufitowe itp."],
  [27, "Bump guards on all side of the basket.", "Bureti de protectie instalati pe gratiile laterale.", "Osłony uderzeniowe ze wszystkich stron kosza."],
  [28, "No other trades / activities in close proximity.", "Nu există activități în imediata apropiere.", "Brak innych firm/działalności w bliskiej odległości."],
  [29, "Chin straps in place.", "Casca legata sub barbie.", "Paski podbródkowe na miejscu."],
  [30, "Tool Tethers available.", "Coarda pentru scule.", "Dostępne uchwyty narzędziowe."],
  [31, "Machine clean and clear from FOD.", "MEWP este curat si nu sunt resturi de materiale.", "Maszyna czysta i wolna od jakikolwiek luznych materiałów."],
  [32, "Plugs in order and not damaged.", "Prize în ordine și nu sunt deteriorate.", "Wtyczki sprawne i nie zniszczone."],
  [33, "Harness inspected and in order.", "Hamul este inspectat.", "Szelki do pracy na wysokości sprawdzone i sprawne do pracy."]
];
const LI = { en: 1, ro: 2, pl: 3 };

/* Harness register columns D–L, in sheet order */
const H_CHECKS = [
  { k: "lWebbing", g: "lanyard", en: "Webbing", ro: "Chingă", pl: "Taśma" },
  { k: "shock", g: "lanyard", en: "Shock Absorber", ro: "Absorbant de șoc", pl: "Amortyzator" },
  { k: "ropes", g: "lanyard", en: "Ropes", ro: "Frânghii", pl: "Liny" },
  { k: "hWebbing", g: "harness", en: "Webbing", ro: "Chingă", pl: "Taśma" },
  { k: "stitches", g: "harness", en: "Stitches", ro: "Cusături", pl: "Szwy" },
  { k: "buckles", g: "harness", en: "Buckles", ro: "Catarame", pl: "Klamry" },
  { k: "snaphook", g: "hardware", en: "Snaphook", ro: "Cârlig cu siguranță", pl: "Hak zatrzaśnikowy" },
  { k: "carabiner", g: "hardware", en: "Carabiner", ro: "Carabinieră", pl: "Karabińczyk" },
  { k: "dring", g: "hardware", en: "D-Ring", ro: "Inel D", pl: "Klamra typu D" }
];

const T = {
  en: {
    appName: "Site Safety Checks", pick: "Choose a checklist",
    mewpTitle: "MEWP Daily Inspection", mewpSub: "Weekly sheet · 33 checks each day",
    harnessTitle: "Harness Inspection Register", harnessSub: "One entry per harness and lanyard",
    inProgress: "In progress", notStarted: "Not started",
    details: "Sheet details", project: "Project", projectNo: "Project No", location: "Location / Area",
    contractor: "Contractor Name", model: "MEWP Model / Serial No", weekStart: "Start of week date",
    drawingRef: "Drawing Ref", plantRef: "Plant / System Ref", date: "Date",
    manualNote: "All checks should be conducted in accordance with the manufacturer's manual.",
    sec1: "Inspection items", sec1Sub: "Pass / Fail status for each day",
    sec2: "Survey area 20 second scan",
    scanIntro: "Prior to MEWP use walk the work area for hazardous conditions which may affect safe use of machine or hard to reach areas. If conditions exist report to site manager immediately and do not proceed with task.",
    sec2Sub: "Are conditions present? Verify for each day.",
    pass: "Pass", fail: "Fail", P: "P", F: "F",
    howTo: "Tap the box to pass an item. Tap ✕ if it fails.",
    failNote: "What is wrong?",
    failBanner: "A check has failed today. Do not use the MEWP until it is put right. Report it to the site manager.",
    comments: "Comments", commentsPh: "Defects found, actions taken, who was told",
    signoffs: "Weekly sign-offs", operator: "MEWP Operator", spotter: "Spotter",
    name: "Name", role: "Title", signature: "Signature", signHere: "Sign here with your finger", clear: "Clear",
    create: "Create PDF report", createUpload: "Create report & upload",
    newSheet: "Start a new sheet", confirmNew: "Clear this sheet and start again? Everything on it will be removed from this phone.",
    yesClear: "Yes, clear it", cancel: "Cancel",
    missing: "Fill these in first:", checked: "checked", today: "Today",
    addHarness: "Add a harness", harnessN: "Harness", asset: "Winthrop Asset No.", harnessSerial: "Harness Serial No.",
    lanyardSerial: "Lanyard Serial No.", gLanyard: "Lanyard", gHarness: "Harness", gHardware: "Connectors",
    dateInspected: "Date Inspected", certDate: "Certification Date", issueDate: "Post Certification Date of issue",
    expiryDate: "Post Issue Certification Expiry Date", expired: "Certificate expired. Take this harness out of use.",
    remove: "Remove", inspector: "Inspected by", noHarness: "No harnesses added yet. Add the first one to start the register.",
    harnessFail: "This harness has a failed check. Take it out of use and tag it.",
    settings: "SharePoint upload", back: "Back",
    working: "Creating report…", uploading: "Uploading to SharePoint…",
    uploaded: "Uploaded to the SharePoint safety folder.", openInSp: "Open in SharePoint",
    uploadFailed: "Upload didn't go through. Check the signal, then try again, or download the PDF and add it to SharePoint yourself.",
    tryAgain: "Try upload again", download: "Download PDF", share: "Share PDF", close: "Done",
    reportReady: "Report ready", notSetUp: "Automatic upload isn't set up on this device yet, so download or share the PDF instead.",
    artifactNote: "Automatic upload works from the hosted copy of this app. Here, download the PDF and add it to SharePoint.",
    saved: "Saved on this phone", lang: "Language", pdfFail: "The report couldn't be created. Check the signal and try again.",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], dayN: "Day"
  },
  ro: {
    appName: "Verificări de siguranță", pick: "Alegeți o listă de verificare",
    mewpTitle: "Inspecție zilnică MEWP", mewpSub: "Fișă săptămânală · 33 verificări pe zi",
    harnessTitle: "Registru inspecție hamuri", harnessSub: "O înregistrare pentru fiecare ham și lonjă",
    inProgress: "În lucru", notStarted: "Neînceput",
    details: "Detalii fișă", project: "Proiect", projectNo: "Nr Proiect", location: "Locația/zona",
    contractor: "Nume Companie", model: "MEW Model / Seria", weekStart: "Data (începutul săptămânii)",
    drawingRef: "Referință desen", plantRef: "Referință instalație / sistem", date: "Data",
    manualNote: "Toate verificările trebuie efectuate în conformitate cu manualul producătorului.",
    sec1: "Inspecție și descriere", sec1Sub: "Admis / Respins pentru fiecare zi",
    sec2: "Scanați zona de lucru 20 secunde",
    scanIntro: "Înainte de utilizarea MEWP, verificați zona de lucru pentru condiții periculoase care pot afecta utilizarea în condiții de siguranță a mașinii sau zone greu accesibile. Dacă există condiții, raportați imediat managerului de șantier și nu continuați cu activitatea.",
    sec2Sub: "Sunt prezente condiții? Verificați pentru fiecare zi.",
    pass: "Admis", fail: "Respins", P: "A", F: "R",
    howTo: "Atingeți căsuța pentru Admis. Atingeți ✕ pentru Respins.",
    failNote: "Ce nu este în regulă?",
    failBanner: "O verificare a fost respinsă astăzi. Nu folosiți MEWP până nu este remediată. Raportați managerului de șantier.",
    comments: "Comentarii", commentsPh: "Defecte găsite, măsuri luate, cine a fost anunțat",
    signoffs: "Semnătura săptămânală", operator: "Operator MEWP", spotter: "Spotter",
    name: "Nume", role: "Funcția", signature: "Semnătura", signHere: "Semnați aici cu degetul", clear: "Șterge",
    create: "Creează raport PDF", createUpload: "Creează raportul și încarcă",
    newSheet: "Începe o fișă nouă", confirmNew: "Ștergeți această fișă și începeți din nou? Totul va fi eliminat de pe acest telefon.",
    yesClear: "Da, șterge", cancel: "Anulează",
    missing: "Completați mai întâi:", checked: "verificate", today: "Azi",
    addHarness: "Adaugă un ham", harnessN: "Ham", asset: "Nr. activ Winthrop", harnessSerial: "Nr. serie ham",
    lanyardSerial: "Nr. serie lonjă", gLanyard: "Lonjă", gHarness: "Ham", gHardware: "Conectori",
    dateInspected: "Data inspecției", certDate: "Data certificării", issueDate: "Data emiterii după certificare",
    expiryDate: "Data expirării certificării", expired: "Certificat expirat. Scoateți hamul din uz.",
    remove: "Elimină", inspector: "Inspectat de", noHarness: "Nu a fost adăugat niciun ham. Adăugați primul pentru a începe registrul.",
    harnessFail: "Acest ham are o verificare respinsă. Scoateți-l din uz și etichetați-l.",
    settings: "Încărcare SharePoint", back: "Înapoi",
    working: "Se creează raportul…", uploading: "Se încarcă în SharePoint…",
    uploaded: "Încărcat în dosarul de siguranță SharePoint.", openInSp: "Deschide în SharePoint",
    uploadFailed: "Încărcarea nu a reușit. Verificați semnalul și încercați din nou sau descărcați PDF-ul.",
    tryAgain: "Încearcă din nou", download: "Descarcă PDF", share: "Trimite PDF", close: "Gata",
    reportReady: "Raport gata", notSetUp: "Încărcarea automată nu este configurată pe acest dispozitiv. Descărcați sau trimiteți PDF-ul.",
    artifactNote: "Încărcarea automată funcționează din versiunea găzduită a aplicației. Aici, descărcați PDF-ul.",
    saved: "Salvat pe acest telefon", lang: "Limba", pdfFail: "Raportul nu a putut fi creat. Verificați semnalul și încercați din nou.",
    days: ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"], dayN: "Ziua"
  },
  pl: {
    appName: "Kontrole bezpieczeństwa", pick: "Wybierz listę kontrolną",
    mewpTitle: "Dzienna inspekcja MEWP", mewpSub: "Arkusz tygodniowy · 33 kontrole dziennie",
    harnessTitle: "Rejestr inspekcji szelek", harnessSub: "Jeden wpis na każde szelki i linkę",
    inProgress: "W toku", notStarted: "Nie rozpoczęto",
    details: "Dane arkusza", project: "Projekt", projectNo: "Nr projektu", location: "Lokacja / obszar",
    contractor: "Firma", model: "Model MEWP / numer seryjny", weekStart: "Początek tygodnia",
    drawingRef: "Nr rysunku", plantRef: "Instalacja / system", date: "Data",
    manualNote: "Wszystkie kontrole należy przeprowadzać zgodnie z instrukcją producenta.",
    sec1: "Element kontroli i opis", sec1Sub: "Zaliczony / niezaliczony dla każdego dnia",
    sec2: "Obszar badania – 20-sekundowy skan",
    scanIntro: "Przed użyciem MEWP należy sprawdzić obszar pracy w celu wykrycia niebezpiecznych warunków, które mogą mieć wpływ na bezpieczne użytkowanie maszyny lub trudno dostępnych miejsc. Jeśli istnieją takie warunki, natychmiast zgłoś to kierownikowi budowy i nie kontynuuj zadania.",
    sec2Sub: "Czy istnieją warunki? Zweryfikuj dla każdego dnia.",
    pass: "Zaliczony", fail: "Niezaliczony", P: "P", F: "F",
    howTo: "Dotknij pola, aby zaliczyć. Dotknij ✕, jeśli niezaliczony.",
    failNote: "Co jest nie tak?",
    failBanner: "Dzisiejsza kontrola jest niezaliczona. Nie używaj MEWP do czasu naprawy. Zgłoś to kierownikowi budowy.",
    comments: "Komentarze", commentsPh: "Wykryte usterki, podjęte działania, kogo poinformowano",
    signoffs: "Podpisy tygodniowe", operator: "Operator MEWP", spotter: "Obserwator",
    name: "Imię i nazwisko", role: "Stanowisko", signature: "Podpis", signHere: "Podpisz palcem", clear: "Wyczyść",
    create: "Utwórz raport PDF", createUpload: "Utwórz raport i wyślij",
    newSheet: "Zacznij nowy arkusz", confirmNew: "Wyczyścić ten arkusz i zacząć od nowa? Wszystko zostanie usunięte z tego telefonu.",
    yesClear: "Tak, wyczyść", cancel: "Anuluj",
    missing: "Najpierw uzupełnij:", checked: "sprawdzono", today: "Dziś",
    addHarness: "Dodaj szelki", harnessN: "Szelki", asset: "Nr inwentarzowy Winthrop", harnessSerial: "Nr seryjny szelek",
    lanyardSerial: "Nr seryjny linki", gLanyard: "Linka", gHarness: "Szelki", gHardware: "Łączniki",
    dateInspected: "Data inspekcji", certDate: "Data certyfikacji", issueDate: "Data wydania po certyfikacji",
    expiryDate: "Data ważności certyfikatu", expired: "Certyfikat wygasł. Wycofaj szelki z użytku.",
    remove: "Usuń", inspector: "Sprawdził(a)", noHarness: "Nie dodano jeszcze szelek. Dodaj pierwsze, aby rozpocząć rejestr.",
    harnessFail: "Te szelki mają niezaliczoną kontrolę. Wycofaj je z użytku i oznacz.",
    settings: "Wysyłanie do SharePoint", back: "Wstecz",
    working: "Tworzenie raportu…", uploading: "Wysyłanie do SharePoint…",
    uploaded: "Wysłano do folderu bezpieczeństwa w SharePoint.", openInSp: "Otwórz w SharePoint",
    uploadFailed: "Wysyłanie nie powiodło się. Sprawdź zasięg i spróbuj ponownie albo pobierz PDF.",
    tryAgain: "Spróbuj ponownie", download: "Pobierz PDF", share: "Udostępnij PDF", close: "Gotowe",
    reportReady: "Raport gotowy", notSetUp: "Automatyczne wysyłanie nie jest skonfigurowane na tym urządzeniu. Pobierz lub udostępnij PDF.",
    artifactNote: "Automatyczne wysyłanie działa w hostowanej wersji aplikacji. Tutaj pobierz PDF.",
    saved: "Zapisano na tym telefonie", lang: "Język", pdfFail: "Nie udało się utworzyć raportu. Sprawdź zasięg i spróbuj ponownie.",
    days: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"], dayN: "Dzień"
  }
};

/* Strings added for the daily report, site list and tracker */
Object.assign(T.en, {
  mewpSub: "One report per machine per day · 33 checks", harnessSub: "Each person's harness and lanyard",
  mewp: "MEWP", chooseMewp: "Choose the MEWP", choosePerson: "Choose a name", search: "Search", searchMewp: "Search model or serial",
  notListed: "Name not on the list? Add it", addToList: "Add to site list", company: "Company", fullName: "Full name",
  mewpNotListed: "MEWP not on the list? Add it", mewpLabel: "MEWP model / serial no", noMatch: "No match. Check the spelling or add it below.",
  left: "left to complete", completeAll: "Every field, tickbox and signature must be completed before the report can be created.",
  needComment: "Comments are needed because a check failed.", wornBy: "Harness worn by",
  submitted: "Report submitted", recorded: "Recorded on the site tracker.", queued: "No signal. The report is saved on this phone and will reach the tracker when signal returns.",
  supervisor: "Supervisor", signOut: "Sign out", tracker: "Site tracker", siteList: "Site list", siteSettings: "Site settings",
  dayReport: "Inspection date", resultCol: "Result", loading: "Loading the site list…", change: "Change",
  checksDone: "checks done", rowsDone: "harnesses complete", signoffs: "Sign-offs"
});
Object.assign(T.ro, {
  mewpSub: "Un raport pe utilaj pe zi · 33 verificări", harnessSub: "Hamul și lonja fiecărei persoane",
  mewp: "MEWP", chooseMewp: "Alegeți MEWP-ul", choosePerson: "Alegeți un nume", search: "Căutare", searchMewp: "Căutați model sau serie",
  notListed: "Numele nu este în listă? Adăugați-l", addToList: "Adaugă în lista șantierului", company: "Companie", fullName: "Nume complet",
  mewpNotListed: "MEWP-ul nu este în listă? Adăugați-l", mewpLabel: "Model MEWP / seria", noMatch: "Nu s-a găsit. Verificați ortografia sau adăugați mai jos.",
  left: "rămase de completat", completeAll: "Toate câmpurile, căsuțele și semnăturile trebuie completate înainte de a crea raportul.",
  needComment: "Sunt necesare comentarii deoarece o verificare a fost respinsă.", wornBy: "Ham purtat de",
  submitted: "Raport trimis", recorded: "Înregistrat în evidența șantierului.", queued: "Fără semnal. Raportul este salvat pe telefon și va fi trimis când revine semnalul.",
  supervisor: "Supervizor", signOut: "Deconectare", tracker: "Evidența șantierului", siteList: "Lista șantierului", siteSettings: "Setări șantier",
  dayReport: "Data inspecției", resultCol: "Rezultat", loading: "Se încarcă lista…", change: "Schimbă",
  checksDone: "verificări făcute", rowsDone: "hamuri complete", signoffs: "Semnături"
});
Object.assign(T.pl, {
  mewpSub: "Jeden raport na maszynę dziennie · 33 kontrole", harnessSub: "Szelki i linka każdej osoby",
  mewp: "MEWP", chooseMewp: "Wybierz MEWP", choosePerson: "Wybierz nazwisko", search: "Szukaj", searchMewp: "Szukaj modelu lub numeru",
  notListed: "Brak nazwiska na liście? Dodaj je", addToList: "Dodaj do listy budowy", company: "Firma", fullName: "Imię i nazwisko",
  mewpNotListed: "Brak MEWP na liście? Dodaj go", mewpLabel: "Model MEWP / numer seryjny", noMatch: "Brak wyników. Sprawdź pisownię lub dodaj poniżej.",
  left: "do uzupełnienia", completeAll: "Przed utworzeniem raportu trzeba uzupełnić każde pole, pole wyboru i podpis.",
  needComment: "Komentarz jest wymagany, ponieważ kontrola jest niezaliczona.", wornBy: "Szelki używane przez",
  submitted: "Raport wysłany", recorded: "Zapisano w rejestrze budowy.", queued: "Brak zasięgu. Raport jest zapisany w telefonie i zostanie wysłany po odzyskaniu zasięgu.",
  supervisor: "Kierownik", signOut: "Wyloguj", tracker: "Rejestr budowy", siteList: "Lista budowy", siteSettings: "Ustawienia budowy",
  dayReport: "Data inspekcji", resultCol: "Wynik", loading: "Ładowanie listy…", change: "Zmień",
  checksDone: "kontroli wykonano", rowsDone: "szelek kompletnych", signoffs: "Podpisy"
});

/* Leaving a form and clearing a form */
Object.assign(T.en, { menu: "Menu", mainMenu: "Main menu", leaveTitle: "Leave this form?", leaveBody: "Your answers so far stay saved on this phone. You can come back and finish it later.",
  keepWorking: "Keep working", goMenu: "Go to main menu", clearTitle: "Delete everything on this form?", clearBody: "This removes every tick, note and signature on this form from this phone. It can't be undone.",
  keepProgress: "No, keep my progress", yesDelete: "Yes, delete it", doneSoFar: "done so far" });
Object.assign(T.ro, { menu: "Meniu", mainMenu: "Meniu principal", leaveTitle: "Părăsiți formularul?", leaveBody: "Răspunsurile de până acum rămân salvate pe acest telefon. Puteți reveni mai târziu să-l terminați.",
  keepWorking: "Continuă completarea", goMenu: "Mergi la meniul principal", clearTitle: "Ștergeți tot din acest formular?", clearBody: "Se șterg toate bifele, notițele și semnăturile din acest formular de pe telefon. Acțiunea nu poate fi anulată.",
  keepProgress: "Nu, păstrează progresul", yesDelete: "Da, șterge", doneSoFar: "completate până acum" });
Object.assign(T.pl, { menu: "Menu", mainMenu: "Menu główne", leaveTitle: "Opuścić formularz?", leaveBody: "Dotychczasowe odpowiedzi zostają zapisane w tym telefonie. Możesz wrócić i dokończyć później.",
  keepWorking: "Kontynuuj", goMenu: "Przejdź do menu głównego", clearTitle: "Usunąć wszystko z tego formularza?", clearBody: "Zostaną usunięte wszystkie zaznaczenia, notatki i podpisy z tego formularza w telefonie. Tego nie można cofnąć.",
  keepProgress: "Nie, zachowaj postęp", yesDelete: "Tak, usuń", doneSoFar: "wykonano do tej pory" });

Object.assign(T.en, { optional: "optional" }); Object.assign(T.ro, { optional: "opțional" }); Object.assign(T.pl, { optional: "opcjonalnie" });

/* ================= Site Safety Checks ================= */
const CFG = window.SSC_CONFIG || {};
const LOGO_OKEE = "data:image/png;base64,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";
const LOGO_WIN = "data:image/png;base64,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+nfF63dMK1q77fuzqp/+rwHhmakjwoProUxUv6Ka2DNzvtfMgero204SuGMZi0FRC1/VnMkIaseImBHsbxjT8FbhRCmEEIXxKlIAvToVhBByYta+ZcOIungLwkkfNu/7z+fY3f37ZN6EcanuI+/ct7L8zwhFPCiFQlNTej1UAWgyEL4oNfue6P8zcvN+r+Ldh2HjwtY7yrve4lEeXbhw4eL1ODE51ERxbeON877/Ihete+alorWxq0b6+txv/eOSonXPvjT3f/Zx0dptn3aOuS6d8FbToF24cHGmtOgQCGHSRTVbfmiMm/pJq/MVG8w/ZEkR1W+3eD12MsXGJAP0XkhztZE3Ics6dvC+1jULv3Am00m5AtqFCxdvTbkSChHCYV1UE/syeTyrZc64AjBDJ3rBVhIiuwAkDaieYy+rVPLre9eUf9cVzq6AduHCxZmTLQwAM+5smGzmFi6G1mXQ9nSAAMN8iRhRnXjlz613vMPlnF24cOHijGM07mmuC5urQbtw4eINAjOhapN0MsE4MborsEk0lC7hMWUjcuHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly4cOHChQsXLly8NfD/A8qmWmhb7pt+AAAAAElFTkSuQmCC";
const PDF_LIBS = [
  ["https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/pdfmake.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"],
  ["https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/vfs_fonts.js", "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"]
];
const IN_ARTIFACT = !!(window.claude && typeof window.claude.use === "function") || /claude(usercontent)?\.(ai|com)$/.test(location.hostname);

/* ---------- on-phone storage (drafts, language, "this is me") ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("ssc." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("ssc." + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad2 = n => String(n).padStart(2, "0");
const iso = d => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
const parseISO = s => { if (!s) return null; const [y, m, d] = String(s).split("-").map(Number); return y ? new Date(y, m - 1, d) : null; };
const fmt = s => { const d = parseISO(s); return d ? pad2(d.getDate()) + "/" + pad2(d.getMonth() + 1) + "/" + d.getFullYear() : ""; };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const todayISO = () => iso(new Date());
const endOf = s => { const d = parseISO(s); return d ? d.getTime() + 864e5 - 1 : 0; };
const hhmm = ms => { const d = new Date(ms); return pad2(d.getHours()) + ":" + pad2(d.getMinutes()); };
const dayIdx = s => { const d = parseISO(s); return d ? (d.getDay() + 6) % 7 : 0; };
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").trim();
const TICK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

/* ---------- language ---------- */
let lang = store.get("lang", "en"); if (!T[lang]) lang = "en";
const t = k => (T[lang][k] != null ? T[lang][k] : T.en[k]);
const bi = (local, en) => (lang === "en" || !en || local === en ? esc(local) : `${esc(local)} <span class="en">${esc(en)}</span>`);

/* ================= Backend inside Claude (the hosted site uses firebase-shim.js instead) ================= */
async function claudeBackend() {
  const [db, user, downloads] = await Promise.all([claude.use("db"), claude.use("user"), claude.use("downloads")]);
  if (!db) throw new Error("no-db");
  const canEdit = user ? await user.canEdit().catch(() => false) : false;
  let me = null; try { me = user ? await user.me() : null; } catch (e) {}
  const q = (coll, filters) => (filters || []).reduce((acc, f) => acc.where(f[0], f[1], f[2]), db.collection(coll));
  return {
    kind: "claude", role: canEdit ? "supervisor" : "operative", me: me ? { name: me.name || "", email: me.email || "" } : null, uid: (me && me.id) || "viewer", canSignIn: false,
    watch: (coll, filters, cb, onErr) => q(coll, filters).onSnapshot(qs => cb(qs.docs.map(d => ({ id: d.id, ...d.data() }))), e => onErr && onErr(e)),
    get: async (coll, id) => { const s = await db.doc(coll + "/" + id).get(); return s.exists ? s.data() : null; },
    set: (coll, id, data) => db.doc(coll + "/" + id).set(data),
    update: (coll, id, data) => db.doc(coll + "/" + id).update(data),
    remove: (coll, id) => db.doc(coll + "/" + id).delete(),
    newId: rid,
    download: async (filename, blob) => { if (!downloads) throw { code: "unavailable" }; return downloads.save({ filename, data: blob }); },
    canUpload: false
  };
}

/* ================= State ================= */
let B = null;                         // backend
const D = { people: [], mewps: [], config: {}, subs: [], excused: [], members: [], loaded: { people: false, mewps: false } };
const PM = () => Object.fromEntries(D.people.map(p => [p.id, p]));
const MM = () => Object.fromEntries(D.mewps.map(m => [m.id, m]));
let view = "home";
let trackDate = todayISO();
let slTab = "people", slSearch = "";
let showMissing = { mewp: false, harness: false };

const newMewp = () => ({ header: { project: "", projectNo: "", location: "", contractor: "", date: todayISO() }, mewpId: "", checks: {}, notes: {}, comments: "",
  operator: { pid: store.get("me", ""), role: "", sig: "" }, spotter: { pid: "", role: "", sig: "" } });
const newHRow = () => ({ id: rid(), pid: "", asset: "", harnessSerial: "", lanyardSerial: "", checks: {}, dateInspected: todayISO(), certDate: "", issueDate: "", expiryDate: "", sig: "" });
const newHarness = () => { const h = { header: { project: "", projectNo: "", location: "", drawingRef: "", plantRef: "", date: todayISO() }, rows: [newHRow()], comments: "" }; h.rows[0].pid = store.get("me", ""); return h; };
const S = { mewp: store.get("mewp2", null) || newMewp(), harness: store.get("harness2", null) || newHarness() };
// a draft from an earlier day starts on today's date
if (S.mewp.header.date < todayISO() && !Object.keys(S.mewp.checks).length) S.mewp.header.date = todayISO();
if (S.harness.header.date < todayISO() && !S.harness.rows.some(r => Object.keys(r.checks).length)) { S.harness.header.date = todayISO(); S.harness.rows.forEach(r => r.dateInspected = todayISO()); }

let savedTimer;
function save(which) { if (store.set(which === "mewp" ? "mewp2" : "harness2", S[which])) { const el = $("#saved"); if (el) { clearTimeout(savedTimer); } } refreshBar(); }
function setPath(path, val) {
  const parts = path.split("."); let o = S;
  for (let i = 0; i < parts.length - 1; i++) { const p = parts[i]; if (Array.isArray(o)) { o = o.find(r => r.id === p); continue; } o = o[p] = o[p] || {}; }
  o[parts[parts.length - 1]] = val;
}
function getPath(path) { return path.split(".").reduce((o, p) => (o == null ? undefined : Array.isArray(o) ? o.find(r => r.id === p) : o[p]), S); }
const isSup = () => B && B.role === "supervisor";
const flowUrl = () => String(D.config.flowUrl || CFG.flowUrl || "").trim();
function applyDefaults() {
  const c = D.config; let ch = false;
  for (const [form, keys] of [["mewp", ["project", "projectNo", "location", "contractor"]], ["harness", ["project", "projectNo", "location", "drawingRef", "plantRef"]]])
    for (const k of keys) if (!S[form].header[k] && c[k]) { S[form].header[k] = c[k]; ch = true; }
  if (ch) { store.set("mewp2", S.mewp); store.set("harness2", S.harness); }
}

/* ================= Rendering ================= */
const TITLES = { mewp: "mewpTitle", harness: "harnessTitle", tracker: "tracker", sitelist: "siteList", settings: "siteSettings", home: "appName" };
function render() {
  document.documentElement.lang = lang;
  $("#langs").innerHTML = Object.keys(LANGS).map(k => `<button type="button" data-lang="${k}" aria-pressed="${k === lang}" title="${LANGS[k]}">${k.toUpperCase()}</button>`).join("");
  const app = $("#app");
  if (!B) { app.innerHTML = `<p class="muted"><span class="spin"></span>${esc(t("loading"))}</p>`; $("#bottom").hidden = true; return; }
  if (!isSup() && ["tracker", "sitelist", "settings"].includes(view)) view = "home";
  app.innerHTML = view === "mewp" ? mewpView() : view === "harness" ? harnessView() : view === "tracker" ? trackerView() : view === "sitelist" ? siteListView() : view === "settings" ? settingsView() : homeView();
  $("#bottom").hidden = !(view === "mewp" || view === "harness");
  $("#hTitle").textContent = t(TITLES[view] || "appName");
  const bb = $("#backBtn"); bb.hidden = view === "home"; bb.querySelector("span").textContent = t("menu"); $(".top img").hidden = view !== "home";
  $("#hSub").textContent = view === "home" ? (D.config.project || "MEWP · Harness") : (view === "mewp" ? S.mewp.header.project : view === "harness" ? S.harness.header.project : D.config.project || "");
  $$(".pad canvas").forEach(mountPad);
  document.documentElement.style.setProperty("--topH", $(".top").offsetHeight + "px");
  if (showMissing[view]) markMissing(false);
  refreshBar();
}
function field(path, labelKey, type = "text", extra = "", optional = false) {
  const v = getPath(path) || ""; const id = "f_" + path.replace(/\W/g, "_");
  return `<div class="field"><label for="${id}">${bi(t(labelKey), T.en[labelKey])}${optional ? ` <span class="opt">(${esc(t("optional"))})</span>` : ""}</label><input id="${id}" type="${type}" data-bind="${path}" value="${esc(v)}" ${extra} autocomplete="off"></div>`;
}
const personLabel = id => { const p = PM()[id]; return p ? p.name + (p.company ? " · " + p.company : "") : ""; };
const mewpLabel = id => { const m = MM()[id]; return m ? m.label : ""; };
function picker(path, kind, labelKey) {
  const v = getPath(path) || ""; const txt = kind === "mewp" ? mewpLabel(v) : personLabel(v);
  return `<div class="field"><label>${bi(t(labelKey), T.en[labelKey])}</label><button type="button" class="pick ${txt ? "" : "empty"}" data-pick="${path}" data-kind="${kind}"><span>${esc(txt || (kind === "mewp" ? t("chooseMewp") : t("choosePerson")))}</span><b>›</b></button></div>`;
}

/* ---------- Home ---------- */
function todayCounts(date) { const st = dayStatus(date); return st; }
function homeView() {
  const m = S.mewp, h = S.harness;
  const mN = Object.keys(m.checks).length, hN = h.rows.filter(r => Object.keys(r.checks).length).length;
  const icoM = '<svg viewBox="0 0 32 32"><rect x="6" y="6" width="20" height="7" rx="1"/><path d="M8 13l16 8M24 13L8 21"/><rect x="5" y="21" width="22" height="4" rx="1"/><circle cx="9" cy="28" r="1.6"/><circle cx="23" cy="28" r="1.6"/></svg>';
  const icoH = '<svg viewBox="0 0 32 32"><circle cx="16" cy="5" r="2.5"/><path d="M10 9l6 4 6-4M11 9v8l5 5 5-5V9M11 17l-3 9M21 17l3 9M16 22v8"/></svg>';
  const icoT = '<svg viewBox="0 0 32 32"><rect x="5" y="5" width="22" height="22" rx="2"/><path d="M10 21v-5M16 21v-9M22 21v-12"/></svg>';
  const icoL = '<svg viewBox="0 0 32 32"><circle cx="12" cy="11" r="4"/><path d="M4 26c1-5 4-7 8-7s7 2 8 7M21 9h7M21 14h7M23 19h5"/></svg>';
  let sup = "";
  if (isSup()) {
    const st = dayStatus(todayISO());
    sup = `<div class="eyebrow" style="margin-top:8px">${esc(t("supervisor"))}</div>
    <button class="tile" type="button" data-go="tracker"><span class="ico">${icoT}</span><span><strong>${esc(t("tracker"))}</strong><span class="muted">Today: harness ${st.closed ? "site closed" : st.h.done.length + " of " + st.h.total} · MEWP ${st.closed ? "–" : st.m.done.length + " of " + st.m.total}</span>${st.h.missing.length || st.m.missing.length ? `<br><span class="pill warn">${st.h.missing.length + st.m.missing.length} outstanding today</span>` : ""}</span><span class="chev">›</span></button>
    <button class="tile" type="button" data-go="sitelist"><span class="ico">${icoL}</span><span><strong>${esc(t("siteList"))}</strong><span class="muted">${D.people.filter(p => p.active !== false).length} people · ${D.mewps.filter(x => x.active !== false).length} MEWPs</span>${D.people.some(p => p.selfAdded && p.active !== false) ? `<br><span class="pill on">${D.people.filter(p => p.selfAdded && p.active !== false).length} new names to check</span>` : ""}</span><span class="chev">›</span></button>
    <button class="ghost dashed" type="button" data-go="settings">⚙ ${esc(t("siteSettings"))}</button>`;
  }
  return `
  <div class="eyebrow">${esc(t("pick"))}</div>
  <button class="tile" type="button" data-go="mewp"><span class="ico">${icoM}</span><span><strong>${esc(t("mewpTitle"))}</strong><span class="muted">${esc(t("mewpSub"))}</span><br><span class="pill ${mN ? "on" : ""}">${esc(mN ? t("inProgress") + " · " + mN + "/33" : t("notStarted"))}</span></span><span class="chev">›</span></button>
  <button class="tile" type="button" data-go="harness"><span class="ico">${icoH}</span><span><strong>${esc(t("harnessTitle"))}</strong><span class="muted">${esc(t("harnessSub"))}</span><br><span class="pill ${hN ? "on" : ""}">${esc(hN ? t("inProgress") : t("notStarted"))}</span></span><span class="chev">›</span></button>
  ${sup}
  <div class="acct">${isSup() ? `<span class="muted">${esc(t("supervisor"))}${B.me && (B.me.name || B.me.email) ? ": " + esc(B.me.name || B.me.email) : ""}</span>${B.canSignIn ? `<button class="linkbtn plain" type="button" data-act="signout">${esc(t("signOut"))}</button>` : ""}` : B.canSignIn ? `<button class="linkbtn plain" type="button" data-act="signin">${esc(t("supervisor"))} ›</button>` : ""}</div>
  <p class="foot">IFHS 87 MEWP Daily Inspection Checklist R3 · Harness Site Inspection Register</p>`;
}

/* ---------- MEWP daily report ---------- */
function mewpRow(it) {
  const line = it[0], v = S.mewp.checks[line] || "", note = S.mewp.notes[line] || "";
  return `<div class="row ${v === "F" ? "is-f" : ""}" id="r${line}">
    <span class="n">${line}</span>
    <span class="tx">${bi(it[LI[lang]], it[1])}</span>
    <button type="button" class="tick" role="checkbox" aria-checked="${v === "P"}" aria-label="${esc(t("pass"))} ${line}" data-act="tick" data-line="${line}">${TICK_SVG}</button>
    <button type="button" class="x" aria-pressed="${v === "F"}" aria-label="${esc(t("fail"))} ${line}" data-act="fail" data-line="${line}">✕</button>
    ${v === "F" ? `<div class="note"><input type="text" id="note_${line}" placeholder="${esc(t("failNote"))}" data-bind="mewp.notes.${line}" value="${esc(note)}"></div>` : ""}
  </div>`;
}
function mewpView() {
  const m = S.mewp; const dn = T[lang].days[dayIdx(m.header.date)];
  const nf = Object.values(m.checks).filter(v => v === "F").length;
  const sig = (who, key) => `<div class="sig"><h3>${bi(t(key), T.en[key])}</h3>
      ${picker(`mewp.${who}.pid`, "person", "name")}${field(`mewp.${who}.role`, "role")}
      <div class="field"><label>${bi(t("signature"), "Signature")}</label><div class="pad" data-pad="mewp.${who}.sig"><canvas data-sig="mewp.${who}.sig"></canvas><span>${esc(t("signHere"))}</span><button type="button" class="clr" data-clear="mewp.${who}.sig">${esc(t("clear"))}</button></div></div></div>`;
  return `
  <section class="card"><h2>${esc(t("details"))}</h2><div class="fields">
    ${field("mewp.header.project", "project")}${field("mewp.header.projectNo", "projectNo")}
    ${field("mewp.header.location", "location")}${field("mewp.header.contractor", "contractor")}
    ${picker("mewp.mewpId", "mewp", "model")}${field("mewp.header.date", "dayReport", "date", `max="${todayISO()}"`)}
  </div><p class="muted" style="margin:0;font-size:13px">${esc(t("manualNote"))}</p></section>
  <div class="progress" id="prog">${esc(dn)} ${esc(fmt(m.header.date))} · <span id="progN">${Object.keys(m.checks).length}</span>/33 ${esc(t("checksDone"))}</div>
  <div id="failAlert">${nf ? `<div class="alert" role="alert">${esc(t("failBanner"))}</div>` : ""}</div>
  <section class="sechead"><h2>${esc(t("sec1"))}</h2><span class="howto">${esc(t("howTo"))}</span></section>
  <div class="list">${MEWP_ITEMS.slice(0, 21).map(mewpRow).join("")}</div>
  <section class="sechead"><h2>${esc(t("sec2"))}</h2><div class="scan"><b>⚠</b> ${esc(t("scanIntro"))}</div><span class="howto">${esc(t("sec2Sub"))}</span></section>
  <div class="list">${MEWP_ITEMS.slice(21).map(mewpRow).join("")}</div>
  <section class="card"><h2>${esc(t("comments"))}</h2><textarea id="mewp_comments" data-bind="mewp.comments" placeholder="${esc(t("commentsPh"))}">${esc(m.comments)}</textarea></section>
  <section class="card"><h2>${esc(t("signoffs"))}</h2><div class="signs">${sig("operator", "operator")}${sig("spotter", "spotter")}</div></section>
  <div class="formfoot"><button class="ghost" type="button" data-go="home">‹ ${esc(t("mainMenu"))}</button><button class="ghost danger" type="button" data-act="reset" data-form="mewp">${esc(t("newSheet"))}</button></div>`;
}
function refreshMewpChrome() {
  const n = Object.keys(S.mewp.checks).length, nf = Object.values(S.mewp.checks).filter(v => v === "F").length;
  const p = $("#progN"); if (p) p.textContent = n;
  const fa = $("#failAlert"); if (fa) fa.innerHTML = nf ? `<div class="alert" role="alert">${esc(t("failBanner"))}</div>` : "";
}

/* ---------- Harness register ---------- */
function hCheck(r, c) {
  const v = r.checks[c.k] || "";
  return `<div class="hchk ${v === "F" ? "is-f" : ""}" data-hk="${r.id}_${c.k}"><span class="lbl">${esc(c[lang])}${lang !== "en" ? `<small>${esc(c.en)}</small>` : ""}</span>
    <button type="button" class="tick" role="checkbox" aria-checked="${v === "P"}" aria-label="${esc(c[lang])} ${esc(t("pass"))}" data-act="htick" data-row="${r.id}" data-k="${c.k}">${TICK_SVG}</button>
    <button type="button" class="x" aria-pressed="${v === "F"}" aria-label="${esc(c[lang])} ${esc(t("fail"))}" data-act="hfail" data-row="${r.id}" data-k="${c.k}">✕</button></div>`;
}
const expired = r => { const d = parseISO(r.expiryDate); const now = new Date(); now.setHours(0, 0, 0, 0); return !!d && d < now; };
function harnessCard(r, i) {
  const p = `harness.rows.${r.id}`; const anyF = H_CHECKS.some(c => r.checks[c.k] === "F");
  const grp = g => H_CHECKS.filter(c => c.g === g).map(c => hCheck(r, c)).join("");
  const gl = k => `<div class="grp">${esc(t(k))}</div>`;
  return `<article class="hcard ${anyF || expired(r) ? "is-f" : ""}" id="h_${r.id}">
    <div class="hhead"><h3>${esc(t("harnessN"))} ${i + 1}</h3>${S.harness.rows.length > 1 ? `<button type="button" class="linkbtn" data-act="hremove" data-row="${r.id}">${esc(t("remove"))}</button>` : ""}</div>
    ${picker(p + ".pid", "person", "wornBy")}
    <div class="fields">${field(p + ".asset", "asset", "text", "", true)}${field(p + ".harnessSerial", "harnessSerial", "text", "", true)}${field(p + ".lanyardSerial", "lanyardSerial", "text", "", true)}</div>
    ${gl("gLanyard")}<div class="hgrid">${grp("lanyard")}</div>
    ${gl("gHarness")}<div class="hgrid">${grp("harness")}</div>
    ${gl("gHardware")}<div class="hgrid">${grp("hardware")}</div>
    <div class="hwarn">${anyF ? `<div class="alert">${esc(t("harnessFail"))}</div>` : ""}${expired(r) ? `<div class="alert">${esc(t("expired"))}</div>` : ""}</div>
    <div class="fields">${field(p + ".dateInspected", "dateInspected", "date", "", true)}${field(p + ".certDate", "certDate", "date", "", true)}${field(p + ".issueDate", "issueDate", "date", "", true)}${field(p + ".expiryDate", "expiryDate", "date", "", true)}</div>
    <div class="field"><label>${bi(t("signature"), "Signature")}</label><div class="pad" data-pad="${p}.sig"><canvas data-sig="${p}.sig"></canvas><span>${esc(t("signHere"))}</span><button type="button" class="clr" data-clear="${p}.sig">${esc(t("clear"))}</button></div></div>
  </article>`;
}
function harnessView() {
  const h = S.harness;
  return `
  <section class="card"><h2>${esc(t("details"))}</h2><div class="fields">
    ${field("harness.header.project", "project")}${field("harness.header.projectNo", "projectNo")}
    ${field("harness.header.location", "location")}${field("harness.header.drawingRef", "drawingRef", "text", "", true)}
    ${field("harness.header.plantRef", "plantRef", "text", "", true)}${field("harness.header.date", "date", "date", `max="${todayISO()}"`)}
  </div></section>
  <span class="howto">${esc(t("howTo"))}</span>
  <div id="hlist" style="display:flex;flex-direction:column;gap:12px">${h.rows.map(harnessCard).join("")}</div>
  <button class="ghost" type="button" data-act="hadd">+ ${esc(t("addHarness"))}</button>
  <section class="card"><h2>${esc(t("comments"))} <span class="opt">(${esc(t("optional"))})</span></h2><textarea id="harness_comments" data-bind="harness.comments" placeholder="${esc(t("commentsPh"))}">${esc(h.comments)}</textarea></section>
  <div class="formfoot"><button class="ghost" type="button" data-go="home">‹ ${esc(t("mainMenu"))}</button><button class="ghost danger" type="button" data-act="reset" data-form="harness">${esc(t("newSheet"))}</button></div>`;
}

/* ================= Validation: every field, tick and signature ================= */
function missing(form) {
  const out = []; const req = (ok, sel) => { if (!ok) out.push(sel); };
  const filled = p => String(getPath(p) || "").trim() !== "";
  if (form === "mewp") {
    const m = S.mewp;
    for (const k of ["project", "projectNo", "location", "contractor"]) req(filled("mewp.header." + k), `[data-bind="mewp.header.${k}"]`);
    req(m.mewpId && MM()[m.mewpId], `[data-pick="mewp.mewpId"]`);
    req(filled("mewp.header.date"), `[data-bind="mewp.header.date"]`);
    let anyF = false;
    for (const it of MEWP_ITEMS) { const v = m.checks[it[0]]; req(v, `#r${it[0]}`); if (v === "F") { anyF = true; req(String(m.notes[it[0]] || "").trim(), `[data-bind="mewp.notes.${it[0]}"]`); } }
    if (anyF) req(m.comments.trim(), `[data-bind="mewp.comments"]`);
    for (const who of ["operator", "spotter"]) {
      req(m[who].pid && PM()[m[who].pid], `[data-pick="mewp.${who}.pid"]`);
      req(filled(`mewp.${who}.role`), `[data-bind="mewp.${who}.role"]`);
      req(m[who].sig, `[data-pad="mewp.${who}.sig"]`);
    }
  } else {
    const h = S.harness; 
    // required: project, project no, location, date; drawing and plant refs are optional
    for (const k of ["project", "projectNo", "location", "date"]) req(filled("harness.header." + k), `[data-bind="harness.header.${k}"]`);
    for (const r of h.rows) {
      const p = "harness.rows." + r.id;
      req(r.pid && PM()[r.pid], `[data-pick="${p}.pid"]`);
      // asset no, serial numbers and the four dates are optional; who wore it, the 9 checks and the signature are required
      for (const c of H_CHECKS) { req(r.checks[c.k], `[data-hk="${r.id}_${c.k}"]`); if (r.checks[c.k] === "F") flag = true; }
      req(r.sig, `[data-pad="${p}.sig"]`);
    }
  }
  return out;
}
function markMissing(scroll) {
  $$(".bad").forEach(e => e.classList.remove("bad"));
  const list = missing(view); list.forEach(sel => { const el = $(sel); el && el.classList.add("bad"); });
  if (scroll && list.length) { const el = $(list[0]); if (el) { el.scrollIntoView({ block: "center", behavior: "smooth" }); } }
  return list.length;
}
function refreshBar() {
  if (!(view === "mewp" || view === "harness") || !B) return;
  const n = missing(view).length; const go = $("#go");
  go.textContent = n ? t("create") : (flowUrl() && B.canUpload ? t("createUpload") : t("create"));
  go.classList.toggle("dim", n > 0); go.setAttribute("aria-describedby", "saved");
  $("#saved").innerHTML = n ? `<b>${n}</b> ${esc(t("left"))}` : `<span class="okdot">✓</span> ${esc(t("saved"))}`;
  if (showMissing[view]) markMissing(false);
}

/* ================= Supervisor: tracker ================= */
let subUnsub = null, exUnsub = null, subRange = "";
function ensureRange(date) {
  if (!isSup()) return;
  const from = iso(addDays(parseISO(date), -13)); const key = from + "|" + date;
  if (key === subRange) return; subRange = key;
  subUnsub && subUnsub(); exUnsub && exUnsub();
  subUnsub = B.watch("submissions", [["date", ">=", from], ["date", "<=", date]], rows => { D.subs = rows; if (["tracker", "home"].includes(view)) rerenderKeepScroll(); }, e => console.warn("subs", e));
  exUnsub = B.watch("excused", [["date", ">=", from], ["date", "<=", date]], rows => { D.excused = rows; if (["tracker", "home"].includes(view)) rerenderKeepScroll(); }, e => console.warn("excused", e));
}
function activeOn(x, date) { const end = endOf(date); return (x.at || 0) <= end && (x.active !== false || (x.inactiveAt && x.inactiveAt > end)); }
function dayStatus(date) {
  const ex = D.excused.filter(e => e.date === date);
  const closed = ex.some(e => e.kind === "site");
  const exP = new Set(ex.filter(e => e.kind === "person").map(e => e.refId)), exM = new Set(ex.filter(e => e.kind === "mewp").map(e => e.refId));
  const subs = D.subs.filter(s => s.date === date);
  const hSubs = subs.filter(s => s.type === "harness"), mSubs = subs.filter(s => s.type === "mewp");
  const doneP = new Map(); hSubs.forEach(s => (s.personIds || []).forEach(pid => { if (!doneP.has(pid)) doneP.set(pid, []); doneP.get(pid).push(s); }));
  const doneM = new Map(); mSubs.forEach(s => { if (!doneM.has(s.mewpId)) doneM.set(s.mewpId, []); doneM.get(s.mewpId).push(s); });
  const expP = closed ? [] : D.people.filter(p => activeOn(p, date) && p.harness !== false && !exP.has(p.id) && !doneP.has(p.id));
  const expM = closed ? [] : D.mewps.filter(m => activeOn(m, date) && !exM.has(m.id) && !doneM.has(m.id));
  return {
    closed, subs, fails: subs.reduce((a, s) => a + (s.failCount || 0), 0), notUploaded: subs.filter(s => !s.uploaded).length,
    h: { done: [...doneP.entries()], missing: expP, excused: D.people.filter(p => exP.has(p.id)), total: doneP.size + expP.length },
    m: { done: [...doneM.entries()], missing: expM, excused: D.mewps.filter(m => exM.has(m.id)), total: doneM.size + expM.length }
  };
}
const ring = (done, total) => { const pct = total ? Math.round((done / total) * 100) : 100; return `<div class="meter ${done < total ? "short" : "full"}"><i style="width:${pct}%"></i></div>`; };
function trackerView() {
  ensureRange(trackDate);
  const st = dayStatus(trackDate); const pm = PM(), mm = MM();
  const dn = T.en.days[dayIdx(trackDate)];
  const subBtn = s => `<button type="button" class="chipbtn" data-act="getpdf" data-id="${s.id}" title="${esc(s.fileName || "")}">${hhmm(s.at)} PDF</button>${s.failCount ? `<span class="chip f">${s.failCount} fail</span>` : ""}${!s.uploaded && flowUrl() ? `<span class="chip w">not in SharePoint</span>` : ""}`;
  const pName = id => pm[id] ? `${esc(pm[id].name)}<small>${esc(pm[id].company || "")}</small>` : `<i>Removed person</i>`;
  const hist = []; for (let i = 0; i < 14; i++) { const d = iso(addDays(parseISO(trackDate), -i)); const s = dayStatus(d); hist.push([d, s]); }
  const outstanding = st.h.missing.length + st.m.missing.length;
  return `
  <div class="datenav"><button type="button" class="iconbtn" data-act="tday" data-d="-1" aria-label="Previous day">‹</button>
    <div class="field" style="flex:1"><label for="tDate">${esc(dn)}</label><input type="date" id="tDate" value="${trackDate}" max="${todayISO()}"></div>
    <button type="button" class="iconbtn" data-act="tday" data-d="1" aria-label="Next day" ${trackDate >= todayISO() ? "disabled" : ""}>›</button></div>
  ${st.closed ? `<div class="info">Site marked closed on ${fmt(trackDate)}. Nobody is expected to submit. <button type="button" class="linkbtn plain" data-act="closed" data-v="0">Undo</button></div>` : ""}
  <div class="stats">
    <div class="stat"><span class="eyebrow">Harness checks</span><b>${st.h.done.length}<small> / ${st.h.total}</small></b>${ring(st.h.done.length, st.h.total)}<span class="muted">${st.h.missing.length ? st.h.missing.length + (st.h.missing.length === 1 ? " person" : " people") + " not done" : "Everyone done"}</span></div>
    <div class="stat"><span class="eyebrow">MEWP inspections</span><b>${st.m.done.length}<small> / ${st.m.total}</small></b>${ring(st.m.done.length, st.m.total)}<span class="muted">${st.m.missing.length ? st.m.missing.length + (st.m.missing.length === 1 ? " machine" : " machines") + " not done" : "All machines done"}</span></div>
  </div>
  <div class="statline"><span><b>${st.subs.length}</b> reports</span><span class="${st.fails ? "fbad" : ""}"><b>${st.fails}</b> failed checks</span>${flowUrl() ? `<span class="${st.notUploaded ? "fbad" : ""}"><b>${st.notUploaded}</b> not in SharePoint</span>` : ""}
    <button type="button" class="chipbtn" data-act="csv">Download day (CSV)</button>${!st.closed ? `<button type="button" class="chipbtn" data-act="closed" data-v="1">Mark site closed</button>` : ""}</div>

  <section class="card"><h2>Harness: not done <span class="count ${st.h.missing.length ? "bad" : ""}">${st.h.missing.length}</span></h2>
    ${st.h.missing.length ? `<p class="muted" style="margin:0;font-size:13px">If someone isn't on site today, tap Not on site so they stop counting as missing.</p><ul class="plist">${st.h.missing.map(p => `<li><span class="nm">${esc(p.name)}<small>${esc(p.company || "")}</small></span><button type="button" class="chipbtn" data-act="excuse" data-kind="person" data-id="${p.id}">Not on site</button></li>`).join("")}</ul>` : `<p class="ok" style="margin:0">${st.closed ? "Site closed." : "Nobody outstanding."}</p>`}
  </section>
  <section class="card"><h2>MEWPs: not inspected <span class="count ${st.m.missing.length ? "bad" : ""}">${st.m.missing.length}</span></h2>
    ${st.m.missing.length ? `<ul class="plist">${st.m.missing.map(m => `<li><span class="nm">${esc(m.label)}</span><button type="button" class="chipbtn" data-act="excuse" data-kind="mewp" data-id="${m.id}">Not in use</button></li>`).join("")}</ul>` : `<p class="ok" style="margin:0">${st.closed ? "Site closed." : "All machines inspected."}</p>`}
  </section>
  <section class="card"><h2>Harness: done <span class="count">${st.h.done.length}</span></h2>
    ${st.h.done.length ? `<ul class="plist">${st.h.done.map(([pid, ss]) => `<li><span class="nm">${pName(pid)}</span><span class="acts">${ss.map(subBtn).join("")}</span></li>`).join("")}</ul>` : `<p class="muted" style="margin:0">No harness checks yet.</p>`}
  </section>
  <section class="card"><h2>MEWPs: inspected <span class="count">${st.m.done.length}</span></h2>
    ${st.m.done.length ? `<ul class="plist">${st.m.done.map(([mid, ss]) => `<li><span class="nm">${esc(mm[mid] ? mm[mid].label : ss[0].mewpLabel)}<small>Operator: ${esc(ss.map(s => s.operatorName).join(", "))}</small></span><span class="acts">${ss.map(subBtn).join("")}</span></li>`).join("")}</ul>` : `<p class="muted" style="margin:0">No MEWP inspections yet.</p>`}
  </section>
  ${st.h.excused.length || st.m.excused.length ? `<section class="card"><h2>Not on site / not in use</h2><ul class="plist">${st.h.excused.map(p => `<li><span class="nm">${esc(p.name)}<small>${esc(p.company || "")}</small></span><button type="button" class="chipbtn" data-act="unexcuse" data-kind="person" data-id="${p.id}">Undo</button></li>`).join("")}${st.m.excused.map(m => `<li><span class="nm">${esc(m.label)}</span><button type="button" class="chipbtn" data-act="unexcuse" data-kind="mewp" data-id="${m.id}">Undo</button></li>`).join("")}</ul></section>` : ""}
  <section class="card"><h2>Last 14 days</h2><div class="tablewrap"><table class="hist"><thead><tr><th>Date</th><th>Harness</th><th>MEWP</th><th>Fails</th><th>Reports</th></tr></thead><tbody>
    ${hist.map(([d, s]) => `<tr data-date="${d}" class="${d === trackDate ? "sel" : ""}"><td>${T.en.days[dayIdx(d)]} ${fmt(d).slice(0, 5)}</td>${s.closed ? `<td colspan="2" class="muted">Site closed</td>` : `<td class="${s.h.missing.length ? "short" : ""}">${s.h.done.length}/${s.h.total}</td><td class="${s.m.missing.length ? "short" : ""}">${s.m.done.length}/${s.m.total}</td>`}<td class="${s.fails ? "short" : ""}">${s.fails}</td><td>${s.subs.length}</td></tr>`).join("")}
  </tbody></table></div><p class="muted" style="margin:0;font-size:12px">Tap a day to open it. Red means someone or something was missed.</p></section>
  <p class="foot">${outstanding ? outstanding + " outstanding on " + fmt(trackDate) : ""}</p>`;
}

/* ================= Supervisor: site list ================= */
function siteListView() {
  const q = norm(slSearch);
  const people = D.people.filter(p => p.active !== false).sort((a, b) => (b.selfAdded ? 1 : 0) - (a.selfAdded ? 1 : 0) || a.name.localeCompare(b.name));
  const mewps = D.mewps.filter(m => m.active !== false).sort((a, b) => a.label.localeCompare(b.label));
  const pf = people.filter(p => !q || norm(p.name + " " + p.company).includes(q)), mf = mewps.filter(m => !q || norm(m.label).includes(q));
  return `
  <div class="tabs" role="tablist"><button type="button" role="tab" aria-selected="${slTab === "people"}" data-tab="people">People <span class="count">${people.length}</span></button><button type="button" role="tab" aria-selected="${slTab === "mewps"}" data-tab="mewps">MEWPs <span class="count">${mewps.length}</span></button></div>
  ${slTab === "people" ? `
  <section class="card"><h2>Add people</h2>
    <div class="fields"><div class="field"><label for="npName">Full name</label><input id="npName" type="text" autocomplete="off"></div><div class="field"><label for="npCo">Company</label><input id="npCo" type="text" autocomplete="off"></div></div>
    <label class="cb"><input type="checkbox" id="npH" checked> Needs a daily harness check</label>
    <button class="primary" type="button" data-act="addperson">Add person</button>
    <details class="setup"><summary>Add many at once</summary><p class="muted" style="margin:4px 0">One person per line: <code>Name, Company</code>. Names already on the list are skipped.</p><textarea id="bulk" placeholder="Jan Kowalski, Okee Electrics&#10;Andrei Popescu, Okee Electrics"></textarea><button class="ghost" type="button" data-act="bulk" style="margin-top:8px;width:100%">Add all</button><p id="bulkMsg" class="muted" style="margin:6px 0 0"></p></details>
  </section>` : `
  <section class="card"><h2>Add a MEWP</h2><div class="field"><label for="nmLabel">MEWP model / serial no</label><input id="nmLabel" type="text" placeholder="JLG 1930ES / 1200012345" autocomplete="off"></div><button class="primary" type="button" data-act="addmewp">Add MEWP</button></section>`}
  <div class="field"><label for="slSearch">Search</label><input id="slSearch" type="search" value="${esc(slSearch)}" placeholder="${slTab === "people" ? "Name or company" : "Model or serial"}" autocomplete="off"></div>
  <ul class="plist big" id="slList">${slTab === "people" ? (pf.length ? pf.map(p => `<li><span class="nm">${esc(p.name)}<small>${esc(p.company || "No company")}${p.harness === false ? " · no harness check" : ""}</small></span><span class="acts">${p.selfAdded ? `<span class="chip on">Added themselves</span><button type="button" class="chipbtn" data-act="confirmp" data-id="${p.id}">OK</button>` : ""}<button type="button" class="chipbtn" data-act="toggleh" data-id="${p.id}">${p.harness === false ? "Needs harness" : "No harness"}</button><button type="button" class="chipbtn danger" data-act="rmperson" data-id="${p.id}">Remove</button></span></li>`).join("") : `<li class="muted">Nobody yet. Add names above, or let people add themselves when they fill in a form.</li>`)
      : (mf.length ? mf.map(m => `<li><span class="nm">${esc(m.label)}${m.selfAdded ? "<small>Added by an operator</small>" : ""}</span><span class="acts"><button type="button" class="chipbtn danger" data-act="rmmewp" data-id="${m.id}">Remove</button></span></li>`).join("") : `<li class="muted">No MEWPs yet.</li>`)}</ul>
  <p class="foot">Removing someone keeps their past reports and stops them counting from today.</p>`;
}

/* ================= Supervisor: settings ================= */
function settingsView() {
  const c = D.config;
  const f = (k, label, ph = "") => `<div class="field"><label for="cfg_${k}">${label}</label><input id="cfg_${k}" type="text" data-cfg="${k}" value="${esc(c[k] || "")}" placeholder="${esc(ph)}" autocomplete="off"></div>`;
  const schema = `{
  "type": "object",
  "properties": {
    "fileName": { "type": "string" },
    "folder": { "type": "string" },
    "formType": { "type": "string" },
    "date": { "type": "string" },
    "project": { "type": "string" },
    "names": { "type": "string" },
    "failCount": { "type": "integer" },
    "contentBase64": { "type": "string" }
  }
}`;
  return `
  <section class="card"><h2>Site details</h2><p class="muted" style="margin:0;font-size:13px">Filled in for everyone on new forms. People can still change them.</p><div class="fields">
    ${f("project", "Project")}${f("projectNo", "Project No")}${f("location", "Location / Area")}${f("contractor", "Contractor Name")}${f("drawingRef", "Drawing Ref")}${f("plantRef", "Plant / System Ref")}</div>
    <button class="primary" type="button" data-act="savecfg">Save site details</button><span id="cfgMsg" class="muted"></span></section>
  <section class="card"><h2>SharePoint upload</h2>
    ${!B.canUpload ? `<div class="info">Uploads run from the hosted app. This preview records reports but can't reach SharePoint.</div>` : ""}
    ${f("flowUrl", "Power Automate upload link", "https://…")}
    <button class="ghost" type="button" data-act="savecfg">Save link</button>
    <details class="setup"><summary>How to set up the flow</summary><ol>
      <li>In Power Automate, create an <b>Instant cloud flow</b> with the trigger <b>When an HTTP request is received</b>. Set <i>Who can trigger the flow</i> to <b>Anyone</b>.</li>
      <li>Paste this as the <b>Request Body JSON Schema</b>:<pre>${esc(schema)}</pre></li>
      <li>Add <b>SharePoint › Create file</b>. Folder path: <code>/Shared Documents/Safety/</code> then dynamic <code>folder</code>. File name: <code>fileName</code>. File content: expression <code>base64ToBinary(triggerBody()?['contentBase64'])</code>.</li>
      <li>Add <b>Response</b>: status <code>200</code>, body <code>{"ok": true, "url": "<i>Link to item</i>"}</code>.</li>
      <li>Save, copy the HTTP POST URL and paste it above.</li></ol>
      <p class="muted">Reports go to <code>Safety/MEWP Inspections</code> and <code>Safety/Harness Inspections</code>. The HTTP trigger needs Power Automate Premium on the flow owner's account.</p></details></section>
  ${B.kind === "firebase" ? `<section class="card"><h2>Supervisors</h2><p class="muted" style="margin:0;font-size:13px">Supervisors see the tracker and site list. Add the email they sign in with.</p>
    <div class="fields"><div class="field"><label for="supEmail">Email</label><input id="supEmail" type="email" autocomplete="off"></div></div><button class="ghost" type="button" data-act="addsup">Add supervisor</button>
    <ul class="plist">${(CFG.owners || []).map(e => `<li><span class="nm">${esc(e)}</span><span class="chip">Owner</span></li>`).join("")}${D.members.filter(m => !(CFG.owners || []).includes(m.id)).map(m => `<li><span class="nm">${esc(m.id)}</span><button class="chipbtn danger" type="button" data-act="rmsup" data-id="${esc(m.id)}">Remove</button></li>`).join("")}</ul></section>` : ""}
  <button class="ghost" type="button" data-go="home">${esc(t("back"))}</button>`;
}

/* ================= Name / MEWP picker ================= */
let pickCtx = null;
function openPicker(path, kind) {
  pickCtx = { path, kind, q: "", adding: false };
  sheet(`<div class="pickhead"><h2>${esc(kind === "mewp" ? t("chooseMewp") : t("choosePerson"))}</h2><button type="button" class="ghost sm" data-close>${esc(t("cancel"))}</button></div>
    <input type="search" id="pkQ" placeholder="${esc(kind === "mewp" ? t("searchMewp") : t("search"))}" autocomplete="off">
    <ul class="plist pick" id="pkList"></ul>
    <div id="pkAdd"></div>`, true);
  drawPicker(); setTimeout(() => { const q = $("#pkQ"); q && q.focus(); }, 50);
  $("#pkQ").addEventListener("input", e => { pickCtx.q = e.target.value; drawPicker(); });
}
function drawPicker() {
  const { kind, q } = pickCtx; const nq = norm(q);
  const items = kind === "mewp" ? D.mewps.filter(m => m.active !== false).map(m => ({ id: m.id, a: m.label, b: "" })) : D.people.filter(p => p.active !== false).map(p => ({ id: p.id, a: p.name, b: p.company || "" }));
  items.sort((x, y) => x.a.localeCompare(y.a));
  const f = items.filter(i => !nq || norm(i.a + " " + i.b).includes(nq));
  const list = $("#pkList"); if (!list) return;
  list.innerHTML = f.slice(0, 150).map(i => `<li><button type="button" data-pickid="${i.id}"><span class="nm">${esc(i.a)}${i.b ? `<small>${esc(i.b)}</small>` : ""}</span><b>›</b></button></li>`).join("") +
    (f.length > 150 ? `<li class="muted">${f.length - 150} more. Keep typing to narrow it down.</li>` : "") +
    (!f.length ? `<li class="muted">${!D.loaded[kind === "mewp" ? "mewps" : "people"] ? esc(t("loading")) : esc(t("noMatch"))}</li>` : "");
  const add = $("#pkAdd");
  if (!pickCtx.adding) add.innerHTML = `<button type="button" class="ghost dashed" style="width:100%" data-act="pkadd">+ ${esc(kind === "mewp" ? t("mewpNotListed") : t("notListed"))}</button>`;
}
function pickerAddForm() {
  const { kind, q } = pickCtx; pickCtx.adding = true;
  $("#pkAdd").innerHTML = kind === "mewp"
    ? `<div class="card"><div class="field"><label for="pkL">${esc(t("mewpLabel"))}</label><input id="pkL" type="text" value="${esc(q)}" autocomplete="off"></div><button type="button" class="primary" data-act="pksave">${esc(t("addToList"))}</button></div>`
    : `<div class="card"><div class="field"><label for="pkN">${esc(t("fullName"))}</label><input id="pkN" type="text" value="${esc(q)}" autocomplete="name"></div><div class="field"><label for="pkC">${esc(t("company"))}</label><input id="pkC" type="text" autocomplete="organization"></div><button type="button" class="primary" data-act="pksave">${esc(t("addToList"))}</button></div>`;
  const first = $(kind === "mewp" ? "#pkL" : "#pkN"); first && first.focus();
}
async function pickerSave() {
  const { kind } = pickCtx; const id = B.newId(); let doc;
  if (kind === "mewp") { const label = $("#pkL").value.trim(); if (label.length < 3) { $("#pkL").classList.add("bad"); return; } doc = { label, active: true, selfAdded: !isSup(), at: Date.now() }; }
  else {
    const name = $("#pkN").value.trim().replace(/\s+/g, " "), company = $("#pkC").value.trim();
    if (name.length < 3 || !name.includes(" ")) { $("#pkN").classList.add("bad"); return; }
    if (!company) { $("#pkC").classList.add("bad"); return; }
    const dupe = D.people.find(p => p.active !== false && norm(p.name) === norm(name) && norm(p.company) === norm(company));
    if (dupe) { choosePicked(dupe.id); return; }
    doc = { name, company, harness: true, active: true, selfAdded: !isSup(), at: Date.now() };
  }
  const coll = kind === "mewp" ? "mewps" : "people";
  D[coll].push({ id, ...doc });             // show it straight away
  B.set(coll, id, doc).catch(e => console.warn("add", e));
  choosePicked(id);
}
function choosePicked(id) {
  const { path, kind } = pickCtx; setPath(path, id);
  const form = path.split(".")[0]; save(form);
  if (kind === "person" && (path.endsWith("operator.pid") || /^harness\.rows\.[^.]+\.pid$/.test(path))) store.set("me", id);
  $("#dlg").innerHTML = ""; pickCtx = null;
  const btn = document.querySelector(`[data-pick="${path}"]`);
  if (btn) { btn.classList.remove("empty", "bad"); btn.querySelector("span").textContent = kind === "mewp" ? mewpLabel(id) : personLabel(id); }
  refreshBar();
}

/* ================= Signature pads ================= */
function mountPad(cv) {
  const path = cv.dataset.sig; const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
  cv.width = w * dpr; cv.height = h * dpr;
  const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
  ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#111418";
  const hint = cv.parentElement.querySelector("span");
  const existing = getPath(path);
  if (existing) { const img = new Image(); img.onload = () => ctx.drawImage(img, 0, 0, w, h); img.src = existing; hint.hidden = true; } else hint.hidden = false;
  let drawing = false, last = null, dirty = false;
  const pt = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.onpointerdown = e => { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (x) {} drawing = true; last = pt(e); hint.hidden = true; ctx.beginPath(); ctx.arc(last[0], last[1], 1.1, 0, 7); ctx.fillStyle = "#111418"; ctx.fill(); dirty = true; };
  cv.onpointermove = e => { if (!drawing) return; const p = pt(e); ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); last = p; };
  const end = () => {
    if (!drawing) return; drawing = false; if (!dirty) return;
    const out = document.createElement("canvas"); out.width = cv.width; out.height = cv.height;
    const o = out.getContext("2d"); o.fillStyle = "#fff"; o.fillRect(0, 0, out.width, out.height); o.drawImage(cv, 0, 0);
    setPath(path, out.toDataURL("image/png")); cv.parentElement.classList.remove("bad"); save(path.split(".")[0]);
  };
  cv.onpointerup = end; cv.onpointercancel = end; cv.onpointerleave = end;
}

/* ================= Events ================= */
function rerenderKeepScroll() { const y = scrollY; render(); scrollTo(0, y); }
const isForm = v => v === "mewp" || v === "harness";
function hasProgress(f) {
  if (f === "mewp") { const m = S.mewp; return Object.keys(m.checks).length > 0 || !!m.mewpId || !!m.operator.sig || !!m.spotter.sig || !!m.comments.trim() || !!m.spotter.pid; }
  const h = S.harness; return h.rows.length > 1 || !!h.comments.trim() || h.rows.some(r => Object.keys(r.checks).length || r.sig || r.asset || r.harnessSerial || r.lanyardSerial || r.certDate || r.issueDate || r.expiryDate);
}
function progressText(f) {
  if (f === "mewp") return Object.keys(S.mewp.checks).length + "/33 · " + t("doneSoFar");
  const n = S.harness.rows.reduce((a, r) => a + Object.keys(r.checks).length, 0); return n + "/" + S.harness.rows.length * 9 + " · " + t("doneSoFar");
}
function leaveSheet(onLeave) {
  sheet(`<h2>${esc(t("leaveTitle"))}</h2><p class="muted" style="margin:0">${esc(progressText(view))}</p><p style="margin:0">${esc(t("leaveBody"))}</p>
    <div class="acts"><button class="primary" type="button" data-close>${esc(t("keepWorking"))}</button><button class="ghost" type="button" id="lvGo">${esc(t("goMenu"))}</button></div>`);
  $("#lvGo").onclick = () => { $("#dlg").innerHTML = ""; onLeave(); };
}
const urlFor = v => (v === "home" ? location.pathname + location.search : "#" + v);
function go(v, opts = {}) {
  if (!opts.force && isForm(view) && v !== view && hasProgress(view)) { leaveSheet(() => go(v, { force: true })); return; }
  view = v; try { history.pushState(null, "", urlFor(v)); } catch (er) {} render(); scrollTo(0, 0);
}
document.addEventListener("click", async e => {
  const li = e.target.closest("tr[data-date]"); if (li) { trackDate = li.dataset.date; rerenderKeepScroll(); return; }
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.lang) { lang = b.dataset.lang; store.set("lang", lang); rerenderKeepScroll(); return; }
  if (b.dataset.go) { go(b.dataset.go); return; }
  if (b.dataset.tab) { slTab = b.dataset.tab; slSearch = ""; rerenderKeepScroll(); return; }
  if (b.dataset.pick) { openPicker(b.dataset.pick, b.dataset.kind); return; }
  if (b.dataset.pickid) { choosePicked(b.dataset.pickid); return; }
  if (b.dataset.clear) { setPath(b.dataset.clear, ""); save(b.dataset.clear.split(".")[0]); const cv = b.parentElement.querySelector("canvas"); cv.getContext("2d").clearRect(0, 0, cv.width, cv.height); b.parentElement.querySelector("span").hidden = false; return; }
  const a = b.dataset.act; if (!a) return;
  if (a === "tick" || a === "fail") {
    const line = b.dataset.line; const want = a === "tick" ? "P" : "F";
    if (S.mewp.checks[line] === want) delete S.mewp.checks[line]; else S.mewp.checks[line] = want;
    $("#r" + line).outerHTML = mewpRow(MEWP_ITEMS[line - 1]); save("mewp"); refreshMewpChrome();
    if (S.mewp.checks[line] === "F") { const inp = $("#note_" + line); inp && inp.focus({ preventScroll: true }); }
    return;
  }
  if (a === "htick" || a === "hfail") {
    const r = S.harness.rows.find(x => x.id === b.dataset.row); const want = a === "htick" ? "P" : "F";
    if (r.checks[b.dataset.k] === want) delete r.checks[b.dataset.k]; else r.checks[b.dataset.k] = want;
    refreshHarnessCard(r); save("harness"); return;
  }
  if (a === "hadd") { const r = newHRow(); S.harness.rows.push(r); save("harness"); render(); const el = $("#h_" + r.id); el && el.scrollIntoView({ block: "start" }); return; }
  if (a === "hremove") { dangerSheet(t("remove") + "?", t("clearBody"), () => { S.harness.rows = S.harness.rows.filter(x => x.id !== b.dataset.row); save("harness"); rerenderKeepScroll(); }); return; }
  if (a === "reset") { const f = b.dataset.form; if (!hasProgress(f)) return; dangerSheet(t("clearTitle"), t("clearBody") + " (" + progressText(f) + ")", () => { S[f] = f === "mewp" ? newMewp() : newHarness(); applyDefaults(); save(f); showMissing[f] = false; render(); scrollTo(0, 0); }); return; }
  if (a === "pkadd") { pickerAddForm(); return; }
  if (a === "pksave") { pickerSave(); return; }
  if (a === "signin") { B.signIn(); return; }
  if (a === "signout") { B.signOut(); return; }
  /* supervisor actions */
  if (!isSup()) return;
  if (a === "tday") { const d = iso(addDays(parseISO(trackDate), +b.dataset.d)); if (d <= todayISO()) { trackDate = d; rerenderKeepScroll(); } return; }
  if (a === "excuse" || a === "unexcuse") {
    const id = `${trackDate}_${b.dataset.kind}_${b.dataset.id}`;
    if (a === "excuse") { const doc = { date: trackDate, kind: b.dataset.kind, refId: b.dataset.id, by: (B.me && (B.me.email || B.me.name)) || "", at: Date.now() }; D.excused.push({ id, ...doc }); B.set("excused", id, doc).catch(err => toast("Couldn't save. Check the signal.")); }
    else { D.excused = D.excused.filter(x => x.id !== id); B.remove("excused", id).catch(err => toast("Couldn't save. Check the signal.")); }
    rerenderKeepScroll(); return;
  }
  if (a === "closed") {
    const id = `${trackDate}_site_all`;
    if (b.dataset.v === "1") { const doc = { date: trackDate, kind: "site", refId: "all", by: (B.me && (B.me.email || B.me.name)) || "", at: Date.now() }; D.excused.push({ id, ...doc }); B.set("excused", id, doc).catch(() => toast("Couldn't save. Check the signal.")); }
    else { D.excused = D.excused.filter(x => x.id !== id); B.remove("excused", id).catch(() => toast("Couldn't save. Check the signal.")); }
    rerenderKeepScroll(); return;
  }
  if (a === "getpdf") { b.disabled = true; try { const p = await loadPdf(b.dataset.id); await B.download(p.fileName, b64Blob(p.data)); } catch (err) { if (!(err && err.code === "declined")) toast("Couldn't open that report. Check the signal."); } b.disabled = false; return; }
  if (a === "csv") { dayCsv(); return; }
  if (a === "addperson") {
    const name = $("#npName").value.trim().replace(/\s+/g, " "), company = $("#npCo").value.trim();
    if (name.length < 3) { $("#npName").classList.add("bad"); $("#npName").focus(); return; }
    if (D.people.some(p => p.active !== false && norm(p.name) === norm(name) && norm(p.company) === norm(company))) { toast(name + " is already on the list."); return; }
    const id = B.newId(), doc = { name, company, harness: $("#npH").checked, active: true, selfAdded: false, at: Date.now() };
    D.people.push({ id, ...doc }); B.set("people", id, doc).catch(() => toast("Couldn't save. Check the signal."));
    rerenderKeepScroll(); const n = $("#npName"); n && n.focus(); return;
  }
  if (a === "bulk") {
    const lines = $("#bulk").value.split(/\n/).map(l => l.trim()).filter(Boolean); let added = 0, skipped = 0;
    for (const l of lines) {
      const [name, ...rest] = l.split(/[,\t;]/); const nm = (name || "").trim().replace(/\s+/g, " "), co = rest.join(" ").trim();
      if (nm.length < 3 || D.people.some(p => p.active !== false && norm(p.name) === norm(nm) && norm(p.company) === norm(co))) { skipped++; continue; }
      const id = B.newId(), doc = { name: nm, company: co, harness: true, active: true, selfAdded: false, at: Date.now() };
      D.people.push({ id, ...doc }); B.set("people", id, doc).catch(() => {}); added++;
    }
    rerenderKeepScroll(); toast(`Added ${added}${skipped ? `, skipped ${skipped} already on the list` : ""}.`); return;
  }
  if (a === "toggleh") { const p = PM()[b.dataset.id]; p.harness = p.harness === false; B.update("people", p.id, { harness: p.harness }).catch(() => {}); rerenderKeepScroll(); return; }
  if (a === "confirmp") { const p = PM()[b.dataset.id]; p.selfAdded = false; B.update("people", p.id, { selfAdded: false }).catch(() => {}); rerenderKeepScroll(); return; }
  if (a === "rmperson" || a === "rmmewp") {
    const coll = a === "rmperson" ? "people" : "mewps"; const x = D[coll].find(i => i.id === b.dataset.id);
    confirmSheet(`Remove ${x.name || x.label} from the site list? Past reports are kept.`, "Remove", () => { x.active = false; x.inactiveAt = Date.now(); B.update(coll, x.id, { active: false, inactiveAt: x.inactiveAt }).catch(() => {}); rerenderKeepScroll(); }); return;
  }
  if (a === "addmewp") {
    const label = $("#nmLabel").value.trim(); if (label.length < 3) { $("#nmLabel").classList.add("bad"); return; }
    const id = B.newId(), doc = { label, active: true, selfAdded: false, at: Date.now() };
    D.mewps.push({ id, ...doc }); B.set("mewps", id, doc).catch(() => toast("Couldn't save. Check the signal.")); rerenderKeepScroll(); return;
  }
  if (a === "savecfg") {
    const c = { ...D.config }; $$("[data-cfg]").forEach(i => (c[i.dataset.cfg] = i.value.trim()));
    if (c.flowUrl && !/^https:\/\//.test(c.flowUrl)) { $("#cfg_flowUrl").classList.add("bad"); toast("The upload link must start with https://"); return; }
    delete c.id; D.config = c;
    try { await B.set("config", "site", c); toast("Saved for everyone."); applyDefaults(); } catch (err) { toast("Couldn't save. Check the signal."); }
    return;
  }
  if (a === "addsup") { const em = $("#supEmail").value.trim().toLowerCase(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { $("#supEmail").classList.add("bad"); return; } try { await B.set("members", em, { role: "supervisor", at: Date.now() }); toast(em + " can now sign in as a supervisor."); } catch (err) { toast("Couldn't add. Check the signal."); } return; }
  if (a === "rmsup") { confirmSheet("Remove " + b.dataset.id + " as a supervisor?", "Remove", () => B.remove("members", b.dataset.id).catch(() => toast("Couldn't remove."))); return; }
});
function refreshHarnessCard(r) {
  const i = S.harness.rows.indexOf(r); const el = $("#h_" + r.id);
  const y = scrollY; el.outerHTML = harnessCard(r, i); mountPad($("#h_" + r.id + " canvas")); scrollTo(0, y);
  if (showMissing.harness) markMissing(false);
}
document.addEventListener("input", e => {
  const el = e.target;
  if (el.id === "slSearch") { slSearch = el.value; const pos = el.selectionStart; rerenderKeepScroll(); const n = $("#slSearch"); n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} return; }
  const p = el.dataset.bind; if (!p) return;
  setPath(p, el.value); el.classList.remove("bad"); save(p.split(".")[0]);
  if (p === "mewp.header.project" || p === "harness.header.project") $("#hSub").textContent = el.value;
});
document.addEventListener("change", e => {
  const el = e.target;
  if (el.id === "tDate" && el.value) { trackDate = el.value > todayISO() ? todayISO() : el.value; rerenderKeepScroll(); return; }
  const p = el.dataset.bind; if (!p) return;
  if (p === "mewp.header.date") rerenderKeepScroll();
  if (/^harness\.rows\..+\.expiryDate$/.test(p)) refreshHarnessCard(getPath(p.split(".").slice(0, 3).join(".")));
});
$("#go").addEventListener("click", () => startReport(view));
$("#backBtn").addEventListener("click", () => go("home"));
// phone Back button: same check as the Menu button
addEventListener("popstate", () => {
  const h = location.hash.slice(1), v = TITLES[h] ? h : "home";
  if (v === view) return;
  if (isForm(view) && hasProgress(view)) {
    try { history.pushState(null, "", urlFor(view)); } catch (er) {}
    leaveSheet(() => { view = v; try { history.pushState(null, "", urlFor(v)); } catch (er) {} render(); scrollTo(0, 0); });
    return;
  }
  view = v; $("#dlg").innerHTML = ""; render(); scrollTo(0, 0);
});
// closing or reloading the page while a form has progress
addEventListener("beforeunload", e => { if (isForm(view) && hasProgress(view) && !IN_ARTIFACT) { e.preventDefault(); e.returnValue = ""; } });

function dangerSheet(title, body, onYes) {
  sheet(`<h2>${esc(title)}</h2><p style="margin:0">${esc(body)}</p><div class="acts"><button class="primary" type="button" data-close>${esc(t("keepProgress"))}</button><button class="ghost danger" type="button" id="cYes">${esc(t("yesDelete"))}</button></div>`);
  $("#cYes").onclick = () => { $("#dlg").innerHTML = ""; onYes(); };
}
function confirmSheet(msg, yes, onYes) {
  sheet(`<p style="margin:0;font-size:17px">${esc(msg)}</p><div class="acts"><button class="primary" type="button" id="cYes">${esc(yes)}</button><button class="ghost" type="button" data-close>${esc(t("cancel"))}</button></div>`);
  $("#cYes").onclick = () => { $("#dlg").innerHTML = ""; onYes(); };
}
function sheet(html, tall) {
  const tt = $("#toast"); if (tt) tt.hidden = true;
  const d = $("#dlg"); d.innerHTML = `<div class="scrim"><div class="sheet ${tall ? "tall" : ""}" role="dialog" aria-modal="true">${html}</div></div>`;
  d.querySelectorAll("[data-close]").forEach(b => (b.onclick = () => (d.innerHTML = "")));
}
let toastT; function toast(msg) { let el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); } el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (el.hidden = true), 3500); }

/* ================= Report: validate → PDF → SharePoint → tracker ================= */
let current = null;
async function startReport(form) {
  const n = missing(form).length;
  if (n) { showMissing[form] = true; markMissing(true); toast(`${n} ${t("left")}. ${t("completeAll")}`); return; }
  sheet(`<p style="margin:0"><span class="spin"></span>${esc(t("working"))}</p>`);
  try {
    await loadPdfMake();
    const pdf = pdfMake.createPdf(form === "mewp" ? mewpDoc() : harnessDoc());
    const blob = await new Promise(res => pdf.getBlob(res));
    const b64 = await new Promise(res => pdf.getBase64(res));
    current = { form, blob, b64, id: B.newId(), ...names(form), sub: submissionDoc(form) };
  } catch (err) { console.error(err); sheet(`<div class="alert">${esc(t("pdfFail"))}</div><div class="acts"><button class="ghost" type="button" data-close>${esc(t("close"))}</button></div>`); return; }
  let up = null;
  if (flowUrl() && B.canUpload) { sheet(`<p style="margin:0"><span class="spin"></span>${esc(t("uploading"))}</p>`); up = await uploadPdf(); }
  current.sub.uploaded = !!(up && up.ok); current.sub.fileName = current.fileName;
  const rec = await record();
  // the report is in: clear the ticks and signatures for the next one, keep the site details
  const keep = S[form].header; S[form] = form === "mewp" ? newMewp() : newHarness(); S[form].header = { ...keep, date: todayISO() }; if (form === "harness") S.harness.rows[0].dateInspected = todayISO();
  showMissing[form] = false; save(form);
  resultSheet(up, rec);
}
async function record() {
  const timeout = ms => new Promise(res => setTimeout(() => res("timeout"), ms));
  try {
    const w = Promise.all([savePdf(current.id, current.b64, { fileName: current.fileName, date: current.sub.date, type: current.form, uid: B.uid }), B.set("submissions", current.id, current.sub)]);
    const r = await Promise.race([w, timeout(navigator.onLine ? 15000 : 1500)]);
    return r === "timeout" ? "queued" : "ok";
  } catch (err) { console.error(err); return "failed"; }
}
function submissionDoc(form) {
  const now = Date.now(), lng = lang;
  if (form === "mewp") {
    const m = S.mewp, pm = PM();
    const fails = MEWP_ITEMS.filter(it => m.checks[it[0]] === "F").map(it => `${it[0]}: ${m.notes[it[0]] || ""}`);
    return { type: "mewp", date: m.header.date, at: now, mewpId: m.mewpId, mewpLabel: mewpLabel(m.mewpId), operatorId: m.operator.pid, operatorName: pm[m.operator.pid].name, spotterId: m.spotter.pid, spotterName: pm[m.spotter.pid].name,
      personIds: [m.operator.pid, m.spotter.pid], project: m.header.project, projectNo: m.header.projectNo, location: m.header.location, failCount: fails.length, fails, lang: lng, uid: B.uid, uploaded: false };
  }
  const h = S.harness, pm = PM();
  const fails = []; h.rows.forEach(r => { H_CHECKS.forEach(c => { if (r.checks[c.k] === "F") fails.push(`${pm[r.pid].name}: ${c.en}`); }); if (expired(r)) fails.push(`${pm[r.pid].name}: certificate expired`); });
  return { type: "harness", date: h.header.date, at: now, personIds: [...new Set(h.rows.map(r => r.pid))], names: h.rows.map(r => pm[r.pid].name), harnessCount: h.rows.length, assets: h.rows.map(r => r.asset),
    project: h.header.project, projectNo: h.header.projectNo, location: h.header.location, failCount: fails.length, fails, lang: lng, uid: B.uid, uploaded: false };
}
function names(form) {
  const clean = s => String(s || "").trim().replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  const now = new Date(); const stamp = pad2(now.getHours()) + pad2(now.getMinutes()) + pad2(now.getSeconds());
  if (form === "mewp") { const h = S.mewp.header; return { folder: "MEWP Inspections", fileName: ["MEWP", h.date, clean(mewpLabel(S.mewp.mewpId)), clean(PM()[S.mewp.operator.pid].name), stamp].filter(Boolean).join("_") + ".pdf" }; }
  const h = S.harness.header, first = PM()[S.harness.rows[0].pid];
  return { folder: "Harness Inspections", fileName: ["Harness", h.date, clean(first.name) + (S.harness.rows.length > 1 ? "-and-" + (S.harness.rows.length - 1) + "-more" : ""), stamp].join("_") + ".pdf" };
}
async function uploadPdf() {
  try {
    const s = current.sub;
    const res = await fetch(flowUrl(), { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: current.fileName, folder: current.folder, formType: s.type === "mewp" ? "MEWP Daily Inspection" : "Harness Inspection Register", date: s.date, project: s.project, projectNo: s.projectNo,
        names: s.type === "mewp" ? s.operatorName + " / " + s.spotterName : (s.names || []).join(", "), mewp: s.mewpLabel || "", failCount: s.failCount, language: s.lang, submittedAt: new Date(s.at).toISOString(), contentBase64: current.b64 }) });
    if (!res.ok) throw new Error("HTTP " + res.status);
    let link = ""; try { const j = await res.json(); link = (j && (j.url || j.link)) || ""; } catch (e) {}
    return { ok: true, link };
  } catch (err) { console.error(err); return { ok: false }; }
}
function resultSheet(up, rec) {
  const file = new File([current.blob], current.fileName, { type: "application/pdf" });
  const canShare = B.kind !== "claude" && navigator.canShare && (() => { try { return navigator.canShare({ files: [file] }); } catch (e) { return false; } })();
  const recMsg = rec === "ok" ? `<div class="ok">✓ ${esc(t("recorded"))}</div>` : rec === "queued" ? `<div class="info">${esc(t("queued"))}</div>` : `<div class="alert">${esc(t("uploadFailed"))}</div>`;
  let upMsg = "";
  if (up && up.ok) upMsg = `<div class="ok">✓ ${esc(t("uploaded"))}</div>${up.link && /^https:\/\//.test(up.link) ? `<a href="${esc(up.link)}" target="_blank" rel="noopener">${esc(t("openInSp"))}</a>` : ""}`;
  else if (up && !up.ok) upMsg = `<div class="alert">${esc(t("uploadFailed"))}</div>`;
  else if (!flowUrl() || !B.canUpload) upMsg = `<div class="info">${esc(B.canUpload ? t("notSetUp") : t("artifactNote"))}</div>`;
  sheet(`<h2>${esc(t("submitted"))}</h2><p class="muted" style="margin:0;word-break:break-all;font-size:13px">${esc(current.fileName)} · ${Math.max(1, Math.round(current.blob.size / 1024))} KB</p>${recMsg}${upMsg}
    <div class="acts">${up && !up.ok ? `<button class="primary" type="button" id="rRetry">${esc(t("tryAgain"))}</button>` : ""}
      <button class="ghost" type="button" id="rDl">${esc(t("download"))}</button>${canShare ? `<button class="ghost" type="button" id="rShare">${esc(t("share"))}</button>` : ""}
      <button class="primary" type="button" id="rDone">${esc(t("close"))}</button></div>`);
  const r = $("#rRetry"); if (r) r.onclick = async () => { sheet(`<p style="margin:0"><span class="spin"></span>${esc(t("uploading"))}</p>`); const u = await uploadPdf(); if (u.ok) B.update("submissions", current.id, { uploaded: true }).catch(() => {}); resultSheet(u, rec); };
  $("#rDl").onclick = () => B.download(current.fileName, current.blob).catch(() => {});
  const s = $("#rShare"); if (s) s.onclick = () => navigator.share({ files: [file], title: current.fileName }).catch(() => {});
  $("#rDone").onclick = () => { $("#dlg").innerHTML = ""; go("home", { force: true }); };
}
// PDFs are kept in the database in pieces small enough for any document limit
const CHUNK = 180000;
function savePdf(id, b64, meta) {
  const parts = Math.ceil(b64.length / CHUNK) || 1; const w = [];
  for (let i = 0; i < parts; i++) w.push(B.set("pdfs", i ? id + "~" + i : id, i ? { data: b64.slice(i * CHUNK, (i + 1) * CHUNK), part: i, date: meta.date, uid: meta.uid } : { ...meta, data: b64.slice(0, CHUNK), parts }));
  return Promise.all(w);
}
async function loadPdf(id) {
  const head = await B.get("pdfs", id); if (!head) throw new Error("missing");
  let data = head.data; for (let i = 1; i < (head.parts || 1); i++) { const p = await B.get("pdfs", id + "~" + i); if (!p) throw new Error("missing part"); data += p.data; }
  return { fileName: head.fileName, data };
}
function b64Blob(b64) { const bin = atob(b64); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new Blob([u], { type: "application/pdf" }); }
function dayCsv() {
  const st = dayStatus(trackDate); const pm = PM(), mm = MM();
  const q = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
  const rows = [["Date", "Type", "Name / MEWP", "Company / Operator", "Status", "Time", "Failed checks", "Report file"]];
  st.h.done.forEach(([pid, ss]) => ss.forEach(s => rows.push([trackDate, "Harness", pm[pid] ? pm[pid].name : "", pm[pid] ? pm[pid].company : "", "Done", hhmm(s.at), (s.fails || []).filter(f => f.startsWith(pm[pid] ? pm[pid].name : "")).join("; "), s.fileName])));
  st.h.missing.forEach(p => rows.push([trackDate, "Harness", p.name, p.company, "NOT DONE", "", "", ""]));
  st.h.excused.forEach(p => rows.push([trackDate, "Harness", p.name, p.company, "Not on site", "", "", ""]));
  st.m.done.forEach(([mid, ss]) => ss.forEach(s => rows.push([trackDate, "MEWP", mm[mid] ? mm[mid].label : s.mewpLabel, s.operatorName, "Done", hhmm(s.at), (s.fails || []).join("; "), s.fileName])));
  st.m.missing.forEach(m => rows.push([trackDate, "MEWP", m.label, "", "NOT DONE", "", "", ""]));
  st.m.excused.forEach(m => rows.push([trackDate, "MEWP", m.label, "", "Not in use", "", "", ""]));
  const csv = rows.map(r => r.map(q).join(",")).join("\r\n");
  B.download(`Safety_tracker_${trackDate}.csv`, new Blob(["﻿" + csv], { type: "text/csv" })).catch(() => {});
}

/* ================= PDF building (pdfmake; Roboto covers Romanian and Polish letters) ================= */
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => { s.remove(); rej(new Error("load " + src)); }; document.head.appendChild(s); }); }
async function loadPdfMake() {
  if (window.pdfMake && window.pdfMake.vfs) return;
  for (const [a, b] of PDF_LIBS) { try { await loadScript(a); } catch (e) { await loadScript(b); } }
  if (!window.pdfMake || !window.pdfMake.vfs) throw new Error("pdfmake not loaded");
}
const BLUE = "#238ECE", GREEN = "#1B7A3E", RED = "#C0281B", GBG = "#E3F3E8", RBG = "#FBE3E0", GREY = "#5A626C", LINE = "#B9C0C8";
const pL = k => T[lang][k] != null ? T[lang][k] : T.en[k];
const biP = (k, extra = {}) => lang === "en" ? { text: T.en[k], ...extra } : { text: [{ text: pL(k) }, { text: " / " + T.en[k], color: GREY }], ...extra };
const tl = { hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => LINE, vLineColor: () => LINE, paddingLeft: () => 4, paddingRight: () => 4, paddingTop: () => 3, paddingBottom: () => 3 };
function pdfHeader(titleEn, titleLocal, ref) {
  return { columns: [
    { image: LOGO_OKEE, width: 40 },
    { stack: [{ text: titleLocal, style: "title" }, lang !== "en" ? { text: titleEn, color: GREY, fontSize: 9, alignment: "center" } : {}, ref ? { text: ref, color: GREY, fontSize: 7, alignment: "center", margin: [0, 2, 0, 0] } : {}], width: "*", margin: [0, 6, 0, 0] },
    { image: LOGO_WIN, width: 110, margin: [0, 8, 0, 0] }
  ], columnGap: 10, margin: [0, 0, 0, 8] };
}
function kv(pairs, cols) {
  const body = []; for (let i = 0; i < pairs.length; i += cols) {
    const row = []; for (let j = 0; j < cols; j++) { const p = pairs[i + j]; row.push(p ? biP(p[0], { bold: true, fillColor: "#F4F3F0", fontSize: 8 }) : ""); row.push(p ? { text: p[1] || "", fontSize: 9 } : ""); } body.push(row);
  }
  const widths = []; for (let j = 0; j < cols; j++) widths.push("auto", "*");
  return { table: { widths, body }, layout: tl, margin: [0, 0, 0, 8] };
}
function footer(cur, total) { return { columns: [{ text: "Submitted " + new Date().toLocaleString("en-GB") + " · Site Safety Checks", fontSize: 7, color: GREY }, { text: cur + " / " + total, alignment: "right", fontSize: 7, color: GREY }], margin: [24, 8, 24, 0] }; }
const mark = v => v ? { text: v === "P" ? pL("P") : pL("F"), alignment: "center", bold: true, color: v === "P" ? GREEN : RED, fillColor: v === "P" ? GBG : RBG, fontSize: 10 } : { text: "" };
const sigCell = (data, w = 150, h = 50) => data ? { image: data, fit: [w, h] } : { text: " ", margin: [0, h / 2, 0, h / 2] };

function mewpDoc() {
  const m = S.mewp, h = m.header, pm = PM(); const di = dayIdx(h.date);
  const pfLine = `${pL("pass")} = ${pL("P")}  ·  ${pL("fail")} = ${pL("F")}`;
  const head = () => [{ text: "Line", color: "#fff", fillColor: BLUE, bold: true, fontSize: 7.5, alignment: "center" },
    { stack: [{ text: lang === "en" ? T.en.sec1 : [{ text: pL("sec1") }, { text: " / " + T.en.sec1, color: "#D6ECF8", bold: false }], bold: true, fontSize: 8.5 }, { text: pfLine, fontSize: 7 }], color: "#fff", fillColor: BLUE },
    { text: [{ text: T[lang].days[di] + "\n", bold: true }, { text: fmt(h.date).slice(0, 5), fontSize: 6.5 }], alignment: "center", color: "#fff", fillColor: BLUE, fontSize: 8 }];
  const row = it => [{ text: String(it[0]), alignment: "center", bold: true, fontSize: 8.5 }, lang === "en" ? { text: it[1], fontSize: 8 } : { stack: [{ text: it[LI[lang]], fontSize: 8 }, { text: it[1], fontSize: 6.8, color: GREY }] }, mark(m.checks[it[0]])];
  const widths = [20, "*", 44];
  const notes = MEWP_ITEMS.filter(it => m.checks[it[0]] === "F");
  const signBlock = (who, key) => ({ stack: [biP(key, { bold: true, fontSize: 9, margin: [0, 0, 0, 4] }),
    { table: { widths: ["auto", "*"], body: [[biP("name", { fontSize: 7.5, bold: true }), { text: pm[m[who].pid] ? pm[m[who].pid].name : "", fontSize: 9 }], [biP("role", { fontSize: 7.5, bold: true }), { text: m[who].role || "", fontSize: 9 }], [biP("signature", { fontSize: 7.5, bold: true }), sigCell(m[who].sig)], [biP("date", { fontSize: 7.5, bold: true }), { text: fmt(h.date), fontSize: 9 }]] }, layout: tl }] });
  const content = [
    pdfHeader("MEWP DAILY INSPECTION CHECKLIST", lang === "en" ? "MEWP DAILY INSPECTION CHECKLIST" : pL("mewpTitle").toUpperCase(), "1.04.02 IFHS 87 · MEWP Daily Inspection Checklist R3"),
    kv([["project", h.project], ["projectNo", h.projectNo], ["location", h.location], ["contractor", h.contractor], ["model", mewpLabel(m.mewpId)], ["dayReport", T[lang].days[di] + " " + fmt(h.date)]], 2),
    { text: pL("manualNote"), italics: true, fontSize: 8, margin: [0, 0, 0, 6] },
    { table: { headerRows: 1, dontBreakRows: true, widths, body: [head(), ...MEWP_ITEMS.slice(0, 21).map(row)] }, layout: tl },
    { stack: [biP("sec2", { bold: true, fontSize: 9.5 }), { text: pL("scanIntro"), fontSize: 7.5, margin: [0, 2, 0, 0] }, lang !== "en" ? { text: T.en.scanIntro, fontSize: 6.8, color: GREY, margin: [0, 2, 0, 0] } : {}, { text: pL("sec2Sub"), fontSize: 7.5, bold: true, margin: [0, 3, 0, 0] }], margin: [0, 0, 0, 4], unbreakable: true, pageBreak: "before" },
    { table: { headerRows: 1, dontBreakRows: true, widths, body: [head(), ...MEWP_ITEMS.slice(21).map(row)] }, layout: tl }
  ];
  if (notes.length) content.push({ text: pL("fail") + " – " + pL("failNote"), bold: true, fontSize: 9, margin: [0, 10, 0, 4] },
    { table: { headerRows: 1, widths: [26, "*"], body: [[{ text: "Line", bold: true, fontSize: 8 }, { text: pL("failNote"), bold: true, fontSize: 8 }], ...notes.map(it => [{ text: String(it[0]), fontSize: 8, color: RED, bold: true }, { text: m.notes[it[0]] || "", fontSize: 8 }])] }, layout: tl });
  content.push({ stack: [biP("comments", { bold: true, fontSize: 9, margin: [0, 0, 0, 3] }), { table: { widths: ["*"], body: [[{ text: m.comments || " ", fontSize: 8.5, margin: [0, 2, 0, 14] }]] }, layout: tl }], margin: [0, 10, 0, 0], unbreakable: true },
    { stack: [biP("signoffs", { bold: true, fontSize: 10, margin: [0, 0, 0, 6] }), { columns: [signBlock("operator", "operator"), signBlock("spotter", "spotter")], columnGap: 14 }], margin: [0, 12, 0, 0], unbreakable: true });
  return { pageSize: "A4", pageMargins: [24, 24, 24, 30], info: { title: "MEWP Daily Inspection " + h.date }, content, footer, styles: { title: { fontSize: 14, bold: true, alignment: "center" } }, defaultStyle: { font: "Roboto", fontSize: 8.5 } };
}
function harnessDoc() {
  const H = S.harness, h = H.header, pm = PM();
  const th = (txt, extra = {}) => ({ text: txt, color: "#fff", fillColor: BLUE, bold: true, fontSize: 7, alignment: "center", ...extra });
  const thb = (en, local, fs = 7) => th(lang === "en" ? en : [{ text: local + "\n" }, { text: en, fontSize: fs - 1, bold: false }], { fontSize: fs });
  const gSpan = (k, n) => [{ ...th(lang === "en" ? T.en[k] : pL(k) + " / " + T.en[k]), colSpan: n }, ...Array(n - 1).fill({})];
  const head1 = [th(""), th(""), th(""), ...gSpan("gLanyard", 3), ...gSpan("gHarness", 3), ...gSpan("gHardware", 3), th(""), th(""), th(""), th(""), th("")];
  const head2 = [thb("Winthrop Asset No.", pL("asset")), thb("Harness Serial No.", pL("harnessSerial")), thb("Lanyard Serial No.", pL("lanyardSerial")),
    ...H_CHECKS.map(c => thb(c.en, c[lang], 6)), thb("Date Inspected", pL("dateInspected")), thb("Certification Date", pL("certDate")), thb("Post Certification Date of issue", pL("issueDate")), thb("Post Issue Certification Expiry Date", pL("expiryDate")), thb("SIGNATURE", pL("signature"))];
  const rows = H.rows.map(r => [
    { text: r.asset, fontSize: 8 }, { text: r.harnessSerial, fontSize: 8 }, { text: r.lanyardSerial, fontSize: 8 },
    ...H_CHECKS.map(c => mark(r.checks[c.k])),
    { text: fmt(r.dateInspected), fontSize: 8, alignment: "center" }, { text: fmt(r.certDate), fontSize: 8, alignment: "center" }, { text: fmt(r.issueDate), fontSize: 8, alignment: "center" },
    expired(r) ? { text: fmt(r.expiryDate) + "\nEXPIRED", fontSize: 8, alignment: "center", color: RED, bold: true, fillColor: RBG } : { text: fmt(r.expiryDate), fontSize: 8, alignment: "center" },
    { stack: [sigCell(r.sig, 110, 28), { text: pm[r.pid] ? pm[r.pid].name : "", fontSize: 7, alignment: "center" }] }
  ]);
  const content = [
    pdfHeader("HARNESS SITE INSPECTION REGISTER", lang === "en" ? "HARNESS SITE INSPECTION REGISTER" : pL("harnessTitle").toUpperCase()),
    kv([["project", h.project], ["projectNo", h.projectNo], ["location", h.location], ["drawingRef", h.drawingRef], ["plantRef", h.plantRef], ["date", fmt(h.date)]], 2),
    { text: `${pL("pass")} = ${pL("P")}  ·  ${pL("fail")} = ${pL("F")}`, fontSize: 8, bold: true, margin: [0, 0, 0, 4] },
    { table: { headerRows: 2, dontBreakRows: true, widths: [50, 54, 54, 28, 28, 28, 28, 28, 28, 28, 28, 28, 44, 44, 44, 44, "*"], body: [head1, head2, ...rows] }, layout: { ...tl, paddingLeft: () => 2, paddingRight: () => 2 } },
    { stack: [biP("comments", { bold: true, fontSize: 9, margin: [0, 0, 0, 3] }), { table: { widths: ["*"], body: [[{ text: H.comments || " ", fontSize: 8.5, margin: [0, 2, 0, 14] }]] }, layout: tl }], margin: [0, 10, 0, 0], unbreakable: true }
  ];
  return { pageSize: "A4", pageOrientation: "landscape", pageMargins: [24, 24, 24, 30], info: { title: "Harness Inspection Register " + h.date }, content, footer, styles: { title: { fontSize: 14, bold: true, alignment: "center" } }, defaultStyle: { font: "Roboto", fontSize: 8.5 } };
}

/* ================= Start ================= */
(async function boot() {
  view = TITLES[location.hash.slice(1)] ? location.hash.slice(1) : "home";
  if (view !== "home") { try { history.replaceState(null, "", urlFor("home")); history.pushState(null, "", urlFor(view)); } catch (er) {} }
  render();
  try { B = IN_ARTIFACT ? await claudeBackend() : await window.__sscBackend; }
  catch (e) { console.error(e); $("#app").innerHTML = `<div class="alert">The site list couldn't load. Check the signal and reopen the app.</div>`; return; }
  if (!B) return;
  const sortP = a => a.sort((x, y) => String(x.name || x.label).localeCompare(String(y.name || y.label)));
  B.watch("people", [], rows => { D.people = sortP(rows); D.loaded.people = true; onData("people"); }, e => console.warn("people", e));
  B.watch("mewps", [], rows => { D.mewps = sortP(rows); D.loaded.mewps = true; onData("mewps"); }, e => console.warn("mewps", e));
  B.watch("config", [], rows => { const c = rows.find(r => r.id === "site"); D.config = c ? { ...c } : {}; delete D.config.id; applyDefaults(); onData("config"); }, e => console.warn("config", e));
  if (isSup()) { ensureRange(trackDate); if (B.kind === "firebase") B.watch("members", [], rows => { D.members = rows; if (view === "settings") rerenderKeepScroll(); }, () => {}); }
  render();
})();
function onData(what) {
  if (pickCtx) drawPicker();
  if (["home", "tracker", "sitelist"].includes(view)) { if (!(view === "sitelist" && document.activeElement && document.activeElement.tagName === "INPUT")) rerenderKeepScroll(); }
  else if (view === "mewp" || view === "harness") { $$("[data-pick]").forEach(b => { const v = getPath(b.dataset.pick); const txt = b.dataset.kind === "mewp" ? mewpLabel(v) : personLabel(v); if (txt) { b.querySelector("span").textContent = txt; b.classList.remove("empty"); } }); refreshBar(); }
  if (what === "config" && (view === "mewp" || view === "harness")) { $$("[data-bind]").forEach(i => { const v = getPath(i.dataset.bind); if (i.value === "" && v) i.value = v; }); }
}
addEventListener("resize", () => { clearTimeout(window.__rz); window.__rz = setTimeout(() => $$(".pad canvas").forEach(mountPad), 200); });
