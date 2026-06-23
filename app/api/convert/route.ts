export const runtime = "edge";
import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import OpenAI from "openai";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // PDF → テキスト抽出
  const data = await pdf(buffer);
  const text = data.text;

  // OpenAI 要約
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "PDF の内容を要約してください。" },
      { role: "user", content: text },
    ],
  });

  return NextResponse.json({
    text: completion.choices[0].message.content,
  });
}
