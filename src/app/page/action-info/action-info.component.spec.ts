import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionInfoComponent } from './action-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IAction } from 'src/app/shared/interfaces/action';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ActionInfoComponent', () => {
  let component: ActionInfoComponent;
  let fixture: ComponentFixture<ActionInfoComponent>;
  let fakeAction: IAction = {
    "name": "a",
    "title": "a",
    "description": "a.a.a",
    "imagePath": "a",
    "date": "a",
    "id": 1
  }
  let activatedRouteMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionInfoComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });
    activatedRouteMock = {
      data: of({ action: { description: fakeAction } }),
    };
    fixture = TestBed.createComponent(ActionInfoComponent);
    component = fixture.componentInstance;
    component.action = fakeAction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not change action and description if already set', () => {
    component.description = ['Existing', 'description'];
    spyOn(activatedRouteMock.data, 'subscribe').and.callThrough();

    component.ngOnInit();

    expect(activatedRouteMock.data.subscribe).not.toHaveBeenCalled();
    expect(component.action).toEqual(fakeAction);
    expect(component.description).toEqual(['Existing', 'description']);
  });
});
