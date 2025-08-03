import type { NewOrderDetails } from '~/types/OrderDetailType';
import type Order from '~/types/OrderType';
import type OrderItem from '~/types/OrderItemType';


export function useCreateOrder() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const errorMsg = ref<string>("");
  const totalOrder = ref<OrderItem[]>([]);
  const loading = ref<boolean>(false);

  const createOrder = async (title: string, sum: number) => {
    if (!user.value) {
      return;
    }
    
    loading.value = true;

    const { data: newOrder, error } = await supabase
    .from("orders")
    .insert({
      order_title: title,
      total_price: sum,
      user_id: user.value.id
    } as any)
    .select("id")
    .single<Order>();

    if (error) {
      errorMsg.value = error.message;
      return;
    }
    else if (!newOrder) {
      errorMsg.value = "No order with this index";
      return;
    }

    const orderItems: NewOrderDetails[] = totalOrder.value.map(item => ({
      order_id: newOrder.id,
      product_id: item.product_id!,
      quantity: item.quantity,
      price_at_order: item.price,
      user_id: user.value!.id
    }));

    const { error: details } = await supabase
    .from("ordersDetails")
    .insert(orderItems as any);

    if (error) {
      console.error(details);
      return;
    }

    loading.value = false;
    navigateTo("/orders");
  }

  // updateTotalOrder - add or update data of product added to the order
  const updateTotalOrder = (updatedItem: OrderItem) => {
    const item_id = totalOrder.value.findIndex(item => item.product_id === updatedItem.product_id);

    if (item_id !== -1) {
      totalOrder.value[item_id] = updatedItem;
    }
    else {
      totalOrder.value.push(updatedItem);
    }
  }

  return {
    totalOrder,
    errorMsg,
    loading,
    createOrder,
    updateTotalOrder
  }
}