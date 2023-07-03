import { Subject } from "rxjs";

export class mockOrdersService {
    public basketChange: Subject<any> = new Subject();
    constructor() { }
  
    add(order: any): void {
    }
  
    getOrders(): any[] {
      return []
    }
  
    save(ordersList: any[]): void {
      
    }
  
    delete(id: number): void {
      
    }
  }