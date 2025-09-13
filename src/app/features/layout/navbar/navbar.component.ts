import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { TranslateAllService } from '../../../core/services/ngx-translate/translate-all.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  cartNumber!: Signal<number>;

  constructor(public _auth: AuthService, private flowbiteService: FlowbiteService,
    private _cartService: CartService, private _translate: TranslateAllService) {

    effect(() => {
      this.cartNumber = computed(() => _cartService.cartNumbers());

      if (_auth.user() !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }

    })

  }

  ngOnInit(): void {
    // flowbite
    this.flowbiteService.loadFlowbite((flowbite) => {

    });
  }

  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this._translate.changeDirection();
  }

}
