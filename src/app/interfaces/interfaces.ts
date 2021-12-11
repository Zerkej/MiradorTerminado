

export interface Ilibro {
    id_libro: number;
    nombre: String;
    precio: number;
    cantidad: number;
    descripcion: String;
    formato: String;
    editorial: number;
    disponibilidad: boolean;
}

export interface Ieditorial {
    id_editorial: number;
    nombre: String;
}

export interface Iautores{
    id_libro_a: number;
    id_autor_a: number;
}

export interface Iautor {
    id_autor: number;
    nombre: String;
    apellido: String;
}