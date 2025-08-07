import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type ProductHistory from "~/types/ProductHistoryType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const productID = Number(event.context.params!.productID);

  if (!productID || isNaN(productID)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid product ID" });
  }

  const { data, error } = await supabase
    .from("ordersDetails")
    .select(`quantity, price_at_order, orders (order_date)`)
    .eq("product_id", productID)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as ProductHistory[];
});