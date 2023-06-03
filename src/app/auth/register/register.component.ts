import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm!:FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    
  }
  ngOnInit(): void {
   
    this.registroForm = this.fb.group({
        nombre:['', Validators.required],
        correo:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
    })
  }

  crearUsuario(){
    if(this.registroForm.invalid){return}
    Swal.fire({
      title: 'Cargando..',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    
    const {nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password).then((res:any)=>{
      Swal.close();
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
