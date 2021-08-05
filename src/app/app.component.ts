import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {Category} from "./intrfaces";
import {AuthService} from "./services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = ''
  categories?: Category[]
  loginForm!: FormGroup


  constructor(private categoryService: CategoryService,
              private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }


  getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }


  login() {
    this.loginForm.disable()
    this.authService.login(this.loginForm.value).subscribe(
      () => console.log('Login'),
      error => {
        console.warn(error)
        this.loginForm.enable()
      }
    )

  }
}
