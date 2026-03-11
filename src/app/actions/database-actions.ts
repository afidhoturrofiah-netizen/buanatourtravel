"use server";

import { revalidatePath } from "next/cache";
import { readCmsData, writeCmsData } from "@/lib/cms-storage";
import type { CmsData } from "@/lib/cms-types";

export async function exportDatabaseAction() {
  try {
    const data = await readCmsData();
    
    // Return the data as JSON string with metadata
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      data: data,
    };
    
    return {
      success: true,
      data: JSON.stringify(exportData, null, 2),
      filename: `buana-tour-backup-${new Date().toISOString().split('T')[0]}.json`,
    };
  } catch (error) {
    console.error("Export database error:", error);
    return {
      success: false,
      error: "Gagal export database. Silakan coba lagi.",
    };
  }
}

export async function importDatabaseAction(formData: FormData) {
  try {
    const file = formData.get("database_file");
    
    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "File tidak ditemukan. Silakan pilih file JSON.",
      };
    }

    // Read file content
    const content = await file.text();
    
    // Parse JSON
    let importData: any;
    try {
      importData = JSON.parse(content);
    } catch {
      return {
        success: false,
        error: "File JSON tidak valid. Pastikan file yang diupload adalah hasil export database.",
      };
    }

    // Validate structure
    const data: CmsData = importData.data || importData;
    
    if (!data.tours || !data.blogs || !data.inquiries || !data.homepage) {
      return {
        success: false,
        error: "Format database tidak valid. File harus berisi tours, blogs, inquiries, dan homepage.",
      };
    }

    // Validate required fields
    if (!Array.isArray(data.tours) || !Array.isArray(data.blogs) || !Array.isArray(data.inquiries)) {
      return {
        success: false,
        error: "Format data tidak valid. Tours, blogs, dan inquiries harus berupa array.",
      };
    }

    // Write to CMS storage
    await writeCmsData(data);
    
    // Revalidate all pages
    revalidatePath("/", "layout");
    
    return {
      success: true,
      message: `Database berhasil diimport! ${data.tours.length} tours, ${data.blogs.length} blogs, ${data.inquiries.length} inquiries.`,
    };
  } catch (error) {
    console.error("Import database error:", error);
    return {
      success: false,
      error: "Gagal import database. Silakan coba lagi.",
    };
  }
}
