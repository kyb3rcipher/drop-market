import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['../admin.scss', './productos.page.scss'],
  standalone: false,
})
export class ProductosPage implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.http.get<any>(`${environment.apiUrl}/getProducts.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.productos = res.products;
          console.log(this.productos);
        }
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });
  }

  async deleteProducto(producto: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar producto?',
      message: `Estás seguro de eliminar "${producto.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.http.post<any>(`${environment.apiUrl}/deleteProduct.php`, { id: producto.id }).subscribe({
              next: async (res) => {
                if (res.success) {
                  this.productos = this.productos.filter(p => p.id !== producto.id);
                  const toast = await this.toastCtrl.create({
                    message: 'Producto eliminado correctamente.',
                    duration: 2000,
                    color: 'danger'
                  });
                  toast.present();
                } else {
                  const toast = await this.toastCtrl.create({
                    message: res.message || 'Error al eliminar el producto.',
                    duration: 2000,
                    color: 'danger'
                  });
                  toast.present();
                }
              },
              error: async () => {
                const toast = await this.toastCtrl.create({
                  message: 'Error en la solicitud.',
                  duration: 2000,
                  color: 'danger'
                });
                toast.present();
              }
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  
}
