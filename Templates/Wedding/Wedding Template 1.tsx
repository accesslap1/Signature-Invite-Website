// Single-file Figma Make version: invitation images remain embedded; video and music load from the public GitHub media repository.
// No local media files are required. Google Fonts and GitHub-hosted video/audio remain web-loaded.
import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

const ASSETS: Record<string, string> = {
  'wedding-card.mp4': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/Wedding%20Card.mp4',
  'envelope-first.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/envelope-first.webp',
  'bouquet.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/bouquet.webp',
  'hands.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/hands.webp',
  'reception-table.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/reception-table.webp',
  'hero.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/hero.webp',
  'wedding-car.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/wedding-car.webp',
  'contact-frank.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/contact-frank.webp',
  'closing.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/closing.webp',
  'couple-portrait.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/couple-portrait.webp',
  'wine-toast.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/wine-toast.webp',
  'marry-you.mp3': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/Marry%20You_spotdown.org.mp3',
  'celebration.webp': 'https://raw.githubusercontent.com/accesslap1/Signature-Invite-Website/main/Media/Wedding%20Template%201/celebration.webp',
};

const asset = (name: string) => ASSETS[name] ?? name;
type Language = "en" | "fr" | "ar";

const TRANSLATIONS: Record<Exclude<Language, "en">, Record<string, string>> = {
  "fr": {
    "John & Maria Wedding Invitation": "Invitation au mariage de John & Maria",
    "Together with their families": "Entourés de leurs familles",
    "invite you to witness their union": "vous invitent à célébrer leur union",
    "Friday, September 18": "Vendredi 18 septembre",
    "Days": "Jours",
    "Hours": "Heures",
    "Mins": "Min",
    "Sec": "Sec",
    "Scroll": "Faites défiler",
    "The Events": "Les événements",
    "Ceremony & Reception": "Cérémonie & Réception",
    "Holy Matrimony": "Sainte Union",
    "Church Ceremony": "Cérémonie religieuse",
    "Saint Joseph Cathedral": "Cathédrale Saint-Joseph",
    "Achrafieh, Beirut": "Achrafieh, Beyrouth",
    "5:00 PM": "17h00",
    "Guest seating begins at 4:30 PM. Doors close at 5:15.": "Accueil des invités à 16h30. Les portes ferment à 17h15.",
    "Evening Reception": "Réception du soir",
    "Dinner & Celebration": "Dîner & Célébration",
    "Château Rmeish & Gardens": "Château Rmeish & Jardins",
    "Rmeish, South Lebanon": "Rmeish, Liban-Sud",
    "7:00 PM": "19h00",
    "Cocktail hour begins at 7:00 PM. Dinner served at 8:30 PM.": "Le cocktail commence à 19h00. Le dîner est servi à 20h30.",
    "Dress Code:": "Tenue :",
    "Black Tie · Formal Elegance · Neutral & Mocha Tones": "Cravate noire · Élégance formelle · Tons neutres & moka",
    "The Day": "Le Jour",
    "Wedding Day Schedule": "Programme du mariage",
    "Welcome at Bride's Home": "Accueil chez la mariée",
    "Maria's Residence, Achrafieh": "Résidence de Maria, Achrafieh",
    "Gather with the family for warm greetings, floral arrangements, and a traditional toast before the ceremony begins.": "Retrouvez la famille pour un accueil chaleureux, les fleurs et un toast traditionnel avant le début de la cérémonie.",
    "Exchange of sacred vows and the holy matrimonial crowning. A moment of prayer, love, and lifelong commitment.": "Échange des vœux sacrés et couronnement matrimonial. Un moment de prière, d’amour et d’engagement pour la vie.",
    "Sunset Cocktail Hour": "Cocktail au coucher du soleil",
    "Château Rmeish Open Terrace": "Terrasse ouverte du Château Rmeish",
    "Artisan hors d'oeuvres, handcrafted cocktails, and a live saxophone serenade as the sun sets over the mountains.": "Hors-d’œuvre artisanaux, cocktails faits maison et saxophone en direct pendant le coucher du soleil sur les montagnes.",
    "Grand Entrance & Dinner": "Grande entrée & dîner",
    "Château Main Ballroom": "Grande salle du Château",
    "The newlyweds enter to applause. A multi-course seated dinner follows, complete with toasts and the first dance.": "Les mariés font leur entrée sous les applaudissements. Un dîner assis en plusieurs services suit, avec les toasts et la première danse.",
    "Cake Cutting & Celebration": "Découpe du gâteau & célébration",
    "Château Garden": "Jardin du Château",
    "Five-tier custom cake ceremony followed by dancing, fireworks, and celebration late into the evening.": "Découpe d’un gâteau sur mesure à cinq étages, suivie de danse, de feux d’artifice et de festivités jusque tard dans la soirée.",
    "How We Got Here": "Notre histoire",
    "Our Love Story": "Notre histoire d'amour",
    "October": "Octobre",
    "June": "Juin",
    "December": "Décembre",
    "March": "Mars",
    "First Meeting": "Première rencontre",
    "A warm cup of mocha mousse coffee at a cozy café in Byblos. A quiet afternoon turned into hours of endless conversation — and neither wanted to leave.": "Un café mocha mousse dans un petit café chaleureux de Byblos. Un après-midi tranquille s’est transformé en heures de conversation — et aucun des deux ne voulait partir.",
    "First Trip Together": "Premier voyage ensemble",
    "A spontaneous weekend to Santorini that turned into the trip neither would forget. Blue domes, sunsets, and the realization that this was something rare.": "Un week-end spontané à Santorin devenu un voyage inoubliable. Dômes bleus, couchers de soleil et la certitude que cette histoire était rare.",
    "Meeting the Families": "Rencontre des familles",
    "Christmas dinner with both families — chaotic, loud, and perfect. The moment everyone knew these two belonged together forever.": "Un dîner de Noël avec les deux familles — animé, bruyant et parfait. Le moment où tout le monde a compris qu’ils étaient faits l’un pour l’autre.",
    "The Proposal in Florence": "La demande à Florence",
    "Overlooking the Arno river as the golden Tuscan sun set, John got down on one knee. Maria said yes a thousand times before he could finish the question.": "Face à l’Arno, sous la lumière dorée du coucher de soleil toscan, John s’est agenouillé. Maria avait déjà dit oui mille fois avant même qu’il termine sa question.",
    "Our First Home": "Notre premier chez-nous",
    "The key, the door, the boxes — and two people ready to build a life together. Every room holds a promise of the future they're creating.": "La clé, la porte, les cartons — et deux personnes prêtes à construire une vie ensemble. Chaque pièce porte une promesse de leur avenir.",
    "Memories": "Souvenirs",
    "Photo Gallery": "Galerie photos",
    "RSVP": "Réponse",
    "Confirm Your Presence": "Confirmez votre présence",
    "Kindly respond by August 25, 2026 · Catering requires advance notice": "Merci de répondre avant le 25 août 2026 · Le traiteur nécessite une confirmation à l’avance",
    "Your full name": "Votre nom complet",
    "Attendance": "Présence",
    "Joyfully Accepts": "Accepte avec joie",
    "Regretfully Declines": "Décline avec regret",
    "Submit RSVP": "Envoyer la réponse",
    "Response Received": "Réponse reçue",
    "Thank you": "Merci",
    "Edit response": "Modifier la réponse",
    "Gifts": "Cadeaux",
    "Registry": "Liste de cadeaux",
    "Your presence is our greatest gift. For those who wish to contribute:": "Votre présence est notre plus beau cadeau. Pour ceux qui souhaitent contribuer :",
    "Bank IBAN": "IBAN bancaire",
    "On the Day": "Le jour J",
    "Contact Persons": "Contacts",
    "For any questions or assistance on the wedding day:": "Pour toute question ou assistance le jour du mariage :",
    "Best Man · Groom's Brother": "Témoin · Frère du marié",
    "Maid of Honor · Bride's Sister": "Demoiselle d’honneur · Sœur de la mariée",
    "Lea · Wedding Planner": "Lea · Organisatrice du mariage",
    "Event Coordinator": "Coordinatrice de l’événement",
    "With all our love": "Avec tout notre amour",
    "Thank you for being an indispensable part of our story. Your presence means the world to us as we begin this new chapter together.": "Merci d’être une part essentielle de notre histoire. Votre présence compte énormément pour nous alors que nous ouvrons ce nouveau chapitre ensemble.",
    "“Two are better than one, because they have a good reward for their labor.” — Ecclesiastes 4:9": "« Deux valent mieux qu’un, parce qu’ils retirent un bon salaire de leur travail. » — Ecclésiaste 4:9"
  },
  "ar": {
    "John & Maria Wedding Invitation": "دعوة زفاف جون وماريا",
    "Together with their families": "مع عائلتيهما",
    "John & Maria": "جون وماريا",
    "invite you to witness their union": "يدعوانكم لتشهدوا اتحادهما",
    "Friday, September 18": "الجمعة، 18 سبتمبر",
    "Château Rmeish": "قصر رميش",
    "Days": "أيام",
    "Hours": "ساعات",
    "Mins": "دقائق",
    "Sec": "ثوانٍ",
    "Scroll": "مرّر للأسفل",
    "The Events": "المناسبات",
    "Ceremony & Reception": "المراسم والاستقبال",
    "Holy Matrimony": "الزواج المقدّس",
    "Church Ceremony": "مراسم الكنيسة",
    "Saint Joseph Cathedral": "كاتدرائية القديس يوسف",
    "Achrafieh, Beirut": "الأشرفية، بيروت",
    "5:00 PM": "5:00 مساءً",
    "Guest seating begins at 4:30 PM. Doors close at 5:15.": "يبدأ استقبال الضيوف عند 4:30 مساءً. تُغلق الأبواب عند 5:15 مساءً.",
    "Evening Reception": "استقبال المساء",
    "Dinner & Celebration": "العشاء والاحتفال",
    "Château Rmeish & Gardens": "قصر رميش والحدائق",
    "Rmeish, South Lebanon": "رميش، جنوب لبنان",
    "7:00 PM": "7:00 مساءً",
    "Cocktail hour begins at 7:00 PM. Dinner served at 8:30 PM.": "تبدأ ساعة الكوكتيل عند 7:00 مساءً، ويُقدَّم العشاء عند 8:30 مساءً.",
    "Dress Code:": "اللباس:",
    "Black Tie · Formal Elegance · Neutral & Mocha Tones": "ربطة عنق سوداء · أناقة رسمية · درجات محايدة وموكا",
    "The Day": "اليوم",
    "Wedding Day Schedule": "برنامج يوم الزفاف",
    "Welcome at Bride's Home": "استقبال في منزل العروس",
    "Maria's Residence, Achrafieh": "منزل ماريا، الأشرفية",
    "Gather with the family for warm greetings, floral arrangements, and a traditional toast before the ceremony begins.": "لقاء دافئ مع العائلة، وترتيبات الزهور ونخب تقليدي قبل بدء المراسم.",
    "Exchange of sacred vows and the holy matrimonial crowning. A moment of prayer, love, and lifelong commitment.": "تبادل العهود المقدّسة وتتويج الزواج. لحظة صلاة وحب والتزام مدى الحياة.",
    "Sunset Cocktail Hour": "ساعة كوكتيل عند الغروب",
    "Château Rmeish Open Terrace": "الشرفة المفتوحة في قصر رميش",
    "Artisan hors d'oeuvres, handcrafted cocktails, and a live saxophone serenade as the sun sets over the mountains.": "مقبلات محضّرة بعناية، كوكتيلات مميزة وعزف ساكسفون حي مع غروب الشمس فوق الجبال.",
    "Grand Entrance & Dinner": "الدخول الكبير والعشاء",
    "Château Main Ballroom": "القاعة الرئيسية في القصر",
    "The newlyweds enter to applause. A multi-course seated dinner follows, complete with toasts and the first dance.": "يدخل العروسان وسط التصفيق، ثم يُقدَّم عشاء متعدد الأطباق مع كلمات التهنئة والرقصة الأولى.",
    "Cake Cutting & Celebration": "قطع قالب الحلوى والاحتفال",
    "Château Garden": "حديقة القصر",
    "Five-tier custom cake ceremony followed by dancing, fireworks, and celebration late into the evening.": "مراسم قطع قالب حلوى مكوّن من خمس طبقات، تليها الرقصات والألعاب النارية والاحتفال حتى وقت متأخر.",
    "How We Got Here": "كيف بدأت حكايتنا",
    "Our Love Story": "قصّة حبّنا",
    "October": "أكتوبر",
    "June": "يونيو",
    "December": "ديسمبر",
    "March": "مارس",
    "First Meeting": "اللقاء الأول",
    "A warm cup of mocha mousse coffee at a cozy café in Byblos. A quiet afternoon turned into hours of endless conversation — and neither wanted to leave.": "فنجان قهوة موكا في مقهى دافئ في جبيل. تحوّل بعد ظهر هادئ إلى ساعات من الحديث الذي لا ينتهي — ولم يرغب أيٌّ منهما في المغادرة.",
    "First Trip Together": "أول رحلة معًا",
    "A spontaneous weekend to Santorini that turned into the trip neither would forget. Blue domes, sunsets, and the realization that this was something rare.": "عطلة عفوية في سانتوريني تحوّلت إلى رحلة لا تُنسى. قبب زرقاء، غروب ساحر وإحساس بأن ما بينهما شيء استثنائي.",
    "Meeting the Families": "لقاء العائلتين",
    "Christmas dinner with both families — chaotic, loud, and perfect. The moment everyone knew these two belonged together forever.": "عشاء عيد الميلاد مع العائلتين — صاخب، مليء بالحياة ومثالي. اللحظة التي عرف فيها الجميع أنهما خُلقا ليكملا الطريق معًا.",
    "The Proposal in Florence": "طلب الزواج في فلورنسا",
    "Overlooking the Arno river as the golden Tuscan sun set, John got down on one knee. Maria said yes a thousand times before he could finish the question.": "على ضفاف نهر آرنو مع غروب شمس توسكانا الذهبية، جثا جون على ركبة واحدة. قالت ماريا نعم ألف مرة قبل أن ينهي سؤاله.",
    "Our First Home": "منزلنا الأول",
    "The key, the door, the boxes — and two people ready to build a life together. Every room holds a promise of the future they're creating.": "المفتاح والباب والصناديق — وشخصان مستعدان لبناء حياة معًا. كل غرفة تحمل وعدًا بالمستقبل الذي يصنعانه.",
    "Memories": "ذكريات",
    "Photo Gallery": "ألبوم الصور",
    "RSVP": "تأكيد الحضور",
    "Confirm Your Presence": "أكّد حضورك",
    "Kindly respond by August 25, 2026 · Catering requires advance notice": "يرجى تأكيد الحضور قبل 25 أغسطس 2026 · يحتاج فريق الضيافة إلى إشعار مسبق",
    "Your full name": "الاسم الكامل",
    "Attendance": "الحضور",
    "Joyfully Accepts": "سأحضر بكل سرور",
    "Regretfully Declines": "أعتذر عن الحضور",
    "Submit RSVP": "إرسال التأكيد",
    "Response Received": "تم استلام الرد",
    "Thank you": "شكرًا",
    "Edit response": "تعديل الرد",
    "Gifts": "الهدايا",
    "Registry": "سجل الهدايا",
    "Your presence is our greatest gift. For those who wish to contribute:": "وجودكم معنا هو أجمل هدية. لمن يرغب بالمساهمة:",
    "Whish Money": "ويش موني",
    "John Doe": "جون دو",
    "Maria Willson": "ماريا ويلسون",
    "Bank IBAN": "رقم IBAN البنكي",
    "On the Day": "يوم الزفاف",
    "Contact Persons": "جهات الاتصال",
    "For any questions or assistance on the wedding day:": "لأي سؤال أو مساعدة يوم الزفاف:",
    "Frank Doe": "فرانك دو",
    "Best Man · Groom's Brother": "الإشبين · شقيق العريس",
    "SW": "ص و",
    "Sophy Willson": "صوفي ويلسون",
    "Maid of Honor · Bride's Sister": "وصيفة الشرف · شقيقة العروس",
    "L": "ل",
    "Lea · Wedding Planner": "ليا · منظّمة الزفاف",
    "Event Coordinator": "منسّقة الفعالية",
    "With all our love": "بكل حبّنا",
    "Thank you for being an indispensable part of our story. Your presence means the world to us as we begin this new chapter together.": "شكرًا لأنكم جزء لا يتجزأ من قصّتنا. وجودكم يعني لنا الكثير ونحن نبدأ هذا الفصل الجديد معًا.",
    "“Two are better than one, because they have a good reward for their labor.” — Ecclesiastes 4:9": "«اثنان خير من واحد، لأن لهما أجرة لتعبهما.» — سفر الجامعة 4:9"
  }
};

const documentTitles: Record<Language,string> = {
  en: "John & Maria Wedding Invitation",
  fr: "Invitation au mariage de John & Maria",
  ar: "دعوة زفاف جون وماريا",
};

function translate(key:string, lang:Language):string {
  if (lang === "en") return key;
  if (lang === "fr" && key === "Please enter your full name.") return "Veuillez saisir votre nom complet.";
  if (lang === "ar" && key === "Please enter your full name.") return "يرجى إدخال الاسم الكامل.";
  if (lang === "fr" && key === "Sending RSVP") return "Envoi en cours";
  if (lang === "ar" && key === "Sending RSVP") return "جارٍ إرسال التأكيد";
  return TRANSLATIONS[lang][key] ?? key;
}


const STYLES = "\n@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');\n*{box-sizing:border-box} html,body,#root{margin:0;min-height:100%;background:#faf7f4} body{font-family:'DM Sans',Arial,sans-serif;color:#1e2939} main{width:100%;overflow:hidden}.hero{height:895px;min-height:895px;background-size:cover;background-position:center;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;padding:0 32px 80px}.hero-copy{display:flex;flex-direction:column;align-items:center}.hero-kicker{font-size:14px;line-height:20px;letter-spacing:7px;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}.hero h1{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:144px;line-height:1;margin:0 0 14px;white-space:nowrap}.hero-sub{font-family:'Cormorant Garamond',serif;font-size:24px;line-height:32px;color:rgba(255,255,255,.7);margin-bottom:32px}.hero-date{font-size:18px;color:rgba(255,255,255,.5);margin-bottom:31px}.hero-date i{font-style:normal;color:rgba(255,255,255,.3);padding:0 12px}.countdown{display:flex;gap:24px}.countdown-unit{display:flex;flex-direction:column;align-items:center}.countdown-window{font-family:'Cormorant Garamond',serif;font-size:40px;line-height:60px;height:60px;min-width:42px;overflow:hidden;display:block}.countdown-number{display:block;animation:countdownRoll .48s cubic-bezier(.22,.8,.3,1)}.countdown-unit>span{text-transform:uppercase;letter-spacing:1.2px;font-size:12px;color:rgba(255,255,255,.4)}@keyframes countdownRoll{0%{transform:translateY(-48%);opacity:0}55%{opacity:1}100%{transform:translateY(0);opacity:1}}.scroll-note{position:absolute;bottom:37px;left:50%;transform:translateX(-50%);font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,255,255,.3);display:flex;flex-direction:column;align-items:center;gap:8px;animation:scrollBounce 1.6s ease-in-out infinite}.scroll-note span{font-size:20px;color:rgba(255,255,255,.4)}@keyframes scrollBounce{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,9px)}}@media (prefers-reduced-motion:reduce){.countdown-number,.scroll-note{animation:none}.ceremony .section-title,.ceremony .event-card,.ceremony .dress,.event-card,.event-photo,.event-image .tag,.event-image h3{transition:none!important;filter:none!important}.ceremony .section-title,.ceremony .event-card,.ceremony .dress{opacity:1!important;transform:none!important}.event-card:hover{transform:none}.road-milestone{opacity:1!important;filter:none!important;transform:none!important;transition:none!important}.wedding-car{transition:none!important}.flower-burst.active .petal,.flower-burst.active .blossom,.flower-burst.active .tiny-flower{animation:none!important}.love-story .section-title,.story-card{transition:none!important;filter:none!important;opacity:1!important;transform:none!important}.gallery-section .section-title,.gallery img{transition:none!important;filter:none!important;opacity:1!important;transform:none!important;clip-path:none!important}}\n.section{padding:64px 24px;max-width:1182px;margin:0 auto}.section-title,.rsvp-head{text-align:center;margin-bottom:40px}.eyebrow{font-size:14px;line-height:20px;letter-spacing:4.9px;text-transform:uppercase;color:#b18775}.eyebrow.left{text-align:left;font-size:12px;letter-spacing:4.2px}.section-title h2,.rsvp-head h2{font-family:'Cormorant Garamond',serif;font-size:48px;line-height:72px;margin:0;color:#1a1008}.ornament{display:flex;align-items:center;gap:16px;width:100%;margin-top:2px;color:#b18775}.ornament span{height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(177,135,117,.38))}.ornament span:last-child{background:linear-gradient(90deg,rgba(177,135,117,.38),transparent)}.ornament b{font-size:15px}.event-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.event-card{border:1px solid rgba(117,81,57,.14);border-radius:24px;overflow:hidden;background:white;transform:translateZ(0);transition:transform .45s cubic-bezier(.22,.8,.3,1),box-shadow .45s ease,border-color .45s ease}.event-image{height:208px;position:relative;overflow:hidden;background:#e9e2dc}.event-photo{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1);transition:transform .75s cubic-bezier(.22,.8,.3,1)}.event-image:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(60,30,10,.8),rgba(60,30,10,0));transition:background-color .45s ease}.event-image .tag{position:absolute;z-index:2;left:16px;top:16px;background:rgba(117,81,57,.8);color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;transition:transform .45s cubic-bezier(.22,.8,.3,1),background-color .45s ease}.event-image h3{position:absolute;z-index:2;left:16px;bottom:14px;margin:0;color:white;font-family:'Cormorant Garamond',serif;font-size:20px;transition:transform .45s cubic-bezier(.22,.8,.3,1)}.event-body{padding:24px;display:flex;flex-direction:column;gap:12px}.event-card:hover{transform:translateY(-8px);border-color:rgba(117,81,57,.28);box-shadow:0 22px 50px rgba(61,38,25,.13)}.event-card:hover .event-photo{transform:scale(1.055)}.event-card:hover .event-image:after{background-color:rgba(55,29,13,.06)}.event-card:hover .event-image .tag{transform:translateY(-2px);background:rgba(117,81,57,.92)}.event-card:hover .event-image h3{transform:translateY(-3px)}.info-row{display:flex;gap:12px;align-items:flex-start}.info-row strong{font-size:16px}.info-row small{display:block;font-size:14px;color:#99a1af;margin-top:2px}.mini-icon{color:#b18775;font-size:11px;margin-top:4px}.event-note{border-top:1px solid rgba(117,81,57,.08);padding-top:12px;margin:0;color:#99a1af;font-size:14px}.dress{display:flex;justify-content:center;gap:8px;align-items:center;margin-top:40px;border:1px solid rgba(117,81,57,.13);background:rgba(117,81,57,.03);border-radius:16px;padding:20px 32px;font-size:16px}.dress span{color:#b18775}\n.ceremony .section-title,.ceremony .event-card,.ceremony .dress{opacity:0;transform:translateY(32px);filter:blur(2px);transition:opacity .8s cubic-bezier(.22,.8,.3,1),transform .8s cubic-bezier(.22,.8,.3,1),filter .8s ease}\n.ceremony .event-card:nth-child(1){transition-delay:.12s}.ceremony .event-card:nth-child(2){transition-delay:.22s}.ceremony .dress{transition-delay:.34s}\n.ceremony.is-visible .section-title,.ceremony.is-visible .event-card,.ceremony.is-visible .dress{opacity:1;transform:translateY(0);filter:blur(0)}.ceremony.is-visible .event-card:hover{transform:translateY(-8px)}\n\n.timeline-road-section{position:relative;max-width:none;background:#faf7f4;padding:64px 24px 118px;overflow:visible}\n.timeline-road-section:before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 34%,rgba(177,135,117,.055),transparent 34%),linear-gradient(180deg,rgba(255,255,255,.28),transparent 15%,transparent 84%,rgba(255,255,255,.22));}\n.timeline-road-sticky{position:relative;height:auto;min-height:0;padding:0;overflow:visible}\n.timeline-road-sticky>.section-title{max-width:1182px;margin:0 auto 48px;position:relative;z-index:8}\n.road-stage{position:relative;width:min(1240px,calc(100vw - 48px));height:1640px;margin:0 auto;isolation:isolate;overflow:visible}\n.road-stage:before{content:'';position:absolute;inset:0 20%;border-radius:48%;background:radial-gradient(ellipse at 50% 44%,rgba(177,135,117,.075),rgba(177,135,117,.022) 48%,transparent 74%);filter:blur(42px);z-index:-2}\n.road-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;z-index:0}.road-shadow{fill:none;stroke:rgba(73,45,28,.08);stroke-width:236;stroke-linecap:round;stroke-linejoin:round;filter:url(#softRoadShadow)}.road-verge{fill:none;stroke:#eadbd2;stroke-width:224;stroke-linecap:round;stroke-linejoin:round}.road-edge{fill:none;stroke:#c99d88;stroke-width:208;stroke-linecap:round;stroke-linejoin:round}.road-surface{fill:none;stroke:#fbf4ee;stroke-width:194;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 2px 0 rgba(255,255,255,.92))}.road-texture{display:none}.road-progress-halo{fill:none;stroke:rgba(117,81,57,.28);stroke-width:66;stroke-linecap:round;stroke-linejoin:round;filter:url(#progressGlow);opacity:.78;transition:stroke-dashoffset .05s linear}.road-travelled{fill:none;stroke:url(#travelTone);stroke-width:38;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px 0 rgba(255,255,255,.3));opacity:1;transition:stroke-dashoffset .05s linear}.road-center{fill:none;stroke:rgba(177,135,117,.43);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:4 18;filter:none}\n.roadside-patch ellipse{fill:rgba(177,135,117,.035)}.roadside-patch circle{fill:#c9957f;opacity:.72;filter:drop-shadow(0 1px 0 rgba(255,255,255,.65))}.roadside-patch.alt circle{fill:#dfb8a8}.roadside-patch{opacity:.72}\n.road-milestone{position:absolute;width:31%;max-width:365px;z-index:4;opacity:0;filter:blur(3px);padding:18px 20px 20px;background:rgba(255,253,250,.94);border:1px solid rgba(177,135,117,.14);border-radius:20px;box-shadow:0 16px 38px rgba(85,58,40,.055);transition:opacity .75s cubic-bezier(.22,.8,.3,1),transform .8s cubic-bezier(.22,.8,.3,1),filter .75s ease}.road-milestone.left{left:1%;transform:translate(-24px,calc(-50% + 22px))}.road-milestone.right{right:1%;transform:translate(24px,calc(-50% + 22px))}.road-milestone.active{opacity:1;filter:blur(0)}.road-milestone.left.active,.road-milestone.right.active{transform:translate(0,-50%)}.road-milestone:after{content:'';position:absolute;top:50%;height:1px;width:92px;background:linear-gradient(90deg,rgba(177,135,117,.48),rgba(177,135,117,.08));transform:translateY(-50%)}.road-milestone.left:after{right:-100px}.road-milestone.right:after{left:-100px;transform:translateY(-50%) scaleX(-1)}.road-milestone time{display:block;color:#b18775;font-size:13px;font-weight:600;letter-spacing:.25px;margin-bottom:6px}.road-milestone h3{font-family:'Cormorant Garamond',serif;font-size:27px;line-height:31px;color:#1a1008;margin:0 0 5px}.road-milestone .place{font-size:11px;line-height:16px;color:#b18775;text-transform:uppercase;letter-spacing:.8px;margin-bottom:7px}.road-milestone p{max-width:330px;color:#8f98a5;font-size:13px;line-height:19.5px;margin:0}\n.road-stop{position:absolute;z-index:6;width:54px;height:54px;transform:translate(-50%,-50%) scale(.78);border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fffaf5;border:1px solid rgba(177,135,117,.66);box-shadow:0 9px 26px rgba(92,65,48,.10),0 0 0 9px rgba(250,247,244,.9);opacity:.44;transition:transform .45s cubic-bezier(.2,.9,.25,1.25),opacity .45s ease,border-color .45s ease,box-shadow .45s ease}.road-stop:after{content:'';position:absolute;inset:6px;border-radius:50%;border:1px solid rgba(117,81,57,.16)}.road-stop>span:first-child{position:relative;z-index:2;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:18px;color:#755139}.road-stop.active{opacity:1;transform:translate(-50%,-50%) scale(1);border-color:#b18775;box-shadow:0 12px 30px rgba(92,65,48,.18),0 0 0 10px rgba(250,247,244,.9)}\n.wedding-car{position:absolute;width:178px;z-index:9;pointer-events:none;will-change:left,top,transform;transition:left .04s linear,top .04s linear,transform .06s linear;filter:drop-shadow(0 20px 15px rgba(74,55,43,.23))}.wedding-car:before{content:'';position:absolute;left:50%;bottom:7%;width:56%;height:10%;transform:translateX(-50%);background:rgba(63,47,36,.22);filter:blur(9px);border-radius:50%;z-index:-1}.wedding-car img{display:block;width:100%;height:auto}\n.flower-burst{position:absolute;left:50%;top:50%;width:1px;height:1px;pointer-events:none;z-index:12}.flower-burst .petal{position:absolute;left:-4px;top:-3px;width:10px;height:6px;border-radius:90% 20% 90% 20%;background:#d79882;opacity:0;transform:translate(0,0) rotate(0deg) scale(.4)}.flower-burst .petal:nth-child(2n){background:#efc7b4}.flower-burst .petal:nth-child(3n){background:#b18775}.flower-burst .petal:nth-child(5n){background:#f6dfd3}.flower-burst .petal:nth-child(7n){background:#e6b09a}.flower-burst.active .petal{animation:petalThrow 1.45s cubic-bezier(.16,.75,.32,1) var(--delay) both}.flower-burst .blossom{position:absolute;left:-7px;top:-9px;font-style:normal;font-size:18px;line-height:1;color:#d59d88;opacity:0;text-shadow:0 2px 8px rgba(117,81,57,.12)}.flower-burst.active .blossom{animation:flowerPop 1.05s cubic-bezier(.17,.8,.27,1.2) var(--delay) both}.flower-scatter{position:absolute;inset:0}.tiny-flower{position:absolute;font-style:normal;font-size:13px;color:#d9a18a;opacity:0;transform:scale(.2)}.tiny-flower:nth-child(1){left:-48px;top:28px}.tiny-flower:nth-child(2){left:-29px;top:42px}.tiny-flower:nth-child(3){left:-5px;top:34px}.tiny-flower:nth-child(4){left:20px;top:44px}.tiny-flower:nth-child(5){left:43px;top:25px}.tiny-flower:nth-child(6){left:-58px;top:3px}.tiny-flower:nth-child(7){left:53px;top:-2px}.tiny-flower:nth-child(8){left:-35px;top:-31px}.tiny-flower:nth-child(9){left:31px;top:-38px}.tiny-flower:nth-child(10){left:-9px;top:-48px}.tiny-flower:nth-child(11){left:7px;top:58px}.tiny-flower:nth-child(12){left:-53px;top:48px}.flower-burst.active .tiny-flower{animation:scatterIn .55s cubic-bezier(.2,.9,.3,1.25) .52s forwards}@keyframes petalThrow{0%{opacity:0;transform:translate(0,0) rotate(0) scale(.35)}12%{opacity:1}68%{opacity:.96}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(1.08)}}@keyframes flowerPop{0%{opacity:0;transform:translate(0,0) scale(.2) rotate(-18deg)}35%{opacity:1}100%{opacity:0;transform:translate(var(--bx),var(--by)) scale(1.08) rotate(18deg)}}@keyframes scatterIn{0%{opacity:0;transform:scale(.2)}100%{opacity:.72;transform:scale(1)}}\n.love-story{max-width:none;background:#fff;padding-left:0;padding-right:0;overflow:hidden}.love-story>.section-title{max-width:1182px;margin-left:auto;margin-right:auto;padding:0 24px}.story-scroll{display:flex;gap:24px;width:max-content;max-width:calc(100% - 40px);overflow-x:auto;overflow-y:hidden;padding:0 0 10px;margin:0 auto;scrollbar-width:none}.story-scroll::-webkit-scrollbar{display:none}.story-card{min-width:288px;width:288px;border:1px solid rgba(117,81,57,.13);border-radius:24px;background:#fff;overflow:hidden;transform-origin:18% 100%;opacity:0;filter:blur(2px);transform:translateY(38px) rotate(-4.5deg) scale(.985);transition:opacity .72s cubic-bezier(.22,.8,.3,1),transform .78s cubic-bezier(.2,.86,.28,1.08),filter .68s ease,box-shadow .4s ease,border-color .4s ease}.love-story .section-title{opacity:0;transform:translateY(26px);filter:blur(2px);transition:opacity .72s cubic-bezier(.22,.8,.3,1),transform .72s cubic-bezier(.22,.8,.3,1),filter .65s ease}.love-story.is-visible .section-title{opacity:1;transform:translateY(0);filter:blur(0)}.love-story.is-visible .story-card{opacity:1;filter:blur(0);transform:translateY(0) rotate(0) scale(1)}.love-story.is-visible .story-card:nth-child(1){transition-delay:.14s}.love-story.is-visible .story-card:nth-child(2){transition-delay:.27s}.love-story.is-visible .story-card:nth-child(3){transition-delay:.40s}.love-story.is-visible .story-card:nth-child(4){transition-delay:.53s}.love-story.is-visible .story-card:nth-child(5){transition-delay:.66s}.story-card:hover{border-color:rgba(117,81,57,.24);box-shadow:0 18px 42px rgba(61,38,25,.09);transform:translateY(-5px)!important}.story-img{height:208px;background-size:cover;background-position:center;position:relative}.story-img>div{position:absolute;left:16px;bottom:14px;color:#fff}.story-img small{display:block;font-size:12px;color:rgba(255,255,255,.6)}.story-img strong{display:block;font-family:'Cormorant Garamond',serif;font-size:24px}.story-copy{padding:20px}.story-copy h3{font-size:18px;margin:0 0 8px}.story-copy p{font-size:14px;line-height:22.75px;color:#99a1af;margin:0}.gallery-section{max-width:none;background:#faf7f4;position:relative;overflow:hidden}.gallery-section:before{content:'';position:absolute;left:50%;top:150px;width:min(1100px,86vw);height:520px;transform:translateX(-50%);pointer-events:none;background:radial-gradient(ellipse at center,rgba(177,135,117,.055),transparent 68%);filter:blur(34px)}.gallery-section>.section-title,.gallery{max-width:1182px;margin-left:auto;margin-right:auto;position:relative;z-index:1}.gallery-section .section-title{opacity:0;transform:translateY(24px);filter:blur(2px);transition:opacity .75s cubic-bezier(.22,.8,.3,1),transform .75s cubic-bezier(.22,.8,.3,1),filter .7s ease}.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;perspective:1000px}.gallery img{width:100%;height:288px;border-radius:16px;object-fit:cover;display:block;opacity:0;clip-path:inset(100% 0 0 0 round 16px);transform:translateY(26px) scale(1.035);filter:saturate(.82) brightness(1.04);box-shadow:0 0 0 rgba(61,38,25,0);transition:clip-path 1s cubic-bezier(.2,.82,.24,1),opacity .7s ease,transform 1s cubic-bezier(.2,.82,.24,1),filter .95s ease,box-shadow .45s ease}.gallery-section.is-visible .section-title{opacity:1;transform:translateY(0);filter:blur(0)}.gallery-section.is-visible .gallery img{opacity:1;clip-path:inset(0 0 0 0 round 16px);transform:translateY(0) scale(1);filter:saturate(1) brightness(1)}.gallery-section.is-visible .gallery img:nth-child(1){transition-delay:.12s}.gallery-section.is-visible .gallery img:nth-child(2){transition-delay:.21s}.gallery-section.is-visible .gallery img:nth-child(3){transition-delay:.30s}.gallery-section.is-visible .gallery img:nth-child(4){transition-delay:.39s}.gallery-section.is-visible .gallery img:nth-child(5){transition-delay:.48s}.gallery-section.is-visible .gallery img:nth-child(6){transition-delay:.57s}.gallery-section.is-visible .gallery img:hover{transform:translateY(-7px) scale(1.018);box-shadow:0 20px 46px rgba(61,38,25,.14);filter:saturate(1.04) brightness(1.015);transition-delay:0s;z-index:2}.rsvp-section{max-width:1180px}.rsvp-head p{font-size:16px;color:#b18775;margin:0 0 12px}.rsvp-card{background:#fff;border:1px solid rgba(117,81,57,.13);border-radius:24px;padding:40px;display:flex;flex-direction:column;gap:28px}.fake-input{height:42px;border-bottom:2px solid rgba(117,81,57,.19);font-size:18px;color:rgba(26,16,8,.5);padding-bottom:12px}.attendance-label{font-size:14px;letter-spacing:1.4px;text-transform:uppercase;color:#b18775;margin-bottom:-16px}.attendance{display:grid;grid-template-columns:1fr 1fr;gap:16px}.attendance button{height:64px;border-radius:16px;border:2px solid rgba(117,81,57,.14);background:#fff;color:#9ca3af;font:600 18px 'DM Sans'}.attendance .selected{border-color:#755139;background:rgba(117,81,57,.06);color:#755139}.submit{border:0;border-radius:999px;background:#755139;color:#fff;font:700 18px 'DM Sans';padding:16px;opacity:.3}.registry-section{max-width:none;background:#faf7f4}.two-col{max-width:1182px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:24px}.small-title{margin-bottom:24px}.small-title h3{font-family:'Cormorant Garamond',serif;font-size:30px;margin:4px 0 2px;color:#1a1008}.small-title p{font-size:14px;color:#99a1af;margin:0}.registry-row,.contact-row{background:white;border:1px solid rgba(117,81,57,.13);border-radius:16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;padding:16px 20px}.registry-row>div{display:grid;grid-template-columns:auto auto;gap:2px 8px;align-items:center}.registry-row strong{font-size:16px}.registry-row em{font-style:normal;color:#b18775;border:1px solid rgba(117,81,57,.19);border-radius:999px;font-size:12px;padding:2px 8px}.registry-row small{grid-column:1/3;color:#99a1af;font-size:14px}.registry-row>span{color:#755139}.contact-row{padding:10px 20px;gap:16px}.contact-row img,.avatar-placeholder{width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(177,135,117,.25)}.avatar-placeholder{display:flex;align-items:center;justify-content:center;background:#f1e7e1;color:#755139;font-weight:700}.contact-row>div:nth-child(2){flex:1}.contact-row strong{display:block;font-size:16px}.contact-row small{display:block;color:#b18775;font-size:12px}.contact-row>span{color:#755139;font-size:14px}.closing{height:497px;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;color:white;padding:30px}.closing-inner{max-width:1182px}.closing h2{font-family:'Cormorant Garamond',serif;font-size:80px;line-height:120px;margin:0}.closing .ornament{width:min(900px,80vw);margin:0 auto 20px}.closing .ornament span{background:linear-gradient(90deg,transparent,rgba(255,255,255,.25))}.closing .ornament span:last-child{background:linear-gradient(90deg,rgba(255,255,255,.25),transparent)}.closing p{font-size:18px;color:rgba(255,255,255,.6);margin:0 0 8px}.closing blockquote{font-family:'Cormorant Garamond',serif;font-size:19.2px;font-style:italic;color:rgba(255,255,255,.4);margin:0}\n@media(max-width:800px){.hero{height:760px;min-height:760px}.hero h1{font-size:72px}.hero-date{display:flex;flex-wrap:wrap;justify-content:center}.section-title h2,.rsvp-head h2{font-size:40px;line-height:54px}.event-grid,.two-col,.attendance,.gallery{grid-template-columns:1fr}.gallery img{height:240px}.timeline-road-section{padding-left:12px;padding-right:12px}.timeline-road-sticky{padding-left:0;padding-right:0}.road-stage{width:calc(100vw - 24px);height:1500px}.road-milestone{width:39%;padding:14px 14px 16px}.road-milestone h3{font-size:20px;line-height:24px}.road-milestone p{font-size:11px;line-height:16px}.road-milestone .place{font-size:9px}.road-milestone:after{display:none}.wedding-car{width:92px}.road-stop{width:34px;height:34px}.road-stop>span{font-size:14px}.dress{flex-direction:column;text-align:center}.closing h2{font-size:56px;line-height:76px}.closing{height:auto;min-height:500px}.closing p{line-height:1.5}.hero-kicker{letter-spacing:4px}}\n\n/* RSVP interaction + motion */\n.rsvp-section{max-width:1180px;position:relative}.rsvp-section .rsvp-head{opacity:0;transform:translateY(24px);filter:blur(2px);transition:opacity .75s cubic-bezier(.22,.8,.3,1),transform .75s cubic-bezier(.22,.8,.3,1),filter .7s ease}.rsvp-section .rsvp-card{position:relative;overflow:hidden;isolation:isolate;opacity:0;transform:translateY(36px) scale(.985);filter:blur(3px);box-shadow:0 0 0 rgba(61,38,25,0);transition:opacity .85s cubic-bezier(.22,.8,.3,1) .12s,transform .9s cubic-bezier(.22,.8,.3,1) .12s,filter .75s ease .12s,box-shadow .45s ease,border-color .45s ease}.rsvp-section.is-visible .rsvp-head{opacity:1;transform:none;filter:none}.rsvp-section.is-visible .rsvp-card{opacity:1;transform:none;filter:none;box-shadow:0 18px 55px rgba(61,38,25,.055)}.rsvp-section.is-visible .rsvp-card:hover{border-color:rgba(117,81,57,.2);box-shadow:0 24px 65px rgba(61,38,25,.085)}\n.rsvp-card:before{content:'';position:absolute;width:420px;height:420px;right:-180px;top:-240px;border-radius:50%;background:radial-gradient(circle,rgba(177,135,117,.09),transparent 68%);pointer-events:none;z-index:-1}.rsvp-form-content{display:flex;flex-direction:column;gap:28px;transition:opacity .45s ease,transform .5s cubic-bezier(.22,.8,.3,1),filter .45s ease}.rsvp-field{border:0;padding:0;margin:0;min-width:0}.rsvp-field label,.rsvp-field legend{display:block;padding:0;margin:0 0 10px;color:#b18775;font-size:13px;letter-spacing:1.4px;text-transform:uppercase}.field-name label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.rsvp-input-wrap{position:relative}.rsvp-input-wrap input{width:100%;height:48px;border:0;border-bottom:2px solid rgba(117,81,57,.18);outline:0;background:transparent;color:#1a1008;font:400 18px 'DM Sans';padding:0 0 12px;transition:border-color .3s ease,color .3s ease}.rsvp-input-wrap input::placeholder{color:rgba(26,16,8,.42)}.rsvp-input-wrap .input-line{position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,#b18775,#755139);transform:scaleX(0);transform-origin:left;transition:transform .42s cubic-bezier(.22,.8,.3,1);pointer-events:none}.rsvp-input-wrap input:focus+.input-line,.rsvp-input-wrap input:not(:placeholder-shown)+.input-line{transform:scaleX(1)}.field-error{display:block;min-height:0;color:#a85f4d;font-size:12px;margin-top:6px;opacity:0;transform:translateY(-3px);transition:.25s ease}.rsvp-field.has-error .field-error{opacity:1;transform:none}.rsvp-field.has-error input{border-bottom-color:rgba(168,95,77,.42)}\n.attendance{display:grid;grid-template-columns:1fr 1fr;gap:16px}.attendance .attendance-choice{position:relative;height:66px;border-radius:16px;border:2px solid rgba(117,81,57,.14);background:rgba(255,255,255,.68);color:#9ca3af;font:600 18px 'DM Sans';cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;overflow:hidden;transition:transform .35s cubic-bezier(.22,.8,.3,1),border-color .35s ease,background .35s ease,color .35s ease,box-shadow .35s ease}.attendance .attendance-choice:before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,.65),transparent 70%);transform:translateX(-130%);transition:transform .65s ease}.attendance .attendance-choice:hover{transform:translateY(-3px);border-color:rgba(117,81,57,.3);color:#755139;box-shadow:0 10px 28px rgba(61,38,25,.075)}.attendance .attendance-choice:hover:before{transform:translateX(130%)}.attendance .attendance-choice.selected{border-color:#755139;background:rgba(117,81,57,.065);color:#755139;box-shadow:inset 0 0 0 1px rgba(117,81,57,.025)}.choice-mark{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(117,81,57,.18);font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1;transform:scale(.92);transition:transform .35s cubic-bezier(.2,.9,.25,1.25),background .3s ease,color .3s ease}.attendance-choice.selected .choice-mark{background:#755139;color:#fff;border-color:#755139;transform:scale(1)}.attendance-choice.choice-pop .choice-mark{animation:rsvpChoicePop .42s cubic-bezier(.18,.9,.28,1.25)}@keyframes rsvpChoicePop{0%{transform:scale(.65)}65%{transform:scale(1.18)}100%{transform:scale(1)}}\n.rsvp-card .submit{position:relative;border:0;border-radius:999px;background:linear-gradient(90deg,#755139,#8e6247,#755139);background-size:200% 100%;color:#fff;font:700 18px 'DM Sans';padding:16px 24px;min-height:58px;opacity:1;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:12px;box-shadow:0 12px 30px rgba(117,81,57,.17);transition:transform .35s cubic-bezier(.22,.8,.3,1),box-shadow .35s ease,opacity .3s ease,filter .3s ease,background-position .5s ease}.rsvp-card .submit:not(:disabled):hover{transform:translateY(-3px);box-shadow:0 18px 38px rgba(117,81,57,.24);background-position:100% 0}.rsvp-card .submit:not(:disabled):active{transform:translateY(0) scale(.988)}.rsvp-card .submit:disabled{opacity:.28;cursor:not-allowed;box-shadow:none;filter:saturate(.55)}.submit-arrow{font-size:22px;line-height:1;transition:transform .35s cubic-bezier(.22,.8,.3,1),opacity .25s ease}.submit:not(:disabled):hover .submit-arrow{transform:translateX(5px)}.rsvp-card.is-submitting .submit{pointer-events:none}.rsvp-card.is-submitting .submit-arrow{animation:rsvpSend 1s ease infinite}@keyframes rsvpSend{0%,100%{transform:translateX(0);opacity:.6}50%{transform:translateX(7px);opacity:1}}\n.rsvp-success{display:none;min-height:270px;align-items:center;justify-content:center;text-align:center;flex-direction:column;padding:12px 10px;opacity:0;transform:translateY(18px) scale(.98)}.rsvp-success .success-seal{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;margin-bottom:18px;border:1px solid rgba(177,135,117,.28);background:radial-gradient(circle at 35% 30%,#fff,#f5ebe5);box-shadow:0 12px 28px rgba(117,81,57,.12);position:relative}.rsvp-success .success-seal:before,.rsvp-success .success-seal:after{content:'';position:absolute;inset:7px;border:1px dashed rgba(177,135,117,.28);border-radius:50%}.rsvp-success .success-seal span{font-family:'Cormorant Garamond',serif;font-size:27px;color:#b18775;animation:sealBeat 1.6s ease-in-out infinite}@keyframes sealBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}.rsvp-success h3{font:700 34px/1.1 'Cormorant Garamond',serif;color:#1a1008;margin:7px 0 8px}.rsvp-success p{max-width:620px;color:#8e8179;font-size:15px;line-height:24px;margin:0 0 18px}.edit-rsvp{border:0;background:transparent;color:#755139;font:600 14px 'DM Sans';padding:8px 12px;cursor:pointer;text-decoration:underline;text-decoration-color:rgba(117,81,57,.28);text-underline-offset:4px;transition:color .25s ease,transform .25s ease}.edit-rsvp:hover{color:#b18775;transform:translateY(-1px)}.rsvp-card.is-success .rsvp-form-content{position:absolute;inset:40px;opacity:0;pointer-events:none;transform:translateY(-15px) scale(.985);filter:blur(3px)}.rsvp-card.is-success .rsvp-success{display:flex;animation:rsvpSuccessIn .7s cubic-bezier(.22,.8,.3,1) .18s forwards}@keyframes rsvpSuccessIn{to{opacity:1;transform:none}}.rsvp-card.is-success{border-color:rgba(177,135,117,.23);background:linear-gradient(180deg,#fff,rgba(250,247,244,.92))}\n.rsvp-petals{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3}.rsvp-petal{position:absolute;left:50%;top:52%;width:10px;height:15px;border-radius:70% 30% 70% 30%;background:var(--petal,#d5a18e);opacity:0;transform:translate(-50%,-50%) rotate(var(--r,0deg));animation:rsvpPetalBurst 1.45s cubic-bezier(.16,.68,.28,1) forwards;animation-delay:var(--delay,0s)}.rsvp-petal.flower{width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#f5dfbd 0 22%,var(--petal,#d9a492) 24% 48%,transparent 50%);box-shadow:8px 0 0 -3px var(--petal,#d9a492),-8px 0 0 -3px var(--petal,#d9a492),0 8px 0 -3px var(--petal,#d9a492),0 -8px 0 -3px var(--petal,#d9a492)}@keyframes rsvpPetalBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(.45) rotate(0)}10%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(1) rotate(var(--spin,220deg))}}\n@media(max-width:800px){.rsvp-card{padding:28px 20px}.attendance{grid-template-columns:1fr}.attendance .attendance-choice{height:60px;font-size:16px}.rsvp-card.is-success .rsvp-form-content{inset:28px 20px}.rsvp-success{min-height:330px}}\n@media(prefers-reduced-motion:reduce){.rsvp-section .rsvp-head,.rsvp-section .rsvp-card,.attendance .attendance-choice,.choice-mark,.rsvp-form-content,.rsvp-success,.submit,.submit-arrow{transition:none!important;animation:none!important}.rsvp-section .rsvp-head,.rsvp-section .rsvp-card{opacity:1!important;transform:none!important;filter:none!important}.rsvp-petal{display:none!important}}\n\n\n/* Registry & contacts scroll reveal */\n.registry-section .small-title,\n.registry-section .registry-row,\n.registry-section .contact-row{\n  opacity:0;\n  filter:blur(2px);\n  transition:opacity .72s cubic-bezier(.22,.8,.3,1),transform .78s cubic-bezier(.22,.8,.3,1),filter .65s ease;\n  will-change:transform,opacity;\n}\n.registry-section .two-col>div:first-child .small-title{transform:translate(-26px,18px)}\n.registry-section .two-col>div:last-child .small-title{transform:translate(26px,18px)}\n.registry-section .two-col>div:first-child .registry-row{transform:translate(-22px,20px) scale(.992)}\n.registry-section .two-col>div:last-child .contact-row{transform:translate(22px,20px) scale(.992)}\n.registry-section.is-visible .small-title,\n.registry-section.is-visible .registry-row,\n.registry-section.is-visible .contact-row{\n  opacity:1;\n  filter:blur(0);\n  transform:translate(0,0) scale(1)!important;\n}\n.registry-section.is-visible .two-col>div:first-child .small-title{transition-delay:.05s}\n.registry-section.is-visible .two-col>div:last-child .small-title{transition-delay:.11s}\n.registry-section.is-visible .registry-row:nth-of-type(2),\n.registry-section.is-visible .contact-row:nth-of-type(2){transition-delay:.18s}\n.registry-section.is-visible .registry-row:nth-of-type(3),\n.registry-section.is-visible .contact-row:nth-of-type(3){transition-delay:.29s}\n.registry-section.is-visible .registry-row:nth-of-type(4),\n.registry-section.is-visible .contact-row:nth-of-type(4){transition-delay:.40s}\n@media (prefers-reduced-motion:reduce){\n  .registry-section .small-title,.registry-section .registry-row,.registry-section .contact-row{\n    opacity:1!important;filter:none!important;transform:none!important;transition:none!important;\n  }\n}\n\n/* Intro envelope, music and language controls */\nhtml{scroll-behavior:smooth}body.intro-locked{overflow:hidden;height:100vh}.intro-gate{position:fixed;inset:0;z-index:9999;background:#1c110d;display:grid;place-items:center;overflow:hidden;transition:opacity .8s cubic-bezier(.22,.8,.3,1),visibility .8s ease}.intro-gate.is-finished{opacity:0;visibility:hidden;pointer-events:none}.intro-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#1c110d}.intro-gate:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(25,13,8,.08),rgba(25,13,8,.18) 70%,rgba(25,13,8,.42));pointer-events:none;transition:opacity .45s ease}.intro-gate.is-playing:after{opacity:0}.intro-start{position:absolute;inset:0;z-index:2;border:0;background:transparent;color:white;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:0 24px 54px;text-shadow:0 2px 16px rgba(20,10,7,.38);transition:opacity .45s ease}.intro-gate.is-playing .intro-start{opacity:0;pointer-events:none}.intro-start .intro-open-ring{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(255,255,255,.46);background:rgba(60,30,15,.18);backdrop-filter:blur(7px);box-shadow:0 8px 28px rgba(0,0,0,.14);margin-bottom:13px;animation:introPulse 1.9s ease-in-out infinite}.intro-open-ring svg{width:25px;height:25px;stroke:white;fill:none;stroke-width:1.4}.intro-start strong{font:600 14px/20px 'DM Sans',sans-serif;letter-spacing:2.8px;text-transform:uppercase}.intro-start small{font:400 12px/18px 'DM Sans',sans-serif;color:rgba(255,255,255,.68);margin-top:4px}@keyframes introPulse{0%,100%{transform:translateY(0) scale(1);box-shadow:0 8px 28px rgba(0,0,0,.14),0 0 0 0 rgba(255,255,255,.20)}50%{transform:translateY(-4px) scale(1.04);box-shadow:0 12px 32px rgba(0,0,0,.18),0 0 0 11px rgba(255,255,255,0)}}\n.floating-controls{position:fixed;left:22px;bottom:22px;z-index:9000;display:flex;align-items:center;gap:10px;direction:ltr;opacity:0;transform:translateY(14px);pointer-events:none;transition:opacity .45s ease,transform .45s cubic-bezier(.22,.8,.3,1)}.floating-controls.music-ready{opacity:1;transform:none;pointer-events:auto}.control-button{height:46px;border:1px solid rgba(117,81,57,.18);background:rgba(255,252,248,.91);backdrop-filter:blur(12px);color:#755139;box-shadow:0 9px 28px rgba(62,37,23,.10);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .28s ease,box-shadow .28s ease,background .28s ease}.control-button:hover{transform:translateY(-2px);box-shadow:0 13px 32px rgba(62,37,23,.14);background:#fff}.audio-toggle{width:46px;border-radius:50%;position:relative}.audio-toggle svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round}.audio-toggle .sound-off{display:none}.audio-toggle.is-muted .sound-on{display:none}.audio-toggle.is-muted .sound-off{display:block}.audio-toggle:after{content:'';position:absolute;inset:-1px;border-radius:inherit;border:1px solid rgba(177,135,117,.16);transform:scale(1);opacity:0}.audio-toggle:not(.is-muted):after{animation:musicAura 2.2s ease-out infinite}@keyframes musicAura{0%{opacity:.5;transform:scale(1)}100%{opacity:0;transform:scale(1.55)}}\n.language-picker{position:relative;opacity:0;transform:translateX(-8px);pointer-events:none;transition:opacity .4s ease .15s,transform .4s cubic-bezier(.22,.8,.3,1) .15s}.floating-controls.language-ready .language-picker{opacity:1;transform:none;pointer-events:auto}.language-toggle{min-width:76px;border-radius:23px;padding:0 15px;gap:8px;font:600 12px 'DM Sans',sans-serif;letter-spacing:1px}.language-toggle svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.5}.language-code{min-width:20px;text-align:center}.language-menu{position:absolute;left:0;bottom:56px;min-width:164px;padding:7px;border-radius:16px;border:1px solid rgba(117,81,57,.14);background:rgba(255,252,248,.97);backdrop-filter:blur(14px);box-shadow:0 18px 48px rgba(62,37,23,.14);opacity:0;transform:translateY(8px) scale(.97);transform-origin:bottom left;pointer-events:none;transition:.24s ease}.language-picker.open .language-menu{opacity:1;transform:none;pointer-events:auto}.language-option{width:100%;border:0;background:transparent;border-radius:11px;padding:10px 11px;display:flex;align-items:center;justify-content:space-between;gap:18px;cursor:pointer;color:#594337;font:500 13px 'DM Sans',sans-serif;text-align:left}.language-option:hover,.language-option.active{background:rgba(177,135,117,.09);color:#755139}.language-option b{font-size:11px;color:#b18775;letter-spacing:.8px}.language-option[data-lang=\"ar\"]{font-family:'Noto Sans Arabic',sans-serif;direction:rtl;text-align:right}\n/* Arabic layout inversion + RTL typography */\nhtml[dir=\"rtl\"] body{font-family:'Noto Sans Arabic','DM Sans',sans-serif;text-align:right}html[dir=\"rtl\"] .hero h1,html[dir=\"rtl\"] .hero-sub,html[dir=\"rtl\"] .section-title h2,html[dir=\"rtl\"] .rsvp-head h2,html[dir=\"rtl\"] .road-milestone h3,html[dir=\"rtl\"] .story-img strong,html[dir=\"rtl\"] .closing h2,html[dir=\"rtl\"] .closing blockquote,html[dir=\"rtl\"] .small-title h3{font-family:'Noto Naskh Arabic',serif}html[dir=\"rtl\"] .hero-kicker,html[dir=\"rtl\"] .eyebrow,html[dir=\"rtl\"] .road-milestone .place,html[dir=\"rtl\"] .rsvp-field label,html[dir=\"rtl\"] .rsvp-field legend{letter-spacing:0;text-transform:none}html[dir=\"rtl\"] .hero-copy,html[dir=\"rtl\"] .event-body,html[dir=\"rtl\"] .story-copy,html[dir=\"rtl\"] .small-title,html[dir=\"rtl\"] .road-milestone{text-align:right}html[dir=\"rtl\"] .event-grid,html[dir=\"rtl\"] .gallery{direction:rtl}html[dir=\"rtl\"] .event-image .tag,html[dir=\"rtl\"] .event-image h3{left:auto;right:16px}html[dir=\"rtl\"] .info-row{direction:rtl}html[dir=\"rtl\"] .story-scroll{flex-direction:row-reverse}html[dir=\"rtl\"] .story-img>div{left:auto;right:16px;text-align:right}html[dir=\"rtl\"] .two-col{direction:rtl}html[dir=\"rtl\"] .registry-row,html[dir=\"rtl\"] .contact-row{direction:rtl;text-align:right}html[dir=\"rtl\"] .rsvp-card,html[dir=\"rtl\"] .rsvp-form-content{text-align:right}html[dir=\"rtl\"] .rsvp-input-wrap input{font-family:'Noto Sans Arabic',sans-serif;text-align:right;direction:rtl}html[dir=\"rtl\"] .rsvp-input-wrap .input-line{transform-origin:right}html[dir=\"rtl\"] .attendance{direction:rtl}html[dir=\"rtl\"] .submit-arrow{transform:scaleX(-1)}html[dir=\"rtl\"] .submit:not(:disabled):hover .submit-arrow{transform:scaleX(-1) translateX(5px)}html[dir=\"rtl\"] .road-milestone.left{left:auto;right:1%;transform:translate(24px,calc(-50% + 22px))}html[dir=\"rtl\"] .road-milestone.right{right:auto;left:1%;transform:translate(-24px,calc(-50% + 22px))}html[dir=\"rtl\"] .road-milestone.left.active,html[dir=\"rtl\"] .road-milestone.right.active{transform:translate(0,-50%)}html[dir=\"rtl\"] .road-milestone.left:after{right:auto;left:-100px;transform:translateY(-50%) scaleX(-1)}html[dir=\"rtl\"] .road-milestone.right:after{left:auto;right:-100px;transform:translateY(-50%)}html[dir=\"rtl\"] .closing-inner{text-align:center}html[dir=\"rtl\"] .rsvp-success{text-align:center}\n@media(max-width:700px){.intro-start{padding-bottom:34px}.floating-controls{left:14px;bottom:14px}.language-menu{min-width:150px}.control-button{height:43px}.audio-toggle{width:43px}.language-toggle{min-width:70px}.intro-video{object-position:center}}\n@media(prefers-reduced-motion:reduce){.intro-open-ring,.audio-toggle:after{animation:none}.floating-controls,.language-picker,.intro-gate{transition:none}}\n\n\n/* Responsive pass — optimized for Figma Make previews, tablets and mobile */\nhtml,body,#root{width:100%;max-width:100%}body{overflow-x:hidden}img,video,svg{max-width:100%}p,h1,h2,h3,strong,small,span{overflow-wrap:anywhere}.hero-copy,.section,.section-title,.rsvp-head,.closing-inner{min-width:0}\n\n@media(max-width:1024px){\n  .hero{min-height:780px;height:min(895px,100svh);padding-inline:28px}\n  .hero h1{font-size:clamp(82px,12vw,124px)}\n  .section{padding:58px 28px}\n  .section-title h2,.rsvp-head h2{font-size:clamp(40px,5.2vw,48px);line-height:1.18}\n  .event-grid{gap:18px}\n  .road-stage{width:min(960px,calc(100vw - 32px))}\n  .road-milestone{width:32%;padding:16px 17px 18px}\n  .road-milestone h3{font-size:24px;line-height:28px}\n  .story-scroll{max-width:calc(100% - 32px)}\n  .gallery{gap:18px}\n  .gallery img{height:clamp(220px,24vw,288px)}\n  .two-col{gap:18px}\n}\n\n@media(max-width:720px){\n  :root{--mobile-pad:18px}\n  body{font-size:15px;-webkit-text-size-adjust:100%}\n  main{overflow:clip}\n\n  .hero{height:100svh;min-height:680px;max-height:none;padding:54px var(--mobile-pad) 92px;background-position:52% center}\n  .hero-copy{width:100%;max-width:430px}\n  .hero-kicker{max-width:320px;font-size:11px;line-height:17px;letter-spacing:3.6px;margin-bottom:13px}\n  .hero h1{font-size:clamp(58px,18vw,82px);line-height:.94;white-space:normal;margin-bottom:16px;text-wrap:balance}\n  .hero-sub{font-size:21px;line-height:27px;margin-bottom:22px;max-width:330px}\n  .hero-date{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:3px 0;max-width:330px;font-size:14px;line-height:21px;margin-bottom:22px}\n  .hero-date i{padding:0 6px}\n  .countdown{width:100%;justify-content:center;gap:clamp(12px,4vw,20px)}\n  .countdown-window{font-size:34px;line-height:48px;height:48px;min-width:34px}\n  .countdown-unit>span{font-size:10px;letter-spacing:.9px}\n  .scroll-note{bottom:max(24px,env(safe-area-inset-bottom));font-size:10px}\n\n  .section{width:100%;max-width:100%;padding:52px var(--mobile-pad)}\n  .section-title,.rsvp-head{margin-bottom:28px}\n  .eyebrow{font-size:11px;line-height:17px;letter-spacing:3.1px}\n  .eyebrow.left{font-size:10px;letter-spacing:2.8px}\n  .section-title h2,.rsvp-head h2{font-size:clamp(34px,10.5vw,42px);line-height:1.08;text-wrap:balance;margin-top:5px}\n  .ornament{gap:10px;margin-top:10px}\n  .ornament b{font-size:12px}\n\n  .event-grid{grid-template-columns:1fr;gap:16px}\n  .event-card{border-radius:20px}\n  .event-image{height:190px}\n  .event-image .tag{top:13px;left:13px;font-size:10px;letter-spacing:.9px;padding:4px 10px}\n  .event-image h3{left:14px;bottom:12px;font-size:21px}\n  .event-body{padding:18px;gap:11px}\n  .info-row{gap:10px}\n  .info-row strong{font-size:15px;line-height:21px}\n  .info-row small,.event-note{font-size:12.5px;line-height:19px}\n  .dress{margin-top:22px;flex-direction:column;gap:5px;text-align:center;padding:15px 16px;font-size:14px;line-height:20px}\n\n  .timeline-road-section{padding:52px 12px 70px;overflow:hidden}\n  .timeline-road-sticky>.section-title{margin-bottom:26px;padding:0 6px}\n  .road-stage{width:100%;max-width:390px;height:2050px;margin:0 auto;overflow:visible}\n  .road-stage:before{inset:0 43% 0 -14%;filter:blur(28px)}\n  .road-svg{inset:0;width:100%;height:100%;overflow:visible}\n  .road-shadow{stroke-width:116}\n  .road-verge{stroke-width:110}\n  .road-edge{stroke-width:102}\n  .road-surface{stroke-width:92}\n  .road-progress-halo{stroke-width:34;opacity:.72}\n  .road-travelled{stroke-width:22}\n  .road-center{stroke-width:2.2;stroke-dasharray:3 14}\n  .roadside-patch{display:none}\n  .road-milestone,.road-milestone.left,.road-milestone.right{left:auto;right:0;width:53%;max-width:none;padding:13px 13px 14px;border-radius:16px;transform:translate(14px,calc(-50% + 15px));box-shadow:0 10px 28px rgba(85,58,40,.045)}\n  .road-milestone.left.active,.road-milestone.right.active,.road-milestone.active{transform:translate(0,-50%)}\n  .road-milestone:after{display:none}\n  .road-milestone time{font-size:11px;margin-bottom:4px}\n  .road-milestone h3{font-size:19px;line-height:21px;margin-bottom:4px}\n  .road-milestone .place{font-size:8.5px;line-height:13px;letter-spacing:.45px;margin-bottom:5px}\n  .road-milestone p{font-size:10.5px;line-height:15px;max-width:none}\n  .road-stop{width:42px;height:42px;box-shadow:0 7px 20px rgba(92,65,48,.1),0 0 0 6px rgba(250,247,244,.9)}\n  .road-stop.active{box-shadow:0 9px 23px rgba(92,65,48,.16),0 0 0 7px rgba(250,247,244,.9)}\n  .road-stop:after{inset:5px}\n  .road-stop>span:first-child{font-size:15px}\n  .wedding-car{width:88px;filter:drop-shadow(0 12px 10px rgba(74,55,43,.22))}\n  .flower-burst .petal{width:8px;height:5px}\n  .flower-burst .blossom{font-size:15px}\n  .tiny-flower{font-size:11px}\n\n  .love-story{padding-top:52px;padding-bottom:52px}\n  .love-story>.section-title{padding:0 var(--mobile-pad)}\n  .story-scroll{width:100%;max-width:none;gap:14px;margin:0;overflow-x:auto;padding:0 calc((100vw - min(82vw,288px))/2) 14px;scroll-padding-inline:calc((100vw - min(82vw,288px))/2);scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;overscroll-behavior-inline:contain}\n  .story-card{flex:0 0 min(82vw,288px);width:min(82vw,288px);min-width:0;scroll-snap-align:center;border-radius:20px}\n  .story-img{height:190px}\n  .story-copy{padding:17px}\n  .story-copy h3{font-size:17px;line-height:22px}\n  .story-copy p{font-size:13px;line-height:20px}\n\n  .gallery-section{padding-inline:var(--mobile-pad)}\n  .gallery-section:before{top:120px;height:440px;width:100%}\n  .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n  .gallery img{height:auto;aspect-ratio:1/1;border-radius:13px}\n  .gallery img:nth-child(1),.gallery img:nth-child(6){grid-column:1/-1;aspect-ratio:16/9}\n\n  .rsvp-head p{font-size:13px;line-height:20px;margin:9px auto 12px;max-width:330px}\n  .rsvp-card{padding:24px 17px;border-radius:20px;gap:22px}\n  .rsvp-form-content{gap:22px}\n  .rsvp-field label,.rsvp-field legend{font-size:11px;letter-spacing:1px}\n  .rsvp-input-wrap input{font-size:16px;height:44px}\n  .attendance{grid-template-columns:1fr;gap:10px}\n  .attendance .attendance-choice{height:56px;min-height:56px;font-size:14px;border-radius:14px;padding:0 14px}\n  .rsvp-card .submit{font-size:15px;min-height:54px;padding:14px 18px}\n  .rsvp-card.is-success .rsvp-form-content{inset:24px 17px}\n  .rsvp-success{min-height:300px;padding:8px 4px}\n  .rsvp-success h3{font-size:30px}\n  .rsvp-success p{font-size:13px;line-height:21px}\n\n  .registry-section{padding-inline:var(--mobile-pad)}\n  .two-col{grid-template-columns:1fr;gap:34px;width:100%;max-width:none}\n  .small-title h3{font-size:29px;line-height:35px}\n  .small-title p{font-size:13px;line-height:20px}\n  .registry-row,.contact-row{border-radius:14px;margin-bottom:11px;padding:14px 15px;gap:11px;min-width:0}\n  .registry-row>div{min-width:0}\n  .registry-row strong,.contact-row strong{font-size:14px;line-height:19px}\n  .registry-row em{font-size:10px;padding:2px 6px}\n  .registry-row small,.contact-row small{font-size:11px;line-height:16px}\n  .registry-row>span,.contact-row>span{font-size:12px;white-space:nowrap}\n  .contact-row img,.avatar-placeholder{width:46px;height:46px;flex:0 0 46px}\n  .contact-row>div:nth-child(2){min-width:0}\n\n  .closing{height:auto;min-height:520px;padding:64px var(--mobile-pad);background-position:center}\n  .closing-inner{width:100%;max-width:420px}\n  .closing h2{font-size:clamp(54px,17vw,74px);line-height:.98;text-wrap:balance;margin:7px 0 15px}\n  .closing .ornament{width:92%;margin-bottom:18px}\n  .closing p{font-size:14px;line-height:22px;margin:0 auto 14px;max-width:350px}\n  .closing blockquote{font-size:16px;line-height:24px;max-width:340px;margin-inline:auto}\n\n  .intro-video{object-fit:contain;object-position:center;background:#1c110d}\n  .intro-start{padding:0 var(--mobile-pad) max(34px,calc(env(safe-area-inset-bottom) + 20px))}\n  .intro-start .intro-open-ring{width:58px;height:58px}\n  .intro-start strong{font-size:12px;letter-spacing:2.3px}\n  .intro-start small{text-align:center;font-size:11px}\n  .floating-controls{left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));gap:8px}\n  .control-button{height:42px}\n  .audio-toggle{width:42px}\n  .language-toggle{min-width:67px;padding:0 12px}\n  .language-menu{bottom:50px;min-width:148px;border-radius:14px}\n\n  html[dir=\"rtl\"] .road-milestone,html[dir=\"rtl\"] .road-milestone.left,html[dir=\"rtl\"] .road-milestone.right{right:auto;left:0;transform:translate(-14px,calc(-50% + 15px))}\n  html[dir=\"rtl\"] .road-milestone.left.active,html[dir=\"rtl\"] .road-milestone.right.active,html[dir=\"rtl\"] .road-milestone.active{transform:translate(0,-50%)}\n  html[dir=\"rtl\"] .story-scroll{padding-left:calc((100vw - min(82vw,288px))/2);padding-right:calc((100vw - min(82vw,288px))/2)}\n}\n\n@media(max-width:430px){\n  :root{--mobile-pad:16px}\n  .hero{min-height:650px;padding-top:46px;padding-bottom:84px}\n  .hero h1{font-size:clamp(54px,17.2vw,72px)}\n  .hero-sub{font-size:19px;line-height:25px}\n  .hero-date{font-size:13px;max-width:300px}\n  .countdown{gap:11px}\n  .countdown-window{font-size:31px;min-width:31px}\n  .section-title h2,.rsvp-head h2{font-size:clamp(32px,10.3vw,39px)}\n  .event-image{height:178px}\n  .road-stage{height:2050px}\n  .road-milestone,.road-milestone.left,.road-milestone.right{width:54%;padding:12px 11px 13px}\n  .road-milestone h3{font-size:18px;line-height:20px}\n  .road-milestone p{font-size:10px;line-height:14.5px}\n  .road-milestone .place{font-size:8px;line-height:12px}\n  .wedding-car{width:80px}\n  .road-stop{width:38px;height:38px}\n  .gallery{gap:8px}\n  .registry-row,.contact-row{align-items:flex-start;flex-wrap:wrap}\n  .registry-row>div{flex:1 1 160px}\n  .registry-row>span{margin-left:auto;align-self:center}\n  .contact-row>div:nth-child(2){flex:1 1 calc(100% - 62px)}\n  .contact-row>span{width:100%;padding-left:57px;margin-top:-5px}\n  html[dir=\"rtl\"] .contact-row>span{padding-left:0;padding-right:57px;text-align:right}\n  .closing{min-height:500px}\n}\n\n/* Mobile alignment + horizontal story carousel correction */\n@media(max-width:720px){\n  html,body,#root{width:100%;max-width:100%;overflow-x:hidden}\n  body{margin:0}\n  main{width:100%;max-width:100%;overflow-x:hidden;overflow-y:visible}\n\n  /* Keep one consistent content gutter on mobile. */\n  .section:not(.love-story),.gallery-section,.rsvp-section,.registry-section{padding-left:var(--mobile-pad);padding-right:var(--mobile-pad)}\n  .section-title,.rsvp-head{width:100%;max-width:100%;margin-left:auto;margin-right:auto;text-align:center}\n  .section-title .ornament,.rsvp-head .ornament{width:100%;max-width:100%;margin-left:auto;margin-right:auto}\n  .event-grid,.dress,.gallery,.rsvp-card,.two-col{width:100%;max-width:100%}\n\n  /* Love Story is intentionally full-bleed so cards can continue outside the frame. */\n  .love-story{width:100%;max-width:none;padding:50px 0 54px;overflow:visible}\n  .love-story>.section-title{width:100%;padding:0 var(--mobile-pad);margin:0 auto 26px}\n  .love-story>.section-title .ornament{width:100%}\n  .story-scroll{\n    display:flex;\n    flex-wrap:nowrap;\n    width:100vw;\n    max-width:100vw;\n    margin:0;\n    padding-top:8px;\n    padding-bottom:16px;\n    padding-left:calc((100vw - min(78vw,286px))/2);\n    padding-right:calc((100vw - min(78vw,286px))/2);\n    gap:14px;\n    overflow-x:auto;\n    overflow-y:hidden;\n    scroll-snap-type:x mandatory;\n    scroll-padding-left:calc((100vw - min(78vw,286px))/2);\n    scroll-padding-right:calc((100vw - min(78vw,286px))/2);\n    -webkit-overflow-scrolling:touch;\n    overscroll-behavior-x:contain;\n    touch-action:pan-x pan-y;\n    scrollbar-width:none;\n  }\n  .story-scroll::-webkit-scrollbar{display:none}\n  .story-card{\n    flex:0 0 min(78vw,286px);\n    width:min(78vw,286px);\n    min-width:min(78vw,286px);\n    max-width:min(78vw,286px);\n    scroll-snap-align:center;\n    scroll-snap-stop:always;\n    border-radius:20px;\n  }\n  .story-img{height:190px}\n  .story-copy{padding:17px 16px 18px}\n  .story-copy h3{margin-bottom:7px}\n\n  /* Prevent text/content from creating accidental off-screen alignment. */\n  .event-body,.story-copy,.rsvp-card,.small-title,.registry-row,.contact-row{min-width:0}\n  .event-body p,.story-copy p,.small-title p,.rsvp-head p,.closing p,.closing blockquote{max-width:100%}\n  .registry-row>span,.contact-row>span{max-width:100%}\n\n  /* Keep floating controls inside safe mobile gutters. */\n  .floating-controls{max-width:calc(100vw - 24px)}\n\n  html[dir=\"rtl\"] .love-story>.section-title{text-align:center}\n  html[dir=\"rtl\"] .story-scroll{\n    flex-direction:row-reverse;\n    padding-left:calc((100vw - min(78vw,286px))/2);\n    padding-right:calc((100vw - min(78vw,286px))/2);\n    scroll-padding-left:calc((100vw - min(78vw,286px))/2);\n    scroll-padding-right:calc((100vw - min(78vw,286px))/2);\n  }\n}\n\n@media(max-width:430px){\n  .love-story{padding-top:46px;padding-bottom:50px}\n  .love-story>.section-title{margin-bottom:22px}\n  .story-scroll{\n    padding-left:calc((100vw - min(79vw,282px))/2);\n    padding-right:calc((100vw - min(79vw,282px))/2);\n    scroll-padding-left:calc((100vw - min(79vw,282px))/2);\n    scroll-padding-right:calc((100vw - min(79vw,282px))/2);\n    gap:12px;\n  }\n  .story-card{\n    flex-basis:min(79vw,282px);\n    width:min(79vw,282px);\n    min-width:min(79vw,282px);\n    max-width:min(79vw,282px);\n  }\n  .story-img{height:188px}\n  .story-copy{padding:16px 15px 17px}\n\n  /* Tighter and more even mobile rhythm across the invitation. */\n  .section:not(.love-story),.gallery-section,.rsvp-section,.registry-section{padding-top:46px;padding-bottom:46px}\n  .section-title,.rsvp-head{margin-bottom:24px}\n  .event-grid{gap:14px}\n  .dress{margin-top:18px}\n  .gallery{gap:8px}\n  .two-col{gap:30px}\n}\n\n\n@media(hover:none),(pointer:coarse){\n  .event-card:hover,.story-card:hover,.gallery-section.is-visible .gallery img:hover,.control-button:hover,.rsvp-section.is-visible .rsvp-card:hover{transform:none!important;box-shadow:initial}\n  .event-card:hover .event-photo{transform:scale(1)}\n  .event-card:hover .event-image .tag,.event-card:hover .event-image h3{transform:none}\n}\n/* ============================================================\n   Responsive system v3 — fluid desktop, tablet, large phones\n   This block intentionally comes last so it normalizes all\n   previous fixed-width export rules without changing the design.\n   ============================================================ */\n:root{\n  --content-max:1182px;\n  --page-gutter:clamp(16px,3vw,40px);\n  --section-space:clamp(48px,5vw,72px);\n}\nhtml,body,#root{width:100%;max-width:100%;min-width:0}\nbody{overflow-x:hidden}\nmain{width:100%;max-width:100%;overflow-x:clip}\nimg,video,svg{max-width:100%}\n.section,.gallery-section,.rsvp-section,.registry-section{min-width:0}\n.section{\n  width:100%;\n  max-width:calc(var(--content-max) + (var(--page-gutter) * 2));\n  padding:var(--section-space) var(--page-gutter);\n}\n.section-title,.rsvp-head{width:100%;max-width:var(--content-max);margin-left:auto;margin-right:auto}\n.section-title h2,.rsvp-head h2{font-size:clamp(38px,3.7vw,48px);line-height:1.18;text-wrap:balance}\n.eyebrow{font-size:clamp(11px,1vw,14px);letter-spacing:clamp(3px,.38vw,4.9px)}\n.ornament{min-width:0}\n\n/* Hero scales continuously instead of waiting for a mobile breakpoint. */\n.hero{\n  min-height:clamp(720px,69vw,895px);\n  height:min(895px,100svh);\n  padding-left:var(--page-gutter);\n  padding-right:var(--page-gutter);\n  padding-bottom:clamp(70px,7vw,88px);\n}\n.hero-copy{width:min(100%,1050px);min-width:0}\n.hero-kicker{font-size:clamp(11px,1.05vw,14px);letter-spacing:clamp(3.6px,.55vw,7px)}\n.hero h1{font-size:clamp(78px,10.25vw,144px);line-height:.98;max-width:100%;white-space:normal;text-wrap:balance}\n.hero-sub{font-size:clamp(20px,1.9vw,24px);line-height:1.3}\n.hero-date{font-size:clamp(14px,1.4vw,18px);max-width:100%;text-wrap:balance}\n.countdown{gap:clamp(14px,1.9vw,24px)}\n.countdown-window{font-size:clamp(34px,3.1vw,40px);line-height:clamp(48px,4.6vw,60px);height:clamp(48px,4.6vw,60px)}\n\n/* Ceremony cards stay balanced from 4K down to compact desktop. */\n.event-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,1.8vw,24px)}\n.event-card,.event-body,.info-row{min-width:0}\n.event-image{height:clamp(190px,16vw,208px)}\n.event-body{padding:clamp(18px,1.9vw,24px)}\n.event-note,.info-row small{overflow-wrap:anywhere}\n.dress{padding:clamp(16px,1.6vw,20px) clamp(18px,2.5vw,32px);margin-top:clamp(24px,3vw,40px);flex-wrap:wrap}\n\n/* Desktop road also scales at intermediate desktop widths. */\n.timeline-road-section{padding:var(--section-space) var(--page-gutter) clamp(84px,8vw,118px)}\n.timeline-road-sticky>.section-title{max-width:var(--content-max);margin-bottom:clamp(34px,4vw,48px)}\n.road-stage{width:min(1240px,calc(100vw - (var(--page-gutter) * 2)));height:clamp(1500px,126vw,1640px)}\n.road-milestone{width:clamp(260px,28vw,365px);max-width:31%;padding:clamp(15px,1.5vw,18px) clamp(16px,1.6vw,20px) clamp(17px,1.7vw,20px)}\n.road-milestone h3{font-size:clamp(22px,2.1vw,27px);line-height:1.15}\n.road-milestone p{font-size:clamp(11.5px,1vw,13px);line-height:1.5}\n.road-milestone:after{width:clamp(56px,7vw,92px)}\n.road-milestone.left:after{right:calc(clamp(56px,7vw,92px) * -1 - 8px)}\n.road-milestone.right:after{left:calc(clamp(56px,7vw,92px) * -1 - 8px)}\n.wedding-car{width:clamp(136px,13.7vw,178px)}\n\n/* Love Story is always allowed to scroll when the five cards do not fit. */\n.love-story{width:100%;max-width:none;overflow:hidden;padding-left:0;padding-right:0}\n.love-story>.section-title{max-width:calc(var(--content-max) + (var(--page-gutter) * 2));padding-left:var(--page-gutter);padding-right:var(--page-gutter)}\n.story-scroll{\n  display:flex;\n  flex-wrap:nowrap;\n  width:max-content;\n  max-width:calc(100vw - (var(--page-gutter) * 2));\n  gap:clamp(16px,1.8vw,24px);\n  margin:0 auto;\n  padding:8px 2px 16px;\n  overflow-x:auto;\n  overflow-y:hidden;\n  scroll-snap-type:x proximity;\n  scroll-padding-inline:var(--page-gutter);\n  -webkit-overflow-scrolling:touch;\n  overscroll-behavior-x:contain;\n  scrollbar-width:none;\n}\n.story-scroll::-webkit-scrollbar{display:none}\n.story-card{\n  flex:0 0 clamp(252px,21.7vw,288px);\n  width:clamp(252px,21.7vw,288px);\n  min-width:clamp(252px,21.7vw,288px);\n  scroll-snap-align:center;\n}\n.story-img{height:clamp(188px,16vw,208px)}\n.story-copy{padding:clamp(17px,1.55vw,20px)}\n\n/* Gallery uses fluid image height and switches column count by usable width. */\n.gallery-section{padding-left:var(--page-gutter);padding-right:var(--page-gutter)}\n.gallery-section>.section-title,.gallery{width:100%;max-width:var(--content-max)}\n.gallery{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,1.8vw,24px)}\n.gallery img{height:clamp(220px,22vw,288px);min-width:0}\n\n/* RSVP + registry widths are fluid at intermediate desktop sizes. */\n.rsvp-section{width:100%;max-width:calc(1180px + (var(--page-gutter) * 2))}\n.rsvp-card{padding:clamp(26px,3vw,40px);gap:clamp(22px,2.2vw,28px);min-width:0}\n.rsvp-form-content{min-width:0}\n.attendance{grid-template-columns:repeat(2,minmax(0,1fr))}\n.registry-section{padding-left:var(--page-gutter);padding-right:var(--page-gutter)}\n.two-col{width:100%;max-width:var(--content-max);grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,2vw,24px)}\n.registry-row,.contact-row{min-width:0;gap:clamp(10px,1.2vw,16px)}\n.registry-row>div,.contact-row>div:nth-child(2){min-width:0}\n.registry-row>span,.contact-row>span{flex:0 0 auto;max-width:42%;overflow-wrap:anywhere;text-align:end}\n.small-title p{overflow-wrap:anywhere}\n.closing{min-height:clamp(460px,38vw,520px);height:auto;padding:clamp(50px,5vw,70px) var(--page-gutter)}\n.closing-inner{width:100%;max-width:var(--content-max)}\n.closing h2{font-size:clamp(58px,6.2vw,80px);line-height:1.12;text-wrap:balance}\n.closing p{font-size:clamp(15px,1.4vw,18px);line-height:1.55;max-width:1000px;margin-left:auto;margin-right:auto}\n.closing blockquote{font-size:clamp(16px,1.45vw,19.2px);line-height:1.45}\n\n/* Compact desktop / small laptop: 1025–1280 */\n@media (min-width:1025px) and (max-width:1280px){\n  :root{--page-gutter:clamp(26px,3vw,36px)}\n  .hero{min-height:760px;height:min(860px,100svh);background-position:50% center}\n  .hero h1{font-size:clamp(100px,9.5vw,122px)}\n  .section-title h2,.rsvp-head h2{font-size:clamp(42px,3.8vw,48px)}\n  .road-stage{height:clamp(1480px,128vw,1600px)}\n  .road-milestone{max-width:30%;width:clamp(270px,27vw,340px)}\n  .story-card{flex-basis:clamp(248px,21.5vw,278px);width:clamp(248px,21.5vw,278px);min-width:clamp(248px,21.5vw,278px)}\n  .gallery img{height:clamp(220px,21vw,270px)}\n}\n\n/* Tablet + large phone landscape: use the compact road and real tablet layouts. */\n@media (min-width:721px) and (max-width:900px){\n  :root{--page-gutter:clamp(24px,4vw,34px);--section-space:clamp(50px,6vw,62px)}\n  .hero{min-height:700px;height:min(800px,100svh);padding-top:30px;padding-bottom:82px;background-position:52% center}\n  .hero-copy{max-width:680px}\n  .hero h1{font-size:clamp(72px,11.5vw,96px)}\n  .hero-sub{font-size:clamp(20px,2.8vw,23px)}\n  .hero-date{display:flex;flex-wrap:wrap;justify-content:center;line-height:1.5}\n  .section{max-width:100%;padding-left:var(--page-gutter);padding-right:var(--page-gutter)}\n  .section-title h2,.rsvp-head h2{font-size:clamp(38px,5.4vw,46px)}\n\n  .event-grid{grid-template-columns:1fr;max-width:680px;margin-left:auto;margin-right:auto;gap:18px}\n  .event-image{height:clamp(210px,31vw,250px)}\n  .dress{max-width:680px;margin-left:auto;margin-right:auto}\n\n  .timeline-road-section{padding-left:var(--page-gutter);padding-right:var(--page-gutter);overflow:hidden}\n  .timeline-road-sticky>.section-title{margin-bottom:30px}\n  .road-stage{width:100%;max-width:760px;height:2100px;margin:0 auto}\n  .road-stage:before{inset:0 46% 0 -10%;filter:blur(30px)}\n  .road-shadow{stroke-width:120}.road-verge{stroke-width:114}.road-edge{stroke-width:106}.road-surface{stroke-width:96}\n  .road-progress-halo{stroke-width:36}.road-travelled{stroke-width:23}.road-center{stroke-width:2.4;stroke-dasharray:3 15}\n  .roadside-patch{display:none}\n  .road-milestone,.road-milestone.left,.road-milestone.right{\n    left:auto;right:0;width:50%;max-width:360px;padding:15px 16px 16px;border-radius:18px;\n    transform:translate(18px,calc(-50% + 16px));\n  }\n  .road-milestone.active,.road-milestone.left.active,.road-milestone.right.active{transform:translate(0,-50%)}\n  .road-milestone:after{display:none}\n  .road-milestone h3{font-size:clamp(20px,3.1vw,25px)}\n  .road-milestone p{font-size:clamp(11px,1.55vw,13px);line-height:1.5}\n  .road-milestone .place{font-size:10px;line-height:1.4}\n  .wedding-car{width:clamp(100px,15vw,126px)}\n  .road-stop{width:46px;height:46px}\n  html[dir=\"rtl\"] .road-milestone,html[dir=\"rtl\"] .road-milestone.left,html[dir=\"rtl\"] .road-milestone.right{right:auto;left:0;transform:translate(-18px,calc(-50% + 16px))}\n  html[dir=\"rtl\"] .road-milestone.active,html[dir=\"rtl\"] .road-milestone.left.active,html[dir=\"rtl\"] .road-milestone.right.active{transform:translate(0,-50%)}\n\n  .love-story{padding-top:var(--section-space);padding-bottom:var(--section-space)}\n  .love-story>.section-title{padding-left:var(--page-gutter);padding-right:var(--page-gutter)}\n  .story-scroll{\n    width:100vw;max-width:100vw;margin:0;\n    padding-left:clamp(28px,6vw,54px);padding-right:clamp(28px,6vw,54px);\n    scroll-padding-left:clamp(28px,6vw,54px);scroll-padding-right:clamp(28px,6vw,54px);\n    gap:18px;\n  }\n  .story-card{flex:0 0 clamp(270px,39vw,320px);width:clamp(270px,39vw,320px);min-width:clamp(270px,39vw,320px)}\n  .story-img{height:clamp(196px,27vw,220px)}\n\n  .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n  .gallery img{height:auto;aspect-ratio:1.25/1}\n\n  .two-col{grid-template-columns:1fr;max-width:720px;gap:38px}\n  .rsvp-card{max-width:760px;margin-left:auto;margin-right:auto}\n  .closing h2{font-size:clamp(56px,8.4vw,72px)}\n  .intro-video{object-fit:contain;background:#1c110d}\n}\n\n/* Tablet portrait around iPad Mini widths. */\n@media (min-width:721px) and (max-width:820px){\n  .event-grid{max-width:640px}\n  .road-stage{max-width:700px}\n  .road-milestone,.road-milestone.left,.road-milestone.right{width:52%;max-width:340px}\n  .gallery{gap:12px}\n  .registry-row>span,.contact-row>span{max-width:38%}\n}\n\n/* Large phones / foldables: keep two-column gallery but fix spacing and widths. */\n@media (min-width:521px) and (max-width:720px){\n  :root{--mobile-pad:clamp(20px,4.6vw,28px);--page-gutter:var(--mobile-pad);--section-space:clamp(48px,8vw,58px)}\n  .hero{min-height:680px;padding-left:var(--mobile-pad);padding-right:var(--mobile-pad)}\n  .hero h1{font-size:clamp(64px,14vw,82px)}\n  .section:not(.love-story),.gallery-section,.rsvp-section,.registry-section{padding-left:var(--mobile-pad);padding-right:var(--mobile-pad)}\n  .event-grid{max-width:560px;margin-left:auto;margin-right:auto}\n  .event-image{height:clamp(190px,34vw,230px)}\n  .dress{max-width:560px;margin-left:auto;margin-right:auto}\n  .road-stage{max-width:500px;height:2050px}\n  .road-milestone,.road-milestone.left,.road-milestone.right{width:51%;padding:14px 14px 15px}\n  .road-milestone h3{font-size:clamp(19px,4vw,22px)}\n  .road-milestone p{font-size:clamp(10.5px,2.1vw,12px)}\n  .wedding-car{width:clamp(86px,18vw,104px)}\n  .love-story>.section-title{padding-left:var(--mobile-pad);padding-right:var(--mobile-pad)}\n  .story-scroll{padding-left:calc((100vw - min(72vw,310px))/2);padding-right:calc((100vw - min(72vw,310px))/2);scroll-padding-left:calc((100vw - min(72vw,310px))/2);scroll-padding-right:calc((100vw - min(72vw,310px))/2)}\n  .story-card{flex-basis:min(72vw,310px);width:min(72vw,310px);min-width:min(72vw,310px);max-width:min(72vw,310px)}\n  .story-img{height:clamp(190px,39vw,215px)}\n  .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n  .gallery img{height:auto;aspect-ratio:1/1}\n  .gallery img:nth-child(1),.gallery img:nth-child(6){grid-column:1/-1;aspect-ratio:16/9}\n  .two-col{max-width:560px;margin-left:auto;margin-right:auto}\n  .rsvp-card{max-width:600px;margin-left:auto;margin-right:auto}\n}\n\n/* Standard phones */\n@media (max-width:520px){\n  :root{--mobile-pad:clamp(15px,4.5vw,20px);--page-gutter:var(--mobile-pad);--section-space:clamp(44px,12vw,52px)}\n  .hero{min-height:650px;padding-top:44px;padding-left:var(--mobile-pad);padding-right:var(--mobile-pad);padding-bottom:84px}\n  .hero-copy{max-width:100%}\n  .hero-kicker{max-width:90%;letter-spacing:clamp(2.8px,.9vw,3.6px)}\n  .hero h1{font-size:clamp(52px,16vw,72px);line-height:.95}\n  .hero-sub{font-size:clamp(18px,5.1vw,20px);line-height:1.3;max-width:92%}\n  .hero-date{font-size:clamp(12.5px,3.6vw,14px);max-width:92%;gap:2px 0}\n  .countdown{gap:clamp(9px,3.1vw,14px)}\n  .countdown-window{font-size:clamp(29px,8.5vw,33px);min-width:30px}\n  .section:not(.love-story),.gallery-section,.rsvp-section,.registry-section{padding-top:var(--section-space);padding-bottom:var(--section-space)}\n  .section-title,.rsvp-head{margin-bottom:24px}\n  .section-title h2,.rsvp-head h2{font-size:clamp(31px,9.7vw,39px);line-height:1.08}\n  .ornament{margin-top:9px}\n  .event-image{height:clamp(170px,50vw,195px)}\n  .event-body{padding:clamp(16px,4.7vw,19px)}\n  .info-row strong{font-size:14.5px}\n  .info-row small,.event-note{font-size:12px;line-height:1.55}\n  .dress{font-size:13.5px;padding:14px 14px}\n  .timeline-road-section{padding-left:10px;padding-right:10px}\n  .road-stage{width:100%;max-width:430px;height:2050px}\n  .road-milestone,.road-milestone.left,.road-milestone.right{width:54%;padding:12px 11px 13px}\n  .road-milestone h3{font-size:clamp(17px,5vw,19px);line-height:1.12}\n  .road-milestone p{font-size:clamp(9.5px,2.8vw,10.5px);line-height:1.45}\n  .road-milestone .place{font-size:8px;line-height:1.4}\n  .wedding-car{width:clamp(76px,22vw,88px)}\n  .story-scroll{gap:12px;padding-left:calc((100vw - min(78vw,286px))/2);padding-right:calc((100vw - min(78vw,286px))/2);scroll-padding-left:calc((100vw - min(78vw,286px))/2);scroll-padding-right:calc((100vw - min(78vw,286px))/2)}\n  .story-card{flex-basis:min(78vw,286px);width:min(78vw,286px);min-width:min(78vw,286px);max-width:min(78vw,286px)}\n  .story-img{height:clamp(180px,52vw,195px)}\n  .story-copy{padding:16px}\n  .gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n  .gallery img{height:auto;aspect-ratio:1/1;border-radius:12px}\n  .gallery img:nth-child(1),.gallery img:nth-child(6){grid-column:1/-1;aspect-ratio:16/9}\n  .rsvp-card{padding:22px 16px}\n  .attendance{grid-template-columns:1fr;gap:9px}\n  .two-col{gap:30px}\n  .registry-row,.contact-row{padding:13px 14px}\n  .registry-row{align-items:flex-start;flex-wrap:wrap}\n  .registry-row>div{flex:1 1 160px}\n  .registry-row>span{max-width:none;margin-left:auto;align-self:center}\n  .contact-row{align-items:flex-start;flex-wrap:wrap}\n  .contact-row>div:nth-child(2){flex:1 1 calc(100% - 60px)}\n  .contact-row>span{width:100%;max-width:none;padding-left:57px;margin-top:-4px;text-align:left}\n  html[dir=\"rtl\"] .contact-row>span{padding-left:0;padding-right:57px;text-align:right}\n  .closing{min-height:490px;padding-left:var(--mobile-pad);padding-right:var(--mobile-pad)}\n  .closing h2{font-size:clamp(50px,15vw,68px)}\n  .floating-controls{max-width:calc(100vw - 20px)}\n}\n\n/* Extra-small phones: prevent cramped controls/text without changing composition. */\n@media (max-width:360px){\n  :root{--mobile-pad:14px}\n  .hero{min-height:620px;padding-top:38px;padding-bottom:80px}\n  .hero h1{font-size:clamp(47px,15.4vw,56px)}\n  .hero-sub{font-size:17px}\n  .hero-date{font-size:12px}\n  .countdown{gap:7px}\n  .countdown-window{font-size:27px;min-width:27px}\n  .countdown-unit>span{font-size:9px;letter-spacing:.7px}\n  .section-title h2,.rsvp-head h2{font-size:clamp(29px,9.7vw,34px)}\n  .event-image{height:164px}\n  .road-milestone,.road-milestone.left,.road-milestone.right{width:55%;padding:11px 9px 12px}\n  .road-milestone h3{font-size:16px}\n  .road-milestone p{font-size:9px}\n  .road-stop{width:36px;height:36px}\n  .wedding-car{width:74px}\n  .story-scroll{padding-left:calc((100vw - min(80vw,272px))/2);padding-right:calc((100vw - min(80vw,272px))/2);scroll-padding-left:calc((100vw - min(80vw,272px))/2);scroll-padding-right:calc((100vw - min(80vw,272px))/2)}\n  .story-card{flex-basis:min(80vw,272px);width:min(80vw,272px);min-width:min(80vw,272px);max-width:min(80vw,272px)}\n  .gallery{gap:7px}\n  .rsvp-card{padding:20px 14px}\n  .registry-row>div{flex-basis:145px}\n  .control-button{height:40px}.audio-toggle{width:40px}.language-toggle{min-width:64px;padding:0 10px}\n}\n\n/* Short landscape screens: keep the hero usable when height is the limiting axis. */\n@media (max-height:700px) and (min-width:721px){\n  .hero{min-height:620px;height:100svh;padding-top:28px;padding-bottom:70px}\n  .hero h1{font-size:clamp(72px,9vw,108px)}\n  .hero-sub{margin-bottom:18px}\n  .hero-date{margin-bottom:18px}\n  .scroll-note{bottom:20px}\n}\n";

const ROAD_D = 'M610 92 C830 108 860 250 710 346 C592 422 430 438 468 592 C505 738 790 730 792 892 C794 1045 560 1062 500 1192 C432 1340 650 1402 636 1570';
const MOBILE_ROAD_D = 'M76 80 C118 155 120 285 64 360 C34 420 42 565 104 650 C132 720 116 860 58 940 C30 1010 38 1155 102 1245 C130 1320 112 1455 56 1545 C30 1625 38 1790 84 1990';
const MOBILE_ROAD_D_RTL = 'M314 80 C272 155 270 285 326 360 C356 420 348 565 286 650 C258 720 274 860 332 940 C360 1010 352 1155 288 1245 C260 1320 278 1455 334 1545 C360 1625 352 1790 306 1990';
const ROAD_THRESHOLDS = [0.055, 0.27, 0.505, 0.72, 0.94];

type TFn = (key: string) => string;
type Attendance = 'accept' | 'decline';
type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, visible]);
  return { ref, visible };
}

function Ornament({ light = false }: { light?: boolean }) {
  return (
    <div className={`ornament${light ? ' light' : ''}`}>
      <span />
      <b>♥</b>
      <span />
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <Ornament />
    </div>
  );
}

function Countdown({ t }: { t: TFn }) {
  const [values, setValues] = useState({ days: 0, hours: 0, mins: 0, sec: 0 });
  useEffect(() => {
    const target = new Date('2026-09-18T17:00:00+03:00').getTime();
    const tick = () => {
      const remaining = Math.max(0, target - Date.now());
      const total = Math.floor(remaining / 1000);
      setValues({
        days: Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        mins: Math.floor((total % 3600) / 60),
        sec: total % 60,
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units: Array<[keyof typeof values, string]> = [
    ['days', 'Days'],
    ['hours', 'Hours'],
    ['mins', 'Mins'],
    ['sec', 'Sec'],
  ];

  return (
    <div
      className="countdown"
      aria-label={`${values.days} ${t('Days')}, ${values.hours} ${t('Hours')}, ${values.mins} ${t('Mins')}, ${values.sec} ${t('Sec')}`}
    >
      {units.map(([key, label]) => (
        <div className="countdown-unit" key={key}>
          <span className="countdown-window">
            <span className="countdown-number" key={`${String(key)}-${values[key]}`}>
              {String(values[key]).padStart(2, '0')}
            </span>
          </span>
          <span>{t(label)}</span>
        </div>
      ))}
    </div>
  );
}

function IntroGate({
  started,
  finished,
  visible,
  onStart,
  onFinish,
  videoRef,
}: {
  started: boolean;
  finished: boolean;
  visible: boolean;
  onStart: () => void;
  onFinish: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  if (!visible) return null;
  return (
    <div
      className={`intro-gate${started ? ' is-playing' : ''}${finished ? ' is-finished' : ''}`}
      aria-label="Open the wedding invitation"
    >
      <video
        className="intro-video"
        ref={videoRef}
        preload="auto"
        playsInline
        poster={asset('envelope-first.webp')}
        onEnded={onFinish}
        onError={() => started && onFinish()}
      >
        <source src={asset('wedding-card.mp4')} type="video/mp4" />
      </video>
      <button className="intro-start" type="button" aria-label="Tap to open the wedding invitation" onClick={onStart}>
        <span className="intro-open-ring" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3.5 7.5 12 14l8.5-6.5M4.5 6h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          </svg>
        </span>
        <strong>Tap to open</strong>
        <small>John &amp; Maria · September 18, 2026</small>
      </button>
    </div>
  );
}

function FloatingControls({
  started,
  finished,
  muted,
  onToggleMute,
  lang,
  onLanguage,
}: {
  started: boolean;
  finished: boolean;
  muted: boolean;
  onToggleMute: () => void;
  lang: Language;
  onLanguage: (lang: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className={`floating-controls${started ? ' music-ready' : ''}${finished ? ' language-ready' : ''}`}>
      <button
        className={`control-button audio-toggle${muted ? ' is-muted' : ''}`}
        type="button"
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        onClick={onToggleMute}
      >
        <svg className="sound-on" viewBox="0 0 24 24">
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
          <path d="M15 9.2a4 4 0 0 1 0 5.6M17.5 6.8a7.4 7.4 0 0 1 0 10.4" />
        </svg>
        <svg className="sound-off" viewBox="0 0 24 24">
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
          <path d="m16 10 5 5m0-5-5 5" />
        </svg>
      </button>

      <div className={`language-picker${open ? ' open' : ''}`} ref={pickerRef}>
        <button
          className="control-button language-toggle"
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Change invitation language"
          onClick={(event) => {
            event.stopPropagation();
            setOpen((value) => !value);
          }}
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.4 2.45 3.6 5.45 3.6 9S14.4 18.55 12 21M12 3C9.6 5.45 8.4 8.45 8.4 12S9.6 18.55 12 21" />
          </svg>
          <span className="language-code">{lang.toUpperCase()}</span>
        </button>
        <div className="language-menu" role="menu">
          {([
            ['en', 'English', 'EN'],
            ['fr', 'Français', 'FR'],
            ['ar', 'العربية', 'AR'],
          ] as const).map(([code, label, short]) => (
            <button
              className={`language-option${lang === code ? ' active' : ''}`}
              type="button"
              data-lang={code}
              role="menuitem"
              key={code}
              onClick={() => {
                onLanguage(code);
                setOpen(false);
              }}
            >
              <span>{label}</span>
              <b>{short}</b>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ t }: { t: TFn }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,.1),rgba(0,0,0,.5) 60%,rgba(10,6,4,.9)),url('${asset('hero.webp')}')`,
      }}
    >
      <div className="hero-copy">
        <div className="hero-kicker">{t('Together with their families')}</div>
        <h1>{t('John & Maria')}</h1>
        <div className="hero-sub">{t('invite you to witness their union')}</div>
        <div className="hero-date">
          {t('Friday, September 18')} <i>·</i> 2026 <i>·</i> {t('Château Rmeish')}
        </div>
        <Countdown t={t} />
      </div>
      <div className="scroll-note">
        {t('Scroll')}
        <span>↓</span>
      </div>
    </section>
  );
}

const ceremonyCards = [
  {
    image: 'hands.webp',
    tag: 'Holy Matrimony',
    title: 'Church Ceremony',
    place: 'Saint Joseph Cathedral',
    location: 'Achrafieh, Beirut',
    time: '5:00 PM',
    note: 'Guest seating begins at 4:30 PM. Doors close at 5:15.',
  },
  {
    image: 'reception-table.webp',
    tag: 'Evening Reception',
    title: 'Dinner & Celebration',
    place: 'Château Rmeish & Gardens',
    location: 'Rmeish, South Lebanon',
    time: '7:00 PM',
    note: 'Cocktail hour begins at 7:00 PM. Dinner served at 8:30 PM.',
  },
];

function Ceremony({ t }: { t: TFn }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section className={`section ceremony${visible ? ' is-visible' : ''}`} ref={ref}>
      <SectionTitle eyebrow={t('The Events')} title={t('Ceremony & Reception')} />
      <div className="event-grid">
        {ceremonyCards.map((card) => (
          <article className="event-card" key={card.title}>
            <div className="event-image">
              <div className="event-photo" style={{ backgroundImage: `url('${asset(card.image)}')` }} />
              <span className="tag">{t(card.tag)}</span>
              <h3>{t(card.title)}</h3>
            </div>
            <div className="event-body">
              <div className="info-row">
                <span className="mini-icon">●</span>
                <div>
                  <strong>{t(card.place)}</strong>
                  <small>{t(card.location)}</small>
                </div>
              </div>
              <div className="info-row">
                <span className="mini-icon">◷</span>
                <strong>{t(card.time)}</strong>
              </div>
              <p className="event-note">{t(card.note)}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="dress">
        <strong>{t('Dress Code:')}</strong>
        <span>{t('Black Tie · Formal Elegance · Neutral & Mocha Tones')}</span>
      </div>
    </section>
  );
}

const roadEvents = [
  {
    time: '15:30',
    title: "Welcome at Bride's Home",
    place: "Maria's Residence, Achrafieh",
    description: 'Gather with the family for warm greetings, floral arrangements, and a traditional toast before the ceremony begins.',
    side: 'left',
  },
  {
    time: '17:00',
    title: 'Church Ceremony',
    place: 'Saint Joseph Cathedral',
    description: 'Exchange of sacred vows and the holy matrimonial crowning. A moment of prayer, love, and lifelong commitment.',
    side: 'right',
  },
  {
    time: '19:00',
    title: 'Sunset Cocktail Hour',
    place: 'Château Rmeish Open Terrace',
    description: "Artisan hors d'oeuvres, handcrafted cocktails, and a live saxophone serenade as the sun sets over the mountains.",
    side: 'left',
  },
  {
    time: '20:30',
    title: 'Grand Entrance & Dinner',
    place: 'Château Main Ballroom',
    description: 'The newlyweds enter to applause. A multi-course seated dinner follows, complete with toasts and the first dance.',
    side: 'right',
  },
  {
    time: '22:00',
    title: 'Cake Cutting & Celebration',
    place: 'Château Garden',
    description: 'Five-tier custom cake ceremony followed by dancing, fireworks, and celebration late into the evening.',
    side: 'left',
  },
] as const;

const petalVectors = [
  [72, -18, -170], [75.6, 8.3, -87], [69, 36.6, -4], [51.6, 62.9, 79], [64.8, 63.3, 162], [37.2, 87.6, -95], [0.5, 102, -12], [-23.3, 50.1, 71],
  [-17.8, 60, 154], [-46.7, 56.6, -103], [-74.8, 42.2, -20], [-97.9, 17, 63], [-100.9, 30.6, 146], [-119.2, -4.3, -111], [-70.3, -33.7, -28], [-68, -60.1, 55],
  [-79.3, -56.2, 138], [-68, -85.7, -119], [-45.5, -111.5, -36], [-13.3, -129.2, 47], [-26.7, -135, 130], [7.9, -89.6, -127], [34.4, -90.2, -44], [61.8, -80.6, 39],
  [59.9, -93.1, 122], [87.9, -73.5, -135], [109.1, -43.4, -52], [119.3, -5.4, 31],
] as const;
const blossomVectors = [[-10, -70], [-48, -35], [43, -42], [-36, 47], [50, 35], [12, -60], [-58, 22]] as const;

function FlowerBurst({ active }: { active: boolean }) {
  return (
    <span className={`flower-burst${active ? ' active' : ''}`}>
      <span className="flower-scatter">
        {Array.from({ length: 12 }, (_, i) => <i className="tiny-flower" key={`tiny-${i}`}>✿</i>)}
      </span>
      {petalVectors.map(([dx, dy, rot], i) => (
        <i
          className="petal"
          key={`petal-${i}`}
          style={{
            '--dx': `${dx}px`, '--dy': `${dy}px`, '--rot': `${rot}deg`, '--delay': `${(i % 8) * 0.025}s`,
          } as CSSVars}
        />
      ))}
      {blossomVectors.map(([bx, by], i) => (
        <i
          className="blossom"
          key={`blossom-${i}`}
          style={{ '--bx': `${bx}px`, '--by': `${by}px`, '--delay': `${i * 0.035}s` } as CSSVars}
        >✿</i>
      ))}
    </span>
  );
}

function RoadTimeline({ t, lang }: { t: TFn; lang: Language }) {
  const [isNarrow, setIsNarrow] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const travelledRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGPathElement>(null);
  const stopRefs = useRef<Array<HTMLDivElement | null>>([]);
  const milestoneRefs = useRef<Array<HTMLElement | null>>([]);
  const furthest = useRef(0);
  const [activeStops, setActiveStops] = useState(0);
  const [activeMilestones, setActiveMilestones] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const sync = () => setIsNarrow(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  const roadD = isNarrow ? (lang === 'ar' ? MOBILE_ROAD_D_RTL : MOBILE_ROAD_D) : ROAD_D;
  const roadViewBox = isNarrow ? '0 0 390 2050' : '0 0 1182 1640';

  useEffect(() => {
    const stage = stageRef.current;
    const path = pathRef.current;
    const car = carRef.current;
    if (!stage || !path || !car) return;
    const length = path.getTotalLength();
    let raf = 0;

    const toStagePoint = (point: DOMPoint | SVGPoint) => {
      const rect = stage.getBoundingClientRect();
      const matrix = path.getScreenCTM();
      const svg = path.ownerSVGElement;
      if (matrix && svg) {
        const source = svg.createSVGPoint();
        source.x = point.x;
        source.y = point.y;
        const screen = source.matrixTransform(matrix);
        return { x: screen.x - rect.left, y: screen.y - rect.top };
      }
      const vb = isNarrow ? { w: 390, h: 2050 } : { w: 1182, h: 1640 };
      return { x: point.x / vb.w * rect.width, y: point.y / vb.h * rect.height };
    };

    const positionStops = () => {
      ROAD_THRESHOLDS.forEach((threshold, i) => {
        const mapped = toStagePoint(path.getPointAtLength(length * threshold));
        if (stopRefs.current[i]) {
          stopRefs.current[i]!.style.left = `${mapped.x}px`;
          stopRefs.current[i]!.style.top = `${mapped.y}px`;
        }
        if (milestoneRefs.current[i]) milestoneRefs.current[i]!.style.top = `${mapped.y}px`;
      });
    };

    const update = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      const anchorY = window.innerHeight * (isNarrow ? 0.62 : 0.56);
      const progress = Math.max(0, Math.min(1, (anchorY - rect.top) / Math.max(1, rect.height)));
      furthest.current = Math.max(furthest.current, progress);
      const point = path.getPointAtLength(length * progress);
      const mapped = toStagePoint(point);
      const p0 = path.getPointAtLength(Math.max(0, length * progress - 4));
      const p1 = path.getPointAtLength(Math.min(length, length * progress + 4));
      const raw = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
      const angle = Math.max(-10, Math.min(10, raw - 90));
      car.style.left = `${mapped.x}px`;
      car.style.top = `${mapped.y}px`;
      car.style.transform = `translate(-50%,-62%) rotate(${angle}deg)`;
      travelledRef.current?.setAttribute('stroke-dashoffset', String(1 - progress));
      haloRef.current?.setAttribute('stroke-dashoffset', String(1 - progress));

      let stopCount = 0;
      let milestoneCount = 0;
      ROAD_THRESHOLDS.forEach((threshold) => {
        if (furthest.current >= threshold) stopCount += 1;
        if (furthest.current >= Math.max(0, threshold - 0.075)) milestoneCount += 1;
      });
      setActiveStops((prev) => Math.max(prev, stopCount));
      setActiveMilestones((prev) => Math.max(prev, milestoneCount));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    furthest.current = 0;
    setActiveStops(0);
    setActiveMilestones(0);
    positionStops();
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', positionStops);
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', positionStops);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isNarrow, lang, roadD]);

  return (
    <section className="timeline-road-section" id="wedding-road-timeline">
      <div className="timeline-road-sticky">
        <SectionTitle eyebrow={t('The Day')} title={t('Wedding Day Schedule')} />
        <div className="road-stage" ref={stageRef}>
          <svg className="road-svg" viewBox={roadViewBox} preserveAspectRatio={isNarrow ? "none" : "xMidYMid meet"} aria-hidden="true">
            <defs>
              <filter id="softRoadShadow" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="13" /></filter>
              <linearGradient id="travelTone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#cf9279" /><stop offset=".48" stopColor="#a86f59" /><stop offset="1" stopColor="#755139" />
              </linearGradient>
              <filter id="progressGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="road-shadow" d={roadD} />
            <path className="road-verge" d={roadD} />
            <path className="road-edge" d={roadD} />
            <path className="road-surface" d={roadD} ref={pathRef} />
            <path className="road-texture" d={roadD} />
            <path className="road-progress-halo" d={roadD} ref={haloRef} pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
            <path className="road-travelled" d={roadD} ref={travelledRef} pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
            <path className="road-center" d={roadD} />
            {[
              [500, 190, false], [835, 470, true], [390, 805, false], [850, 1130, true], [420, 1460, false],
            ].map(([x, y, alt], i) => (
              <g className={`roadside-patch${alt ? ' alt' : ''}`} transform={`translate(${x} ${y})`} key={i}>
                <ellipse cx="0" cy="0" rx={i % 2 ? 68 : 78} ry={i % 2 ? 22 : 25} />
                <circle cx="-34" cy="-8" r="5" /><circle cx="-10" cy="-14" r="4" /><circle cx="20" cy="-9" r="5" /><circle cx="44" cy="-1" r="4" />
              </g>
            ))}
          </svg>

          {roadEvents.map((event, i) => (
            <React.Fragment key={event.title}>
              <article
                className={`road-milestone ${event.side}${i < activeMilestones ? ' active' : ''}`}
                ref={(node) => { milestoneRefs.current[i] = node; }}
              >
                <time>{event.time}</time>
                <h3>{t(event.title)}</h3>
                <div className="place">{t(event.place)}</div>
                <p>{t(event.description)}</p>
              </article>
              <div
                className={`road-stop${i < activeStops ? ' active' : ''}`}
                ref={(node) => { stopRefs.current[i] = node; }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                <FlowerBurst active={i < activeStops} />
              </div>
            </React.Fragment>
          ))}
          <div className="wedding-car" ref={carRef} style={{ left: '51.6%', top: '5.6%', transform: 'translate(-50%,-62%)' }}>
            <img src={asset('wedding-car.webp')} alt="Bride and groom driving along the wedding day timeline" />
          </div>
        </div>
      </div>
    </section>
  );
}

const stories = [
  ['bouquet.webp', 'October', '2021', 'First Meeting', 'A warm cup of mocha mousse coffee at a cozy café in Byblos. A quiet afternoon turned into hours of endless conversation — and neither wanted to leave.'],
  ['closing.webp', 'June', '2022', 'First Trip Together', 'A spontaneous weekend to Santorini that turned into the trip neither would forget. Blue domes, sunsets, and the realization that this was something rare.'],
  ['couple-portrait.webp', 'December', '2023', 'Meeting the Families', 'Christmas dinner with both families — chaotic, loud, and perfect. The moment everyone knew these two belonged together forever.'],
  ['bouquet.webp', 'June', '2024', 'The Proposal in Florence', 'Overlooking the Arno river as the golden Tuscan sun set, John got down on one knee. Maria said yes a thousand times before he could finish the question.'],
  ['celebration.webp', 'March', '2025', 'Our First Home', "The key, the door, the boxes — and two people ready to build a life together. Every room holds a promise of the future they're creating."],
] as const;

function LoveStory({ t }: { t: TFn }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section className={`section love-story${visible ? ' is-visible' : ''}`} ref={ref}>
      <SectionTitle eyebrow={t('How We Got Here')} title={t('Our Love Story')} />
      <div className="story-scroll">
        {stories.map(([image, month, year, title, description]) => (
          <article className="story-card" key={year}>
            <div
              className="story-img"
              style={{ backgroundImage: `linear-gradient(to top,rgba(30,15,5,.6),rgba(30,15,5,0) 60%),url('${asset(image)}')` }}
            >
              <div><small>{t(month)}</small><strong>{year}</strong></div>
            </div>
            <div className="story-copy"><h3>{t(title)}</h3><p>{t(description)}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ t }: { t: TFn }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const images = ['hands.webp', 'wine-toast.webp', 'reception-table.webp', 'couple-portrait.webp', 'bouquet.webp', 'celebration.webp'];
  return (
    <section className={`section gallery-section${visible ? ' is-visible' : ''}`} ref={ref}>
      <SectionTitle eyebrow={t('Memories')} title={t('Photo Gallery')} />
      <div className="gallery">
        {images.map((image) => <img src={asset(image)} alt="Wedding memory" key={image} />)}
      </div>
    </section>
  );
}

function rsvpCopy(lang: Language, attendance: Attendance, firstName: string) {
  if (lang === 'fr') {
    return attendance === 'accept'
      ? { title: firstName ? `On a hâte, ${firstName} !` : 'On a hâte !', message: 'Votre réponse a été enregistrée. Nous sommes très heureux de vous compter parmi nous pour célébrer cette journée.' }
      : { title: firstName ? `Merci, ${firstName}` : 'Merci de nous avoir prévenus', message: 'Votre réponse a été enregistrée. Votre présence nous manquera et nous vous remercions sincèrement de nous avoir prévenus.' };
  }
  if (lang === 'ar') {
    return attendance === 'accept'
      ? { title: firstName ? `لا يسعنا الانتظار، ${firstName}!` : 'لا يسعنا الانتظار!', message: 'تم حفظ تأكيد حضورك. يسعدنا جدًا أن تكون معنا للاحتفال بهذا اليوم.' }
      : { title: firstName ? `شكرًا لك، ${firstName}` : 'شكرًا لإبلاغنا', message: 'تم حفظ ردك. سنفتقد وجودك معنا، ونقدّر كثيرًا إبلاغنا مسبقًا.' };
  }
  return attendance === 'accept'
    ? { title: firstName ? `We can’t wait, ${firstName}!` : 'We can’t wait!', message: 'Your RSVP has been saved. We’re so happy you’ll be there to celebrate this day with us.' }
    : { title: firstName ? `Thank you, ${firstName}` : 'Thank you for letting us know', message: 'Your RSVP has been saved. We’ll miss celebrating with you, and we truly appreciate you letting us know.' };
}

type RsvpPetal = { x: number; y: number; r: number; spin: number; delay: number; color: string; flower: boolean };

function RSVP({ t, lang }: { t: TFn; lang: Language }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('accept');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [petals, setPetals] = useState<RsvpPetal[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const valid = name.trim().length >= 2;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('john-maria-rsvp') || 'null');
      if (saved?.submitted && saved.name) {
        setName(saved.name);
        setAttendance(saved.attendance === 'decline' ? 'decline' : 'accept');
      }
    } catch { /* ignore */ }
  }, []);

  const burst = (extra: boolean) => {
    const colors = ['#c98f79', '#ddb2a2', '#b18775', '#e7c5b8', '#f0d3c6', '#d8a18e'];
    const count = extra ? 34 : 24;
    const next = Array.from({ length: count }, (_, i) => {
      const angle = (-165 + Math.random() * 150) * Math.PI / 180;
      const distance = 120 + Math.random() * 360;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - (20 + Math.random() * 100),
        r: Math.random() * 180,
        spin: (Math.random() > 0.5 ? 1 : -1) * (160 + Math.random() * 430),
        delay: Math.random() * 0.16,
        color: colors[i % colors.length],
        flower: i % 7 === 0,
      };
    });
    setPetals(next);
    window.setTimeout(() => setPetals([]), 1900);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      setError(t('Please enter your full name.'));
      inputRef.current?.focus();
      return;
    }
    setError('');
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      burst(attendance === 'accept');
      try { localStorage.setItem('john-maria-rsvp', JSON.stringify({ name: name.trim(), attendance, submitted: true })); } catch { /* ignore */ }
    }, 650);
  };

  const firstName = name.trim().split(/\s+/)[0] || '';
  const copy = rsvpCopy(lang, attendance, firstName);

  return (
    <section className={`section rsvp-section${visible ? ' is-visible' : ''}`} ref={ref}>
      <div className="rsvp-head">
        <div className="eyebrow">{t('RSVP')}</div>
        <h2>{t('Confirm Your Presence')}</h2>
        <p>{t('Kindly respond by August 25, 2026 · Catering requires advance notice')}</p>
        <Ornament />
      </div>
      <form className={`rsvp-card${submitting ? ' is-submitting' : ''}${success ? ' is-success' : ''}`} noValidate onSubmit={submit}>
        <div className="rsvp-petals" aria-hidden="true">
          {petals.map((p, i) => (
            <span
              className={`rsvp-petal${p.flower ? ' flower' : ''}`}
              key={i}
              style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--r': `${p.r}deg`, '--spin': `${p.spin}deg`, '--delay': `${p.delay}s`, '--petal': p.color } as CSSVars}
            />
          ))}
        </div>
        <div className="rsvp-form-content">
          <div className={`rsvp-field field-name${error ? ' has-error' : ''}`}>
            <label htmlFor="rsvp-name">{t('Your full name')}</label>
            <div className="rsvp-input-wrap">
              <input
                ref={inputRef}
                id="rsvp-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t('Your full name')}
                value={name}
                onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
                aria-describedby="rsvp-name-error"
              />
              <span className="input-line" aria-hidden="true" />
            </div>
            <span className="field-error" id="rsvp-name-error" aria-live="polite">{error}</span>
          </div>
          <fieldset className="rsvp-field field-attendance">
            <legend>{t('Attendance')}</legend>
            <div className="attendance" role="radiogroup" aria-label={t('Attendance')}>
              <button type="button" className={`attendance-choice${attendance === 'accept' ? ' selected' : ''}`} role="radio" aria-checked={attendance === 'accept'} onClick={() => setAttendance('accept')}>
                <span className="choice-mark" aria-hidden="true">♥</span><span>{t('Joyfully Accepts')}</span>
              </button>
              <button type="button" className={`attendance-choice${attendance === 'decline' ? ' selected' : ''}`} role="radio" aria-checked={attendance === 'decline'} onClick={() => setAttendance('decline')}>
                <span className="choice-mark" aria-hidden="true">×</span><span>{t('Regretfully Declines')}</span>
              </button>
            </div>
          </fieldset>
          <button className="submit" type="submit" disabled={!valid || submitting}>
            <span className="submit-label">{submitting ? t('Sending RSVP') : t('Submit RSVP')}</span>
            <span className="submit-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <div className="rsvp-success" aria-live="polite" aria-hidden={!success}>
          <div className="success-seal" aria-hidden="true"><span>♥</span></div>
          <div className="eyebrow">{t('Response Received')}</div>
          <h3>{copy.title}</h3>
          <p>{copy.message}</p>
          <button type="button" className="edit-rsvp" onClick={() => { setSuccess(false); window.setTimeout(() => inputRef.current?.focus(), 280); }}>{t('Edit response')}</button>
        </div>
      </form>
    </section>
  );
}

function RegistryContacts({ t }: { t: TFn }) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section className={`section registry-section${visible ? ' is-visible' : ''}`} ref={ref}>
      <div className="two-col">
        <div>
          <div className="small-title"><div className="eyebrow left">{t('Gifts')}</div><h3>{t('Registry')}</h3><p>{t('Your presence is our greatest gift. For those who wish to contribute:')}</p></div>
          {[
            ['Whish Money', 'John Doe', '+961 70 987 654'], ['OMT', 'Maria Willson', '+961 03 456 789'], ['Bank IBAN', 'John & Maria', '+961 70 123 456'],
          ].map(([method, owner, value]) => (
            <div className="registry-row" key={method}><div><strong>{t(method)}</strong><em>USD</em><small>{t(owner)}</small></div><span>{value}</span></div>
          ))}
        </div>
        <div>
          <div className="small-title"><div className="eyebrow left">{t('On the Day')}</div><h3>{t('Contact Persons')}</h3><p>{t('For any questions or assistance on the wedding day:')}</p></div>
          <div className="contact-row"><img src={asset('contact-frank.webp')} alt="Frank Doe" /><div><strong>{t('Frank Doe')}</strong><small>{t("Best Man · Groom's Brother")}</small></div><span>+961 111 222</span></div>
          <div className="contact-row"><div className="avatar-placeholder">{t('SW')}</div><div><strong>{t('Sophy Willson')}</strong><small>{t("Maid of Honor · Bride's Sister")}</small></div><span>+961 111 333</span></div>
          <div className="contact-row"><div className="avatar-placeholder">{t('L')}</div><div><strong>{t('Lea · Wedding Planner')}</strong><small>{t('Event Coordinator')}</small></div><span>+961 111 444</span></div>
        </div>
      </div>
    </section>
  );
}

function Closing({ t }: { t: TFn }) {
  return (
    <section className="closing" style={{ backgroundImage: `linear-gradient(rgba(60,30,10,.75),rgba(60,30,10,.75)),url('${asset('closing.webp')}')` }}>
      <div className="closing-inner">
        <div className="hero-kicker">{t('With all our love')}</div>
        <h2>{t('John & Maria')}</h2>
        <Ornament light />
        <p>{t('Thank you for being an indispensable part of our story. Your presence means the world to us as we begin this new chapter together.')}</p>
        <blockquote>{t('“Two are better than one, because they have a good reward for their labor.” — Ecclesiastes 4:9')}</blockquote>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('john-maria-language') as Language | null;
      return saved && ['en', 'fr', 'ar'].includes(saved) ? saved : 'en';
    } catch { return 'en'; }
  });
  const [started, setStarted] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [muted, setMuted] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<number | undefined>(undefined);
  const t = useMemo<TFn>(() => (key) => translate(key, lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = documentTitles[lang];
    try { localStorage.setItem('john-maria-language', lang); } catch { /* ignore */ }
  }, [lang]);

  useEffect(() => {
    document.body.classList.toggle('intro-locked', !introFinished);
    return () => document.body.classList.remove('intro-locked');
  }, [introFinished]);

  useEffect(() => {
    try { history.scrollRestoration = 'manual'; } catch { /* ignore */ }
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    window.scrollTo(0, 0);
    if (musicRef.current) musicRef.current.volume = 0.42;
  }, []);

  useEffect(() => {
    if (musicRef.current) musicRef.current.muted = muted;
  }, [muted]);

  const finishIntro = () => {
    if (introFinished) return;
    setIntroFinished(true);
    if (fallbackRef.current) window.clearTimeout(fallbackRef.current);
    window.setTimeout(() => setIntroVisible(false), 900);
  };

  const startExperience = () => {
    if (started) return;
    setStarted(true);
    if (musicRef.current) {
      musicRef.current.currentTime = 0;
      musicRef.current.play().catch(() => undefined);
    }
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(finishIntro);
      fallbackRef.current = window.setTimeout(finishIntro, 6200);
    } else finishIntro();
  };

  return (
    <>
      <style>{STYLES}</style>
      <IntroGate started={started} finished={introFinished} visible={introVisible} onStart={startExperience} onFinish={finishIntro} videoRef={videoRef} />
      <audio ref={musicRef} preload="auto" loop src={asset('marry-you.mp3')} />
      <FloatingControls started={started} finished={introFinished} muted={muted} onToggleMute={() => setMuted((value) => !value)} lang={lang} onLanguage={setLang} />
      <main>
        <Hero t={t} />
        <Ceremony t={t} />
        <RoadTimeline t={t} lang={lang} />
        <LoveStory t={t} />
        <Gallery t={t} />
        <RSVP t={t} lang={lang} />
        <RegistryContacts t={t} />
        <Closing t={t} />
      </main>
    </>
  );
}
