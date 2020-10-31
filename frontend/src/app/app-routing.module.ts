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
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { DevNetworkComponent } from './dev-network/dev-network.component';
import { CNetworkComponent } from './c-network/c-network.component';
import { CnotificationPageComponent } from './cnotification-page/cnotification-page.component';
import { JobpageComponent } from './jobpage/jobpage.component';
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { ViewCompComponent } from './view-comp/view-comp.component';
import { ViewCFeedsComponent } from './view-cfeeds/view-cfeeds.component';
import { ClosedjobsCompComponent } from './closedjobs-comp/closedjobs-comp.component';


const routes: Routes = [
  { path: '' , component: HomePageComponent},
  { path: 'auth/company' , component:SignLogCompanyComponent},
  { path: 'auth/developer' , component: SignLogComponent},
  { path: 'feed' , component: FeedComponent,canActivate:[AuthGuard]},
  { path: 'notification' , component: NotificationPageComponent,canActivate:[AuthGuard]},
  { path: 'work-related' , component: JobpageComponent,canActivate:[AuthGuard]},
  { path: 'network' , component: DevNetworkComponent,canActivate:[AuthGuard]},
  { path: 'message', component: MessagingPageComponent,canActivate:[AuthGuard]},
  { path: 'company', component:CompanyPortalComponent,canActivate:[AuthGuard]},
  { path: 'company/feed' , component: FeedCComponent,canActivate:[AuthGuard]},
  { path: 'company/message' , component: MessagingPageComponent,canActivate:[AuthGuard]},
  { path: 'company/network' , component: CNetworkComponent,canActivate:[AuthGuard]},
  { path: 'company/manage', component:CManageComponent,canActivate:[AuthGuard]},
  { path : 'company/manage/closed', component:ClosedjobsCompComponent,canActivate:[AuthGuard]},
  { path: 'company/cnotification' , component: CnotificationPageComponent,canActivate:[AuthGuard]},
  { path: 'profile', component:DevOwnerPageComponent,canActivate:[AuthGuard]},
  { path: 'dev/:id', component:OtherProfileComponent,canActivate:[AuthGuard]},
  { path: 'company/:id', component:ViewCompComponent,canActivate:[AuthGuard]},
  { path: 'company/:id/feed', component:ViewCFeedsComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo:'/', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
