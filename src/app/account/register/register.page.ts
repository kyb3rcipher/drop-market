import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['../account.scss', './register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async register() {
    const alerts = document.getElementById('alerts');
    const incorrectData = document.getElementById('incorrect-data');
    const emailInvalid = document.getElementById('email-invalid');
    const passwordInvalid = document.getElementById('password-invalid');

    // Reset/hide all
    alerts?.classList.remove('show');
    incorrectData?.classList.remove('show');
    emailInvalid?.classList.remove('show');
    passwordInvalid?.classList.remove('show');

    let show = false;

    if (!this.name || !this.email || !this.password || !this.passwordConfirm) {
      incorrectData?.classList.add('show');
      show = true;
    }

    if (this.email && !/^\S+@\S+\.\S+$/.test(this.email)) {
      emailInvalid?.classList.add('show');
      show = true;
    }

    if (this.password && !/^(?=.*[A-Z])(?=.*\W).{10,}$/.test(this.password)) {
      passwordInvalid?.classList.add('show');
      show = true;
    }

    if (show) {
      alerts?.classList.add('show');
      return;
    }

    this.http.post<any>(`${environment.apiUrl}/register.php`, {
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm
    }).subscribe({
      next: async (res) => {
        if (res.success) {
          await this.presentToast('Usuario registrado correctamente');
        } else {
          alerts?.classList.add('show');
          incorrectData!.textContent = res.message;
          incorrectData?.classList.add('show');
        }
      },
      error: async () => {
        alerts?.classList.add('show');
        incorrectData!.textContent = 'Error al conectar con el servidor';
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
