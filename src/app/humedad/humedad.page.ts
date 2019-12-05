import { ActualModel } from './../shared/models/actual.models';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { IonSegment } from '@ionic/angular';
import { TempModel } from '../shared/models/tempModel';
@Component({
  selector: 'app-humedad',
  templateUrl: 'humedad.page.html',
  styleUrls: ['humedad.page.scss']
})
export class HumedadPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  data:Observable<any>;
  tempe:Observable<any[]>;
  publisher = '';
  temperatura:TempModel[] = [];
  actual:ActualModel[] = [];
  hoy = new Date();
  superHeroes: Observable<any>;
  valorsegmento ='';

  constructor(private datos: DataService) {
   
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
  }
  segmentChanged( event ) {
    this.valorsegmento = event.detail.value;

    if ( this.valorsegmento === 'todos' ) {
      this.publisher = 'todos';
      return;
    }
    
    this.publisher = this.valorsegmento;

    console.log(this.valorsegmento);

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
         this.datos.gettemp().subscribe((resp:any)=>{
          this.temperatura = resp;
          console.log("tu respuesta es"+resp)
        })
   }, 1500 );
 

}
  }
