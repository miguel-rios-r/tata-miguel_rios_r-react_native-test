export interface  IProduct {
  id: string,
  name: string,
  description: string,
  logo: string,
  date_release: any,
  date_revision: any
}

export interface IFormItem {
  id: string,
  name: string,
  type: string,
  disabled: boolean
}