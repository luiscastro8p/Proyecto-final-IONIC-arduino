import { delay, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from "@angular/common/http";
import { TempModel } from '../shared/models/tempModel';

@Injectable({
  providedIn: "root"
})
export class DataService {
  private url = "https://arduino-b1d9d.firebaseio.com";
  public var:any;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

  getAlbumes() {
    return this.http.get<any[]>("https://jsonplaceholder.typicode.com/albums");
  }

  getHeroes() {
    return this.http.get("/assets/data/superheroes.json").pipe(delay(200));
  }

  posttemp(data) {
    return this.http.post(`${this.url}/usuarios.json`, data).pipe(
      map((resp: any) => {
        // data.id = resp.name;
        return data.json;
      })
    );
  }
  gettemp() {
    return this.http.get(`${this.url}/datatemp.json`)
    .pipe(
      map(resp => this.creararreglo(resp)),
      delay(500)
    );
  }
  getactual() {
    return this.http.get(`${this.url}/dataactual.json`)
    .pipe(
      map(resp => this.creararreglo(resp)),
      delay(500)
    );
  }
  private creararreglo(temp:object){
    const temperatura:TempModel[] =[];
    if (temp == null) {
      return [];
    } else {
      Object.keys(temp).forEach(key => {
        const esti: TempModel = temp[key];
        esti.id = key;
        temperatura.push(esti);
      });
    }
    return temperatura;
  }
  borrarDatos(id: string) {
    return this.http.delete(`${this.url}/datatemp/${id}.json`);
  }
}
