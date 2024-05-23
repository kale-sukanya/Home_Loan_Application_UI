import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/LoginUser.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  
  user?: LoginUser;

  constructor(private auth:AuthService, private router: Router){}
  ngOnInit(): void {
    this.auth.User().subscribe({
      next:(res)=>{
        this.user = res;
        console.log(this.user); 
      }
    });

    this.user = this.auth.getUser();

  }

  onLogout():void{
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
