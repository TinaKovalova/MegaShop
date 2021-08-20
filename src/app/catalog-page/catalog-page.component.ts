import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../services/goods.service";
import {ManufacturerService} from "../services/manufacturer.service";
import {Goods, Manufacturer} from "../intrfaces";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../services/order.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],

})
export class CatalogPageComponent implements OnInit {

  manufacturers$!: Observable<Manufacturer[]>
  goods$!: Observable<Goods[]>
  categoryId: number | undefined
  manufacturerIds: number[] = []
  searchString!: string

  constructor(private goodService: GoodsService,
              private manufacturerService: ManufacturerService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllGoods()
    this.manufacturers$ = this.manufacturerService.getAll()
  }

  getAllGoods() {
    this.router.queryParams.subscribe(params => {
      this.categoryId = +params.category
      this.goods$ = this.goodService.getAll().pipe(
        map(goods => {
          if (!this.manufacturerIds.length) {
            return goods.filter(g => g.categoryId == this.categoryId)
          } else {
            return goods.filter(g => g.categoryId == this.categoryId)
              .filter(good => this.manufacturerIds.includes(good.manufacturerId))
          }
        })
      )
    })
  }

  sortByManufacturer(id: number) {
    this.getAllGoods()
    if (this.manufacturerIds.includes(id)) {
      // console.log('includes', id)
      this.manufacturerIds = this.manufacturerIds.filter(e => e != id)
    } else {
      this.manufacturerIds.push(id)
      // console.log('!includes',id)
    }
  }

  onSearch() {
    if (this.searchString != '') {
      this.goods$ = this.goods$
        .pipe(map(good => good.filter(item => item.goodName.toLowerCase().includes(this.searchString.toLowerCase()))))
    }
  }

  onClearSearch($event: Event) {
    if ((<HTMLInputElement>$event.target).value === '') {
      this.getAllGoods()
    }
  }
}
