import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos-editar',
  templateUrl: './productos-editar.page.html',
  styleUrls: ['../admin.scss', './productos-editar.page.scss'],
  standalone: false,
})
export class ProductosEditarPage implements OnInit {
  product = {
    id: null as number | null,
    name: '',
    price: null as number | null,
    description: '',
    brand_id: null as number | null,
    image: '', // ruta imagen actual
  };

  brands: any[] = [];
  selectedImageFile: File | null = null;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadBrands();

    // Leer parámetro id opcional
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.product.id = +idParam;
        this.isEditing = true;
        this.loadProduct(this.product.id);
      } else {
        this.isEditing = false;
      }
    });
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

  loadProduct(id: number) {
    // Endpoint para obtener producto por id, ejemplo: getProduct.php?id=xx
    this.http.get<any>(`${environment.apiUrl}/getProduct.php?id=${id}`).subscribe({
      next: (res) => {
        if (res.success && res.product) {
          this.product = {
            ...this.product,
            name: res.product.name,
            price: +res.product.price,
            description: res.product.description,
            brand_id: +res.product.brand_id,
            image: res.product.image || '',
          };
        } else {
          this.showToast('Producto no encontrado', 'warning');
          this.router.navigate(['/admin/productos']);
        }
      },
      error: () => {
        this.showToast('Error cargando producto', 'danger');
        this.router.navigate(['/admin/productos']);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0] ?? null;
  }

  saveProduct() {
    if (!this.product.name || !this.product.price || !this.product.description || !this.product.brand_id) {
      this.showToast('Completa todos los campos', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price!.toString());
    formData.append('description', this.product.description);
    formData.append('brand_id', this.product.brand_id!.toString());

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile, this.selectedImageFile.name);
    }
    if (this.product.id !== null) {
      formData.append('id', this.product.id.toString());
    }

    // Usamos POST a updateProduct.php (o PUT si quieres)
    this.http.post(`${environment.apiUrl}/updateProduct.php`, formData).subscribe({
      next: async (res: any) => {
        if (res.success) {
          await this.showToast('Producto actualizado correctamente', 'success');
          this.router.navigate(['/admin/productos']);
        } else {
          this.showToast('Error al actualizar el producto: ' + (res.message ?? ''), 'danger');
        }
      },
      error: () => {
        this.showToast('Error al actualizar el producto', 'danger');
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
}
