'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

export interface ImageUploaderProps {
  onChangeImage?: (file: File) => void;
  maxSize?: number;
  accept?: Accept;
  width?: number;
  height?: number;
  text?: string;
  defaultImage?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChangeImage,
  maxSize = 10_000_000,
  accept = { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  width = 400,
  height = 300,
  text,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      onChangeImage?.(file);
    },
    [onChangeImage]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize,
    accept,
  });

  // Cho phép nhận mảng readonly
  const formatErrorMessage = (rejections: readonly FileRejection[]): string | null => {
    if (rejections.length === 0) return null;
    const err = rejections[0].errors[0];
    const mb = Math.round(maxSize / 1_000_000);
    if (err.code === 'file-too-large') {
      return `Kích thước ảnh tối đa là ${mb}MB`;
    }
    if (err.code === 'file-invalid-type') {
      const types = Object.keys(accept)
        .map(t => t.split('/')[1])
        .join(', ');
      return `Định dạng không hợp lệ. Chỉ hỗ trợ: ${types}`;
    }
    return err.message;
  };

  const errorMessage = formatErrorMessage(fileRejections);

  return (
    <div className="mx-auto space-y-2">
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-6"
      >
        {preview ? (
          <div className="relative inline-block">
            <Image
              src={preview}
              alt="Uploaded image"
              className="rounded-lg object-contain"
              width={width}
              height={height}
            />
            <button
              type="button"
              aria-label="Xoá ảnh"
              className="absolute right-2 top-2 bg-white rounded-full shadow hover:bg-red-100 p-1 transition"
              onClick={e => {
                e.stopPropagation();
                setPreview(null);
                onChangeImage?.(undefined as unknown as File);
              }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-red-500">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M6 14L14 6" />
              </svg>
            </button>
          </div>
        ) : (
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
        )}
        <input {...getInputProps()} />
        <p>{text || (isDragActive ? 'Thả file vào đây' : 'Click hoặc kéo thả file để upload')}</p>
      </div>
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
    </div>
  );
};
