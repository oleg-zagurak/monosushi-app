import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubCategories } from 'src/app/shared/constants/sub-categories';
import { IProduct } from 'src/app/shared/interfaces/product';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public paramSubscription!: Subscription;
  public showFilterNav = false;
  public categoryName = '';
  @Input() homeLocation: boolean = false;
  constructor(private db: DbDataService,
    private orders: OrdersService,
    private activatedRoute: ActivatedRoute) {
      
    this.db.API = environment.API.products;
    this.paramSubscription = activatedRoute.params.subscribe({
      next: (param) => {
        if (param && param['category'] && !param['subcategory']) {
          (param['category'] === 'roli') ? this.showFilterNav = true : this.showFilterNav = false;
          this.getByCategory(true);
          this.filteredProducts = [];
        }
        if (param && param['category'] && param['subcategory']) {
          this.showFilterNav = false;
          this.getByCategory(false);
          this.filteredProducts = [];
        }
      },
      error: e => {
        console.error(e)
      }
    })
  }

  ngOnInit(): void {
    if(this.homeLocation){
      const subscription = this.db.getByCategory<IProduct>('roli').subscribe({
        next: data => {
          this.products = data;
        },
        error: e => {
          console.error(e)
        },
        complete: () => {
          subscription.unsubscribe();
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  setCategoryName(choose: boolean): void {
    if (choose) {
      this.categoryName = this.products[0].category.name;
    } else {
      this.categoryName = SubCategories[this.filteredProducts[0]?.category.subcategory as string];
    }
  }

  getByCategory(choose: boolean): void {
    let category = this.activatedRoute.snapshot.paramMap.get('category') as string;
    let subcategory = this.activatedRoute.snapshot.paramMap.get('subcategory') as string;
    const subscription = this.db.getByCategory<IProduct>(category).subscribe({
      next: data => {
        this.products = data;
        if(!choose && subcategory) this.filter(subcategory);
        this.setCategoryName(choose);
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  setAmount(sign: boolean, product: IProduct | {count: number}): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
  }

  addOrder(product: IProduct): void {
    this.orders.add(product);
  }

  checkActiveFilter(event: MouseEvent, container: HTMLUListElement): void {
    if (container instanceof HTMLUListElement && event.target instanceof HTMLSpanElement) {
      let elements = Array.from(container.children);
      elements.forEach(element => {
        element.classList.remove('active');
      })
      let target = event.target;
      let filter = target.dataset['subcategory'] || 'all';
      this.filter(filter);
      target.parentElement?.classList.add('active');
      console.log('filter', this.filteredProducts)
    }
  }

  filter(filter: string): void {
    if (filter === 'all') {
      this.filteredProducts = [];
      return
    }
    if (filter) {
      console.log(filter)
      this.filteredProducts = this.products.filter(product => product.category.subcategory === filter)
    }
  }
}
