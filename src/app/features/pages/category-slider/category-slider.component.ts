import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {

  categoriesList!: ICategory[];

  private _categoriesService = inject(CategoriesService)

  constructor() { }

  ngOnInit(): void {
    this.getCategories()
  }

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
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
    this._categoriesService.allCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }
    })
  }

}
