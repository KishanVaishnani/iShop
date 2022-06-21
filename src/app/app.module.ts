import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './authentiction/login/login.component';
import { ProfileComponent } from './authentiction/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { ToastrModule } from 'ngx-toastr';
import { categoryName } from './util/enumPipe';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    HeaderComponent  ,  
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingCartModule,
    AngularFireAuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      preventDuplicates: true,
    }), 
    // AngularFirestoreModule,
   // AngularFireModule.initializeApp(environment.firebaseConfig),    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [categoryName],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
