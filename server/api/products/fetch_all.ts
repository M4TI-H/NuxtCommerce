import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Product from "~/types/ProductType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const body = await readBody<{
    filter: string;
    order: boolean;
  }>(event);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id)
    .order(`${body.filter}`, { ascending: body.order });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Product[];
});