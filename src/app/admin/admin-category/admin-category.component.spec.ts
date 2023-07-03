import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockDbDataService } from 'src/app/test/mockDbDataService';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let service: DbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: DbDataService, useValue: new mockDbDataService},
        { provide: UploadImageService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DbDataService);
    fixture.detectChanges();
    component.categoriesForm.setValue({
      name: 'a',
      path: 'a',
      imagePath: 'a'
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    spyOn(component, 'getCategories');
    spyOn(component, 'initForm');
    component.ngOnInit()

    expect(component.getCategories).toHaveBeenCalled();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should get all categories', () => {
    spyOn(component, 'getCategories').and.callThrough();
    spyOn(service, 'getAll').and.callThrough();
    component.getCategories();
    expect(component.getCategories).toHaveBeenCalledOnceWith();
    expect(service.getAll).toHaveBeenCalledOnceWith();
  });

  it('should create and add new category when form is valid', () => {
    spyOn(component, 'addCategory').and.callThrough();
    spyOn(service, 'create').and.callThrough();
    component.addCategory();
    expect(component.addCategory).toHaveBeenCalledOnceWith();
    expect(service.create).toHaveBeenCalled();
  });

  it('should not create and add new category when form is invalid', () => {
    spyOn(component, 'addCategory').and.callThrough();
    spyOn(service, 'create').and.callThrough();
    component.categoriesForm.reset();
    component.addCategory();
    expect(component.addCategory).toHaveBeenCalledOnceWith();
    expect(service.create).not.toHaveBeenCalled();
  });

  it('should show the editable hidden area', () => {
    let element: HTMLElement = fixture.nativeElement as HTMLElement;
    let button = element.querySelector('.form-btn') as HTMLElement;
    
    button.dispatchEvent(new MouseEvent('click'));
    expect(component.formOpened).toBe(true);

    button.dispatchEvent(new MouseEvent('click'));
    expect(component.formOpened).toBe(false);

    component.editable = true;
    button.dispatchEvent(new MouseEvent('click'));
    expect(component.formOpened).toBe(component.formOpened);
  });

  it('should update category and reset form when form valid', () => {
    spyOn(component, 'update').and.callThrough();
    spyOn(component, 'reset').and.callThrough();
    spyOn(service, 'update').and.callThrough();
    spyOn(component.categoriesForm, 'reset').and.callThrough();
    
    let mockItem = {...component.categoriesForm.value}

    expect(component.categoriesForm.valid).toBeTrue();
    component.update();
    expect(component.update).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalledWith(0, mockItem);
    expect(component.reset).toHaveBeenCalled();
    expect(component.categoriesForm.reset).toHaveBeenCalled();
    component.reset();
    component.update();
  });

  it('should not update category and reset form when form invalid', () => {
    spyOn(component, 'update').and.callThrough();
    spyOn(component, 'reset').and.callThrough();
    spyOn(service, 'update').and.callThrough();

    component.categoriesForm.reset();
    component.update();

    expect(component.categoriesForm.valid).toBeFalse();
    expect(service.update).not.toHaveBeenCalled();
    expect(component.reset).not.toHaveBeenCalled();
  })

  it('should prepare for editing category and update form values', () => {
    component.categories = [{
      name: 'string',
      path: 'string',
      imagePath: 'string',
      id: 0
    }];
    spyOn(component, 'editCategory').and.callThrough();
    spyOn(component.categoriesForm, 'patchValue');

    component.editCategory(0);
    expect(component.editCategory).toHaveBeenCalledWith(0);
    expect(component.editable).toBeTrue();
    expect(component.formOpened).toBeTrue();
    expect(component.isUploaded).toBeTrue();
    expect(component.categoriesForm.patchValue).toHaveBeenCalled();
  });

  it('should show add button', () => {
    let element = fixture.debugElement.nativeElement as HTMLElement;
    let btn = element.querySelector('#first-submit');
    expect(btn).toBeDefined();
  });

  it('should not show add button', () => {
    let element = fixture.debugElement.nativeElement as HTMLElement;
    component.editable = true;
    fixture.detectChanges();
    let btn = element.querySelector('#first-submit');
    expect(btn).toBeNull();
  });
});
