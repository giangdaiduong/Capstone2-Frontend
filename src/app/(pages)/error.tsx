'use client';

import React from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-2">Có lỗi rồi!</h1>
      <pre className="mb-4 text-red-500">{error.message}</pre>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => reset()}>
        Thử lại
      </button>
    </div>
  );
}
