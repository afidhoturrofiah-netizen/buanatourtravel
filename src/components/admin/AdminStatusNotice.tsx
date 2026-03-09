import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

type AdminStatusNoticeProps = {
  status?: string;
};

const statusMap: Record<string, { title: string; description: string; tone: "success" | "info" | "warning" }> = {
  tour_saved: {
    title: "Paket tour berhasil disimpan",
    description: "Perubahan paket tour sudah tersimpan dan siap tampil sesuai data terbaru.",
    tone: "success",
  },
  tour_deleted: {
    title: "Paket tour berhasil dihapus",
    description: "Item tour sudah dihapus dari daftar admin.",
    tone: "success",
  },
  blog_saved: {
    title: "Artikel blog berhasil disimpan",
    description: "Konten blog sudah diperbarui dan tersimpan.",
    tone: "success",
  },
  blog_deleted: {
    title: "Artikel blog berhasil dihapus",
    description: "Item blog sudah dihapus dari daftar admin.",
    tone: "success",
  },
  inquiry_deleted: {
    title: "Inquiry berhasil dihapus",
    description: "Inquiry yang dipilih sudah dihapus dari panel admin.",
    tone: "success",
  },
  homepage_saved: {
    title: "Homepage settings berhasil disimpan",
    description: "Perubahan section homepage sudah tersimpan.",
    tone: "success",
  },
  documentation_saved: {
    title: "Dokumentasi berhasil disimpan",
    description: "Galeri dokumentasi homepage sudah diperbarui.",
    tone: "success",
  },
  storage_read_only: {
    title: "Penyimpanan production bersifat read-only",
    description: "Perubahan dan upload gambar tidak bisa disimpan di deployment ini. Gunakan storage eksternal atau server yang mendukung write access untuk CMS file-based.",
    tone: "warning",
  },
};

export default function AdminStatusNotice({ status }: AdminStatusNoticeProps) {
  if (!status || !statusMap[status]) {
    return null;
  }

  const config = statusMap[status];
  const styles = {
    success: {
      wrap: "border-emerald-200 bg-emerald-50/80 text-emerald-950",
      icon: "text-emerald-600",
      desc: "text-emerald-800/80",
      Icon: CheckCircle2,
    },
    info: {
      wrap: "border-sky-200 bg-sky-50/80 text-sky-950",
      icon: "text-sky-600",
      desc: "text-sky-800/80",
      Icon: Info,
    },
    warning: {
      wrap: "border-amber-200 bg-amber-50/80 text-amber-950",
      icon: "text-amber-600",
      desc: "text-amber-800/80",
      Icon: TriangleAlert,
    },
  }[config.tone];

  const Icon = styles.Icon;

  return (
    <div className={`rounded-3xl border px-5 py-4 shadow-sm ${styles.wrap}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${styles.icon}`} />
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em]">{config.title}</div>
          <div className={`mt-1 text-sm ${styles.desc}`}>{config.description}</div>
        </div>
      </div>
    </div>
  );
}
