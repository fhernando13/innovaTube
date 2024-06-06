import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuarios } from 'src/app/models/usuarios';
import { Observable } from 'rxjs';
import { environment } from 'src/environonments/environment.prod';

//Sweetalert
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URI = environment.localHost;

  constructor(private http: HttpClient) 
  {

  } 

  saveUser(user: Usuarios){
    return this.http.post(this.API_URI+"/usuarios/registrar",user);
  }  

  getAllUsers(){
    return this.http.get<Usuarios[]>(this.API_URI+"/usuarios/listausuarios");    
  }

  getAllUsersByRole(){
    return this.http.get<Usuarios[]>(this.API_URI+"/usuarios/usuariosbyrol");    
  }

  getUser(id: string): Observable<any>{
    return this.http.get(this.API_URI+"/usuarios/usuario/"+id);
  }

  getUsersByRol(id: string): Observable<any>{
    return this.http.get(this.API_URI+"/usuarios/usuariorol/"+id);
  }

  updateUser(id: string, updateUser: Usuarios): Observable<any>{
    return this.http.put(this.API_URI+"/usuarios/actualizar/"+id, updateUser)
  }

  deleteUser(id:string): Observable<any>{
    return this.http.delete(this.API_URI+"/usuarios/eliminar/"+id)    
  }
  
}
