import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {}



  register(form: NgForm) {
    let obj:any ={
      name:form.value.nombre,
      email:form.value.email,
      password:form.value.password,
      surname:form.value.apellido
    }
    this.authService.nuevoUsuario(obj)
    .subscribe(resp =>{
      this.router.navigateByUrl('/home');
    });
  }
}
