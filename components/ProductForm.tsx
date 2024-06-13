import { PropsWithChildren, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';
import HTTP from '@/utils/Http';
import { router } from 'expo-router';
import { useApiContext } from '@/context/ApiContext';
import { IFormItem } from '@/constants/Interfaces';
import { PRODUCT_FORM } from '@/constants/Forms';
import { styles } from '@/constants/StyleSheet';

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const nextYearDate = new Date(currentDate);
nextYearDate.setFullYear(currentYear + 1);
const formatedNextYearDate = nextYearDate.toISOString();

export function ProductForm({ data }: PropsWithChildren & { data? : any }) {

  const { downloadProducts } = useApiContext();

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: currentDate,
    date_revision: formatedNextYearDate
  })
  const [formError, setFormError] = useState({
    id: false,
    name: false,
    description: false,
    logo: false
  })
  
  const setFormItem = (id: string, text: string) => {
    text = text.trimStart();
    if (id === "id") {
      text = text.trim();
      text = text.toLowerCase();
    }
    setForm({
      ...form,
      [id]: text
    })
    setFormError({
      ...formError,
      [id]: false
    })
  }

  const validateInput = (itemId: string, itemValue: string, minText: number, maxText: number): boolean => {
    if (itemValue.length < minText || itemValue.length > maxText) {
      setFormError({
        ...formError,
        [itemId]: true
      })
      return false
    }
    return true
  }

  const createProduct = async () => {
    if ( validateInput("id", form.id, 3, 10) && validateInput("name", form.name, 5, 100) && validateInput("description", form.description, 10, 200) && validateInput("logo", form.description, 1, 5000) ) {
      const response = await HTTP.post("/bp/products", JSON.stringify(form))
      if (response) {
        await downloadProducts()
        router.back()
        Alert.alert("Product created successfully!")
      } else {
        Alert.alert("Something was wrong, try again!")
      }
    }
  }

  const editProduct = async () => {
    const response = await HTTP.put("/bp/products", JSON.stringify(form), data.id)
    if (response) {
      await downloadProducts()
      router.back()
      Alert.alert("Product updated successfully!")
    } else {
      Alert.alert("Something was wrong, try again!")
    }
  }

  const upsertProduct = async () => {
    if ( data ) {
      await editProduct();
    } else {
      await createProduct();
    }
  }

  const clearForm = () => {
    setForm({
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: currentDate,
      date_revision: formatedNextYearDate
    })
    setFormError({
      id: false,
      name: false,
      description: false,
      logo: false
    })
  }

  useEffect( () => {
    if (data) {
      setForm({
        ...data
      })
    }
  }, [])

  return (
    <ThemedView>
      {
        PRODUCT_FORM.length < 1 && <ThemedText>No inputs</ThemedText>
      }
      {
        PRODUCT_FORM.length > 0 &&
        <>
          {
            PRODUCT_FORM.map( (item: IFormItem) => {
              return(
                <>
                  <ThemedText>{item.name}</ThemedText>
                  {
                    item.type !== "date" ?
                    <>
                      <TextInput 
                        onChangeText={ (text) => setFormItem(item.id, text)}
                        editable={(data && item.id !== "id")}
                        style={(data && item.id === "id") ? styles.disbledItem : styles.formItem}
                        //@ts-ignore
                        value={form[item.id]}
                      />
                      {
                        //@ts-ignore
                        formError[item.id] && <ThemedText style={styles.error}>{item.name} not valid</ThemedText>
                      }
                    </>
                    :
                    <ThemedView style={styles.disbledItem}>
                      <ThemedText>{`${currentDay}/${currentMonth}/${ item.id === "date_revision" ? currentYear + 1 : currentYear }`}</ThemedText>
                    </ThemedView>
                  }
                </>
              ) 
            })
          }
          {
            !data ?
            <>
              <Pressable style={styles.primaryButton} onPress={upsertProduct}>
                <ThemedText>Agregar</ThemedText>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={clearForm}>
                <ThemedText>Reiniciar</ThemedText>
              </Pressable>
            </>
            :
            <>
              <Pressable style={styles.primaryButton} onPress={upsertProduct}>
                <ThemedText>Editar</ThemedText>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
                <ThemedText>Cancelar</ThemedText>
              </Pressable>
            </>
          }
        </>
      }
    </ThemedView>
  );
}
