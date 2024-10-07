import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './atoms/button.component';
import { ProductCardComponent } from './molecules/product-card.component';
import { ProductListComponent } from './organisms/product-list.component';
import { MainLayoutComponent } from './templates/main-layout.component';
import { HomePageComponent } from './pages/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    ProductCardComponent,
    ProductListComponent,
    MainLayoutComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
