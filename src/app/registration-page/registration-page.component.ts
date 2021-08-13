import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  regForm!:FormGroup
  isRegister=false
  constructor(private fb:FormBuilder,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.regForm=this.fb.group({
      userName:[null,Validators.required],
      userLogin:[null,[Validators.required,Validators.email]],
      passwordHash:[null,[Validators.required, Validators.minLength(8),Validators.maxLength(20)]]
    })
  }
  get _userName() {
    return this.regForm.get('userName')!
  }
  get _userLogin() {
    return this.regForm.get('userLogin')!
  }
  get _passwordHash(){
    return this.regForm.get('passwordHash')!
  }
  onSubmit() {
    this.regForm.disable()
    this.authService.register(this.regForm.value).subscribe(
      ()=>{
        console.log('Register',this.regForm.value)
        this.isRegister=true
      },
      error => {
        console.warn(error, this.regForm.value)
        this.regForm.enable()

      }
    )

  }

}
