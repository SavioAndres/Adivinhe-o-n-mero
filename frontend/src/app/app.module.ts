import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigComponent } from './pages/config/config.component';
import { CreateaccountComponent } from './pages/createaccount/createaccount.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RedirectrofileComponent } from './components/redirectrofile/redirectrofile.component';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConfigComponent,
    CreateaccountComponent,
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    RankingComponent,
    RedirectrofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [AuthService, AuthGuard, CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
