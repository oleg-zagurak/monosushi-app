import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsComponent } from './admin-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockDbDataService } from 'src/app/test/mockDbDataService';
import { mockUploadImageService } from 'src/app/test/mockUploadImageService';
import { IProduct, IProductReq } from 'src/app/shared/interfaces/product';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let dbService: DbDataService;
  let imgService: UploadImageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: DbDataService, useValue: new mockDbDataService },
        { provide: UploadImageService, useValue: new mockUploadImageService },
      ]
    });
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DbDataService);
    imgService = TestBed.inject(UploadImageService);
    fixture.detectChanges();
    component.productForm.setValue({
      subcategory: 'string',
      name: 'string',
      path: 'string',
      imagePath: 'string',
      ingredients: 'string',
      weight: 'string',
      price: 0,
      count: 1,
      category: {
        name: 'string',
        path: 'string',
        imagePath: 'string',
        id: 1
      },
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    spyOn(component, 'getCategories');
    spyOn(component, 'getProducts');
    spyOn(component, 'initForm');
    component.ngOnInit()

    expect(component.getCategories).toHaveBeenCalled();
    expect(component.getProducts).toHaveBeenCalled();
    expect(component.initForm).toHaveBeenCalled();
  });
  it('should compare options of select elemet', () => {
    let option1 = {
      name: 'string',
      path: 'string',
      imagePath: 'string',
      id: 1
    }
    let option2 = {
      name: 'string',
      path: 'string',
      imagePath: 'string',
      id: 2
    }
    let first = component.compareOptions(option1, option2);
    expect(first).toBe(false)

    let second = component.compareOptions(option1, option1);
    expect(second).toBe(true);
  });

  it('should create new product', () => {
      let product: IProductReq= {
        "name": "string",
        "path": "string",
        "imagePath": "string",
        "ingredients": "string",
        "weight": "string",
        "price": 0,
        "count": 1,
        "category": {
          "name": "string",
          "path": "string",
          "imagePath": "string",
          "id": 1,
          "subcategory": "string"
        },
      };
  
      spyOn(component, 'createProduct').and.callThrough();
      
  
      let first = component.createProduct();
      expect(first.category).toEqual(product.category);
      
      component.productForm.patchValue({
        subcategory: null
      })
      
      let second = component.createProduct();
      expect(second.category.subcategory).not.toEqual(product.category.subcategory);
    })

    it('should add new product', () => {
      spyOn(component, 'createProduct').and.callThrough();
      spyOn(component, 'addProduct').and.callThrough();
      spyOn(dbService, 'create').and.callThrough();

      component.addProduct();
      expect(component.addProduct).toHaveBeenCalled();
      expect(component.createProduct).toHaveBeenCalled();
      expect(dbService.create).toHaveBeenCalled()

      component.productForm.reset();

      component.addProduct();
      expect(component.addProduct).toHaveBeenCalled();
      expect(component.createProduct).toHaveBeenCalledTimes(1);
      expect(dbService.create).toHaveBeenCalledTimes(1);
    })

    it('should update new product', () => {
      spyOn(component, 'updateProduct').and.callThrough();
      spyOn(dbService, 'update').and.callThrough();

      component.updateProduct();
      expect(component.updateProduct).toHaveBeenCalled();
      expect(dbService.update).toHaveBeenCalled()

      component.productForm.reset();

      component.updateProduct();
      expect(component.updateProduct).toHaveBeenCalled();
      expect(dbService.update).toHaveBeenCalledTimes(1);
    })
    it('should update new product', () => {
      spyOn(component, 'showSubCat').and.callThrough();

      component.showSubCat();
      expect(component.showSubCategories).toBe(false);

      component.productForm.patchValue({
        category:{
          path: 'roli'
        }
      });

      component.showSubCat();
      expect(component.showSubCategories).toBe(true);
    })
    
});
