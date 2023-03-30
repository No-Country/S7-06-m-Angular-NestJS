import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const angularMaterial: any = [
  MatIconModule,
];

@NgModule({
  imports: [...angularMaterial],
  exports: [...angularMaterial]
})
export class MaterialModule { }
