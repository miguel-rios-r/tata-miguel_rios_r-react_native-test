import { Image, StyleSheet, Platform, TextInput, Alert, Button, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { BaseButton } from 'react-native-gesture-handler';

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

export default function HomeScreen() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [text, setText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchNoResult, setRearchNoResult] = useState(false);
  const [foundProducts, setFoundProducts] = useState<any[]>([])

  const searchProduct = () => {
    setRearchNoResult(false)
    if ( text.length >= 3 ) {
      setSearchError("")
      const filteredProducts: any = products.filter( (product: any) => product.name.toLowerCase().includes(text.toLowerCase()));
      console.log(filteredProducts)
      if (filteredProducts.length < 1) setRearchNoResult(true)
      else setFoundProducts(filteredProducts)
    } else {
      setSearchError("Please type 3+ characters")
    }
  }


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
      <ThemedView>
        <TextInput
          style={styles.searchBar}
          onChangeText={setText}
          placeholder="Search"
          returnKeyType="search"
         onSubmitEditing={searchProduct}
        />
        {
          searchError && <ThemedText style={styles.searchError}>{searchError}</ThemedText>
        }
      </ThemedView>
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
        !loading && foundProducts.length < 1 &&
        <>
          {
            products.map( (product) => {
              return (
                <Pressable
                  onPress={ () => router.push('/SingleProduct')}
                >
                  <ThemedView style={styles.stepContainer} >
                    <ThemedView style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                      <ThemedText type="subtitle">{product.name}</ThemedText>
                      <ThemedText style={{color: "#555", fontSize: 12}}>{">"}</ThemedText>
                    </ThemedView>
                    <ThemedText>ID: {product.id}</ThemedText>
                  </ThemedView>
                  <View style={{backgroundColor: "#DDD", height: 1}}></View>
                </Pressable>
              )
            })
          }
        </>
      }
      {/* {
        !loading && foundProducts.length >= 1 &&
        <>
          {
            foundProducts.map( (product) => {
              return (
                <ThemedView style={styles.stepContainer}>
                  <ThemedText type="subtitle">{product.name}</ThemedText>
                  <ThemedText>{product.id}</ThemedText>
                </ThemedView>
              )
            })
          }
        </>
      } */}
      {
        !loading &&
        <Pressable style={{backgroundColor: "#ffdc04", padding: 10, alignItems: "center", borderRadius: 5}} onPress={() => router.push("AddProduct")}>
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
  }
});
