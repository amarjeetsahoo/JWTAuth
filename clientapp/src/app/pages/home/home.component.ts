import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails: any;
  showData: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    this.userDetails = this._authService.getUserDetail();
    if (this.userDetails)
      this.showData = true;
    else
      this.showData = false;
  }


}
