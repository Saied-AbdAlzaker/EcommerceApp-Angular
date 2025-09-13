import { Component, inject, OnInit } from '@angular/core';
import { BrandSliderComponent } from "../brand-slider/brand-slider.component";
import { IBrands } from '../../../shared/interfaces/brands';
import { BrandService } from '../../../core/services/brands/brand.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  imports: [BrandSliderComponent,RouterLink, TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandsList!: IBrands[];

  private _brandService = inject(BrandService);
  private _toastr = inject(ToastrService);

  constructor() { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this._brandService.allBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

}
