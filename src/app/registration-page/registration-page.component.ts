import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  form!:FormGroup
  isRegister=false
  constructor(private fb:FormBuilder,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required, Validators.minLength(8),Validators.maxLength(20)]]
    })
  }
  get _name() {
    return this.form.get('name')!
  }
  get _email() {
    return this.form.get('email')!
  }
  get _password(){
    return this.form.get('password')!
  }
  onSubmit() {
    this.form.disable()
    this.authService.register(this.form.value).subscribe(
      ()=>{
        console.log('Register')
        this.isRegister=true
      },
      error => {
        console.warn(error)
        this.form.enable()

      }
    )

  }

}
