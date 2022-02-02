import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../auth-services/user.service';
import { CheckRolesService } from '../../helper/check-roles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private userSer: UserService) { }
  isAdmin = false;
  isToken = false;
  ngOnInit(): void {
  }

  ngDoCheck(): void {

    if (localStorage.getItem('token')) {
      this.isToken = true;
    }

  }

  logout() {
    this.userSer.logout();
    this.isToken = false;
  }


}
