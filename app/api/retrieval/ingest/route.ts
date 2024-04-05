import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const text = body.text;
//   const links = [
//     'https://sterling.ng/',
//     'https://sterling.ng/diaspora/',
//     'https://sterling.ng/sls/',
//     'https://sterling.ng/health-finance/',
//     'https://sterling.ng/personal/',
//     'https://sterling.ng/inspired/',
//     'https://sterling.ng/pos-agent-banking-details/',
//     'https://sterling.ng/support/no-to-fraud/',
//     'https://sterling.ng/serious/',
//     'https://sterling.ng/health-engaged/',
//     'https://sterling.ng/cookie-policy/',
//     'https://sterling.ng/rates/',
//     'https://sterling.ng/onewoman/',
//     'https://sterling.ng/sway/',
//     'https://sterling.ng/gift-cards/',
//     'https://sterling.ng/onehome/msmehuddle/',
//     'https://sterling.ng/coronavirus/',
//     'https://sterling.ng/sustainability/',
//     'https://sterling.ng/payon/',
//     'https://sterling.ng/cards/',
//     'https://sterling.ng/payon-onboarding-forms/',
//     'https://sterling.ng/smedan/',
//     'https://sterling.ng/hunt/',
//     'https://sterling.ng/support/contact-us/',
//     'https://sterling.ng/think/',
//     'https://sterling.ng/about/board-of-directors/',
//     'https://sterling.ng/about/executive-management/',
//     'https://sterling.ng/faqs/',
//     'https://sterling.ng/graduate-trainee/',
//     'https://sterling.ng/onebank/',
//     'https://sterling.ng/papss/',
//     'https://sterling.ng/business-loans/',
//     'https://sterling.ng/choplaif/',
//     // 'https://sterling.ng/privacy/',  // TODO: start from nxt
//     'https://sterling.ng/about/',
//     'https://sterling.ng/virtualcards/',
//     'https://sterling.ng/cares/',
//     'https://sterling.ng/forexreport/',
//     'https://sterling.ng/entertainment/',
//     'https://sterling.ng/onecollect/',
//     'https://sterling.ng/towers/',
//     'https://sterling.ng/branches/',
//     'https://sterling.ng/tokenfaqs/',
//     'https://sterling.ng/bugs/',
//     'https://sterling.ng/about/investors/reports/',
//     'https://sterling.ng/lasrra/',
//     'https://sterling.ng/personal/debit-cards/',
//     'https://sterling.ng/oneforce/',
//     'https://sterling.ng/onemama/',
//     'https://sterling.ng/calabarfest/',
//     'https://sterling.ng/about/investors/investor-relations/',
//     'https://sterling.ng/premium-card/',
//     'https://sterling.ng/personal/investment/',
//     'https://sterling.ng/premium/',
//     'https://sterling.ng/amazon/',
//     'https://sterling.ng/internships/',
//     'https://sterling.ng/personal/e-channels/ussd/',
//     'https://sterling.ng/business/',
//     'https://sterling.ng/apprentice/',
//     'https://sterling.ng/nexford/',
//     'https://sterling.ng/momship/',
//     'https://sterling.ng/sgm/',
//     'https://sterling.ng/forms/',
//     'https://sterling.ng/insider-form/',
//     'https://sterling.ng/about/awards/',
//     'https://sterling.ng/about/careers/awards/',
//     'https://sterling.ng/about/careers/',
//     'https://sterling.ng/edpay/',
//     'https://sterling.ng/specta-basic/',
//     'https://sterling.ng/pro/',
//     'https://sterling.ng/corporate/',
//     'https://sterling.ng/gig-it/',
//     'https://sterling.ng/experienced-hires/',
//     'https://sterling.ng/agriculture/',
//     'https://sterling.ng/savingsaccounts/',
//     'https://sterling.ng/btmp/',
//     'https://sterling.ng/about/investors/',
//     'https://sterling.ng/durbar/',
//     'https://sterling.ng/holdco/',
//     'https://sterling.ng/trust/',
//     'https://sterling.ng/sultan/',
//     'https://sterling.ng/cruise/',
//     'https://sterling.ng/agric-summit-2021/',
//     'https://sterling.ng/onehome/',
//     'https://sterling.ng/corporate/payments/',
//     'https://sterling.ng/onehome/event/',
//     'https://sterling.ng/holdco/people/',
//     'https://sterling.ng/edubanc/',
//     'https://sterling.ng/banking/',
//     'https://sterling.ng/how-to-submit-a-complaint/',
//     'https://sterling.ng/corporate/heart/',
//     'https://sterling.ng/onewomandiscounts/',
//     'https://sterling.ng/corporate/sme/payment-solutions/',
//     'https://sterling.ng/help-centre/',
//     'https://sterling.ng/personal/e-channels/',
//     'https://sterling.ng/1e-products/',
//     'https://sterling.ng/lets-meet-you/',
//     'https://sterling.ng/joy/',
//     'https://sterling.ng/personal/open-account/',
//     'https://sterling.ng/about/careers/jobs/',
//     'https://sterling.ng/about/careers/jobs/investornews/',
//     'https://sterling.ng/personal/prepaid-cards/',
//     'https://sterling.ng/currentaccounts/',
//     'https://sterling.ng/investmentaccounts/',
//     'https://sterling.ng/support/',
//     'https://sterling.ng/meeting/',
//     'https://sterling.ng/makethemove/',
//     'https://sterling.ng/fireside-chat/',
//     'https://sterling.ng/possible/',
//     'https://sterling.ng/export-trade/',
//     'https://sterling.ng/about/events/',
//     'https://sterling.ng/onepay-business/',
//     'https://sterling.ng/herforgrowth/',
//     'https://sterling.ng/aboutcodetobank/',
//     'https://sterling.ng/blog/',
//     'https://sterling.ng/bloomnetwork/',
//     'https://sterling.ng/linkt/',
//     'https://sterling.ng/bloom-networkevent/',
//     'https://sterling.ng/techstars/',
//     'https://sterling.ng/support/fxdefaulters/',
//     'https://sterling.ng/onebank/',
//     'https://sterling.ng/oneprofessional/',
//     'https://sterling.ng/referrals/',
//     'https://sterling.ng/personal/i-can-save/',
//     'https://sterling.ng/personal/classic-current/',
//     'https://sterling.ng/personal/credit-cards/',
//     'https://sterling.ng/bloom-networkblog/',
//     'https://sterling.ng/media-pg/',
//     'https://sterling.ng/ol/',
//     'https://sterling.ng/bvnfaq/',
//     'https://sterling.ng/form-m-faqs/',
//     'https://sterling.ng/meter-acquisition/',
//     'https://sterling.ng/qr/',
//     'https://sterling.ng/tradeservices/',
//     'https://sterling.ng/bloom-networkexperiences/',
//     'https://sterling.ng/bloom-networkhottopics/',
//     'https://sterling.ng/bloom-networkopportunities/',
//     'https://sterling.ng/bloomhall-of-fame/',
//     'https://sterling.ng/bloom-networkcsr/',
//     'https://sterling.ng/payon-old/',
//     'https://sterling.ng/pre-mrf/',
//     'https://sterling.ng/mrf/',
//     'https://sterling.ng/e-naira-faqs/',
//     'https://sterling.ng/about/media/',
//     'https://sterling.ng/update/',
//     'https://sterling.ng/careerfair/',
//     'https://sterling.ng/tgif/',
//     'https://sterling.ng/do/',
//     'https://sterling.ng/m-join/',
//     'https://sterling.ng/m-listing/',
//     'https://sterling.ng/m-signup/',
//     'https://sterling.ng/fxtellerpoint/',
//     'https://sterling.ng/cafe-one-terms-and-conditions/',
//     'https://sterling.ng/cafe-one-privacy-policy/',
//     'https://sterling.ng/domfaq/',
//     'https://sterling.ng/corporate/sme/mcash/',
//     'https://sterling.ng/corporate/sme/spay/',
//     'https://sterling.ng/personal/personal-loan-types/',
//     'https://sterling.ng/personal/current/',
//     'https://sterling.ng/corporate/services/',
//     'https://sterling.ng/payon-sign-up/',
//     'https://sterling.ng/profaqs/',
//     'https://sterling.ng/corporate/business-banking/',
//     'https://sterling.ng/about/rating/',
//     'https://sterling.ng/trade2faq/',
//     'https://sterling.ng/supa-agro/',
//     'https://sterling.ng/sabex/',
//     'https://sterling.ng/fxbid/',
//     'https://sterling.ng/random/',
//     'https://sterling.ng/sustainability/our-community/',
//     'https://sterling.ng/crs-entity/',
//     'https://sterling.ng/crs-fatca-self-certication-form-individual/',
//     'https://sterling.ng/support/feedback/',
//     'https://sterling.ng/kyc/',
//     'https://sterling.ng/opportunitynetwork/',
//     'https://sterling.ng/refer/',
//     'https://sterling.ng/trade/',
//     'https://sterling.ng/tradeform/',
//     'https://sterling.ng/tremendoc/',
//     'https://sterling.ng/personal/loans/',
//     'https://sterling.ng/convenience/',
//     'https://sterling.ng/onewomandiscountstores/',
//     'https://sterling.ng/getpaid/',
//     'https://sterling.ng/schoolfees/',
//     'https://sterling.ng/crs-form/',
//     'https://sterling.ng/sustainability/our-people/',
//     'https://sterling.ng/sustainability-old/',
//     'https://sterling.ng/spay/',
//     'https://sterling.ng/sterlingprofaq/'
//   ]
//     try {
//       const client = createClient(
//         process.env.SUPABASE_URL!,
//         process.env.SUPABASE_PRIVATE_KEY!,
//       );

//       for (const link of links) {
//         const loader = new CheerioWebBaseLoader(link);
//         const docs = await loader.load();
//         console.log(docs);

//         const textSplitter = new RecursiveCharacterTextSplitter({
//           chunkSize: 1000,
//           chunkOverlap: 200,
//         });
//         const splits = await textSplitter.splitDocuments(docs);

//         const vectorstore = await SupabaseVectorStore.fromDocuments(
//           splits,
//           new OpenAIEmbeddings(),
//           {
//             client,
//             tableName: "documents",
//             queryName: "match_documents",
//           },
//         );

//         // Add a delay or sleep here
//         await new Promise(resolve => setTimeout(resolve, 3000)); // 5 seconds delay
//       }

//       return NextResponse.json({ ok: true }, { status: 200 });
//     } catch (e: any) {
//       return NextResponse.json({ error: e.message }, { status: 500 });
//     }
//   }

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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = body.text;
  console.log(text);

  try {
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!,
    );

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
      chunkSize: 256,
      chunkOverlap: 20,
    });

    const splitDocuments = await splitter.createDocuments([text]);

    const vectorstore = await SupabaseVectorStore.fromDocuments(
      splitDocuments,
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
