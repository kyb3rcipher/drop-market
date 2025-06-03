import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa Router
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos-crear',
  templateUrl: './productos-crear.page.html',
  styleUrls: ['../admin.scss', './productos-crear.page.scss'],
  standalone: false,
})
export class ProductosCrearPage implements OnInit {
  product = {
    name: '',
    price: null as number | null,
    description: '',
    brand_id: null as number | null,
  };
  brands: any[] = [];
  selectedImageFile: File | null = null;

  // Inyecta Router en el constructor
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.http.get<any>(`${environment.apiUrl}/getBrands.php`).subscribe({
      next: (res) => {
        this.brands = res.brands ?? [];
      },
      error: () => {
        this.showToast('Error cargando marcas', 'danger');
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0] ?? null;
  }

  createProduct() {
    if (!this.product.name || !this.product.price || !this.product.description || !this.product.brand_id) {
      this.showToast('Completa todos los campos', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('brand_id', this.product.brand_id.toString());

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
    }

    this.http.post(`${environment.apiUrl}/createProduct.php`, formData).subscribe({
      next: async (res: any) => {
        if (res.success) {
          await this.showToast('Producto creado correctamente', 'success');
          this.resetForm();
          this.router.navigate(['/admin/productos']);
        } else {
          this.showToast('Error al crear el producto: ' + (res.message ?? ''), 'danger');
        }
      },
      error: () => {
        this.showToast('Error al crear el producto', 'danger');
      }
    });
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  resetForm() {
    this.product = {
      name: '',
      price: null,
      description: '',
      brand_id: null,
    };
    this.selectedImageFile = null;
  }
}
