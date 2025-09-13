import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ISpecificCategory } from '../../../shared/interfaces/categories';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-details',
  imports: [DatePipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  categoryItem!: ISpecificCategory;
  categoryId!: string;

  constructor(private _categoriesService: CategoriesService, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.params.subscribe({
      next: (res) => {
        this.categoryId = res['categoryId']
      }
    })
  }

  ngOnInit(): void {
    this.getSpecificCategory(this.categoryId)
  }

  getSpecificCategory(id: string) {
    this._categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.categoryItem = res.data;
      }
    })
  }

}
