import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignLogComponent } from './sign-log/sign-log.component';
import { HomePageComponent } from './home-page/home-page.component'; 
import { SignLogCompanyComponent } from './sign-log-company/sign-log-company.component'; 
import { FeedComponent } from './feed/feed.component';
import { MessagingPageComponent } from './messaging-page/messaging-page.component';
import { DevOwnerPageComponent } from './dev-owner-page/dev-owner-page.component';
import { AuthGuard } from './auth.guard';
import { CompanyPortalComponent } from './company-portal/company-portal.component';
import { CManageComponent } from './c-manage/c-manage.component';
import { FeedCComponent } from './feed-c/feed-c.component';
import { MessaginCComponent } from './messagin-c/messagin-c.component';


const routes: Routes = [
  { path: '' , component: HomePageComponent},
  { path: 'auth/company' , component:SignLogCompanyComponent},
  { path: 'auth/developer' , component: SignLogComponent},
  { path: 'dev/feed' , component: FeedComponent,canActivate:[AuthGuard]},
  { path: 'message', component: MessagingPageComponent,canActivate:[AuthGuard]},
  { path: 'company/:id', component:CompanyPortalComponent,canActivate:[AuthGuard]},
  { path: 'company/:id/feed' , component: FeedCComponent,canActivate:[AuthGuard]},
  { path: 'company/:id/message' , component: MessaginCComponent,canActivate:[AuthGuard]},
  { path: 'company/:id/manage', component:CManageComponent,canActivate:[AuthGuard]},
  { path: 'dev/:id', component:DevOwnerPageComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo:'/', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
