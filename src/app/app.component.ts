import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseProyect';
  productList: AngularFireList<any>;
  product: Array<any>;
  productForm = {
    name: '',
    branch: '',
    category: '',
    price: 0,
    lot: 0,
    size: ''
  }

  constructor(public firebase:AngularFireDatabase){
    // Crea una tabla en la base de datos
    this.productList = this.firebase.list('product');
    this.product = [];
    // Obtiene los productos que haya registrados en la BD
    this.productList.snapshotChanges().subscribe(item => {
      item.forEach(producto => {
        let x = producto.payload.toJSON();
        this.product.push(x);
      });
    });
    console.log('Products:', this.product);
  }

  addProduct() {
    this.productList.push(this.productForm);
    this.clearForm();
    alert('Product added :)');
  }
  clearForm() {
    this.productForm = {
      name: '',
      branch: '',
      category: '',
      price: 0,
      lot: 0,
      size: ''
    }
  }
}
