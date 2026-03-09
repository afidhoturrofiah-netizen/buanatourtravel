import { promises as fs } from "node:fs";
import path from "node:path";

import { blogs, tours } from "@/data/site-content";
import type { BlogRecord, CmsData, HomepageSettings, InquiryRecord, TourRecord } from "@/lib/cms-types";

const cmsFilePath = path.join(process.cwd(), "src", "lib", "cms-data.json");

function isReadOnlyFilesystemError(error: unknown) {
  return error instanceof Error && "code" in error && (error.code === "EROFS" || error.code === "EACCES" || error.code === "EPERM");
}

function nowIso() {
  return new Date().toISOString();
}

function mapSeedTours(): TourRecord[] {
  const timestamp = nowIso();

  return tours.map((tour, index) => ({
    id: `tour-${index + 1}`,
    slug: tour.slug,
    title: tour.title,
    destination: tour.destination,
    duration: tour.duration,
    price: tour.price,
    rating: tour.rating,
    category: tour.category,
    summary: tour.summary,
    highlights: tour.highlights,
    image: "/uploads/default-tour.jpg",
    featured: index < 3,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

function mapSeedBlogs(): BlogRecord[] {
  const timestamp = nowIso();

  return blogs.map((post, index) => ({
    id: `blog-${index + 1}`,
    slug: post.slug,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    readTime: post.readTime,
    image: "/uploads/default-blog.jpg",
    featured: index === 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

function buildSeedData(): CmsData {
  return {
    tours: mapSeedTours(),
    blogs: mapSeedBlogs(),
    inquiries: [],
    homepage: {
      whySection: {
        eyebrow: {
          id: "WHY TRAVELERS RETURN",
          en: "WHY TRAVELERS RETURN",
        },
        title: {
          id: "Layanan premium yang terasa personal",
          en: "A premium service that feels personal",
        },
        description: {
          id: "Dari kurasi destinasi hingga bantuan bergaya concierge, kami merancang perjalanan yang terasa mulus, elevated, dan berkesan.",
          en: "From destination curation to concierge-style support, we design travel that feels seamless, elevated, and memorable.",
        },
        points: {
          id: [
            "Rekomendasi paket yang disesuaikan dengan profil traveler",
            "Support quotation cepat untuk private trip dan grup corporate",
            "Presentasi modern dengan persepsi nilai premium",
          ],
          en: [
            "Tailored package recommendations based on traveler profile",
            "Fast quotation support for private and corporate groups",
            "Modern presentation with premium value perception",
          ],
        },
      },
      topDestinations: [
        {
          name: { id: "Japan", en: "Japan" },
          label: { id: "18 curated journeys", en: "18 curated journeys" },
          query: "Japan",
          customLink: "",
        },
        {
          name: { id: "South Korea", en: "South Korea" },
          label: { id: "12 premium itineraries", en: "12 premium itineraries" },
          query: "South Korea",
          customLink: "",
        },
        {
          name: { id: "Europe", en: "Europe" },
          label: { id: "24 iconic routes", en: "24 iconic routes" },
          query: "Europe",
          customLink: "",
        },
        {
          name: { id: "Australia", en: "Australia" },
          label: { id: "8 elegant getaways", en: "8 elegant getaways" },
          query: "Australia",
          customLink: "",
        },
      ],
      faqItems: [
        {
          id: "visa",
          question: {
            id: "Apakah Buana Tour & Travel membantu urusan visa?",
            en: "Does Buana Tour & Travel assist with visa arrangements?",
          },
          answer: {
            id: "Ya, untuk destinasi tertentu tim kami bisa membantu memberi arahan dokumen, jadwal pengurusan, dan kebutuhan administrasi visa. Detail dukungan akan menyesuaikan tujuan dan paket perjalanan.",
            en: "Yes, for selected destinations our team can assist with document guidance, visa processing timeline, and administrative requirements. The exact support depends on your destination and travel package.",
          },
          keywords: ["visa", "dokumen", "passport", "paspor"],
        },
        {
          id: "payment",
          question: {
            id: "Bagaimana sistem pembayaran paket tour?",
            en: "How does tour package payment work?",
          },
          answer: {
            id: "Pembayaran biasanya dilakukan melalui skema tanda jadi dan pelunasan sebelum keberangkatan. Nominal dan tenggat pembayaran mengikuti paket, maskapai, serta kebijakan vendor terkait.",
            en: "Payments usually follow a booking deposit and final settlement before departure. The exact amount and due dates depend on the package, airline, and related vendor policies.",
          },
          keywords: ["bayar", "pembayaran", "payment", "dp", "deposit", "pelunasan"],
        },
        {
          id: "schedule",
          question: {
            id: "Apakah jadwal keberangkatan bisa berubah?",
            en: "Can departure schedules change?",
          },
          answer: {
            id: "Jadwal dapat menyesuaikan ketersediaan seat, kondisi operasional maskapai, cuaca, atau kebutuhan teknis lain. Jika ada perubahan, tim kami akan menginformasikan secepat mungkin beserta opsi terbaiknya.",
            en: "Schedules may change based on seat availability, airline operations, weather, or other technical considerations. If anything changes, our team will inform you as soon as possible together with the best available options.",
          },
          keywords: ["jadwal", "schedule", "keberangkatan", "reschedule", "ubah tanggal"],
        },
        {
          id: "refund",
          question: {
            id: "Bagaimana kebijakan refund atau reschedule?",
            en: "What is the refund or reschedule policy?",
          },
          answer: {
            id: "Kebijakan refund dan reschedule mengikuti jenis paket, status booking, tiket, hotel, dan kebijakan vendor yang sudah diproses. Karena itu, setiap kasus perlu dicek dulu oleh admin agar informasinya akurat.",
            en: "Refund and reschedule policies depend on the package type, booking status, flight tickets, hotel reservations, and processed vendor terms. Each case needs to be reviewed by admin first so the answer stays accurate.",
          },
          keywords: ["refund", "reschedule", "cancel", "pembatalan", "ganti jadwal"],
        },
        {
          id: "inquiry",
          question: {
            id: "Bagaimana cara inquiry paket yang cocok?",
            en: "How can I inquire about the right package?",
          },
          answer: {
            id: "Kamu bisa isi form inquiry di halaman kontak atau detail tour, lalu sistem akan langsung mengarahkan ke WhatsApp admin agar follow up lebih cepat dan lebih personal.",
            en: "You can fill in the inquiry form on the contact page or on a tour detail page, and the system will immediately direct you to admin WhatsApp for faster and more personal follow-up.",
          },
          keywords: ["inquiry", "konsultasi", "booking", "pesan", "hubungi admin"],
        },
      ],
      documentationItems: [
        {
          id: "documentation-1",
          image: "/uploads/majestic-japan-sakura-escape-1772784176774.png",
          title: {
            id: "Keberangkatan group favorit Jepang",
            en: "Favorite Japan group departure",
          },
          label: {
            id: "Dokumentasi traveler bersama tim",
            en: "Traveler documentation with the team",
          },
        },
        {
          id: "documentation-2",
          image: "/uploads/default-tour.jpg",
          title: {
            id: "Momen itinerary premium di destinasi unggulan",
            en: "Premium itinerary moments in featured destinations",
          },
          label: {
            id: "Visual perjalanan untuk social proof",
            en: "Travel visuals for social proof",
          },
        },
        {
          id: "documentation-3",
          image: "/uploads/default-tour.jpg",
          title: {
            id: "Pengalaman liburan yang terasa nyata",
            en: "Travel experiences that feel real",
          },
          label: {
            id: "Cocok untuk honeymoon, family, dan corporate",
            en: "Suitable for honeymoon, family, and corporate trips",
          },
        },
        {
          id: "documentation-4",
          image: "/uploads/default-tour.jpg",
          title: {
            id: "Dokumentasi momen sebelum pulang",
            en: "Captured moments before heading home",
          },
          label: {
            id: "Membantu homepage terasa lebih hidup",
            en: "Helps the homepage feel more alive",
          },
        },
      ],
    },
  };
}

async function ensureCmsFile() {
  try {
    await fs.access(cmsFilePath);
  } catch {
    const seed = buildSeedData();
    try {
      await fs.writeFile(cmsFilePath, JSON.stringify(seed, null, 2), "utf8");
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return;
      }

      throw error;
    }
  }
}

export async function readCmsData(): Promise<CmsData> {
  await ensureCmsFile();
  let parsed: CmsData;

  try {
    const raw = await fs.readFile(cmsFilePath, "utf8");
    parsed = JSON.parse(raw) as CmsData;
  } catch (error) {
    if (isReadOnlyFilesystemError(error)) {
      return buildSeedData();
    }

    throw error;
  }

  if (!parsed.homepage) {
    const seed = buildSeedData();
    parsed.homepage = seed.homepage;
    try {
      await writeCmsData(parsed);
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return parsed;
      }

      throw error;
    }
  }

  if (!parsed.homepage.topDestinations) {
    const seed = buildSeedData();
    parsed.homepage.topDestinations = seed.homepage.topDestinations;
    try {
      await writeCmsData(parsed);
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return parsed;
      }

      throw error;
    }
  }

  if (!parsed.homepage.faqItems) {
    const seed = buildSeedData();
    parsed.homepage.faqItems = seed.homepage.faqItems;
    try {
      await writeCmsData(parsed);
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return parsed;
      }

      throw error;
    }
  }

  if (!parsed.homepage.documentationItems) {
    const seed = buildSeedData();
    parsed.homepage.documentationItems = seed.homepage.documentationItems;
    try {
      await writeCmsData(parsed);
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return parsed;
      }

      throw error;
    }
  }

  if (parsed.homepage.topDestinations.some((item) => item.customLink === undefined)) {
    parsed.homepage.topDestinations = parsed.homepage.topDestinations.map((item) => ({
      ...item,
      customLink: item.customLink || "",
    }));
    try {
      await writeCmsData(parsed);
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return parsed;
      }

      throw error;
    }
  }

  if (parsed.tours.length === 0 && parsed.blogs.length === 0 && parsed.inquiries.length === 0) {
    const seed = buildSeedData();
    try {
      await writeCmsData(seed);
      return seed;
    } catch (error) {
      if (isReadOnlyFilesystemError(error)) {
        return seed;
      }

      throw error;
    }
  }

  return parsed;
}

export async function writeCmsData(data: CmsData) {
  try {
    await fs.writeFile(cmsFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    if (isReadOnlyFilesystemError(error)) {
      return;
    }

    throw error;
  }
}

export async function getTours() {
  const data = await readCmsData();
  return data.tours;
}

export async function getTourBySlug(slug: string) {
  const data = await readCmsData();
  return data.tours.find((tour) => tour.slug === slug);
}

export async function getBlogs() {
  const data = await readCmsData();
  return data.blogs;
}

export async function getBlogBySlug(slug: string) {
  const data = await readCmsData();
  return data.blogs.find((post) => post.slug === slug);
}

export async function getInquiries() {
  const data = await readCmsData();
  return data.inquiries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveTours(toursData: TourRecord[]) {
  const data = await readCmsData();
  data.tours = toursData;
  await writeCmsData(data);
}

export async function saveBlogs(blogData: BlogRecord[]) {
  const data = await readCmsData();
  data.blogs = blogData;
  await writeCmsData(data);
}

export async function saveInquiry(inquiry: InquiryRecord) {
  const data = await readCmsData();
  data.inquiries.unshift(inquiry);
  await writeCmsData(data);
}

export async function saveInquiries(inquiries: InquiryRecord[]) {
  const data = await readCmsData();
  data.inquiries = inquiries;
  await writeCmsData(data);
}

export async function getHomepageSettings(): Promise<HomepageSettings> {
  const data = await readCmsData();
  return data.homepage;
}

export async function saveHomepageSettings(homepage: HomepageSettings) {
  const data = await readCmsData();
  data.homepage = homepage;
  await writeCmsData(data);
}
