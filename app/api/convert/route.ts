import pdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    // フォームデータを取得
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file received" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ArrayBuffer → Buffer に変換（pdf-parse は Buffer 必須）
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // PDF を解析
    const data = await pdfParse(buffer);

    return new Response(
      JSON.stringify({ text: data.text }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
