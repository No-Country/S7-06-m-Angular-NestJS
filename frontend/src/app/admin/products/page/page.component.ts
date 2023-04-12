import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductAdmin } from '../../models/product-admin';
import { ProductData } from '../../models/product-data';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  addProductForm:FormGroup;
  public archivo:string="";
  previsualizacion: any;


  constructor(private sanitizer: DomSanitizer, private adminService:AdminService, private formBuilder:FormBuilder) { 
    // Formulario Nuevo Producto            

    this.addProductForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['',[Validators.required,Validators.maxLength(50)]],
        price:[0,[Validators.required,Validators.min(0)]],
        category_name:['',[Validators.required]],
        //images:[[],[Validators.required,Validators.maxLength(300)]]
        file:[null,[Validators.required]]
      }
    )
  }

  ngOnInit(): void {
  }


  /*------------NUEVO PRODUCTO---------------*/  
  /*

  saveProduct(){
    
    const newProduct = this.addProductForm.value;
    newProduct.images=this.archivo;
    console.log(this.archivo)
    console.log(newProduct)

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
  }*/

  saveProduct(){
    const newProduct = this.addProductForm.value;
    newProduct.images=this.archivo;
    // Convert To Form Data
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.set('price', newProduct.price);
    formData.append('category_name', newProduct.category_name);
    formData.append('file', this.addProductForm.get('file')?.value);
    /*
    console.log(formData);
    formData.forEach((value: any, key: string) => {
      console.log(key, value);
    });*/

    // Save Product
    this.adminService.saveProduct(formData).subscribe({
      next: (_res) => {
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


  // VALIDATORS  
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
    return this.addProductForm.get('category_name')
  }
  get Img_ProductAdd() {
    return this.addProductForm.get('file')
  }
  clearValidatorsAdd() {
    this.addProductForm.reset()
  }
  /*
  onFileChanged(event:any){
    console.log(event)
    this.archivo = event[0].base64;
  }*/

  // Capture File
  captureFile(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addProductForm.get('file')?.setValue(file);
      this.extraerBase64(file).then((imagen: any) => {
        this.previsualizacion = imagen.base;
        console.log(imagen);  
      })
  }}

  // Previsualizacion de imagen en el form
  extraerBase64 = async ($event: any) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      return new Promise(resolve => {
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
      });
    } catch (e) {
      return {
        base: null
      };
    }
  };
}
