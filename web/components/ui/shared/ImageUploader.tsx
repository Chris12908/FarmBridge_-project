"use client";

import { useRef, useState } from "react";
import { useUpload } from "@/hooks/uploads/useUpload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  maxImages = 5,
  label = "Product Photos",
  className,
}: ImageUploaderProps) {
  const { uploadImage, isUploading, progress } = useUpload();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = value.length < maxImages;

  async function handleFiles(files: FileList | null) {
    if (!files || !canAddMore) return;
    const filesToUpload = Array.from(files).slice(0, maxImages - value.length);

    for (const file of filesToUpload) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        continue;
      }
      const result = await uploadImage(file);
      if (result?.url) {
        onChange([...value, result.url]);
      } else {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  }

  function handleRemove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          {label}{" "}
          <span className="normal-case font-normal text-slate-400">
            ({value.length}/{maxImages})
          </span>
        </p>
      )}

      {/* Thumbnails */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, idx) => (
            <div
              key={url}
              className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group"
            >
              <Image
                src={url}
                alt={`Upload ${idx + 1}`}
                fill
                className="object-cover"
              />
              {idx === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-[9px] font-bold text-center bg-primary/80 text-white py-0.5">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white items-center justify-center hidden group-hover:flex transition-all"
              >
                <span className="material-symbols-outlined text-[12px]">close</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {canAddMore && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all",
            dragOver
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-700/30",
            isUploading && "pointer-events-none"
          )}
        >
          {isUploading ? (
            <>
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Uploading... {progress}%
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-3xl text-slate-400">
                add_photo_alternate
              </span>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Click or drag to upload
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG, WEBP up to 10MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
