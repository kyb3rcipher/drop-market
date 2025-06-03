
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {
  categories: { id: number; name: string; brands: { id: number; name: string }[]; }[] = [];
  loading = false;
  errorMessage = '';
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadCategories();
    this.checkAdmin();
  }

  async checkAdmin() {
    const userData = await this.storage.get('userData');
    if (userData?.email === 'admin@kyb3rcipher.com') {
      this.isAdmin = true;
    }
  }

  loadCategories() {
    this.loading = true;
    this.errorMessage = '';
  
    this.http.get<any>(`${environment.apiUrl}/getCategories.php`).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.categories = res.categories;
        } else {
          this.errorMessage = 'Categories could not be loaded.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error connecting to the server.';
      }
    });
  }

  currentSubmenuBrands: { id: number; name: string }[] = [];
  currentCategoryName: string = '';

  showMainMenu() {
    const mainMenu = document.getElementById('mainMenu');
    const submenu = document.getElementById('submenu');
    const adminSubmenu = document.getElementById('adminSubmenu');
  
    if (mainMenu) mainMenu.hidden = false;
    if (submenu) submenu.hidden = true;
    if (adminSubmenu) adminSubmenu.hidden = true;
  }  


  showSubmenu(category: any) {
    this.currentSubmenuBrands = category.brands;
    this.currentCategoryName = category.name;
  
    const mainMenu = document.getElementById('mainMenu');
    const submenu = document.getElementById('submenu');
    if (mainMenu && submenu) {
      mainMenu.hidden = true;
      submenu.hidden = false;
    }
  }

  currentAdminTitle: string = 'Admin';
  showAdminSubmenu() {
    this.currentAdminTitle = 'Admin';
  
    const mainMenu = document.getElementById('mainMenu');
    const submenu = document.getElementById('submenu');
    const adminSubmenu = document.getElementById('adminSubmenu');
  
    if (mainMenu && submenu && adminSubmenu) {
      mainMenu.hidden = true;
      submenu.hidden = true;
      adminSubmenu.hidden = false;
    }
  }  
  

  formatSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize("NFD") // quita acentos
      .replace(/[\u0300-\u036f]/g, "") // quita caracteres especiales
      .replace(/\s+/g, "-") // reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, ""); // elimina otros caracteres
  }
}
