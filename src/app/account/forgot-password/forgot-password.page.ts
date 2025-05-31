import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['../account.scss', './forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private toastController: ToastController) {}
  ngOnInit() {}

  async forgotPassword() {
    const alerts = document.getElementById('alerts');
    const incorrectData = document.getElementById('incorrect-data');
    const emailMissing = document.getElementById('email-missing');
    const passwordMissing = document.getElementById('password-missing');

    this.http.post<any>(`${environment.apiUrl}/forgot-password.php`, { email: this.email, password: this.password }).subscribe({
      next: async (res) => {
        if (res.success) {
          alerts?.classList.remove('show');
          await this.presentToast('Contraseña cambiada exitosamente');
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
      // color: 'success',
    });
    await toast.present();
  }
}
