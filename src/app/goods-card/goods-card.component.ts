import {Component, Input, OnInit} from '@angular/core';
import {PhotoService} from "../services/photo.service";
import {Goods, Photo} from "../intrfaces";

@Component({
  selector: 'app-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.css']
})
export class GoodsCardComponent implements OnInit {
  photos!:Photo[]
  titlePhoto='https://lh3.googleusercontent.com/proxy/R2MhMjXU0Y3p7YUagGeZp6fGZoC-gfVJ3Bkzue5_j4zRMfFtgO4OkhUcVJEXsnFnK8WtpKQEDjE9_bey1EuuDK-V5goU2YqnCDE-41DYFgeydQZJlW1Qk8jwYA7ZG7reePBI_A'
  @Input() product!:Goods
  @Input() queryParams!:{}

  constructor(private photoService:PhotoService) { }

  ngOnInit(): void {
   this.photoService.getAll().subscribe(photos=>{
     this.photos=photos.filter(photo=>photo.goodId==this.product.goodId)
     this.titlePhoto=this.photos[0].photoPath
   })

  }

}
