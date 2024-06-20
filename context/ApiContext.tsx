import { IProduct } from '@/constants/Interfaces';
import HTTP from '@/utils/Http';
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface ApiContextProps {
  loading: boolean,
  downloadProducts: () => Promise<any>,
  allProducts: Array<IProduct>,
  currentProduct: IProduct
  setCurrentProduct: Dispatch<SetStateAction<any>>
  clearCurrentProduct: () => void,
  deleteProduct: (productId: string) => Promise<any>,
}

const defaultProduct: IProduct = {
  id: '',
  name: '',
  description: '',
  logo: '',
  date_release: '',
  date_revision: '',
};


const ApiContext = createContext<ApiContextProps>({
  loading: false,
  downloadProducts: async () => {},
  allProducts: [],
  currentProduct: {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: ""
  },
  setCurrentProduct: () => {},
  clearCurrentProduct: () => {},
  deleteProduct: async () => {}
});

export const ApiContextProvider: React.FC<any> = ({ children }) => {
  
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState<IProduct>(defaultProduct);


  const clearCurrentProduct = () => {
    setCurrentProduct(defaultProduct);
  }

  const downloadProducts = async () => {
    const products = await HTTP.get("/bp/products")
    setAllProducts(products);
    clearCurrentProduct();
    setLoading(false);
  };

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    await HTTP.delete("/bp/products", productId);
    setLoading(false);
  }

  const exportValues = {
    loading,
    downloadProducts,
    allProducts,
    currentProduct,
    setCurrentProduct,
    clearCurrentProduct,
    deleteProduct
  }

  useEffect( () => {
    downloadProducts()
  }, [])

  return (
    <ApiContext.Provider value={exportValues}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};