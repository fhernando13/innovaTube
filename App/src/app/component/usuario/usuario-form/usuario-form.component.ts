import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { Usuarios } from 'src/app/models/usuarios';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  
  private emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  createFormGroup() {
    return new FormGroup({
      Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      ApePaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      Nickname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      Email: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.pattern(this.emailPattern)]),
      Estatus: new FormControl(1),
      RolId: new FormControl(2),         
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      Password2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      
    });
  }

  viewPass = '';
  passWD = 'visibility';
  viewPass2 = '';
  passWD2 = 'visibility';
  button = "registrar";
  title = "registro";
  userForm: FormGroup | any;
  role_user = '';
  roles: any = [];
  option = [
    {value:true, key:'Activo'},
    {value:false, key:'Inactivo'}];

  constructor(private usuarioService: UsuarioService,
              private router: Router)
            {
              this.userForm = this.createFormGroup()
            }


  get Nombre() {
    return this.userForm.get('Nombre');
  }

  get ApePaterno() {
    return this.userForm.get('ApePaterno');
  }

  get Nickname() {
    return this.userForm.get('Nickname');
  }

  get Email() {
    return this.userForm.get('Email');
  }

  get Estatus() {
    return this.userForm.get('Estatus');
  }

  get RolId() {
    return this.userForm.get('RolId');
  }

  get Password() {
    return this.userForm.get('Password');
  }

  get Password2() {
    return this.userForm.get('Password2');
  }

  ngOnInit(){}
  
  userSave(){
    if (this.userForm) {
      if(this.Password.value === this.Password2.value)
      {              
        console.log(this.userForm.value);
        this.usuarioService.saveUser(this.userForm.value).subscribe({
        next: (data) => this.userForm.value = data,
        error: (err) => console.log(err),
        });
        Swal.fire('Buen trabajo!', 'Te has registrado!', 'success');
        const list = this.router.navigate(['/login']);
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas son diferentes!!!',
        })
      }
    } else {
      console.log('error');
    }
    return 'ok';
  }

  changeType(){
    let showPassword :any = document.getElementById('pass1');
    if(showPassword.type == "password")
      {showPassword.type = "text";
      this.passWD = 'visibility_off';
      this.viewPass = 'ocultar la contraseña';
    }            
    else{
      showPassword.type = "password";
      this.passWD = 'visibility';
      this.viewPass = 'mostrar la contraseña';
    }
  }

  changeType2(){
    let showPassword :any = document.getElementById('pass2');
    if(showPassword.type == "password")
      {showPassword.type = "text";
      this.passWD2 = 'visibility_off';
      this.viewPass2 = 'ocultar la contraseña';
    }            
    else{
      showPassword.type = "password";
      this.passWD2 = 'visibility';
      this.viewPass2 = 'mostrar la contraseña';
    }
  }

}
