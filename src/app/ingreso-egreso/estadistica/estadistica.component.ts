import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AppStateWithIngresos } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ingresoEgresoSubs!: Subscription;
  /**
   *
   */
  constructor(private store: Store<AppStateWithIngresos>) {}
  ngOnInit(): void {
    this.ingresoEgresoSubs= this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }
  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  generarEstadistica(items: any) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    items.forEach((item: any) => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    });
  }
}
