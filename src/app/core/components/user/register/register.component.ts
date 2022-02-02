import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/auth-services/user.service';
import { IuserRegister } from 'src/app/shared/interfaces/iuser-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get age() {
    return this.loginForm.get('age');
  }

  get email() {
    return this.loginForm.get('email');
  }
  constructor(private fb: FormBuilder, private userSer: UserService) { }


  loginForm!: FormGroup
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      age: ['', [Validators.required]],

    });
  }

  onSubmit() {
    let user: IuserRegister = {
      userName: this.userName?.value,
      password: this.password?.value,
      email: this.email?.value,
      age: this.age?.value
    };


    this.userSer.userRegister(user).subscribe(s => {

      console.log(s);
    });
  }
}
