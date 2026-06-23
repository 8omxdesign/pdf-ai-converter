import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import OpenAI from "openai";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const pdfData = await pdf(buffer);

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const prompt = `
あなたはPDFを読みやすいWeb記事に変換するAIです。
以下のPDF内容を元に、見出し・段落・箇条書きを使って
読みやすいHTML記事を生成してください。

PDF内容:
${pdfData.text}
`;

  const completion = await client.responses.create({
    model: "gpt-4.1",
    input: prompt,
  });

  const html = completion.output_text;

  return NextResponse.json({ html });
}
