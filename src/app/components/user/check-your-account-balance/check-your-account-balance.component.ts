import { Component } from '@angular/core';
import { Account } from 'src/app/model/account.model';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-check-your-account-balance',
  templateUrl: './check-your-account-balance.component.html',
  styleUrls: ['./check-your-account-balance.component.scss']
})
export class CheckYourAccountBalanceComponent {

  accountNumber!: string;
  account!: Account|null;

  constructor(private accountService: GetService) { }

  findAccountBalance() {
    this.accountService.getAccountByAccountNo(this.accountNumber).subscribe(
      (data: Account) => {
        this.account = data;
        console.log(data);
      },
      (error) => {
        if (error.status === 404) {
          alert('Account Number not found');
        }
      }
    );
  }
  onTrackerIdChange() {
    if (!this.accountNumber) {
      this.account = null;
    }
  }
}