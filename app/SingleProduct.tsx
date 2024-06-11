
import { Image, StyleSheet, Platform, TextInput, Alert } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import SingleView from '@/components/SingleView';

const BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const PATH = '/bp/products';

const downloadProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}${PATH}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorId': '12345',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default function SingleProduct() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await downloadProducts();
        setProducts(products);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <SingleView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
      {
        loading && 
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold">Loading...</ThemedText>
        </ThemedView>
      }
      {
        !loading &&
        <ThemedView style={styles.stepContainer}>
          <ThemedView style={{alignItems: "center"}}>
            <Image
            style={{width: "100%", height: 175,  marginBottom: 20}}
              source={{
                uri: products[2].logo,
              }}
            />
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">{products[2].name}</ThemedText>
          </ThemedView>
          <ThemedText>{products[2].description}</ThemedText>
          <ThemedText>{products[2].id}</ThemedText>
        </ThemedView>
      }
      
    </SingleView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
