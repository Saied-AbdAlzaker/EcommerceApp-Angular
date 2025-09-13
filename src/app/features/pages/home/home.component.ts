import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { HomeSliderComponent } from "../home-slider/home-slider.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, HomeSliderComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
