import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro"
})
export class FiltroPipe implements PipeTransform {
  // transform(arreglo: any[], texto: string, columna: string,): any[] {
  //   if (texto === "") {
  //     return arreglo;
  //   }

  //   texto = texto.toLowerCase();

  //   return arreglo.filter(item => {
  //     return item[columna].toLowerCase().includes(texto);
     
  //   });
  // }
  transform(value: any, arg: any): any {
    const resultPosts = [];
    // for (const post of value) {
    //   if (post.tempC.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.tempF.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //     resultPosts.push(post);
    //   };
    // };
    return resultPosts;
  }
}
