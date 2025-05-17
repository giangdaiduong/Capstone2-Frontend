/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

export interface ImageUploaderProps {
  onChangeImage?: (file: File) => void;
  maxSize?: number;
  accept?: Accept;
  width?: number;
  height?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChangeImage,
  maxSize = 1000000,
  accept = { 'image/png': [], 'image/jpeg': [] },
  width = 400,
  height = 300,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        setError('Kích thước hoặc định dạng không hợp lệ');
        return;
      }
      const file = acceptedFiles[0];
      if (!file) return;
      setError(null);
      // tạo preview
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

  return (
    <div className="mx-auto space-y-2">
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-6"
      >
        {preview ? (
          <Image
            src={preview as string}
            alt="Uploaded image"
            className="rounded-lg object-contain"
            width={width}
            height={height}
            layout="intrinsic"
          />
        ) : (
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
        )}
        <input {...getInputProps()} />
        <p>{isDragActive ? 'Thả file vào đây' : 'Click hoặc kéo thả file để upload'}</p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
