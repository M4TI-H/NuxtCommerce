import type ProductHistory from "~/types/ProductHistoryType";
import type Product from "~/types/ProductType";

export function useProduct(){
  const errorMsg = ref<string>("");
  const loading = ref<boolean>(false);

  async function fetchData<FetchType>(url: string, options?: any): Promise<FetchType> {
    try {
      return await $fetch<FetchType>(url, options) as FetchType;
    }
    catch (error: any) {
      errorMsg.value = error.message;
      throw error;
    }
  }

  // fetch only the products added by the user
  const productsData = ref<Product[]>();
  const fetchUserProducts = async(filter: string, order: boolean) => {
    loading.value = true;
    
    try {
      productsData.value = await fetchData<Product[]>("/api/products/fetch_all", {
        method: "POST",
        body: { filter, order }
      });
    }
    catch {}
    finally { loading.value = false }
  }

  // fetch all products visible to single user
  const publicProductsData = ref<Product[]>();
  const fetchPublicProducts = async() => {
    loading.value = true;
    try {
      publicProductsData.value = await fetchData<Product[]>("/api/products/fetch_public");
    }
    catch {}
    finally { loading.value = false }
  }

  //fetch one product selected by user
  const product = ref<Product>();
  const fetchOneProduct = async (productID: number) => {
    loading.value = true;
    try {
      product.value = await fetchData<Product>(`/api/products/fetch_one/${productID}`);
    }
    catch {}
    finally { loading.value = false }
  }

  //delete one product
  const deleteProduct = async (productID: number) => {
    loading.value = true;
    try {
      await fetchData<null>(`/api/products/delete/${productID}`, {
        method: "DELETE"
      });
    }
    catch {}
    finally { loading.value = false }
  }

  //add new product to user's list
  const addNewProduct = async (data: Product) => {
    loading.value = true;
    try {
      await fetchData<null>("/api/products/create", {
        method: "POST",
        body: {
          name: data.name,
          code: data.code,
          price: data.price,
          isPublic: data.isPublic,
          availability: data.availability
        }
      });
    }
    catch {}
    finally { loading.value = false }
  }

  //update product data
  const editProduct = async (newData: Product, productID: number) => {
    loading.value = true;
    try {
      await fetchData<null>(`/api/products/edit/${productID}`, {
        method: "PUT",
        body: {
          name: newData.name,
          code: newData.code,
          price: newData.price,
          isPublic: newData.isPublic,
          availability: newData.availability
        }
      });
    }
    catch {}
    finally { loading.value = false }
  }

  //fetch product's order history
  const productHistory = ref<ProductHistory[]>([]);
  const fetchProductHistory = async (productID: number) => {
    loading.value = true;
    try {
      productHistory.value = await $fetch(`/api/products/fetch_history/${productID}`);
    }
    catch {}
    finally { loading.value = false }
  }

  return {
    productsData,
    publicProductsData,
    product,
    productHistory,
    errorMsg,
    loading,
    fetchUserProducts,
    fetchPublicProducts,
    fetchOneProduct,
    deleteProduct,
    addNewProduct,
    editProduct,
    fetchProductHistory
  }
}