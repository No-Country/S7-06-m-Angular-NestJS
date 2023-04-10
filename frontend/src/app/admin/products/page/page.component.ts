import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  addProductForm:FormGroup;

  constructor(
    private adminService:AdminService,
    private formBuilder:FormBuilder
  ) {
    // Formulario Nuevo Producto
    this.addProductForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['',[Validators.required,Validators.maxLength(50)]],
        price:['',[Validators.required,Validators.min(0)]],
        categorie_name:['',[Validators.required]],
        images:[[],[Validators.required,,Validators.maxLength(300)]]
      }
    )
  }

  ngOnInit(): void {
  }


  /*------------NUEVO PRODUCTO---------------*/
  saveProduct(){
    // Almacenando el Formulario
    const newProduct = this.addProductForm.value;
    newProduct.images=newProduct.images.split();
    console.log(newProduct)
    // Servicio Save Product
    this.adminService.saveProduct(newProduct).subscribe({
      next: (res) => {
      },
      error: (error) => {
        console.log(error)
      },
      complete:()=>{
        location.reload();
      }
      }
    )
  }

  // Propiedades para los validadores
  // Propiedades Guardar PRODUCTO

  get NameAdd() {
    return this.addProductForm.get('name');
  }
  get DescriptionAdd() {
    return this.addProductForm.get('description')
  }
  get PriceAdd() {
    return this.addProductForm.get('price');
  }
  get CategoryAdd() {
    return this.addProductForm.get('categorie_name')
  }
  get Img_ProductAdd() {
    return this.addProductForm.get('images')
  }
  clearValidatorsAdd() {
    this.addProductForm.reset()
  }



}
