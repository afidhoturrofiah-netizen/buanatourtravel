export type TourItem = {
  slug: string;
  title: { id: string; en: string };
  destination: { id: string; en: string };
  duration: string;
  price: string;
  rating: string;
  category: { id: string; en: string };
  summary: { id: string; en: string };
  highlights: { id: string[]; en: string[] };
};

export type BlogItem = {
  slug: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  excerpt: { id: string; en: string };
  content: { id: string[]; en: string[] };
  date: string;
  readTime: string;
};

export const tours: TourItem[] = [
  {
    slug: "majestic-japan-sakura-escape",
    title: {
      id: "Majestic Japan Sakura Escape",
      en: "Majestic Japan Sakura Escape",
    },
    destination: {
      id: "Tokyo · Fuji · Kyoto",
      en: "Tokyo · Fuji · Kyoto",
    },
    duration: "7D6N",
    price: "IDR 18.900.000",
    rating: "4.9/5",
    category: {
      id: "Favorit Keluarga",
      en: "Family Favorite",
    },
    summary: {
      id: "Perjalanan elegan menikmati sakura, city highlights, dan pengalaman budaya Jepang yang dirancang premium.",
      en: "An elegant sakura journey with iconic city highlights and curated premium cultural experiences.",
    },
    highlights: {
      id: [
        "Hotel bintang 4 pilihan",
        "Rute favorit musim semi",
        "Cocok untuk first timer ke Jepang"
      ],
      en: [
        "Handpicked 4-star stays",
        "Prime spring itinerary",
        "Ideal for first-time Japan travelers"
      ],
    },
  },
  {
    slug: "scenic-europe-grand-royale",
    title: {
      id: "Scenic Europe Grand Royale",
      en: "Scenic Europe Grand Royale",
    },
    destination: {
      id: "Paris · Lucerne · Milan",
      en: "Paris · Lucerne · Milan",
    },
    duration: "10D8N",
    price: "IDR 35.500.000",
    rating: "4.8/5",
    category: {
      id: "Best Seller Eropa",
      en: "Europe Best Seller",
    },
    summary: {
      id: "Rangkaian kota klasik Eropa dengan ritme perjalanan nyaman dan visual destinasi yang ikonik.",
      en: "A classic European route with comfortable pacing and access to iconic, photogenic destinations.",
    },
    highlights: {
      id: [
        "Kombinasi kota romantis dan panorama alpine",
        "Ideal untuk honeymoon dan private group",
        "Pendampingan itinerary yang rapi"
      ],
      en: [
        "Romantic cities and alpine panoramas",
        "Ideal for honeymoon and private groups",
        "Well-paced itinerary support"
      ],
    },
  },
  {
    slug: "korea-signature-luxury-trail",
    title: {
      id: "Korea Signature Luxury Trail",
      en: "Korea Signature Luxury Trail",
    },
    destination: {
      id: "Seoul · Nami · Busan",
      en: "Seoul · Nami · Busan",
    },
    duration: "6D4N",
    price: "IDR 16.750.000",
    rating: "4.8/5",
    category: {
      id: "Paket Premium Korea",
      en: "Premium Korea Package",
    },
    summary: {
      id: "Kombinasi city lifestyle, spot hits, dan pengalaman premium yang cocok untuk pasangan maupun grup kecil.",
      en: "A refined mix of city lifestyle, iconic attractions, and premium moments for couples or small groups.",
    },
    highlights: {
      id: [
        "Destinasi populer dan mudah dijual",
        "Visual itinerary kuat untuk promosi",
        "Harga kompetitif dengan nuansa premium"
      ],
      en: [
        "Popular destinations with strong demand",
        "Highly marketable visual itinerary",
        "Competitive pricing with premium appeal"
      ],
    },
  },
  {
    slug: "australia-elegant-coastal-getaway",
    title: {
      id: "Australia Elegant Coastal Getaway",
      en: "Australia Elegant Coastal Getaway",
    },
    destination: {
      id: "Sydney · Melbourne",
      en: "Sydney · Melbourne",
    },
    duration: "7D5N",
    price: "IDR 24.400.000",
    rating: "4.7/5",
    category: {
      id: "Urban Escape",
      en: "Urban Escape",
    },
    summary: {
      id: "Paket santai dengan cityscape modern, culinary stop, dan pengalaman pesisir yang berkelas.",
      en: "A polished city-and-coast experience with culinary moments and premium urban comfort.",
    },
    highlights: {
      id: [
        "Cocok untuk keluarga dan corporate reward",
        "Pacing santai dan fleksibel",
        "Look and feel modern premium"
      ],
      en: [
        "Great for families and corporate rewards",
        "Relaxed and flexible pacing",
        "Modern premium look and feel"
      ],
    },
  },
];

export const blogs: BlogItem[] = [
  {
    slug: "tips-memilih-paket-tour-premium",
    title: {
      id: "Tips Memilih Paket Tour Premium yang Nyaman dan Bernilai",
      en: "How to Choose a Premium Tour Package That Feels Worth It",
    },
    category: {
      id: "Tips Travel",
      en: "Travel Tips",
    },
    excerpt: {
      id: "Panduan singkat untuk memahami value paket tour premium, mulai dari itinerary, hotel, hingga layanan after-sales.",
      en: "A concise guide to evaluating premium tour value, from itinerary pacing to hotel quality and after-sales service.",
    },
    content: {
      id: [
        "Paket premium bukan hanya soal harga, tetapi juga soal rasa nyaman, ritme perjalanan, dan kualitas pengalaman secara keseluruhan.",
        "Perhatikan komposisi itinerary, kualitas hotel, transparansi biaya, dan apakah agen travel memberikan support yang responsif.",
        "Dengan presentasi produk yang kuat, pelanggan biasanya lebih mudah memahami mengapa sebuah paket layak dipilih."
      ],
      en: [
        "A premium package is not only about price, but about comfort, pacing, and the overall quality of the experience.",
        "Look closely at itinerary composition, hotel quality, price transparency, and whether the agency offers responsive support.",
        "Strong product presentation helps travelers understand why a package deserves their trust."
      ],
    },
    date: "06 Mar 2026",
    readTime: "5 min read",
  },
  {
    slug: "destinasi-favorit-untuk-liburan-keluarga",
    title: {
      id: "Destinasi Favorit untuk Liburan Keluarga yang Praktis dan Menarik",
      en: "Favorite Destinations for Practical Yet Memorable Family Holidays",
    },
    category: {
      id: "Inspirasi Destinasi",
      en: "Destination Inspiration",
    },
    excerpt: {
      id: "Mulai dari Jepang hingga Australia, beberapa destinasi selalu menjadi pilihan aman untuk perjalanan keluarga modern.",
      en: "From Japan to Australia, some destinations consistently stand out for modern family travel.",
    },
    content: {
      id: [
        "Keluarga biasanya mencari kombinasi kenyamanan, keamanan, dan itinerary yang tidak terlalu padat.",
        "Destinasi seperti Jepang, Korea, dan Australia memberi keseimbangan antara atraksi, fasilitas, dan kemudahan mobilitas.",
        "Pemilihan paket yang tepat akan sangat membantu pengalaman perjalanan menjadi lebih tenang dan berkesan."
      ],
      en: [
        "Families usually look for comfort, safety, and itineraries that are engaging without being exhausting.",
        "Destinations like Japan, Korea, and Australia strike a strong balance between attractions, infrastructure, and ease of movement.",
        "Choosing the right package can make the whole travel experience significantly smoother and more memorable."
      ],
    },
    date: "04 Mar 2026",
    readTime: "4 min read",
  },
  {
    slug: "cara-membangun-itinerary-yang-jualan",
    title: {
      id: "Cara Membangun Itinerary yang Lebih Menjual untuk Calon Traveler",
      en: "How to Build a Travel Itinerary That Converts Better",
    },
    category: {
      id: "Marketing Travel",
      en: "Travel Marketing",
    },
    excerpt: {
      id: "Presentasi itinerary yang rapi dan visual yang kuat dapat meningkatkan minat inquiry secara signifikan.",
      en: "Clean itinerary structure and strong visuals can significantly improve inquiry conversion.",
    },
    content: {
      id: [
        "Traveler modern ingin melihat value dengan cepat: destinasi, durasi, kenyamanan, dan keunggulan paket.",
        "Gunakan struktur yang jelas, headline yang meyakinkan, dan deskripsi singkat yang mudah dipindai.",
        "Website travel yang mewah dan rapi membantu brand terlihat lebih profesional dan lebih dipercaya."
      ],
      en: [
        "Modern travelers want to assess value quickly: destination, duration, comfort, and package advantages.",
        "Use clear structure, convincing headlines, and concise descriptions that are easy to scan.",
        "A refined travel website instantly makes the brand appear more professional and trustworthy."
      ],
    },
    date: "01 Mar 2026",
    readTime: "6 min read",
  },
];
