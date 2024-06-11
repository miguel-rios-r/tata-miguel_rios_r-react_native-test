import { IFormItem } from "./Interfaces";

export const PRODUCT_FORM: Array<IFormItem> = [
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