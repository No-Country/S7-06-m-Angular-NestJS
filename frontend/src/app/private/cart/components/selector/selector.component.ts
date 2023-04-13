import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/shared/models/store/cart/cart';
import { CartItem } from 'src/app/shared/models/store/cart/cartItem';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  cart!:Cart;

  @Input() cantidad: number = 1;
  @Input() cantidadMaxima?: number;
  @Output() cantidadCambiada = new EventEmitter<number>();

  constructor(private cartService: CartService){}

  changeQuantity(cartItem:CartItem){
    let quantity = this.cantidad
    console.log('cant productos', quantity)

    this.cartService.changeQuantity(cartItem.product.id!, quantity);
  }

  incrementar(cartItem:CartItem) {
    if (!this.cantidadMaxima || this.cantidad < this.cantidadMaxima) {
      this.cantidad++;
      this.changeQuantity(cartItem)
      this.cantidadCambiada.emit(this.cantidad);
    }
  }

  decrementar(cartItem:CartItem) {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.changeQuantity(cartItem)
      this.cantidadCambiada.emit(this.cantidad);
    }
  }
}
