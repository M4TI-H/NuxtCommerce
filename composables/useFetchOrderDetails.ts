export function useFetchOrderDetails() {
  const supabase = useSupabaseClient();
  const errorMsg = ref<string>("");

  // fetch order and product details
  const orderDetails = ref<any[] | null>(null);
  const fetchOrderDetails = async (order_id: number) => {
    const { data, error } = await supabase
    .from("ordersDetails")
    .select(`*, products (code, name)`)
    .eq("order_id", order_id)

    if (error) {
      console.error(error)
    }
    
    orderDetails.value = data;
  }

  return {
    orderDetails,
    errorMsg,
    fetchOrderDetails
  }
}