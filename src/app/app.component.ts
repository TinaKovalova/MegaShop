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
  isAuth = false
  userName = ''
  userRole = ''
  authError!: string | null


  constructor(private categoryService: CategoryService,
              private goodsService: GoodsService,
              private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
   this.initForm()
  }

  get _userLogin() {
    return this.loginForm.get('userLogin')!
  }

  get _passwordHash() {
    return this.loginForm.get('passwordHash')!
  }


  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }


  login() {
    this.loginForm.disable()
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        console.log('token ', this.authService.getToken())
        this.userName = this.authService.userData.unique_name.shift()
        let login = this.authService.userData.unique_name.reverse().shift()
        localStorage.setItem('login', login)
        this.userRole = this.authService.userData.role
        this.isAuth = this.authService.isAuth()
        this.authError = null
      },
      error => {
        console.warn(error)
        this.authError = 'Неверно указан логин или пароль'
        this.loginForm.enable()
      }
    )

  }

  logout() {

    this.authService.logout()
    this.userName = ''
    this.isAuth = this.authService.isAuth()
    this.initForm()

    console.log('logout')
  }
  initForm(){
    this.loginForm=this.fb.group({
      userLogin: [null, [Validators.required]],
      passwordHash: [null, [Validators.required]]
    })
  }
}
