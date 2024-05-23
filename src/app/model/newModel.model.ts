export interface PersonalDetails {

    FirstName: string;
    MiddleName: string;
    LastName: string;
    EmailId: string;
    PhoneNumber: string;
    DOB: Date;
    Gender: string;
    Nationality: string;
    AadharNo: string;
    PanNo: string;
    ApplicationId: string;
    
  }

  export interface LoanDetails {
    ApplicationId: string;
    PropertyLocation: string;
    PropertyName: string;
    EstimateAmount: number;
    TypeOfEmployment: string;
    RetirementAge: number;
    OrganizationType: string;
    EmployerName: string;
    NetSalary: number;
    MaxLoanAmountGrantable: number;
    InterestRate: number;
    LoanAmount: number;
    Tenure: number;
    AppliedOn: Date;
  }