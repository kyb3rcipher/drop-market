import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {

  quantity: number = 1;
  size: any = '';

  products: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProductById(id);
      } 
      this.loadProducts();
    });
  }

  loadProducts() {
    this.http.get<any>(`${environment.apiUrl}/getProducts.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products;
        } else {
          this.products = [];
          console.warn('No se encontraron productos');
        }
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });
  }

  product: any = null;

loadProductById(id: number) {
  this.http.get<any>(`${environment.apiUrl}/getProduct.php?id=${id}`).subscribe({
    next: (res) => {
      if (res.success) {
        this.product = res.product;
        console.log(this.product);
      } else {
        this.product = null;
        console.warn('Producto no encontrado');
      }
    },
    error: (err) => {
      console.error('Error cargando producto', err);
    }
  });
}


  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }


  goToProductDetail(id: number) {
    this.router.navigate(['/products/product', id]);
  }

}
