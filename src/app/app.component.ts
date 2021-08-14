import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {Category} from "./intrfaces";
import {AuthService} from "./services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoodsService} from "./services/goods.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = ''
  categories!: Category[]

  loginForm!: FormGroup
  isAuth=false
  userName=''
  userRole=''


  constructor(private categoryService: CategoryService,
              private goodsService:GoodsService,
              private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userLogin: [null, [Validators.required]],
      passwordHash: [null, [Validators.required]]
    })
  }



  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }


  login() {
    this.loginForm.disable()
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        console.log('Login',this.authService.getToken())
        this.userName=this.authService.userData.unique_name.shift()
        this.userRole=this.authService.userData.role
        this.isAuth=this.authService.isAuth()
        this.loginForm.reset()
      },
      error => {
        console.warn(error)
        this.loginForm.enable()
      }
    )

  }

  logout() {
    this.authService.logout()
    this.userName=''
    this.isAuth=this.authService.isAuth()
    console.log('logout')
  }
}
