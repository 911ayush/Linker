import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { AuthGuard } from './auth.guard';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SignLogComponent } from './sign-log/sign-log.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignLogCompanyComponent } from './sign-log-company/sign-log-company.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { PostTempletComponent } from './post-templet/post-templet.component';
import { NotifyMeComponent } from './notify-me/notify-me.component';
import { MessagingPageComponent } from './messaging-page/messaging-page.component';
import { DevOwnerPageComponent } from './dev-owner-page/dev-owner-page.component';
import { CompanyPortalComponent } from './company-portal/company-portal.component'; 
import { ConnectionServiceService } from './connection-service.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { HeaderCComponent } from './header-c/header-c.component';
import { CManageComponent } from './c-manage/c-manage.component';
import { FeedCComponent } from './feed-c/feed-c.component';
import { MessaginCComponent } from './messagin-c/messagin-c.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';



@NgModule({
  declarations: [
    AppComponent,
    SignLogComponent,
    HomePageComponent,
    SignLogCompanyComponent,
    FeedComponent,
    HeaderComponent,
    PostTempletComponent,
    NotifyMeComponent,
    MessagingPageComponent,
    DevOwnerPageComponent,
    CompanyPortalComponent,
    HeaderCComponent,
    CManageComponent,
    FeedCComponent,
    MessaginCComponent,
    NotificationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatChipsModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule,
    SocialLoginModule
    
  ],
  providers: [
    ConnectionServiceService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
