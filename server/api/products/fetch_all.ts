import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Product from "~/types/ProductType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price, user_id")
    .eq("user_id", user.id)
    .order("date_of_creation", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Product[];
});