import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['../admin.scss', './usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {

  usuarios: any[] = [];

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.http.get<any>(`${environment.apiUrl}/getUsers.php`).subscribe({
      next: (res) => {
        if (res.success) {
          this.usuarios = res.users;
        }
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  async addUser() {
    const alert = await this.alertCtrl.create({
      header: 'Crear Usuario',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña',
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const email = data.email?.trim();
            const password = data.password;

            if (!email || !password) return;

            this.http.post<any>(`${environment.apiUrl}/createUser.php`, { email, password })
              .subscribe({
                next: async (res) => {
                  if (res.success && res.id) {
                    this.usuarios.push({ id: res.id, email });
                    const toast = await this.toastCtrl.create({
                      message: `Usuario creado con ID: ${res.id}`,
                      duration: 2500,
                      color: 'success',
                    });
                    toast.present();
                  } else {
                    const toast = await this.toastCtrl.create({
                      message: res.message || 'Error al crear usuario.',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  }
                },
                error: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Error al crear usuario.',
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

  async editUser(usuario: any) {
    const alert = await this.alertCtrl.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: usuario.email
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Nueva Contraseña (dejar vacío para no cambiar)',
          value: ''
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newEmail = data.email?.trim();
            const newPassword = data.password;

            if (!newEmail || newEmail === usuario.email && !newPassword) return;

            const payload: any = { id: usuario.id, email: newEmail };
            if (newPassword && newPassword.length > 0) {
              payload.password = newPassword;
            }

            this.http.post<any>(`${environment.apiUrl}/updateUser.php`, payload)
              .subscribe({
                next: async (res) => {
                  if (res.success) {
                    usuario.email = newEmail;
                    const toast = await this.toastCtrl.create({
                      message: 'Usuario actualizado.',
                      duration: 2000,
                      color: 'success'
                    });
                    toast.present();
                  } else {
                    const toast = await this.toastCtrl.create({
                      message: res.message || 'Error al actualizar usuario.',
                      duration: 2000,
                      color: 'danger'
                    });
                    toast.present();
                  }
                },
                error: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Error al actualizar usuario.',
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

  async deleteUsuario(usuario: any) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar usuario?',
      message: `Eliminar usuario ${usuario.email}? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.http.post<any>(`${environment.apiUrl}/deleteUser.php`, { id: usuario.id })
              .subscribe({
                next: async (res) => {
                  if (res.success) {
                    this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
                    const toast = await this.toastCtrl.create({
                      message: 'Usuario eliminado.',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  } else {
                    const toast = await this.toastCtrl.create({
                      message: res.message || 'Error al eliminar usuario.',
                      duration: 2000,
                      color: 'danger',
                    });
                    toast.present();
                  }
                },
                error: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Error al eliminar usuario.',
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

}
