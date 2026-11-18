/**
 * ============================================================================
 * BITIRUV 2027 — Raqamli Bitiruv Albomi
 * To'liq o'zbek tilidagi versiya + Netflix uslubidagi Hero slayd-shou.
 *
 * Bo'limlar:
 *   1. Sayt sozlamalari va ma'lumotlar
 *   2. UI klass tokenlari
 *   3. Yordamchi funksiyalar (DOM, ikonkalar, scroll-reveal)
 *   4. Fon musiqasi (Web Audio sintezator yoki tashqi MP3 fayl)
 *   5. Sahifa bo'limlarini chizish (Hero slayd-shou, galereya, sinfdoshlar, vaqt chizig'i, videolar, tilaklar)
 *   6. Modallar (Lightbox, o'quvchi portfoliosi, video pleyer)
 *   7. Jonli taymer (Countdown)
 *   8. Hodisalar va ishga tushirish
 * ============================================================================
 */

/* ============================================================================
 * 1. SAYT SOZLAMALARI VA MA'LUMOTLAR
 * ========================================================================== */

/**
 * MARKAZLASHTIRILGAN SAYT SOZLAMALARI
 * Maktab, sinf, bitiruv sanasi va matnlarni shu yerdan osongina o'zgartiring.
 */
const SITE_CONFIG = {
  brandName: 'BITIRUV 2027',
  className: '2027-yil bitiruvchilari',
  sectionBadge: '11-A · BITIRUV ARXIVI',
  graduationYear: 2027,
  // Bitiruv kechasi yoki So'nggi qo'ng'iroq sanasi va vaqti (ISO 8601 formatda)
  graduationDate: '2027-05-25T18:00:00',
  heroTitle: 'Bir davrning yakuni.',
  heroSubtitle: "Bir yo'l. Minglab xotiralar. Cheksiz kelajak.",
  // Netflix uslubidagi aylanib turuvchi asosiy fon rasmlari
  heroImages: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=85',
  ],
  finalImage:
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85',
  schoolName: '[Maktab yoki Litsey nomi]',
  cityLocation: "[Shahar, O'zbekiston]",
  classTeacher: '[Sinf rahbarining F.I.Sh.]',
  // Ixtiyoriy: MP3 fayl yo'lini kiriting. Bo'sh qoldirilsa yoki fayl topilmasa, o'rnatilgan mayin pianino musiqasi chalinadi!
  audioUrl: './assets/audio/Up Theme (Sad Verse Extended).mp3',
  finalQuote: "Begona bo'lib keldik. Xotira bo'lib ketmoqdamiz.",
};

/**
 * SINFDOShLAR MA'LUMOTLARI
 * Har bir sinfdoshingizning haqiqiy ma'lumotlarini shu yerga kiriting.
 */
const STUDENTS_DATA = [
  {
    id: 'std-01',
    number: '01',
    name: "O'quvchi 01 — Ism Familiya",
    nickname: "Sokin Me'mor",
    role: 'Sinf sardori',
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Imtihon haftalarida tungi tayyorgarlik darslarini tashkillashtirib, hech kim ortda qolmasligini ta'minlab yurgan do'stimiz.",
    favoriteMemory:
      "Bahorgi festival oldidan quyosh botganda maktab ayvonida uzoq suhbatlashib o'tirganimiz.",
    futureDream: "Milanda arxitektura va shaharsozlik yo'nalishi",
  },
  {
    id: 'std-02',
    number: '02',
    name: "O'quvchi 02 — Ism Familiya",
    nickname: 'Sinf Saundtreki',
    role: 'Musiqa va tadbirlar mas’uli',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Bo'ynidan quloqchini hech qachon tushmaydigan, har bir sayohat avtobusini haqiqiy konsertga aylantirgan ijodkor.",
    favoriteMemory:
      "Kuzgi yomg'irda chiroq o'chib qolganida 304-xonada gitara chalib qo'shiq aytganimiz.",
    futureDream: 'Kino musiqasi va ovoz rejissyorligi',
  },
  {
    id: 'std-03',
    number: '03',
    name: "O'quvchi 03 — Ism Familiya",
    nickname: 'Obyektiv Ustasi',
    role: 'Albom fotografi',
    photo:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Biz lahzadan zavqlanishimiz uchun o'n minglab samimiy kulgularni kadrga muhrlagan inson.",
    favoriteMemory:
      "10-sinfdagi tog' sayohatimizdan olingan ilk plyonkali suratlarni birga ko'rganimiz.",
    futureDream: 'Hujjatli kino operatorligi',
  },
  {
    id: 'std-04',
    number: '04',
    name: "O'quvchi 04 — Ism Familiya",
    nickname: 'Strateg',
    role: 'Olimpiada sardori',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "O'ttiz soniyada murakkab tenglamani yechib, qo'ng'iroqqa besh daqiqa qolganda ham daftarini ayamaydigan bilimdon.",
    favoriteMemory:
      "Viloyat fan olimpiadasida g'olib bo'lib, stadion zinalarida do'stlar bilan nishonlaganimiz.",
    futureDream: "Sun'iy intellekt va robototexnika tadqiqotlari",
  },
  {
    id: 'std-05',
    number: '05',
    name: "O'quvchi 05 — Ism Familiya",
    nickname: 'Hikoyanavis',
    role: 'Adabiyot muharriri',
    photo:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Butun zalni jim qiladigan nutqlar yozgan va oddiy seshanba kunlarini ham she'riyatga aylantirgan ijodkor.",
    favoriteMemory:
      "So'nggi qishki gulxan atrofida kelajakka yozilgan vaqt kapsulasi maktublarini o'qiganimiz.",
    futureDream: 'Xalqaro jurnalistika va noshirlik',
  },
  {
    id: 'std-06',
    number: '06',
    name: "O'quvchi 06 — Ism Familiya",
    nickname: 'Uchqun',
    role: 'Sport sardori',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Har tong sinfga tuganmas quvvat olib kirgan va sport musobaqalarida butun sinfni g'alabaga ruhlantirgan yetakchi.",
    favoriteMemory:
      "11-sinf chempionatida butun sinf olqishlari ostida so'nggi daqiqada urilgan g'alaba goli.",
    futureDream: 'Sport tibbiyoti va ortopediya',
  },
  {
    id: 'std-07',
    number: '07',
    name: "O'quvchi 07 — Ism Familiya",
    nickname: 'Diplomat',
    role: "O'quvchilar kengashi",
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Sinfdagi har bir guruhni samimiyat va hazil bilan birlashtirgan, har doim kelishuv yo'lini topa olgan do'stimiz.",
    favoriteMemory:
      "Maktab hovlisida bitiruv kechasiga tayyorgarlik nonushtasini tashkillashtirganimiz.",
    futureDream: 'Xalqaro huquq va diplomatiya',
  },
  {
    id: 'std-08',
    number: '08',
    name: "O'quvchi 08 — Ism Familiya",
    nickname: 'Dizayner',
    role: 'Kreativ direktor',
    photo:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    shortBio:
      "Har bir daftar chetiga rasm chizib yurgan va sinfimizning barcha afishalari, liboslari hamda sahna bezaklarini yaratgan rassom.",
    favoriteMemory:
      "Sevimli qo'shiqlarimizni tinglab, bitiruvchilar yo'lagi devoriga rasm chizganimiz.",
    futureDream: 'Kreativ direktorlik va sanoat dizayni',
  },
];

/**
 * GALEREYA MA'LUMOTLARI
 * URL manzillarni o'z sinfingiz rasmlariga almashtiring.
 */
const GALLERY_CATEGORIES = [
  'Barchasi',
  'Maktab kunlari',
  "Do'stlar",
  'Tadbirlar',
  'Bayramlar',
  'Kadr ortida',
];

const GALLERY_DATA = [
  {
    id: 'gal-01',
    title: "G'arbiy zinapoyadagi oltin soat",
    caption: "Yakuniy fizika imtihonidan besh daqiqa o'tib — kechki quyosh nuridagi chinakam yengillik.",
    category: "Do'stlar",
    year: '2027',
    aspect: 'aspect-[4/5]',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-02',
    title: 'B korpus yo‘lagidagi tonggi nur',
    caption: "Soat 8:00 qo'ng'irog'i chalinishidan oldin, yo'laklar faqat bizniki bo'lgan pallalar.",
    category: 'Maktab kunlari',
    year: '2026',
    aspect: 'aspect-[16/10]',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-03',
    title: 'Osmon sari uchgan qalpoqlar',
    caption: "Yettinchi sinfdan beri orzu qilgan bitiruv lahzasi mashg'uloti.",
    category: 'Bayramlar',
    year: '2027',
    aspect: 'aspect-[3/4]',
    src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-04',
    title: 'Kuzgi kecha sahna orti',
    caption: "Parda ochilishidan ikki daqiqa oldin hayajonli kulgular va so'nggi tayyorgarlik.",
    category: 'Kadr ortida',
    year: '2026',
    aspect: 'aspect-[4/3]',
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-05',
    title: 'Kutubxonadagi dars tayyorlash',
    caption: "Darsliklar uyumi, chiroq nuri ostidagi shivir-shivir hazillar va hamjihatlik.",
    category: 'Maktab kunlari',
    year: '2025',
    aspect: 'aspect-[4/5]',
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-06',
    title: 'Qishki musiqiy kecha',
    caption: "Sinfimiz jamoasi butun ustozlar olqishiga sazovor bo'lgan unutilmas oqshom.",
    category: 'Tadbirlar',
    year: '2026',
    aspect: 'aspect-[16/11]',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-07',
    title: 'Ssenariysiz kulgu',
    caption: "Bitiruv albomi uchun suratga tushish jarayonidagi tanaffus lahzasi.",
    category: 'Kadr ortida',
    year: '2027',
    aspect: 'aspect-[3/4]',
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-08',
    title: 'Bahorgi chempionat oqshomi',
    caption: "Stadion chiroqlari ostida — ovozlar bo'g'ilgan, ammo qalblar g'ururga to'lgan kecha.",
    category: 'Tadbirlar',
    year: '2026',
    aspect: 'aspect-[4/3]',
    src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-09',
    title: "So'nggi qo'ng'iroq shukuhi",
    caption: "Yorqin lahzalar, suratlar va har besh yilda yana uchrashish va'dalari.",
    category: 'Bayramlar',
    year: '2027',
    aspect: 'aspect-[4/5]',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
  },
];

/**
 * VAQT CHIZIG'I (TIMELINE) MA'LUMOTLARI
 * 1-sinfdan 11-sinfgacha bo'lgan maktab yillari.
 */
const TIMELINE_DATA = [
  {
    grade: '01-sinf',
    year: '2016 — 2017',
    title: "Birinchi qo'ng'iroq va katta sumkalar",
    description:
      "Maktab darvozasidan ilk bor qadam qo'yish — o'zimizdan baland guldastalar, husnixat bilan ismimizni yozishni o'rganish va keyingi o'n bir yilimizni bezaydigan chehralar bilan tanishish.",
    highlight: 'Birinchi Sentyabr va Alifbe bayrami',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '03-sinf',
    year: '2018 — 2019',
    title: "Qiziqish va qog'oz samolyotlar",
    description:
      "Tanaffuslar butun boshli olamga aylangan davr. Rasm haftaligida qog'oz qal'alar yasash va shahar bo'ylab ilk ekskursiyalarning hayajoni.",
    highlight: "Muzeyga ilk sayohat va bahorgi iste'dodlar shousi",
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '05-sinf',
    year: '2020 — 2021',
    title: "Yuqori sinflar ostonasida",
    description:
      "Yangi sinfxonalar, yangi fanlar va o'zgaruvchan dunyoga birgalikda moslashish. Hatto masofaviy kunlarda ham sinf chatimiz bizni birlashtirib turdi.",
    highlight: "Katta korpusga o'tish va ilk loyihalar",
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '07-sinf',
    year: '2022 — 2023',
    title: "O'z ovozimizni topish",
    description:
      "Munozara klublari, darsdan keyingi futbol o'yinlari va unutilmas kuzgi sayohatlar. Shunchaki sinfdoshlar endi bir umrlik chin do'stlarga aylandi.",
    highlight: "Uch kunlik tog' sayohati va munozara finali",
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '09-sinf',
    year: '2024 — 2025',
    title: 'Ilk imtihonlar va katta orzular',
    description:
      "Birinchi jiddiy akademik sinov. Birgalikda misollar yechib o'tkazilgan soatlar va bolalik qanchalik tez ulg'ayishga aylanayotganini his qilish.",
    highlight: '9-sinf bitiruv oqshomi va olimpiada medallari',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '10-sinf',
    year: '2025 — 2026',
    title: 'Maktab yetakchilari',
    description:
      "Maktab tadbirlarini boshqarish, kichik sinflarga o'rnak bo'lish va oliygohlarga tayyorgarlik ko'ra turib har bir tanaffusning qadriga yetish.",
    highlight: 'Qishki xayriya kechasi va bitiruvchilar libosi',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
  {
    grade: '11-sinf',
    year: '2026 — 2027',
    title: "So'nggi sahifa",
    description:
      "So'nggi qo'ng'iroq mashqlari, ustozlarga ko'zda yosh bilan aytilgan rahmatlar va yangi hayot ostonasida turish. 2027-yil bitiruvchilari — bu devorlarda abadiy qolasiz.",
    highlight: "So'nggi qo'ng'iroq va Bitiruv kechasi 2027",
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
  },
];

/**
 * VIDEO XOTIRALAR MA'LUMOTLARI
 * `videoUrl` manzillarini o'z MP4 fayllaringizga almashtiring.
 */
const VIDEOS_DATA = [
  {
    id: 'vid-01',
    chapter: 'FILM I · RASMIY TREYLER',
    title: "O'n bir yil — to'rt daqiqada",
    duration: '04:18',
    year: '2027',
    description:
      "1-sinfdagi arxiv kadrlarni maktabdagi so'nggi haftamiz bilan birlashtirgan ta'sirli video-xotira.",
    thumbnail:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'vid-02',
    chapter: 'FILM II · HUJJATLI SUHBAT',
    title: 'Samimiy: 2027-yil bitiruvchilari ovozi',
    duration: '06:42',
    year: '2027',
    description:
      "Bo'sh sinfxonalarda olingan samimiy intervyular — minnatdorlik, xotiralar va 2037-yilga tilaklar.",
    thumbnail:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'vid-03',
    chapter: 'FILM III · SAHNA ORTI',
    title: "Qo'ng'iroqdan so'ng: Kulgili lahzalar va sayohatlar",
    duration: '03:15',
    year: '2026',
    description:
      "Telefon kamerasiga muhrlangan quvnoq lahzalar, avtobusdagi qo'shiqlar va rasmiy albomga kirmagan kadrlar.",
    thumbnail:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4',
  },
];

/**
 * TILAKLAR VA MAKTUBLAR MA'LUMOTLARI
 */
const MESSAGES_DATA = {
  featuredTeacher: {
    label: 'SINF RAHBARIMIZDAN',
    author: SITE_CONFIG.classTeacher,
    role: 'Sinf rahbari · 2016–2027',
    quote:
      "“O'n bir yil avval sinfimga ilk bor qadam qo'yganingizda, eng katta so'zlarni qanday yozishni so'ragan edingiz. Bugun esa hech birimiz tasavvur ham qila olmagan ulkan hikoyalarni o'zingiz yozmoqdasiz. Mehribonligingizni orzularingizdan ham balandroq tuting, qayerdan boshlaganingizni unutmang va mening eshigim ham, qalbim ham 2027-yil bitiruvchilari uchun doimo ochiq ekanini biling.”",
  },
  notes: [
    {
      id: 'msg-01',
      category: 'Ustozlar',
      author: "[Adabiyot va tarix o'qituvchisi]",
      role: 'Oliy toifali ustoz',
      message:
        "Sizlar menga haqiqiy sinf sukunat bilan emas, balki dadil savollar va samimiy qiziqish bilan bunyod bo'lishini ko'rsatdingiz. Dunyoni teran anglashdan hech qachon to'xtamang.",
    },
    {
      id: 'msg-02',
      category: 'Ustozlar',
      author: "[Matematika va fizika o'qituvchisi]",
      role: "Aniq fanlar bo'limi",
      message:
        "Har qanday murakkab tenglama sabr va hamjihatlik bilan yechim topadi — xuddi har tong shu sinfda ko'rganim ahillik kabi.",
    },
    {
      id: 'msg-03',
      category: 'Sinfdoshlar',
      author: "O'quvchi 01 — Ism Familiya",
      role: '2027-yil bitiruvchilariga',
      message:
        "Oddiy dushanba tonglarini ham butun umr eslab yuradigan yorqin xotiralarga aylantirganingiz uchun rahmat. Dunyoning qaysi burchagida bo'lmaylik, biz bir oilamiz.",
    },
    {
      id: 'msg-04',
      category: 'Sinfdoshlar',
      author: "O'quvchi 05 — Ism Familiya",
      role: 'Kelajakdagi o‘zimizga',
      message:
        "Yo'laklardagi uzoq suhbatlar, yomg'irli kundagi umumiy soyabon va katta orzular sari dadil qadamlarimiz abadiy yodimizda qolsin.",
    },
    {
      id: 'msg-05',
      category: 'Ustozlar',
      author: '[Maktab direktori]',
      role: "Maktab ma'muriyati",
      message:
        "2027-yil bitiruvchilari, sizlar o'zingizdan keyingi barcha avlodlarga ilhom bo'ladigan yuksak bilim, mehr-oqibat va ijodkorlik namunasini qoldirmoqdasiz.",
    },
    {
      id: 'msg-06',
      category: 'Sinfdoshlar',
      author: "O'quvchi 08 — Ism Familiya",
      role: "Har bir do'stimga",
      message:
        "Bu binoga faqat o'z ismimizni bilib kirgan edik, bugun esa qalbimizda o'ttizta qadrdon taqdirni olib chiqib ketmoqdamiz.",
    },
  ],
};

const MESSAGE_TABS = ['Barchasi', 'Ustozlar', 'Sinfdoshlar'];

const NAV_ITEMS = [
  { id: 'home', label: 'Bosh sahifa' },
  { id: 'story', label: 'Hikoyamiz' },
  { id: 'memories', label: 'Xotiralar' },
  { id: 'class', label: 'Sinfimiz' },
  { id: 'journey', label: "Yo'limiz" },
  { id: 'videos', label: 'Videolar' },
  { id: 'wishes', label: 'Tilaklar' },
];

/* ============================================================================
 * 2. UI KLASS TOKENLARI
 * ========================================================================== */

const CLASSES = {
  revealHidden: 'opacity-0 translate-y-7',
  revealVisible: 'opacity-100 translate-y-0',
  revealBase: 'transition-all duration-1000 ease-out',

  headerScrolled:
    'bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-[#292929]/80 py-3.5',
  headerTop: 'bg-gradient-to-b from-[#0B0B0B]/80 to-transparent py-6',

  navLinkBase:
    'relative py-1 text-xs uppercase tracking-[0.2em] transition-colors',
  navLinkActive: 'text-[#C5A059]',
  navLinkInactive: 'text-[#999999] hover:text-[#F5F5F5]',
  navUnderlineBase:
    'absolute bottom-0 left-0 h-[1px] bg-[#C5A059] transition-all duration-300',
  navUnderlineActive: 'w-full',
  navUnderlineInactive: 'w-0',

  mobileLinkBase:
    'text-left py-2.5 border-b border-[#1C1C1C] font-serif text-2xl tracking-wide transition-colors',
  mobileLinkActive: 'text-[#C5A059]',
  mobileLinkInactive: 'text-[#F5F5F5]',

  footerLink: 'hover:text-[#C5A059] transition-colors',

  musicOn: 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]',
  musicOff:
    'border-[#292929] bg-[#141414]/80 text-[#999999] hover:border-[#C5A059]/50 hover:text-[#F5F5F5]',

  galleryPillBase:
    'px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-all',
  galleryPillActive: 'bg-[#C5A059] text-[#0B0B0B] border-[#C5A059] font-medium',
  galleryPillInactive:
    'bg-[#141414] text-[#999999] border-[#292929] hover:border-[#C5A059]/60 hover:text-[#F5F5F5]',

  gradePillBase: 'px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] border transition-all',
  gradePillActive: 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]',
  gradePillInactive:
    'border-[#292929] bg-[#141414] text-[#999999] hover:text-[#F5F5F5]',

  messageTabBase: 'px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors',
  messageTabActive: 'border-[#C5A059] bg-[#C5A059] text-[#0B0B0B] font-medium',
  messageTabInactive:
    'border-[#292929] bg-[#141414] text-[#999999] hover:text-[#F5F5F5]',

  countdownGrid: 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6',
  countdownDone: 'p-10 md:p-14 bg-[#0B0B0B] border border-[#C5A059]/60',
};

/* ============================================================================
 * 3. YORDAMCHI FUNKSIYALAR
 * ========================================================================== */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const escapeHTML = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));

const icon = (name, className = '') =>
  `<svg class="${className}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;

const splitClasses = (classes) => classes.split(' ').filter(Boolean);

function toggleClasses(el, isOn, onClasses, offClasses) {
  el.classList.remove(...splitClasses(isOn ? offClasses : onClasses));
  el.classList.add(...splitClasses(isOn ? onClasses : offClasses));
}

function onActivateKey(event, callback) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
}

/* ---------- Scroll reveal ------------------------------------------------- */

function showReveal(el) {
  el.classList.remove(...splitClasses(CLASSES.revealHidden));
  el.classList.add(...splitClasses(CLASSES.revealVisible));
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showReveal(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function initReveal(el) {
  if (el.dataset.revealReady) return;
  el.dataset.revealReady = 'true';
  el.style.transitionDelay = `${el.dataset.delay || 0}ms`;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    void el.offsetWidth;
    showReveal(el);
    return;
  }
  revealObserver.observe(el);
}

const initReveals = (root = document) => $$('[data-reveal]', root).forEach(initReveal);

function createReveal(innerHTML, { className = '', delay = 0 } = {}) {
  const el = document.createElement('div');
  el.dataset.reveal = '';
  el.dataset.delay = String(delay);
  el.className = `${CLASSES.revealBase} ${CLASSES.revealHidden} ${className}`.trim();
  el.innerHTML = innerHTML;
  return el;
}

function reconcileKeyed(container, items, { getKey, create, update }) {
  const existing = new Map();
  Array.from(container.children).forEach((el) => existing.set(el.dataset.key, el));
  const nextKeys = new Set();

  items.forEach((item, index) => {
    const key = getKey(item);
    nextKeys.add(key);

    let el = existing.get(key);
    const isNew = !el;
    if (isNew) {
      el = create(item, index);
      el.dataset.key = key;
    } else if (update) {
      update(el, item, index);
    }

    const reference = container.children[index] || null;
    if (reference !== el) container.insertBefore(el, reference);
    if (isNew) initReveal(el);
  });

  existing.forEach((el, key) => {
    if (!nextKeys.has(key)) {
      revealObserver.unobserve(el);
      el.remove();
    }
  });
}

/* ============================================================================
 * ILOVA HOLATI (STATE)
 * ========================================================================== */

const state = {
  scrolled: false,
  activeSection: 'home',
  mobileMenuOpen: false,
  selectedCategory: 'Barchasi',
  lightboxIndex: null,
  studentSearch: '',
  activeStudent: null,
  activeGradeIdx: 0,
  activeVideo: null,
  messageFilter: 'Barchasi',
};

const getFilteredGallery = () =>
  state.selectedCategory === 'Barchasi'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === state.selectedCategory);

const getFilteredStudents = () => {
  const q = state.studentSearch.trim().toLowerCase();
  if (!q) return STUDENTS_DATA;
  return STUDENTS_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.futureDream.toLowerCase().includes(q)
  );
};

const getFilteredMessages = () =>
  state.messageFilter === 'Barchasi'
    ? MESSAGES_DATA.notes
    : MESSAGES_DATA.notes.filter((m) => m.category === state.messageFilter);

/* ============================================================================
 * 4. NOSTALJIK FON MUSIQASI (Web Audio API zaxira mexanizmi bilan)
 * ========================================================================== */

function createAmbientMusic(audioUrl, onChange) {
  let isPlaying = false;
  let audioEl = null;
  let audioCtx = null;
  let intervalId = null;

  const setPlaying = (value) => {
    isPlaying = value;
    onChange();
  };

  const stopSynth = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  };

  const startSynth = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    audioCtx = ctx;

    const chords = [
      [174.61, 220.0, 261.63, 329.63],
      [220.0, 261.63, 329.63, 392.0],
      [146.83, 220.0, 261.63, 329.63],
      [130.81, 196.0, 246.94, 329.63],
    ];
    let step = 0;

    const playChord = (freqs) => {
      if (!audioCtx) return;
      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.022, now + 1.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + 4.6);
      });
    };

    playChord(chords[0]);
    intervalId = setInterval(() => {
      step = (step + 1) % chords.length;
      playChord(chords[step]);
    }, 4500);
  };

  const toggle = () => {
    if (isPlaying) {
      if (audioEl) audioEl.pause();
      stopSynth();
      setPlaying(false);
      return;
    }

    if (audioUrl) {
      if (!audioEl) {
        audioEl = new Audio(audioUrl);
        audioEl.loop = true;
      }
      audioEl
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Agar MP3 fayl topilmasa, avtomatik ravishda sintezator musiqasiga o'tadi
          startSynth();
          setPlaying(true);
        });
      return;
    }

    startSynth();
    setPlaying(true);
  };

  const destroy = () => {
    stopSynth();
    if (audioEl) audioEl.pause();
  };

  return { toggle, destroy, isPlaying: () => isPlaying };
}

const music = createAmbientMusic(SITE_CONFIG.audioUrl, renderMusicButton);

function renderMusicButton() {
  const button = $('#music-toggle');
  const playing = music.isPlaying();

  button.setAttribute('aria-pressed', String(playing));
  button.setAttribute(
    'aria-label',
    playing ? "Fon musiqasini o'chirish" : 'Fon musiqasini yoqish'
  );
  toggleClasses(button, playing, CLASSES.musicOn, CLASSES.musicOff);

  button.innerHTML = playing
    ? `<span class="flex items-end gap-[2px] h-3 w-3">
         <span class="w-[2px] h-full bg-[#C5A059] eq-bar-1 origin-bottom"></span>
         <span class="w-[2px] h-full bg-[#C5A059] eq-bar-2 origin-bottom"></span>
         <span class="w-[2px] h-full bg-[#C5A059] eq-bar-3 origin-bottom"></span>
       </span>
       <span class="hidden sm:inline">Ovoz yoniq</span>`
    : `${icon('volume-x', 'w-3.5 h-3.5')}
       <span class="hidden sm:inline">Ovoz o'chiq</span>`;
}

/* ============================================================================
 * 5. SAHIFA BO'LIMLARINI CHIZISH
 * ========================================================================== */

function applySiteConfig() {
  const { featuredTeacher } = MESSAGES_DATA;

  $('#hero-badge-text').textContent = `${SITE_CONFIG.brandName} · ${SITE_CONFIG.schoolName}`;
  $('#hero-title').textContent = SITE_CONFIG.heroTitle;
  $('#hero-subtitle').textContent = SITE_CONFIG.heroSubtitle;
  $('#countdown-subtitle').textContent = `${SITE_CONFIG.className} bitiruv sahnasiga qadam qo'yguniga qadar har bir soniyani sanaymiz.`;
  $('#teacher-label').textContent = featuredTeacher.label;
  $('#teacher-quote').textContent = featuredTeacher.quote;
  $('#teacher-author').textContent = featuredTeacher.author;
  $('#teacher-role').textContent = featuredTeacher.role;
  $('#teacher-dedication').textContent = `${SITE_CONFIG.className}ga bag'ishlanadi`;
  $('#final-image').src = SITE_CONFIG.finalImage;
  $('#final-quote').textContent = `“${SITE_CONFIG.finalQuote}”`;
  $('#footer-school').textContent = SITE_CONFIG.schoolName;
  $('#footer-tagline').textContent = `Raqamli Vaqt Kapsulasi · ${SITE_CONFIG.className}`;
}

/* ---------- Netflix uslubidagi Hero slayd-shou ---------------------------- */

let currentHeroIndex = 0;

function startHeroSlideshow() {
  const container = $('#hero-slides-container');
  const images = SITE_CONFIG.heroImages || [];
  if (!container || images.length === 0) return;

  container.innerHTML = images
    .map(
      (imgSrc, idx) => `
      <img src="${escapeHTML(imgSrc)}" alt="Bitiruv 2027 xotira kadri ${idx + 1}" class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out scale-105 ${idx === 0 ? 'opacity-100' : 'opacity-0'}">`
    )
    .join('');

  if (images.length <= 1) return;

  const slideImages = container.querySelectorAll('img');
  setInterval(() => {
    slideImages[currentHeroIndex].classList.remove('opacity-100');
    slideImages[currentHeroIndex].classList.add('opacity-0');

    currentHeroIndex = (currentHeroIndex + 1) % slideImages.length;

    slideImages[currentHeroIndex].classList.remove('opacity-0');
    slideImages[currentHeroIndex].classList.add('opacity-100');
  }, 5000);
}

/* ---------- Navigatsiya --------------------------------------------------- */

function renderNavigation() {
  $('#desktop-nav').innerHTML = NAV_ITEMS.map(
    (item) => `
      <button type="button" data-scroll-to="${item.id}" data-nav-id="${item.id}" class="${CLASSES.navLinkBase} ${CLASSES.navLinkInactive}">
        ${escapeHTML(item.label)}
        <span class="${CLASSES.navUnderlineBase} ${CLASSES.navUnderlineInactive}"></span>
      </button>`
  ).join('');

  $('#mobile-nav').innerHTML = NAV_ITEMS.map(
    (item) => `
      <button type="button" data-scroll-to="${item.id}" data-nav-id="${item.id}" class="${CLASSES.mobileLinkBase} ${CLASSES.mobileLinkInactive}">
        ${escapeHTML(item.label)}
      </button>`
  ).join('');

  $('#footer-nav').innerHTML = NAV_ITEMS.map(
    (item) => `
      <button type="button" data-scroll-to="${item.id}" class="${CLASSES.footerLink}">
        ${escapeHTML(item.label)}
      </button>`
  ).join('');
}

function updateActiveNav() {
  $$('#desktop-nav [data-nav-id]').forEach((button) => {
    const isActive = button.dataset.navId === state.activeSection;
    toggleClasses(button, isActive, CLASSES.navLinkActive, CLASSES.navLinkInactive);
    toggleClasses(
      $('span', button),
      isActive,
      CLASSES.navUnderlineActive,
      CLASSES.navUnderlineInactive
    );
  });

  $$('#mobile-nav [data-nav-id]').forEach((button) => {
    const isActive = button.dataset.navId === state.activeSection;
    toggleClasses(button, isActive, CLASSES.mobileLinkActive, CLASSES.mobileLinkInactive);
  });
}

function updateHeader() {
  toggleClasses($('#site-header'), state.scrolled, CLASSES.headerScrolled, CLASSES.headerTop);
}

function setMobileMenu(open) {
  state.mobileMenuOpen = open;
  $('#mobile-drawer').classList.toggle('hidden', !open);
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle-icon').setAttribute('href', open ? '#icon-x' : '#icon-menu');
}

function scrollToSection(id) {
  setMobileMenu(false);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleScroll() {
  const scrolled = window.scrollY > 40;
  if (scrolled !== state.scrolled) {
    state.scrolled = scrolled;
    updateHeader();
  }

  const offsets = NAV_ITEMS.map((item) => {
    const el = document.getElementById(item.id);
    if (!el) return { id: item.id, top: Infinity };
    const rect = el.getBoundingClientRect();
    return { id: item.id, top: Math.abs(rect.top - 160) };
  });

  offsets.sort((a, b) => a.top - b.top);
  if (offsets[0] && offsets[0].id !== state.activeSection) {
    state.activeSection = offsets[0].id;
    updateActiveNav();
  }
}

/* ---------- Galereya ------------------------------------------------------ */

function renderGalleryFilters() {
  $('#gallery-filters').innerHTML = GALLERY_CATEGORIES.map(
    (category) => `
      <button type="button" role="tab" aria-selected="false" data-category="${escapeHTML(category)}" class="${CLASSES.galleryPillBase} ${CLASSES.galleryPillInactive}">
        ${escapeHTML(category)}
      </button>`
  ).join('');
  updateGalleryFilters();
}

function updateGalleryFilters() {
  $$('#gallery-filters [data-category]').forEach((button) => {
    const active = button.dataset.category === state.selectedCategory;
    button.setAttribute('aria-selected', String(active));
    toggleClasses(button, active, CLASSES.galleryPillActive, CLASSES.galleryPillInactive);
  });
}

function galleryItemHTML(photo, index) {
  return `
    <div data-gallery-index="${index}" role="button" tabindex="0" class="break-inside-avoid group relative overflow-hidden bg-[#141414] border border-[#292929] hover:border-[#C5A059]/70 cursor-pointer transition-all duration-500">
      <div class="w-full overflow-hidden ${photo.aspect}">
        <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
      </div>

      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/25 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <div class="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#C5A059] mb-1.5">
          <span>${escapeHTML(photo.category)}</span>
          <span>${escapeHTML(photo.year)}</span>
        </div>
        <h3 class="font-serif text-2xl text-[#F5F5F5] leading-snug">${escapeHTML(photo.title)}</h3>
        <p class="mt-1.5 text-xs text-[#999999] line-clamp-2">${escapeHTML(photo.caption)}</p>
      </div>
    </div>`;
}

function renderGallery() {
  $('#gallery-grid').innerHTML = getFilteredGallery().map(galleryItemHTML).join('');
}

/* ---------- Sinfdoshlar --------------------------------------------------- */

function studentCardHTML(student) {
  return `
    <article data-student-id="${student.id}" role="button" tabindex="0" class="group bg-[#141414] border border-[#292929] hover:border-[#C5A059] transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full">
      <div class="relative aspect-[3/4] overflow-hidden bg-[#1C1C1C]">
        <img src="${escapeHTML(student.photo)}" alt="${escapeHTML(student.name)}" loading="lazy" class="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700">
        <div class="absolute top-3 left-3 px-2.5 py-1 bg-[#0B0B0B]/80 backdrop-blur-md border border-[#292929] text-[10px] tracking-[0.25em] text-[#C5A059]">№ ${escapeHTML(student.number)}</div>
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141414] to-transparent"></div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-[10px] uppercase tracking-[0.22em] text-[#C5A059] mb-1">${escapeHTML(student.nickname)}</div>
          <h3 class="font-serif text-2xl text-[#F5F5F5] group-hover:text-[#C5A059] transition-colors">${escapeHTML(student.name)}</h3>
          <p class="mt-2.5 text-xs text-[#999999] leading-relaxed line-clamp-2">${escapeHTML(student.shortBio)}</p>
        </div>

        <div class="mt-5 pt-4 border-t border-[#292929] flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[#999999] group-hover:text-[#F5F5F5]">
          <span>Batafsil ko'rish</span>
          ${icon('chevron-right', 'w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform')}
        </div>
      </div>
    </article>`;
}

function renderStudents() {
  reconcileKeyed($('#student-grid'), getFilteredStudents(), {
    getKey: (student) => student.id,
    create: (student, idx) =>
      createReveal(studentCardHTML(student), { delay: (idx % 4) * 80 }),
    update: (el, student, idx) => {
      el.style.transitionDelay = `${(idx % 4) * 80}ms`;
    },
  });
}

/* ---------- Vaqt chizig'i (Timeline) -------------------------------------- */

function renderTimelinePills() {
  $('#timeline-pills').innerHTML = TIMELINE_DATA.map(
    (item, idx) => `
      <button type="button" data-grade-index="${idx}" class="${CLASSES.gradePillBase} ${CLASSES.gradePillInactive}">
        ${escapeHTML(item.grade)}
      </button>`
  ).join('');
  updateTimelinePills();
}

function updateTimelinePills() {
  $$('#timeline-pills [data-grade-index]').forEach((button) => {
    const active = Number(button.dataset.gradeIndex) === state.activeGradeIdx;
    toggleClasses(button, active, CLASSES.gradePillActive, CLASSES.gradePillInactive);
  });
}

function timelineNodeHTML(node, index) {
  const isEven = index % 2 === 0;
  return `
    <div id="timeline-node-${index}" data-timeline-index="${index}" class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:direction-rtl'}">
      <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B0B0B] border-2 border-[#C5A059] z-10 shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>

      <div class="${isEven ? 'md:order-1' : 'md:order-2'} overflow-hidden border border-[#292929] bg-[#141414] group">
        <img src="${escapeHTML(node.image)}" alt="${escapeHTML(`${node.grade} — ${node.title}`)}" loading="lazy" class="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700">
      </div>

      <div class="${isEven ? 'md:order-2 md:pl-6' : 'md:order-1 md:pr-6'}">
        <div class="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A059] mb-2">
          <span>${escapeHTML(node.grade)}</span>
          <span class="text-[#292929]">•</span>
          <span class="text-[#999999]">${escapeHTML(node.year)}</span>
        </div>
        <h3 class="font-serif text-3xl md:text-4xl text-[#F5F5F5] leading-tight">${escapeHTML(node.title)}</h3>
        <p class="mt-4 text-[#999999] text-sm md:text-base leading-relaxed font-light">${escapeHTML(node.description)}</p>
        <div class="mt-5 inline-flex items-center gap-2 px-3.5 py-2 bg-[#141414] border border-[#292929] text-xs text-[#F5F5F5]/90">
          ${icon('sparkles', 'w-3.5 h-3.5 text-[#C5A059]')}
          <span>${escapeHTML(node.highlight)}</span>
        </div>
      </div>
    </div>`;
}

function renderTimeline() {
  const list = $('#timeline-list');
  list.innerHTML = '';
  TIMELINE_DATA.forEach((node, index) => {
    const el = createReveal(timelineNodeHTML(node, index));
    list.appendChild(el);
    initReveal(el);
  });
}

/* ---------- Videolar ------------------------------------------------------ */

function videoCardHTML(video, isFeatured) {
  return `
    <div data-video-id="${video.id}" role="button" tabindex="0" class="group relative overflow-hidden bg-[#141414] border border-[#292929] hover:border-[#C5A059] cursor-pointer transition-all duration-500">
      <div class="relative w-full overflow-hidden ${isFeatured ? 'aspect-[16/8]' : 'aspect-[16/10]'}">
        <img src="${escapeHTML(video.thumbnail)}" alt="${escapeHTML(video.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/35 to-transparent"></div>

        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0B0B0B]/75 backdrop-blur-md border border-[#C5A059] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            ${icon('play', 'w-6 h-6 md:w-7 md:h-7 text-[#C5A059] group-hover:text-[#0B0B0B] fill-current ml-0.5')}
          </div>
        </div>

        <div class="absolute top-4 right-4 px-3 py-1 bg-[#0B0B0B]/85 border border-[#292929] text-xs tracking-widest text-[#F5F5F5]">${escapeHTML(video.duration)}</div>
      </div>

      <div class="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] mb-1.5">${escapeHTML(video.chapter)}</div>
          <h3 class="font-serif text-2xl md:text-3xl text-[#F5F5F5]">${escapeHTML(video.title)}</h3>
          <p class="mt-2 text-sm text-[#999999] max-w-2xl font-light">${escapeHTML(video.description)}</p>
        </div>
        <span class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] shrink-0">
          ${icon('film', 'w-4 h-4')}
          Tomosha qilish
        </span>
      </div>
    </div>`;
}

function renderVideos() {
  const grid = $('#video-grid');
  grid.innerHTML = '';
  VIDEOS_DATA.forEach((video, index) => {
    const isFeatured = index === 0;
    const el = createReveal(videoCardHTML(video, isFeatured), {
      className: isFeatured ? 'lg:col-span-12' : 'lg:col-span-6',
      delay: index * 100,
    });
    grid.appendChild(el);
    initReveal(el);
  });
}

/* ---------- Tilaklar va maktublar ----------------------------------------- */

function renderMessageTabs() {
  $('#message-filters').innerHTML = MESSAGE_TABS.map(
    (tab) => `
      <button type="button" data-message-tab="${tab}" class="${CLASSES.messageTabBase} ${CLASSES.messageTabInactive}">
        ${tab}
      </button>`
  ).join('');
  updateMessageTabs();
}

function updateMessageTabs() {
  $$('#message-filters [data-message-tab]').forEach((button) => {
    const active = button.dataset.messageTab === state.messageFilter;
    toggleClasses(button, active, CLASSES.messageTabActive, CLASSES.messageTabInactive);
  });
}

function messageCardHTML(item) {
  return `
    <div class="h-full p-8 bg-[#141414] border border-[#292929] hover:border-[#C5A059]/60 transition-colors flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-5">
          <span class="text-[10px] uppercase tracking-[0.24em] text-[#C5A059]">${escapeHTML(item.category)}</span>
          ${icon('quote', 'w-4 h-4 text-[#292929]')}
        </div>
        <p class="text-[#F5F5F5]/90 text-sm md:text-base leading-relaxed font-light">“${escapeHTML(item.message)}”</p>
      </div>

      <div class="mt-8 pt-4 border-t border-[#292929]">
        <div class="font-serif text-lg text-[#F5F5F5]">${escapeHTML(item.author)}</div>
        <div class="text-xs text-[#999999]">${escapeHTML(item.role)}</div>
      </div>
    </div>`;
}

function renderMessages() {
  reconcileKeyed($('#message-grid'), getFilteredMessages(), {
    getKey: (item) => item.id,
    create: (item, idx) => createReveal(messageCardHTML(item), { delay: (idx % 3) * 90 }),
    update: (el, item, idx) => {
      el.style.transitionDelay = `${(idx % 3) * 90}ms`;
    },
  });
}

/* ============================================================================
 * 6. MODALLAR
 * ========================================================================== */

const modalRoot = () => $('#modal-root');

/* ---------- Galereya Lightbox --------------------------------------------- */

let lightboxTouchStartX = null;

function stepLightbox(direction) {
  const length = getFilteredGallery().length;
  state.lightboxIndex = (state.lightboxIndex + direction + length) % length;
  renderLightbox();
}

function openLightbox(index) {
  state.lightboxIndex = index;
  renderLightbox();
}

function closeLightbox() {
  state.lightboxIndex = null;
  renderLightbox();
}

function buildLightbox() {
  const root = document.createElement('div');
  root.id = 'lightbox';
  root.className =
    'fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Rasmni kattalashtirib ko‘rish');
  root.innerHTML = `
    <button type="button" data-lightbox="close" aria-label="Yopish" class="absolute top-5 right-5 z-20 p-3 rounded-full bg-[#141414] border border-[#292929] text-[#F5F5F5] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors">
      ${icon('x', 'w-5 h-5')}
    </button>

    <button type="button" data-lightbox="prev" aria-label="Oldingi rasm" class="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-[#141414]/90 border border-[#292929] text-[#F5F5F5] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors">
      ${icon('chevron-left', 'w-6 h-6')}
    </button>

    <div class="max-w-5xl w-full flex flex-col items-center">
      <img data-lightbox="image" src="" alt="" class="max-h-[72vh] w-auto object-contain border border-[#292929]">
      <div class="mt-5 text-center max-w-xl">
        <div data-lightbox="meta" class="text-[11px] uppercase tracking-[0.25em] text-[#C5A059]"></div>
        <h3 data-lightbox="title" class="font-serif text-2xl sm:text-3xl text-[#F5F5F5] mt-1"></h3>
        <p data-lightbox="caption" class="mt-1.5 text-sm text-[#999999]"></p>
      </div>
    </div>

    <button type="button" data-lightbox="next" aria-label="Keyingi rasm" class="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-[#141414]/90 border border-[#292929] text-[#F5F5F5] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors">
      ${icon('chevron-right', 'w-6 h-6')}
    </button>`;

  $('[data-lightbox="close"]', root).addEventListener('click', closeLightbox);
  $('[data-lightbox="prev"]', root).addEventListener('click', () => stepLightbox(-1));
  $('[data-lightbox="next"]', root).addEventListener('click', () => stepLightbox(1));

  root.addEventListener('touchstart', (e) => {
    lightboxTouchStartX = e.touches[0].clientX;
  });
  root.addEventListener('touchend', (e) => {
    if (lightboxTouchStartX === null) return;
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX;
    if (Math.abs(delta) > 45) stepLightbox(delta < 0 ? 1 : -1);
    lightboxTouchStartX = null;
  });

  return root;
}

function renderLightbox() {
  const list = getFilteredGallery();
  const photo = state.lightboxIndex !== null ? list[state.lightboxIndex] : undefined;
  let root = $('#lightbox');

  if (!photo) {
    if (root) root.remove();
    return;
  }

  if (!root) {
    root = buildLightbox();
    modalRoot().appendChild(root);
  }

  const image = $('[data-lightbox="image"]', root);
  if (image.getAttribute('src') !== photo.src) image.src = photo.src;
  image.alt = photo.title;
  $('[data-lightbox="meta"]', root).textContent =
    `${photo.category} · ${photo.year} (${state.lightboxIndex + 1} / ${list.length})`;
  $('[data-lightbox="title"]', root).textContent = photo.title;
  $('[data-lightbox="caption"]', root).textContent = photo.caption;
}

/* ---------- Sinfdosh portfoliosi modali ----------------------------------- */

function openStudent(studentId) {
  state.activeStudent = STUDENTS_DATA.find((s) => s.id === studentId) || null;
  renderStudentModal();
}

function closeStudent() {
  state.activeStudent = null;
  renderStudentModal();
}

function renderStudentModal() {
  const existing = $('#student-modal');
  if (existing) existing.remove();

  const student = state.activeStudent;
  if (!student) return;

  const root = document.createElement('div');
  root.id = 'student-modal';
  root.className =
    'fixed inset-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', student.name);
  root.innerHTML = `
    <div data-modal-panel class="max-w-3xl w-full bg-[#141414] border border-[#292929] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative">
      <button type="button" data-modal-close aria-label="Profilni yopish" class="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#0B0B0B]/80 border border-[#292929] text-[#F5F5F5] hover:border-[#C5A059]">
        ${icon('x', 'w-4 h-4')}
      </button>

      <div class="md:col-span-5 bg-[#1C1C1C]">
        <img src="${escapeHTML(student.photo)}" alt="${escapeHTML(student.name)}" class="w-full h-full max-h-96 md:max-h-full object-cover">
      </div>

      <div class="md:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
        <div>
          <div class="text-[11px] uppercase tracking-[0.25em] text-[#C5A059]">№ ${escapeHTML(student.number)} · ${escapeHTML(student.role)}</div>
          <h3 class="font-serif text-3xl text-[#F5F5F5] mt-1">${escapeHTML(student.name)}</h3>
          <div class="text-xs italic text-[#999999] mt-0.5">“${escapeHTML(student.nickname)}”</div>

          <p class="mt-5 text-sm text-[#F5F5F5]/85 leading-relaxed font-light">${escapeHTML(student.shortBio)}</p>

          <div class="mt-6 space-y-4 pt-5 border-t border-[#292929]">
            <div>
              <div class="text-[10px] uppercase tracking-[0.22em] text-[#C5A059]">Eng sevimli maktab xotirasi</div>
              <p class="mt-1 text-sm text-[#999999]">${escapeHTML(student.favoriteMemory)}</p>
            </div>
            <div>
              <div class="text-[10px] uppercase tracking-[0.22em] text-[#C5A059]">Kelajakdagi orzusi</div>
              <p class="mt-1 text-sm text-[#F5F5F5]">${escapeHTML(student.futureDream)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  root.addEventListener('click', closeStudent);
  $('[data-modal-panel]', root).addEventListener('click', (e) => e.stopPropagation());
  $('[data-modal-close]', root).addEventListener('click', closeStudent);

  modalRoot().appendChild(root);
}

/* ---------- Video pleyer modali ------------------------------------------- */

function openVideo(videoId) {
  state.activeVideo = VIDEOS_DATA.find((v) => v.id === videoId) || null;
  renderVideoModal();
}

function closeVideo() {
  state.activeVideo = null;
  renderVideoModal();
}

function renderVideoModal() {
  const existing = $('#video-modal');
  if (existing) existing.remove();

  const video = state.activeVideo;
  if (!video) return;

  const root = document.createElement('div');
  root.id = 'video-modal';
  root.className =
    'fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', video.title);
  root.innerHTML = `
    <div data-modal-panel class="max-w-4xl w-full bg-[#141414] border border-[#292929] overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#292929]">
        <div>
          <span class="text-[10px] uppercase tracking-[0.25em] text-[#C5A059]">${escapeHTML(video.chapter)}</span>
          <h3 class="font-serif text-xl sm:text-2xl text-[#F5F5F5]">${escapeHTML(video.title)}</h3>
        </div>
        <button type="button" data-modal-close aria-label="Videoni yopish" class="p-2 rounded-full border border-[#292929] text-[#F5F5F5] hover:border-[#C5A059]">
          ${icon('x', 'w-5 h-5')}
        </button>
      </div>

      <div class="bg-black aspect-video">
        <video src="${escapeHTML(video.videoUrl)}" poster="${escapeHTML(video.thumbnail)}" controls playsinline class="w-full h-full"></video>
      </div>

      <div class="px-6 py-4 text-sm text-[#999999]">${escapeHTML(video.description)}</div>
    </div>`;

  root.addEventListener('click', closeVideo);
  $('[data-modal-panel]', root).addEventListener('click', (e) => e.stopPropagation());
  $('[data-modal-close]', root).addEventListener('click', closeVideo);

  modalRoot().appendChild(root);
}

/* ============================================================================
 * 7. JONLI TAYMER (COUNTDOWN)
 * ========================================================================== */

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'Kun' },
  { key: 'hours', label: 'Soat' },
  { key: 'minutes', label: 'Daqiqa' },
  { key: 'seconds', label: 'Soniya' },
];

let countdownMode = null;

function setCountdownMode(mode) {
  if (countdownMode === mode) return;
  countdownMode = mode;

  const box = $('#countdown');
  const completed = mode === 'completed';
  toggleClasses(box, completed, CLASSES.countdownDone, CLASSES.countdownGrid);

  box.innerHTML = completed
    ? `<div class="text-xs uppercase tracking-[0.3em] text-[#C5A059] mb-3">YANGI BOSQICH MUBORAK</div>
       <h3 class="font-serif text-3xl md:text-5xl text-[#F5F5F5]">Yangi hayot boshlandi — Tabriklaymiz, ${escapeHTML(SITE_CONFIG.className)}!</h3>`
    : COUNTDOWN_UNITS.map(
        (unit) => `
          <div class="p-6 md:p-10 bg-[#0B0B0B] border border-[#292929] relative overflow-hidden">
            <div class="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent"></div>
            <div data-countdown="${unit.key}" class="countdown-number font-serif text-[#F5F5F5] leading-none">00</div>
            <div class="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#C5A059]">${unit.label}</div>
          </div>`
      ).join('');
}

function startCountdown() {
  const target = new Date(SITE_CONFIG.graduationDate).getTime();

  const updateTimer = () => {
    const diff = target - Date.now();

    if (Number.isNaN(target) || diff <= 0) {
      setCountdownMode('completed');
      return;
    }

    setCountdownMode('running');
    const values = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    COUNTDOWN_UNITS.forEach(({ key }) => {
      $(`[data-countdown="${key}"]`).textContent = String(values[key]).padStart(2, '0');
    });
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ============================================================================
 * 8. HODISALAR VA ISHGA TUSHIRISH
 * ========================================================================== */

function bindEvents() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-scroll-to]');
    if (trigger) scrollToSection(trigger.dataset.scrollTo);
  });

  $('#menu-toggle').addEventListener('click', () => setMobileMenu(!state.mobileMenuOpen));
  $('#music-toggle').addEventListener('click', music.toggle);

  $('#gallery-filters').addEventListener('click', (e) => {
    const button = e.target.closest('[data-category]');
    if (!button) return;
    state.selectedCategory = button.dataset.category;
    updateGalleryFilters();
    renderGallery();
    renderLightbox();
  });

  const galleryGrid = $('#gallery-grid');
  galleryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-gallery-index]');
    if (card) openLightbox(Number(card.dataset.galleryIndex));
  });
  galleryGrid.addEventListener('keydown', (e) => {
    const card = e.target.closest('[data-gallery-index]');
    if (card) onActivateKey(e, () => openLightbox(Number(card.dataset.galleryIndex)));
  });

  $('#student-search').addEventListener('input', (e) => {
    state.studentSearch = e.target.value;
    renderStudents();
  });

  const studentGrid = $('#student-grid');
  studentGrid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-student-id]');
    if (card) openStudent(card.dataset.studentId);
  });
  studentGrid.addEventListener('keydown', (e) => {
    const card = e.target.closest('[data-student-id]');
    if (card) onActivateKey(e, () => openStudent(card.dataset.studentId));
  });

  $('#timeline-pills').addEventListener('click', (e) => {
    const button = e.target.closest('[data-grade-index]');
    if (!button) return;
    const idx = Number(button.dataset.gradeIndex);
    state.activeGradeIdx = idx;
    updateTimelinePills();
    const el = document.getElementById(`timeline-node-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $$('[data-timeline-index]').forEach((node) => {
    node.addEventListener('mouseenter', () => {
      state.activeGradeIdx = Number(node.dataset.timelineIndex);
      updateTimelinePills();
    });
  });

  const videoGrid = $('#video-grid');
  videoGrid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-video-id]');
    if (card) openVideo(card.dataset.videoId);
  });
  videoGrid.addEventListener('keydown', (e) => {
    const card = e.target.closest('[data-video-id]');
    if (card) onActivateKey(e, () => openVideo(card.dataset.videoId));
  });

  $('#message-filters').addEventListener('click', (e) => {
    const button = e.target.closest('[data-message-tab]');
    if (!button) return;
    state.messageFilter = button.dataset.messageTab;
    updateMessageTabs();
    renderMessages();
  });

  window.addEventListener('keydown', (e) => {
    if (state.lightboxIndex !== null) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    } else if (state.activeStudent && e.key === 'Escape') {
      closeStudent();
    } else if (state.activeVideo && e.key === 'Escape') {
      closeVideo();
    } else if (state.mobileMenuOpen && e.key === 'Escape') {
      setMobileMenu(false);
    }
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pagehide', music.destroy);
}

function init() {
  applySiteConfig();
  startHeroSlideshow();
  renderNavigation();
  renderMusicButton();
  renderGalleryFilters();
  renderGallery();
  renderStudents();
  renderTimelinePills();
  renderTimeline();
  renderVideos();
  renderMessageTabs();
  renderMessages();

  bindEvents();
  initReveals();
  startCountdown();
  handleScroll();
}

init();
