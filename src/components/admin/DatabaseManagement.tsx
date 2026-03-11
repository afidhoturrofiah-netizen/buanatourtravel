"use client";

import { useState } from "react";
import { Download, Upload, AlertCircle, CheckCircle2, Database } from "lucide-react";
import { exportDatabaseAction, importDatabaseAction } from "@/app/actions/database-actions";

export default function DatabaseManagement({ locale }: { locale: string }) {
  const [exportStatus, setExportStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [importStatus, setImportStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExport = async () => {
    setExportStatus("loading");
    setMessage("");

    try {
      const result = await exportDatabaseAction();

      if (result.success && result.data && result.filename) {
        // Create blob and download
        const blob = new Blob([result.data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = result.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setExportStatus("success");
        setMessage("Database berhasil diexport!");
      } else {
        setExportStatus("error");
        setMessage(result.error || "Gagal export database");
      }
    } catch (error) {
      setExportStatus("error");
      setMessage("Terjadi kesalahan saat export database");
    }

    setTimeout(() => {
      setExportStatus("idle");
      setMessage("");
    }, 5000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        setSelectedFile(file);
        setImportStatus("idle");
        setMessage("");
      } else {
        setSelectedFile(null);
        setImportStatus("error");
        setMessage("File harus berformat JSON");
      }
    }
  };

  const handleImport = async (formData: FormData) => {
    setImportStatus("loading");
    setMessage("");

    try {
      const result = await importDatabaseAction(formData);

      if (result.success) {
        setImportStatus("success");
        setMessage(result.message || "Database berhasil diimport!");
        setSelectedFile(null);
        
        // Reset file input
        const fileInput = document.getElementById("database_file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        // Reload page after 2 seconds to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setImportStatus("error");
        setMessage(result.error || "Gagal import database");
      }
    } catch (error) {
      setImportStatus("error");
      setMessage("Terjadi kesalahan saat import database");
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Section */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
              Export Database
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Download seluruh data CMS (tours, blogs, inquiries, homepage settings) sebagai file JSON. 
              Gunakan untuk backup atau migrasi ke hosting lain.
            </p>

            <button
              onClick={handleExport}
              disabled={exportStatus === "loading"}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {exportStatus === "loading" ? "Mengexport..." : "Export Database"}
            </button>

            {exportStatus === "success" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle2 className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}

            {exportStatus === "error" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
            <Upload className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">
              Import Database
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Upload file JSON hasil export untuk restore database. 
              <strong className="font-semibold text-red-600"> Perhatian: Ini akan menimpa semua data yang ada!</strong>
            </p>

            <form action={handleImport} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="database_file"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Pilih File JSON
                </label>
                <input
                  type="file"
                  id="database_file"
                  name="database_file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="mt-2 block w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-zinc-600">
                    File terpilih: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!selectedFile || importStatus === "loading"}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                {importStatus === "loading" ? "Mengimport..." : "Import Database"}
              </button>
            </form>

            {importStatus === "success" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle2 className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}

            {importStatus === "error" && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100">
            <Database className="h-6 w-6 text-zinc-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-zinc-950">Tips Migrasi Database</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-zinc-400">•</span>
                <span>Export database secara berkala untuk backup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-zinc-400">•</span>
                <span>Simpan file export di tempat aman (Google Drive, Dropbox, dll)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-zinc-400">•</span>
                <span>Saat pindah hosting, export dari hosting lama → import ke hosting baru</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-zinc-400">•</span>
                <span>File export berisi semua data: tours, blogs, inquiries, dan homepage settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-zinc-400">•</span>
                <span className="font-semibold text-amber-700">Import akan menimpa semua data yang ada, pastikan sudah backup terlebih dahulu!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
