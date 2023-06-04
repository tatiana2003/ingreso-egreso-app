import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    console.log('ingresoegreso model', ingresoEgreso, uid);
    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso, uid });
  }

  initIngresosEgresosListener(uid: any) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as object),
          }))
        )
      )
  }

  borrarIngresoEgresoItem(uidItem:any){
    const uid= this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
