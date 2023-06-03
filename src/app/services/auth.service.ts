import { Injectable } from '@angular/core';
import {AngularFireAuth  } from "@angular/fire/compat/auth";
import {AngularFirestore  } from "@angular/fire/compat/firestore";

import { Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs!: Subscription;
  constructor(public auth:AngularFireAuth, private firestore:AngularFirestore, private store:Store) { }
  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      if(fuser){
        this.userSubs= this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser:any)=>{
          const user= Usuario.fromFirebase(firestoreUser)
          this.store.dispatch(setUser({user}))
        })
      }else{
        this.userSubs.unsubscribe();
        this.store.dispatch(unSetUser())
        
      }
    })
  }
  crearUsuario(nombre:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password).then((res:any)=>{
      const user = res.user._delegate;
      const newUser= new Usuario(user.uid, nombre, user.email);
     return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
  });
  }
  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout(){
   return this.auth.signOut();
  }
  isAuth(){
    return this.auth.authState.pipe(
      map(fuser=>fuser!=null)
    )
  }
}
