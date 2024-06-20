import React from 'react';
import { View, Text } from 'react-native';
import { useApiContext } from '../context/ApiContext';

const TestComponent: React.FC = () => {
  const {
    loading,
    allProducts,
    currentProduct,
    downloadProducts,
    deleteProduct,
    setCurrentProduct,
    clearCurrentProduct,
  } = useApiContext();

  React.useEffect(() => {
    downloadProducts();
  }, [downloadProducts]);

  return (
    <View>
      <Text testID="loading">{loading ? 'Loading' : 'Loaded'}</Text>
      <Text testID="product-count">{allProducts?.length || 0}</Text>
      <Text testID="current-product">{currentProduct?.name}</Text>
    </View>
  );
};

export default TestComponent;
