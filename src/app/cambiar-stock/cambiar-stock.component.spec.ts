import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarStockComponent } from './cambiar-stock.component';

describe('CambiarStockComponent', () => {
  let component: CambiarStockComponent;
  let fixture: ComponentFixture<CambiarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
