import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosCrearPage } from './productos-crear.page';

describe('ProductosCrearPage', () => {
  let component: ProductosCrearPage;
  let fixture: ComponentFixture<ProductosCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
