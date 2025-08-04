import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "User unauthorized" });
  }

  const body = await readBody<{
    name: string;
    code: string;
    price: number;
    isPublic: boolean;
    availability: number;
  }>(event);

  const { error } = await supabase
    .from("products")
    .insert({
      name: body.name,
      code: body.code,
      price: body.price,
      isPublic: body.isPublic,
      user_id: user.id,
      availability: body.availability
    });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
