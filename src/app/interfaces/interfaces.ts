
export interface Icredencial {
    id_credencial: number;
    username: String;
    password: String;
}

export interface Ivendedor {
    id_vendedor: number;
    rut: String;
    telefono: number;
    correo: String;
    nombre: String;
    apellido: String;
    credencial: number;
}

export interface Isalida {
    id_salida: number;
    tipo: String;
    cantidad: number;
    fecha: Date;
    libro: number;
    vendedor: number;
}

export interface Ilibro {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    imagen: String;
}

export interface Ilibros{
    libros: Ilibro[];
}

export interface Ieditorial {
    id_editorial: number;
    nombre: String;
}


export interface Iautores{
    id_autores: number;
    id_libro_a: number;
    id_autor_a: number;
}

export interface Iautor {
    id_autor: number;
    nombre: String;
    apellido: String;
}

export interface IautoresBusqueda{
    libros: Iautor[];
}