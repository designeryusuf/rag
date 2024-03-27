import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { PlaywrightWebBaseLoader } from "langchain/document_loaders/web/playwright";
export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = body.text;

  if (process.env.NEXT_PUBLIC_DEMO === "true") {
    return NextResponse.json(
      {
        error: [
          "Ingest is not supported in demo mode.",
          "Please set up your own version of the repo here: https://github.com/langchain-ai/langchain-nextjs-template",
        ].join("\n"),
      },
      { status: 403 },
    );
  }

  try {
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!,
    );

    const loader = new PlaywrightWebBaseLoader("https://sterling.ng/");

    const docs = await loader.load();
    console.log(docs);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splits = await textSplitter.splitDocuments(docs);

    // const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    //   chunkSize: 256,
    //   chunkOverlap: 20,
    // });

    // const splitDocuments = await splitter.createDocuments([text]);

    const vectorstore = await SupabaseVectorStore.fromDocuments(
      splits,
      new OpenAIEmbeddings(),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      },
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// async function vector() {
//   try {
//     const client = createClient(
//       process.env.SUPABASE_URL!,
//       process.env.SUPABASE_PRIVATE_KEY!,
//     );

//     const loader = new CheerioWebBaseLoader(
//       "https://sterling.ng"
//     );

//     const docs = await loader.load();

//     const textSplitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 1000,
//       chunkOverlap: 200,
//     });
//     const splits = await textSplitter.splitDocuments(docs);

//     const vectorstore = await SupabaseVectorStore.fromDocuments(
//       splits,
//       new OpenAIEmbeddings(),
//       {
//         client,
//         tableName: "documents",
//         queryName: "match_documents",
//       },
//     );

//     console.log(vectorstore + "vectorstore");
//   } catch (e: any) {
//     console.log(e);
//   }
// }

// vector();
