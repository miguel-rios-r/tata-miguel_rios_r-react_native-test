import { Image, StyleSheet, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useApiContext } from '@/context/ApiContext';
import { IProduct } from '@/constants/Interfaces';
import { styles } from '@/constants/StyleSheet';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const { setCurrentProduct } = useApiContext();
  return(
    <Pressable
      onPress={() => {
        setCurrentProduct(product);
        router.push(`/SingleProduct`);
      }}
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">{product.name}</ThemedText>
          <ThemedText>{">"}</ThemedText>
        </ThemedView>
        <ThemedText>ID: {product.id}</ThemedText>
      </ThemedView>
      <View style={styles.divider}></View>
    </Pressable>
  )
}

export default function HomeScreen() {
  const router = useRouter();

  const { allProducts, loading, clearCurrentProduct } = useApiContext();

  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchNoResult, setRearchNoResult] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  const searchProduct = () => {
    setRearchNoResult(false)
    if ( searchText.length >= 3 ) {
      setSearchError("")
      const foundProducts: Array<IProduct> = allProducts.filter( (product: any) => product.name.toLowerCase().includes(searchText.toLowerCase()));
      if (foundProducts.length < 1) setRearchNoResult(true)
      else setFilteredProducts(foundProducts)
    } else {
      setSearchError("Please type 3+ characters")
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/pichincha.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Products</ThemedText>
      </ThemedView>
      {
        allProducts.length > 0 &&
        <ThemedView>
          {
            (searchText || filteredProducts.length > 0) && 
            <Pressable style={styles.clearButton} onPress={ () => {
              setSearchText("");
              setFilteredProducts([]);
            }}>
              <ThemedView style={styles.clearSearch}>
                <ThemedText>Clear</ThemedText>
              </ThemedView>
            </Pressable>
          }
          <TextInput
            style={styles.searchBar}
            onChangeText={setSearchText}
            placeholder="Search"
            returnKeyType="search"
            value={searchText}
            onSubmitEditing={searchProduct}
          />
          {
            searchError && <ThemedText style={styles.searchError}>{searchError}</ThemedText>
          }
        </ThemedView>
      }
      {
        searchNoResult && 
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold" style={styles.noResultsText}>Products not found</ThemedText>
          <ThemedText type="defaultSemiBold">All Products</ThemedText>
        </ThemedView>
      }
      {
        loading && 
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold">Loading...</ThemedText>
        </ThemedView>
      }
      {
        !loading && filteredProducts.length < 1 &&
        <>
          {
            allProducts.map( (product: IProduct) => {
              return <ProductCard key={product.id} product={product} />
            })
          }
        </>
      }
      {
        !loading && filteredProducts.length >= 1 &&
        <>
          {
            filteredProducts.map( (product) => {
              return <ProductCard key={product.id} product={product} />
            })
          }
        </>
      }
      {
        !loading &&
        <Pressable style={styles.primaryButton} onPress={() => {
          clearCurrentProduct();
          router.push("UpsertProduct");
        }}>
          <ThemedText>Agregar</ThemedText>
        </Pressable>
      }
      
    </ParallaxScrollView>
  );
}


