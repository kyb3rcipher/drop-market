import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {

  quantity: number = 1;
  size: any = '';
  
  products = [
    {
      image: 'https://drop-shop.mx/cdn/shop/files/s-l1600_db107192-7113-4af4-b484-1b616fd55c9e.webp?v=1730748842',
      title: 'Labubu "The monsters" Exciting Macaron',
      price: '1,200'
    },
    {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "The monsters" Have a Seat',
      price: '999'
    },
    {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    },
    {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    },
    {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    }, {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    }, {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    }, {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    }, {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    }, {
      image: 'https://drop-shop.mx/cdn/shop/files/image_67_48f5bae1-afc1-4563-9159-1ca06c211cd1.webp',
      title: 'Labubu "Fall in wild"',
      price: '999'
    },
  ];
  
  constructor() { }

  ngOnInit() {}

  increaseQuantity() {
    this.quantity++;
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
