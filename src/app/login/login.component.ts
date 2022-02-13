import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      res => {
        const user = res.find((a:User)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          alert('login Successful');
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        } else {
          alert('User not found');
        }  
      }, err => {
        alert('Something went wrong');	
      });
  }
}
