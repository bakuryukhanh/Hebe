export interface product {
    _id: string;
    name: string;
    imgSrcs: [string];
}
export interface CollectionReview {
    _id: string;
    name: string;
    products: product[];
}
