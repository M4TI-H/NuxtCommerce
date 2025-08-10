import type Order from '~/types/OrderType';
import type OrderItem from '~/types/OrderItemType';
import type { OrderDetails } from '~/types/OrderDetailType';

export function useOrder() {
  const errorMsg = ref<string>("");
  const loading = ref<boolean>(false);

  const ordersData = ref<Order[]>([]);
  //fetch all orders
  const fetchOrders = async (filter: string, order: boolean) => {
    loading.value = true;

    try {
      const data = await $fetch("/api/orders/fetch_all", {
        method: "POST",
        body: {
          filter: filter,
          order: order
        }
      });
      ordersData.value = data;
    }
    catch(error: any){
      errorMsg.value = error.message;
    }

    loading.value = false;
  }

  //create new order and post order items data to db
  const newOrder = ref<OrderItem[]>([]);
  const createOrder = async (totalOrder: OrderItem[], title: string, sum: number) => {
    loading.value = true;

    try {
      await $fetch("/api/orders/create", {
        method: "POST",
        body: {
          title: title,
          sum: sum,
          items: totalOrder.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_order: item.price,
            name_at_order: item.name
          }))
        }
      });
      
      newOrder.value = [];
      navigateTo("/orders");
    }
    catch(error: any){
      errorMsg.value = error.message;
    }

    loading.value = false;
  }

  // fetch order and product details
  const orderDetails = ref<OrderDetails[]>([]);
  const fetchOrderDetails = async (orderID: number) => {
    loading.value = true;

    try {
      const data = await $fetch<OrderDetails[]>(`/api/orders/fetch_details/${orderID}`);
      orderDetails.value = data;
    }
    catch(error: any){
      errorMsg.value = error.message;
    }

    loading.value = false;
  }

  // add or update data of product added to the order
  const totalOrder = ref<OrderItem[]>([]);
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
    ordersData,
    totalOrder,
    orderDetails,
    errorMsg,
    loading,
    fetchOrders,
    createOrder,
    fetchOrderDetails,
    updateTotalOrder
  }
}