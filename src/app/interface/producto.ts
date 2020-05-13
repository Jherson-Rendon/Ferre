export interface Producto {
    id?: string;
    ref?: number;
    img: File | string;
    show: boolean;
    hover: boolean;
    nombre: string;
    minDes: string;
    precio: number;
    fullDes: string;
    cantidad?: number;
    precioAnt?: number;
    categoria: number[];
}

// tslint:disable-next-line:class-name
export interface Categoria {
    id: number;
    nombre: string;
    categorie: string;
}
