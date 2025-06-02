import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent  implements OnInit {

  categories: { id: number; name: string }[] = [];
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
}
