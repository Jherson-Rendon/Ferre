export interface Producto {
    ref: number;
    nombre: string;
    img: string;
    minDes: string;
    fullDes: string;
    precioAnt: number;
    precio: number;
    categoria: number[];
    hover: boolean;
}
