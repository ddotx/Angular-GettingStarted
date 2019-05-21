import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

/* Feature Modules*/
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';



@NgModule({
  declarations: [ //array
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule, //==> Use Lazy Loading
    UserModule,
    AppRoutingModule,
    MessageModule //! Order of Routing is important in term of path! ==> set wildcard route to the last
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
