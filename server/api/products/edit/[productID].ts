import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

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

  const body = await readBody<{
    name: string;
    code: string;
    price: number;
    isPublic: boolean;
  }>(event);

  const { error } = await supabase
    .from("products")
    .update({
      name: body.name,
      price: body.price,
      code: body.code,
      isPublic: body.isPublic,
    } as any)
    .eq("id", productID)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
