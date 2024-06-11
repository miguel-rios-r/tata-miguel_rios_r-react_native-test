import { PropsWithChildren, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { View } from 'react-native-reanimated/lib/typescript/Animated';


// "id" : "trj-blc",
// "name" : "Tarjeta Black",
// "description" : "Tarjeta de consumo bajo la modalidad de black",
// "logo" : "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
// "date_release" : "2023-02-01",
// "date_revision" : "2024-02-01"

interface IFormItem {
  id: string,
  name: string,
  type: string,
  disabled: boolean
}

const items: Array<IFormItem> = [
  {
    id: "id",
    name: "ID",
    type: "text",
    disabled: false
  },
  {
    id: "name",
    name: "Nombre",
    type: "text",
    disabled: false
  },
  {
    id: "description",
    name: "Descripción",
    type: "text",
    disabled: false
  },
  {
    id: "logo",
    name: "Logo",
    type: "text",
    disabled: false
  },
  {
    id: "date_release",
    name: "Fecha Liberación",
    type: "date",
    disabled: true
  },
  {
    id: "date_revision",
    name: "Fecha Revisión",
    type: "date",
    disabled: true
  }
]

export function ProductForm({ data }: PropsWithChildren & { data? : any }) {

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const nextYearDate = new Date(currentDate);
  const formatedNextYearDate = nextYearDate.toISOString()

  const [form, setForm] = useState({
    id: null,
    name: null,
    description: null,
    logo: null,
    date_release: currentDate,
    date_revision: formatedNextYearDate
  })
  const [formError, setFormError] = useState({
    id: false,
    name: false,
    description: false,
    logo: false
  })
  
  const setFormItem = (id: string, text: any) => {
    setForm({
      ...form,
      [id]: text
    })
  }

  const upsertProduct = () => {
    console.log(JSON.stringify(form))
    items.forEach( (item: IFormItem) => {

    })
  }

  const clearForm = () => {
    setForm({
      id: null,
      name: null,
      description: null,
      logo: null,
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

  return (
    <ThemedView>
      {
        items.length < 1 && <ThemedText>No inputs</ThemedText>
      }
      {
        items.length > 0 &&
        <>
          {
            items.map( (item: IFormItem) => {
              return(
                <>
                  <ThemedText>{item.name}</ThemedText>
                  {
                    item.type !== "date" ?
                    <>
                      <TextInput 
                        onChangeText={ (text) => setFormItem(item.id, text)}
                        editable={!item.disabled}
                        style={item.disabled ? styles.disbledItem : styles.formItem}
                        //@ts-ignore
                        value={form[item.id]}
                      />
                      {
                        //@ts-ignore
                        formError[item.id] && <ThemedText style={styles.error}>{item.name}</ThemedText>
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
           <Pressable style={{backgroundColor: "#ffdc04", padding: 10, alignItems: "center", borderRadius: 5, marginTop: 20, marginBottom: 10}} onPress={upsertProduct}>
            <ThemedText>Agregar</ThemedText>
          </Pressable>
          <Pressable style={{backgroundColor: "#DDD", padding: 10, alignItems: "center", borderRadius: 5}} onPress={clearForm}>
            <ThemedText>Reiniciar</ThemedText>
          </Pressable>
        </>
      }
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  formItem: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#555",
  },
  disbledItem: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#F2F2F2",
    backgroundColor: "#F2F2F2"
  },
  error: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "right",
    color: "red",
    marginRight: 3
  },
});
