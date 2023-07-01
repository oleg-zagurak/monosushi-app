import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAction, IReqAction } from 'src/app/shared/interfaces/action';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss']
})
export class AdminActionsComponent {
  public actions: IAction[] = [];
  public formOpened = false;
  public actionsForm!: FormGroup;
  public progress = 0;
  public isUploaded = false;
  public editable = false;
  private currentId = 0;

  constructor(private db: DbDataService,
    private fb: FormBuilder,
    private uploadImage: UploadImageService
  ) { }

  ngOnInit(): void {
    this.db.API = environment.API.actions;
    this.getActions();
    this.initForm();

  }
  ngDoCheck(): void{
    if(this.progress !== this.uploadImage.percentage) this.progress = this.uploadImage.percentage;
  }
  private initForm(): void {
    this.actionsForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }
  getActions(): void {
    const subscription = this.db.getAll<IAction>().subscribe({
      next: data => {
        this.actions = data;
      },
      error: e => {
        console.error(e)
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
  deleteAction(id: number): void {
    let item = this.actions.find(action => action.id === id);
    if(item) this.uploadImage.deleteImg(item.imagePath);
    const subscription = this.db.delete(id).subscribe({
      next: () => {
        this.getActions()
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
  addAction() {
    if (this.actionsForm.valid) {
      let date = this.createDate();
      let action: IReqAction = {
        ...this.actionsForm.value,
        date: date
      }
      const subscription = this.db.create(action).subscribe({
        next: () => {
          this.getActions();
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
  editAction(index: number): void {
    this.editable = true;
    let { title, name, description, imagePath, id } = this.actions[index];
    this.currentId = id;
    this.actionsForm.patchValue({
      title,
      name,
      description,
      imagePath
    })
    this.formOpened = true;
    this.isUploaded = true;
  }
  update(): void {
    if (this.actionsForm.valid) {
      let date = this.createDate();
      let action: IReqAction = {
        ...this.actionsForm.value,
        date
      };
      const subscription = this.db.update<IReqAction, IAction>(this.currentId, action).subscribe({
        next: () => {
          this.getActions();
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
      this.uploadImage.uploadFile(['images', 'actions'], file.name, file)
        .then(url => {
          if (url) {
            this.actionsForm.patchValue({
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
        this.actionsForm.patchValue({
          imagePath: null
        })
        this.isUploaded = false;
        this.progress = 0;
      })
  }

  getByControl(name: string): string {
    return this.actionsForm.get(name)?.value;
  }
  show(): void {
    if (!this.editable) this.formOpened = !this.formOpened;
  }
  private reset(): void {
    this.actionsForm.reset();
    this.formOpened = false;
    this.isUploaded = false;
    this.progress = 0;
    this.currentId = 0;
    this.editable = false;
  }
  private createDate(): string {
    let date = new Date();
    let dateStr = '';
    date.getDate() < 10 ? dateStr += '0' + date.getDate() : dateStr += date.getDate();
    date.getMonth() < 10 ? dateStr += '.0' + (date.getMonth() + 1) : dateStr += '.' + (date.getMonth() + 1);
    date.getFullYear() < 10 ? dateStr += '.0' + date.getFullYear() : dateStr += '.' + date.getFullYear();
    return dateStr;
  }
}