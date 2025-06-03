import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosEditarPage } from './productos-editar.page';

describe('ProductosEditarPage', () => {
  let component: ProductosEditarPage;
  let fixture: ComponentFixture<ProductosEditarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
