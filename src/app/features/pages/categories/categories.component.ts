import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/categories';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [CategorySliderComponent, RouterLink, TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categoriesList!: ICategory[];

  private _categoriesService = inject(CategoriesService)
  private _toastr = inject(ToastrService)

  constructor() { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoriesService.allCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!');
      }
    })
  }
  
}
