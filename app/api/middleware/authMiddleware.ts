import { NextRequest, NextResponse } from "next/server";



export async function authMiddleware(req: NextRequest): Promise<boolean> {
  const apiKey = req.headers.get('x-api-key');
  console.log(apiKey);
  console.log();

  return apiKey === process.env.ACCESS_kEY!;
}