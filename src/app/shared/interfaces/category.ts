export interface IReqCategories {
    name: string,
    path: string,
    imagePath: string,
    subcategory?: string
}

export interface ICategories extends IReqCategories{
    id: number
}