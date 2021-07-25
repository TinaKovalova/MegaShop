import { Component, OnInit } from '@angular/core';
import {Manufacturer} from "../intrfaces";
import {Observable, of} from "rxjs";
import {ManufacturerService} from "../services/manufacturer.service";

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  manufacturers$!:Observable<Manufacturer[]>
  constructor(private manufacturerService: ManufacturerService) {}
  ngOnInit(): void {
    this.manufacturers$= this.manufacturerService.getAll()
  }
}
