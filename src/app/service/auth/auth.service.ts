import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser } from 'src/app/model/LoginUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $User = new BehaviorSubject<LoginUser | undefined>(undefined);

  constructor(private cookieService:CookieService) { }

  isLoggedIn():boolean{
    return !!localStorage.getItem('user-token');
  }


  setUser(user:LoginUser):void{

    this.$User.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-role',user.role);
    localStorage.setItem('user-token',user.token);
  }

  User(): Observable<LoginUser | undefined>{
    return this.$User.asObservable();
  }

  logout():void{
    localStorage.clear();
    this.cookieService.delete("Authorization", '/');
    this.$User.next(undefined);
  }

  getUser():LoginUser|undefined{
    const StorageEmail = localStorage.getItem('user-email');
    const StorageRole = localStorage.getItem('user-role');
    const StorageToken = localStorage.getItem('user-token');

    if(StorageEmail&&StorageRole&&StorageToken){
      const user: LoginUser = {
        email: StorageEmail,
        role: StorageRole,
        token: StorageToken
      };

      return user;
    }
    return undefined;
  }
}
