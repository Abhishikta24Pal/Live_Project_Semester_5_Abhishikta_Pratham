// frontend/src/data/curatedStories.js

// Guardian palette helpers (kept light touch; actual colors come from your Tailwind tokens)
export const GRADIENTS = [
  "from-sky-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-fuchsia-600",
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-purple-600",
  "from-teal-500 to-cyan-600",
];

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", bcp47: "en-IN" },
  { code: "hi", label: "हिंदी (Hindi)", bcp47: "hi-IN" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", bcp47: "pa-IN" }, // some systems expose "pa-Guru-IN". We pick best match in code.
  { code: "bn", label: "বাংলা (Bengali)", bcp47: "bn-IN" },
  { code: "ta", label: "தமிழ் (Tamil)", bcp47: "ta-IN" },
];

// Helper: trim and collapse whitespace so big blocks don’t look messy in UI
const t = (s) => s.replace(/\n[ \t]+/g, "\n").trim();

// -------- 6 STORIES (Long English; long Hindi; medium Punjabi/Bengali/Tamil) --------
// Aiming ~500–800 words English; ~300–500 words Hindi; ~180–300 words others.
// Feel free to extend; structure is ready for drop-in.
export const STORIES = [
  {
    id: "overwhelmed-breathing-bus",
    cover: GRADIENTS[0],
    titles: {
      en: "On the Bus, a Calmer Breath",
      hi: "बस में एक शांत सांस",
      pa: "ਬੱਸ ਵਿੱਚ ਇਕ ਸ਼ਾਂਤ ਸਾਹ",
      bn: "বাসে, শান্তির নিঃশ্বাস",
      ta: "பஸ்சில் அமைதியான மூச்சு",
    },
    bodies: {
      en: t(`
You step into a crowded bus just as the evening heat softens into a warm hush... 
(1) NOTICE: the shape of your breath. Inhale through the nose for 4, hold for 2, and exhale for 6...
(2) ANCHOR: choose one object in your view—the chipped blue handle near the door...
(3) REFRAME: “I am not late. I am arriving.” ...
(4) SENSE: sound the edges of the moment... 
(5) KINDNESS: a private smile for yourself...
You rise for your stop with the rhythm still in your chest... you are already moving with steadier breath.
      `),
      hi: t(`
भीड़भाड़ वाली बस में कदम रखते ही शाम की गर्मी एक शांताहट में घुल जाती है...
(1) साँस पर ध्यान: नाक से 4 गिनती में श्वास, 2 तक रोकना, 6 में छोड़ना...
(2) टिकना: सामने कोई वस्तु—दरवाज़े के पास नीला हैंडल...
(3) अर्थ बदलना: “मैं देर से नहीं हूँ। मैं बस पहुँच रहा/रही हूँ।” ...
(4) इंद्रियाँ: ध्वनि की सीमाएँ टटोलो...
(5) दयालुता: अपने लिए हल्की मुस्कान...
स्टॉप आने पर वही लय सीने में धड़कती रहती है... और आप और भी संतुलित हैं.
      `),
      pa: t(`
ਸ਼ਾਮ ਦੀ ਗਰਮੀ ਹੌਲੀ ਹੁੰਦੀ ਹੈ, ਤੁਸੀਂ ਭਰੀ ਬੱਸ 'ਚ ਚੜ੍ਹਦੇ ਹੋ...
(1) ਸਾਹ 'ਤੇ ਧਿਆਨ: 4 ਗਿਣਤੀ ਨਾਲ ਖਿੱਚੋ, 2 ਰੋਕੋ, 6 'ਚ ਛੱਡੋ...
(2) ਇਕ ਚੀਜ਼ ਫਿਕਸ ਕਰੋ—ਨੀਲਾ ਹੈਂਡਲ...
(3) ਅਰਥ ਬਦਲੋ: “ਮੈਂ ਲੇਟ ਨਹੀਂ, ਪਹੁੰਚ ਰਿਹਾ/ਰਹੀ ਹਾਂ।” 
(4) ਆਵਾਜ਼ਾਂ ਨੂੰ ਲਾਈਨ ਦਿਓ...
(5) ਆਪਣੇ ਲਈ ਨਿੱਕੀ ਮੁਸਕਾਨ...
ਜ਼ਰਾ-ਜ਼ਰਾ ਸੁੱਕੂਨ ਨਾਲ, ਤੁਸੀਂ ਆਪਣੇ ਸਟਾਪ ਉੱਤੇ ਉਤਰਦੇ ਹੋ.
      `),
      bn: t(`
আপনি ভিড় বাসে ওঠেন, সন্ধ্যার গরমটা মৃদু হচ্ছে...
(1) শ্বাস লক্ষ্য: নাকে ৪ গুনে টানুন, ২ গুনে থামুন, ৬ গুনে ছাড়ুন...
(2) একটি জিনিসে নোঙর: নীল হ্যান্ডেল...
(3) অর্থ বদল: “আমি দেরি করিনি, আমি পৌঁছচ্ছি।” 
(4) শব্দের প্রান্ত ছুঁয়ে দেখা...
(5) নিজের প্রতি মমতা...
স্টপে নামার সময় বুকের ছন্দটা স্থির থাকে.
      `),
      ta: t(`
மாலை வெப்பம் லேசாகும்; நீங்கள் கூட்டமான பஸ்சில் ஏறுகிறீர்கள்...
(1) மூச்சு: 4 எண்ணி இழுத்து, 2 தடை, 6 எண்ணி விடுங்கள்...
(2) ஒரு பொருளில் கண்—நீல கைப்பிடி...
(3) பொருள் மாற்றம்: “நான் தாமதமாக இல்லை; நான் வந்துகொண்டிருக்கிறேன்.” 
(4) ஒலியின் எல்லைகளைத் தொடுங்கள்...
(5) கருணை: உங்களுக்கென சிறிய புன்னகை...
நிறுத்தத்தில் இறங்கும் போது, அந்த துடிப்பு உடன் இருக்கிறது.
      `),
    },
  },

  {
    id: "heartbreak-room-lamp",
    cover: GRADIENTS[2],
    titles: {
      en: "The Lamp That Stayed",
      hi: "जो दीपक जलता रहा",
      pa: "ਉਹ ਦੀਵਾ ਜੋ ਜਲਦਾ ਰਿਹਾ",
      bn: "যে প্রদীপটি জ্বলে রইল",
      ta: "ஒளி அணையாத விளக்கு",
    },
    bodies: {
      en: t(`
Your room remembers the old laughter, but tonight it is quieter... You think of the goodbye that didn’t say enough.
Set the lamp to its gentlest shade... Imagine your heart as a room too—windows, a door, shelves that keep what matters.
Sort gently: on one shelf, gratitude... on another, the ache you name without shame... on the table, a small note: "I am allowed to heal at my pace."
Breathe with the lamp’s pool of light... In five slow rounds you feel space return.
Heartbreak is not a verdict; it is weather. And you—lamp-lit, steady—are a home that learns the seasons.
      `),
      hi: t(`
कमरे में पुरानी हँसी की स्मृतियाँ हैं, पर आज सन्नाटा है...
लैम्प की रोशनी को नरम कर दीजिए... अपने हृदय को भी एक कमरे की तरह कल्पना कीजिए—खिड़कियाँ, एक दरवाज़ा, कुछ शेल्फ़...
धीरे-धीरे छाँटें: एक शेल्फ़ पर कृतज्ञता... दूसरे पर बेझिझक दुख... मेज़ पर एक चिट्ठी: "मैं अपनी रफ्तार से ठीक होने की अनुमति देता/देती हूँ।"
रोशनी के घेरे में साँस लें... पाँच धीमे चक्रों में जगह लौटती है.
टूटा दिल कोई फ़ैसला नहीं; यह मौसम है—और आप, दीपक-सी नर्मी में, मौसमों को सीखते घर.
      `),
      pa: t(`
ਕਮਰੇ 'ਚ ਪੁਰਾਣੀ ਹਸਣ ਦੀ ਯਾਦ ਹੈ, ਅੱਜ ਚੁੱਪ ਹੈ...
ਦੀਆਂ ਦੀ ਲੋਅ ਨਰਮ ਕਰੋ... ਦਿਲ ਨੂੰ ਵੀ ਇਕ ਕਮਰਾ ਸਮਝੋ—ਖਿੜਕੀਆਂ, ਦਰਵਾਜ਼ਾ, ਸ਼ੈਲਫ਼...
ਹੌਲੀ ਹੌਲੀ ਰੱਖੋ: ਇਕ ਸ਼ੈਲਫ਼ ਕ੍ਰਿਤਜਤਾ ਲਈ, ਦੂਜੇ 'ਤੇ ਬੇਧੜਕ ਦਰਦ... ਚਿੱਠੀ: “ਮੈਂ ਆਪਣੀ ਲਏ ਨਾਲ ਠੀਕ ਹੋਣ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।”
ਉਜਾਲੇ ਨਾਲ ਸਾਹ ਮਿਲਾਓ... ਥੋੜ੍ਹੀ ਜਗ੍ਹਾ ਵਾਪਸ ਆ ਜਾਂਦੀ ਹੈ.
ਦਿਲ ਟੁੱਟਣਾ ਫੈਸਲਾ ਨਹੀਂ—ਮੌਸਮ ਹੈ; ਤੁਸੀਂ ਘਰ ਹੋ ਜੋ ਰੁੱਤਾਂ ਸਿੱਖਦਾ ਹੈ.
      `),
      bn: t(`
ঘরে পুরোনো হাসির স্মৃতি আছে, আজ নীরব...
ল্যাম্পের আলো নরম করুন... হৃদয়কেও এক ঘর ভাবুন—জানালা, দরজা, তাক...
ধীরে সাজান: এক তাকে কৃতজ্ঞতা, আরেকটায় নির্ভীক বেদনা... টেবিলে পাতা নোট: “আমি আমার গতিতে সেরে উঠতে পারি।”
আলোর বৃত্তে শ্বাস নিন... জায়গা ফিরতে থাকে.
হৃদয়ভঙ্গ রায় নয়—আবহাওয়া; আপনি সেই ঘর, যে ঋতু শেখে.
      `),
      ta: t(`
அறை பழைய சிரிப்பை நினைக்கிறது; இன்று அமைதி...
விளக்கின் ஒளியை மென்மையாக்குங்கள்... இதயத்தையும் ஒரு அறையாக எண்ணுங்கள்—ஜன்னல்கள், கதவு, அலமாரி...
மெதுவாக ஒழுங்குபடுத்து: ஒரு அலமாரியில் நன்றியுணர்வு, இன்னொன்றில் தயக்கமின்றி வலி... சீட்டில்: “என் வேகத்தில் குணமாவேன்.”
ஒளி வட்டத்தில் மூச்செடுக்க, இடம் திரும்புகிறது.
இதயவலி தீர்ப்பு அல்ல—காலநிலை; நீங்கள் காலங்களைக் கற்றுக்கொள்ளும் வீடு.
      `),
    },
  },

  {
    id: "loneliness-night-walk",
    cover: GRADIENTS[1],
    titles: {
      en: "A Small Night Walk",
      hi: "रात की छोटी सैर",
      pa: "ਰਾਤ ਦੀ ਨਿੱਕੀ ਸੈਰ",
      bn: "রাতের ছোট্ট হাঁটা",
      ta: "இரவு சிறிய நடை",
    },
    bodies: {
      en: t(`
When loneliness presses close, step outside... map the neighborhood by kindness: a tree that waves, a stray who blinks hello, a shop shutter breathing out the day.
Count five pools of light from streetlamps; name five good memories...
Practice gentle questions: “What do I need right now?” If the answer is “company,” let the stars be company for three minutes.
Return with one found sentence: “I am here.” Pin it to your notice board. Some nights, that is the bravest poem.
      `),
      hi: t(`
जब अकेलापन पास आ जाए, बाहर कदम रखिए...
पाँच लैम्प की रोशनियाँ गिनिए; पाँच अच्छी यादें नाम लीजिए...
अपने आप से नरमी से पूछिए: “अभी मुझे क्या चाहिए?” अगर जवाब “संग” है, तो तीन मिनट तारों को संग मान लीजिए.
वापस आते समय एक वाक्य साथ लाएँ: “मैं यहाँ हूँ।” उसे नोटिस बोर्ड पर टाँग दें—कई रातों में वही सबसे बहादुर कविता होती है.
      `),
      pa: t(`
ਅਕੇਲਾਪਨ ਆਉਂਦਾ ਹੈ ਤਾਂ ਬਾਹਰ ਚੱਲੋ...
ਗਲੀ ਦੇ ਪੰਜ ਦੀਵੇ ਗਿਣੋ; ਪੰਜ ਚੰਗੀਆਂ ਯਾਦਾਂ ਲੱਭੋ...
ਆਪਣੇ ਨਾਲ ਨਰਮੀ: “ਮੈਨੂੰ ਹੁਣ ਕੀ ਚਾਹੀਦਾ?” ਜੇ “ਸਾਥ,” ਤਾਂ ਤਿੰਨ ਮਿੰਟ ਤਾਰਿਆਂ ਨੂੰ ਸਾਥ ਸਮਝੋ.
ਵਾਪਸੀ 'ਤੇ ਇਕ ਸਤਰ ਲਿਆਓ: “ਮੈਂ ਇੱਥੇ ਹਾਂ।” ਕਈ ਰਾਤਾਂ 'ਚ ਇਹੀ ਸਭ ਤੋਂ ਹਿੰਮਤੀ ਕਵਿਤਾ ਹੈ.
      `),
      bn: t(`
একাকীত্ব এলে, একটু বাইরে হাঁটুন...
পাঁচটি ল্যাম্পপোস্টের আলো গুনুন; পাঁচটি সুখস্মৃতি বলুন...
নিজেকে জিজ্ঞেস করুন: “এখন আমার কী দরকার?” যদি “সঙ্গ”—তাহলে তিন মিনিট তারাদের সঙ্গ নিন.
ফিরে এসে লিখুন: “আমি আছি।” কিছু রাতে, সেটাই সাহসী কবিতা.
      `),
      ta: t(`
தனிமை நெருங்கினால், வெளியே சிறு நடை...
ஐந்து விளக்குக் குளங்களை எண்ணுங்கள்; ஐந்து நன்றியச্মரணைகள்...
“இப்போது என்ன தேவை?” என்று கேளுங்கள். பதில் “சங்கதி” என்றால், மூன்று நிமிடம் நட்சத்திரங்கள் உங்களுடன்.
மீண்டு வரும் போது: “நான் இருக்கிறேன்.”—அந்த ஒரு வாக்கியம் பல இரவுகளில் துணிச்சல் கவிதை.
      `),
    },
  },

  {
    id: "family-storm-kitchen",
    cover: GRADIENTS[3],
    titles: {
      en: "Quiet Kitchen, Softer Storm",
      hi: "शांत रसोई, हल्का तूफ़ान",
      pa: "ਖਾਮੋਸ਼ ਰਸੋਈ, ਹੌਲਾ ਤੂਫ਼ਾਨ",
      bn: "নিঃশব্দ রান্নাঘর, নরম ঝড়",
      ta: "அமைதியான சமையலறை, மென்மையான புயல்",
    },
    bodies: {
      en: t(`
Family drama can swing like a door in the wind... Tonight, brew tea like a ritual. Let water learn patience.
List three non-negotiables: your dignity, your rest, your right to pause...
Plan a boundary sentence... “I can talk about this tomorrow; right now I need calm.” Practice it out loud to the kettle.
Storms respect houses with strong windows. You don’t need to be loud to be clear.
      `),
      hi: t(`
परिवार का ड्रामा हवा में झूलते दरवाज़े-सा लगता है...
आज चाय को विधि बनाइए... तीन अनिवार्य बातें लिखें: आपकी गरिमा, आपका आराम, आपका ठहराव.
सीमा-वाक्य तैयार करें: “हम इस पर कल बात करेंगे; अभी मुझे शांति चाहिए।” इसे केतली के सामने बोलकर अभ्यास करें.
तेज़ होना ज़रूरी नहीं; स्पष्ट होना ज़रूरी है.
      `),
      pa: t(`
ਘਰ ਦੇ ਝਗੜੇ ਹਵਾ ਵਿੱਚ ਹਿਲਦਾ ਦਰਵਾਜ਼ਾ...
ਅੱਜ ਚਾਹ ਰਸਮ ਵਾਂਗ ਬਣਾਓ... ਤਿੰਨ ਅਣ-ਸੌਦੇਬਾਜ਼ ਚੀਜ਼ਾਂ: ਇਜ਼ਤ, ਆਰਾਮ, ਠਹਿਰਾਅ.
ਇਕ ਹੱਦ-ਵਾਕ: “ਅਸੀਂ ਕੱਲ੍ਹ ਗੱਲ ਕਰਾਂਗੇ; ਹੁਣ ਮੈਨੂੰ ਸਾਂਤ ਚਾਹੀਦੀ.” ਕੇਤਲੀ ਅੱਗੇ ਉੱਚੀ ਆਵਾਜ਼ ਬਿਨਾ ਅਭਿਆਸ ਕਰੋ.
ਸਪੱਸ਼ਟ ਹੋਣਾ ਕਾਫ਼ੀ ਹੈ.
      `),
      bn: t(`
পারিবারিক টানাপোড়েন দুলতে থাকা দরজার মতো...
আজ চা বানানোকে আচারে পরিণত করুন... তিনটি অপরিবর্তনীয়: মর্যাদা, বিশ্রাম, বিরতি.
একটি সীমা-বাক্য তৈরি করুন: “এটা কাল বলব; এখন শান্তি চাই।” কেতলির সামনে বলেও নিন.
জোরে নয়—স্পষ্ট হলেই যথেষ্ট.
      `),
      ta: t(`
குடும்ப சண்டை காற்றில் அசையும் கதவு போல...
இன்று தேனை விதியாக செய்யுங்கள்... மூன்று அசைக்கமுடியாதவை: மரியாதை, ஓய்வு, இடைவேளை.
ஒரு எல்லை வாக்கியம்: “இதை நாங்கள் நாளை பேசலாம்; இப்போது அமைதி வேண்டும்.”—கெட்டில் முன் சொல்வதன் மூலம் பயிற்சி.
உயர் சத்தம் தேவையில்லை; தெளிவு போதும்.
      `),
    },
  },

  {
    id: "self-worth-mirror-note",
    cover: GRADIENTS[4],
    titles: {
      en: "Mirror Notes for Self-Worth",
      hi: "आत्म-मूल्य के लिए शीशे की पर्चियाँ",
      pa: "ਆਤਮ-ਮੂਲ ਲਈ ਸ਼ੀਸ਼ੇ ਦੀਆਂ ਚਿੱਠੀਆਂ",
      bn: "আত্মমর্যাদার জন্য আয়নার নোট",
      ta: "சுயமதிப்பிற்கான கண்ணாடி குறிப்புகள்",
    },
    bodies: {
      en: t(`
Tape three notes on your mirror: (1) “I am allowed to be in-progress.” (2) “My mistakes are chapters, not final pages.” (3) “Kindness counts as strength.”
Each morning, read them like small vows... Practice a 60-second posture reset: feet grounded, spine tall, jaw loose.
Self-esteem isn’t loud; it is faithful—showing up in how you treat yourself when no one is watching.
      `),
      hi: t(`
शीशे पर तीन पर्चियाँ चिपकाएँ: (1) “मैं प्रगति में हूँ।” (2) “गलतियाँ अध्याय हैं, आख़िरी पन्ने नहीं।” (3) “दयालु होना ताकत है।”
हर सुबह उन्हें छोटे संकल्पों की तरह पढ़िए... 60 सेकंड का आसन-रीसेट कीजिए: पैर स्थिर, रीढ़ लंबी, जबड़ा ढीला.
आत्म-सम्मान शोर नहीं; वह निष्ठा है—जब कोई नहीं देख रहा, तब अपने प्रति आपका व्यवहार.
      `),
      pa: t(`
ਸ਼ੀਸ਼ੇ 'ਤੇ ਤਿੰਨ ਪੱਤੀਆਂ ਚਿਪਕਾਓ: (1) “ਮੈਂ ਬਣਦੀਆਂ ਵਿਚ ਹਾਂ।” (2) “ਗਲਤੀਆਂ ਅਧਿਆਇ ਹਨ, ਅੰਤ ਨਹੀਂ।” (3) “ਦਇਆ ਤਾਕਤ ਹੈ।”
ਸਵੇਰ ਨੂੰ ਇਨ੍ਹਾਂ ਨੂੰ ਵਾਅਦੇ ਵਾਂਗ ਪੜ੍ਹੋ... 60 ਸਕਿੰਟ ਦਿਹਾੜੀ ਅਣਦਾਜ ਸਿੱਧਾ ਕਰੋ: ਪੈਰ ਟਿਕੇ, ਰੀੜ੍ਹ ਸਿੱਧੀ, ਜਬਾ ਢਿੱਲਾ.
ਆਤਮ-ਮਾਨ ਉੱਚਾ ਸੁਰ ਨਹੀਂ; ਇਹ ਵਫ਼ਾਦਾਰੀ ਹੈ.
      `),
      bn: t(`
আয়নায় তিনটি নোট আটকান: (1) “আমি তৈরি হচ্ছি।” (2) “ভুল হলো অধ্যায়, শেষপাতা নয়।” (3) “দয়া হলো শক্তি।”
প্রতিদিন পড়ুন; ৬০ সেকেন্ড ভঙ্গি-রিসেট করুন: পা স্থির, মেরুদণ্ড সোজা, চোয়াল নরম.
আত্মসম্মান শব্দ করে না; সে টিকে থাকে.
      `),
      ta: t(`
கண்ணாடியில் மூன்று குறிப்புகள்: (1) “நான் உருவாகிக் கொண்டிருக்கிறேன்.” (2) “தவறுகள் அத்தியாயங்கள்; கடைசி பக்கம் இல்லை.” (3) “இரக்கம் ஒரு வலிமை.”
ஒவ்வொரு காலையும் வாசிக்கவும்... 60 வினாடி உடற்கட்டுப்பாடு: பாதம் நிலை, முதுகெலும்பு உயர, தாடை தளர்வு.
சுயமதிப்பு சத்தமாக இருக்காது; அது நம்பிக்கை.
      `),
    },
  },

  {
    id: "grief-river-bank",
    cover: GRADIENTS[5],
    titles: {
      en: "By the River of Grief",
      hi: "शोक की नदी के किनारे",
      pa: "ਗਮ ਦੀ ਦਰਿਆ ਕਿਨਾਰੇ",
      bn: "শোকের নদীর তীরে",
      ta: "துக்கத்தின் நதிக்கரையில்",
    },
    bodies: {
      en: t(`
Grief moves like water—sometimes trickle, sometimes flood... Sit by its bank with a warm drink.
Name what you miss without argument. Speak to memory kindly: “You can sit with me.” 
Write a letter you won’t send... Close with a blessing: “May I carry love without breaking.”
When you stand, the river still runs. But you have learned the shore.
      `),
      hi: t(`
शोक जल की तरह है—कभी धार, कभी बाढ़...
जो याद आता है, उसे बिना तर्क के नाम दें... स्मृतियों से कहें: “तुम मेरे साथ बैठ सकते हो।”
एक चिट्ठी लिखें जिसे भेजना नहीं... आख़िर में आशीष दें: “मैं टूटे बिना प्रेम ढो सकूँ।”
नदी बहती रहेगी; पर आपने किनारा पहचान लिया.
      `),
      pa: t(`
ਗਮ ਪਾਣੀ ਵਾਂਗ—ਕਦੀ ਧਾਰ, ਕਦੀ ਉੱਪਰ...
ਜੋ ਯਾਦ ਆਉਂਦਾ, ਨਾਮ ਲਓ... ਯਾਦਾਂ ਨੂੰ ਕਹੋ: “ਮੇਰੇ ਨਾਲ ਬੈਠੋ।”
ਇਕ ਚਿੱਠੀ ਲਿਖੋ ਜੋ ਭੇਜਣੀ ਨਹੀਂ... ਅਖ਼ੀਰ 'ਚ ਅਸੀਸ: “ਟੁੱਟੇ ਬਿਨਾਂ ਪਿਆਰ ਢੋ ਸਕਾਂ।”
ਦਰਿਆ ਤਾਂ ਵਗਦਾ ਹੀ ਰਹੇਗਾ; ਤੁਸੀਂ ਕੰਡਾ ਸਿੱਖ ਲਿਆ ਹੈ.
      `),
      bn: t(`
শোক জলের মতো—কখনো সরু, কখনো প্লাবন...
যে মানুষ/জিনিসটিকে মিস করেন, নাম বলুন... স্মৃতিকে বলুন: “আমার পাশে বসো।”
একটা চিঠি লিখুন, পাঠাবেন না... শেষে আশীর্বাদ: “ভেঙে না পড়ে ভালবাসা বয়ে নিয়ে যাই।”
নদী বইবে; আপনি তীর চিনে ফেলেছেন.
      `),
      ta: t(`
துக்கம் நீரைப் போன்றது—சில நேரம் ஓடை, சில நேரம் பெருக்கு...
நாமமிட்டு நினைவை அன்போடு அழையுங்கள்: “என்னுடனே உட்காரலாம்.”
அனுப்பாத கடிதம் ஒன்றை எழுதுங்கள்... கடைசியில் ஆசீர்வாதம்: “உடைந்துபோகாமல் அன்பை சுமப்பேன்.”
நதி ஓடும்; நீங்கள் கரையை கற்றுக்கொண்டீர்கள்.
      `),
    },
  },
];
