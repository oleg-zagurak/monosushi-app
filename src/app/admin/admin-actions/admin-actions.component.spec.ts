import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { UploadImageService } from 'src/app/shared/services/upload-image/upload-image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockDbDataService } from 'src/app/test/mockDbDataService';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;
  let service: DbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminActionsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: DbDataService, useValue: new mockDbDataService},
        { provide: UploadImageService, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DbDataService);
    fixture.detectChanges();
    component.actionsForm.setValue({
      name: 'a',
      title: 'a',
      description: 'a',
      imagePath: 'a'
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    const spyGetActions = spyOn(component, 'getActions');
    const spyInitForm = spyOn<AdminActionsComponent, any>(component, 'initForm');
    component.ngOnInit()

    expect(spyGetActions.calls.count()).toBe(1);
    expect(spyInitForm.calls.count()).toBe(1);
  });

  it('should get all actions', () => {
    spyOn(component, 'getActions').and.callThrough();
    spyOn(service, 'getAll').and.callThrough();
    component.getActions();
    expect(component.getActions).toHaveBeenCalledOnceWith();
    expect(service.getAll).toHaveBeenCalledOnceWith();
  });

  it('should create and add new action', () => {
    spyOn(component, 'addAction').and.callThrough();
    spyOn(service, 'create').and.callThrough();
    component.addAction();
    expect(component.addAction).toHaveBeenCalledOnceWith();
    expect(service.create).toHaveBeenCalled();
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

  it('should update action and reset form if valid', () => {
    spyOn(component, 'update').and.callThrough();
    spyOn(component, 'reset').and.callThrough();
    spyOn(service, 'update').and.callThrough();
    spyOn(component.actionsForm, 'reset').and.callThrough();
    
    let mockItem = {...component.actionsForm.value, date: component.createDate()}

    component.update();
    expect(component.update).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalledWith(0, mockItem);
    expect(component.reset).toHaveBeenCalled();
    expect(component.actionsForm.reset).toHaveBeenCalled();
  });

  it('should prepare for editing action and update form values', () => {
    component.actions = [{
      date: 'string',
      name: 'string',
      title: 'string',
      description: 'string',
      imagePath: 'string',
      id: 0
    }];
    spyOn(component, 'editAction').and.callThrough();
    spyOn(component.actionsForm, 'patchValue');

    component.editAction(0);
    expect(component.editAction).toHaveBeenCalledWith(0);
    expect(component.editable).toBeTrue();
    expect(component.formOpened).toBeTrue();
    expect(component.isUploaded).toBeTrue();
    expect(component.actionsForm.patchValue).toHaveBeenCalled();
  });

});
