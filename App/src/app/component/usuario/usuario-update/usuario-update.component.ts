import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuarioService/usuario.service';
import { RolesService } from 'src/app/service/rolService/roles.service';
import { Usuarios } from '../../../models/usuarios';


//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})
export class UsuarioUpdateComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      Idusuario: new FormControl(0),
      Nombre: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      ApePaterno: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      Nickname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      Email: new FormControl('',[Validators.required]),
      Estatus: new FormControl(''),
      Password: new FormControl(this.passuser),
      RolId: new FormControl('',[Validators.required]),
    });
  }

  button = "actualizar";
  title = "actualizar usuario";
  passuser = '';

  userForm: Usuarios | any;
  roles: any = [];
  option = [
    {value:true, key:'Activo'},
    {value:false, key:'Inactivo'}];

    constructor(private usuarioService: UsuarioService,
                private rolesService: RolesService,
                private activedRouted: ActivatedRoute,
                private router: Router)
    {
      this.userForm = this.createFormGroup()
    }

  get Nombre() {
    return this.userForm.get('Nombre');
  }

  get Nickname() {
    return this.userForm.get('Nickname');
  }

  get ApePaterno() {
    return this.userForm.get('ApePaterno');
  }

  get Email() {
    return this.userForm.get('CorreoUsuario');
  }

  get Estatus() {
    return this.userForm.get('Estatus');
  }

  get RolId() {
    return this.userForm.get('RolId');
  }

  ngOnInit(){
    this.listRoles();
    this.getUpdateUser();
  }

  async listRoles(){
    await this.rolesService.getAllRoles().subscribe({
     next: rols =>{ this.roles = rols},
     error: err =>{console.log(err)}}
   );
  }

  getUpdateUser(){
    const iduser = <string>this.activedRouted.snapshot.params["Idusuario"];
    // console.log(iduser)
    if(iduser){
      const res:any = this.usuarioService.getUser(iduser).subscribe(
      {        
        next: data=>(this.userForm.setValue(data[0]),
              ({
                Nombre: res.Nombre,
                ApePaterno: res.ApePaterno,
                Nickname: res.Nickname,
                Email: res.Email,
                Estatus: res.Estatus,
                Password: res.Password,
                RolId: res.rolId,
              }),
               this.passuser = data.Password
            ),
        error: err=>(console.log(err)),
      })
    }
  }

  userSave(){
    const iduser = this.activedRouted.snapshot.params['Idusuario'];
    if (this.userForm) {
      this.usuarioService.updateUser(iduser, this.userForm.value).subscribe({
        next: (data) => this.userForm = data,
        error: (err) => console.log(err),
      });
      Swal.fire('Buen trabajo!', 'Usuario actualizado!', 'success');
    } else {
      console.log('error');
    }
    return this.router.navigate(['/listaUsuario']);
  }

}
