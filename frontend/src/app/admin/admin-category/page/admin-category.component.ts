import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/store/products/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  addCategoryForm!:FormGroup;

  deleteCategoryForm!:FormGroup;

  categories!:Category[];

  actionToDo = Action.NEW;

  constructor(
    private formBuilder:FormBuilder,
    private productService: ProductService
  ) {
    this.addCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.deleteCategoryForm = this.formBuilder.group({
      id: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(Categories => {
      this.categories = Categories;
    });
  }

  saveCategory(){
    const valueCategory = this.addCategoryForm.value;
    this.productService.newCategory(valueCategory).subscribe((res) => {
      console.log(res);
      this.addCategoryForm.reset();
    }, (error) => {
      console.log(error);
    });

  }

  deleteCategory(){
    const valueCategory = this.deleteCategoryForm.value.id;
    console.log(valueCategory)
    this.productService.deleteCategory(valueCategory).subscribe(data => {
      console.log(data);
      this.getAllCategories();
    }, error => {
      console.log(error);
    })
  }

}
