import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {Category} from "./intrfaces";
import {AuthService} from "./services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoodsService} from "./services/goods.service";
import {Router} from "@angular/router";


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
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('authToken')
    if (token !== null) {
      this.isAuth = true
      this.authService.setToken(token)
      this.userName = localStorage.getItem('user_name') as string
      this.userRole = localStorage.getItem('user_role') as string
    }
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
        this.userName = localStorage.getItem('user_name') as string
        this.userRole = localStorage.getItem('user_role') as string
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
    this.isAuth = false
    this.userRole = ''
    this.initForm()
    this.router.navigate(['/home'])
  }

  initForm() {
    this.loginForm = this.fb.group({
      userLogin: [null, [Validators.required]],
      passwordHash: [null, [Validators.required]]
    })
  }
}
