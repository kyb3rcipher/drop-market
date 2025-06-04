import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../account.scss', './login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    const storedData = await this.storage.get('userData');
    if (storedData?.email) {
      this.email = storedData.email;
      this.rememberMe = true;
    }
  }

  async login() {
    const alerts = document.getElementById('alerts');
    const incorrectData = document.getElementById('incorrect-data');
    const emailMissing = document.getElementById('email-missing');
    const passwordMissing = document.getElementById('password-missing');
    
    // Reset/hide all alerts
    alerts?.classList.remove('show');
    incorrectData?.classList.remove('show');
    emailMissing?.classList.remove('show');
    passwordMissing?.classList.remove('show');

    let show = false;

    // Show alerts
    if (!this.email) {
      emailMissing?.classList.add('show');
      show = true;
    }
    if (!this.password) {
      passwordMissing?.classList.add('show');
      show = true;
    }
    if (show) {
      alerts?.classList.add('show');
      return;
    }
    
    // Login post request
    this.http.post<any>(`${environment.apiUrl}/login.php`, { email: this.email, password: this.password }).subscribe({
      next: async (res) => {
        if (res.success) {
          alerts?.classList.remove('show');

          // Guardar o eliminar según el checkbox
          if (this.rememberMe) {
            await this.storage.set('userData', { email: this.email });
          } else {
            await this.storage.remove('userData'); // Asegúrate de eliminar los datos si no se selecciona "Mantener sesión iniciada"
          }

          await this.presentToast('Login exitoso');
          // Aquí puedes redirigir si es necesario
        } else {
          alerts?.classList.add('show');
          incorrectData?.classList.add('show');
        }
      },
      error: async () => {
        alerts?.classList.add('show');
        incorrectData?.classList.add('show');
      }
    });
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
