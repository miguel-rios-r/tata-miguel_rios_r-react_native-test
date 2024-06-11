import { Image, StyleSheet, TextInput, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { useApiContext } from '@/context/ApiContext';
import { IProduct } from '@/constants/Interfaces';

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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  primaryButton: {
    backgroundColor: "#ffdc04",
    padding: 10, 
    alignItems: "center", 
    borderRadius: 5, 
    marginTop: 40
  },
  divider: {
    backgroundColor: "#DDD",
    height: 1
  },
  card: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#555"
  },
  searchError: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "right",
    color: "red",
    marginRight: 3
  },
  noResultsText: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 40
  },
  clearButton: {
    margin: 2, 
    alignItems: "flex-end"
  },
  clearSearch: {
    backgroundColor: "#DDD", 
    paddingVertical: 2, 
    paddingHorizontal: 5, 
    borderRadius: 5
  }
});
