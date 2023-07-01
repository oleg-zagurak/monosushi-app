import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategories } from 'src/app/shared/interfaces/category';
import { IProduct, IProductReq } from 'src/app/shared/interfaces/product';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  public products: IProduct[] = [];
  public categories: ICategories[] = [];
  public formOpened = false;
  public productForm!: FormGroup;
  public progress = 0;
  public isUploaded = false;
  public editable = false;
  private currentId = 0;
  public showSubCategories = false;

  constructor(private db: DbDataService,
    private fb: FormBuilder,
    private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.db.API = environment.API.products;
    this.getCategories();
    this.getProducts();
    this.initForm();
  }

  ngDoCheck(): void{
    if(this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      subcategory: [null],
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      count: [1, {nonNullable: true}],
      category: [null, Validators.required],
    })
  }
  compareOptions(option1: ICategories, option2: ICategories): boolean {
    return option1 && option2 ? option1.id === option2.id : option1 === option2;
  }
  getProducts(): void {
    const subscription = this.db.getAll<IProduct>().subscribe({
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
  getCategories(): void {
    const subscription = this.db.getAll<ICategories>(environment.API.categories).subscribe({
      next: data => {
        this.categories = data;
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
  deleteProduct(id: number): void {
    let item = this.products.find(product => product.id === id);
    if(item) this.uploadImage.deleteImg(item.imagePath);
    const subscription = this.db.delete(id).subscribe({
      next: () => {
        this.getProducts()
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
  createProduct(): IProductReq{
    let { name, imagePath, path, ingredients, category, price, weight, subcategory, count } = this.productForm.value;
    if(subcategory) category = {subcategory, ...category}
    let product: IProductReq = {
      name,
      imagePath,
      price,
      weight,
      path,
      ingredients,
      count,
      category
    };
    return product;
  }
  addProduct() {
    if (this.productForm.valid) {
      let product: IProductReq = this.createProduct();
      const subscription = this.db.create(product).subscribe({
        next: () => {
          this.getProducts();
        },
        error: e => {
          console.error(e);
        },
        complete: () => {
          subscription.unsubscribe();
        }
      });
      this.reset();
    }
  }
  editProduct(index: number): void {
    let { name, imagePath, id, path, ingredients, category, price, weight } = this.products[index];
    this.currentId = id;
    this.productForm.patchValue({
      path,
      name,
      imagePath,
      ingredients,
      category,
      price,
      weight
    })
    this.editable = true;
    this.formOpened = true;
    this.isUploaded = true;
  }
  updateProduct(): void {
    if (this.productForm.valid) {
      let product: IProductReq = {
        ...this.productForm.value
      };

      const subscription = this.db.update<IProductReq, IProduct>(this.currentId, product).subscribe({
        next: () => {
          this.getProducts();
        },
        error: e => {
          console.error(e);
        },
        complete: () => {
          subscription.unsubscribe();
        }
      })
      this.reset();
    }
  }
  upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files[0];
    if (file) {
      this.uploadImage.uploadFile(['images', 'products'], file.name, file)
        .then(url => {
          if (url) {
            this.productForm.patchValue({
              imagePath: url
            });
            this.isUploaded = true;
            this.uploadImage.percentage = 0;
          }
        })
    }
  }

  deleteImg(): void {
    let url = this.getByControl('imagePath');
    this.uploadImage.deleteImg(url)
      .then(() => {
        this.productForm.patchValue({
          imagePath: null
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }
  getByControl(name: string): string {
    return this.productForm.get(name)?.value;
  }
  getCurrentCategory(): ICategories | null{
    return this.productForm.get('category')?.value;
  }
  showSubCat(){
    let category = this.getCurrentCategory();
    category?.path === 'roli' ? this.showSubCategories = true : this.showSubCategories = false;
  }
  show(): void{
    if(!this.editable) {
      this.formOpened = !this.formOpened;
      this.productForm.reset();
    }
  }
  cancel(): void{
    this.reset();
  }
  private reset(): void {
    this.productForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = 0;
    this.editable = false;
  }
}
