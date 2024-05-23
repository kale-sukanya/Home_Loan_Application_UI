import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UpdateApplicationStatusComponent } from './components/admin/update-application-status/update-application-status.component';
import { ViewAllApplicationsComponent } from './components/admin/view-all-applications/view-all-applications.component';
import { PostPersonalDetailsComponent } from './components/application/post-personal-details/post-personal-details.component';
import { PostLoanDetailsComponent } from './components/application/post-loan-details/post-loan-details.component';
import { CheckYourAccountBalanceComponent } from './components/user/check-your-account-balance/check-your-account-balance.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { RegisterComponent } from './components/user/register/register.component';
import { TrackYourApplicationStatusComponent } from './components/user/track-your-application-status/track-your-application-status.component';
import { ViewYourApplicationComponent } from './components/user/view-your-application/view-your-application.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/extraPages/unauthorized/unauthorized.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EligibilityCalculatorComponent } from './components/eligibility-calculator/eligibility-calculator.component';
import { EmiCalculatorComponent } from './components/emi-calculator/emi-calculator.component';
import { ImageSelectorComponent } from './components/extraPages/components/image-selector/image-selector.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadDocumentsComponent } from './components/application/upload-documents/upload-documents.component';
import { DocumentsComponentComponent } from './components/extraPages/components/documents-component/documents-component.component';
import { DocumentsListComponent } from './components/extraPages/components/documents-list/documents-list.component';
import { ViewApplicationDetailsComponent } from './components/admin/view-application-details/view-application-details.component';
import { MyApplicationsComponent } from './components/extraPages/components/my-applications/my-applications.component';
import { ViewMyApplicationsComponent } from './components/user/view-my-applications/view-my-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    PostLoanDetailsComponent,
    PostPersonalDetailsComponent,
    UpdateApplicationStatusComponent,
    ViewAllApplicationsComponent,
    TrackYourApplicationStatusComponent,
    CheckYourAccountBalanceComponent,
    ViewYourApplicationComponent,
    AdminDashboardComponent,
    UnauthorizedComponent,
    ForgotPasswordComponent,
    EligibilityCalculatorComponent,
    EmiCalculatorComponent,
    ImageSelectorComponent,
    NavbarComponent,
    
    UploadDocumentsComponent,
    DocumentsComponentComponent,
    DocumentsListComponent,
    ViewApplicationDetailsComponent,
    MyApplicationsComponent,
    ViewMyApplicationsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    //ToastrModule.forRoot(),
    //BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
