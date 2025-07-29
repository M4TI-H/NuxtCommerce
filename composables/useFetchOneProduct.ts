import type ProductType from "~/types/ProductType";

export default function useFetchOneProduct() {
  const supabase = useSupabaseClient();
  const errorMsg = ref<string>("");
  const product = ref<ProductType>();
  
  // fetch single product
  const fetchProduct = async (productID: number) => {
    const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productID)
    .single()

    if (error) {
      errorMsg.value = error.message
    }
    else {
      product.value = data;
    }
  };

  return {
    product,
    errorMsg,
    fetchProduct
  }
}