export interface IReqAction {
    date: string,
    name: string,
    title: string,
    description: string,
    imagePath: string
}

export interface IAction extends IReqAction{
    id: string
}