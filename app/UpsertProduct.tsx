
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SingleView from '@/components/SingleView';
import { ProductForm } from '@/components/ProductForm';
import { useApiContext } from '@/context/ApiContext';
import { styles } from '@/constants/StyleSheet';

export default function UpsertProduct() {

  const { loading, currentProduct } = useApiContext();

  return (
    <SingleView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
      {
        loading && 
        <ThemedView style={styles.secondaryContainer}>
          <ThemedText type="defaultSemiBold">Loading...</ThemedText>
        </ThemedView>
      }
      {
        !loading &&
        <>
          <ThemedView style={styles.secondaryContainer}>
            <ThemedText type="title">Formulario de registro</ThemedText>
          </ThemedView>
          {
            (currentProduct.id && currentProduct.id !== "") ? <ProductForm data={currentProduct}/> : <ProductForm/>
          }
        </>
        
      }
    </SingleView>
  );
}
