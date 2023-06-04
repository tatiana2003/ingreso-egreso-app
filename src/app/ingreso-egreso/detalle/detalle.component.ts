import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  itemsIngresoEgreso!: any[];
  ingresosEgresosSubs!: Subscription;
  cargando: boolean = false;
  uiSubscription!: Subscription;
  /**
   *
   */
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}
  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.itemsIngresoEgreso = items;
        console.log(items);
      });
      this.uiSubscription = this.store.select('ui').subscribe((ui) => (this.cargando = ui.isLoading))
  }
  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
    this.uiSubscription.unsubscribe();
  }
  borrar(id: any) {
    this.store.dispatch(isLoading());
    this.ingresoEgresoService
      .borrarIngresoEgresoItem(id)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado', 'success')
        this.store.dispatch(stopLoading());
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
        this.store.dispatch(stopLoading());
      });
    console.log('uid delte', id);
  }
}
