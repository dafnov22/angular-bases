import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
//providedIn: 'root' esto es para que el servicio se pueda inyectar en cualquier parte de la aplicación
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '3WIsQOCCQCtMgoCnVzUZ6s8XxS3YjLNM';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory() {
    //get tagsHistory() esto es para que se pueda acceder a la propiedad como si fuera un atributo
    return [...this._tagsHistory];
    //...this._tagsHistory; esto es para romper la referencia y que no se pueda modificar el arreglo original
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((historyTag) => historyTag !== tag);
    }
    //filter((historyTag) => historyTag !== tag); esto es para eliminar el tag que se va a agregar si ya existe en el arreglo de historial
    this._tagsHistory.unshift(tag);
    //unshift(tag); esto es para agregar un elemento al inicio del arreglo y no al final como lo hace push
    this._tagsHistory = this._tagsHistory.splice(0, 9);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    //JSON.stringify(this._tagsHistory); esto es para convertir el arreglo en un string
  }

  //Este método es para cargar el historial de búsqueda de la localStorage
  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if(!history) return;

    this._tagsHistory = JSON.parse(history);
    //JSON.parse(history); esto es para convertir el string en un arreglo de nuevo
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  // async searchTag(tag: string): Promise<void> {
    searchTag(tag: string): void {

    if (!tag.trim()) return;

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    // es lo mismo que lo de arriba pero con async await
    // const resp = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)
    // const { data } = await resp.json();
    // console.log(data);

    //ahora lo quiero hacer como un observable y no como una promesa
    // this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`).subscribe((response: any) => {
    //   console.log(response.data);
    // });
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    //Al poner <SearchResponse> estoy tipando la respuesta que va a recibir, es decir, que va a recibir un objeto de tipo SearchResponse
    //no hace falta ponerlo en la respuesta (response: SearchResponse) porque ya se sabe que es de tipo SearchResponse
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe((response) => {
      this.gifList = response.data;
      // console.log(this.gifList);
    });

  }

}
