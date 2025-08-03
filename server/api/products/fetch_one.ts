import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Product from "~/types/ProductType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const { productID } = event.context.params!;

  if (!productID || isNaN(Number(productID))) {
    throw createError({ statusCode: 400, statusMessage: "Invalid product ID" });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productID)
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Product;
});