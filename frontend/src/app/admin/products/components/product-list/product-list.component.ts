import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductAdmin } from 'src/app/admin/models/product-admin';
import { AdminService } from 'src/app/admin/services/admin.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:ProductAdmin[]=[];
  editId:string="";
  deleteId:string="";
  trashProduct:string="";
  editProductForm: FormGroup;

  constructor(private adminService:AdminService,private productService:ProductService,private router:Router, private formBuilder:FormBuilder) {

    // Formulario Editar Producto
    this.editProductForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['',[Validators.required]],
        price:[0,[Validators.required,Validators.min(0)]],
        categorie_name:['',[Validators.required,Validators.maxLength(14)]],
        images:[[],[Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getAll().subscribe({
      next: (res) => {
        this.productList = res;
        console.log(this.productList)
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

  navigateTo(event:Event,id:string,product:ProductAdmin){
    event.preventDefault();
    event.stopPropagation();
    //this.producto=JSON.stringify(product);
    //sessionStorage.setItem("productDetail",this.producto);
    if (id){
      sessionStorage.setItem("idProduct",id)
      this.router.navigateByUrl("admin/productdetail")
    }
  }

  /*==================================================== */

  /*--------------Modales Metodos CRUD-------------------*/

  /*--------EDITAR PRODUCTO------------*/

  //Boton abrir modal: Capturar Id y producto
  editableId(id:any,product: ProductAdmin){
    const editableProduct = product;
    console.log(editableProduct);
    console.log(editableProduct.categories.name);
    console.log(editableProduct.images[0].url);
    const imgOld = editableProduct.images[0].url;
    this.editId = id;
    /* Mostrar datos en el modal */
    this.editProductForm.controls['name'].setValue(editableProduct.name);
    this.editProductForm.controls['description'].setValue(editableProduct.description);
    this.editProductForm.controls['price'].setValue(editableProduct.price);
    this.editProductForm.controls['categorie_name'].setValue(editableProduct.categories.name);
    this.editProductForm.controls['images'].setValue(imgOld);
  }

  // Actualizar PRODUCTO
  updateProduct(): void{
    const newProduct = this.editProductForm.value;
    newProduct.images=newProduct.images.split();
    this.editProductForm.reset();
    const editId = this.editId;
    console.log(newProduct)
    console.log(newProduct.images)
    this.adminService.updateProduct(editId,newProduct).subscribe({
      next: (res) => {
      },
      error: (error) => {
        console.log(error)
      },
      complete:()=>{
        this.getAllProducts();
        location.reload();
      }
    })
  }

  /*------BORRAR GASTO-------------------*/

  //BOTON abrir modal: Capturar Id y GASTO
  trashId(id:any,product:any): void{
    this.deleteId = id;
    this.trashProduct = product.name;
  }

  // deleteProduct:  ELIMINAR PRODUCTO
  deleteProduct(): void{
    this.adminService.deleteProduct(this.deleteId).subscribe({
      next: (res) => {
      },
      error: (error) => {
        console.log(error)
      },
      complete:()=>{
        this.getAllProducts();
        this.ngOnInit()
      }
    })
  }

  // VALIDATORS



  // Propiedades Editar Ingreso
  get NameEdit() {
    return this.editProductForm.get('name');
  }
  get DescriptionEdit() {
    return this.editProductForm.get('description')
  }
  get PriceEdit() {
    return this.editProductForm.get('price');
  }
  get CategoryEdit() {
    return this.editProductForm.get('categorie_name')
  }
  get Img_ProductEdit() {
    return this.editProductForm.get('images')
  }
  clearValidatorsEdit() {
    this.editProductForm.reset(this.editProductForm.value);
  }



}
