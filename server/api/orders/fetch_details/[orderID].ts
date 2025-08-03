import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { OrderDetails } from "~/types/OrderDetailType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const orderID = Number(event.context.params!.orderID);

  if (!orderID || isNaN(orderID)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid order ID" });
  }

   const { data, error } = await supabase
    .from("ordersDetails")
    .select(`*, products (code, name)`)
    .eq("order_id", orderID)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as OrderDetails[];
});