import type ProductType from "~/types/ProductType";

export default function useFetchProducts(){
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const errorMsg = ref<string>("");
  const productsData = ref<ProductType[]>();
  const publicProductsData = ref<ProductType[]>();

  // fetch only the products added by the user
  const fetchUserProducts = async() => {
    const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price, user_id")
    .order("date_of_creation", { ascending: false })
    .returns<ProductType[]>();

    if (error) {
      errorMsg.value = error.message;
    }
    else {
      productsData.value = data?.filter(product => product.user_id === user.value!.id);
    }
  };


  // fetch all products visible to single user
  const fetchPublicProducts = async() => {
    const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price")
    .order("date_of_creation", { ascending: false })

    if (error) {
      errorMsg.value = error.message;
    }
    else {
      publicProductsData.value = data;
    }
  }

  return {
    productsData,
    publicProductsData,
    errorMsg,
    fetchUserProducts,
    fetchPublicProducts
  }
}