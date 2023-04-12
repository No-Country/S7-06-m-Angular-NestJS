import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const angularMaterial: any = [
  MatIconModule, MatProgressSpinnerModule
];

@NgModule({
  imports: [...angularMaterial],
  exports: [...angularMaterial]
})
export class MaterialModule { }
