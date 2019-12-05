import { UsuarioModel } from "./../models/UsuarioModel";
import { delay, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from "@angular/common/http";
import { TempModel } from "../shared/models/tempModel";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyAS195NxI6fi6GWqLR2OfZeR0rQ2jcE-So";

  constructor(private http: HttpClient) {}

  nuevoUsuario(usuario: UsuarioModel) {
    const autData = {
      email: usuario.email,
      password: usuario.password,
      name: usuario.nombre,
      surname: usuario.Apellido,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apikey} `, autData)
      .pipe(
        map(resp => {
          console.log("entro en el mapa del rxjs");
          return resp;
        })
      );
  }
  login(usuario: UsuarioModel) {
    const autData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http
      .post(`${this.url}/verifyPassword?key=${this.apikey} `, autData)
      .pipe(
        map(resp => {
            console.log(resp)
          return resp;
        })
      );
  }
}
