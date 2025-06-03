import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false,
})
export class CategoriasPage implements OnInit {

  categories: any[] = [];

  constructor(private http: HttpClient, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any>(`${environment.apiUrl}/getCategories.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.categories;
        }
      },
      error: (err) => {
        console.error('Error cargando categorias', err);
      }
    });
  }

  async addCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Categoria',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la categoría',
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newName = data.name.trim();
            if (!newName) return;
  
            this.http.post<any>(`${environment.apiUrl}/addCategory.php`, { name: newName })
              .subscribe({
                next: async (res) => {
                  if (res.success && res.id) {
                    this.categories.push({ id: res.id, name: newName });
                    const toast = await this.toastCtrl.create({
                      message: `Categoría creada con ID: ${res.id}`,
                      duration: 2500,
                      color: 'success',
                    });
                    toast.present();
                  } else {
                    const toast = await this.toastCtrl.create({
                      message: 'Error al crear la categoría.',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  }
                },
                error: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Error al crear la categoría.',
                    duration: 2000,
                    color: 'danger',
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
  
  async editCategory(category: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Categoria',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nuevo nombre',
          value: category.name
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newName = data.name.trim();
            if (!newName || newName === category.name) return;
  
            this.http.post<any>(`${environment.apiUrl}/updateCategory.php`, {
              id: category.id,
              name: newName
            }).subscribe({
              next: async (res) => {
                if (res.success) {
                  category.name = newName; // Update in local list
                  const toast = await this.toastCtrl.create({
                    message: 'Categoria actualizada.',
                    duration: 2000,
                    color: 'success'
                  });
                  toast.present();
                }
              },
              error: async () => {
                const toast = await this.toastCtrl.create({
                  message: 'Error al actualizar.',
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

  async deleteCategory(categoryId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar categoria?',
      message: 'Esta accion elimina tambien sus marcas y sus productos.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.http
              .post<any>(`${environment.apiUrl}/deleteCategory.php`, { id: categoryId })
              .subscribe({
                next: async (res) => {
                  if (res.success) {
                    this.categories = this.categories.filter(c => c.id !== categoryId);
                    const toast = await this.toastCtrl.create({
                      message: 'Categoria eliminada.',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  }
                },
                error: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Error al eliminar la categoría.',
                    duration: 2000,
                    color: 'danger',
                  });
                  toast.present();
                },
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
