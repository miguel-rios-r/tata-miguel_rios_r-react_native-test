
import { Image, StyleSheet, Platform, TextInput, Alert, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import SingleView from '@/components/SingleView';
import { useApiContext } from '@/context/ApiContext';

export default function SingleProduct() {

  const router = useRouter();  
  const { slug } = useLocalSearchParams();
  const { loading, currentProduct, deleteProduct, downloadProducts } = useApiContext();

  const releaseDate = new Date(currentProduct.date_release);
  const releaseDay = releaseDate.getDate();
  const releaseMonth = releaseDate.getMonth() + 1;
  const releaseYear = releaseDate.getFullYear();

  const revisionDate = new Date(currentProduct.date_revision);
  const revisionDay = revisionDate.getDate();
  const revisionMonth = revisionDate.getMonth() + 1;
  const revisionYear = revisionDate.getFullYear();
 
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
          <ThemedText type='title'>ID: {currentProduct.id}</ThemedText>
          <ThemedText>Información extra</ThemedText>
          <ThemedView style={styles.extraInfoContainer}>
            <ThemedText>Nombre</ThemedText>
            <ThemedText style={{width: 150}} type="defaultSemiBold">{currentProduct.name}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.extraInfoContainer}>
            <ThemedText>Descripción</ThemedText>
            <ThemedText style={{width: 150}} type="defaultSemiBold">{currentProduct.description}</ThemedText>
          </ThemedView>
          <ThemedText>Logo</ThemedText>
          <ThemedView style={{alignItems: "center"}}>
            <Image
              style={{width: "60%", height: 105,  marginBottom: 20}}
              source={{
                uri: currentProduct.logo,
              }}
            />
          </ThemedView>
          <ThemedView style={styles.extraInfoContainer}>
            <ThemedText>Fecha Liberación</ThemedText>
            <ThemedText style={{width: 150}} type="defaultSemiBold">{`${releaseDay}/${releaseMonth}/${releaseYear}`}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.extraInfoContainer}>
            <ThemedText>Fecha Revisión</ThemedText>
            <ThemedText style={{width: 150}} type="defaultSemiBold">{`${revisionDay}/${revisionMonth}/${revisionYear}`}</ThemedText>
          </ThemedView>
          
          <ThemedView style={{marginTop: 70}}>
            <Pressable style={{backgroundColor: "gray", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 5}} onPress={async () => {
              router.back();
              router.push("UpsertProduct")
            }}>
              <ThemedText style={{color: "white"}}>Editar</ThemedText>
            </Pressable>
            <Pressable style={{backgroundColor: "red", padding: 10, alignItems: "center", borderRadius: 5}} onPress={async () => {
              await deleteProduct(currentProduct.id);
              await downloadProducts();
              router.back();
            }}>
              <ThemedText style={{color: "white"}}>Eliminar</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      }
    </SingleView>
  );
}

const styles = StyleSheet.create({
  extraInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
