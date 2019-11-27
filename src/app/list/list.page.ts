import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../service/data.service';
import { TempModel } from '../shared/models/tempModel';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
}) 
export class ListPage implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
 
  

   data:Observable<any>;
   valorsegmento ='';

active = true;
  tempe:Observable<any[]>;
  publisher = '';
  hoy = new Date;
   temperatura:TempModel[] = [];
  //  temperatura:Observable<any[]>;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private datos:DataService) {
  
  }
  

  ngOnInit() {
    this.segment.value = 'Dia';
    this.data = this.datos.getHeroes();

    this.datos.gettemp().subscribe((resp:any) => {
      this.temperatura = resp;
      console.log("tu respuesta es"+resp)
    });
    //  this.tempe = this.datos.gettemp();
    
   
  }
  segmentChanged( event ) {
  
    this.valorsegmento = event.detail.value;

   if ( this.valorsegmento === 'todos' ) {
     this.publisher = 'todos';
     return;
   }
   // if ( this.valorsegmento === 'Semanal' ) {
   //   this.publisher = '';
   //   return;
   // }
   // if ( this.valorsegmento === 'hora' ) {
   //   this.datos.gettemp().subscribe((resp:any) => {
   //     this.temperatura = resp;
   //     console.log("tu respuesta es"+resp)
   //   });
   //   this.publisher = '';
   //   return;
   // }
 
   this.publisher = this.valorsegmento;
 
   console.log(this.valorsegmento);
 
 }
 reset(){
   this.valorsegmento = '';
 }
 sendfile(){
   console.log("hola")
   let obj ={
     date:"10-15-99",
     name:"Temperatura",
     tempC:"30",
     tempF:"85",
     hum:26
   }
   this.datos.posttemp(obj).subscribe((res: any) => {
     this.temperatura = res;
   });
 }

}


