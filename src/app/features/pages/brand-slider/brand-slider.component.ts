import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrandService } from '../../../core/services/brands/brand.service';
import { IBrands } from '../../../shared/interfaces/brands';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-slider',
  imports: [CarouselModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.scss'
})
export class BrandSliderComponent implements OnInit {

  brandsList!: IBrands[];

  private _brandService = inject(BrandService);
  private _toastr = inject(ToastrService);

  constructor() { }

  ngOnInit(): void {
    this.getCategories()
  }

  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  getCategories() {
    this._brandService.allBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }

}
