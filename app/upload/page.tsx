"use client";
import { useState } from "react";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const res = await fetch("/api/convert", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    localStorage.setItem("converted", data.html);
    window.location.href = "/result";
  }

  return (
    <div>
      <h1>PDF → AI記事化ツール</h1>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept="application/pdf" required />
        <button type="submit" disabled={loading}>
          {loading ? "変換中..." : "変換する"}
        </button>
      </form>
    </div>
  );
}
