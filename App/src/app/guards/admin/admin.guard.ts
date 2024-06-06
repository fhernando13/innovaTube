import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { LoginService } from 'src/app/service/loginService/login.service';
import { UserAppService } from 'src/app/service/user-app-service/user-app.service';

//Sweetalert
import Swal from 'sweetalert2'

export const adminGuard: CanActivateFn = () => {
  
  const tokenService = inject(LoginService);
  const routerService = inject(Router);
  // const role = inject(UserAppService);

  // const token = tokenService.isLoggedIn();
  const roles =  tokenService.getRoleFromToken();
  
  if(roles != 1 || roles != '1'){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos para estar aqui!!!'
    });
    routerService.navigate(['/listvideos']);
    return false
  }
  return true;

};
