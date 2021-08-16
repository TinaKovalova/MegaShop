import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../services/goods.service";
import {Goods, Photo} from "../intrfaces";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {PhotoService} from "../services/photo.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  goods$!: Observable<Goods[]>
  searchString = ''

  constructor(private goodsService: GoodsService) {}

  ngOnInit(): void {
    this.goods$ = this.goodsService.getAll()
  }

  onSearch() {
    if (this.searchString != '') {
      this.goods$ = this.goodsService.getAll()
        .pipe(
          map(good => good.filter(item => item.goodName.toLowerCase().includes(this.searchString.toLowerCase()))))
    } else {
      this.goods$ = this.goodsService.getAll()
    }

  }
  onClearSearch($event: Event) {
    if((<HTMLInputElement>$event.target).value===''){
      this.goods$ = this.goodsService.getAll()
    }
  }

}
