import { Component } from '@angular/core';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculatorComponent {

  loanAmount: number = 0;
  loanTenureInMonths: number = 0;
  interestRate: number = 8.5;

  constructor(private calculatorService: GetService) { }

  calculateEMI(): void {
    this.calculatorService.calculateEMI(this.loanAmount, this.loanTenureInMonths).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
