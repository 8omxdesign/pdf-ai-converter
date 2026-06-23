"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    // 結果ページへ
    window.location.href = `/result?text=${encodeURIComponent(data.text)}`;
  };

  return (
    <main>
      <h1>PDF アップロード</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "変換中…" : "変換する"}
      </button>
    </main>
  );
}
