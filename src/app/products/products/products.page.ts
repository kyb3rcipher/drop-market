import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false,
})
export class ProductsPage implements OnInit {

  quantity: number = 1;
  size: any = '';

  brandName: string | null = null;
  products: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.brandName = this.route.snapshot.paramMap.get('brandName');

    if (this.brandName) {
      this.loadProductsByBrand(this.brandName);
    }
  }

  loadProductsByBrand(brandName: string) {
    this.http.post<any>(`${environment.apiUrl}/getProductsByBrand.php`, { brandName }).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products;
          console.log('Productos obtenidos:', res.products);
        } else {
          this.presentToast(res.message || 'No se encontraron productos');
        }
      },
      error: () => {
        this.presentToast('Error al obtener productos');
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  goToProductDetail(id: number) {
    this.router.navigate(['/products/product', id]);
  }
}
