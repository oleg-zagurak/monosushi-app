import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBasketComponent } from './header-basket.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { Subject } from 'rxjs';

describe('HeaderBasketComponent', () => {
  let component: HeaderBasketComponent;
  let fixture: ComponentFixture<HeaderBasketComponent>;
  let mockMatDialogRef: Partial<MatDialogRef<BasketDialogComponent>> = {
    close: jasmine.createSpy('close'),
    afterClosed: jasmine.createSpy('afterClosed').and.returnValue(new Subject())
  };
  let mockMatDialog: Partial<MatDialog> = {
    open: jasmine.createSpy('open').and.returnValue(mockMatDialogRef)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBasketComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        OrdersService
      ]
    });
    fixture = TestBed.createComponent(HeaderBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog if active is true', () => {
    component.active = true;
    component.dialogRef = mockMatDialogRef as MatDialogRef<BasketDialogComponent>;
  
    component.show();
  
    expect(mockMatDialogRef.close).toHaveBeenCalled();
    expect(component.active).toBe(false);
  });
  
  it('should open the dialog if active is false and state is false', () => {
    component.active = false;
    spyOn(component.dialog, 'open').and.callThrough();
  
    component.show();
  
    expect(component.dialog.open).toHaveBeenCalledWith(BasketDialogComponent, {
      backdropClass: 'basket-bg',
      panelClass: 'basket-wrapper'
    });
    expect(component.active).toBe(true);
  });
});
