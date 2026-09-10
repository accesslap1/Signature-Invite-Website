import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
const img1 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%203/hero.webp";
const img2 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%203/grand-palais.webp";
import img3 from "@/imports/Frame52/9e31a0e9ae441eafb41f0326c9e4d915838d2e34.png";
import img4 from "@/imports/Frame52/c1e75502a39e9deaa98d73dd483de7ba4cdec0ec.png";
import img5 from "@/imports/Frame52/c66452c1e5eb78370e3a1bf29214505657de1f4a.png";
import img6 from "@/imports/Frame52/fbb0c0433be41ad2d6a1bf2ba9e33bb85e5f83da.png";

const GOLD = "#c9a227";
const GOLD_LIGHT = "#ead77e";
const BLACK = "#050409";
const INK = "#0c0a11";
const CHARCOAL = "#17131c";
const CREAM = "#f5f0e8";
const MUTED = "#b8b0a6";

const PROGRAMME = [
  { no: "I", time: "6:00", meridiem: "PM", title: "Champagne Reception", venue: "Grand Ballroom Foyer", note: "Black Tie" },
  { no: "II", time: "7:00", meridiem: "PM", title: "Wedding Ceremony", venue: "Grand Ballroom", note: "The vows" },
  { no: "III", time: "7:45", meridiem: "PM", title: "Cocktail Hour", venue: "Terrace Magnifique", note: "Champagne & canapés" },
  { no: "IV", time: "9:00", meridiem: "PM", title: "Banquet Dinner", venue: "Grand Ballroom", note: "Four acts at the table" },
  { no: "V", time: "10:30", meridiem: "PM", title: "Jazz Orchestra & Dancing", venue: "Ballroom Floor", note: "Until the countdown" },
  { no: "VI", time: "12:00", meridiem: "AM", title: "Midnight Champagne Toast", venue: "Rooftop Terrace", note: "Hello, 2027" },
];

const MENU_COURSES = [
  { no: "01", course: "Amuse-Bouche", items: ["Caviar on blini · crème fraîche", "Oyster · champagne mignonette"] },
  { no: "02", course: "First Course", items: ["Roasted beet & endive", "Truffle velouté · brioche"] },
  { no: "03", course: "Main Course", items: ["Filet mignon · bordelaise", "Sole meunière · capers & lemon", "Wild mushroom risotto · V"] },
  { no: "04", course: "Dessert", items: ["Baked Alaska · tableside", "Petit fours selection"] },
];

const JAZZ_LINEUP = [
  { set: "Reception", act: "The Velvet Trio", genre: "Swing & Standards", time: "18:00" },
  { set: "Dinner", act: "Isabella Voss Quartet", genre: "Jazz Ballads", time: "21:00" },
  { set: "Dancing", act: "The Gatsby Orchestra", genre: "Big Band · Charleston", time: "22:30" },
  { set: "Late Night", act: "DJ Marcel Rousseau", genre: "Art Deco Remix", time: "00:15" },
];

const DRESS_CODE = [
  { label: "Gentlemen", rule: "Black or white tuxedo · black bow tie · polished evening shoes" },
  { label: "Ladies", rule: "Floor-length gown or refined cocktail · beading, satin and feathers welcome" },
  { label: "A small note", rule: "Please leave ivory and white to the bride." },
];

function Diamond({ size = 18, hollow = false }: { size?: number; hollow?: boolean }) {
  const half = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <rect
        x={half}
        y={1}
        width={size * 0.56}
        height={size * 0.56}
        transform={`rotate(45 ${half} ${half})`}
        fill={hollow ? "none" : GOLD}
        stroke={GOLD}
        strokeWidth={hollow ? 1 : 0}
      />
    </svg>
  );
}

function DecoRule({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`decoRule ${compact ? "decoRuleCompact" : ""}`} aria-hidden="true">
      <span />
      <i />
      <b />
      <i />
      <span />
    </div>
  );
}

function Corner({ style }: { style?: CSSProperties }) {
  return (
    <svg className="corner" viewBox="0 0 130 130" style={style} aria-hidden="true">
      <path d="M2 128V2h126" fill="none" stroke={GOLD} strokeWidth="1" />
      <path d="M14 116V14h102" fill="none" stroke={GOLD} strokeWidth=".55" opacity=".52" />
      <path d="M2 2l42 42M14 14l30 30" fill="none" stroke={GOLD} strokeWidth=".65" opacity=".6" />
      <path d="M44 44l16-16 16 16-16 16z" fill="none" stroke={GOLD} strokeWidth=".8" />
      <circle cx="2" cy="2" r="4" fill={GOLD} />
    </svg>
  );
}

function Fan({ className = "" }: { className?: string }) {
  return (
    <svg className={`fan ${className}`} viewBox="0 0 260 140" aria-hidden="true">
      <path d="M8 132A122 122 0 0 1 252 132" fill="none" stroke={GOLD} strokeWidth="1" opacity=".22" />
      <path d="M34 132A96 96 0 0 1 226 132" fill="none" stroke={GOLD} strokeWidth="1" opacity=".28" />
      <path d="M63 132A67 67 0 0 1 197 132" fill="none" stroke={GOLD} strokeWidth="1" opacity=".38" />
      {[18, 42, 66, 90, 114, 138, 162].map((x, i) => (
        <line key={x} x1="130" y1="132" x2={x} y2={i % 2 ? 36 : 55} stroke={GOLD} strokeWidth=".8" opacity=".35" />
      ))}
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "revealOn" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Countdown({ target }: { target: Date }) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const blocks = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Minutes" },
    { v: t.s, l: "Seconds" },
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {blocks.map(({ v, l }) => (
        <div className="countBlock" key={l}>
          <strong>{String(v).padStart(2, "0")}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`sectionHeading ${align === "center" ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="sectionCopy">{copy}</p> : null}
    </div>
  );
}

function MidnightWish() {
  const [wished, setWished] = useState(false);
  const particles = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);

  return (
    <section className={`midnight ${wished ? "wishActive" : ""}`}>
      <div className="midnightBurst" aria-hidden="true" />
      <div className="midnightParticles" aria-hidden="true">
        {particles.map((i) => <i key={i} style={{ "--i": i } as CSSProperties} />)}
      </div>
      <Reveal className="midnightInner">
        <p className="eyebrow">At the stroke of midnight</p>
        <div className="midnightTime">12:00</div>
        <h2>One kiss. One toast.<br />One new year.</h2>
        <p>Meet us on the rooftop terrace as Paris turns gold and 2027 begins.</p>
        <button type="button" className="outlineButton" onClick={() => setWished((v) => !v)}>
          {wished ? "Wish made ✦" : "Make a midnight wish"}
        </button>
      </Reveal>
    </section>
  );
}

export default function ArtDecoTemplate() {
  const [meal, setMeal] = useState("");
  const [rsvp, setRsvp] = useState<"yes" | "no" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const weddingDate = useMemo(() => new Date("2026-12-31T18:00:00"), []);

  useEffect(() => {
    const syncViewport = () => {
      const width = Math.max(1, Math.round(window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth));
      setViewportWidth(width);
      document.documentElement.style.setProperty("--deco-viewport-width", `${width}px`);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    window.visualViewport?.addEventListener("resize", syncViewport);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncViewport) : null;
    observer?.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("resize", syncViewport);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = () => {
    setError("");
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please add your name and email before sending your response.");
      return;
    }
    if (!rsvp) {
      setError("Please tell us whether you will be joining us.");
      return;
    }
    if (rsvp === "yes" && !meal) {
      setError("Please choose a dinner selection.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="decoRoot"
      style={{
        width: viewportWidth ? `${viewportWidth}px` : "100vw",
        minWidth: viewportWidth ? `${viewportWidth}px` : "100vw",
        maxWidth: "none",
        margin: 0,
        position: "relative",
        alignSelf: "stretch",
        flex: "1 1 auto",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:${BLACK}}
        button,input,textarea{font:inherit}
        button{cursor:pointer}
        .decoRoot{--gold:${GOLD};--cream:${CREAM};--black:${BLACK};--charcoal:${CHARCOAL};font-family:'Outfit',sans-serif;background:${BLACK};color:${CREAM};overflow:hidden}
        .decoRoot img{display:block;max-width:100%}
        .decoRoot section,.decoRoot footer{position:relative}
        .scrollProgress{position:fixed;z-index:80;top:0;left:0;height:2px;background:linear-gradient(90deg,${GOLD},${GOLD_LIGHT});transform-origin:left center;box-shadow:0 0 16px rgba(201,162,39,.55);pointer-events:none}
        .shell{width:min(1180px,100%);margin-inline:auto}
        .sectionPad{padding:clamp(78px,9vw,132px) clamp(20px,5vw,64px)}
        .eyebrow{margin:0 0 16px;color:${GOLD};font-size:11px;line-height:1.2;text-transform:uppercase;letter-spacing:.46em;font-weight:600}
        .sectionHeading{max-width:720px}
        .sectionHeading.centered{margin-inline:auto;text-align:center}
        .sectionHeading h2{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6vw,82px);font-weight:600;line-height:.92;letter-spacing:-.035em;margin:0;color:${CREAM};text-wrap:balance}
        .sectionCopy{color:${MUTED};font-size:clamp(15px,1.45vw,18px);line-height:1.75;margin:24px 0 0;max-width:650px}
        .centered .sectionCopy{margin-inline:auto}
        .reveal{opacity:0;transform:translateY(28px);transition:opacity .85s cubic-bezier(.2,.7,.2,1),transform .85s cubic-bezier(.2,.7,.2,1)}
        .revealOn{opacity:1;transform:none}
        .decoRule{display:flex;align-items:center;gap:10px;width:min(620px,100%);margin:0 auto;height:30px}
        .decoRule span{height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(201,162,39,.72))}
        .decoRule span:last-child{background:linear-gradient(90deg,rgba(201,162,39,.72),transparent)}
        .decoRule i{width:12px;height:12px;border:1px solid ${GOLD};transform:rotate(45deg)}
        .decoRule b{width:7px;height:7px;background:${GOLD};transform:rotate(45deg)}
        .decoRuleCompact{width:210px;height:20px;gap:7px}
        .decoRuleCompact i{width:8px;height:8px}.decoRuleCompact b{width:5px;height:5px}

        .hero{min-height:100svh;display:flex;align-items:center;justify-content:center;background:${BLACK};isolation:isolate;padding:clamp(42px,5vw,72px) clamp(18px,4vw,58px);overflow:hidden}
        .heroMedia{position:absolute;inset:0;z-index:-4}
        .heroMedia img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1);opacity:.38;transform:scale(1.035)}
        .heroMedia:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 38%,rgba(5,4,9,.16),rgba(5,4,9,.72) 55%,${BLACK} 100%),linear-gradient(180deg,rgba(5,4,9,.62),rgba(5,4,9,.2) 48%,${BLACK} 100%)}
        .heroSunburst{position:absolute;z-index:-3;left:50%;top:50%;width:min(1050px,94vw);aspect-ratio:1;transform:translate(-50%,-50%);opacity:.16;background:repeating-conic-gradient(from 0deg,rgba(201,162,39,.38) 0deg .7deg,transparent .7deg 10deg);mask-image:radial-gradient(circle,black 0 46%,transparent 74%)}
        .heroFrame{position:absolute;inset:clamp(14px,2.6vw,34px);border:1px solid rgba(201,162,39,.44);pointer-events:none}
        .heroFrame:before{content:'';position:absolute;inset:8px;border:1px solid rgba(201,162,39,.16)}
        .corner{position:absolute;width:clamp(66px,8vw,128px);height:auto;pointer-events:none;opacity:.72}
        .c1{top:clamp(18px,3vw,40px);left:clamp(18px,3vw,40px)}
        .c2{top:clamp(18px,3vw,40px);right:clamp(18px,3vw,40px);transform:rotate(90deg)}
        .c3{bottom:clamp(18px,3vw,40px);left:clamp(18px,3vw,40px);transform:rotate(270deg)}
        .c4{bottom:clamp(18px,3vw,40px);right:clamp(18px,3vw,40px);transform:rotate(180deg)}
        .heroInner{position:relative;z-index:2;width:min(1060px,100%);text-align:center;padding:clamp(50px,7vh,84px) clamp(14px,3vw,44px)}
        .heroMonogram{width:70px;height:70px;margin:0 auto 28px;border:1px solid rgba(201,162,39,.66);transform:rotate(45deg);display:grid;place-items:center;background:rgba(5,4,9,.35)}
        .heroMonogram span{transform:rotate(-45deg);font-family:'Cormorant Garamond',serif;font-size:18px;color:${GOLD_LIGHT};letter-spacing:.08em}
        .heroKicker{font-size:11px;letter-spacing:.62em;text-transform:uppercase;color:${GOLD};margin:0 0 22px}
        .hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(64px,12vw,154px);font-weight:600;line-height:.72;letter-spacing:-.055em;margin:0;color:${CREAM};text-shadow:0 16px 46px rgba(0,0,0,.48)}
        .hero h1 .amp{display:block;font-style:italic;font-weight:400;font-size:.54em;line-height:.95;color:${GOLD_LIGHT};margin:.08em 0}
        .heroDate{font-family:'Cormorant Garamond',serif;font-size:clamp(19px,2vw,28px);font-style:italic;margin:26px 0 6px;color:${CREAM}}
        .heroPlace{font-size:10px;text-transform:uppercase;letter-spacing:.45em;color:rgba(245,240,232,.55);margin:0 0 32px}
        .countdown{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:min(620px,100%);margin:32px auto 0;border-top:1px solid rgba(201,162,39,.28);border-bottom:1px solid rgba(201,162,39,.28)}
        .countBlock{padding:17px 10px 15px;position:relative}
        .countBlock:not(:last-child):after{content:'';position:absolute;right:0;top:18%;height:64%;width:1px;background:rgba(201,162,39,.22)}
        .countBlock strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,48px);font-weight:500;line-height:1;color:${GOLD_LIGHT};font-variant-numeric:tabular-nums}
        .countBlock span{display:block;margin-top:5px;font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,240,232,.46)}
        .scrollCue{position:absolute;left:50%;bottom:clamp(26px,4vw,42px);transform:translateX(-50%);display:flex;align-items:center;gap:9px;font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:rgba(245,240,232,.38)}
        .scrollCue i{width:38px;height:1px;background:${GOLD};animation:pulseLine 1.8s ease-in-out infinite}
        @keyframes pulseLine{0%,100%{transform:scaleX(.35);opacity:.35}50%{transform:scaleX(1);opacity:1}}

        .invitation{background:${CREAM};color:${INK};overflow:hidden}
        .invitationGrid{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(46px,8vw,120px);align-items:center}
        .inviteDateBlock{position:relative;min-height:410px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(5,4,9,.16);background:#ece5da}
        .inviteDateBlock:before,.inviteDateBlock:after{content:'';position:absolute;inset:12px;border:1px solid rgba(201,162,39,.45)}
        .inviteDateBlock:after{inset:24px;border-color:rgba(5,4,9,.08)}
        .inviteDateInner{position:relative;z-index:2;text-align:center}
        .inviteDay{font-family:'Cormorant Garamond',serif;font-size:clamp(86px,11vw,142px);line-height:.74;font-weight:500;color:${INK}}
        .inviteMonth{font-size:10px;letter-spacing:.55em;text-transform:uppercase;color:#7c6d57;margin-top:18px}
        .inviteYear{font-family:'Cormorant Garamond',serif;font-size:28px;font-style:italic;color:${GOLD};margin-top:8px}
        .inviteCopy .eyebrow{color:#8d6d18}
        .inviteCopy h2{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,6vw,74px);font-weight:600;line-height:.96;letter-spacing:-.035em;margin:0;color:${INK}}
        .inviteCopy .families{font-family:'Cormorant Garamond',serif;font-size:clamp(19px,2.2vw,25px);font-style:italic;line-height:1.7;color:#4c4550;margin:26px 0 0}
        .inviteMeta{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:30px;padding-top:24px;border-top:1px solid rgba(5,4,9,.12)}
        .inviteMeta span{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6e665d}

        .programme{background:${BLACK}}
        .programmeIntro{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.72fr);gap:50px;align-items:end;margin-bottom:54px}
        .programmeIntro .sideCopy{font-family:'Cormorant Garamond',serif;font-size:clamp(20px,2.3vw,29px);font-style:italic;color:rgba(245,240,232,.58);line-height:1.45;margin:0 0 7px}
        .programmeList{border-top:1px solid rgba(201,162,39,.28)}
        .programmeRow{display:grid;grid-template-columns:62px minmax(110px,.55fr) minmax(0,1.15fr) minmax(140px,.75fr);gap:22px;align-items:center;padding:24px 0;border-bottom:1px solid rgba(201,162,39,.16);transition:background .3s ease,padding .3s ease}
        .programmeRow:hover{background:rgba(201,162,39,.045);padding-inline:18px}
        .programmeNo{font-family:'Cormorant Garamond',serif;font-size:20px;color:${GOLD}}
        .programmeTime strong{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3vw,40px);font-weight:500;color:${CREAM};font-variant-numeric:tabular-nums}
        .programmeTime span{font-size:8px;letter-spacing:.22em;color:rgba(201,162,39,.75);margin-left:7px}
        .programmeTitle{font-family:'Cormorant Garamond',serif;font-size:clamp(23px,2.6vw,34px);font-weight:500;line-height:1;color:${CREAM}}
        .programmeVenue{font-size:12px;color:rgba(245,240,232,.45);margin-top:5px}
        .programmeNote{text-align:right;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(201,162,39,.6)}

        .venue{background:${CHARCOAL};padding:clamp(20px,2.4vw,34px)}
        .venueFrame{min-height:min(820px,88svh);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(340px,.85fr);border:1px solid rgba(201,162,39,.28);overflow:hidden}
        .venuePhoto{position:relative;min-height:600px}
        .venuePhoto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(.25) contrast(1.05)}
        .venuePhoto:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,4,9,.08),rgba(5,4,9,.22)),linear-gradient(0deg,rgba(5,4,9,.65),transparent 50%)}
        .venueStamp{position:absolute;z-index:2;left:clamp(22px,4vw,56px);bottom:clamp(24px,4vw,52px);border-left:2px solid ${GOLD};padding-left:18px}
        .venueStamp strong{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(34px,4vw,58px);font-weight:500;color:${CREAM}}
        .venueStamp span{font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:${GOLD_LIGHT}}
        .venueCopy{display:flex;flex-direction:column;justify-content:center;padding:clamp(44px,6vw,78px);background:${INK};position:relative;overflow:hidden}
        .venueCopy .fan{position:absolute;right:-30px;top:15px;width:260px;opacity:.28}
        .venueCopy h2{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,5vw,78px);font-weight:600;line-height:.88;margin:0;color:${CREAM}}
        .venueAddress{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;color:${GOLD_LIGHT};margin:18px 0 28px}
        .venueCopy>p:not(.eyebrow):not(.venueAddress){font-size:14px;line-height:1.8;color:rgba(245,240,232,.62);margin:0}
        .venueFacts{margin-top:36px;border-top:1px solid rgba(201,162,39,.2)}
        .venueFact{display:grid;grid-template-columns:34px 1fr;gap:12px;padding:15px 0;border-bottom:1px solid rgba(201,162,39,.12);font-size:12px;color:rgba(245,240,232,.58)}
        .venueFact b{color:${GOLD};font-weight:500}

        .banquet{background:#efe7dc;color:${INK};overflow:hidden}
        .banquet .eyebrow{color:#8d6d18}
        .banquetTop{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(44px,8vw,100px);align-items:end}
        .banquet h2{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,6vw,86px);font-weight:600;line-height:.88;letter-spacing:-.04em;margin:0;color:${INK}}
        .banquetQuote{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.6vw,31px);font-style:italic;line-height:1.45;color:#5f554a;margin:0}
        .banquetGrid{margin-top:54px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid rgba(5,4,9,.18);border-bottom:1px solid rgba(5,4,9,.18)}
        .course{padding:28px 26px;min-height:248px;position:relative}
        .course:not(:last-child){border-right:1px solid rgba(5,4,9,.14)}
        .courseNo{font-size:9px;letter-spacing:.25em;color:#8d6d18}
        .course h3{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;margin:24px 0 20px;color:${INK}}
        .course li{list-style:none;font-size:12px;line-height:1.65;color:#655d55;margin:0 0 9px}
        .course ul{margin:0;padding:0}
        .banquetPhoto{margin-top:48px;height:clamp(320px,38vw,520px);position:relative;overflow:hidden}
        .banquetPhoto img{width:100%;height:100%;object-fit:cover;filter:grayscale(.4) sepia(.08)}
        .banquetPhoto:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(239,231,220,.88),transparent 28%,transparent 72%,rgba(239,231,220,.75))}
        .banquetPhotoText{position:absolute;z-index:2;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:30px}
        .banquetPhotoText span{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,86px);font-style:italic;color:${CREAM};text-shadow:0 6px 30px rgba(0,0,0,.65)}

        .music{background:${CHARCOAL}}
        .musicGrid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(42px,7vw,96px);align-items:center}
        .musicPhoto{position:relative;min-height:620px;border:1px solid rgba(201,162,39,.26);padding:12px}
        .musicPhotoInner{position:absolute;inset:12px;overflow:hidden}
        .musicPhoto img{width:100%;height:100%;object-fit:cover;filter:grayscale(.65) contrast(1.12) sepia(.16)}
        .musicPhotoInner:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,4,9,.72),transparent 55%)}
        .musicLabel{position:absolute;z-index:3;left:32px;bottom:32px}
        .musicLabel small{display:block;font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:${GOLD}}
        .musicLabel strong{display:block;font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:500;color:${CREAM};margin-top:6px}
        .lineup{margin-top:34px;border-top:1px solid rgba(201,162,39,.2)}
        .lineupRow{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:18px;align-items:center;padding:17px 0;border-bottom:1px solid rgba(201,162,39,.14)}
        .lineupTime{font-family:'Cormorant Garamond',serif;font-size:21px;color:${GOLD_LIGHT};font-variant-numeric:tabular-nums}
        .lineupAct{font-family:'Cormorant Garamond',serif;font-size:24px;color:${CREAM}}
        .lineupGenre{font-size:10px;color:rgba(245,240,232,.42);margin-top:2px}
        .lineupSet{font-size:8px;text-transform:uppercase;letter-spacing:.22em;color:rgba(201,162,39,.62);text-align:right}

        .midnight{min-height:min(900px,100svh);background:${BLACK};display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;isolation:isolate;padding:90px 22px}
        .midnightBurst{position:absolute;z-index:-2;width:min(1000px,110vw);aspect-ratio:1;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(201,162,39,.25) 0deg .8deg,transparent .8deg 8deg);mask-image:radial-gradient(circle,black 0 24%,transparent 68%);opacity:.34;animation:slowSpin 45s linear infinite}
        @keyframes slowSpin{to{transform:rotate(360deg)}}
        .midnightInner{max-width:880px;position:relative;z-index:2}
        .midnightTime{font-family:'Cormorant Garamond',serif;font-size:clamp(105px,20vw,250px);line-height:.72;letter-spacing:-.06em;color:${GOLD_LIGHT};text-shadow:0 0 50px rgba(201,162,39,.15)}
        .midnight h2{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6vw,80px);font-weight:500;line-height:.92;margin:34px 0 20px;color:${CREAM}}
        .midnight p:not(.eyebrow){max-width:560px;margin:0 auto;color:rgba(245,240,232,.52);font-size:15px;line-height:1.7}
        .outlineButton{margin-top:32px;border:1px solid rgba(201,162,39,.55);background:transparent;color:${GOLD_LIGHT};padding:15px 24px;text-transform:uppercase;letter-spacing:.22em;font-size:9px;transition:background .25s ease,color .25s ease,transform .25s ease}
        .outlineButton:hover{background:${GOLD};color:${BLACK};transform:translateY(-2px)}
        .midnightParticles{position:absolute;inset:0;pointer-events:none;z-index:-1}
        .midnightParticles i{--angle:calc(var(--i) * 12.857deg);position:absolute;left:50%;top:48%;width:5px;height:5px;background:${GOLD_LIGHT};opacity:0;transform:rotate(var(--angle)) translateY(0);transition:opacity .2s}
        .wishActive .midnightParticles i{animation:burst 1.4s cubic-bezier(.12,.8,.2,1) forwards;animation-delay:calc(var(--i) * 11ms)}
        @keyframes burst{0%{opacity:0;transform:rotate(var(--angle)) translateY(0) scale(.2)}15%{opacity:1}100%{opacity:0;transform:rotate(var(--angle)) translateY(-42vmin) scale(1.2)}}

        .attire{background:#ede5d8;color:${INK}}
        .attire .eyebrow{color:#8d6d18}
        .attireGrid{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:clamp(46px,8vw,110px);align-items:center}
        .attire h2{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,6vw,82px);font-weight:600;line-height:.9;letter-spacing:-.04em;margin:0;color:${INK}}
        .attireIntro{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(22px,2.4vw,29px);line-height:1.5;color:#5c5145;margin:22px 0 30px}
        .attireRule{padding:18px 0;border-top:1px solid rgba(5,4,9,.13);display:grid;grid-template-columns:110px minmax(0,1fr);gap:20px}
        .attireRule:last-child{border-bottom:1px solid rgba(5,4,9,.13)}
        .attireRule b{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#8d6d18}
        .attireRule span{font-size:12px;line-height:1.55;color:#5f5851}
        .attirePhotos{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:14px;height:600px}
        .attirePhoto{overflow:hidden;position:relative;background:#d6ccbd}
        .attirePhoto:first-child{margin-top:74px}
        .attirePhoto:last-child{margin-bottom:74px}
        .attirePhoto img{width:100%;height:100%;object-fit:cover;filter:grayscale(.12) sepia(.06);transition:transform .8s cubic-bezier(.2,.7,.2,1)}
        .attirePhoto:hover img{transform:scale(1.04)}
        .attireStamp{position:absolute;right:18px;bottom:18px;width:70px;height:70px;border:1px solid rgba(245,240,232,.7);border-radius:50%;display:grid;place-items:center;text-align:center;color:${CREAM};font-size:7px;line-height:1.4;letter-spacing:.12em;text-transform:uppercase;background:rgba(5,4,9,.26);transform:rotate(-8deg)}

        .rsvp{background:${INK}}
        .rsvpGrid{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.05fr);gap:clamp(50px,9vw,130px);align-items:start}
        .rsvpIntro{position:sticky;top:70px}
        .rsvpIntro h2{font-family:'Cormorant Garamond',serif;font-size:clamp(64px,8vw,112px);font-weight:500;line-height:.75;margin:0;color:${CREAM}}
        .rsvpIntro p:not(.eyebrow){font-family:'Cormorant Garamond',serif;font-size:21px;font-style:italic;color:rgba(245,240,232,.54);line-height:1.55;margin:30px 0 0;max-width:370px}
        .rsvpDeadline{margin-top:38px;padding-top:20px;border-top:1px solid rgba(201,162,39,.22);font-size:9px!important;font-family:'Outfit',sans-serif!important;font-style:normal!important;text-transform:uppercase;letter-spacing:.24em;color:${GOLD}!important}
        .rsvpForm{border:1px solid rgba(201,162,39,.24);padding:clamp(24px,4vw,46px);position:relative;background:rgba(201,162,39,.025)}
        .rsvpForm:before{content:'';position:absolute;inset:8px;border:1px solid rgba(201,162,39,.1);pointer-events:none}
        .formGrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .field{margin-bottom:18px}
        .field label{display:block;margin:0 0 9px;color:rgba(201,162,39,.78);font-size:8px;letter-spacing:.22em;text-transform:uppercase}
        .field input,.field textarea{width:100%;border:0;border-bottom:1px solid rgba(201,162,39,.32);background:transparent;color:${CREAM};padding:12px 2px;outline:none;border-radius:0;transition:border-color .2s}
        .field input:focus,.field textarea:focus{border-color:${GOLD_LIGHT}}
        .attendance{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .choiceButton{border:1px solid rgba(201,162,39,.28);background:transparent;color:rgba(245,240,232,.68);padding:13px 12px;font-size:10px;letter-spacing:.08em;transition:.2s ease}
        .choiceButton.selected{background:${GOLD};color:${BLACK};border-color:${GOLD}}
        .mealChoices{display:grid;gap:8px}
        .mealButton{text-align:left;border:1px solid rgba(201,162,39,.2);background:rgba(201,162,39,.03);color:rgba(245,240,232,.66);padding:13px 14px;font-size:12px;transition:.2s}
        .mealButton.selected{border-color:${GOLD};background:rgba(201,162,39,.13);color:${GOLD_LIGHT}}
        .submitButton{width:100%;margin-top:8px;border:0;background:${GOLD};color:${BLACK};padding:16px 18px;text-transform:uppercase;letter-spacing:.26em;font-size:9px;font-weight:600;transition:transform .2s ease,background .2s ease}
        .submitButton:hover{transform:translateY(-2px);background:${GOLD_LIGHT}}
        .formError{color:#e0a39b;font-size:11px;line-height:1.5;margin:14px 0 0}
        .success{text-align:center;padding:clamp(48px,8vw,90px) 20px}
        .success h3{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,5vw,68px);font-weight:500;margin:22px 0 10px;color:${CREAM}}
        .success p{color:rgba(245,240,232,.52);font-size:13px}

        .footer{background:${BLACK};padding:74px 24px 52px;text-align:center;border-top:1px solid rgba(201,162,39,.12)}
        .footerMark{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,5vw,70px);font-weight:500;color:${CREAM};margin:22px 0 4px}
        .footer p{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(201,162,39,.52);margin:0}
        .footerYear{margin-top:34px!important;color:rgba(245,240,232,.18)!important;letter-spacing:.55em!important}

        @media(max-width:940px){
          .invitationGrid,.programmeIntro,.musicGrid,.attireGrid,.rsvpGrid{grid-template-columns:1fr}
          .inviteDateBlock{min-height:330px}
          .programmeIntro{gap:24px}
          .programmeIntro .sideCopy{max-width:560px}
          .venueFrame{grid-template-columns:1fr;min-height:0}
          .venuePhoto{min-height:520px}
          .venueCopy{padding:clamp(42px,7vw,70px)}
          .banquetTop{grid-template-columns:1fr;gap:22px}
          .banquetGrid{grid-template-columns:1fr 1fr}
          .course:nth-child(2){border-right:0}.course:nth-child(-n+2){border-bottom:1px solid rgba(5,4,9,.14)}
          .musicPhoto{min-height:520px}
          .attirePhotos{height:520px}
          .rsvpIntro{position:relative;top:auto}.rsvpIntro p:not(.eyebrow){max-width:620px}
        }
        @media(max-width:720px){
          .sectionPad{padding:72px clamp(18px,5vw,30px)}
          .hero{padding-inline:16px}
          .heroFrame{inset:10px}.heroFrame:before{inset:6px}
          .corner{width:62px;opacity:.5}.c1,.c2{top:14px}.c3,.c4{bottom:14px}.c1,.c3{left:14px}.c2,.c4{right:14px}
          .heroInner{padding-inline:8px}
          .heroMonogram{width:58px;height:58px;margin-bottom:24px}
          .heroKicker{letter-spacing:.42em}
          .heroPlace{letter-spacing:.28em}
          .countBlock{padding-inline:4px}.countBlock span{letter-spacing:.16em;font-size:7px}
          .programmeRow{grid-template-columns:44px 92px minmax(0,1fr);gap:12px;padding:19px 0}
          .programmeNote{display:none}
          .programmeTime strong{font-size:26px}.programmeTitle{font-size:23px}
          .venue{padding:12px}.venuePhoto{min-height:420px}.venueStamp strong{font-size:34px}
          .banquetGrid{grid-template-columns:1fr}.course{border-right:0!important;border-bottom:1px solid rgba(5,4,9,.14)!important;min-height:0;padding:24px 4px}.course:last-child{border-bottom:0!important}
          .banquetPhoto{height:360px}.banquetPhoto:after{background:linear-gradient(0deg,rgba(5,4,9,.28),transparent)}
          .musicPhoto{min-height:420px}.musicLabel{left:24px;bottom:24px}.musicLabel strong{font-size:34px}
          .lineupRow{grid-template-columns:60px 1fr}.lineupSet{display:none}
          .attirePhotos{height:440px}.attirePhoto:first-child{margin-top:52px}.attirePhoto:last-child{margin-bottom:52px}
          .attireRule{grid-template-columns:90px 1fr}
          .formGrid{grid-template-columns:1fr}.attendance{grid-template-columns:1fr}
        }
        @media(max-width:460px){
          .hero h1{font-size:clamp(58px,19vw,88px)}
          .heroDate{font-size:18px}.heroPlace{font-size:8px}
          .countdown{margin-top:24px}.countBlock strong{font-size:27px}
          .inviteDateBlock{min-height:280px}.inviteDay{font-size:92px}
          .programmeRow{grid-template-columns:34px 78px 1fr}.programmeNo{font-size:16px}.programmeTime strong{font-size:22px}.programmeTime span{display:block;margin:1px 0 0}.programmeTitle{font-size:20px}.programmeVenue{font-size:10px}
          .venuePhoto{min-height:340px}.venueCopy{padding:42px 24px}.venueCopy .fan{width:190px}.venueCopy h2{font-size:52px}
          .midnight{min-height:780px}.midnightTime{font-size:118px}.midnight h2{font-size:46px}
          .attirePhotos{height:360px;gap:8px}.attirePhoto:first-child{margin-top:36px}.attirePhoto:last-child{margin-bottom:36px}
          .rsvpForm{padding:30px 20px}.rsvpForm:before{inset:6px}
        }
        @media(max-height:620px) and (min-width:700px){
          .hero{min-height:760px}
          .hero h1{font-size:96px}
          .heroInner{padding-block:50px}
          .scrollCue{display:none}
        }
        @media(prefers-reduced-motion:reduce){
          html{scroll-behavior:auto}.reveal{opacity:1;transform:none;transition:none}.midnightBurst{animation:none}.scrollCue i{animation:none}.wishActive .midnightParticles i{animation:none}
        }
      `}</style>

      <div className="scrollProgress" style={{ width: `${progress * 100}%` }} />

      <section className="hero">
        <div className="heroMedia"><img src={img1} alt="" /></div>
        <div className="heroSunburst" aria-hidden="true" />
        <div className="heroFrame" aria-hidden="true" />
        <div className="c1"><Corner /></div>
        <div className="c2"><Corner /></div>
        <div className="c3"><Corner /></div>
        <div className="c4"><Corner /></div>

        <div className="heroInner">
          <Reveal>
            <div className="heroMonogram"><span>V·E</span></div>
            <p className="heroKicker">The marriage of</p>
            <h1>
              Victoria
              <span className="amp">&amp;</span>
              Edward
            </h1>
            <p className="heroDate">New Year&apos;s Eve · 31 December 2026</p>
            <p className="heroPlace">Le Grand Palais · Paris, France</p>
            <DecoRule compact />
            <Countdown target={weddingDate} />
          </Reveal>
        </div>
        <div className="scrollCue"><i />Scroll into the evening<i /></div>
      </section>

      <section className="invitation sectionPad">
        <div className="shell invitationGrid">
          <Reveal>
            <div className="inviteDateBlock">
              <div className="inviteDateInner">
                <div className="inviteDay">31</div>
                <div className="inviteMonth">December</div>
                <div className="inviteYear">MMXXVI</div>
              </div>
            </div>
          </Reveal>
          <Reveal className="inviteCopy" delay={120}>
            <p className="eyebrow">Together with their families</p>
            <h2>The honour of your presence is requested.</h2>
            <p className="families">
              Lord &amp; Lady Ashford and Monsieur &amp; Madame Leclerc cordially invite you to witness the union of their children, Victoria and Edward.
            </p>
            <div className="inviteMeta">
              <span>Champagne · 18:00</span>
              <span>Ceremony · 19:00</span>
              <span>Black Tie Required</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="programme sectionPad">
        <div className="shell">
          <Reveal className="programmeIntro">
            <SectionHeading eyebrow="The evening" title="One night. Six chapters." copy="From the first glass of champagne to the first minutes of a new year, the evening unfolds one moment at a time." />
            <p className="sideCopy">“Paris is always a good idea. On New Year&apos;s Eve, it is irresistible.”</p>
          </Reveal>
          <div className="programmeList">
            {PROGRAMME.map((p, i) => (
              <Reveal key={p.no} delay={i * 45}>
                <div className="programmeRow">
                  <div className="programmeNo">{p.no}</div>
                  <div className="programmeTime"><strong>{p.time}</strong><span>{p.meridiem}</span></div>
                  <div>
                    <div className="programmeTitle">{p.title}</div>
                    <div className="programmeVenue">{p.venue}</div>
                  </div>
                  <div className="programmeNote">{p.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="venue">
        <div className="venueFrame">
          <Reveal className="venuePhoto">
            <img src={img2} alt="Grand Palais in Paris" />
            <div className="venueStamp">
              <strong>Paris VIII</strong>
              <span>48.8661° N · 2.3125° E</span>
            </div>
          </Reveal>
          <Reveal className="venueCopy" delay={120}>
            <Fan />
            <p className="eyebrow">The venue</p>
            <h2>Le Grand Palais</h2>
            <p className="venueAddress">3 Avenue du Général Eisenhower · Paris</p>
            <p>Built for the 1900 World&apos;s Fair, its monumental glass nave and gilded ironwork become our ballroom for one winter night.</p>
            <div className="venueFacts">
              <div className="venueFact"><b>01</b><span>Champs-Élysées–Clemenceau · Lines 1 &amp; 13</span></div>
              <div className="venueFact"><b>02</b><span>Valet parking on Avenue du Général Eisenhower</span></div>
              <div className="venueFact"><b>03</b><span>Hôtel de Crillon room block · VICTORIA26</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="banquet sectionPad">
        <div className="shell">
          <Reveal className="banquetTop">
            <div>
              <p className="eyebrow">The banquet</p>
              <h2>Four acts<br />at the table.</h2>
            </div>
            <p className="banquetQuote">French classics, a little theatre, and champagne poured all the way to midnight.</p>
          </Reveal>

          <div className="banquetGrid">
            {MENU_COURSES.map((course, i) => (
              <Reveal className="course" key={course.course} delay={i * 65}>
                <div className="courseNo">COURSE {course.no}</div>
                <h3>{course.course}</h3>
                <ul>{course.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="banquetPhoto">
            <img src={img3} alt="Wedding banquet" />
            <div className="banquetPhotoText"><span>Champagne until midnight.</span></div>
          </Reveal>
        </div>
      </section>

      <section className="music sectionPad">
        <div className="shell musicGrid">
          <Reveal className="musicPhoto">
            <div className="musicPhotoInner"><img src={img4} alt="Jazz musicians" /></div>
            <div className="musicLabel"><small>Live from Paris</small><strong>After Dark</strong></div>
          </Reveal>

          <Reveal delay={100}>
            <SectionHeading eyebrow="Entertainment" title="A ballroom with a pulse." copy="Jazz begins with the first glass and grows into a full orchestra by the time the dance floor opens." />
            <div className="lineup">
              {JAZZ_LINEUP.map((j) => (
                <div className="lineupRow" key={j.set}>
                  <div className="lineupTime">{j.time}</div>
                  <div><div className="lineupAct">{j.act}</div><div className="lineupGenre">{j.genre}</div></div>
                  <div className="lineupSet">{j.set}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <MidnightWish />

      <section className="attire sectionPad">
        <div className="shell attireGrid">
          <Reveal>
            <p className="eyebrow">The black tie edit</p>
            <h2>Dress for<br />the last night<br />of the year.</h2>
            <p className="attireIntro">Old-world glamour, sharp tailoring and just enough sparkle to catch the chandeliers.</p>
            <div>
              {DRESS_CODE.map((d) => (
                <div className="attireRule" key={d.label}><b>{d.label}</b><span>{d.rule}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal className="attirePhotos" delay={120}>
            <div className="attirePhoto"><img src={img5} alt="Black tie wedding inspiration" /></div>
            <div className="attirePhoto"><img src={img6} alt="Evening attire inspiration" /><div className="attireStamp">Paris<br />31·12·26<br />Black Tie</div></div>
          </Reveal>
        </div>
      </section>

      <section className="rsvp sectionPad">
        <div className="shell rsvpGrid">
          <Reveal className="rsvpIntro">
            <p className="eyebrow">Your response</p>
            <h2>RSVP</h2>
            <p>We would be delighted to begin the new year with you.</p>
            <p className="rsvpDeadline">Kindly reply by 1 November 2026</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="rsvpForm">
              {submitted ? (
                <div className="success">
                  <Diamond size={22} />
                  <h3>{rsvp === "yes" ? "Until New Year’s Eve." : "With our warmest thanks."}</h3>
                  <p>{rsvp === "yes" ? "Your place is reserved. We will see you beneath the glass roof of the Grand Palais." : "Your response has been received with gratitude."}</p>
                </div>
              ) : (
                <>
                  <div className="formGrid">
                    <div className="field"><label>First name</label><input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                    <div className="field"><label>Last name</label><input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                  </div>
                  <div className="field"><label>Email address</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <div className="field">
                    <label>Attendance</label>
                    <div className="attendance">
                      <button type="button" className={`choiceButton ${rsvp === "yes" ? "selected" : ""}`} onClick={() => setRsvp("yes")}>Joyfully accepts</button>
                      <button type="button" className={`choiceButton ${rsvp === "no" ? "selected" : ""}`} onClick={() => setRsvp("no")}>Regretfully declines</button>
                    </div>
                  </div>
                  {rsvp === "yes" ? (
                    <>
                      <div className="field">
                        <label>Dinner selection</label>
                        <div className="mealChoices">
                          {["Filet Mignon", "Sole Meunière", "Wild Mushroom Risotto · V"].map((m) => (
                            <button type="button" key={m} className={`mealButton ${meal === m ? "selected" : ""}`} onClick={() => setMeal(m)}>{m}</button>
                          ))}
                        </div>
                      </div>
                      <div className="field"><label>Dietary notes</label><textarea rows={3} placeholder="Allergies or dietary restrictions…" /></div>
                    </>
                  ) : null}
                  <button type="button" className="submitButton" onClick={submit}>Send response</button>
                  {error ? <p className="formError">{error}</p> : null}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <DecoRule compact />
        <div className="footerMark">Victoria &amp; Edward</div>
        <p>31 December 2026 · Le Grand Palais · Paris</p>
        <p className="footerYear">MMXXVI → MMXXVII</p>
      </footer>
    </div>
  );
}
