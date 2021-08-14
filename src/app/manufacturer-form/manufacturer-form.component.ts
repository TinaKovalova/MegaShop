import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Manufacturer} from "../intrfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {ManufacturerService} from "../services/manufacturer.service";

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.css']
})
export class ManufacturerFormComponent  implements OnInit{
  isNew=true
  form!:FormGroup
  manufacturer!:Manufacturer
  constructor(private route:ActivatedRoute,
              private fb:FormBuilder,
              private manufacturerService:ManufacturerService,
              private router:Router) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      name:[null,Validators.required]
    })
    this.form.disabled
    this.route.params.pipe(
      switchMap(
        (params:Params)=>{
          if (params['id']) {
            this.isNew = false
            return this.manufacturerService.getById(params['id'])
          }
          return of(null)
        }
      )
    )
      .subscribe(manufacturer=>{
        if(manufacturer){
          this.manufacturer=manufacturer
          this.form.patchValue({
            name:manufacturer.manufacturerName
          })
        }
        this.form.enabled
      })
  }
  get _name() {
    return this.form.get('name')!
  }
  onSubmit() {
    let sub$
    if(this.isNew){
       sub$=this.manufacturerService.add(this.form.value.name)
    }else {
      sub$=this.manufacturerService.update(this.manufacturer.manufacturerId,this.form.value.name)
    }
    sub$.subscribe( ()=>this.router.navigate(['/admin/manufacturer']))
  }

  onDelete(manufacturerId: number) {
    this.manufacturerService.delete(manufacturerId)
      .subscribe(()=>this.router.navigate(['/admin/manufacturer']))
  }

}
