"use server";

import { z } from "zod";
import { FormSchema } from "../types";
/* import { createBrowserClient } from "@supabase/ssr"; */
import {createClient } from '@/lib/supabase/server'
export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({ email, password });
  let message:string |null=null
  if(response.error){
    message = response.error.message
  }
  return {...response,message,error:null};
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  if(data?.length) return {error:{message:'User already exists',data}}
  const response=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`}})
  return response;
  }
