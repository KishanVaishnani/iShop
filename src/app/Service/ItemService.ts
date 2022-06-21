import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ItemService {
    // apiUrl = environment.apiUrl;
    constructor(private firestore: AngularFirestore,) { }

    createItem(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection("ShoppingCart")
                .add(data)
                .then(res => {
                    resolve(res)
                }, err => reject(err));
        });
    }

    getItem() {
        return this.firestore.collection("ShoppingCart").snapshotChanges();
    }

    updateItem(para) {
        var updateRef = this.firestore.collection("ShoppingCart").doc(para.id);
        return updateRef.update({
            "name": para.name,
            "categoryId": para.categoryId,
            "description": para.description,
        })
            .then(function () {
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    deleteItem(data) {
        return this.firestore
            .collection("ShoppingCart")
            .doc(data.payload.doc.id)
            .delete();
    }
}