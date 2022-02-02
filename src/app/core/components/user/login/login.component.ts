import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/auth-services/user.service';
import { IuserLogin } from 'src/app/shared/interfaces/iuser-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder, private userSer: UserService) { }


  loginForm!: FormGroup
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],

    });
  }

  onSubmit() {
    let user: IuserLogin = { userName: this.userName?.value, password: this.password?.value }
    this.userSer.userLogin(user).subscribe(s => {

      console.log(s);
    });
  }

}
