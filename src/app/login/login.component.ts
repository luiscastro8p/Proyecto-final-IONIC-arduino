import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  titulo: string;
  constructor(private authService:AuthService,private router:Router,public alertCtrl:AlertController) { }

  ngOnInit() {}


  login(form: NgForm) {
    let obj:any ={
      password:form.value.password,
      email:form.value.email,
    }
    this.authService.login(obj)
    .subscribe(resp =>{
      this.router.navigateByUrl('/home');
    }, err =>{
        this.presentInput(err);    

    });
  }
  async presentInput(datos) {
    const input = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: datos.error.error.message,
      buttons: [
      {
          text: 'OK',
          handler: ( data ) => {
            console.log('Confirm Ok', data);
            this.titulo = data.txtNombre;
          }
        }
      ]
    });

    await input.present();

  }

 
}
