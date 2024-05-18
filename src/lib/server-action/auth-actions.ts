"use server";

import { z } from "zod";
import { FormSchema } from "../types";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {}
