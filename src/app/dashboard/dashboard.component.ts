import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  authSubs!: Subscription;
  ingresosSubs!: Subscription;

  nombreUsuario!:any;
  /**
   *
   */
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}
  ngOnInit(): void {
    this.authSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.nombreUsuario = user?.nombre;
       this.ingresosSubs= this.ingresoEgresoService
          .initIngresosEgresosListener(user?.uid)
          .subscribe((ingresosEgresosFB: any) => {
            this.store.dispatch(setItems({ items: ingresosEgresosFB }));
          });
      });
  }
  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
    this.ingresosSubs.unsubscribe();
  }
}
