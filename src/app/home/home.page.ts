import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ocultar = '';
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    effect: 'coverflow',
    loop: true
  };
  constructor(private navCtrl: NavController) {}
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/photos.svg',
      titulo: 'MetLogic',
      desc: 'En el transcurso de la aplicación podras encontrar informacion, sobre predicciones meteorologicas dentro de tu hogar'
    },
    {
      img: '/assets/temp.png',
      titulo: 'Temperatura',
      desc: 'Tendras acceso a una pestaña donde podras ver la temperatura en tiempo real de tu hogar en C°- F° con el fin de tener un control adecuado'
    },
    {
      img: '/assets/slides/calendar.svg',
      titulo: 'Registro',
      desc: 'Tendras un registro con fecha y hora exacta de tu hogar'
    },
    {
      img: '/assets/hume.png',
      titulo: 'Humedad',
      desc: 'Tendras acceso a una pestaña donde podras ver la humedad en tiempo real de tu hogar en  %  con el fin de que sepas en que estado se encuentra'
    }
  ];
  onClick() {

    this.ocultar = 'animated fadeOut fast';
    this.navCtrl.navigateBack('/temperatura');

  }
}
