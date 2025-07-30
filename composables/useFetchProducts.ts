import type ProductType from "~/types/ProductType";

export function useFetchProducts(){
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const errorMsg = ref<string>("");
  const loading = ref<boolean>(false);
  // fetch only the products added by the user
  const productsData = ref<ProductType[]>();
  const fetchUserProducts = async() => {
    if (!user.value) {
      return;
    }
    loading.value = true;
    const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price, user_id")
    .eq("user_id", user.value.id)
    .order("date_of_creation", { ascending: false })
    .returns<ProductType[]>();

    if (error) {
      errorMsg.value = error.message;
    }
    else {
      productsData.value = data?.filter(product => product.user_id === user.value!.id);
    }

    loading.value = false;
  };


  // fetch all products visible to single user
  const publicProductsData = ref<ProductType[]>();
  const fetchPublicProducts = async() => {
    if (!user.value) {
      return;
    }

    loading.value = true;

    const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price")
    .or(`user_id.eq.${user.value.id}, isPublic.eq.true`)
    .order("date_of_creation", { ascending: false })

    if (error) {
      errorMsg.value = error.message;
    }
    else {
      publicProductsData.value = data;
    }

    loading.value = false;
  }

  return {
    productsData,
    publicProductsData,
    errorMsg,
    loading,
    fetchUserProducts,
    fetchPublicProducts,
  }
}