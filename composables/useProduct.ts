import type Product from "~/types/ProductType";
const productsData = ref<Product[]>();

export function useProduct(){
  const errorMsg = ref<string>("");
  const loading = ref<boolean>(false);

  // fetch only the products added by the user
  const fetchUserProducts = async(filter: string, order: boolean) => {
    loading.value = true;
    
    try {
      const data = await $fetch<Product[]>("/api/products/fetch_all", {
        method: "POST",
        body: {
          filter: filter,
          order: order
        }
      }
      );
      productsData.value = data;
    }
    catch (error: any) {
      errorMsg.value = error.message;
    }

    loading.value = false;
  };

  // fetch all products visible to single user
  const publicProductsData = ref<Product[]>();
  const fetchPublicProducts = async() => {
    loading.value = true;

    try {
      const data = await $fetch("/api/products/fetch_public");
      publicProductsData.value = data;
    }
    catch(error: any){
      errorMsg.value = error.message;
    }

    loading.value = false;
  }

  //fetch one product selected by user
  const product = ref<Product>();
  const fetchOneProduct = async (productID: number) => {
    loading.value = true;

    try {
      const data = await $fetch(`/api/products/fetch_one/${productID}`);
      product.value = data;
    }
    catch (error: any) {
      errorMsg.value = error.message
    }

    loading.value = false;
  };

  //delete one product
  const deleteProduct = async (productID: number) => {
    loading.value = true;

    try {
      await $fetch(`/api/products/delete/${productID}`, {
        method: "DELETE"
      });
    }
    catch (error: any) {
      errorMsg.value = error.message
    }

    loading.value = false;
  }

  const addNewProduct = async (data: Product) => {
    loading.value = true;
    
    try {
      await $fetch("/api/products/create", {
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
    catch (error: any) {
      errorMsg.value = error.message
    }

    loading.value = false;
  }

  const editProduct = async (newData: Product, productID: number) => {
    loading.value = true;
    
    try {
      await $fetch(`/api/products/edit/${productID}`, {
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
    catch (error: any) {
      errorMsg.value = error.message
    }

    loading.value = false;
  }

  return {
    productsData,
    publicProductsData,
    product,
    errorMsg,
    loading,
    fetchUserProducts,
    fetchPublicProducts,
    fetchOneProduct,
    deleteProduct,
    addNewProduct,
    editProduct
  }
}