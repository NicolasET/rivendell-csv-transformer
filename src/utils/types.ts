export interface InputRow {
  created_time?: string;
  "full name"?: string;
  número_de_teléfono?: string;
  correo_electrónico?: string;
  estado?: string;
  lead_status?: string;
  [key: string]: string | undefined;
}

export interface TransformedRow {
  createdAt: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  phone: string;
  email: string;
  state: string;
  completed: boolean;
  origen: string;
}
