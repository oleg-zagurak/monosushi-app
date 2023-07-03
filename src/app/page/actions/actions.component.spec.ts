import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DbDataService
      ]
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
