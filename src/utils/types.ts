export interface InputRow {
  created_time?: string;
  "full name"?: string;
  número_de_teléfono?: string;
  correo_electrónico?: string;
  estado?: string;
  define_el_presupuesto_deseado_para_tu_nuevo_vehículo_?: string;
  selecciona_la_categoría_que_más_te_guste_para_empezar?: string;
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
  budget: string;
  carCategory: string;
  completed: boolean;
  origen: string;
}
