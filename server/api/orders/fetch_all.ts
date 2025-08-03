import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Order from "~/types/OrderType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("order_date", { ascending: false })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Order[];
});