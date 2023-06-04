import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
