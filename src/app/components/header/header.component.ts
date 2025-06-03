
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
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

  showMainMenu() {
    this.currentSubmenuBrands = [];
    const mainMenu = document.getElementById('mainMenu');
    const submenu = document.getElementById('submenu');
    if (mainMenu && submenu) {
      submenu.hidden = true;
      mainMenu.hidden = false;
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
