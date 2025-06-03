import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['../admin.scss', './marcas.page.scss'],
  standalone: false,
})
export class MarcasPage implements OnInit {
  marcas: any[] = [];
  categories: { id: number; name: string }[] = [];

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands() {
    this.http.get<any>(`${environment.apiUrl}/getBrands.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.marcas = res.brands;
        }
      },
      error: (err) => {
        console.error('Error cargando marcas', err);
      }
    });
  }

  loadCategories() {
    this.http.get<any>(`${environment.apiUrl}/getCategories.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.categories;
          console.log(this.categories);
        }
      },
      error: (err) => {
        console.error('Error cargando categorías', err);
      }
    });
  }

  editCategory(marca: any) {}

  async addBrand() {
    let brandName = '';
    let selectedCategoryId: number | null = null;

    while (true) {
      const alertName = await this.alertCtrl.create({
        header: 'Nueva Marca',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Nombre de la marca',
            value: brandName
          }
        ],
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Siguiente',
            handler: (data) => {
              const inputName = data.name?.trim();
              if (!inputName) return false;
              brandName = inputName;
              return true;
            }
          }
        ]
      });

      await alertName.present();
      const res = await alertName.onDidDismiss();
      if (res.role === 'cancel') return;

      while (true) {
        const categoryOptions = this.categories.map(cat => ({
          name: 'category',
          type: 'radio' as const,
          label: cat.name,
          value: cat.id.toString(),
          checked: cat.id === selectedCategoryId
        }));

        const alertCategory = await this.alertCtrl.create({
          header: 'Selecciona Categoría',
          inputs: categoryOptions,
          buttons: [
            { text: 'Volver', role: 'cancel' },
            {
              text: 'Guardar',
              handler: (data) => {
                if (!data) return false;
                selectedCategoryId = Number(data);
                return true;
              }
            }
          ]
        });

        await alertCategory.present();
        const res2 = await alertCategory.onDidDismiss();

        if (res2.role === 'cancel') break;

        if (selectedCategoryId) {
          this.http.post<any>(`${environment.apiUrl}/addBrand.php`, {
            name: brandName,
            category_id: selectedCategoryId
          }).subscribe({
            next: async (res) => {
              if (res.success && res.id) {
                const categoryName = this.categories.find(c => c.id === selectedCategoryId)?.name || '';
                this.marcas.push({
                  brand_id: res.id,
                  brand_name: brandName,
                  category_id: selectedCategoryId,
                  category_name: categoryName
                });
                const toast = await this.toastCtrl.create({
                  message: `Marca creada con ID: ${res.id}`,
                  duration: 2500,
                  color: 'success',
                });
                toast.present();
              } else {
                const toast = await this.toastCtrl.create({
                  message: res.message || 'Error al crear la marca.',
                  duration: 2000,
                  color: 'danger',
                });
                toast.present();
              }
            },
            error: async () => {
              const toast = await this.toastCtrl.create({
                message: 'Error al crear la marca.',
                duration: 2000,
                color: 'danger',
              });
              toast.present();
            }
          });

          return;
        }
      }
    }
  }

  async editBrand(marca: any) {
    let editedName = marca.brand_name;
    let selectedCategoryId: number | null = marca.category_id;

    while (true) {
      const alertName = await this.alertCtrl.create({
        header: 'Editar Marca',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Nombre de la marca',
            value: editedName
          }
        ],
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Siguiente',
            handler: (data) => {
              const inputName = data.name?.trim();
              if (!inputName) return false;
              editedName = inputName;
              return true;
            }
          }
        ]
      });

      await alertName.present();
      const res = await alertName.onDidDismiss();
      if (res.role === 'cancel') return;

      while (true) {
        const categoryOptions = this.categories.map(cat => ({
          name: 'category',
          type: 'radio' as const,
          label: cat.name,
          value: cat.id.toString(),
          checked: cat.id === selectedCategoryId
        }));

        const alertCategory = await this.alertCtrl.create({
          header: 'Selecciona Categoría',
          inputs: categoryOptions,
          buttons: [
            { text: 'Volver', role: 'cancel' },
            {
              text: 'Guardar',
              handler: (data) => {
                if (!data) return false;
                selectedCategoryId = Number(data);
                return true;
              }
            }
          ]
        });

        await alertCategory.present();
        const res2 = await alertCategory.onDidDismiss();

        if (res2.role === 'cancel') break;

        if (selectedCategoryId !== null) {
          this.http.post<any>(`${environment.apiUrl}/updateBrand.php`, {
            id: marca.brand_id,
            name: editedName,
            category_id: selectedCategoryId
          }).subscribe({
            next: async (res) => {
              if (res.success) {
                marca.brand_name = editedName;
                marca.category_id = selectedCategoryId;
                marca.category_name = this.categories.find(c => c.id === selectedCategoryId)?.name || '';
                const toast = await this.toastCtrl.create({
                  message: 'Marca actualizada correctamente.',
                  duration: 2000,
                  color: 'success'
                });
                toast.present();
              } else {
                const toast = await this.toastCtrl.create({
                  message: res.message || 'Error al actualizar la marca.',
                  duration: 2000,
                  color: 'danger'
                });
                toast.present();
              }
            },
            error: async () => {
              const toast = await this.toastCtrl.create({
                message: 'Error en la actualización.',
                duration: 2000,
                color: 'danger'
              });
              toast.present();
            }
          });

          return;
        }
      }
    }
  }

  async deleteBrand(brand: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar marca?',
      message: `Esto tambien eliminara todos los productos asociados a la marca "${brand.brand_name}".`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.http.post<any>(`${environment.apiUrl}/deleteBrand.php`, { id: brand.brand_id }).subscribe({
              next: async (res) => {
                if (res.success) {
                  this.marcas = this.marcas.filter(m => m.brand_id !== brand.brand_id);
                  const toast = await this.toastCtrl.create({
                    message: 'Marca eliminada correctamente.',
                    duration: 2000,
                    color: 'danger'
                  });
                  toast.present();
                } else {
                  const toast = await this.toastCtrl.create({
                    message: res.message || 'Error al eliminar.',
                    duration: 2000,
                    color: 'danger'
                  });
                  toast.present();
                }
              },
              error: async () => {
                const toast = await this.toastCtrl.create({
                  message: 'Error al eliminar la marca.',
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