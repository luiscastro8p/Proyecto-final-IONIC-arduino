import { ActualModel } from './../shared/models/actual.models';
import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSegment, ActionSheetController } from '@ionic/angular';
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
 
  loading: any;

   data:Observable<any>;
   valorsegmento ='';

active = true;
  tempe:Observable<any[]>;
  publisher = '';
  hoy = new Date;
  temperatura:TempModel[] = [];
  actual:ActualModel[] = [];
  textoBuscar = '';
  //  temperatura:Observable<any[]>;
  constructor(private datos:DataService,private actionSheetCtrl: ActionSheetController) {
  
  }
  

  ngOnInit() {
    this.segment.value = 'Dia';
    this.data = this.datos.getHeroes();

    this.datos.gettemp().subscribe((resp:any) => {
      this.temperatura = resp;
      
    });
    this.datos.getactual().subscribe((resp:any)=>{
      this.actual = resp;
      console.log("tu respuesta es"+resp)
    })
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


 doRefresh( event ) {
  setTimeout(() => {
    event.target.complete();
    this.datos.gettemp().subscribe((resp:any) => {
      this.temperatura = resp;
    });
        this.datos.getactual().subscribe((resp:any)=>{
          this.actual = resp;
          console.log("tu respuesta es"+resp)
        })
  }, 1500 );
}

buscar( event ) {
  // console.log(event);
  this.textoBuscar = event.detail.value;
}

async presentActionSheet(id) {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Opciones',
    backdropDismiss: false,
    buttons: [{
      text: 'Eliminar',
      role: 'destructive',
      icon: 'trash',
      cssClass: 'rojo',
      handler: () => {
      this.datos.borrarDatos(id).subscribe(resp =>{
        this.datos.gettemp().subscribe((resp:any) => {
          this.temperatura = resp;
          
        });
      });
        console.log('Delete clicked');
      }
    },{
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });

  await actionSheet.present();
}

}


