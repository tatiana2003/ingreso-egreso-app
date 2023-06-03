import { Injectable } from '@angular/core';
import {AngularFireAuth  } from "@angular/fire/compat/auth";
import {AngularFirestore  } from "@angular/fire/compat/firestore";

import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth, private firestore:AngularFirestore) { }
  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      console.log(fuser)
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
