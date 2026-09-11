import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const weddingPhoto1 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/hero-bouquet.webp";
const weddingPhoto2 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/couple-sunset.webp";
const weddingPhoto3 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/wedding-rings.webp";
const weddingPhoto4 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/rose-bouquet-ring.webp";
const weddingPhoto5 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/couple-heart-hands.webp";
const weddingPhoto6 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/couple-holding-hands.webp";
const weddingPhoto7 = "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/attire-bloom.webp";

const FOREST = "#123d2e";
const DEEP = "#09271e";
const SAGE = "#dce9e1";
const SAND = "#f6efe5";
const CREAM = "#fffaf3";
const CORAL = "#d9785c";
const GOLD = "#c7a45c";
const INK = "#183128";
const MUTED = "#65796e";

type Language = "en" | "fr" | "ar";

const TRANSLATIONS: Record<Exclude<Language, "en">, Record<string, string>> = {
  fr: {
    "Open invitation": "Ouvrir l’invitation", "Wedding soundtrack": "Musique du mariage", "Now playing": "Lecture en cours",
    "A destination wedding by the sea": "Un mariage au bord de la mer", "November · Tulum · 2026": "Novembre · Tulum · 2026",
    "Saturday": "Samedi", "Palmera Garden · Tulum, Mexico": "Palmera Garden · Tulum, Mexique", "Until we say": "Avant de dire", "I do": "Oui",
    "Scroll": "Découvrir", "November 20—22": "20—22 novembre", "One long weekend,": "Un long week-end,", "five memories.": "cinq souvenirs.",
    "A relaxed three-day celebration shaped around the sea, the jungle, and the people we love most. Join all of it, or simply meet us at sunset.": "Trois jours de fête décontractée entre la mer, la jungle et ceux que nous aimons le plus. Partagez tout le week-end avec nous, ou rejoignez-nous simplement au coucher du soleil.",
    "Snorkeling": "Plongée avec tuba", "Fri · 09:00": "Ven · 09:00", "Crystal Bay reef tour — gear provided": "Découverte du récif de Crystal Bay — équipement fourni",
    "Sunset Cocktails": "Cocktails au coucher du soleil", "Fri · 18:00": "Ven · 18:00", "Villa Estrella rooftop · welcome drinks": "Toit-terrasse de Villa Estrella · verre de bienvenue",
    "Jungle & Waterfall": "Jungle et cascade", "Sat · 08:00": "Sam · 08:00", "Guided 4 km trail — bring good shoes": "Randonnée guidée de 4 km — prévoyez de bonnes chaussures",
    "Ceremony & Reception": "Cérémonie et réception", "Sat · 17:00": "Sam · 17:00", "Beach ceremony · Palmera Garden reception": "Cérémonie sur la plage · réception à Palmera Garden",
    "Farewell Cruise": "Croisière d’adieu", "Sun · 11:00": "Dim · 11:00", "Island hop · lunch served on board": "Tour des îles · déjeuner servi à bord",
    "A few frames from us": "Quelques images de nous", "Postcards from": "Cartes postales du", "paradise.": "paradis.",
    "Golden hour": "Heure dorée", "Hand in hand, all the way": "Main dans la main, pour toujours", "The details": "Les détails", "Two rings, one promise": "Deux alliances, une promesse",
    "Soft white": "Blanc délicat", "Flowers for the quiet moments": "Des fleurs pour les instants paisibles", "Us": "Nous", "A small shape with a big meaning": "Une petite forme, un grand symbole",
    "Together": "Ensemble", "The easiest yes": "Le oui le plus évident", "In bloom": "En fleurs", "A little color before sunset": "Un peu de couleur avant le coucher du soleil",
    "Six little glimpses of the place that keeps pulling us back.": "Six aperçus de ce lieu qui nous rappelle toujours.", "Travel note · 001": "Carnet de voyage · 001",
    "Your route": "Votre route", "to the coast.": "vers la côte.", "Transfer": "Transfert", "90 min · complimentary shuttle Fri—Sun": "90 min · navette offerte du ven au dim",
    "Arrival": "Arrivée", "Friday before 4:00 PM": "Vendredi avant 16 h", "Forecast": "Météo", "27°C / 80°F · light breeze": "27°C / 80°F · légère brise", "Airport": "Aéroport", "Cancún International": "Aéroport international de Cancún",
    "Stay close": "Restez près de nous", "Three places to": "Trois lieux où", "call home.": "vous sentir chez vous.",
    "We reserved room blocks at three price points. Book before October 1 to keep the group rate.": "Nous avons réservé des chambres dans trois gammes de prix. Réservez avant le 1er octobre pour profiter du tarif de groupe.",
    "Booking note · ": "Note de réservation · ", "Couple's pick": "Choix des mariés", "Mid-range": "Milieu de gamme", "Budget": "Économique", "Mention the wedding": "Mentionnez le mariage", "/ night": "/ nuit",
    "sunset": "coucher du soleil", "ceremony": "cérémonie", "Saturday · The ceremony": "Samedi · La cérémonie", "Barefoot at": "Pieds nus à", "golden hour.": "l’heure dorée.",
    "Guest Arrival": "Arrivée des invités", "Palmera Garden · beachfront seating": "Palmera Garden · places face à la plage", "Barefoot on the sand · 30 minutes": "Pieds nus sur le sable · 30 minutes",
    "Cocktail Hour": "Cocktail", "Garden terrace · fresh-squeezed welcome drinks": "Terrasse du jardin · boissons fraîches de bienvenue", "Reception Dinner": "Dîner de réception", "Open-air pavilion · live marimba band": "Pavillon en plein air · groupe de marimba",
    "Dancing & Bonfire": "Danse et feu de joie", "Beach stage · until midnight": "Scène sur la plage · jusqu’à minuit", "Our story": "Notre histoire", "Met in Mexico.": "Rencontrés au Mexique.", "Married in Mexico.": "Mariés au Mexique.",
    "We found each other on a crowded beach in Tulum three years ago. Coming back to say “I do” in the place we fell in love is the only thing that ever made sense.": "Nous nous sommes rencontrés sur une plage animée de Tulum il y a trois ans. Revenir nous dire oui à l’endroit où nous sommes tombés amoureux était une évidence.",
    "— Sofia, on the proposal": "— Sofia, à propos de la demande", "Dress code · Sea to Sunset": "Tenue · De la mer au coucher du soleil", "Dress for the coast.": "Habillez-vous pour la côte.", "Stay for the stars.": "Restez pour les étoiles.",
    "Think resort elegance without the stiffness — light fabrics, sun-washed color, and something you can still dance in when the shoes come off.": "Imaginez l’élégance d’un resort sans rigidité — tissus légers, couleurs baignées de soleil et une tenue qui permet encore de danser une fois les chaussures retirées.",
    "Coastal Formal": "Élégance côtière", "Linen tailoring · flowing dresses · polished silhouettes that still breathe": "Costumes en lin · robes fluides · silhouettes soignées et légères", "Sun-Washed Color": "Couleurs du soleil", "Sand · shell · sage · sea glass · soft coral · touches of sunset": "Sable · coquillage · sauge · verre de mer · corail doux · touches de coucher du soleil",
    "Made for the Sand": "Pensé pour le sable", "Ceremony-ready first · easy shoes or barefoot dancing once the sun goes down": "Élégant pour la cérémonie · chaussures confortables ou danse pieds nus après le coucher du soleil", "A little color direction": "Quelques indications de couleurs", "Shell": "Coquillage", "Sea glass": "Verre de mer", "Sunset": "Coucher du soleil",
    "One small request — please leave white and ivory to the couple.": "Une petite demande — merci de réserver le blanc et l’ivoire aux mariés.", "RSVP · Before October 1": "RSVP · Avant le 1er octobre", "Will you meet us": "Nous rejoindrez-vous", "in paradise?": "au paradis ?",
    "Your response helps us finalize shuttles, weekend plans, and room blocks. We hope the answer is yes.": "Votre réponse nous aide à finaliser les navettes, le programme et les chambres. Nous espérons que vous serez des nôtres.", "“We cannot wait to celebrate with you.”": "« Nous avons hâte de célébrer avec vous. »",
    "See you in Tulum.": "Rendez-vous à Tulum.", "Thank you for letting us know.": "Merci de nous avoir prévenus.", "Your place is saved. We will share the final weekend details closer to the date.": "Votre place est réservée. Nous partagerons les derniers détails du week-end à l’approche de la date.", "We will miss you, and we are grateful you took a moment to respond.": "Vous nous manquerez, et nous vous remercions d’avoir pris le temps de répondre.",
    "Your full name": "Votre nom complet", "Email address": "Adresse e-mail", "Will you be joining us?": "Serez-vous parmi nous ?", "Joyfully, yes": "Avec joie, oui", "Regretfully, no": "Malheureusement, non", "Weekend activities": "Activités du week-end",
    "Friday Snorkeling": "Plongée du vendredi", "Jungle Hike": "Randonnée dans la jungle", "A note for us · optional": "Un mot pour nous · facultatif", "Anything we should know?": "Souhaitez-vous nous préciser quelque chose ?", "Send RSVP": "Envoyer la réponse",
    "Please add your name, email, and attendance response.": "Veuillez indiquer votre nom, votre e-mail et votre réponse.", "Questions?": "Des questions ?", "Made for one very warm weekend.": "Créé pour un week-end inoubliable.",
    "days": "jours", "hours": "heures", "minutes": "minutes", "seconds": "secondes", "Music volume": "Volume de la musique", "Mute music": "Couper la musique", "Unmute music": "Activer la musique", "Language": "Langue"
  },
  ar: {
    "Open invitation": "افتح الدعوة", "Wedding soundtrack": "موسيقى الزفاف", "Now playing": "قيد التشغيل", "A destination wedding by the sea": "حفل زفاف على شاطئ البحر", "November · Tulum · 2026": "نوفمبر · تولوم · 2026",
    "Saturday": "السبت", "Palmera Garden · Tulum, Mexico": "حديقة بالميرا · تولوم، المكسيك", "Until we say": "حتى نقول", "I do": "نعم", "Scroll": "اكتشف", "November 20—22": "20—22 نوفمبر", "One long weekend,": "عطلة أسبوع طويلة،", "five memories.": "وخمس ذكريات.",
    "A relaxed three-day celebration shaped around the sea, the jungle, and the people we love most. Join all of it, or simply meet us at sunset.": "احتفال هادئ لثلاثة أيام بين البحر والغابة والأشخاص الأقرب إلى قلوبنا. شاركونا كل اللحظات أو التقوا بنا عند الغروب.",
    "Snorkeling": "الغطس", "Fri · 09:00": "الجمعة · 09:00", "Crystal Bay reef tour — gear provided": "جولة في شعاب كريستال باي — المعدات متوفرة", "Sunset Cocktails": "مشروبات الغروب", "Fri · 18:00": "الجمعة · 18:00", "Villa Estrella rooftop · welcome drinks": "سطح فيلا إستريلا · مشروبات ترحيبية",
    "Jungle & Waterfall": "الغابة والشلال", "Sat · 08:00": "السبت · 08:00", "Guided 4 km trail — bring good shoes": "مسار بصحبة مرشد لمسافة 4 كم — أحضروا أحذية مناسبة", "Ceremony & Reception": "المراسم والاستقبال", "Sat · 17:00": "السبت · 17:00", "Beach ceremony · Palmera Garden reception": "مراسم على الشاطئ · استقبال في حديقة بالميرا", "Farewell Cruise": "رحلة الوداع", "Sun · 11:00": "الأحد · 11:00", "Island hop · lunch served on board": "جولة بين الجزر · الغداء على متن القارب",
    "A few frames from us": "بعض الصور منا", "Postcards from": "بطاقات من", "paradise.": "الجنة.", "Golden hour": "الساعة الذهبية", "Hand in hand, all the way": "يداً بيد، دائماً", "The details": "التفاصيل", "Two rings, one promise": "خاتمان ووعد واحد", "Soft white": "أبيض ناعم", "Flowers for the quiet moments": "زهور للحظات الهادئة", "Us": "نحن", "A small shape with a big meaning": "شكل صغير بمعنى كبير", "Together": "معاً", "The easiest yes": "أسهل نعم", "In bloom": "في الإزهار", "A little color before sunset": "قليل من اللون قبل الغروب",
    "Six little glimpses of the place that keeps pulling us back.": "ست لمحات صغيرة من المكان الذي يعيدنا إليه دائماً.", "Travel note · 001": "ملاحظة سفر · 001", "Your route": "طريقكم", "to the coast.": "إلى الساحل.", "Transfer": "التوصيل", "90 min · complimentary shuttle Fri—Sun": "90 دقيقة · حافلة مجانية من الجمعة إلى الأحد", "Arrival": "الوصول", "Friday before 4:00 PM": "الجمعة قبل الساعة 4:00 مساءً", "Forecast": "الطقس", "27°C / 80°F · light breeze": "27°م / 80°ف · نسيم خفيف", "Airport": "المطار", "Cancún International": "مطار كانكون الدولي",
    "Stay close": "ابقوا بالقرب منا", "Three places to": "ثلاثة أماكن", "call home.": "تشعرون فيها كأنكم في البيت.", "We reserved room blocks at three price points. Book before October 1 to keep the group rate.": "حجزنا غرفاً ضمن ثلاث فئات سعرية. احجزوا قبل 1 أكتوبر للاستفادة من سعر المجموعة.", "Booking note · ": "ملاحظة الحجز · ", "Couple's pick": "اختيار العروسين", "Mid-range": "متوسط", "Budget": "اقتصادي", "Mention the wedding": "اذكروا حفل الزفاف", "/ night": "/ ليلة",
    "sunset": "الغروب", "ceremony": "المراسم", "Saturday · The ceremony": "السبت · المراسم", "Barefoot at": "حفاة عند", "golden hour.": "الساعة الذهبية.", "Guest Arrival": "وصول الضيوف", "Palmera Garden · beachfront seating": "حديقة بالميرا · مقاعد أمام الشاطئ", "Ceremony": "المراسم", "Barefoot on the sand · 30 minutes": "حفاة على الرمل · 30 دقيقة", "Cocktail Hour": "ساعة المشروبات", "Garden terrace · fresh-squeezed welcome drinks": "شرفة الحديقة · مشروبات ترحيبية طازجة", "Reception Dinner": "عشاء الاستقبال", "Open-air pavilion · live marimba band": "جناح مفتوح · فرقة ماريمبا مباشرة", "Dancing & Bonfire": "الرقص ونار المخيم", "Beach stage · until midnight": "منصة الشاطئ · حتى منتصف الليل",
    "Our story": "قصتنا", "Met in Mexico.": "التقينا في المكسيك.", "Married in Mexico.": "وتزوجنا في المكسيك.", "We found each other on a crowded beach in Tulum three years ago. Coming back to say “I do” in the place we fell in love is the only thing that ever made sense.": "التقينا على شاطئ مزدحم في تولوم قبل ثلاث سنوات. وكان الرجوع لنقول نعم في المكان الذي أحببنا فيه بعضنا هو الخيار الطبيعي الوحيد.", "— Sofia, on the proposal": "— صوفيا، عن طلب الزواج",
    "Dress code · Sea to Sunset": "اللباس · من البحر إلى الغروب", "Dress for the coast.": "ارتدوا ما يناسب الساحل.", "Stay for the stars.": "وابقوا من أجل النجوم.", "Think resort elegance without the stiffness — light fabrics, sun-washed color, and something you can still dance in when the shoes come off.": "أناقة المنتجعات من دون تكلّف — أقمشة خفيفة وألوان شمسية وملابس مريحة للرقص بعد خلع الأحذية.", "Coastal Formal": "أناقة ساحلية", "Linen tailoring · flowing dresses · polished silhouettes that still breathe": "بدلات كتانية · فساتين انسيابية · إطلالات أنيقة وخفيفة", "Sun-Washed Color": "ألوان مشمسة", "Sand · shell · sage · sea glass · soft coral · touches of sunset": "رملي · صدفي · أخضر مريمي · زجاج البحر · مرجاني ناعم · لمسات الغروب", "Made for the Sand": "مصمم للرمال", "Ceremony-ready first · easy shoes or barefoot dancing once the sun goes down": "ملائم للمراسم · أحذية مريحة أو رقص حفاة بعد الغروب", "A little color direction": "دليل ألوان بسيط", "Shell": "صدفي", "Sand": "رملي", "Sage": "أخضر مريمي", "Sea glass": "زجاج البحر", "Sunset": "غروب", "One small request — please leave white and ivory to the couple.": "طلب صغير — يرجى ترك الأبيض والعاجي للعروسين.",
    "RSVP · Before October 1": "تأكيد الحضور · قبل 1 أكتوبر", "Will you meet us": "هل ستنضمون إلينا", "in paradise?": "في الجنة؟", "Your response helps us finalize shuttles, weekend plans, and room blocks. We hope the answer is yes.": "يساعدنا ردكم في إتمام ترتيبات النقل وبرنامج العطلة وحجوزات الغرف. نتمنى أن تكون الإجابة نعم.", "“We cannot wait to celebrate with you.”": "«لا يسعنا الانتظار للاحتفال معكم.»", "See you in Tulum.": "نراكم في تولوم.", "Thank you for letting us know.": "شكراً لإبلاغنا.", "Your place is saved. We will share the final weekend details closer to the date.": "تم حفظ مكانكم. سنشارك التفاصيل النهائية مع اقتراب الموعد.", "We will miss you, and we are grateful you took a moment to respond.": "سنفتقدكم، ونشكركم على تخصيص وقت للرد.",
    "Your full name": "الاسم الكامل", "Email address": "البريد الإلكتروني", "Will you be joining us?": "هل ستنضمون إلينا؟", "Joyfully, yes": "بكل فرح، نعم", "Regretfully, no": "للأسف، لا", "Weekend activities": "أنشطة عطلة نهاية الأسبوع", "Friday Snorkeling": "غطس الجمعة", "Jungle Hike": "نزهة الغابة", "A note for us · optional": "ملاحظة لنا · اختيارية", "Anything we should know?": "هل هناك شيء تودون إخبارنا به؟", "Send RSVP": "إرسال الرد", "Please add your name, email, and attendance response.": "يرجى إدخال الاسم والبريد الإلكتروني ورد الحضور.", "Questions?": "أسئلة؟", "Made for one very warm weekend.": "صُمم لعطلة مليئة بالدفء.", "days": "أيام", "hours": "ساعات", "minutes": "دقائق", "seconds": "ثوانٍ", "Music volume": "مستوى صوت الموسيقى", "Mute music": "كتم الموسيقى", "Unmute music": "تشغيل الموسيقى", "Language": "اللغة"
  }
};

const translate = (value: string, lang: Language) => {
  if (lang === "en") return value;
  const dictionary = TRANSLATIONS[lang];
  if (dictionary[value]) return dictionary[value];
  return Object.entries(dictionary).reduce(
    (result, [source, translated]) => source.length > 2 ? result.split(source).join(translated) : result,
    value,
  );
};

const WEDDING_VIDEO =
  "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/Intro%20video.mp4";
const WEDDING_VIDEO_MOBILE =
  "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/Video%20Header%20Mobile.mp4";
const WEDDING_MUSIC =
  "https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%202/Marry%20You_spotdown.org.mp3";

const ACTIVITIES = [
  { no: "01", title: "Snorkeling", time: "Fri · 09:00", desc: "Crystal Bay reef tour — gear provided" },
  { no: "02", title: "Sunset Cocktails", time: "Fri · 18:00", desc: "Villa Estrella rooftop · welcome drinks" },
  { no: "03", title: "Jungle & Waterfall", time: "Sat · 08:00", desc: "Guided 4 km trail — bring good shoes" },
  { no: "04", title: "Ceremony & Reception", time: "Sat · 17:00", desc: "Beach ceremony · Palmera Garden reception" },
  { no: "05", title: "Farewell Cruise", time: "Sun · 11:00", desc: "Island hop · lunch served on board" },
];

const HOTELS = [
  { name: "Villa Estrella", tier: "Couple's pick", rate: "$290 / night", note: "SOFIA&MARCO" },
  { name: "Paloma Beach Resort", tier: "Mid-range", rate: "$185 / night", note: "SOFMAR26" },
  { name: "Coconut Palms Hostel", tier: "Budget", rate: "$55 / night", note: "Mention the wedding" },
];

const ATTIRE = [
  { no: "I", label: "Coastal Formal", desc: "Linen tailoring · flowing dresses · polished silhouettes that still breathe" },
  { no: "II", label: "Sun-Washed Color", desc: "Sand · shell · sage · sea glass · soft coral · touches of sunset" },
  { no: "III", label: "Made for the Sand", desc: "Ceremony-ready first · easy shoes or barefoot dancing once the sun goes down" },
];

const CEREMONY = [
  { time: "4:30", suffix: "PM", event: "Guest Arrival", detail: "Palmera Garden · beachfront seating" },
  { time: "5:00", suffix: "PM", event: "Ceremony", detail: "Barefoot on the sand · 30 minutes" },
  { time: "5:45", suffix: "PM", event: "Cocktail Hour", detail: "Garden terrace · fresh-squeezed welcome drinks" },
  { time: "7:00", suffix: "PM", event: "Reception Dinner", detail: "Open-air pavilion · live marimba band" },
  { time: "10:00", suffix: "PM", event: "Dancing & Bonfire", detail: "Beach stage · until midnight" },
];

const POSTCARDS = [
  { src: weddingPhoto2, kicker: "Golden hour", caption: "Hand in hand, all the way" },
  { src: weddingPhoto3, kicker: "The details", caption: "Two rings, one promise" },
  { src: weddingPhoto4, kicker: "Soft white", caption: "Flowers for the quiet moments" },
  { src: weddingPhoto5, kicker: "Us", caption: "A small shape with a big meaning" },
  { src: weddingPhoto6, kicker: "Together", caption: "The easiest yes" },
  { src: weddingPhoto7, kicker: "In bloom", caption: "A little color before sunset" },
];


function BotanicalMark({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 180 220" style={style} aria-hidden="true">
      <path d="M92 205 C88 150 92 98 96 32" fill="none" stroke="currentColor" strokeWidth="2" opacity=".38" />
      <path d="M96 74 C69 54 45 58 29 77 C56 82 78 84 96 74Z" fill="currentColor" opacity=".16" />
      <path d="M94 104 C124 82 149 86 163 107 C135 111 113 114 94 104Z" fill="currentColor" opacity=".16" />
      <path d="M92 137 C61 115 35 122 20 146 C52 148 73 150 92 137Z" fill="currentColor" opacity=".14" />
      <path d="M93 166 C122 145 148 151 160 174 C132 174 111 177 93 166Z" fill="currentColor" opacity=".14" />
      <circle cx="97" cy="33" r="5" fill="currentColor" opacity=".32" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4 10v4h4l5 4V6L8 10H4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      {muted ? (
        <path d="M17 9l4 6M21 9l-4 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      ) : (
        <path d="M16 9.5c1.6 1.4 1.6 3.6 0 5M18.7 7.2c3 2.8 3 6.8 0 9.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      )}
    </svg>
  );
}

function Countdown({ target }: { target: Date }) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
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
  }, [target]);

  return (
    <div className="countdownGrid">
      {[
        { v: t.d, l: "days" },
        { v: t.h, l: "hours" },
        { v: t.m, l: "minutes" },
        { v: t.s, l: "seconds" },
      ].map(({ v, l }) => (
        <div className="countdownUnit" key={l}>
          <strong>{String(v).padStart(2, "0")}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function TropicalTemplate() {
  const weddingDate = useMemo(() => new Date("2026-11-21T17:00:00"), []);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const originalTextRef = useRef<WeakMap<Text, string>>(new WeakMap());
  const originalAttributesRef = useRef<WeakMap<Element, Record<string, string>>>(new WeakMap());

  const [introState, setIntroState] = useState<"idle" | "playing" | "leaving" | "done">("idle");
  const [mobileOpening, setMobileOpening] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);
  const [audioOpen, setAudioOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("tropical-wedding-language");
    return saved === "fr" || saved === "ar" ? saved : "en";
  });
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rsvp, setRsvp] = useState<"yes" | "no" | "">("");
  const [activities, setActivities] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 640px)");
    const syncOpeningVideo = () => {
      // Keep the current source stable once the opening animation starts.
      if (introState === "idle") setMobileOpening(query.matches);
    };

    syncOpeningVideo();
    query.addEventListener?.("change", syncOpeningVideo);
    return () => query.removeEventListener?.("change", syncOpeningVideo);
  }, [introState]);

  useEffect(() => {
    const syncViewport = () => {
      const width = Math.max(1, Math.round(window.visualViewport?.width || document.documentElement.clientWidth || window.innerWidth));
      const height = Math.max(1, Math.round(window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight));

      setViewport({ width, height });
      document.documentElement.style.setProperty("--wedding-viewport-width", `${width}px`);
      document.documentElement.style.setProperty("--wedding-viewport-height", `${height}px`);
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
    if (introState === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [introState]);

  useEffect(() => {
    const storedVolume = window.localStorage.getItem("wedding-volume");
    if (storedVolume === null) return;
    const savedVolume = Number(storedVolume);
    if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1) setVolume(savedVolume);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("tropical-wedding-language", lang);

    const translateNode = (root: Node) => {
      const processText = (node: Text) => {
        const parent = node.parentElement;
        if (!parent || parent.closest("style,script,.audioDock")) return;
        const currentCore = (node.nodeValue || "").trim();
        // Never cache or rewrite live numeric values such as the countdown and volume percentage.
        if (currentCore && /^[\d\s:%./·–—-]+$/.test(currentCore)) return;
        if (!originalTextRef.current.has(node)) originalTextRef.current.set(node, node.nodeValue || "");
        const original = originalTextRef.current.get(node) || "";
        const leading = original.match(/^\s*/)?.[0] || "";
        const trailing = original.match(/\s*$/)?.[0] || "";
        const core = original.trim();
        const next = core ? `${leading}${translate(core, lang)}${trailing}` : original;
        if (node.nodeValue !== next) node.nodeValue = next;
      };

      if (root instanceof Text) processText(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode() as Text | null;
      while (node) {
        processText(node);
        node = walker.nextNode() as Text | null;
      }

      const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(document.querySelectorAll("*"));
      elements.forEach((element) => {
        const saved = originalAttributesRef.current.get(element) || {};
        ["placeholder", "aria-label", "title"].forEach((name) => {
          const current = element.getAttribute(name);
          if (current !== null && saved[name] === undefined) saved[name] = current;
          if (saved[name] !== undefined) element.setAttribute(name, translate(saved[name], lang));
        });
        originalAttributesRef.current.set(element, saved);
      });
    };

    translateNode(document.body);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(translateNode);
        if (record.type === "characterData") translateNode(record.target);
      });
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setAudioOpen(false);
        setLanguageOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeMenus);
    return () => document.removeEventListener("pointerdown", closeMenus);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
    window.localStorage.setItem("wedding-volume", String(volume));
  }, [volume, muted]);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [introState]);

  const startInvitation = async () => {
    if (introState !== "idle") return;
    setIntroState("playing");

    const video = introVideoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.muted = true;
      video.currentTime = 0;
      try {
        await video.play();
      } catch {
        setIntroState("leaving");
        window.setTimeout(() => setIntroState("done"), 800);
      }
    }

    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
      audio.loop = true;
      audio.play().catch(() => undefined);
    }
  };

  const finishIntro = () => {
    setIntroState("leaving");
    window.setTimeout(() => setIntroState("done"), 850);
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = nextMuted;
    if (!nextMuted) void audio.play().catch(() => undefined);
  };

  const changeVolume = (next: number) => {
    const safeVolume = Math.min(1, Math.max(0, next));
    setVolume(safeVolume);
    const audio = audioRef.current;
    if (audio) audio.volume = safeVolume;
    if (safeVolume > 0) {
      setMuted(false);
      if (audio) {
        audio.muted = false;
        void audio.play().catch(() => undefined);
      }
    }
  };

  const toggleActivity = (value: string) => {
    setActivities((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  };

  const submitRsvp = () => {
    if (!fullName.trim() || !email.trim() || !rsvp) {
      setFormError("Please add your name, email, and attendance response.");
      return;
    }
    setFormError("");
    setSubmitted(true);
  };

  return (
    <div
      className="weddingRoot"
      style={{
        width: viewport ? `${viewport.width}px` : "100vw",
        minWidth: viewport ? `${viewport.width}px` : "100vw",
        maxWidth: "none",
        minHeight: viewport ? `${viewport.height}px` : "100vh",
        margin: 0,
        position: "relative",
        alignSelf: "stretch",
        flex: "1 1 auto",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');

        :root{color-scheme:light}
        *{box-sizing:border-box}
        html{scroll-behavior:smooth;width:100%;max-width:none;min-width:0}
        body{margin:0;width:100%;max-width:none;min-width:0;background:${SAND};overflow-x:hidden}
        #root{width:100%;max-width:none;min-width:0}
        button,input,textarea{font:inherit}
        button{cursor:pointer}
        img,video,svg{display:block;max-width:100%}
        main,section,footer,div{min-width:0}
        .weddingRoot{width:var(--wedding-viewport-width,100vw);min-width:var(--wedding-viewport-width,100vw);max-width:none;min-height:var(--wedding-viewport-height,100vh);overflow-x:hidden;background:${SAND};color:${INK};font-family:'DM Sans',sans-serif;container-type:inline-size}
        .weddingRoot ::selection{background:${CORAL};color:#fff}
        .pageWrap{width:min(1180px,calc(100% - clamp(28px,6vw,96px)));max-width:100%;margin-inline:auto}
        .section{padding-block:clamp(76px,9vw,132px)}
        .sectionLabel{margin:0 0 14px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;font-weight:600;color:${CORAL}}
        .sectionTitle{margin:0;font-family:'Playfair Display',serif;font-size:clamp(38px,5.1vw,72px);line-height:.98;font-weight:600;letter-spacing:-.03em;color:${DEEP}}
        .sectionLead{max-width:620px;margin:20px 0 0;color:${MUTED};font-size:clamp(15px,1.25vw,18px);line-height:1.72}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .85s ease,transform .85s cubic-bezier(.2,.75,.2,1)}
        .reveal.is-visible{opacity:1;transform:none}

        .progressTrack{position:fixed;top:0;left:0;right:0;height:3px;z-index:80;background:rgba(255,255,255,.08);pointer-events:none}
        .progressBar{height:100%;transform-origin:left center;background:${CORAL};transition:transform .08s linear}

        .intro{position:fixed;top:0;left:0;width:var(--wedding-viewport-width,100vw);height:var(--wedding-viewport-height,100dvh);z-index:100;background:#000;display:grid;place-items:center;overflow:hidden;transition:opacity .85s ease,visibility .85s ease}
        .intro:before{content:'';position:absolute;z-index:5;left:0;top:0;width:63%;height:2px;background:${CORAL};opacity:.78;transition:opacity .35s ease}
        .intro.playing:before,.intro.leaving:before{opacity:0}
        .intro.leaving{opacity:0;visibility:hidden}
        .introMedia{position:absolute;z-index:0;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;background:#000;opacity:1;filter:saturate(.94) contrast(1.02);transform:scale(1);transition:filter .58s ease,transform .58s ease}
        .intro.idle .introMedia{filter:saturate(.82) contrast(.98) brightness(.78)}
        .intro.playing .introMedia,.intro.leaving .introMedia{filter:saturate(.96) contrast(1.02) brightness(1)}
        .introShade{position:absolute;z-index:1;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.30),rgba(0,0,0,.42));opacity:1;pointer-events:none;transition:opacity .45s ease}
        .intro.playing .introShade,.intro.leaving .introShade{opacity:.08}
        .introGrain{position:absolute;z-index:2;inset:0;opacity:.055;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");transition:opacity .35s ease}
        .intro.playing .introGrain{opacity:.025}
        .introPrompt{position:absolute;z-index:4;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;padding:clamp(28px,5vw,72px);background:radial-gradient(circle at 50% 44%,rgba(0,0,0,.06),transparent 34%);transition:opacity .52s ease,transform .52s cubic-bezier(.2,.75,.2,1),visibility .52s ease}
        .intro.playing .introPrompt,.intro.leaving .introPrompt{opacity:0;transform:scale(.985);visibility:hidden;pointer-events:none}
        .introMonogram{width:clamp(78px,7.2vw,104px);height:clamp(78px,7.2vw,104px);margin:0 auto clamp(30px,4.2vh,54px);border:1px solid rgba(255,255,255,.58);border-radius:999px;display:grid;place-items:center;font-family:'Playfair Display',serif;font-size:clamp(26px,2.35vw,36px);letter-spacing:.04em;background:rgba(255,255,255,.018)}
        .introPrompt h1{margin:0;font-family:'Playfair Display',serif;font-size:clamp(46px,5.3vw,82px);line-height:.98;font-weight:500;letter-spacing:-.035em;text-wrap:balance}
        .introPrompt p{margin:clamp(22px,3.2vh,34px) 0 clamp(28px,4vh,40px);font-size:clamp(10px,.9vw,13px);letter-spacing:clamp(.18em,.28vw,.32em);text-transform:uppercase;color:rgba(255,255,255,.78)}
        .introButton{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:56px;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.025);color:#fff;border-radius:999px;padding:15px clamp(22px,2.2vw,30px);font-size:clamp(10px,.82vw,12px);font-weight:600;letter-spacing:.16em;text-transform:uppercase;transition:background .25s ease,color .25s ease,transform .25s ease,border-color .25s ease}
        .introButton:hover{background:#fff;color:${DEEP};border-color:#fff;transform:translateY(-1px)}
        .introButton:focus-visible{outline:2px solid ${CORAL};outline-offset:5px}

        .audioDock{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:70;display:flex;align-items:flex-end;gap:10px;direction:ltr}
        html[dir='rtl'] .audioDock{right:auto;left:max(18px,env(safe-area-inset-left))}
        .controlWrap{position:relative;display:flex;align-items:flex-end}
        .audioPanel{position:absolute;right:0;bottom:56px;width:min(240px,calc(100vw - 36px));padding:14px;border:1px solid rgba(18,61,46,.12);border-radius:18px;background:rgba(255,250,243,.97);backdrop-filter:blur(18px);box-shadow:0 18px 45px rgba(16,44,34,.15);transform-origin:bottom right;animation:audioIn .2s ease;direction:var(--panel-direction,ltr)}
        .audioPanel[dir='rtl']{--panel-direction:rtl}
        html[dir='rtl'] .audioPanel,html[dir='rtl'] .languageMenu{right:auto;left:0;transform-origin:bottom left}
        @keyframes audioIn{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
        .audioPanelHead{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:12px;align-items:center;margin-bottom:12px;min-height:34px}
        .audioPanelTitle{min-width:0}
        .audioPanelTitle strong,.audioPanelTitle span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .audioPanelTitle strong{font-size:12px;line-height:1.35;color:${DEEP}}
        .audioPanelTitle span{margin-top:2px;font-size:9px;line-height:1.3;color:${MUTED};text-transform:uppercase;letter-spacing:.1em}
        .audioPanelValue{width:46px;text-align:right;font-variant-numeric:tabular-nums;font-size:11px;font-weight:700;color:${FOREST};white-space:nowrap}
        .audioPanel[dir='rtl'] .audioPanelValue{text-align:left}
        .volumeRow{display:grid;grid-template-columns:34px minmax(0,1fr);align-items:center;gap:10px;min-width:0}
        .volumeRow input{display:block;width:100%;min-width:0;margin:0;accent-color:${FOREST};cursor:pointer}
        .audioButton,.languageButton{height:46px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:${DEEP};color:#fff;display:grid;place-items:center;box-shadow:0 12px 30px rgba(9,39,30,.22);cursor:pointer}
        .audioButton{width:46px;flex:0 0 46px}.audioMuteButton{width:34px;height:34px;box-shadow:none}
        .languageButton{min-width:66px;padding:0 13px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:10px;font-weight:700;letter-spacing:.08em}
        .languageMenu{position:absolute;right:0;bottom:56px;width:142px;padding:6px;border:1px solid rgba(18,61,46,.12);border-radius:14px;background:rgba(255,250,243,.98);box-shadow:0 18px 45px rgba(16,44,34,.15);animation:audioIn .2s ease}
        .languageMenu button{width:100%;border:0;border-radius:9px;background:transparent;color:${MUTED};padding:10px 11px;text-align:left;font-size:11px;cursor:pointer}
        .languageMenu button:hover,.languageMenu button.active{background:${SAGE};color:${FOREST}}
        .languageMenu button[dir='rtl']{text-align:right}

        .hero{position:relative;min-height:100svh;background:${DEEP};color:#fff;display:flex;align-items:stretch;overflow:hidden}
        .heroImage{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:.82;filter:saturate(.78) contrast(.96)}
        .heroShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,29,22,.88) 0%,rgba(6,29,22,.62) 38%,rgba(6,29,22,.28) 72%,rgba(6,29,22,.54) 100%),linear-gradient(180deg,rgba(6,29,22,.08) 30%,rgba(6,29,22,.68) 100%)}
        .heroBotanical{position:absolute;color:#f0e5d3;right:-32px;top:2%;width:min(26vw,330px);opacity:.65;transform:rotate(10deg)}
        .heroInner{position:relative;z-index:2;width:min(1240px,calc(100% - clamp(28px,5vw,72px)));margin:auto;display:grid;grid-template-columns:130px minmax(0,1fr) minmax(280px,370px);gap:clamp(28px,4vw,64px);align-items:center;padding-block:90px}
        .heroRail{align-self:stretch;border-right:1px solid rgba(255,255,255,.2);display:flex;flex-direction:column;justify-content:space-between;padding:6px 26px 6px 0}
        .heroRail strong{font-family:'Playfair Display',serif;font-size:48px;font-weight:500;line-height:1}
        .heroRail span{writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.58)}
        .heroCopy{max-width:690px}
        .heroEyebrow{display:flex;align-items:center;gap:12px;margin-bottom:28px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#efb69f}
        .heroEyebrow:before{content:'';width:42px;height:1px;background:${CORAL}}
        .heroTitle{margin:0;font-family:'Playfair Display',serif;font-weight:500;font-size:clamp(64px,9vw,128px);line-height:.76;letter-spacing:-.055em}
        .heroAmp{display:block;color:#efb69f;font-style:italic;font-size:.56em;line-height:1.08;margin-left:1.65ch}
        .heroMeta{display:flex;flex-wrap:wrap;gap:9px 18px;margin-top:34px;color:rgba(255,255,255,.72);font-size:14px}
        .heroMeta b{color:#fff;font-weight:500}
        .heroCard{align-self:end;border:1px solid rgba(255,255,255,.18);background:rgba(11,39,30,.48);backdrop-filter:blur(14px);padding:24px;border-radius:2px 30px 2px 30px}
        .heroCardTop{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:28px}
        .heroCardTop span{font-size:10px;text-transform:uppercase;letter-spacing:.24em;color:rgba(255,255,255,.58)}
        .heroCardTop strong{font-family:'Playfair Display',serif;font-size:36px;font-weight:500;line-height:.9;text-align:right}
        .heroCardLine{height:1px;background:rgba(255,255,255,.18);margin:0 -24px 24px}
        .countdownGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
        .countdownUnit{text-align:center;padding:10px 3px;border-left:1px solid rgba(255,255,255,.15)}
        .countdownUnit:first-child{border-left:0}
        .countdownUnit strong{display:block;font-family:'Playfair Display',serif;font-size:28px;font-weight:500;color:#fff;line-height:1}
        .countdownUnit span{display:block;margin-top:8px;font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
        .heroScroll{position:absolute;left:50%;bottom:24px;z-index:3;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;color:rgba(255,255,255,.6);font-size:9px;text-transform:uppercase;letter-spacing:.22em}

        .itinerary{background:${SAND};position:relative}
        .itineraryIntro{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);gap:clamp(34px,7vw,110px);align-items:end;margin-bottom:clamp(44px,6vw,74px)}
        .itineraryList{border-top:1px solid rgba(18,61,46,.2)}
        .itineraryRow{display:grid;grid-template-columns:90px minmax(190px,.8fr) minmax(0,1fr) 40px;gap:22px;align-items:center;padding:25px 0;border-bottom:1px solid rgba(18,61,46,.15);transition:padding .25s ease,background .25s ease}
        .itineraryRow:hover{padding-inline:14px;background:rgba(255,255,255,.36)}
        .itineraryNo{font-family:'Playfair Display',serif;font-size:28px;color:${CORAL}}
        .itineraryMain span{font-size:10px;letter-spacing:.19em;text-transform:uppercase;color:${MUTED}}
        .itineraryMain h3{margin:4px 0 0;font-family:'Playfair Display',serif;font-size:clamp(22px,2.2vw,31px);font-weight:500;color:${DEEP}}
        .itineraryDesc{font-size:14px;line-height:1.6;color:${MUTED}}
        .itineraryArrow{width:38px;height:38px;border:1px solid rgba(18,61,46,.18);border-radius:999px;display:grid;place-items:center;color:${FOREST}
;transform:rotate(-90deg)}


        .postcards{position:relative;background:${CREAM};padding:clamp(76px,9vw,128px) 0 clamp(68px,8vw,110px);overflow:hidden}
        .postcards:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 8% 20%,rgba(217,120,92,.08),transparent 28%),radial-gradient(circle at 92% 80%,rgba(199,164,92,.08),transparent 30%);pointer-events:none}
        .postcardTop{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:end;margin-bottom:42px}
        .postcardTitle{margin:0;font-family:'Playfair Display',serif;font-size:clamp(42px,5.6vw,78px);line-height:.95;font-weight:500;letter-spacing:-.045em;color:${DEEP}}
        .postcardStamp{width:118px;height:118px;border:1px solid rgba(18,61,46,.22);border-radius:999px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;color:${FOREST};transform:rotate(8deg);background:rgba(255,255,255,.38)}
        .postcardStamp:before,.postcardStamp:after{content:'';position:absolute;width:132px;height:1px;background:rgba(18,61,46,.16)}
        .postcardStamp:before{transform:rotate(20deg)}
        .postcardStamp:after{transform:rotate(-20deg)}
        .postcardStamp span{font-size:9px;letter-spacing:.25em;text-transform:uppercase}
        .postcardStamp strong{font-family:'Playfair Display',serif;font-size:18px;font-weight:500}
        .postcardViewport{position:relative;overflow:hidden;padding:18px 0 26px}
        .postcardViewport:before,.postcardViewport:after{content:'';position:absolute;top:0;bottom:0;width:min(10vw,120px);z-index:3;pointer-events:none}
        .postcardViewport:before{left:0;background:linear-gradient(90deg,${CREAM},transparent)}
        .postcardViewport:after{right:0;background:linear-gradient(270deg,${CREAM},transparent)}
        .postcardTrack{display:flex;width:max-content;gap:18px;animation:postcardDrift 44s linear infinite;padding-inline:18px}
        .postcardViewport:hover .postcardTrack{animation-play-state:paused}
        @keyframes postcardDrift{from{transform:translate3d(0,0,0)}to{transform:translate3d(calc(-50% - 9px),0,0)}}
        .postcardCard{width:clamp(230px,24vw,330px);margin:0;background:#fff;padding:10px 10px 15px;box-shadow:0 18px 48px rgba(38,60,49,.11);transform:rotate(var(--tilt,0deg));transition:transform .35s ease,box-shadow .35s ease;border:1px solid rgba(18,61,46,.08)}
        .postcardCard:nth-child(3n+1){--tilt:-1.6deg}
        .postcardCard:nth-child(3n+2){--tilt:1.2deg}
        .postcardCard:nth-child(3n){--tilt:-.45deg}
        .postcardCard:hover{transform:translateY(-9px) rotate(0deg);box-shadow:0 26px 58px rgba(38,60,49,.16)}
        .postcardPhoto{height:clamp(250px,31vw,400px);overflow:hidden;background:${SAGE}}
        .postcardPhoto img{width:100%;height:100%;object-fit:cover;transition:transform .8s ease}
        .postcardCard:hover .postcardPhoto img{transform:scale(1.035)}
        .postcardCaption{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;padding:13px 3px 0}
        .postcardCaption span{font-size:8px;letter-spacing:.19em;text-transform:uppercase;color:${CORAL};font-weight:600}
        .postcardCaption strong{max-width:155px;text-align:right;font-family:'Playfair Display',serif;font-size:16px;font-weight:500;line-height:1.15;color:${DEEP}}
        .postcardFooter{position:relative;z-index:2;margin-top:24px;display:flex;align-items:center;gap:18px;color:${MUTED};font-size:11px;letter-spacing:.08em;text-transform:uppercase}
        .postcardFooter:before{content:'';width:58px;height:1px;background:${CORAL}}

        .travelSection{background:${SAGE};position:relative;overflow:hidden}
        .travelBotanical{position:absolute;right:-25px;bottom:-30px;width:290px;color:${FOREST};opacity:.5}
        .travelGrid{display:grid;grid-template-columns:minmax(0,.93fr) minmax(0,1.07fr);gap:clamp(34px,6vw,88px);align-items:start}
        .routeCard{position:relative;background:${DEEP};color:#fff;border-radius:34px 4px 34px 4px;padding:clamp(28px,4vw,50px);overflow:hidden;min-height:510px;display:flex;flex-direction:column}
        .routeCard:before{content:'';position:absolute;right:-100px;top:-90px;width:280px;height:280px;border:1px solid rgba(255,255,255,.12);border-radius:999px;box-shadow:0 0 0 36px rgba(255,255,255,.025),0 0 0 72px rgba(255,255,255,.02)}
        .routeTop{display:flex;justify-content:space-between;align-items:center;gap:16px;font-size:10px;text-transform:uppercase;letter-spacing:.22em;color:rgba(255,255,255,.58)}
        .routeTitle{font-family:'Playfair Display',serif;font-size:clamp(42px,5vw,66px);font-weight:500;line-height:.95;margin:42px 0 0;max-width:420px}
        .routeLine{display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;margin-top:auto;padding-top:50px}
        .airportCode{font-family:'Playfair Display',serif;font-size:40px}
        .routeDash{height:1px;background:linear-gradient(90deg,rgba(255,255,255,.8) 0 45%,transparent 45% 55%,rgba(255,255,255,.8) 55% 100%);background-size:14px 1px}
        .routeDetails{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:26px}
        .routeDetail{padding:16px;border:1px solid rgba(255,255,255,.13);border-radius:16px}
        .routeDetail span{display:block;font-size:9px;letter-spacing:.17em;text-transform:uppercase;color:rgba(255,255,255,.48);margin-bottom:6px}
        .routeDetail strong{font-size:13px;font-weight:500}
        .hotelHead{margin-bottom:26px}
        .hotelList{display:grid;gap:12px}
        .hotelCard{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:center;padding:20px 0;border-bottom:1px solid rgba(18,61,46,.18)}
        .hotelCard:first-child{border-top:1px solid rgba(18,61,46,.18)}
        .hotelName{font-family:'Playfair Display',serif;font-size:25px;color:${DEEP};margin:0}
        .hotelCode{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${MUTED};margin-top:5px}
        .hotelRight{text-align:right}
        .hotelTier{font-size:9px;text-transform:uppercase;letter-spacing:.18em;color:${CORAL};font-weight:600}
        .hotelRate{margin-top:4px;font-size:13px;color:${FOREST};font-weight:600}

        .ceremony{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);background:${DEEP};min-height:720px}
        .ceremonyPhoto{position:relative;overflow:hidden;min-height:520px}
        .ceremonyPhoto img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease}
        .ceremonyPhoto:hover img{transform:scale(1.025)}
        .ceremonyPhoto:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 62%,rgba(9,39,30,.55))}
        .ceremonySun{position:absolute;left:44px;bottom:38px;z-index:2;width:96px;height:96px;border:1px solid rgba(255,255,255,.7);border-radius:999px;display:grid;place-items:center;color:#fff;font-family:'Playfair Display',serif;font-size:13px;font-style:italic;backdrop-filter:blur(8px)}
        .ceremonyBody{color:#fff;padding:clamp(56px,7vw,100px) clamp(34px,6vw,78px);display:flex;flex-direction:column;justify-content:center}
        .ceremonyBody .sectionTitle{color:#fff}
        .ceremonyTimeline{margin-top:42px;border-top:1px solid rgba(255,255,255,.16)}
        .ceremonyEvent{display:grid;grid-template-columns:86px minmax(0,1fr);gap:22px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.12)}
        .ceremonyTime{font-family:'Playfair Display',serif;font-size:23px;color:#efb69f}
        .ceremonyTime small{font-family:'DM Sans',sans-serif;font-size:8px;letter-spacing:.12em;margin-left:4px}
        .ceremonyEvent strong{display:block;font-family:'Playfair Display',serif;font-size:19px;font-weight:500;color:#fff}
        .ceremonyEvent span{display:block;margin-top:4px;font-size:12px;line-height:1.5;color:rgba(255,255,255,.5)}

        .story{background:${CREAM};position:relative}
        .storyGrid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(230px,.62fr) minmax(230px,.62fr);grid-template-rows:250px 250px;gap:12px;margin-top:48px}
        .storyImage{position:relative;overflow:hidden;border-radius:2px 28px 2px 28px}
        .storyImage img{width:100%;height:100%;object-fit:cover;transition:transform .9s ease}
        .storyImage:hover img{transform:scale(1.035)}
        .storyImage.main{grid-row:1/3}.storyImage.wide{grid-column:2/4}
        .storyQuote{margin-top:34px;display:grid;grid-template-columns:110px minmax(0,1fr);gap:26px;align-items:start}
        .quoteMark{font-family:'Playfair Display',serif;font-size:96px;line-height:.7;color:${CORAL};opacity:.72}
        .storyQuote blockquote{margin:0;font-family:'Playfair Display',serif;font-size:clamp(23px,2.7vw,38px);line-height:1.32;font-style:italic;color:${FOREST}}
        .storyQuote cite{display:block;margin-top:15px;font-family:'DM Sans',sans-serif;font-style:normal;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${MUTED}}

        .attireSection{background:${FOREST};color:#fff;position:relative;overflow:hidden}
        .attireBloom{position:absolute;right:-70px;top:15px;width:min(38vw,480px);height:min(34vw,380px);pointer-events:none;opacity:.2;transform:rotate(7deg);filter:saturate(.7)}
        .attireBloom img{width:100%;height:100%;object-fit:cover;border-radius:50%;mix-blend-mode:luminosity;mask-image:radial-gradient(circle at 50% 50%,#000 25%,rgba(0,0,0,.78) 54%,transparent 76%)}
        .attireSection .pageWrap{position:relative;z-index:2}

        .attireSection:before{content:'ATTIRE';position:absolute;right:-3vw;top:20px;font-family:'Playfair Display',serif;font-size:min(20vw,260px);font-weight:600;color:rgba(255,255,255,.035);letter-spacing:-.05em}
        .attireHeader{display:grid;grid-template-columns:minmax(0,.8fr) minmax(260px,.55fr);gap:60px;align-items:end}
        .attireSection .sectionTitle{color:#fff}
        .attireIntro{font-family:'Playfair Display',serif;font-size:20px;line-height:1.5;font-style:italic;color:rgba(255,255,255,.62)}
        .attireList{margin-top:50px;border-top:1px solid rgba(255,255,255,.18)}
        .attireRow{display:grid;grid-template-columns:80px minmax(220px,.55fr) minmax(0,1fr);gap:24px;align-items:center;padding:25px 0;border-bottom:1px solid rgba(255,255,255,.13)}
        .attireNo{font-family:'Playfair Display',serif;color:#efb69f;font-size:18px}
        .attireLabel{font-family:'Playfair Display',serif;font-size:28px;font-weight:500;color:#fff}
        .attireDesc{font-size:13px;line-height:1.6;color:rgba(255,255,255,.55)}
        .attireNote{margin-top:22px;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.4)}
        .attirePalette{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-top:26px}
        .paletteLabel{margin-right:6px;font-size:9px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:rgba(255,255,255,.42)}
        .paletteChip{display:flex;align-items:center;gap:7px;font-size:10px;color:rgba(255,255,255,.58)}
        .paletteDot{width:21px;height:21px;border-radius:50%;border:1px solid rgba(255,255,255,.22);box-shadow:0 0 0 3px rgba(255,255,255,.025)}


        .rsvpSection{background:${SAND}}
        .rsvpGrid{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:clamp(34px,6vw,90px);align-items:start}
        .rsvpIntro{position:sticky;top:90px}
        .rsvpPhoto{position:relative;height:300px;margin-top:34px;border-radius:26px 2px 26px 2px;overflow:hidden}
        .rsvpPhoto img{width:100%;height:100%;object-fit:cover}
        .rsvpPhoto:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(9,39,30,.75))}
        .rsvpPhotoText{position:absolute;z-index:2;left:24px;right:24px;bottom:22px;color:#fff;font-family:'Playfair Display',serif;font-size:22px;font-style:italic}
        .rsvpCard{background:${CREAM};border:1px solid rgba(18,61,46,.12);border-radius:2px 34px 2px 34px;padding:clamp(24px,4vw,46px);box-shadow:0 22px 60px rgba(28,60,47,.08)}
        .formGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .field.full{grid-column:1/-1}
        .field label{display:block;margin-bottom:8px;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:${MUTED}}
        .field input,.field textarea{width:100%;border:0;border-bottom:1px solid rgba(18,61,46,.24);border-radius:0;padding:12px 0;background:transparent;outline:none;color:${DEEP};transition:border-color .2s ease}
        .field input:focus,.field textarea:focus{border-color:${CORAL}}
        .field textarea{min-height:90px;resize:vertical}
        .choiceLabel{margin:24px 0 10px;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.18em;color:${MUTED}}
        .choiceGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        .choiceButton{padding:14px 16px;border:1px solid rgba(18,61,46,.16);background:#fff;color:${FOREST};border-radius:999px;font-size:12px;font-weight:600;transition:.2s ease}
        .choiceButton.active{background:${FOREST};border-color:${FOREST};color:#fff}
        .activityChoices{display:flex;flex-wrap:wrap;gap:8px}
        .activityChip{border:1px solid rgba(18,61,46,.15);background:#fff;color:${MUTED};border-radius:999px;padding:9px 12px;font-size:10px;transition:.2s ease}
        .activityChip.active{background:${SAGE};color:${FOREST};border-color:rgba(18,61,46,.28)}
        .formError{margin:14px 0 0;color:#a84e3b;font-size:12px}
        .submitButton{width:100%;margin-top:24px;padding:16px 20px;border:0;background:${DEEP};color:#fff;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;transition:.25s ease}
        .submitButton:hover{background:${CORAL};transform:translateY(-1px)}
        .successState{min-height:470px;display:grid;place-items:center;text-align:center;padding:40px 10px}
        .successSeal{width:84px;height:84px;border:1px solid rgba(18,61,46,.24);border-radius:999px;display:grid;place-items:center;font-family:'Playfair Display',serif;color:${CORAL};font-size:28px;margin:0 auto 20px}
        .successState h3{margin:0;font-family:'Playfair Display',serif;font-size:40px;font-weight:500;color:${DEEP}}
        .successState p{max-width:420px;margin:12px auto 0;color:${MUTED};line-height:1.65}

        .footer{position:relative;background:${DEEP};color:#fff;padding:70px 0 38px;overflow:hidden}
        .footerBotanical{position:absolute;left:-40px;bottom:-45px;width:250px;color:#fff;opacity:.28;transform:rotate(-12deg)}
        .footerTop{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px}
        .footerLine{height:1px;background:rgba(255,255,255,.15)}
        .footerMark{text-align:center}
        .footerMark strong{display:block;font-family:'Playfair Display',serif;font-size:36px;font-weight:500}
        .footerMark span{display:block;margin-top:7px;font-size:9px;letter-spacing:.21em;text-transform:uppercase;color:rgba(255,255,255,.45)}
        .footerMeta{margin-top:40px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:10px;color:rgba(255,255,255,.38)}

        /* Fluid behavior for every resized preview width, not only preset devices. */
        .heroInner,.itineraryIntro,.travelGrid,.attireHeader,.rsvpGrid,.footerTop{min-width:0}
        .itineraryRow,.attireRow,.hotelCard,.routeCard,.rsvpCard{max-width:100%}
        .sectionTitle,.heroTitle,.itineraryMain h3,.attireLabel,.successState h3{overflow-wrap:anywhere}
        .heroInner{width:min(1240px,calc(100% - clamp(28px,5vw,72px)))}
        .storyGrid,.postcardViewport,.routeDetails,.formGrid,.choiceGrid{min-width:0}

        @media (max-width: 980px){
          .heroInner{grid-template-columns:88px minmax(0,1fr);align-items:center}
          .heroCard{grid-column:2;max-width:460px;align-self:auto;margin-top:16px}
          .heroRail{grid-row:1/3}
          .travelGrid,.rsvpGrid{grid-template-columns:1fr}
          .rsvpIntro{position:static}
          .ceremony{grid-template-columns:1fr}
          .ceremonyPhoto:after{background:linear-gradient(180deg,transparent 62%,rgba(9,39,30,.55))}
          .attireHeader{grid-template-columns:1fr;gap:20px}
        }

        @media (max-width: 640px){
          .introMedia{object-fit:contain;object-position:center}
        }

        @media (max-width: 760px){
          .pageWrap{width:min(calc(100% - clamp(22px,5vw,28px)),1180px)}
          .introPrompt{padding:clamp(22px,7vw,42px)}
          .introMonogram{margin-bottom:clamp(26px,4vh,38px)}
          .introPrompt h1{font-size:clamp(42px,12vw,68px)}
          .introPrompt p{max-width:88vw;line-height:1.55}
          .introButton{min-height:54px}
          .section{padding-block:72px}
          .hero{min-height:100svh}
          .heroInner{grid-template-columns:1fr;width:min(100% - 28px,720px);padding-block:86px 74px}
          .heroRail{display:none}
          .heroTitle{font-size:clamp(58px,20vw,96px);line-height:.8}
          .heroAmp{margin-left:1.1ch}
          .heroCard{grid-column:auto;max-width:none;width:100%;padding:18px}
          .heroCardLine{margin-inline:-18px}
          .heroMeta{font-size:12px;margin-top:24px}
          .heroBotanical{width:220px;right:-70px;top:6%}
          .countdownUnit strong{font-size:24px}
          .itineraryIntro{grid-template-columns:1fr;gap:18px}
          .itineraryRow{grid-template-columns:58px minmax(0,1fr) 32px;gap:14px;padding:18px 0}
          .itineraryDesc{grid-column:2/4;margin-top:-8px;font-size:12px}
          .itineraryArrow{width:32px;height:32px}

          .postcardTop{grid-template-columns:1fr}
          .postcardStamp{width:92px;height:92px;justify-self:end;margin-top:-10px}
          .postcardCard{width:min(74vw,310px)}
          .postcardPhoto{height:min(88vw,390px)}

          .routeCard{min-height:auto}
          .routeDetails{grid-template-columns:1fr 1fr}
          .storyGrid{grid-template-columns:1fr 1fr;grid-template-rows:330px 180px 190px}
          .storyImage.main{grid-row:auto;grid-column:1/3}.storyImage.wide{grid-column:1/3}
          .storyQuote{grid-template-columns:50px 1fr;gap:14px}
          .quoteMark{font-size:70px}
          .attireRow{grid-template-columns:42px 1fr;gap:14px}
          .attireDesc{grid-column:2}
          .formGrid{grid-template-columns:1fr}
          .field.full{grid-column:auto}
          .footerTop{grid-template-columns:1fr}
          .footerLine{width:100%}
        }

        @media (max-width: 520px){
          .sectionTitle{font-size:clamp(36px,12vw,54px)}
          .attireBloom{width:320px;height:250px;right:-130px;top:80px;opacity:.14}


          .postcards{padding-top:64px}
          .postcardViewport:before,.postcardViewport:after{width:28px}
          .postcardCaption{display:block}
          .postcardCaption strong{display:block;max-width:none;text-align:left;margin-top:7px}
          .postcardFooter{font-size:9px}

          .introPrompt p{letter-spacing:.16em;font-size:10px}
          .introMonogram{width:78px;height:78px;font-size:26px}
          .introButton{width:min(100%,248px)}
          .heroCopy{padding-top:12px}
          .heroTitle{font-size:clamp(56px,21vw,84px)}
          .heroCardTop strong{font-size:30px}
          .countdownGrid{gap:0}
          .countdownUnit strong{font-size:22px}
          .countdownUnit span{font-size:7px;letter-spacing:.1em}
          .routeLine{grid-template-columns:auto 1fr auto}
          .airportCode{font-size:32px}
          .routeDetails{grid-template-columns:1fr}
          .hotelCard{grid-template-columns:1fr;gap:8px}
          .hotelRight{text-align:left}
          .ceremonyBody{padding:56px 22px}
          .ceremonyEvent{grid-template-columns:72px 1fr;gap:14px}
          .storyGrid{grid-template-columns:1fr;grid-template-rows:300px 180px 180px 210px}
          .storyImage.main{grid-column:auto}.storyImage.wide{grid-column:auto}
          .storyQuote{grid-template-columns:1fr}
          .quoteMark{line-height:.35}
          .choiceGrid{grid-template-columns:1fr}
          .audioPanel{width:190px}
        }

        @media (max-height: 620px){
          .introPrompt{padding-block:18px}
          .introMonogram{width:62px;height:62px;margin-bottom:18px;font-size:22px}
          .introPrompt h1{font-size:clamp(36px,8vh,54px)}
          .introPrompt p{margin:14px 0 18px;font-size:9px}
          .introButton{min-height:46px;padding-block:11px}
          .heroInner{padding-block:60px}
          .section{padding-block:clamp(54px,8vw,96px)}
        }

        @media (prefers-reduced-motion: reduce){
          *{scroll-behavior:auto!important;animation:none!important;transition:none!important}
          .reveal{opacity:1!important;transform:none!important}

          .postcardViewport{overflow-x:auto;scrollbar-width:none}
          .postcardViewport::-webkit-scrollbar{display:none}
          .postcardTrack{animation:none!important}

        }
      `}</style>

      <audio ref={audioRef} src={WEDDING_MUSIC} preload="auto" />

      {introState !== "done" && (
        <div className={`intro ${introState}`} aria-label="Wedding invitation opening">
          <video
            ref={introVideoRef}
            className="introMedia"
            src={mobileOpening ? WEDDING_VIDEO_MOBILE : WEDDING_VIDEO}
            preload="auto"
            playsInline
            muted
            onLoadedData={() => {
              const video = introVideoRef.current;
              if (!video || introState !== "idle") return;
              try {
                video.currentTime = Math.min(0.04, Number.isFinite(video.duration) ? video.duration : 0.04);
              } catch {
                // Keep the native first frame if seeking is unavailable.
              }
            }}
            onEnded={finishIntro}
          />
          <div className="introShade" />
          <div className="introGrain" />
          <div className="introPrompt">
            <div className="introMonogram">S·M</div>
            <h1>Sofia &amp; Marco</h1>
            <p>21 November 2026 · Tulum</p>
            <button className="introButton" type="button" onClick={startInvitation} disabled={introState !== "idle"}>
              Open invitation <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}

      {introState === "done" && (
        <>
          <div className="progressTrack" aria-hidden="true">
            <div className="progressBar" style={{ transform: `scaleX(${scrollProgress})` }} />
          </div>

          <div className="audioDock" ref={controlsRef}>
            <div className="controlWrap">
              {languageOpen && (
                <div className="languageMenu" role="menu" aria-label={translate("Language", lang)}>
                  {(["en", "fr", "ar"] as Language[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={lang === code}
                      className={lang === code ? "active" : ""}
                      dir={code === "ar" ? "rtl" : "ltr"}
                      onClick={() => { setLang(code); setLanguageOpen(false); }}
                    >
                      {code === "en" ? "English" : code === "fr" ? "Français" : "العربية"}
                    </button>
                  ))}
                </div>
              )}
              <button
                className="languageButton"
                type="button"
                aria-label={translate("Language", lang)}
                aria-expanded={languageOpen}
                onClick={() => { setLanguageOpen((value) => !value); setAudioOpen(false); }}
              >
                <span aria-hidden="true">◎</span>{lang.toUpperCase()}
              </button>
            </div>

            <div className="controlWrap">
              {audioOpen && (
                <div className="audioPanel" dir={lang === "ar" ? "rtl" : "ltr"}>
                  <div className="audioPanelHead">
                    <div className="audioPanelTitle">
                      <strong>{translate("Wedding soundtrack", lang)}</strong>
                      <span>{translate("Now playing", lang)}</span>
                    </div>
                    <div className="audioPanelValue" aria-live="polite">{Math.round(volume * 100)}%</div>
                  </div>
                  <div className="volumeRow">
                    <button
                      type="button"
                      className="audioButton audioMuteButton"
                      onClick={toggleMute}
                      aria-label={translate(muted ? "Unmute music" : "Mute music", lang)}
                    >
                      <SpeakerIcon muted={muted || volume === 0} />
                    </button>
                    <input
                      aria-label={translate("Music volume", lang)}
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(event) => changeVolume(Number(event.target.value))}
                    />
                  </div>
                </div>
              )}
              <button
                className="audioButton"
                type="button"
                onClick={() => { setAudioOpen((value) => !value); setLanguageOpen(false); }}
                aria-label={translate("Music volume", lang)}
                aria-expanded={audioOpen}
              >
                <SpeakerIcon muted={muted || volume === 0} />
              </button>
            </div>
          </div>
        </>
      )}

      <main aria-hidden={introState !== "done"}>
        <section className="hero" id="top">
          <img src={weddingPhoto1} alt="Wedding bouquet by the sea with the couple in the distance" className="heroImage" />
          <div className="heroShade" />
          <div className="heroBotanical"><BotanicalMark /></div>

          <div className="heroInner">
            <div className="heroRail">
              <strong>21</strong>
              <span>November · Tulum · 2026</span>
            </div>

            <div className="heroCopy reveal">
              <div className="heroEyebrow">A destination wedding by the sea</div>
              <h1 className="heroTitle">
                Sofia
                <span className="heroAmp">&amp;</span>
                Marco
              </h1>
              <div className="heroMeta">
                <span><b>Saturday</b> · 21 November 2026</span>
                <span>Palmera Garden · Tulum, Mexico</span>
              </div>
            </div>

            <aside className="heroCard reveal" aria-label="Wedding countdown">
              <div className="heroCardTop">
                <span>Until we say<br />I do</span>
                <strong>05:00<br />PM</strong>
              </div>
              <div className="heroCardLine" />
              <Countdown target={weddingDate} />
            </aside>
          </div>

          <a href="#weekend" className="heroScroll">
            Scroll
            <ChevronDown />
          </a>
        </section>

        <section className="section itinerary" id="weekend">
          <div className="pageWrap">
            <div className="itineraryIntro reveal">
              <div>
                <p className="sectionLabel">November 20—22</p>
                <h2 className="sectionTitle">One long weekend,<br />five memories.</h2>
              </div>
              <p className="sectionLead">A relaxed three-day celebration shaped around the sea, the jungle, and the people we love most. Join all of it, or simply meet us at sunset.</p>
            </div>

            <div className="itineraryList reveal">
              {ACTIVITIES.map((activity) => (
                <div className="itineraryRow" key={activity.no}>
                  <div className="itineraryNo">{activity.no}</div>
                  <div className="itineraryMain">
                    <span>{activity.time}</span>
                    <h3>{activity.title}</h3>
                  </div>
                  <div className="itineraryDesc">{activity.desc}</div>
                  <div className="itineraryArrow"><ChevronDown /></div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="postcards" aria-label="Postcards from Tulum">
          <div className="pageWrap postcardTop reveal">
            <div>
              <p className="sectionLabel">A few frames from us</p>
              <h2 className="postcardTitle">Postcards from<br />paradise.</h2>
            </div>
            <div className="postcardStamp" aria-hidden="true">
              <span>Tulum</span>
              <strong>21·11·26</strong>
            </div>
          </div>

          <div className="postcardViewport">
            <div className="postcardTrack">
              {[...POSTCARDS, ...POSTCARDS].map((card, index) => (
                <figure className="postcardCard" key={`${card.kicker}-${index}`} aria-hidden={index >= POSTCARDS.length}>
                  <div className="postcardPhoto">
                    <img src={card.src} alt={index < POSTCARDS.length ? card.caption : ""} />
                  </div>
                  <figcaption className="postcardCaption">
                    <span>{card.kicker}</span>
                    <strong>{card.caption}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="pageWrap postcardFooter reveal">
            Six little glimpses of the place that keeps pulling us back.
          </div>
        </section>

        <section className="section travelSection">
          <div className="travelBotanical"><BotanicalMark /></div>
          <div className="pageWrap travelGrid">
            <div className="routeCard reveal">
              <div className="routeTop">
                <span>Travel note · 001</span>
                <span>Mexico</span>
              </div>
              <h2 className="routeTitle">Your route<br />to the coast.</h2>

              <div className="routeLine">
                <div className="airportCode">CUN</div>
                <div className="routeDash" />
                <div className="airportCode">TUL</div>
              </div>

              <div className="routeDetails">
                <div className="routeDetail">
                  <span>Transfer</span>
                  <strong>90 min · complimentary shuttle Fri—Sun</strong>
                </div>
                <div className="routeDetail">
                  <span>Arrival</span>
                  <strong>Friday before 4:00 PM</strong>
                </div>
                <div className="routeDetail">
                  <span>Forecast</span>
                  <strong>27°C / 80°F · light breeze</strong>
                </div>
                <div className="routeDetail">
                  <span>Airport</span>
                  <strong>Cancún International</strong>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="hotelHead">
                <p className="sectionLabel">Stay close</p>
                <h2 className="sectionTitle">Three places to<br />call home.</h2>
                <p className="sectionLead">We reserved room blocks at three price points. Book before October 1 to keep the group rate.</p>
              </div>

              <div className="hotelList">
                {HOTELS.map((hotel) => (
                  <div className="hotelCard" key={hotel.name}>
                    <div>
                      <h3 className="hotelName">{hotel.name}</h3>
                      <div className="hotelCode">Booking note · {hotel.note}</div>
                    </div>
                    <div className="hotelRight">
                      <div className="hotelTier">{hotel.tier}</div>
                      <div className="hotelRate">{hotel.rate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ceremony">
          <div className="ceremonyPhoto">
            <img src={weddingPhoto2} alt="Bride and groom holding a bouquet together at sunset" />
            <div className="ceremonySun">sunset<br />ceremony</div>
          </div>

          <div className="ceremonyBody reveal">
            <p className="sectionLabel">Saturday · The ceremony</p>
            <h2 className="sectionTitle">Barefoot at<br />golden hour.</h2>
            <div className="ceremonyTimeline">
              {CEREMONY.map((item) => (
                <div className="ceremonyEvent" key={`${item.time}-${item.event}`}>
                  <div className="ceremonyTime">{item.time}<small>{item.suffix}</small></div>
                  <div>
                    <strong>{item.event}</strong>
                    <span>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section story">
          <div className="pageWrap">
            <div className="reveal">
              <p className="sectionLabel">Our story</p>
              <h2 className="sectionTitle">Met in Mexico.<br />Married in Mexico.</h2>
            </div>

            <div className="storyGrid reveal">
              <div className="storyImage main"><img src={weddingPhoto6} alt="Bride and groom holding hands in warm wedding light" /></div>
              <div className="storyImage"><img src={weddingPhoto5} alt="Bride and groom forming a heart with their hands" /></div>
              <div className="storyImage"><img src={weddingPhoto4} alt="White rose bouquet and engagement ring" /></div>
              <div className="storyImage wide"><img src={weddingPhoto3} alt="Wedding rings nestled among white flowers" /></div>
            </div>

            <div className="storyQuote reveal">
              <div className="quoteMark">“</div>
              <blockquote>
                We found each other on a crowded beach in Tulum three years ago. Coming back to say “I do” in the place we fell in love is the only thing that ever made sense.
                <cite>— Sofia, on the proposal</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section attireSection">
          <div className="attireBloom" aria-hidden="true"><img src={weddingPhoto7} alt="" /></div>
          <div className="pageWrap">
            <div className="attireHeader reveal">
              <div>
                <p className="sectionLabel" style={{ color: "#efb69f" }}>Dress code · Sea to Sunset</p>
                <h2 className="sectionTitle">Dress for the coast.<br />Stay for the stars.</h2>
              </div>
              <div className="attireIntro">Think resort elegance without the stiffness — light fabrics, sun-washed color, and something you can still dance in when the shoes come off.</div>
            </div>

            <div className="attireList reveal">
              {ATTIRE.map((item) => (
                <div className="attireRow" key={item.label}>
                  <div className="attireNo">{item.no}</div>
                  <div className="attireLabel">{item.label}</div>
                  <div className="attireDesc">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="attirePalette reveal" aria-label="Suggested wedding color palette">
              <span className="paletteLabel">A little color direction</span>
              {[
                { name: "Shell", color: "#eadfcf" },
                { name: "Sand", color: "#cdbb9a" },
                { name: "Sage", color: "#8f9d7a" },
                { name: "Sea glass", color: "#7fa59a" },
                { name: "Sunset", color: "#d98269" },
              ].map((tone) => (
                <span className="paletteChip" key={tone.name}>
                  <span className="paletteDot" style={{ background: tone.color }} />
                  {tone.name}
                </span>
              ))}
            </div>

            <div className="attireNote">One small request — please leave white and ivory to the couple.</div>
          </div>
        </section>

        <section className="section rsvpSection" id="rsvp">
          <div className="pageWrap rsvpGrid">
            <div className="rsvpIntro reveal">
              <p className="sectionLabel">RSVP · Before October 1</p>
              <h2 className="sectionTitle">Will you meet us<br />in paradise?</h2>
              <p className="sectionLead">Your response helps us finalize shuttles, weekend plans, and room blocks. We hope the answer is yes.</p>
              <div className="rsvpPhoto">
                <img src={weddingPhoto6} alt="Bride and groom holding hands" />
                <div className="rsvpPhotoText">“We cannot wait to celebrate with you.”</div>
              </div>
            </div>

            <div className="rsvpCard reveal">
              {submitted ? (
                <div className="successState">
                  <div>
                    <div className="successSeal">S·M</div>
                    <h3>{rsvp === "yes" ? "See you in Tulum." : "Thank you for letting us know."}</h3>
                    <p>{rsvp === "yes" ? "Your place is saved. We will share the final weekend details closer to the date." : "We will miss you, and we are grateful you took a moment to respond."}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="formGrid">
                    <div className="field">
                      <label>Your full name</label>
                      <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Sofia Guest" />
                    </div>
                    <div className="field">
                      <label>Email address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                    </div>
                  </div>

                  <div className="choiceLabel">Will you be joining us?</div>
                  <div className="choiceGrid">
                    <button type="button" className={`choiceButton ${rsvp === "yes" ? "active" : ""}`} onClick={() => setRsvp("yes")}>Joyfully, yes</button>
                    <button type="button" className={`choiceButton ${rsvp === "no" ? "active" : ""}`} onClick={() => setRsvp("no")}>Regretfully, no</button>
                  </div>

                  {rsvp === "yes" && (
                    <>
                      <div className="choiceLabel">Weekend activities</div>
                      <div className="activityChoices">
                        {["Friday Snorkeling", "Jungle Hike", "Farewell Cruise"].map((item) => (
                          <button type="button" key={item} className={`activityChip ${activities.includes(item) ? "active" : ""}`} onClick={() => toggleActivity(item)}>
                            {activities.includes(item) ? "✓ " : "+ "}{item}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="field full" style={{ marginTop: 24 }}>
                    <label>A note for us · optional</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anything we should know?" />
                  </div>

                  {formError && <div className="formError">{formError}</div>}
                  <button type="button" className="submitButton" onClick={submitRsvp}>Send RSVP</button>
                </>
              )}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footerBotanical"><BotanicalMark /></div>
          <div className="pageWrap">
            <div className="footerTop">
              <div className="footerLine" />
              <div className="footerMark">
                <strong>Sofia &amp; Marco</strong>
                <span>November 21, 2026 · Tulum</span>
              </div>
              <div className="footerLine" />
            </div>
            <div className="footerMeta">
              <span>Questions? hola@sofiaandmarco.com</span>
              <span>Made for one very warm weekend.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
