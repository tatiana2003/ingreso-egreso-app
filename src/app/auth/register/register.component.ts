import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!:FormGroup;
  cargando:boolean = false;
  uiSubscription!:Subscription;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private store:Store<AppState>) {
    
  }
  ngOnInit(): void {
   
    this.registroForm = this.fb.group({
        nombre:['', Validators.required],
        correo:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui').subscribe((ui)=>this.cargando = ui.isLoading);
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  crearUsuario(){
    if(this.registroForm.invalid){return}
    // Swal.fire({
    //   title: 'Cargando..',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
    this.store.dispatch(isLoading());
    const {nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then((res:any)=>{
      // Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/'])
     
    })
    .catch(err=>  {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      })
    })
    }
}
