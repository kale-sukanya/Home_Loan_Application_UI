import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UpdateApplicationStatusComponent } from './components/admin/update-application-status/update-application-status.component';
import { ViewAllApplicationsComponent } from './components/admin/view-all-applications/view-all-applications.component';
import { PostLoanDetailsComponent } from './components/application/post-loan-details/post-loan-details.component';
import { PostPersonalDetailsComponent } from './components/application/post-personal-details/post-personal-details.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { CheckYourAccountBalanceComponent } from './components/user/check-your-account-balance/check-your-account-balance.component';
import { TrackYourApplicationStatusComponent } from './components/user/track-your-application-status/track-your-application-status.component';
import { UnauthorizedComponent } from './components/extraPages/unauthorized/unauthorized.component';
import { authGuard } from './gaurd/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EligibilityCalculatorComponent } from './components/eligibility-calculator/eligibility-calculator.component';
import { EmiCalculatorComponent } from './components/emi-calculator/emi-calculator.component';
import { ImageSelectorComponent } from './components/extraPages/components/image-selector/image-selector.component';
import { ViewYourApplicationComponent } from './components/user/view-your-application/view-your-application.component';
import { UploadDocumentsComponent } from './components/application/upload-documents/upload-documents.component';
import { DocumentsListComponent } from './components/extraPages/components/documents-list/documents-list.component';
import { ViewApplicationDetailsComponent } from './components/admin/view-application-details/view-application-details.component';
import { DocumentsComponentComponent } from './components/extraPages/components/documents-component/documents-component.component';
import { MyApplicationsComponent } from './components/extraPages/components/my-applications/my-applications.component';
import { ViewMyApplicationsComponent } from './components/user/view-my-applications/view-my-applications.component';

const routes: Routes = [


  // User Routes  
  {path:'user/dashboard',component:UserDashboardComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'user/checkBalance', component:CheckYourAccountBalanceComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'user/checkApplicationStatus', component:TrackYourApplicationStatusComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'user/view-your-application-details/:id',component:ViewYourApplicationComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'user/MyApplications',component:ViewMyApplicationsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'application/personaldetails',component:PostPersonalDetailsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'application/loandetails', component:PostLoanDetailsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] } },
  {path:'application/upload',component:UploadDocumentsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'User' ] }},


  // Admin Routes
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'Admin' ] } },
  {path:'admin/getAllApplications', component:ViewAllApplicationsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'Admin' ] } },
  {path:'admin/updateStatus/:id',component:UpdateApplicationStatusComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'Admin' ] } },
  {path:'admin/view-application-details/:id',component: ViewApplicationDetailsComponent,canActivate : [ authGuard ], data : { allowedRoles : [ 'Admin' ] } },

  // Common Routes
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},  
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'eligibility-calculator',component:EligibilityCalculatorComponent},
  {path:'emi-calculator',component:EmiCalculatorComponent},


  // Default Route
  {path:'',redirectTo:'login',pathMatch:'full'},


  // Extra Pages
  {path:'unauthorized',component:UnauthorizedComponent},
  {path:'demo/fileUploadroute', component:ImageSelectorComponent},
  {path:'extras/docList/:id',component:DocumentsListComponent},
  {path:'extras/infoCard',component:DocumentsComponentComponent},
  {path:'extras/myApplications',component:MyApplicationsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
