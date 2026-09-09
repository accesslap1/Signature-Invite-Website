import { useEffect, useMemo, useRef, useState } from "react";

const dark = "#07060f";
const dark2 = "#0d0d1a";
const pink = "#ff2d78";
const purple = "#a855f7";
const cyan = "#22d3ee";
const amber = "#f59e0b";
const grotesk = "'Space Grotesk', sans-serif";
const fraunces = "'Fraunces', serif";
const darkxImage = "/media/party/darkx.png";
const partyTrack = "/media/party/party-track.mp3";
const openingVideo = "/media/party/opening-desktop.mp4";
const openingPoster = "/media/party/opening-desktop.jpg";
const mobileOpeningVideo = "/media/party/opening-mobile.mp4";
const mobileOpeningPoster = "/media/party/opening-mobile.jpg";

type Lang = "en" | "fr" | "ar";

type Dict = {
  hero: {
    edition: string; titleA: string; titleB: string; meta: string;
    chips: [string, string, string]; countdown: [string, string, string, string]; scroll: string;
  };
  lineup: { eyebrow: string; title: string; note: string };
  venue: { eyebrow: string; title: string };
  tickets: { eyebrow: string; title: string; sold: string; select: string; selected: string; reserve: string; success: string };
  contest: { eyebrow: string; title: string; body: string; pool: string; place: string };
  closing: { exclusive: string; afterTitle: string; afterBody: string; vip: string; eyebrow: string; rulesTitle: string; questions: string };
  controls: { enter: string; enterSub: string; open: string; pass: string; sound: string; volume: string; mute: string; unmute: string; language: string; close: string };
};

const copy: Record<Lang, Dict> = {
  en: {
    hero: {
      edition: "Halloween Edition 2026",
      titleA: "NEON", titleB: "NOIR",
      meta: "Halloween Masquerade & Rave · 31 October · 10 PM",
      chips: ["🎭 Costume Required", "Limited to 500 Guests", "18+ Event"],
      countdown: ["DAYS", "HRS", "MIN", "SEC"], scroll: "Scroll into the night"
    },
    lineup: { eyebrow: "Artist Lineup", title: "Who's Playing", note: "4 Stages · 8 Hours of Music" },
    venue: { eyebrow: "Where It's At", title: "The Venue" },
    tickets: { eyebrow: "Get In", title: "Ticket Tiers", sold: "SOLD OUT", select: "Select", selected: "Selected ✓", reserve: "Reserve", success: "Ticket preference saved" },
    contest: { eyebrow: "Come Dressed to Win", title: "Costume Contest", body: "Judged at midnight by our panel of DJs, influencers & venue staff. Categories: Most Creative, Scariest, Best Group, Crowd Favorite.", pool: "Total Prize Pool", place: "Place" },
    closing: { exclusive: "Exclusive", afterTitle: "The After-Party", afterBody: "VIP ticket holders get access to the private sunrise session. Doors open at 4:00 AM in the lounge. Limited to 80 guests. Surprise live act announced at 3 AM.", vip: "VIP Lounge · 04:00 AM – Sunrise", eyebrow: "Before You Arrive", rulesTitle: "House Rules", questions: "Questions? DM us @neonnoir or email hello@neonnoir.events" },
    controls: { enter: "ENTER THE NIGHT", enterSub: "Tap anywhere to start the experience", open: "OPEN INVITATION", pass: "PRIVATE ADMIT · 31 OCT 2026", sound: "Sound", volume: "Volume", mute: "Mute", unmute: "Unmute", language: "Language", close: "Close" }
  },
  fr: {
    hero: {
      edition: "Édition Halloween 2026",
      titleA: "NEON", titleB: "NOIR",
      meta: "Bal Masqué Halloween & Rave · 31 octobre · 22 h",
      chips: ["🎭 Costume obligatoire", "Limité à 500 invités", "Événement 18+"],
      countdown: ["JOURS", "H", "MIN", "SEC"], scroll: "Entrez dans la nuit"
    },
    lineup: { eyebrow: "Programmation", title: "Qui joue ?", note: "4 scènes · 8 heures de musique" },
    venue: { eyebrow: "Le lieu", title: "The Black Palace" },
    tickets: { eyebrow: "Entrée", title: "Billetterie", sold: "COMPLET", select: "Choisir", selected: "Sélectionné ✓", reserve: "Réserver", success: "Préférence de billet enregistrée" },
    contest: { eyebrow: "Venez déguisé pour gagner", title: "Concours de costumes", body: "Jugé à minuit par notre panel de DJs, influenceurs et équipe du lieu. Catégories : le plus créatif, le plus effrayant, meilleur groupe, prix du public.", pool: "Cagnotte totale", place: "Place" },
    closing: { exclusive: "Exclusif", afterTitle: "L'After-Party", afterBody: "Les détenteurs d'un billet VIP accèdent à la session privée jusqu'au lever du soleil. Ouverture à 4 h dans le lounge. Limité à 80 invités. Live surprise annoncé à 3 h.", vip: "Lounge VIP · 04 h – Lever du soleil", eyebrow: "Avant de venir", rulesTitle: "Règles de la soirée", questions: "Questions ? DM @neonnoir ou écrivez à hello@neonnoir.events" },
    controls: { enter: "ENTRER DANS LA NUIT", enterSub: "Touchez l'écran pour commencer", open: "OUVRIR L’INVITATION", pass: "INVITATION PRIVÉE · 31 OCT 2026", sound: "Son", volume: "Volume", mute: "Couper le son", unmute: "Activer le son", language: "Langue", close: "Fermer" }
  },
  ar: {
    hero: {
      edition: "نسخة الهالووين 2026",
      titleA: "NEON", titleB: "NOIR",
      meta: "حفلة تنكرية ورايف للهالووين · 31 أكتوبر · 10 مساءً",
      chips: ["🎭 الزي التنكري إلزامي", "العدد محدود إلى 500 ضيف", "+18 فقط"],
      countdown: ["يوم", "ساعة", "دقيقة", "ثانية"], scroll: "ادخل إلى قلب الليل"
    },
    lineup: { eyebrow: "الفنانون", title: "من سيحيي الحفلة؟", note: "4 مسارح · 8 ساعات من الموسيقى" },
    venue: { eyebrow: "المكان", title: "ذا بلاك بالاس" },
    tickets: { eyebrow: "الدخول", title: "فئات التذاكر", sold: "نفدت", select: "اختر", selected: "تم الاختيار ✓", reserve: "احجز", success: "تم حفظ اختيار التذكرة" },
    contest: { eyebrow: "ارتدِ أفضل زي واربح", title: "مسابقة الأزياء", body: "يتم التحكيم عند منتصف الليل بواسطة مجموعة من منسقي الموسيقى والمؤثرين وفريق المكان. الفئات: الأكثر إبداعاً، الأكثر رعباً، أفضل مجموعة، واختيار الجمهور.", pool: "إجمالي الجوائز", place: "المركز" },
    closing: { exclusive: "حصري", afterTitle: "الحفلة اللاحقة", afterBody: "يحصل حاملو تذاكر VIP على دخول إلى الجلسة الخاصة حتى شروق الشمس. تفتح الأبواب الساعة 4 صباحاً في اللاونج. العدد محدود إلى 80 ضيفاً. سيتم الإعلان عن عرض مباشر مفاجئ الساعة 3 صباحاً.", vip: "VIP Lounge · 04:00 صباحاً – شروق الشمس", eyebrow: "قبل أن تصل", rulesTitle: "قواعد الحفلة", questions: "للاستفسار: @neonnoir أو hello@neonnoir.events" },
    controls: { enter: "ادخل إلى الليل", enterSub: "اضغط في أي مكان لبدء التجربة", open: "افتح الدعوة", pass: "دعوة خاصة · 31 أكتوبر 2026", sound: "الصوت", volume: "مستوى الصوت", mute: "كتم", unmute: "تشغيل الصوت", language: "اللغة", close: "إغلاق" }
  }
};

const artistsByLang = {
  en: [
    { name: "DARKX", tag: "Headliner", genre: "Tech House · Dark Techno", time: "01:00 – 04:00" },
    { name: "LUNA", tag: "Live Act", genre: "Electro · Synthwave", time: "23:30 – 01:00" },
    { name: "SADE RAW", tag: "Opening DJ", genre: "Afro House · Deep House", time: "22:00 – 23:30" },
    { name: "GHOST B2B", tag: "B2B Closing", genre: "Industrial · Acid", time: "04:00 – 06:00" },
  ],
  fr: [
    { name: "DARKX", tag: "Tête d'affiche", genre: "Tech House · Dark Techno", time: "01:00 – 04:00" },
    { name: "LUNA", tag: "Live", genre: "Electro · Synthwave", time: "23:30 – 01:00" },
    { name: "SADE RAW", tag: "DJ d'ouverture", genre: "Afro House · Deep House", time: "22:00 – 23:30" },
    { name: "GHOST B2B", tag: "B2B final", genre: "Industrial · Acid", time: "04:00 – 06:00" },
  ],
  ar: [
    { name: "DARKX", tag: "النجم الرئيسي", genre: "Tech House · Dark Techno", time: "01:00 – 04:00" },
    { name: "LUNA", tag: "عرض مباشر", genre: "Electro · Synthwave", time: "23:30 – 01:00" },
    { name: "SADE RAW", tag: "DJ الافتتاح", genre: "Afro House · Deep House", time: "22:00 – 23:30" },
    { name: "GHOST B2B", tag: "ختام B2B", genre: "Industrial · Acid", time: "04:00 – 06:00" },
  ]
} as const;

const artistImgs = [
  darkxImage,
  "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=600&h=600&fit=crop&faces=true",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&faces=true",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&h=600&fit=crop&faces=true"
];
const artistColors = [pink, purple, cyan, amber];


const ticketUi = {
  en: { nameLabel: "Guest name", namePlaceholder: "Enter your full name", once: "One reservation per guest", confirmed: "Reservation confirmed", reservedFor: "Reserved for" },
  fr: { nameLabel: "Nom de l'invité", namePlaceholder: "Entrez votre nom complet", once: "Une réservation par invité", confirmed: "Réservation confirmée", reservedFor: "Réservé pour" },
  ar: { nameLabel: "اسم الضيف", namePlaceholder: "أدخل اسمك الكامل", once: "حجز واحد لكل ضيف", confirmed: "تم تأكيد الحجز", reservedFor: "الحجز باسم" }
} as const;

const footerCopy = {
  en: { eyebrow: "31 OCTOBER 2026", title: "SEE YOU AFTER DARK", meta: "NEON NOIR · THE BLACK PALACE · 10 PM", line: "Dress strange. Stay late. Leave legendary.", contact: "@neonnoir · hello@neonnoir.events" },
  fr: { eyebrow: "31 OCTOBRE 2026", title: "RENDEZ-VOUS APRÈS LA NUIT", meta: "NEON NOIR · THE BLACK PALACE · 22 H", line: "Venez étrange. Dansez tard. Repartez légendaire.", contact: "@neonnoir · hello@neonnoir.events" },
  ar: { eyebrow: "31 أكتوبر 2026", title: "نلتقي بعد حلول الظلام", meta: "NEON NOIR · THE BLACK PALACE · 10 مساءً", line: "تعال مختلفاً. ابقَ حتى وقت متأخر. اصنع ليلة لا تُنسى.", contact: "@neonnoir · hello@neonnoir.events" }
} as const;

const venueInfo = {
  en: [
    ["📍","Address","The Black Palace · 14 Warehouse St, Industrial Quarter"],
    ["🚇","Transit","5 min walk from Central Station · Exit 4B"],
    ["🅿️","Parking","Underground lot · Entry from side street"],
    ["🚪","Entry","Wristband required · Costume checked at door"],
    ["♿","Accessibility","Fully accessible venue · Contact us for assistance"],
    ["🎥","Cameras","Professional cameras not permitted · Phone OK"],
  ],
  fr: [
    ["📍","Adresse","The Black Palace · 14 Warehouse St, quartier industriel"],
    ["🚇","Transport","5 min à pied depuis Central Station · Sortie 4B"],
    ["🅿️","Parking","Parking souterrain · Entrée par la rue latérale"],
    ["🚪","Entrée","Bracelet obligatoire · Costume contrôlé à l'entrée"],
    ["♿","Accessibilité","Lieu entièrement accessible · Contactez-nous si besoin"],
    ["🎥","Caméras","Caméras professionnelles interdites · Téléphone autorisé"],
  ],
  ar: [
    ["📍","العنوان","The Black Palace · شارع Warehouse 14 · المنطقة الصناعية"],
    ["🚇","المواصلات","5 دقائق مشياً من المحطة المركزية · المخرج 4B"],
    ["🅿️","المواقف","موقف تحت الأرض · الدخول من الشارع الجانبي"],
    ["🚪","الدخول","سوار دخول إلزامي · يتم التحقق من الزي عند الباب"],
    ["♿","إمكانية الوصول","المكان مجهز بالكامل · تواصل معنا للمساعدة"],
    ["🎥","الكاميرات","الكاميرات الاحترافية ممنوعة · الهاتف مسموح"],
  ]
} as const;

const ticketContent = {
  en: [
    { name:"General", price:"$25", desc:"Main floor access · Open bar included", perks:["Dancefloor entry","Open cocktail bar","Costume contest entry"], available:true },
    { name:"VIP Table", price:"$120", desc:"Private booth for 4 · Priority entry · Bottle service", perks:["Reserved booth for 4","1 bottle spirits","Priority entry lane","Dedicated server"], available:true },
    { name:"Backstage", price:"$250", desc:"Artist meet & greet · All access · Exclusive lounge", perks:["All-access wristband","Artist meet & greet","Backstage lounge","Unlimited premium bar"], available:false }
  ],
  fr: [
    { name:"Général", price:"25 $", desc:"Accès piste principale · Open bar inclus", perks:["Accès dancefloor","Bar à cocktails ouvert","Participation au concours"], available:true },
    { name:"Table VIP", price:"120 $", desc:"Salon privé pour 4 · Entrée prioritaire · Service bouteille", perks:["Salon réservé pour 4","1 bouteille de spiritueux","File prioritaire","Serveur dédié"], available:true },
    { name:"Backstage", price:"250 $", desc:"Rencontre artistes · Accès total · Lounge exclusif", perks:["Bracelet all-access","Meet & greet artistes","Lounge backstage","Bar premium illimité"], available:false }
  ],
  ar: [
    { name:"عادي", price:"$25", desc:"دخول الطابق الرئيسي · بار مفتوح", perks:["دخول ساحة الرقص","بار كوكتيلات مفتوح","المشاركة في مسابقة الأزياء"], available:true },
    { name:"طاولة VIP", price:"$120", desc:"جلسة خاصة لـ4 · دخول أولوية · خدمة زجاجات", perks:["طاولة محجوزة لـ4","زجاجة مشروبات واحدة","مسار دخول أولوية","خدمة مخصصة"], available:true },
    { name:"خلف الكواليس", price:"$250", desc:"لقاء الفنانين · دخول كامل · لاونج حصري", perks:["سوار دخول كامل","لقاء الفنانين","لاونج خلف الكواليس","بار بريميوم غير محدود"], available:false }
  ]
} as const;

const contestPrizes = {
  en: [
    ["1st","$500 Cash + VIP Table for NYE","🏆"],
    ["2nd","$250 + Free Tickets for Next Event","🥈"],
    ["3rd","$100 + Merch Bundle","🥉"],
    ["Wild Card","Crowd's Favorite · $150 Cash","🎭"],
  ],
  fr: [
    ["1er","500 $ + Table VIP pour le Nouvel An","🏆"],
    ["2e","250 $ + Billets gratuits prochain événement","🥈"],
    ["3e","100 $ + Pack merchandising","🥉"],
    ["Wild Card","Prix du public · 150 $","🎭"],
  ],
  ar: [
    ["الأول","$500 نقداً + طاولة VIP لرأس السنة","🏆"],
    ["الثاني","$250 + تذاكر مجانية للفعالية القادمة","🥈"],
    ["الثالث","$100 + مجموعة Merch","🥉"],
    ["اختيار الجمهور","المفضل لدى الجمهور · $150","🎭"],
  ]
} as const;

const rulesByLang = {
  en: ["Costume required — no costume, no entry","Guest list closes at 10:30 PM sharp","No re-entry after midnight","Professional cameras not permitted","18+ with valid ID","No weapons, including prop weapons"],
  fr: ["Costume obligatoire — sans costume, pas d'entrée","La liste invités ferme à 22 h 30 précises","Aucune réentrée après minuit","Caméras professionnelles interdites","18+ avec pièce d'identité valide","Aucune arme, y compris accessoires factices"],
  ar: ["الزي التنكري إلزامي — بدون زي لا يوجد دخول","تغلق قائمة الضيوف الساعة 10:30 مساءً تماماً","لا يسمح بإعادة الدخول بعد منتصف الليل","الكاميرات الاحترافية ممنوعة","+18 مع هوية سارية","ممنوع إدخال الأسلحة بما فيها الأسلحة التنكرية"]
} as const;

function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(node); return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function useSectionScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.86;
        const travel = Math.max(vh * 0.72, rect.height - vh * 0.28);
        const p = Math.max(0, Math.min(1, (start - rect.top) / travel));
        setProgress(p);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return { ref, progress };
}

function NeonVenueRoute({ progress, rtl }: { progress: number; rtl: boolean }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [point, setPoint] = useState({ x: 12, y: 88 });
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const pt = path.getPointAtLength(length * Math.max(0, Math.min(1, progress)));
    setPoint({ x: pt.x, y: pt.y });
  }, [progress]);
  const x = rtl ? 100 - point.x : point.x;
  const pathTransform = rtl ? "translate(100 0) scale(-1 1)" : undefined;
  return (
    <div className="venueRouteLayer" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="venueRouteGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={cyan}/><stop offset="52%" stopColor={purple}/><stop offset="100%" stopColor={pink}/>
          </linearGradient>
          <filter id="venueRouteGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g transform={pathTransform}>
          <path d="M12 88 C26 77 20 61 36 66 S62 79 73 62 S67 42 56 48 S48 55 50 46" className="venueRouteGhost"/>
          <path ref={pathRef} pathLength="100" d="M12 88 C26 77 20 61 36 66 S62 79 73 62 S67 42 56 48 S48 55 50 46" className="venueRouteProgress" style={{ strokeDashoffset: 100 - progress * 100 }}/>
        </g>
        <circle cx={x} cy={point.y} r="2.25" className="venueRouteOrbHalo"/>
        <circle cx={x} cy={point.y} r="0.9" className="venueRouteOrb"/>
      </svg>
      <div className="venueScanner" style={{ top: `${18 + progress * 62}%`, opacity: progress > 0.02 && progress < 0.98 ? 1 : 0 }}/>
      <div className="venueHud"><span className="venueHudDot"/>LIVE ROUTE <b>{Math.round(progress * 100)}%</b></div>
    </div>
  );
}

function AnimatedNumber({ value, label }: { value: number; label: string }) {
  return (
    <div className="countUnit">
      <div className="countWindow"><span key={value} className="countValue">{String(value).padStart(2, "0")}</span></div>
      <span className="countLabel">{label}</span>
    </div>
  );
}

function Intro({ onStart, onFinish, text }: { onStart: () => void; onFinish: () => void; text: Dict["controls"] }) {
  const [playing, setPlaying] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [mobileOpening, setMobileOpening] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      // Do not swap the media source in the middle of playback.
      if (!playing) setMobileOpening(query.matches);
    };
    sync();
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, [playing]);

  const activeOpeningVideo = mobileOpening ? mobileOpeningVideo : openingVideo;
  const activeOpeningPoster = mobileOpening ? mobileOpeningPoster : openingPoster;
  const finish = () => {
    if (finishing) return;
    setFinishing(true);
    window.setTimeout(onFinish, 720);
  };
  const startOpening = () => {
    if (playing || finishing) return;
    setPlaying(true);
    onStart();
    const video = videoRef.current;
    if (!video) { finish(); return; }
    video.currentTime = 0;
    video.muted = true;
    video.volume = 0;
    const playPromise = video.play();
    if (playPromise) void playPromise.catch(() => finish());
  };
  return (
    <div
      className={`intro ${playing ? "introPlaying" : ""} ${finishing ? "introFinishing" : ""}`}
      onClick={!playing ? startOpening : undefined}
      role="button"
      tabIndex={playing ? -1 : 0}
      aria-label={text.enterSub}
      onKeyDown={(e)=>{ if(!playing && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); startOpening(); } }}
    >
      <video
        ref={videoRef}
        className="introVideo"
        src={activeOpeningVideo}
        poster={activeOpeningPoster}
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        onEnded={finish}
        onError={finish}
      />
      {!playing && <div className="introClickShield" aria-hidden="true" />}
    </div>
  );
}

function FloatingControls({ lang, setLang, muted, setMuted, volume, setVolume, rtl }: {lang:Lang;setLang:(l:Lang)=>void;muted:boolean;setMuted:(v:boolean)=>void;volume:number;setVolume:(v:number)=>void;rtl:boolean}) {
  const [open, setOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const c = copy[lang].controls;
  const percent = Math.round(volume * 100);
  return (
    <div className={`floating ${rtl ? "floatingRTL" : ""}`}>
      <div className="soundWrap">
        <button
          className="floatBtn soundBtn"
          onClick={()=>{setSoundOpen(!soundOpen);setOpen(false);}}
          aria-label={c.sound}
          aria-expanded={soundOpen}
        >
          <span className={`eq ${muted ? "eqMuted" : ""}`}><i/><i/><i/></span>
        </button>
        {soundOpen && <div className="soundPanel" role="group" aria-label={c.sound}>
          <div className="soundPanelTop">
            <span>{c.volume}</span>
            <b>{muted ? 0 : percent}%</b>
          </div>
          <input
            className="volumeRange"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e)=>setVolume(Number(e.target.value))}
            aria-label={c.volume}
          />
          <button className="muteAction" onClick={()=>setMuted(!muted)}>
            <span className={`eq miniEq ${muted ? "eqMuted" : ""}`}><i/><i/><i/></span>
            {muted ? c.unmute : c.mute}
          </button>
        </div>}
      </div>
      <div className="langWrap">
        <button className="floatBtn langBtn" onClick={()=>{setOpen(!open);setSoundOpen(false);}}><span>◎</span>{lang.toUpperCase()}</button>
        {open && <div className="langMenu">
          {(["en","fr","ar"] as Lang[]).map(l => <button key={l} className={lang===l?"activeLang":""} onClick={()=>{setLang(l);setOpen(false);}}>{l==="en"?"English":l==="fr"?"Français":"العربية"}</button>)}
        </div>}
      </div>
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = useCountdown("2026-10-31T22:00:00");
  const c = copy[lang].hero;
  return (
    <section className="hero relative min-h-screen flex flex-col justify-end overflow-hidden">
      <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1800&h=1200&fit=crop" alt="Party" className="heroBg absolute inset-0 w-full h-full object-cover" />
      <div className="heroShade absolute inset-0" />
      <div className="neonTop absolute top-0 inset-x-0 h-[2px]" />
      <div className="heroLight heroLight1"/><div className="heroLight heroLight2"/>
      <div className="relative z-10 heroContent">
        <div className="heroCopy">
          <p className="heroEyebrow">{c.edition}</p>
          <h1 className="heroTitle"><span>{c.titleA}</span><span>{c.titleB}</span></h1>
          <p className="heroMeta">{c.meta}</p>
        </div>
        <div className="countdown">
          <AnimatedNumber value={t.d} label={c.countdown[0]} />
          <AnimatedNumber value={t.h} label={c.countdown[1]} />
          <AnimatedNumber value={t.m} label={c.countdown[2]} />
          <AnimatedNumber value={t.s} label={c.countdown[3]} />
        </div>
        <div className="heroChips">
          {c.chips.map((chip,i)=><span key={chip} className="heroChip" style={{"--chip": [pink,cyan,purple][i], "--delay": `${.55+i*.13}s`} as React.CSSProperties}>{chip}</span>)}
        </div>
      </div>
      <div className="heroScroll"><span>{c.scroll}</span><i/></div>
    </section>
  );
}

function SectionHead({ eyebrow, title, accent, sideText, seen }: {eyebrow:string; title:string; accent:string; sideText?:string; seen:boolean}) {
  return <div className={`sectionHead reveal ${seen?"isVisible":""}`}>
    <div><p className="sectionEyebrow" style={{color:accent}}>{eyebrow}</p><h2>{title}</h2></div>
    {sideText && <p className="sectionSide">{sideText}</p>}
  </div>;
}

function Lineup({ lang }:{lang:Lang}) {
  const {ref,seen}=useInView<HTMLElement>();
  const c=copy[lang].lineup; const artists=artistsByLang[lang];
  return <section ref={ref} className="section darkSection">
    <div className="shell">
      <SectionHead eyebrow={c.eyebrow} title={c.title} accent={pink} sideText={c.note} seen={seen}/>
      <div className="lineupGrid">
        {artists.map((a,i)=><article key={a.name} className={`artistCard ${seen?"cardIn":""}`} style={{"--accent":artistColors[i],"--delay":`${.16+i*.12}s`} as React.CSSProperties}>
          <div className="artistImage"><img src={artistImgs[i]} alt={a.name}/><div className="artistGradient"/><span className="artistTag">{a.tag}</span></div>
          <div className="artistBody"><h3>{a.name}</h3><p className="artistGenre">{a.genre}</p><p className="artistTime">{a.time}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}

function VenueIcon({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if(index===0) return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><path {...common} d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle {...common} cx="12" cy="10" r="2.4"/></svg>;
  if(index===1) return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><rect {...common} x="5" y="3.5" width="14" height="14" rx="3"/><path {...common} d="M8 7.5h8M8 13.5h.01M16 13.5h.01M8 20.5l2-3h4l2 3"/><path {...common} d="M8 10.5h8"/></svg>;
  if(index===2) return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><rect {...common} x="4" y="3.5" width="16" height="17" rx="4"/><path {...common} d="M9 17V7h4.1a3.2 3.2 0 1 1 0 6.4H9M9 13.4h4"/></svg>;
  if(index===3) return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><path {...common} d="M5.5 20.5V4.5h9v16M14.5 12h4.5"/><path {...common} d="m17 9.5 2.5 2.5-2.5 2.5M8.5 12h.01"/></svg>;
  if(index===4) return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><circle {...common} cx="11" cy="4.8" r="1.8"/><path {...common} d="M10 8.2 9 13h5l2.5 5M10 9.2l4 2.2 2-1.2M8.7 13.3a5 5 0 1 0 7.2 5.9"/></svg>;
  return <svg className="venueIconSvg" viewBox="0 0 24 24" aria-hidden><path {...common} d="M4 8.2A2.2 2.2 0 0 1 6.2 6h2.1l1.1-2h5.2l1.1 2h2.1A2.2 2.2 0 0 1 20 8.2v9.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8Z"/><circle {...common} cx="12" cy="13" r="3.4"/><path {...common} d="M17.2 9h.01"/></svg>;
}

function Venue({lang}:{lang:Lang}) {
  const c=copy[lang].venue;
  const infos=venueInfo[lang];
  const sectionRef=useRef<HTMLElement|null>(null);
  const activeRef=useRef(0);
  const lockedRef=useRef(false);
  const animatingRef=useRef(false);
  const accumulatorRef=useRef(0);
  const cooldownUntilRef=useRef(0);
  const animationTimerRef=useRef<number|null>(null);
  const touchStartRef=useRef<{x:number;y:number}|null>(null);

  // Scroll-guard refs. These make a fast trackpad/mouse gesture count as ONE venue step,
  // and catch the section even if a large vertical wheel delta would otherwise jump over it.
  const previousScrollYRef=useRef(typeof window!=="undefined"?window.scrollY:0);
  const snapGuardRef=useRef(false);
  const gestureBlockedRef=useRef(false);
  const gestureTimerRef=useRef<number|null>(null);
  const gestureStepAtRef=useRef(0);
  const lastWheelAtRef=useRef(0);

  const [active,setActive]=useState(0);
  const [motionKey,setMotionKey]=useState(0);
  const [locked,setLocked]=useState(false);

  const changeCard=(next:number)=>{
    const clamped=Math.max(0,Math.min(infos.length-1,next));
    if(clamped===activeRef.current) return;
    activeRef.current=clamped;
    setActive(clamped);
    setMotionKey(k=>k+1);
    animatingRef.current=true;
    if(animationTimerRef.current!==null) window.clearTimeout(animationTimerRef.current);
    // Keep the interaction gated until the horizontal card + light entrance has settled.
    animationTimerRef.current=window.setTimeout(()=>{animatingRef.current=false},760);
  };

  useEffect(()=>{
    const el=sectionRef.current;
    if(!el) return;
    const wheelEnabled=()=>window.matchMedia('(hover: hover), (pointer: fine)').matches;

    const absoluteTop=()=>window.scrollY+el.getBoundingClientRect().top;

    const clearGestureTimer=()=>{
      if(gestureTimerRef.current!==null){
        window.clearTimeout(gestureTimerRef.current);
        gestureTimerRef.current=null;
      }
    };

    // A single physical wheel/trackpad flick can emit momentum events for a long time.
    // Do not allow those residual events to advance more than one venue card.
    const armGestureRelease=()=>{
      clearGestureTimer();
      const elapsed=performance.now()-gestureStepAtRef.current;
      const minHold=Math.max(0,700-elapsed);
      const wait=Math.max(260,minHold);
      gestureTimerRef.current=window.setTimeout(()=>{
        const quietFor=performance.now()-lastWheelAtRef.current;
        if(quietFor<230){
          armGestureRelease();
          return;
        }
        gestureBlockedRef.current=false;
        accumulatorRef.current=0;
        gestureTimerRef.current=null;
      },wait);
    };

    const alignAndLock=(fromBelow:boolean)=>{
      if(Date.now()<cooldownUntilRef.current) return;
      const top=absoluteTop();
      lockedRef.current=true;
      setLocked(true);
      accumulatorRef.current=0;
      gestureBlockedRef.current=true;
      gestureStepAtRef.current=performance.now();
      lastWheelAtRef.current=performance.now();
      armGestureRelease();

      if(fromBelow){
        if(activeRef.current!==infos.length-1){
          activeRef.current=infos.length-1;
          setActive(infos.length-1);
          setMotionKey(k=>k+1);
        }
      }else if(activeRef.current<0 || activeRef.current>=infos.length){
        activeRef.current=0;
        setActive(0);
      }

      // Snap exactly to the section once, then keep it pinned while the card sequence runs.
      snapGuardRef.current=true;
      window.scrollTo({top,behavior:'auto'});
      previousScrollYRef.current=top;
      requestAnimationFrame(()=>{snapGuardRef.current=false});
    };

    const release=(direction:1|-1)=>{
      lockedRef.current=false;
      setLocked(false);
      accumulatorRef.current=0;
      gestureBlockedRef.current=false;
      clearGestureTimer();
      cooldownUntilRef.current=Date.now()+850;

      const sectionTop=absoluteTop();
      const destination=direction>0
        ? sectionTop+el.offsetHeight+2
        : Math.max(0,sectionTop-window.innerHeight*.72);

      snapGuardRef.current=true;
      window.scrollTo({top:destination,behavior:'smooth'});
      previousScrollYRef.current=destination;
      window.setTimeout(()=>{snapGuardRef.current=false},520);
    };

    const step=(direction:1|-1)=>{
      if(animatingRef.current) return;
      const current=activeRef.current;
      if(direction>0){
        if(current<infos.length-1) changeCard(current+1);
        else release(1);
      }else{
        if(current>0) changeCard(current-1);
        else release(-1);
      }
    };

    const normalizedWheelDelta=(e:WheelEvent)=>{
      if(e.deltaMode===1) return e.deltaY*16;
      if(e.deltaMode===2) return e.deltaY*window.innerHeight;
      return e.deltaY;
    };

    const onWheel=(e:WheelEvent)=>{
      if(!wheelEnabled()) return;
      const dy=normalizedWheelDelta(e);
      if(dy===0) return;
      const direction:1|-1=dy>0?1:-1;
      const rect=el.getBoundingClientRect();
      lastWheelAtRef.current=performance.now();

      if(!lockedRef.current){
        if(Date.now()<cooldownUntilRef.current) return;

        const currentY=window.scrollY;
        const top=currentY+rect.top;
        // Large trackpad deltas can move much farther than deltaY suggests. Use a generous
        // projection so the venue is captured before the browser can jump across it.
        const projectedTravel=Math.max(Math.abs(dy)*12,window.innerHeight*.72);
        const projectedY=currentY+(direction*projectedTravel);
        const crossingTop=direction>0
          ? currentY<top && projectedY>=top-2
          : currentY>top && projectedY<=top+2;
        const enteringBand=direction>0
          ? rect.top>0 && rect.top<=window.innerHeight*.86
          : rect.top<0 && rect.bottom>=window.innerHeight*.14;
        const alreadyAtVenue=Math.abs(rect.top)<=10 && rect.bottom>=window.innerHeight*.62;

        if(crossingTop||enteringBand||alreadyAtVenue){
          e.preventDefault();
          alignAndLock(direction<0);
        }
        return;
      }

      // While locked, absolutely no vertical wheel movement is allowed through to the page.
      e.preventDefault();

      if(gestureBlockedRef.current){
        armGestureRelease();
        return;
      }

      accumulatorRef.current+=dy;
      const threshold=44;
      if(Math.abs(accumulatorRef.current)<threshold) return;

      const dir:1|-1=accumulatorRef.current>0?1:-1;
      accumulatorRef.current=0;
      gestureBlockedRef.current=true;
      gestureStepAtRef.current=performance.now();
      armGestureRelease();
      step(dir);
    };

    // Safety net: even if a browser/trackpad produces an unusually large momentum jump before
    // the wheel handler can capture it, detect crossing the venue anchor and snap back immediately.
    const onScroll=()=>{
      if(snapGuardRef.current) return;

      const y=window.scrollY;
      const prev=previousScrollYRef.current;
      const top=absoluteTop();

      if(lockedRef.current){
        if(Math.abs(y-top)>2){
          snapGuardRef.current=true;
          window.scrollTo({top,behavior:'auto'});
          previousScrollYRef.current=top;
          requestAnimationFrame(()=>{snapGuardRef.current=false});
          return;
        }
        previousScrollYRef.current=y;
        return;
      }

      if(Date.now()>=cooldownUntilRef.current){
        const crossedDown=prev<top-1 && y>=top-1;
        const crossedUp=prev>top+1 && y<=top+1;
        if(crossedDown||crossedUp){
          alignAndLock(crossedUp);
          return;
        }
      }
      previousScrollYRef.current=y;
    };

    const onKey=(e:KeyboardEvent)=>{
      if(!wheelEnabled()||!lockedRef.current) return;
      const down=e.key==='ArrowDown'||e.key==='PageDown'||e.key===' ';
      const up=e.key==='ArrowUp'||e.key==='PageUp';
      if(!down&&!up) return;
      e.preventDefault();
      if(animatingRef.current) return;
      step(down?1:-1);
    };

    const onResize=()=>{
      previousScrollYRef.current=window.scrollY;
      if(lockedRef.current){
        const top=absoluteTop();
        snapGuardRef.current=true;
        window.scrollTo({top,behavior:'auto'});
        previousScrollYRef.current=top;
        requestAnimationFrame(()=>{snapGuardRef.current=false});
      }
    };

    // Touch devices use the exact same vertical step interaction as desktop wheel input.
    // While the venue is locked, the page itself cannot drift; each vertical swipe advances one card.
    const onTouchStartNative=(e:TouchEvent)=>{
      const t=e.touches[0];
      if(t) touchStartRef.current={x:t.clientX,y:t.clientY};
    };
    const onTouchMoveNative=(e:TouchEvent)=>{
      if(lockedRef.current) e.preventDefault();
    };
    const onTouchEndNative=(e:TouchEvent)=>{
      if(!lockedRef.current) return;
      const start=touchStartRef.current;
      const t=e.changedTouches[0];
      touchStartRef.current=null;
      if(!start||!t) return;
      const dx=t.clientX-start.x;
      const dy=t.clientY-start.y;
      if(Math.abs(dy)<42||Math.abs(dy)<=Math.abs(dx)) return;
      e.preventDefault();
      if(animatingRef.current||gestureBlockedRef.current) return;
      const dir:1|-1=dy<0?1:-1;
      gestureBlockedRef.current=true;
      gestureStepAtRef.current=performance.now();
      lastWheelAtRef.current=performance.now();
      armGestureRelease();
      step(dir);
    };

    previousScrollYRef.current=window.scrollY;
    window.addEventListener('wheel',onWheel,{passive:false});
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('keydown',onKey,{passive:false});
    window.addEventListener('resize',onResize);
    el.addEventListener('touchstart',onTouchStartNative,{passive:true});
    el.addEventListener('touchmove',onTouchMoveNative,{passive:false});
    el.addEventListener('touchend',onTouchEndNative,{passive:false});
    return()=>{
      window.removeEventListener('wheel',onWheel);
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('keydown',onKey);
      window.removeEventListener('resize',onResize);
      el.removeEventListener('touchstart',onTouchStartNative);
      el.removeEventListener('touchmove',onTouchMoveNative);
      el.removeEventListener('touchend',onTouchEndNative);
      clearGestureTimer();
      if(animationTimerRef.current!==null) window.clearTimeout(animationTimerRef.current);
    };
  },[infos.length]);

  const side=active%2===0?'right':'left';
  const info=infos[active];

  return <section ref={sectionRef} className={`venueStaticSection ${locked?'venueLocked':''}`}>
    <div className="venueStaticBackdrop" aria-hidden>
      <img src="https://images.unsplash.com/photo-1574154894072-18ba0d48321b?w=1800&h=1200&fit=crop" alt=""/>
      <div className="venueStaticShade"/>
      <div className="venueStaticTint venueStaticTintA"/><div className="venueStaticTint venueStaticTintB"/>
    </div>

    <div className="shell venueStaticContent">
      <div className="venueStaticHead">
        <p>{c.eyebrow}</p><h2>{c.title}</h2>
      </div>

      <div className="venueStaticIdentity">
        <div className="venueStaticPin" aria-hidden>
          <span className="venueStaticPinGlyph">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M12 21s6-5.12 6-11a6 6 0 1 0-12 0c0 5.88 6 11 6 11Z"/>
              <circle cx="12" cy="10" r="2.25"/>
            </svg>
          </span>
          <i/>
        </div>
        <div><p>THE BLACK PALACE</p><h3>14 Warehouse St</h3><span>INDUSTRIAL QUARTER</span></div>
      </div>

      <div className="venueCardStage" aria-live="polite">
        <div key={`light-${motionKey}-${active}`} className={`venuePartyLight ${side==='right'?'lightRight':'lightLeft'}`} aria-hidden><span/><i/><b/></div>
        <article key={`card-${motionKey}-${active}`} className={`venueStandaloneCard ${side==='right'?'cardFromRight':'cardFromLeft'}`} style={{'--venue-accent':active%2===0?cyan:purple} as React.CSSProperties}>
          <div className="venueCardAccent" aria-hidden/>
          <div className="venueStandaloneIcon"><span className="venueIconOrbit"/><VenueIcon index={active}/><i className="venueIconStatus"/></div>
          <div className="venueStandaloneCopy"><span className="venueMicroLabel">VENUE DETAIL · 0{active+1}</span><p>{info[1]}</p><h4>{info[2]}</h4></div>
          <div className="venueStandaloneNumber">0{active+1}</div>
          <span className="venueCardCorner venueCardCornerA" aria-hidden/><span className="venueCardCorner venueCardCornerB" aria-hidden/>
        </article>
      </div>

      <div className="venueStaticNav">
        <div className="venueStaticDots">{infos.map((_,i)=><button key={i} aria-label={`${i+1}`} className={i===active?'active':i<active?'done':''} onClick={()=>changeCard(i)}/>)}</div>
        <span>{String(active+1).padStart(2,'0')} / {String(infos.length).padStart(2,'0')}</span>
      </div>
      <p className="venueLockHint">{locked?'SCROLL · ONE DETAIL AT A TIME':'SCROLL INTO THE VENUE'}</p>
    </div>
  </section>;
}

function Tickets({lang}:{lang:Lang}) {
  const {ref,seen}=useInView<HTMLElement>(); const c=copy[lang].tickets; const tiers=ticketContent[lang]; const ui=ticketUi[lang];
  const [selected,setSelected]=useState<number|null>(null);
  const [guestName,setGuestName]=useState("");
  const [reservation,setReservation]=useState<{tier:number;name:string}|null>(()=>{
    try { const raw=localStorage.getItem("neon-noir-ticket-reservation"); return raw?JSON.parse(raw):null; } catch { return null; }
  });
  const locked=reservation!==null;
  const reserve=(e:React.FormEvent)=>{
    e.preventDefault();
    if(locked||selected===null||!guestName.trim()) return;
    const r={tier:selected,name:guestName.trim()};
    setReservation(r);
    try { localStorage.setItem("neon-noir-ticket-reservation",JSON.stringify(r)); } catch {}
  };
  return <section ref={ref} className="section darkSection"><div className="shell">
    <SectionHead eyebrow={c.eyebrow} title={c.title} accent={purple} seen={seen}/>
    <div className="ticketGrid">
      {tiers.map((t,i)=>{
        const color=[purple,pink,cyan][i]; const active=(selected===i&&!locked)||(reservation?.tier===i);
        return <article key={t.name} onClick={()=>{if(t.available&&!locked)setSelected(i)}} aria-disabled={!t.available||locked} className={`ticketCard ${seen?"ticketIn":""} ${active?"ticketActive":""} ${!t.available?"soldOut":""} ${locked?"ticketLocked":""}`} style={{"--accent":color,"--delay":`${.1+i*.13}s`} as React.CSSProperties}>
          {!t.available&&<span className="soldBadge">{c.sold}</span>}
          <div><p className="ticketName">{t.name}</p><h3>{t.price}</h3><p className="ticketDesc">{t.desc}</p></div>
          <ul>{t.perks.map(p=><li key={p}><b>✓</b>{p}</li>)}</ul>
          {t.available&&<div className="selectButton">{reservation?.tier===i?"✓ "+ui.confirmed:active?c.selected:c.select}</div>}
        </article>
      })}
    </div>
    {selected!==null&&!locked&&<form className="reservePanel" onSubmit={reserve}>
      <div className="reservePanelTop">
        <div className="reservePanelIntro">
          <span className="reservePanelEyebrow">{ui.nameLabel}</span>
          <p>{ui.once}</p>
        </div>
        <div className="reserveTierSummary" style={{'--reserve-accent':[purple,pink,cyan][selected]} as React.CSSProperties}>
          <span>{tiers[selected].name}</span><strong>{tiers[selected].price}</strong>
        </div>
      </div>
      <div className="reservePanelActions">
        <div className="reserveNameField"><input aria-label={ui.nameLabel} id="partyGuestName" value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder={ui.namePlaceholder} autoComplete="name"/></div>
        <button disabled={!guestName.trim()} className="reserveButton" type="submit"><span className="reserveButtonText">{c.reserve} {tiers[selected].name}</span><span className="reserveArrow">→</span></button>
      </div>
    </form>}
    {reservation&&<div className="reservationReceipt"><span>✓</span><div><b>{ui.confirmed}</b><p>{ui.reservedFor} <strong>{reservation.name}</strong> · {tiers[reservation.tier]?.name}</p></div></div>}
  </div></section>;
}

function CountUp({active,to}:{active:boolean;to:number}) {
  const [n,setN]=useState(0);
  useEffect(()=>{ if(!active) return; let f=0; const frames=42; const id=setInterval(()=>{f++; setN(Math.round((1-Math.pow(1-f/frames,3))*to)); if(f>=frames)clearInterval(id)},22); return()=>clearInterval(id)},[active,to]);
  return <>{n}</>;
}

function CostumeContest({lang}:{lang:Lang}) {
  const {ref,seen}=useInView<HTMLElement>(); const c=copy[lang].contest; const prizes=contestPrizes[lang];
  const animOrder=[2,1,0,3];
  return <section ref={ref} className="section altSection"><div className="shell">
    <div className="contestTop">
      <div className={`contestCopy revealLeft ${seen?"isVisible":""}`}><p className="sectionEyebrow" style={{color:pink}}>{c.eyebrow}</p><h2>{c.title}</h2><p>{c.body}</p></div>
      <div className={`prizePool ${seen?"poolIn":""}`}><strong>$<CountUp active={seen} to={850}/></strong><span>{c.pool}</span></div>
    </div>
    <div className="prizeGrid">
      {prizes.map(([place,prize,emoji],i)=>{const delayIndex=animOrder.indexOf(i); const medalColor=["#f7c948","#c7d0dc","#c87941",purple][i]; return <article key={place} className={`prizeCard ${seen?"prizeIn":""} ${i===0&&seen?"winnerFlash":""}`} style={{"--delay":`${.2+delayIndex*.12}s`,"--prize-color":medalColor} as React.CSSProperties}><span>{emoji}</span><h3>{place} {lang==="en"&&c.place}</h3><p>{prize}</p></article>})}
    </div>
  </div></section>;
}

function ClosingInfo({lang}:{lang:Lang}) {
  const {ref,seen}=useInView<HTMLElement>(); const c=copy[lang].closing; const rules=rulesByLang[lang];
  return <section ref={ref} className="section darkSection closingSection"><div className="shell closingGrid">
    <article className={`afterCard revealLeft ${seen?"isVisible":""}`}>
      <div className="afterImage"><img src="https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=1000&h=500&fit=crop" alt="After party"/><div/><span>{c.exclusive}</span><h3>{c.afterTitle}</h3></div>
      <div className="afterBody"><p>{c.afterBody}</p><strong>{c.vip}</strong></div>
    </article>
    <div className={`rulesPanel revealRight ${seen?"isVisible":""}`}>
      <div><p className="sectionEyebrow" style={{color:cyan}}>{c.eyebrow}</p><h2>{c.rulesTitle}</h2></div>
      <ul>{rules.map((r,i)=><li key={r} className={seen?"ruleIn":""} style={{"--delay":`${.35+i*.07}s`} as React.CSSProperties}><b>0{i+1}</b><span>{r}</span></li>)}</ul>
      <p className="questions">{c.questions}</p>
    </div>
  </div></section>;
}


function Footer({lang}:{lang:Lang}) {
  const {ref,seen}=useInView<HTMLElement>(.12); const c=footerCopy[lang];
  return <footer ref={ref} className={`partyFooter ${seen?"footerIn":""}`}>
    <div className="footerGlow footerGlowPink"/><div className="footerGlow footerGlowCyan"/>
    <div className="shell footerInner">
      <p className="footerEyebrow">{c.eyebrow}</p>
      <h2>{c.title}</h2>
      <div className="footerNeonRule"><i/><span>✦</span><i/></div>
      <p className="footerLine">{c.line}</p>
      <div className="footerMeta"><span>{c.meta}</span><span>{c.contact}</span></div>
      <div className="footerBottom"><strong>NEON NOIR</strong><span>© 2026 · AFTER DARK EXPERIENCES</span></div>
    </div>
  </footer>;
}

function ScrollProgress() {
  const [p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setP(max?window.scrollY/max:0)};fn();addEventListener("scroll",fn,{passive:true});addEventListener("resize",fn);return()=>{removeEventListener("scroll",fn);removeEventListener("resize",fn)}} ,[]);
  return <div className="pageProgress" style={{transform:`scaleX(${p})`}}/>;
}

export default function PartyTemplate() {
  const [lang,setLang]=useState<Lang>(()=>(localStorage.getItem("neon-noir-lang") as Lang)||"en");
  const [entered,setEntered]=useState(false); const [introGone,setIntroGone]=useState(false); const [muted,setMuted]=useState(false);
  const [volume,setVolume]=useState<number>(()=>{const stored=Number(localStorage.getItem("neon-noir-volume"));return Number.isFinite(stored)&&stored>=0&&stored<=1?stored:.72;});
  const [viewportWidth,setViewportWidth]=useState<number|null>(null);
  const audioRef=useRef<HTMLAudioElement|null>(null);
  const rtl=lang==="ar";
  useEffect(()=>{
    const syncViewport=()=>{
      const width=Math.max(1,Math.round(window.visualViewport?.width||document.documentElement.clientWidth||window.innerWidth));
      setViewportWidth(width);
      document.documentElement.style.setProperty("--party-viewport-width",`${width}px`);
    };
    syncViewport();
    window.addEventListener("resize",syncViewport);
    window.visualViewport?.addEventListener("resize",syncViewport);
    const observer=typeof ResizeObserver!=="undefined"?new ResizeObserver(syncViewport):null;
    if(observer) observer.observe(document.documentElement);
    return()=>{
      window.removeEventListener("resize",syncViewport);
      window.visualViewport?.removeEventListener("resize",syncViewport);
      observer?.disconnect();
    };
  },[]);
  useEffect(()=>{localStorage.setItem("neon-noir-lang",lang); document.documentElement.lang=lang; document.documentElement.dir=rtl?"rtl":"ltr"},[lang,rtl]);
  useEffect(()=>{if(audioRef.current)audioRef.current.muted=muted},[muted]);
  useEffect(()=>{const audio=audioRef.current;if(audio)audio.volume=volume;localStorage.setItem("neon-noir-volume",String(volume));},[volume]);
  useEffect(()=>{
    if(introGone) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previous;};
  },[introGone]);
  const enter=()=>{
    const audio=audioRef.current;
    if(audio){audio.volume=volume;audio.muted=false;void audio.play().catch(()=>{});}
    setMuted(false);setEntered(true);
  };
  const finishIntro=()=>setIntroGone(true);
  const setMutedSafe=(value:boolean)=>{
    setMuted(value);
    const audio=audioRef.current;
    if(audio){audio.muted=value;if(!value)void audio.play().catch(()=>{});}
  };
  const setVolumeSafe=(next:number)=>{
    const value=Math.min(1,Math.max(0,next));
    setVolume(value);
    const audio=audioRef.current;
    if(audio)audio.volume=value;
    if(value<=0.001){setMutedSafe(true);} else if(muted){setMutedSafe(false);}
  };
  return <div className={`partyRoot ${rtl?"rtl":"ltr"}`} dir={rtl?"rtl":"ltr"} style={{width:viewportWidth?`${viewportWidth}px`:"100vw",minWidth:viewportWidth?`${viewportWidth}px`:"100vw",maxWidth:"none",margin:0,position:"relative",alignSelf:"stretch",flex:"1 1 auto"}}>
    <style>{styles}</style>
    <audio ref={audioRef} src={partyTrack} loop preload="auto" style={{display:"none"}}/>
    {!introGone&&<Intro onStart={enter} onFinish={finishIntro} text={copy[lang].controls}/>} 
    <ScrollProgress/>
    <Hero lang={lang}/>
    <Lineup lang={lang}/>
    <Venue lang={lang}/>
    <Tickets lang={lang}/>
    <CostumeContest lang={lang}/>
    <ClosingInfo lang={lang}/>
    <Footer lang={lang}/>
    {introGone&&entered&&<FloatingControls lang={lang} setLang={setLang} muted={muted} setMuted={setMutedSafe} volume={volume} setVolume={setVolumeSafe} rtl={rtl}/>} 
  </div>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Space+Grotesk:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:${dark}}button{font:inherit}.partyRoot{background:${dark};color:#fff;min-height:100vh;overflow-x:hidden;font-family:${grotesk}}.partyRoot.rtl{font-family:'Noto Kufi Arabic',sans-serif}.partyRoot h1,.partyRoot h2,.partyRoot h3{font-family:${fraunces};margin:0}.partyRoot.rtl h1,.partyRoot.rtl h2,.partyRoot.rtl h3{font-family:'Noto Kufi Arabic',sans-serif}.pageProgress{position:fixed;z-index:10000;top:0;left:0;width:100%;height:3px;transform-origin:left;background:linear-gradient(90deg,${pink},${purple},${cyan});box-shadow:0 0 16px ${pink};pointer-events:none}.rtl .pageProgress{transform-origin:right}
.intro{position:fixed;z-index:9999;inset:0;background:#04030a;display:grid;place-items:center;overflow:hidden;cursor:pointer;transition:opacity .5s ease .95s,visibility .5s ease .95s}.introVideo{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center;background:#04030a;display:block;transition:filter .3s ease,transform .45s ease}.intro:not(.introPlaying) .introVideo{filter:brightness(.96)}.introPlaying{cursor:default}.introFinishing{opacity:0!important;visibility:hidden!important;transition:opacity .7s ease,visibility .7s ease}.introClickShield{position:absolute;inset:0;background:transparent;z-index:3}.introOpening{opacity:0;visibility:hidden}.introNoise{position:absolute;inset:0;opacity:.16;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");mix-blend-mode:screen}.introBeam{position:absolute;top:-25%;width:2px;height:150%;background:linear-gradient(transparent,currentColor,transparent);box-shadow:0 0 45px 18px currentColor;opacity:.2;transform-origin:top}.beamA{left:28%;color:${pink};transform:rotate(24deg)}.beamB{left:52%;color:${purple};transform:rotate(-12deg)}.beamC{right:22%;color:${cyan};transform:rotate(18deg)}.introCenter{position:relative;z-index:4;text-align:center;padding:28px}.introMark{width:74px;height:74px;border:1px solid #ffffff25;border-radius:22px;display:grid;place-items:center;margin:0 auto 24px;background:#ffffff08;color:#fff;font-family:${fraunces};font-size:26px;box-shadow:0 0 50px #a855f733}.introEyebrow{letter-spacing:.48em;color:${pink};font-size:11px}.introCenter h1{font-size:clamp(42px,8vw,112px);letter-spacing:-.03em;line-height:.9;margin:20px 0 24px}.inviteOpenControl{position:relative;width:min(348px,86vw);min-height:78px;margin:2px auto 0;display:grid;grid-template-columns:56px minmax(0,1fr) 44px;align-items:center;gap:13px;padding:10px 12px 10px 10px;border:1px solid #ffffff2c;border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.075),rgba(255,255,255,.025));box-shadow:0 18px 58px #0009,inset 0 1px 0 #ffffff12;overflow:hidden;transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease}.inviteOpenControl:before{content:"";position:absolute;left:76px;top:12px;bottom:12px;border-left:1px dashed #ffffff1f}.inviteSeal{position:relative;z-index:2;width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-family:${fraunces};font-size:17px;color:#fff;border:1px solid #a855f769;background:radial-gradient(circle at 35% 25%,rgba(255,255,255,.13),transparent 42%),linear-gradient(145deg,#151124,#0b0914);box-shadow:inset 0 0 0 5px #ffffff05,0 0 24px #a855f72b}.inviteOpenCopy{position:relative;z-index:2;text-align:left;min-width:0;padding-left:2px}.rtl .inviteOpenCopy{text-align:right;padding-left:0;padding-right:2px}.inviteOpenCopy b{display:block;color:#fff;font-family:${grotesk};font-size:12px;letter-spacing:.17em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inviteOpenCopy small{display:block;margin-top:5px;color:#ffffff58;font-size:8px;letter-spacing:.14em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inviteArrow{position:relative;z-index:2;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:${cyan};font-size:17px;border:1px solid #22d3ee4a;background:#22d3ee0c;box-shadow:inset 0 0 16px #22d3ee0a}.inviteSweep{position:absolute;top:0;bottom:0;width:70px;left:-85px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.16),transparent);transform:skewX(-18deg);animation:inviteSweep 2.8s ease-in-out infinite}.intro:hover .inviteOpenControl{transform:translateY(-3px);border-color:#ffffff4f;box-shadow:0 24px 70px #000b,0 0 36px #a855f71c,inset 0 1px 0 #ffffff18}.introSub{font-size:12px;color:#ffffff70;margin-top:16px}.introTop,.introBottom{position:absolute;z-index:2;left:0;width:100%;height:50%;background:linear-gradient(180deg,#090811,#030309);transition:transform 1.2s cubic-bezier(.76,0,.24,1)}.introTop{top:0;transform:translateY(-100%)}.introBottom{bottom:0;transform:translateY(100%)}.introOpening .introTop{transform:translateY(-100%)}.introOpening .introBottom{transform:translateY(100%)}@keyframes enterPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.5);opacity:0}}@keyframes inviteSweep{0%,35%{left:-85px;opacity:0}50%{opacity:1}75%,100%{left:calc(100% + 20px);opacity:0}}
.hero{background:${dark};min-height:clamp(720px,100svh,1000px)}.heroBg{animation:heroZoom 18s ease-in-out infinite alternate}.heroShade{background:linear-gradient(to top,${dark} 0%,${dark}ef 17%,rgba(7,6,15,.64) 42%,rgba(7,6,15,.18) 100%)}.neonTop{background:linear-gradient(90deg,transparent,${pink},${purple},${cyan},transparent);box-shadow:0 0 22px ${purple}}.heroLight{position:absolute;width:34vw;height:34vw;border-radius:50%;filter:blur(90px);opacity:.12;mix-blend-mode:screen;animation:lightFloat 8s ease-in-out infinite alternate}.heroLight1{left:-12vw;bottom:20%;background:${pink}}.heroLight2{right:-10vw;top:10%;background:${cyan};animation-delay:-3s}.heroContent{width:min(1182px,100%);margin:0 auto;padding:clamp(32px,5vw,72px) clamp(20px,4vw,48px) clamp(64px,8vh,96px);display:flex;flex-direction:column;gap:clamp(24px,3vw,42px)}.heroEyebrow{margin:0 0 12px;color:${pink};text-transform:uppercase;letter-spacing:.5em;font-size:clamp(10px,1vw,14px)}.heroTitle{font-weight:900;line-height:.72;font-size:clamp(78px,14vw,172px);letter-spacing:-.065em;color:#fff;display:flex;flex-direction:column;filter:drop-shadow(0 10px 30px #000)}.heroTitle span:last-child{margin-inline-start:12vw}.heroMeta{font-size:clamp(14px,1.5vw,21px);color:${cyan};margin:24px 0 0}.countdown{display:flex;gap:clamp(18px,3vw,42px);flex-wrap:wrap}.countUnit{min-width:62px}.countWindow{height:clamp(50px,5vw,68px);overflow:hidden}.countValue{display:block;font-family:${fraunces};font-size:clamp(42px,5vw,62px);font-weight:900;color:${pink};line-height:1;animation:numberDrop .42s cubic-bezier(.16,1,.3,1);text-shadow:0 0 20px #ff2d7844}.countLabel{display:block;margin-top:4px;color:#ffffff3d;font-size:10px;letter-spacing:.14em}.heroChips{display:flex;gap:14px;flex-wrap:wrap}.heroChip{--chip:${pink};border:1px solid var(--chip);color:var(--chip);border-radius:999px;padding:12px 20px;font-size:13px;font-weight:700;opacity:0;transform:translateY(14px);animation:chipIn .65s ease forwards;animation-delay:var(--delay);background:#07060f33;backdrop-filter:blur(8px);box-shadow:inset 0 0 0 1px #ffffff04}.heroScroll{position:absolute;z-index:4;right:32px;bottom:38px;display:flex;align-items:center;gap:12px;color:#ffffff4f;text-transform:uppercase;letter-spacing:.18em;font-size:9px;writing-mode:vertical-rl}.heroScroll i{width:1px;height:48px;background:linear-gradient(${cyan},transparent);animation:scrollLine 1.7s infinite}.rtl .heroScroll{right:auto;left:32px}.rtl .heroTitle span:last-child{margin-inline-start:12vw}@keyframes heroZoom{from{transform:scale(1.02)}to{transform:scale(1.1)}}@keyframes lightFloat{from{transform:translate3d(0,0,0)}to{transform:translate3d(70px,-45px,0)}}@keyframes numberDrop{0%{transform:translateY(-65%);opacity:0;filter:blur(6px)}100%{transform:none;opacity:1;filter:none}}@keyframes chipIn{to{opacity:1;transform:none}}@keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:0}45%{transform:scaleY(1);transform-origin:top;opacity:1}46%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom;opacity:0}}
.section{padding:clamp(52px,5.2vw,78px) clamp(20px,4vw,48px)}.darkSection{background:${dark}}.altSection{background:${dark2}}.shell{width:min(1182px,100%);margin:0 auto}.sectionHead{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin-bottom:32px}.sectionEyebrow{text-transform:uppercase;letter-spacing:.42em;font-size:11px;margin:0 0 5px}.sectionHead h2,.contestCopy h2,.rulesPanel h2{font-size:clamp(38px,5vw,58px);font-weight:900;line-height:1.02}.sectionSide{font-size:12px;color:#fff;margin:0 0 7px;opacity:.92}.reveal,.revealLeft,.revealRight{opacity:0;filter:blur(6px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1),filter .8s}.reveal{transform:translateY(24px)}.revealLeft{transform:translateX(-35px)}.revealRight{transform:translateX(35px)}.isVisible{opacity:1!important;transform:none!important;filter:none!important}
.lineupGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.artistCard{--accent:${pink};overflow:hidden;border:1px solid color-mix(in srgb,var(--accent) 27%,transparent);border-radius:20px;background:#ffffff07;opacity:0;transform:translateY(34px) rotateX(5deg);transition:transform .42s ease,border-color .35s,box-shadow .35s,opacity .8s ease}.artistCard.cardIn{animation:artistIn .72s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--delay)}.artistCard:hover{transform:translateY(-8px);border-color:var(--accent);box-shadow:0 16px 46px color-mix(in srgb,var(--accent) 22%,transparent)}.artistImage{height:220px;position:relative;overflow:hidden}.artistImage img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.16,1,.3,1),filter .5s;filter:saturate(.9)}.artistCard:hover img{transform:scale(1.08);filter:saturate(1.15)}.artistGradient{position:absolute;inset:0;background:linear-gradient(to top,${dark}ee,transparent 62%)}.artistTag{position:absolute;top:13px;inset-inline-start:13px;color:${dark};background:var(--accent);font-size:10px;font-weight:800;padding:4px 9px;border-radius:999px}.artistBody{padding:18px}.artistBody h3{font-size:23px}.artistGenre{color:var(--accent);font-size:12px;margin:6px 0 12px}.artistTime{border-top:1px solid #ffffff12;color:#ffffff38;font-size:11px;padding-top:12px;margin:0}@keyframes artistIn{to{opacity:1;transform:none}}
.venueStaticSection{position:relative;height:100svh;min-height:720px;overflow:hidden;background:#0d0d1a;isolation:isolate}.venueStaticBackdrop{position:absolute;inset:0;z-index:0}.venueStaticBackdrop img{width:100%;height:100%;object-fit:cover;opacity:.72;filter:saturate(1.08) contrast(1.08)}.venueStaticShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,6,15,.83) 0%,rgba(7,6,15,.45) 48%,rgba(7,6,15,.78) 100%),linear-gradient(to top,rgba(7,6,15,.96) 0%,transparent 42%,rgba(7,6,15,.65) 100%)}.venueStaticTint{position:absolute;border-radius:50%;filter:blur(100px);mix-blend-mode:screen;opacity:.11}.venueStaticTintA{width:38vw;height:38vw;left:-10vw;top:18%;background:${purple}}.venueStaticTintB{width:34vw;height:34vw;right:-8vw;bottom:4%;background:${cyan}}.venueStaticContent{position:relative;z-index:3;height:100%;width:min(1182px,calc(100% - clamp(56px,6vw,104px)));padding:clamp(58px,7vh,92px) 0 clamp(46px,5.5vh,64px);box-sizing:border-box}.venueStaticHead{position:absolute;top:clamp(54px,7vh,88px);inset-inline-start:0}.venueStaticHead p,.venueStaticIdentity p{margin:0 0 8px;color:${cyan};font-size:10px;letter-spacing:.38em;text-transform:uppercase}.venueStaticHead h2{font-size:clamp(46px,5.4vw,68px);line-height:.95;text-shadow:0 8px 35px #000}.venueStaticIdentity{position:absolute;inset-inline-start:0;bottom:clamp(72px,8.5vh,102px);display:flex;align-items:center;gap:24px;max-width:470px;min-width:0}.venueStaticPin{position:relative;flex:0 0 72px;width:72px;height:72px;border-radius:22px;display:grid;place-items:center;background:linear-gradient(145deg,rgba(12,11,26,.94),rgba(24,18,43,.88));border:1px solid rgba(34,211,238,.34);box-shadow:0 0 0 7px rgba(168,85,247,.055),0 14px 36px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.07);transform:rotate(8deg)}.venueStaticPinGlyph{position:relative;z-index:2;width:34px;height:34px;display:grid;place-items:center;color:#dffbff;filter:drop-shadow(0 0 7px rgba(34,211,238,.2));transform:rotate(-8deg)}.venueStaticPinGlyph svg{width:100%;height:100%;overflow:visible}.venueStaticPinGlyph path,.venueStaticPinGlyph circle{fill:none;stroke:currentColor;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round}.venueStaticPinGlyph circle{fill:rgba(168,85,247,.2)}.venueStaticPin i{position:absolute;inset:7px;border-radius:17px;border:1px solid rgba(168,85,247,.22);animation:venueStaticPinPulse 1.9s ease-out infinite}.venueStaticIdentity h3{font-size:clamp(28px,3.45vw,46px);line-height:1;max-width:380px;overflow-wrap:anywhere}.venueStaticIdentity span{display:block;margin-top:9px;color:#ffffff68;font-size:10px;letter-spacing:.16em}.venueCardStage{position:absolute;inset:0;z-index:2;pointer-events:none}.venueStandaloneCard{--venue-accent:${cyan};position:absolute;top:50%;width:min(570px,46vw);min-height:154px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:20px;padding:24px 26px;border:1px solid color-mix(in srgb,var(--venue-accent) 54%,#ffffff16);border-radius:23px;background:radial-gradient(circle at 18% 20%,color-mix(in srgb,var(--venue-accent) 8%,transparent),transparent 34%),linear-gradient(135deg,rgba(7,6,18,.97),rgba(18,16,37,.92));backdrop-filter:blur(18px);box-shadow:0 25px 74px #000a,0 0 0 1px #ffffff07,inset 0 1px 0 #ffffff08;overflow:hidden;pointer-events:auto;will-change:transform,opacity}.venueStandaloneCard.cardFromRight{right:clamp(8px,2.2vw,30px);animation:venueCardArriveRight .76s cubic-bezier(.16,1,.3,1) both}.venueStandaloneCard.cardFromLeft{left:clamp(8px,2.2vw,30px);animation:venueCardArriveLeft .76s cubic-bezier(.16,1,.3,1) both}.venueStandaloneCard:before{content:"";position:absolute;inset:0;background:linear-gradient(108deg,transparent 0 42%,rgba(255,255,255,.13) 50%,transparent 58%);transform:translateX(-135%);animation:venueCardScan .9s .12s ease both;pointer-events:none}.venueCardAccent{position:absolute;inset-block:16px;inset-inline-start:0;width:3px;border-radius:0 4px 4px 0;background:linear-gradient(180deg,transparent,var(--venue-accent) 26%,var(--venue-accent) 74%,transparent);box-shadow:0 0 18px color-mix(in srgb,var(--venue-accent) 62%,transparent);opacity:.82}.rtl .venueCardAccent{border-radius:4px 0 0 4px}.venueStandaloneIcon{position:relative;width:68px;height:68px;border-radius:22px;display:grid;place-items:center;color:#f3fdff;background:radial-gradient(circle at 36% 30%,color-mix(in srgb,var(--venue-accent) 22%,transparent),transparent 46%),linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.018));border:1px solid color-mix(in srgb,var(--venue-accent) 58%,#ffffff15);box-shadow:inset 0 0 0 5px rgba(255,255,255,.025),0 12px 28px #0007,0 0 26px color-mix(in srgb,var(--venue-accent) 12%,transparent);animation:venueLayerArrive .68s .03s cubic-bezier(.16,1,.3,1) both;overflow:hidden}.venueIconSvg{position:relative;z-index:3;width:31px;height:31px;filter:drop-shadow(0 0 8px color-mix(in srgb,var(--venue-accent) 40%,transparent))}.venueIconOrbit{position:absolute;inset:8px;border-radius:16px;border:1px solid color-mix(in srgb,var(--venue-accent) 30%,transparent);transform:rotate(10deg)}.venueIconStatus{position:absolute;z-index:4;right:8px;bottom:8px;width:6px;height:6px;border-radius:50%;background:var(--venue-accent);box-shadow:0 0 10px var(--venue-accent)}.venueStandaloneCopy{animation:venueLayerArrive .68s .10s cubic-bezier(.16,1,.3,1) both}.venueMicroLabel{display:block;margin:0 0 7px;color:#ffffff42;font-size:7px;letter-spacing:.2em;font-weight:700}.venueStandaloneCopy p{margin:0 0 6px;color:var(--venue-accent);font-size:10px;text-transform:uppercase;letter-spacing:.22em;font-weight:700}.venueStandaloneCopy h4{font-family:${grotesk};font-size:clamp(16px,1.6vw,21px);font-weight:520;line-height:1.45;color:#fffffff0;margin:0;max-width:470px}.rtl .venueStandaloneCopy h4{font-family:'Noto Kufi Arabic',sans-serif}.venueStandaloneNumber{font-family:${fraunces};font-size:50px;font-weight:900;line-height:1;color:#ffffff0a;animation:venueLayerArrive .68s .17s cubic-bezier(.16,1,.3,1) both}.venueCardCorner{position:absolute;width:18px;height:18px;opacity:.42;pointer-events:none}.venueCardCorner:before,.venueCardCorner:after{content:"";position:absolute;background:var(--venue-accent)}.venueCardCorner:before{width:18px;height:1px}.venueCardCorner:after{width:1px;height:18px}.venueCardCornerA{top:13px;right:13px}.venueCardCornerB{bottom:13px;left:13px;transform:rotate(180deg)}.venuePartyLight{position:absolute;z-index:-1;top:50%;width:min(66vw,950px);height:470px;opacity:0;pointer-events:none;mix-blend-mode:screen;will-change:transform,opacity}.venuePartyLight.lightRight{right:-7vw;transform-origin:right center;animation:venueLightRight 1.15s cubic-bezier(.16,1,.3,1) both}.venuePartyLight.lightLeft{left:-7vw;transform-origin:left center;animation:venueLightLeft 1.15s cubic-bezier(.16,1,.3,1) both}.venuePartyLight:before{content:"";position:absolute;inset:0;filter:blur(10px)}.venuePartyLight.lightRight:before{clip-path:polygon(100% 44%,100% 56%,0 98%,14% 2%);background:linear-gradient(270deg,rgba(255,255,255,.98),rgba(255,255,255,.38) 15%,rgba(255,255,255,.12) 50%,transparent 86%)}.venuePartyLight.lightLeft:before{clip-path:polygon(0 44%,0 56%,100% 98%,86% 2%);background:linear-gradient(90deg,rgba(255,255,255,.98),rgba(255,255,255,.38) 15%,rgba(255,255,255,.12) 50%,transparent 86%)}.venuePartyLight:after{content:"";position:absolute;top:50%;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 0 18px 7px #fff,0 0 78px 30px #ffffff7b;transform:translateY(-50%)}.venuePartyLight.lightRight:after{right:5%}.venuePartyLight.lightLeft:after{left:5%}.venuePartyLight span,.venuePartyLight i,.venuePartyLight b{position:absolute;top:50%;height:2px;width:78%;opacity:.45;background:linear-gradient(90deg,transparent,#fff,transparent)}.venuePartyLight.lightRight span,.venuePartyLight.lightRight i,.venuePartyLight.lightRight b{right:5%;transform-origin:right}.venuePartyLight.lightLeft span,.venuePartyLight.lightLeft i,.venuePartyLight.lightLeft b{left:5%;transform-origin:left}.venuePartyLight span{transform:rotate(11deg)}.venuePartyLight i{transform:rotate(-11deg)}.venuePartyLight b{transform:rotate(3deg);opacity:.68}.venueStaticNav{position:absolute;inset-inline-end:0;bottom:clamp(48px,5.5vh,66px);display:flex;align-items:center;gap:13px;color:#ffffff64;font-size:9px;letter-spacing:.16em}.venueStaticDots{display:flex;gap:7px}.venueStaticDots button{appearance:none;border:0;padding:0;width:28px;height:3px;border-radius:4px;background:#ffffff1a;cursor:pointer;transition:background .25s,box-shadow .25s,transform .25s}.venueStaticDots button.done{background:#a855f76c}.venueStaticDots button.active{background:#fff;box-shadow:0 0 13px #fff;transform:scaleX(1.12)}.venueLockHint{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);color:#ffffff45;font-size:8px;letter-spacing:.22em;white-space:nowrap;margin:0}.venueLocked{outline:0}.venueStaticSection + .section{padding-top:clamp(44px,4.2vw,62px)}@keyframes venueStaticPinPulse{0%{transform:scale(1);opacity:.82}100%{transform:scale(1.55);opacity:0}}@keyframes venueCardArriveRight{0%{opacity:0;transform:translate3d(62vw,-50%,0) scale(.96);filter:blur(5px)}100%{opacity:1;transform:translate3d(0,-50%,0) scale(1);filter:none}}@keyframes venueCardArriveLeft{0%{opacity:0;transform:translate3d(-62vw,-50%,0) scale(.96);filter:blur(5px)}100%{opacity:1;transform:translate3d(0,-50%,0) scale(1);filter:none}}@keyframes venueLayerArrive{0%{opacity:0;transform:translateX(28px)}100%{opacity:1;transform:none}}@keyframes venueCardScan{0%{transform:translateX(-135%);opacity:0}18%{opacity:1}100%{transform:translateX(140%);opacity:0}}@keyframes venueLightRight{0%{opacity:0;transform:translate3d(36%, -50%,0) scaleX(.14)}28%{opacity:.96}67%{opacity:.72;transform:translate3d(0,-50%,0) scaleX(1)}100%{opacity:.16;transform:translate3d(0,-50%,0) scaleX(1)}}@keyframes venueLightLeft{0%{opacity:0;transform:translate3d(-36%, -50%,0) scaleX(.14)}28%{opacity:.96}67%{opacity:.72;transform:translate3d(0,-50%,0) scaleX(1)}100%{opacity:.16;transform:translate3d(0,-50%,0) scaleX(1)}}@media(max-width:1024px){.venueStandaloneCard{width:min(560px,58vw)}.venueStaticIdentity{max-width:340px}.venuePartyLight{width:72vw}}@media(max-width:819px){.venueStaticSection{height:auto;min-height:720px}.venueStaticContent{width:100%;min-height:720px;padding:46px 22px 38px}.venueStaticHead{position:relative;top:auto;inset-inline-start:auto}.venueStaticHead h2{font-size:42px}.venueStaticIdentity{position:absolute;left:22px;right:22px;bottom:92px;max-width:none;gap:16px}.rtl .venueStaticIdentity{left:22px;right:22px}.venueStaticPin{width:54px;height:54px;flex-basis:54px;border-radius:17px}.venueStaticPinGlyph{width:27px;height:27px}.venueStaticPin i{inset:5px;border-radius:13px}.venueStaticIdentity p{font-size:8px;margin-bottom:4px}.venueStaticIdentity h3{font-size:25px}.venueStaticIdentity span{font-size:8px;margin-top:5px}.venueStandaloneCard{top:48%;width:calc(100% - 44px);min-height:136px;padding:17px 18px;grid-template-columns:auto 1fr;border-radius:18px}.venueStandaloneCard.cardFromRight{right:22px}.venueStandaloneCard.cardFromLeft{left:22px}.venueStandaloneIcon{width:52px;height:52px;border-radius:16px}.venueIconSvg{width:24px;height:24px}.venueIconOrbit{inset:6px;border-radius:12px}.venueIconStatus{right:6px;bottom:6px;width:5px;height:5px}.venueStandaloneNumber{display:none}.venueStandaloneCopy p{font-size:8px}.venueStandaloneCopy h4{font-size:13px}.venuePartyLight{top:48%;width:118vw;height:280px}.venueStaticNav{left:22px;right:22px;bottom:48px;justify-content:center;flex-wrap:wrap}.venueStaticDots{justify-content:center}.venueStaticDots button{width:22px}.venueLockHint{bottom:15px;font-size:7px}.venueStaticSection + .section{padding-top:38px}}@media(max-width:480px){.venueStaticSection,.venueStaticContent{min-height:690px}.venueStaticContent{padding-inline:18px}.venueStaticHead h2{font-size:38px}.venueStandaloneCard{top:47%;width:calc(100% - 36px);padding:15px}.venueStandaloneCard.cardFromRight{right:18px}.venueStandaloneCard.cardFromLeft{left:18px}.venuePartyLight{height:235px}.venueStaticIdentity{left:18px;right:18px;bottom:84px}.rtl .venueStaticIdentity{left:18px;right:18px}.venueStaticNav{left:18px;right:18px}}
.ticketGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.ticketCard{--accent:${purple};border:1px solid #ffffff12;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:22px;background:#ffffff07;cursor:pointer;opacity:0;transform:translateY(28px);transition:transform .35s,border-color .35s,background .35s,box-shadow .35s,opacity .35s}.ticketIn{animation:ticketIn .65s ease forwards;animation-delay:var(--delay)}.ticketCard:not(.soldOut):hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--accent) 70%,transparent)}.ticketActive{border-color:var(--accent)!important;background:color-mix(in srgb,var(--accent) 12%,transparent)!important;box-shadow:0 0 42px color-mix(in srgb,var(--accent) 22%,transparent)}.soldOut{opacity:.36!important;cursor:not-allowed;filter:grayscale(.35)}.soldBadge{align-self:flex-start;border-radius:99px;background:#ffffff12;color:#ffffff7a;padding:4px 9px;font-size:9px}.ticketName{color:var(--accent);text-transform:uppercase;letter-spacing:.16em;font-size:10px;margin:0}.ticketCard h3{font-size:44px;margin-top:5px}.ticketDesc{font-size:12px;line-height:1.55;color:#ffffff52}.ticketCard ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px;flex:1}.ticketCard li{font-size:12px;color:#ffffff8a;display:flex;gap:8px}.ticketCard li b{color:var(--accent)}.selectButton{border:1px solid var(--accent);color:var(--accent);border-radius:12px;text-align:center;padding:11px;font-weight:700;font-size:12px}.ticketActive .selectButton{background:var(--accent);color:${dark}}.reserveWrap{margin-top:24px;text-align:center}.reserveButton{width:100%;border:0;background:linear-gradient(120deg,${pink},${purple});color:#05040a;border-radius:999px;padding:15px 24px;font-family:${fraunces};font-size:17px;font-weight:900;cursor:pointer;box-shadow:0 10px 40px #a855f72a;transition:transform .25s,box-shadow .25s}.reserveButton:hover{transform:translateY(-2px);box-shadow:0 16px 50px #ff2d7840}.reserveButton span{display:inline-block;transition:transform .25s}.reserveButton:hover span{transform:translateX(5px)}.rtl .reserveButton:hover span{transform:translateX(-5px)}.reserveSuccess{color:${cyan};font-size:12px;margin:12px 0 0;animation:successIn .4s ease}@keyframes ticketIn{to{opacity:1;transform:none}}@keyframes successIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ticketLocked:not(.ticketActive){opacity:.58!important;cursor:not-allowed}.reservePanel{margin-top:22px;border:1px solid #ffffff16;background:linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.025));border-radius:20px;padding:18px 20px 20px;display:flex;flex-direction:column;gap:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}.reservePanelTop{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:14px;border-bottom:1px solid #ffffff0d}.reservePanelIntro{min-width:0}.reservePanelEyebrow{display:block;color:#22d3ee;font-size:10px;text-transform:uppercase;letter-spacing:.17em;font-weight:700}.reservePanelIntro p{margin:5px 0 0;color:#ffffff45;font-size:11px}.reserveTierSummary{--reserve-accent:${pink};display:flex;align-items:center;gap:12px;flex:0 0 auto;padding:7px 10px 7px 12px;border:1px solid color-mix(in srgb,var(--reserve-accent) 28%,transparent);border-radius:999px;background:color-mix(in srgb,var(--reserve-accent) 7%,transparent)}.reserveTierSummary span{color:#ffffff8c;font-size:10px;text-transform:uppercase;letter-spacing:.12em;white-space:nowrap}.reserveTierSummary strong{color:var(--reserve-accent);font-family:${fraunces};font-size:17px;line-height:1}.reservePanelActions{display:grid;grid-template-columns:minmax(260px,.72fr) minmax(320px,1.28fr);gap:14px;align-items:center}.reserveNameField{min-width:0}.reserveNameField input{width:100%;height:52px;border:1px solid #ffffff1d;background:#07060f99;border-radius:13px;color:#fff;padding:0 16px;outline:none;font-family:'Space Grotesk', sans-serif;font-size:14px;transition:border-color .25s,box-shadow .25s,background .25s}.reserveNameField input:hover{border-color:#ffffff32}.reserveNameField input:focus{border-color:#22d3ee;box-shadow:0 0 0 3px #22d3ee16;background:#07060fc7}.reserveNameField input::placeholder{color:#ffffff3e}.reservePanel .reserveButton{height:52px;padding:0 20px;display:flex;align-items:center;justify-content:center;gap:10px}.reserveButtonText{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.reserveArrow{font-family:${grotesk};font-size:19px;line-height:1}.reserveButton:disabled{opacity:.35;cursor:not-allowed;transform:none!important;box-shadow:none!important;filter:saturate(.55)}.reservationReceipt{margin-top:22px;border:1px solid #22d3ee42;background:#22d3ee0d;border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:14px;animation:successIn .5s ease}.reservationReceipt>span{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#22d3ee;color:#07060f;font-weight:900;box-shadow:0 0 32px #22d3ee4a}.reservationReceipt b{display:block;color:#fff;margin-bottom:4px}.reservationReceipt p{margin:0;color:#ffffff6f;font-size:12px}.reservationReceipt strong{color:#22d3ee}
.contestTop{display:flex;align-items:flex-start;justify-content:space-between;gap:40px;margin-bottom:36px}.contestCopy{max-width:820px}.contestCopy>p:last-child{color:#ffffff58;line-height:1.7;font-size:14px;margin-top:16px}.prizePool{border:1px solid #ff2d7833;background:#ff2d780c;border-radius:19px;padding:22px 28px;display:flex;flex-direction:column;align-items:center;opacity:0;transform:scale(.82) rotate(2deg)}.poolIn{animation:poolIn .8s cubic-bezier(.34,1.56,.64,1) .3s forwards}.prizePool strong{font-family:${fraunces};font-size:50px;line-height:1}.prizePool span{color:${pink};text-transform:uppercase;letter-spacing:.14em;font-size:9px;margin-top:7px}.prizeGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.prizeCard{border:1px solid var(--prize-color,#ffffff12);background:linear-gradient(180deg,color-mix(in srgb,var(--prize-color,#fff) 5%,transparent),#ffffff05);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--prize-color,#fff) 8%,transparent);border-radius:18px;padding:24px;text-align:center;opacity:0;transform:translateY(34px) scale(.94)}.prizeIn{animation:prizeIn .65s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--delay)}.prizeCard>span{font-size:34px}.prizeCard h3{font-size:18px;margin:12px 0 9px}.prizeCard p{color:#ffffff73;font-size:12px;line-height:1.5;margin:0}.winnerFlash{animation:prizeIn .65s cubic-bezier(.16,1,.3,1) forwards, winnerGlow 1.1s ease 1.05s 1;animation-delay:var(--delay),1.15s}@keyframes poolIn{to{opacity:1;transform:none}}@keyframes prizeIn{to{opacity:1;transform:none}}@keyframes winnerGlow{50%{border-color:#f7d774;box-shadow:0 0 0 1px #f7d774,0 0 45px #f7d77444;transform:translateY(-5px)}}
.closingSection{padding-bottom:72px}.closingGrid{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:stretch}.afterCard{border:1px solid #a855f73b;border-radius:24px;overflow:hidden;background:#a855f70a}.afterImage{position:relative;height:230px;overflow:hidden}.afterImage img{display:block;width:100%;height:100%;object-fit:cover;opacity:.65;transition:transform 8s ease}.afterCard.isVisible .afterImage img{transform:scale(1.08)}.afterImage>div{position:absolute;inset:0 0 -2px 0;background:linear-gradient(to top,#0b0817 0%,rgba(7,6,15,.94) 18%,rgba(7,6,15,.38) 54%,transparent 76%)}.afterImage:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:30px;background:linear-gradient(to bottom,transparent,#0b0817);pointer-events:none}.afterBody{position:relative;background:linear-gradient(180deg,#0b0817,rgba(168,85,247,.045))}.afterImage span{position:absolute;left:24px;bottom:66px;color:${purple};text-transform:uppercase;letter-spacing:.18em;font-size:9px}.afterImage h3{position:absolute;left:24px;bottom:28px;font-size:28px}.rtl .afterImage span,.rtl .afterImage h3{left:auto;right:24px}.afterBody{padding:24px}.afterBody p{color:#ffffff7a;line-height:1.7;font-size:13px}.afterBody strong{display:block;color:${purple};margin-top:14px;font-size:13px;animation:vipGlow 2.3s ease-in-out infinite}.rulesPanel{display:flex;flex-direction:column;gap:24px;padding:10px 0}.rulesPanel ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px}.rulesPanel li{display:flex;gap:14px;color:#ffffff67;font-size:13px;opacity:0;transform:translateY(10px)}.rulesPanel li.ruleIn{animation:ruleIn .45s ease forwards;animation-delay:var(--delay)}.rulesPanel li b{color:${pink};min-width:22px}.questions{border-top:1px solid #ffffff12;padding-top:20px;color:#ffffff2f;font-size:10px;margin-top:auto}@keyframes vipGlow{50%{text-shadow:0 0 20px #a855f7aa}}@keyframes ruleIn{to{opacity:1;transform:none}}
.partyFooter{position:relative;overflow:hidden;background:#030209;border-top:1px solid #ffffff0b;padding:clamp(72px,9vw,130px) clamp(20px,4vw,48px) 38px;isolation:isolate}.footerGlow{position:absolute;border-radius:50%;filter:blur(110px);opacity:.14;z-index:-1}.footerGlowPink{width:45vw;height:45vw;background:#ff2d78;left:-16vw;bottom:-28vw}.footerGlowCyan{width:38vw;height:38vw;background:#22d3ee;right:-15vw;top:-24vw}.footerInner{text-align:center;opacity:0;transform:translateY(34px);transition:opacity .85s,transform .85s cubic-bezier(.16,1,.3,1)}.footerIn .footerInner{opacity:1;transform:none}.footerEyebrow{color:#ff2d78;letter-spacing:.46em;font-size:10px;margin:0 0 16px}.partyFooter h2{font-size:clamp(46px,8.5vw,118px);line-height:.85;letter-spacing:-.035em;max-width:980px;margin:0 auto!important}.footerNeonRule{display:flex;align-items:center;justify-content:center;gap:14px;margin:34px auto;width:min(620px,80%)}.footerNeonRule i{height:1px;flex:1;background:linear-gradient(90deg,transparent,#a855f7)}.footerNeonRule i:last-child{background:linear-gradient(90deg,#22d3ee,transparent)}.footerNeonRule span{color:#fff;text-shadow:0 0 18px #ff2d78}.footerLine{font-family:'Fraunces', serif;font-size:clamp(17px,2vw,25px);color:#ffffffae;margin:0}.footerMeta{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-top:28px;color:#ffffff4f;font-size:11px}.footerBottom{display:flex;align-items:center;justify-content:space-between;gap:20px;border-top:1px solid #ffffff0c;margin-top:64px;padding-top:22px;color:#ffffff35;font-size:9px;letter-spacing:.12em}.footerBottom strong{color:#ffffff8a;font-family:'Fraunces', serif;font-size:14px;letter-spacing:.04em}
.floating{position:fixed;z-index:5000;left:max(18px,env(safe-area-inset-left));bottom:max(18px,env(safe-area-inset-bottom));display:flex;gap:9px;align-items:flex-end}.floatingRTL{left:auto;right:max(18px,env(safe-area-inset-right))}.floatBtn{border:1px solid #ffffff1f;background:#0c0b17d9;color:#fff;backdrop-filter:blur(14px);box-shadow:0 8px 30px #0008;border-radius:999px;height:44px;cursor:pointer}.soundBtn{width:44px;display:grid;place-items:center}.langBtn{padding:0 15px;display:flex;gap:8px;align-items:center;font-size:11px;font-weight:700}.langWrap{position:relative}.langMenu{position:absolute;bottom:52px;left:0;background:#0c0b17f5;border:1px solid #ffffff14;border-radius:14px;padding:6px;width:130px;box-shadow:0 14px 45px #000b;display:flex;flex-direction:column}.floatingRTL .langMenu{left:auto;right:0}.langMenu button{border:0;background:transparent;color:#ffffff8a;text-align:left;padding:9px 10px;border-radius:9px;cursor:pointer;font-size:11px}.rtl .langMenu button{text-align:right}.langMenu button:hover,.langMenu .activeLang{background:#ffffff0b;color:${cyan}}.eq{display:flex;align-items:flex-end;gap:2px;height:14px}.eq i{display:block;width:2px;background:${pink};border-radius:2px;animation:eq .65s ease-in-out infinite alternate}.eq i:nth-child(1){height:7px}.eq i:nth-child(2){height:13px;animation-delay:-.23s;background:${purple}}.eq i:nth-child(3){height:9px;animation-delay:-.4s;background:${cyan}}.eqMuted i{animation:none!important;height:2px!important;background:#ffffff4a!important}@keyframes eq{to{height:3px}}.soundWrap{position:relative}.soundPanel{position:absolute;bottom:54px;left:0;width:230px;padding:13px 13px 12px;border:1px solid #ffffff18;border-radius:16px;background:linear-gradient(155deg,rgba(20,18,34,.97),rgba(8,7,16,.97));box-shadow:0 18px 48px #000c,inset 0 1px 0 #ffffff0d;backdrop-filter:blur(18px)}.floatingRTL .soundPanel{left:auto;right:0}.soundPanelTop{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;color:#ffffff83;font-size:10px;text-transform:uppercase;letter-spacing:.14em}.soundPanelTop b{color:${cyan};font-size:10px}.volumeRange{width:100%;height:24px;margin:0;accent-color:${pink};cursor:pointer;background:transparent}.volumeRange::-webkit-slider-runnable-track{height:4px;border-radius:99px;background:linear-gradient(90deg,${pink},${purple},${cyan})}.volumeRange::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;margin-top:-6px;border-radius:50%;background:#fff;border:3px solid ${purple};box-shadow:0 0 14px #a855f777}.muteAction{width:100%;min-height:36px;margin-top:7px;border:1px solid #ffffff12;border-radius:10px;background:#ffffff06;color:#ffffffbd;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.muteAction:hover{border-color:#ffffff28;background:#ffffff0b}.miniEq{height:11px}.miniEq i{width:2px}.miniEq i:nth-child(1){height:5px}.miniEq i:nth-child(2){height:9px}.miniEq i:nth-child(3){height:6px}@media(max-width:640px){
  .introVideo{
    object-fit:contain;
    object-position:center;
    transform:none;
    transition:filter .3s ease;
  }
}
@media(max-width:520px){.soundPanel{width:min(220px,calc(100vw - 36px));bottom:52px}}
@media(max-width:1024px){.lineupGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.ticketGrid{grid-template-columns:1fr 1fr}.ticketCard:last-child{grid-column:1/-1;max-width:560px;width:100%;justify-self:center}.prizeGrid{grid-template-columns:repeat(2,1fr)}.heroTitle{font-size:clamp(82px,15vw,150px)}.heroTitle span:last-child{margin-inline-start:7vw}}
@media(max-width:760px){.section{padding:54px 18px}.hero{min-height:100svh}.heroContent{padding:28px 18px 92px;gap:25px}.heroTitle{font-size:clamp(66px,22vw,110px);line-height:.76}.heroTitle span:last-child{margin-inline-start:0}.heroMeta{max-width:320px;line-height:1.45}.countdown{gap:18px}.countUnit{min-width:54px}.countWindow{height:49px}.countValue{font-size:44px}.heroChips{gap:9px}.heroChip{padding:9px 13px;font-size:10px}.heroScroll{display:none}.sectionHead{align-items:flex-start;flex-direction:column;margin-bottom:30px}.sectionSide{text-align:start}.lineupGrid{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 18px 16px;margin:0 -18px;scrollbar-width:none}.lineupGrid::-webkit-scrollbar{display:none}.artistCard{flex:0 0:min(82vw,320px);scroll-snap-align:center}.artistImage{height:210px}.venueJourney{min-height:auto}.venueSticky{position:relative;top:auto}.venueGrid{grid-template-columns:1fr}.venueVisual{min-height:350px}.ticketGrid{grid-template-columns:1fr}.ticketCard:last-child{grid-column:auto;max-width:none}.contestTop{flex-direction:column}.prizePool{width:100%}.closingGrid{grid-template-columns:1fr;gap:58px}.afterImage{height:210px}.floating{bottom:max(12px,env(safe-area-inset-bottom));left:max(12px,env(safe-area-inset-left))}.floatingRTL{left:auto;right:max(12px,env(safe-area-inset-right))}}
@media(max-width:480px){.heroEyebrow{letter-spacing:.35em}.heroTitle{font-size:clamp(58px,23vw,92px)}.countdown{display:grid;grid-template-columns:repeat(4,1fr);width:100%;gap:8px}.countUnit{min-width:0;text-align:center}.countValue{font-size:clamp(34px,10vw,45px)}.countLabel{font-size:8px}.heroChips{display:grid;grid-template-columns:1fr 1fr}.heroChip:nth-child(3){grid-column:1/-1;text-align:center}.sectionHead h2,.contestCopy h2,.rulesPanel h2{font-size:36px}.venueVisual{min-height:300px}.venueHud{left:12px;top:12px;padding:6px 8px;font-size:7px}.rtl .venueHud{left:auto;right:12px}.prizeGrid{grid-template-columns:1fr 1fr;gap:10px}.prizeCard{padding:18px 12px}.prizeCard h3{font-size:15px}.afterBody{padding:20px}}

@media(max-width:1024px){.venueParallax{min-height:230vh}.venueExperience{grid-template-columns:.72fr 1.28fr;gap:30px}.venueIdentity{padding:24px;min-height:340px}.venueProjectorCards .infoCard{padding:13px 14px}.projectorBeam{width:190px}.reservePanelActions{grid-template-columns:minmax(210px,.8fr) minmax(260px,1.2fr)}}
@media(max-width:760px){.venueParallax{min-height:245vh}.venueStage{align-items:flex-start}.venueParallaxContent{padding:64px 18px 48px}.venueExperience{grid-template-columns:1fr;gap:16px}.venueIdentity{min-height:180px;padding:8px 2px 14px}.venueDestinationPin{width:54px;height:54px;margin-bottom:18px}.venueIdentity h3{font-size:34px}.venueIdentity>span{font-size:10px}.venueProjectorCards{gap:8px}.venueProjectorCards .infoCard{padding:12px 13px;background:rgba(8,7,20,.82)}.projectorBeam{right:auto;left:8%;top:auto;bottom:100%;width:84%;height:115px;transform:none;clip-path:polygon(45% 100%,55% 100%,100% 0,0 0);background:linear-gradient(0deg,rgba(255,255,255,.30),rgba(255,255,255,.02));filter:blur(8px)}.rtl .projectorBeam{left:8%;right:auto;transform:none}.projectorHit .projectorBeam{animation:projectorFlashMobile 1.15s ease both}.venueBackdrop{inset:-8% -18%;width:136%}.venueBackdropShade{background:linear-gradient(to top,#07060ff4 0%,rgba(7,6,15,.52) 46%,#07060fba 100%)}.reservePanel{padding:16px}.reservePanelTop{align-items:flex-start}.reservePanelActions{grid-template-columns:1fr}.reservePanel .reserveButton{width:100%}.footerBottom{flex-direction:column;justify-content:center}.partyFooter{padding-bottom:96px}}
@media(max-width:480px){.venueParallax{min-height:260vh}.venueParallaxContent{padding-top:48px}.venueIdentity{min-height:155px}.venueProjectorCards .infoCard span:not(.infoIcon):not(.projectorBeam):not(.projectorHotspot){font-size:11px}.reservePanel{padding:14px}.reservePanelTop{gap:12px}.reserveTierSummary{padding:6px 9px}.reserveTierSummary span{display:none}.reservePanelActions{gap:10px}.partyFooter h2{font-size:clamp(42px,15vw,68px)}.footerMeta{flex-direction:column;gap:8px}.footerBottom{margin-top:42px}}
@keyframes projectorFlashMobile{0%{opacity:0;transform:scaleY(.2)}30%{opacity:1}100%{opacity:.12;transform:scaleY(1)}}
/* === FINAL FLUID RESPONSIVE SYSTEM === */
.partyRoot{width:100%;max-width:100%;overflow-x:clip}
.partyRoot *{min-width:0}
.partyRoot img,.partyRoot svg{max-width:100%}
.shell{width:min(1182px,100%);max-width:1182px}
.sectionHead>*,.contestTop>*,.closingGrid>*,.ticketGrid>*,.prizeGrid>*,.lineupGrid>*{min-width:0}
.sectionHead h2,.contestCopy h2,.rulesPanel h2{font-size:clamp(36px,4.6vw,58px);line-height:1.02}
.sectionSide{max-width:360px;overflow-wrap:anywhere}
.artistBody h3,.artistGenre,.artistTime,.ticketCard,.prizeCard,.afterBody,.rulesPanel,.reservationReceipt,.venueStandaloneCopy h4{overflow-wrap:anywhere}

@media(max-width:1280px){
  .heroContent{width:min(1120px,100%);padding-inline:clamp(28px,4vw,44px)}
  .heroTitle{font-size:clamp(76px,12.2vw,148px)}
  .section{padding-inline:clamp(26px,3.7vw,42px)}
  .partyFooter{padding-inline:clamp(26px,3.7vw,42px)}
  .lineupGrid,.ticketGrid{gap:15px}
  .artistImage{height:clamp(190px,17vw,220px)}
  .venueStaticContent{width:min(1120px,calc(100% - clamp(48px,5vw,84px)))}
  .venueStandaloneCard{width:min(560px,48vw)}
}

@media(max-width:1080px){
  .lineupGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
  .artistImage{height:250px}
  .ticketGrid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ticketCard:last-child{grid-column:1/-1;width:min(560px,100%);justify-self:center}
  .prizeGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
  .closingGrid{gap:28px}
  .reservePanelActions{grid-template-columns:minmax(220px,.8fr) minmax(280px,1.2fr)}
  .venueStaticIdentity{max-width:330px;gap:18px}
  .venueStaticPin{width:64px;height:64px;flex-basis:64px;border-radius:20px}
  .venueStaticPinGlyph{width:31px;height:31px}
  .venueStandaloneCard{width:min(540px,56vw)}
}

@media(max-width:920px){
  .section{padding-block:clamp(48px,7vw,64px)}
  .sectionHead{align-items:flex-start;flex-direction:column;gap:12px;margin-bottom:28px}
  .sectionSide{text-align:start;max-width:none}
  .contestTop{gap:26px}
  .closingGrid{grid-template-columns:1fr;gap:48px}
  .afterCard{width:min(680px,100%);margin-inline:auto}
  .rulesPanel{width:min(680px,100%);margin-inline:auto}
  .afterImage{height:260px}
  .footerBottom{gap:14px}
}

@media(max-width:819px){
  .hero{min-height:100svh}
  .heroContent{padding:32px 22px 92px;gap:26px}
  .heroTitle{font-size:clamp(64px,18vw,112px);line-height:.78}
  .heroTitle span:last-child{margin-inline-start:0}
  .heroMeta{font-size:clamp(13px,2.4vw,17px);max-width:520px;line-height:1.5}
  .countdown{gap:clamp(12px,4vw,24px)}
  .countWindow{height:52px}
  .countValue{font-size:clamp(40px,7.5vw,50px)}
  .heroChips{gap:10px}
  .heroChip{padding:10px 14px;font-size:10px}
  .heroScroll{display:none}
  .section{padding:52px 22px}
  .partyFooter{padding-inline:22px;padding-bottom:92px}

  .lineupGrid{display:flex;grid-template-columns:none;gap:14px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-padding-inline:22px;padding:0 22px 16px;margin-inline:-22px;-webkit-overflow-scrolling:touch;overscroll-behavior-inline:contain;scrollbar-width:none}
  .lineupGrid::-webkit-scrollbar{display:none}
  .artistCard{flex:0 0:min(76vw,360px);scroll-snap-align:center}
  .artistImage{height:235px}

  .ticketGrid{grid-template-columns:1fr}
  .ticketCard:last-child{grid-column:auto;width:100%;max-width:none}
  .ticketCard{padding:22px}
  .reservePanel{padding:17px}
  .reservePanelTop{align-items:flex-start;flex-wrap:wrap}
  .reservePanelActions{grid-template-columns:1fr;gap:11px}
  .reservePanel .reserveButton{width:100%}

  .contestTop{flex-direction:column;align-items:stretch}
  .prizePool{width:100%;flex-direction:row;justify-content:space-between;padding:18px 22px}
  .prizePool strong{font-size:clamp(40px,10vw,58px)}

  .closingGrid{gap:44px}
  .afterImage{height:230px}
  .rulesPanel{padding-inline:2px}

  .introCenter{width:min(680px,100%);padding:24px 20px}
  .introMark{width:64px;height:64px;margin-bottom:18px}
  .introEyebrow{font-size:10px;letter-spacing:.38em}
  .introCenter h1{font-size:clamp(42px,11vw,78px);margin:16px 0 22px}
  .inviteOpenControl{width:min(390px,92vw)}

  .venueStaticSection{height:auto;min-height:max(720px,100svh)}
  .venueStaticContent{width:100%;min-height:max(720px,100svh);padding:44px 22px 40px}
  .venueStaticHead{position:relative;top:auto;inset-inline-start:auto}
  .venueStaticHead h2{font-size:clamp(40px,8vw,52px)}
  .venueStandaloneCard{top:44%;width:calc(100% - 44px);min-height:142px;padding:18px;grid-template-columns:auto minmax(0,1fr);gap:15px;border-radius:19px}
  .venueStandaloneCard.cardFromRight{right:22px}
  .venueStandaloneCard.cardFromLeft{left:22px}
  .venueStandaloneIcon{width:54px;height:54px;border-radius:17px}
  .venueIconSvg{width:25px;height:25px}
  .venueStandaloneCopy h4{font-size:clamp(13px,2.8vw,16px);line-height:1.45}
  .venueStandaloneNumber{display:none}
  .venuePartyLight{top:44%;width:120vw;height:290px}
  .venueStaticIdentity{left:22px;right:22px;bottom:94px;max-width:none;gap:15px}
  .rtl .venueStaticIdentity{left:22px;right:22px}
  .venueStaticPin{width:56px;height:56px;flex-basis:56px;border-radius:18px}
  .venueStaticPinGlyph{width:28px;height:28px}
  .venueStaticIdentity h3{font-size:clamp(24px,5vw,32px);max-width:none}
  .venueStaticNav{left:22px;right:22px;bottom:48px;justify-content:center;flex-wrap:wrap}
  .venueStaticDots{justify-content:center}
  .venueLockHint{bottom:15px;font-size:7px}
  .venueStaticSection + .section{padding-top:42px}
}

@media(max-width:620px){
  .heroContent{padding-inline:18px}
  .heroEyebrow{font-size:10px;letter-spacing:.34em}
  .heroTitle{font-size:clamp(60px,21vw,94px)}
  .countdown{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;gap:8px}
  .countUnit{min-width:0;text-align:center}
  .countValue{font-size:clamp(34px,10vw,44px)}
  .countLabel{font-size:8px}
  .heroChips{display:grid;grid-template-columns:1fr 1fr;width:100%}
  .heroChip{text-align:center;white-space:normal}
  .heroChip:nth-child(3){grid-column:1/-1}
  .section{padding:46px 18px}
  .sectionHead h2,.contestCopy h2,.rulesPanel h2{font-size:clamp(34px,9vw,44px)}
  .sectionEyebrow{letter-spacing:.3em}

  .lineupGrid{padding-inline:18px;margin-inline:-18px;scroll-padding-inline:18px}
  .artistCard{flex-basis:min(84vw,340px)}
  .artistImage{height:220px}

  .ticketCard{padding:20px;border-radius:18px}
  .ticketCard h3{font-size:40px}
  .reservePanelTop{flex-direction:column;gap:12px}
  .reserveTierSummary{align-self:stretch;justify-content:space-between;border-radius:14px}
  .reserveNameField input,.reservePanel .reserveButton{height:50px}
  .reservationReceipt{align-items:flex-start;padding:16px}

  .prizeGrid{gap:11px}
  .prizeCard{padding:20px 14px}
  .afterImage{height:210px}
  .afterImage span,.afterImage h3{left:20px}
  .rtl .afterImage span,.rtl .afterImage h3{left:auto;right:20px}
  .afterImage h3{font-size:25px}
  .afterBody{padding:20px}

  .partyFooter{padding-top:72px;padding-inline:18px}
  .partyFooter h2{font-size:clamp(42px,15vw,70px)}
  .footerNeonRule{width:92%;margin-block:28px}
  .footerMeta{flex-direction:column;gap:8px;margin-top:22px}
  .footerBottom{flex-direction:column;justify-content:center;text-align:center;margin-top:42px}

  .floating{left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom))}
  .floatingRTL{left:auto;right:max(12px,env(safe-area-inset-right))}
  .floatBtn{height:42px}
  .soundBtn{width:42px}
  .langBtn{padding-inline:13px}

  .venueStaticContent{padding-inline:18px}
  .venueStandaloneCard{width:calc(100% - 36px);padding:16px;gap:13px}
  .venueStandaloneCard.cardFromRight{right:18px}
  .venueStandaloneCard.cardFromLeft{left:18px}
  .venueStaticIdentity{left:18px;right:18px;bottom:88px}
  .rtl .venueStaticIdentity{left:18px;right:18px}
  .venueStaticNav{left:18px;right:18px}
  .venueStaticDots button{width:22px}
}

@media(max-width:460px){
  .introCenter{padding-inline:16px}
  .introMark{width:56px;height:56px;border-radius:18px;font-size:21px;margin-bottom:15px}
  .introEyebrow{font-size:9px;letter-spacing:.28em}
  .introCenter h1{font-size:clamp(38px,13vw,58px);line-height:.93;margin:14px 0 18px}
  .inviteOpenControl{width:100%;min-height:70px;grid-template-columns:48px minmax(0,1fr) 36px;gap:10px;padding:9px;border-radius:17px}
  .inviteOpenControl:before{left:65px;top:10px;bottom:10px}
  .inviteSeal{width:42px;height:42px;border-radius:12px;font-size:15px}
  .inviteOpenCopy b{font-size:10px;letter-spacing:.12em}
  .inviteOpenCopy small{font-size:7px;letter-spacing:.08em}
  .inviteArrow{width:32px;height:32px}
  .introSub{font-size:10px;margin-top:12px}

  .heroContent{padding-bottom:82px}
  .heroTitle{font-size:clamp(56px,22vw,82px)}
  .heroMeta{font-size:13px}
  .heroChips{grid-template-columns:1fr}
  .heroChip:nth-child(3){grid-column:auto}

  .prizeGrid{grid-template-columns:1fr}
  .prizeCard{padding:21px 16px}
  .prizePool{align-items:center}
  .prizePool span{text-align:end}
  .afterImage{height:195px}

  .venueStaticSection,.venueStaticContent{min-height:max(690px,100svh)}
  .venueStaticHead h2{font-size:38px}
  .venueStandaloneCard{top:43%;min-height:136px}
  .venueStandaloneIcon{width:49px;height:49px;border-radius:15px}
  .venueIconSvg{width:23px;height:23px}
  .venueMicroLabel{font-size:6px;letter-spacing:.14em}
  .venueStandaloneCopy p{font-size:8px;letter-spacing:.16em}
  .venueStandaloneCopy h4{font-size:13px}
  .venuePartyLight{top:43%;height:230px}
  .venueStaticPin{width:50px;height:50px;flex-basis:50px;border-radius:16px}
  .venueStaticPinGlyph{width:25px;height:25px}
  .venueStaticIdentity{gap:12px}
  .venueStaticIdentity h3{font-size:23px}
  .venueStaticIdentity p,.venueStaticIdentity span{font-size:7px}
}

@media(max-width:350px){
  .section{padding-inline:14px}
  .heroContent{padding-inline:14px}
  .heroTitle{font-size:54px}
  .countValue{font-size:30px}
  .countLabel{font-size:7px;letter-spacing:.08em}
  .lineupGrid{padding-inline:14px;margin-inline:-14px;scroll-padding-inline:14px}
  .artistCard{flex-basis:88vw}
  .artistImage{height:205px}
  .reservePanel{padding:13px}
  .reservationReceipt{gap:10px}
  .reservationReceipt>span{width:34px;height:34px;flex:0 0 34px}
  .venueStaticContent{padding-inline:14px}
  .venueStandaloneCard{width:calc(100% - 28px);padding:14px 12px;gap:10px}
  .venueStandaloneCard.cardFromRight{right:14px}
  .venueStandaloneCard.cardFromLeft{left:14px}
  .venueStandaloneIcon{width:44px;height:44px}
  .venueStaticIdentity{left:14px;right:14px}
  .rtl .venueStaticIdentity{left:14px;right:14px}
  .venueStaticNav{left:14px;right:14px;gap:8px}
  .venueStaticDots{gap:5px}
  .venueStaticDots button{width:17px}
  .venueStaticNav>span{font-size:8px}
}

/* Short desktop/laptop viewports: preserve the venue interaction without clipping. */
@media(min-width:820px) and (max-height:700px){
  .introMark{width:54px;height:54px;margin-bottom:12px;border-radius:17px}
  .introCenter h1{font-size:clamp(42px,8vw,76px);margin:10px 0 14px}
  .introEyebrow{font-size:9px}
  .inviteOpenControl{min-height:66px;transform:scale(.92);transform-origin:center}
  .introSub{margin-top:8px;font-size:10px}
  .heroContent{padding-top:24px;padding-bottom:34px;gap:15px}
  .heroTitle{font-size:clamp(62px,11vw,110px)}
  .heroMeta{font-size:14px}
  .countWindow{height:44px}.countValue{font-size:40px}
  .heroChip{padding:8px 12px}
  .venueStaticSection{height:100svh;min-height:0}
  .venueStaticContent{height:100%;padding-top:30px;padding-bottom:26px}
  .venueStaticHead{top:30px}
  .venueStaticHead h2{font-size:44px}
  .venueStandaloneCard{top:50%;min-height:126px;padding:17px 20px}
  .venueStandaloneIcon{width:56px;height:56px;border-radius:18px}
  .venueStaticIdentity{bottom:46px;gap:15px}
  .venueStaticPin{width:52px;height:52px;flex-basis:52px;border-radius:17px}
  .venueStaticPinGlyph{width:26px;height:26px}
  .venueStaticIdentity h3{font-size:30px}
  .venueStaticNav{bottom:40px}
  .venueLockHint{bottom:8px}
}

@media(max-height:560px) and (min-width:820px){
  .heroChips{display:none}
  .heroContent{gap:10px;padding-bottom:22px}
  .introCenter{transform:scale(.86);transform-origin:center}
  .venueStaticHead p{margin-bottom:4px}.venueStaticHead h2{font-size:38px}
  .venueStandaloneCard{top:49%;min-height:108px;padding:13px 16px}
  .venueStandaloneIcon{width:48px;height:48px}.venueIconSvg{width:23px;height:23px}
  .venueStandaloneCopy h4{font-size:15px}.venueStandaloneCopy p{font-size:8px}.venueMicroLabel{display:none}
  .venueStaticIdentity{bottom:34px}.venueStaticNav{bottom:31px}.venueLockHint{display:none}
}

@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}.heroBg{transform:none!important}}

/* === VIEWPORT OWNERSHIP FIX FOR FIGMA MAKE / RESIZABLE PREVIEW FRAMES ===
   The component must own the full preview viewport. Figma Make can otherwise keep the
   React root at its previous intrinsic width while the frame itself becomes wider. */
html,body,#root{
  width:100%!important;
  min-width:0!important;
  max-width:none!important;
  margin:0!important;
  padding:0!important;
  background:${dark}!important;
  overflow-x:hidden!important;
}
body,#root{display:block!important}
#root>.partyRoot{width:var(--party-viewport-width,100vw)!important;min-width:var(--party-viewport-width,100vw)!important;max-width:none!important}
.partyRoot{
  width:var(--party-viewport-width,100vw)!important;
  min-width:var(--party-viewport-width,100vw)!important;
  max-width:none!important;
  inline-size:var(--party-viewport-width,100vw)!important;
  margin:0!important;
  overflow-x:clip!important;
}
.partyRoot>.hero,.partyRoot>.section,.partyRoot>.venueStaticSection,.partyRoot>.partyFooter{width:100%!important;max-width:none!important}
.heroContent,.shell,.venueStaticContent,.footerInner{max-width:100%}
@supports(width:100dvw){
  .partyRoot{width:var(--party-viewport-width,100dvw)!important;min-width:var(--party-viewport-width,100dvw)!important;inline-size:var(--party-viewport-width,100dvw)!important}
}

/* === UNIVERSAL FLUID DIMENSION FIX ===
   These rules intentionally come last. Layouts react to the AVAILABLE width rather than one
   assumed phone/tablet size, and the venue keeps the same vertical step interaction everywhere. */
.section,.partyFooter{padding-inline:clamp(16px,4vw,48px)}
.shell{width:min(1182px,100%);margin-inline:auto}
.sectionHead,.contestTop,.closingGrid,.reservePanelTop,.reservePanelActions{min-width:0}
.sectionHead h2,.contestCopy h2,.rulesPanel h2{font-size:clamp(34px,4.6vw,58px);text-wrap:balance}
.sectionSide{max-width:min(100%,420px)}

/* Content-driven grids: no special 1300px/1024px geometry assumptions. */
.lineupGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:clamp(14px,1.7vw,20px);overflow:visible;padding:0;margin:0}
.artistCard{width:100%;max-width:none;min-width:0}
.artistImage{height:clamp(205px,20vw,255px)}
.artistBody h3{overflow-wrap:normal;word-break:normal;hyphens:none}
.artistGenre,.artistTime{overflow-wrap:break-word;word-break:normal}
.ticketGrid{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(14px,1.7vw,20px)}
.ticketCard:last-child{grid-column:auto;width:auto;max-width:none;justify-self:stretch}
.prizeGrid{grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(12px,1.5vw,18px)}
.closingGrid{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,4vw,48px)}
.afterCard,.rulesPanel{width:100%;max-width:none}

/* Venue: exactly one viewport on ALL devices. The image stays static because the page is locked
   at this section while wheel / vertical touch gestures advance cards. */
.venueStaticSection{height:100svh;min-height:0;max-height:none;touch-action:pan-y}
.venueLocked{touch-action:none;overscroll-behavior:none}
.venueStaticContent{height:100%;min-height:0}

@media(max-width:819px){
  /* One artist per horizontal ROW on phones: image left, content right. No tiny columns or carousel. */
  .lineupGrid{display:grid;grid-template-columns:1fr;gap:14px;overflow:visible;padding:0;margin:0;scroll-snap-type:none}
  .artistCard{display:grid;grid-template-columns:clamp(118px,36vw,170px) minmax(0,1fr);min-height:180px;border-radius:18px;overflow:hidden}
  .artistImage{height:100%;min-height:180px}
  .artistBody{padding:18px 16px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
  .artistBody h3{font-size:clamp(24px,7vw,34px);line-height:1.02;margin:0 0 7px;white-space:normal}
  .artistGenre{font-size:11px;line-height:1.45;margin:0 0 12px}
  .artistTime{font-size:10px;line-height:1.4;width:100%;margin-top:auto}
  .artistTag{top:11px;inset-inline-start:11px;font-size:9px;padding:4px 8px}

  .venueStaticSection{height:100svh;min-height:0}
  .venueStaticContent{height:100%;min-height:0;padding:clamp(26px,5.5svh,44px) clamp(16px,5vw,24px) clamp(24px,4svh,38px)}
  .venueStaticHead{position:absolute;top:clamp(25px,5svh,44px);inset-inline-start:clamp(16px,5vw,24px)}
  .venueStaticHead h2{font-size:clamp(34px,9vw,50px)}
  .venueStandaloneCard{top:46%;width:calc(100% - clamp(32px,10vw,48px));min-height:clamp(124px,20svh,150px);padding:clamp(14px,4vw,19px);gap:clamp(11px,3vw,16px);grid-template-columns:auto minmax(0,1fr)}
  .venueStandaloneCard.cardFromRight{right:clamp(16px,5vw,24px)}
  .venueStandaloneCard.cardFromLeft{left:clamp(16px,5vw,24px)}
  .venueStandaloneIcon{width:clamp(48px,14vw,58px);height:clamp(48px,14vw,58px);border-radius:17px}
  .venueIconSvg{width:clamp(23px,6vw,27px);height:clamp(23px,6vw,27px)}
  .venueStandaloneCopy h4{font-size:clamp(13px,3.7vw,17px);line-height:1.4}
  .venueStandaloneNumber{display:none}
  .venuePartyLight{top:46%;width:130vw;height:clamp(210px,38svh,300px)}
  .venueStaticIdentity{inset-inline-start:clamp(16px,5vw,24px);inset-inline-end:clamp(16px,5vw,24px);left:auto;right:auto;bottom:clamp(62px,9svh,88px);max-width:none;gap:12px}
  .rtl .venueStaticIdentity{left:auto;right:auto}
  .venueStaticPin{width:clamp(46px,13vw,54px);height:clamp(46px,13vw,54px);flex-basis:clamp(46px,13vw,54px);border-radius:16px}
  .venueStaticPinGlyph{width:clamp(24px,6.7vw,28px);height:clamp(24px,6.7vw,28px)}
  .venueStaticIdentity h3{font-size:clamp(21px,6vw,29px);line-height:1.03}
  .venueStaticIdentity p{font-size:7px;margin-bottom:3px}
  .venueStaticIdentity span{font-size:7px;margin-top:4px}
  .venueStaticNav{inset-inline-start:clamp(16px,5vw,24px);inset-inline-end:clamp(16px,5vw,24px);left:auto;right:auto;bottom:clamp(28px,4svh,40px);justify-content:center}
  .venueLockHint{bottom:8px;font-size:6px;letter-spacing:.16em}
  .venueStaticSection + .section{padding-top:clamp(36px,6vw,52px)}
}

@media(max-width:520px){
  .section{padding-block:clamp(40px,10vw,50px)}
  .artistCard{grid-template-columns:clamp(112px,38vw,150px) minmax(0,1fr);min-height:166px}
  .artistImage{min-height:166px}
  .artistBody{padding:15px 13px}
  .artistBody h3{font-size:clamp(22px,7.2vw,29px)}
  .artistGenre{font-size:10px}
  .ticketGrid,.prizeGrid,.closingGrid{grid-template-columns:1fr}
  .prizeCard{padding:19px 15px}
  .reserveTierSummary{width:100%}
  .venueStandaloneCard{top:45%;}
  .venuePartyLight{top:45%}
}

@media(max-width:380px){
  .section,.partyFooter{padding-inline:14px}
  .artistCard{grid-template-columns:108px minmax(0,1fr);min-height:156px}
  .artistImage{min-height:156px}
  .artistBody{padding:13px 11px}
  .artistBody h3{font-size:21px}
  .artistGenre{font-size:9px}
  .artistTime{font-size:9px}
  .venueStaticContent{padding-inline:14px}
  .venueStaticHead{inset-inline-start:14px}
  .venueStandaloneCard{width:calc(100% - 28px);padding:13px 11px;gap:9px}
  .venueStandaloneCard.cardFromRight{right:14px}.venueStandaloneCard.cardFromLeft{left:14px}
  .venueStaticIdentity{inset-inline-start:14px;inset-inline-end:14px}
  .venueStaticNav{inset-inline-start:14px;inset-inline-end:14px}
}

/* Landscape phones / unusually short resized windows: keep every important venue control visible. */
@media(max-height:560px) and (max-width:819px){
  .venueStaticContent{padding-top:18px;padding-bottom:16px}
  .venueStaticHead{top:16px}.venueStaticHead p{margin-bottom:2px}.venueStaticHead h2{font-size:30px}
  .venueStandaloneCard{top:47%;min-height:100px;padding:10px 13px}
  .venueStandaloneIcon{width:42px;height:42px}.venueIconSvg{width:21px;height:21px}
  .venueMicroLabel{display:none}.venueStandaloneCopy p{font-size:7px;margin-bottom:3px}.venueStandaloneCopy h4{font-size:12px}
  .venuePartyLight{top:47%;height:170px}
  .venueStaticIdentity{bottom:38px}.venueStaticPin{width:40px;height:40px;flex-basis:40px}.venueStaticPinGlyph{width:21px;height:21px}.venueStaticIdentity h3{font-size:18px}
  .venueStaticNav{bottom:20px}.venueLockHint{display:none}
}

`;
