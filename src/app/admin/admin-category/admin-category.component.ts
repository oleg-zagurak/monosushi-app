import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategories, IReqCategories } from 'src/app/shared/interfaces/category';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  public categories: ICategories[] = [];
  public formOpened = false;
  public categoriesForm!: FormGroup;
  public progress = 0;
  public isUploaded = false;
  public editable = false;
  private currentId = '';

  constructor(private db: DbDataService,
    private fb: FormBuilder,
    private uploadImage: UploadImageService) { }

  ngOnInit(): void {
    this.db.API = environment.API.categories;
    this.getCategories();
    this.initForm();
  }

  ngDoCheck(): void {
    if (this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }

  initForm(): void {
    this.categoriesForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }
  getCategories(): void {
    const subscription = this.db.getAll().subscribe({
      next: data => {
        this.categories = data as ICategories[];
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
  deleteCategory(id: string): void {
    let item = this.categories.find(category => category.id === id);
    if (item) this.uploadImage.deleteImg(item.imagePath);
    this.db.delete(id).then(() => {
      this.getCategories()
    })
      .catch((e) => {
        console.error(e)
      })
  }
  addCategory() {
    if (this.categoriesForm.valid) {
      let category: IReqCategories = {
        ...this.categoriesForm.value
      }
      this.db.create(category).then(() => {
        this.getCategories()
      })
        .catch((e) => {
          console.error(e)
        })
      this.reset();
    }
  }
  editCategory(index: number): void {
    this.editable = true;
    let { name, imagePath, id, path } = this.categories[index];
    this.currentId = id;
    this.categoriesForm.patchValue({
      path,
      name,
      imagePath
    })
    this.formOpened = true;
    this.isUploaded = true;
  }
  update(): void {
    if (this.categoriesForm.valid) {
      let category: IReqCategories = {
        ...this.categoriesForm.value
      };

      this.db.update(this.currentId, category).then(() => {
        this.getCategories()
      })
        .catch((e) => {
          console.error(e)
        })
      this.reset();
    }
  }
  upload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files[0];
    if (file) {
      this.uploadImage.uploadFile(['images', 'categories'], file.name, file)
        .then(url => {
          if (url) {
            this.categoriesForm.patchValue({
              imagePath: url
            });
            this.isUploaded = true;
            this.uploadImage.percentage = 0;
          }
        })
    }
  }

  deleteImg(): void {
    this.uploadImage.deleteImg(this.getByControl('imagePath'))
      .then(() => {
        this.categoriesForm.patchValue({
          imagePath: null
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }
  getByControl(name: string): string {
    return this.categoriesForm.get(name)?.value;
  }
  show(): void {
    if (!this.editable) this.formOpened = !this.formOpened;
  }
  reset(): void {
    this.categoriesForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = '';
    this.editable = false;
  }
}
