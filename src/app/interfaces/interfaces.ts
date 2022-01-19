//interfaces de stock
export interface Istock{
    autor:number[];
    id_libro: number;
    nombre: string;
    precio: number;
    cantidad: number;
    descripcion: string;
    formato: string;
    editorial: Ieditorial;
    imagen: string;
    cantidad_min: number;
    disponibilidad: number;

}


export interface IstockPost{
    autor:number[];
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    imagen: any;
    cantidad_min: number;
    disponibilidad: number;
}

//interfaces de vendedor
export interface Ivendedor {
    id_vendedor: number;
    rut: String;
    telefono: number;
    nombre: String;
    apellido: String;
    usuario:number;
}
//interfaces de salida
export interface Isalida {
    id_salida: number;
    tipo: String;
    cantidad: number;
    fecha: Date;
    libro: number;
    vendedor: number;
}

export interface ISalidaAgregar {
    tipo: String;
    cantidad: number;
    libro: number;
    vendedor: number;
}

export interface ISalidaGet {
    id_salida: number;
    tipo: String;
    cantidad: number;
    fecha: Date;
    libro: IlibroWithEditorial;
    vendedor: Ivendedor;
}



//interfaces de libro
export interface Ilibro {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    imagen: String;
    cantidad_min: number;
    disponibilidad: number;
}


export interface IlibroWithEditorial {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: Ieditorial;
    imagen: String;
    cantidad_min: number;
    disponibilidad: number;
}
//libro
export interface Ilibro {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    imagen: String;
    cantidad_min: number;
    disponibilidad: number;
}
export interface IlibroCambiarStock {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    cantidad_min: number;
    disponibilidad: number;
}


//interfaces editorial
export interface Ieditorial {
    id_editorial: number;
    nombre: String;
}

export interface IeditorialAgregar {
    nombre: String;
}

//interfaces Autores
export interface Iautores{
    id_autor_a: number;
    id_autores: number;
    id_libro_a: number;
}

export interface IautoresAgregar{
    id_autor_a: number;
    id_libro_a: number;
}

export interface IautoresStock{
    id_autor_a: Iautor;
    id_autores: number;
    id_libro_a: IlibroWithEditorial;
}

//interfaces autor
export interface Iautor {
    id_autor: number;
    nombre: String;
    apellido: String;
}

export interface IautorAgregar {
    nombre: String;
    apellido: String;
}

//interfaces Ilogin
export interface Ilogin{
    username: String;
    password: String;
}

//interfaz Itoken
export interface IToken{
    access_token:string;
    refresh_token:string;
    user:Iuser
}

export interface Iuser{
    pk:number;
    username:string;
    email:string;
    first_name:string;
    last_name:string;
}

export interface Iuser_vendedor{
    vendedor: Ivendedor
}
