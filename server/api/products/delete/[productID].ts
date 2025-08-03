import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const productID  = Number(event.context.params!.productID);

  if (!productID || isNaN(productID)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid product ID" });
  }

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productID)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});