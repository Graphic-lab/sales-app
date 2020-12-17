export interface Product {
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
}
export interface ProductHeader {
    productID?:string;
    productName?:string;
    salesQ1?:string;
    salesQ2?:string;
    salesQ3?:string;
    salesQ4?:string;
    totalSales?:string;
}
export interface ProductNew {
    // id?:string;
    // name?:string;
    // manager?:string;
    // date?:string;
    productID?:string;
    productName?:string;
    salesQ1?:string;
    salesQ2?:string;
    salesQ3?:string;
    salesQ4?:string;
}

/*
Product name	String	50	Yes
Product ID	Integer	13	Yes
Product manager	String	30	No
Sales start date	Date	10	Yes
*/