import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService/login.service';
import { UserAppService } from 'src/app/service/user-app-service/user-app.service';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  viewPass = '';

  createFormGroup() {
    return new FormGroup({      
      Email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      Password: new FormControl('', [Validators.maxLength(12), Validators.minLength(6), Validators.required])
    });
  }

  loginForm: FormGroup | any;
  passWD = 'visibility';

  constructor(private loginService: LoginService,
    private userApp: UserAppService,
    private router: Router)
  {
    this.loginForm = this.createFormGroup();
  }

  get Email() {
    return this.loginForm.get('Email');
  }
  get Password() {
    return this.loginForm.get('Password');
  }  

  ngOnInit(){}

  Login(){
    if(this.loginForm.valid)      
    {
      this.loginService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginForm.value = res;          
          this.loginService.storeToken(res.token);
          const tokenPayLoad = this.loginService.decodedToken()
          this.userApp.setNicknameFromApi(tokenPayLoad.unique_name);
          this.userApp.setRoleFromApi(tokenPayLoad.role);
        },
        complete: () => {this.router.navigate(['/listvideos']),
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Welcome",
                          showConfirmButton: false,
                          timer: 1500
                        })}
      })
    }
    return this.router.navigate(['/login']);

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

}
