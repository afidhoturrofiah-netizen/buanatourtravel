"use client";

import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface ImageCropUploadProps {
  name: string;
  existingImage?: string;
  aspect?: number;
  label?: string;
}

function getCroppedBlob(imageSrc: string, crop: Area): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }
      ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        "image/jpeg",
        0.92,
      );
    };
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = imageSrc;
  });
}

export default function ImageCropUpload({ name, existingImage, aspect = 4 / 3, label = "Upload gambar" }: ImageCropUploadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const originalFileName = useRef("image.jpg");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    originalFileName.current = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCroppedPreview(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    if (!imageSrc || !croppedArea) return;
    try {
      const blob = await getCroppedBlob(imageSrc, croppedArea);
      const previewUrl = URL.createObjectURL(blob);
      setCroppedPreview(previewUrl);
      setIsCropping(false);

      // Create file with proper name and type
      const file = new File([blob], originalFileName.current, { 
        type: "image/jpeg",
        lastModified: Date.now()
      });
      
      // Use DataTransfer to set files on hidden input
      const dt = new DataTransfer();
      dt.items.add(file);
      
      if (hiddenInputRef.current) {
        hiddenInputRef.current.files = dt.files;
        // Trigger change event to ensure form recognizes the file
        const event = new Event('change', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Crop failed:', error);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setCroppedPreview(null);
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (hiddenInputRef.current) {
      const dt = new DataTransfer();
      hiddenInputRef.current.files = dt.files;
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-800">{label}</label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="block w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm"
      />

      {/* Hidden file input that carries the cropped result for form submission */}
      <input ref={hiddenInputRef} type="file" name={name} className="hidden" />

      {isCropping && imageSrc && (
        <div className="mt-4 space-y-3">
          <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-zinc-500">Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-amber-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleConfirmCrop}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
            >
              Konfirmasi Crop
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 transition hover:bg-zinc-50"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {croppedPreview && !isCropping && (
        <div className="mt-4 max-w-sm overflow-hidden rounded-[24px] border border-zinc-200 bg-zinc-50 p-2">
          <div className="relative overflow-hidden rounded-[18px] bg-zinc-100" style={{ aspectRatio: aspect }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={croppedPreview} alt="Hasil crop" className="h-full w-full object-cover" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-medium">✔ Gambar sudah di-crop</span>
            <button
              type="button"
              onClick={() => { setIsCropping(true); setCroppedPreview(null); }}
              className="text-xs text-amber-600 underline"
            >
              Crop ulang
            </button>
          </div>
        </div>
      )}

      {!croppedPreview && !isCropping && existingImage && (
        <div className="mt-4 max-w-sm overflow-hidden rounded-[24px] border border-zinc-200 bg-zinc-50 p-2">
          <div className="relative overflow-hidden rounded-[18px] bg-zinc-100" style={{ aspectRatio: aspect }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={existingImage} alt="Gambar saat ini" className="h-full w-full object-cover" />
          </div>
          <div className="mt-2 text-xs text-zinc-500">Gambar saat ini</div>
        </div>
      )}
    </div>
  );
}
