import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'crudapp2';
  products: any[] = [];
  editMode: boolean = false;
  productToEdit: any = null;

  ngOnInit() {
    
    const storedProducts = sessionStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }


  saveToSessionStorage() {
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }


  onProductCreate(product: { pName: string; desc: string; price: string }) {
    const newProduct = {
      id: Date.now(), 
      ...product,
    };
    this.products.push(newProduct);
    this.saveToSessionStorage(); 
  }


  onDeleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveToSessionStorage(); 
  }


  onEditProduct(product: any) {
    this.editMode = true;
    this.productToEdit = { ...product };
  }


  onUpdateProduct() {
    const index = this.products.findIndex(
      (product) => product.id === this.productToEdit.id
    );
    if (index !== -1) {
      this.products[index] = { ...this.productToEdit };
    }
    this.editMode = false;
    this.productToEdit = null;
    this.saveToSessionStorage(); 
  }
}
