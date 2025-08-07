import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    email: string;
    password: string;
  }>(event);

  const { error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { status: "success"};
});
