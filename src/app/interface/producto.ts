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
    show: boolean;
}

// tslint:disable-next-line:class-name
export interface Categoria {
    id: number;
    nombre: string;
    categorie: string;
}
