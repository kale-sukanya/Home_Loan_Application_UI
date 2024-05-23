import { Component } from '@angular/core';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './eligibility-calculator.component.html',
  styleUrls: ['./eligibility-calculator.component.scss']
})
export class EligibilityCalculatorComponent {
  netMonthlySalary: number = 0;

  constructor(private calculatorService: GetService) { }

  checkEligibility(): void {
    this.calculatorService.checkEligibility(this.netMonthlySalary).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

}