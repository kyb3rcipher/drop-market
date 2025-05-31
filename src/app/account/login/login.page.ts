import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

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
          await this.presentToast('Login exitoso');
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
      // color: 'success',
    });
    await toast.present();
  }
}