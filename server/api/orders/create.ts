import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { NewOrderDetails } from "~/types/OrderDetailType";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const body = await readBody<{
    title: string;
    sum: number;
    items: {
      product_id: number;
      quantity: number;
      price_at_order: number;
      name_at_order: string;
    }[];
  }>(event);

  const { data: newOrder, error } = await supabase
    .from("orders")
    .insert({
      order_title: body.title,
      total_price: body.sum,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error?.message });
  }

  if (!newOrder) {
    throw createError({ statusCode: 500, statusMessage: "Failed to create order." });
  }

  const orderItems: NewOrderDetails[] = body.items.map(item => ({
    order_id: newOrder.id,
    product_id: item.product_id!,
    quantity: item.quantity,
    price_at_order: item.price_at_order,
    name_at_order: item.name_at_order,
    user_id: user.id
  }));

  const { error: detailError } = await supabase
  .from("ordersDetails")
  .insert(orderItems)

  if (detailError) {
    throw createError({ statusCode: 500, statusMessage: detailError.message });
  }

  const productsID = body.items.map(item => item.product_id);

  const { data, error: productsError } = await supabase
    .from("products")
    .select("id, availability")
    .in("id", productsID)

  if (productsError) {
    throw createError({ statusCode: 500, statusMessage: productsError.message });
  }

  for (const item of body.items) {
    const product = data?.find(p => p.id === item.product_id);
    
    const newStock = product.availability - item.quantity;

    if (newStock < 0) {
      throw createError({ statusCode: 400, statusMessage: `Quantity ordered of product ${item.product_id} is bigger than stocked` });
    }
    
    const { error: updateError } = await supabase
    .from("products")
    .update({
      availability: newStock
    })
    .eq("id", item.product_id);

    if (updateError) {
      throw createError({ statusCode: 500, statusMessage: updateError.message });
    }
  }

});
