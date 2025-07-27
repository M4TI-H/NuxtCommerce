import type ProductType from "~/types/ProductType";

export default function useFetchProducts(){
  const supabase = useSupabaseClient();
  const errorMsg = ref<string>("");
  const productsData = ref<ProductType[]>();

  const fetchProducts = async() => {

    const { data, error } = await supabase
    .from("products")
    .select("id, name, code, isPublic, price")
    .order("date_of_creation", { ascending: false })

    if (error) {
      errorMsg.value = error.message;
    }
    else {
      productsData.value = data;
    }
  };

  return {
    productsData,
    errorMsg,
    fetchProducts,
  }
}