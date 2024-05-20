/* import { createBrowserClient } from "@supabase/ssr"; */
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const requestUrl =new URL(req.url)
const code =requestUrl.searchParams.get('code');
if(code){
    const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
        await supabase.auth.exchangeCodeForSession(code)
}
return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}