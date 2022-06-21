import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { categoryName } from '../util/enumPipe';


@NgModule({
  declarations: [
    ShoppingListComponent,
    AddItemComponent,    
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],  
  providers: [categoryName]
})
export class ShoppingCartModule { }
