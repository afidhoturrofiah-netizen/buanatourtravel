"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createAdminSession, destroyAdminSession } from "@/lib/auth";
import { getBlogs, getHomepageSettings, getInquiries, getTours, saveBlogs, saveHomepageSettings, saveInquiries, saveInquiry, saveTours } from "@/lib/cms-storage";
import type { BlogRecord, HomepageSettings, InquiryRecord, TourRecord } from "@/lib/cms-types";
import { slugify } from "@/lib/slugify";

function nowIso() {
  return new Date().toISOString();
}

function buildInquiryWhatsappUrl(inquiry: InquiryRecord) {
  const phone = "6281258055550";
  const lines = [
    "Halo admin Buana Tour & Travel, saya baru saja mengirim inquiry.",
    "",
    `Nama: ${inquiry.fullName || "-"}`,
    `WhatsApp: ${inquiry.phone || "-"}`,
    `Email: ${inquiry.email || "-"}`,
    `Jenis inquiry: ${inquiry.type === "tour" ? "Tour" : "Contact"}`,
    `Destinasi / Paket: ${inquiry.destination || inquiry.tourSlug || "-"}`,
    `Tanggal berangkat: ${inquiry.departureDate || "-"}`,
    `Pesan: ${inquiry.message || "-"}`,
  ];

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getLines(formData: FormData, key: string) {
  return getString(formData, key)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function saveUpload(file: File | null, prefix: string) {
  console.log('saveUpload called:', { 
    hasFile: !!file, 
    fileSize: file?.size, 
    fileName: file?.name,
    fileType: file?.type 
  });
  
  if (!file || file.size === 0) {
    console.log('No file or empty file, returning empty string');
    return "";
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filename = `uploads/${prefix}-${Date.now()}.${extension}`;

  console.log('Uploading to blob:', filename);
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  console.log('Upload successful:', blob.url);
  return blob.url;
}

export async function loginAdminAction(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const locale = getString(formData, "locale") || "id";

  const success = await createAdminSession(email, password);

  if (!success) {
    redirect(`/${locale}/admin/login?error=invalid_credentials`);
  }

  redirect(`/${locale}/admin`);
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/id/admin/login");
}

export async function saveTourAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const id = getString(formData, "id");
  const titleId = getString(formData, "title_id");
  const titleEn = getString(formData, "title_en");
  const slug = getString(formData, "slug") || slugify(titleEn || titleId);
  const imageFile = formData.get("image") instanceof File ? (formData.get("image") as File) : null;
  const existingImage = getString(formData, "existing_image");
  const uploadedImage = await saveUpload(imageFile, slug || "tour");
  const timestamp = nowIso();
  const tours = await getTours();

  const nextRecord: TourRecord = {
    id: id || `tour-${Date.now()}`,
    slug,
    title: { id: titleId, en: titleEn },
    destination: {
      id: getString(formData, "destination_id"),
      en: getString(formData, "destination_en"),
    },
    duration: getString(formData, "duration"),
    price: getString(formData, "price"),
    rating: getString(formData, "rating"),
    category: {
      id: getString(formData, "category_id"),
      en: getString(formData, "category_en"),
    },
    summary: {
      id: getString(formData, "summary_id"),
      en: getString(formData, "summary_en"),
    },
    highlights: {
      id: getLines(formData, "highlights_id"),
      en: getLines(formData, "highlights_en"),
    },
    image: uploadedImage || existingImage || "/uploads/default-tour.jpg",
    featured: formData.get("featured") === "on",
    createdAt: getString(formData, "created_at") || timestamp,
    updatedAt: timestamp,
  };

  const nextTours = id
    ? tours.map((item) => (item.id === id ? nextRecord : item))
    : [nextRecord, ...tours];

  await saveTours(nextTours);
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/tours`);
  revalidatePath(`/${locale}/admin/tours`);
  redirect(`/${locale}/admin/tours?status=tour_saved`);
}

export async function deleteTourAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const id = getString(formData, "id");
  const tours = await getTours();

  await saveTours(tours.filter((item) => item.id !== id));
  revalidatePath(`/${locale}/tours`);
  revalidatePath(`/${locale}/admin/tours`);
  redirect(`/${locale}/admin/tours?status=tour_deleted`);
}

export async function saveBlogAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const id = getString(formData, "id");
  const titleId = getString(formData, "title_id");
  const titleEn = getString(formData, "title_en");
  const slug = getString(formData, "slug") || slugify(titleEn || titleId);
  const imageFile = formData.get("image") instanceof File ? (formData.get("image") as File) : null;
  const existingImage = getString(formData, "existing_image");
  const uploadedImage = await saveUpload(imageFile, slug || "blog");
  const timestamp = nowIso();
  const blogs = await getBlogs();

  const nextRecord: BlogRecord = {
    id: id || `blog-${Date.now()}`,
    slug,
    title: { id: titleId, en: titleEn },
    category: {
      id: getString(formData, "category_id"),
      en: getString(formData, "category_en"),
    },
    excerpt: {
      id: getString(formData, "excerpt_id"),
      en: getString(formData, "excerpt_en"),
    },
    content: {
      id: getLines(formData, "content_id"),
      en: getLines(formData, "content_en"),
    },
    date: getString(formData, "date"),
    readTime: getString(formData, "read_time"),
    image: uploadedImage || existingImage || "/uploads/default-blog.jpg",
    featured: formData.get("featured") === "on",
    createdAt: getString(formData, "created_at") || timestamp,
    updatedAt: timestamp,
  };

  const nextBlogs = id
    ? blogs.map((item) => (item.id === id ? nextRecord : item))
    : [nextRecord, ...blogs];

  await saveBlogs(nextBlogs);
  revalidatePath(`/${locale}/blog`);
  revalidatePath(`/${locale}/admin/blog`);
  redirect(`/${locale}/admin/blog?status=blog_saved`);
}

export async function deleteBlogAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const id = getString(formData, "id");
  const blogs = await getBlogs();

  await saveBlogs(blogs.filter((item) => item.id !== id));
  revalidatePath(`/${locale}/blog`);
  revalidatePath(`/${locale}/admin/blog`);
  redirect(`/${locale}/admin/blog?status=blog_deleted`);
}

export async function submitInquiryAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const inquiry: InquiryRecord = {
    id: `inquiry-${Date.now()}`,
    type: (getString(formData, "type") || "contact") as "contact" | "tour",
    fullName: getString(formData, "full_name"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    destination: getString(formData, "destination"),
    message: getString(formData, "message"),
    departureDate: getString(formData, "departure_date"),
    locale,
    tourSlug: getString(formData, "tour_slug"),
    createdAt: nowIso(),
  };

  await saveInquiry(inquiry);
  revalidatePath(`/${locale}/contact`);
  revalidatePath(`/${locale}/admin/inquiries`);
  redirect(buildInquiryWhatsappUrl(inquiry));
}

export async function deleteInquiryAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const id = getString(formData, "id");
  const inquiries = await getInquiries();

  await saveInquiries(inquiries.filter((item) => item.id !== id));
  revalidatePath(`/${locale}/admin/inquiries`);
  redirect(`/${locale}/admin/inquiries?status=inquiry_deleted`);
}

export async function saveHomepageSettingsAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const currentSettings = await getHomepageSettings();

  const nextSettings: HomepageSettings = {
    ...currentSettings,
    whySection: {
      eyebrow: {
        id: getString(formData, "why_eyebrow_id"),
        en: getString(formData, "why_eyebrow_en"),
      },
      title: {
        id: getString(formData, "why_title_id"),
        en: getString(formData, "why_title_en"),
      },
      description: {
        id: getString(formData, "why_description_id"),
        en: getString(formData, "why_description_en"),
      },
      points: {
        id: getLines(formData, "why_points_id"),
        en: getLines(formData, "why_points_en"),
      },
    },
    topDestinations: Array.from({ length: 4 }, (_, index) => ({
      name: {
        id: getString(formData, `destination_${index + 1}_name_id`),
        en: getString(formData, `destination_${index + 1}_name_en`),
      },
      label: {
        id: getString(formData, `destination_${index + 1}_label_id`),
        en: getString(formData, `destination_${index + 1}_label_en`),
      },
      query: getString(formData, `destination_${index + 1}_query`),
      customLink: getString(formData, `destination_${index + 1}_custom_link`),
    })),
    faqItems: currentSettings.faqItems.map((item, index) => ({
      id: getString(formData, `faq_${index + 1}_id`) || item.id,
      question: {
        id: getString(formData, `faq_${index + 1}_question_id`),
        en: getString(formData, `faq_${index + 1}_question_en`),
      },
      answer: {
        id: getString(formData, `faq_${index + 1}_answer_id`),
        en: getString(formData, `faq_${index + 1}_answer_en`),
      },
      keywords: getString(formData, `faq_${index + 1}_keywords`)
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    })),
  };

  await saveHomepageSettings(nextSettings);
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/homepage`);
  redirect(`/${locale}/admin/homepage?status=homepage_saved`);
}

export async function saveHomepageDocumentationAction(formData: FormData) {
  const locale = getString(formData, "locale") || "id";
  const currentSettings = await getHomepageSettings();
  const totalItems = Number(getString(formData, "documentation_total") || "0");
  const timestamp = Date.now();

  const documentationItems = await Promise.all(
    Array.from({ length: totalItems }, async (_, index) => {
      const imageFileKey = `documentation_${index + 1}_image_file`;
      const imageFile = formData.get(imageFileKey) instanceof File ? (formData.get(imageFileKey) as File) : null;
      const existingImage = getString(formData, `documentation_${index + 1}_existing_image`);
      const itemId = getString(formData, `documentation_${index + 1}_id`) || `documentation-${timestamp}-${index + 1}`;
      const uploadedImage = await saveUpload(imageFile, itemId);

      return {
        id: itemId,
        image: uploadedImage || existingImage,
        title: {
          id: getString(formData, `documentation_${index + 1}_title_id`),
          en: getString(formData, `documentation_${index + 1}_title_en`),
        },
        label: {
          id: getString(formData, `documentation_${index + 1}_label_id`),
          en: getString(formData, `documentation_${index + 1}_label_en`),
        },
      };
    }),
  );

  const nextSettings: HomepageSettings = {
    ...currentSettings,
    documentationItems: documentationItems.filter((item) => item.image || item.title.id || item.title.en || item.label.id || item.label.en),
  };

  await saveHomepageSettings(nextSettings);
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/documentation`);
  redirect(`/${locale}/admin/documentation?status=documentation_saved`);
}
