import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  @Input() cantidad: number = 1;
  @Input() cantidadMaxima?: number;
  @Output() cantidadCambiada = new EventEmitter<number>();

  incrementar() {
    if (!this.cantidadMaxima || this.cantidad < this.cantidadMaxima) {
      this.cantidad++;
      this.cantidadCambiada.emit(this.cantidad);
    }
  }

  decrementar() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.cantidadCambiada.emit(this.cantidad);
    }
  }
}
