"use client";

export default function ResultPage() {
  const html =
    typeof window !== "undefined"
      ? localStorage.getItem("converted")
      : "";

  return (
    <div>
      <h1>変換結果</h1>
      <div
        style={{ padding: "1rem", background: "#fafafa" }}
        dangerouslySetInnerHTML={{ __html: html || "データがありません" }}
      />
    </div>
  );
}
