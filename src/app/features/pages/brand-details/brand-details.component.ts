import { Component, OnInit } from '@angular/core';
import { ISpecificBrand } from '../../../shared/interfaces/brands';
import { BrandService } from '../../../core/services/brands/brand.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-brand-details',
  imports: [DatePipe],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit{

  brandItem!: ISpecificBrand;
  brandId!: string;

  constructor(private _brandService: BrandService, private _activatedRoute: ActivatedRoute) {
    _activatedRoute.params.subscribe({
      next: (res) => {
        this.brandId = res['brandId']
      }
    })
  }

  ngOnInit(): void {
    this.getSpecificCategory(this.brandId)
  }

  getSpecificCategory(id: string) {
    this._brandService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandItem = res.data;
      }
    })
  }

}
