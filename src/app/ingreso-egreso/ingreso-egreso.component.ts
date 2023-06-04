import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscription!: Subscription;
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    const { descripcion, monto } = this.ingresoForm.value;
    console.log(descripcion, monto, this.tipo);
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error')
      
      });
  }
}
