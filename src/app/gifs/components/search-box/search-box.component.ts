import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Search..."
    #txtTagInput
    (keyup.enter)="searchTag()"
    />
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  //ViewChild('txtTagInput') esto es para obtener una referencia al elemento del DOM
  //DOM: Document Object Model (Modelo de Objetos del Documento) es una interfaz de programación de aplicaciones (API) para documentos HTML y XML. Define la estructura lógica de los documentos y la forma en que se accede y manipula. En el DOM, los documentos se representan en forma de nodos y objetos.
  public tagInput!: ElementRef<HTMLInputElement>;
  //tagInput!: ElementRef<HTMLInputElement>; esto es para indicar que la variable puede ser nula

  //Para inyectar el servicio en el componente se debe hacer en el constructor
  constructor(
    private gifsService: GifsService
  ) { }

  searchTag() {
    const newTagValue = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTagValue);

    this.tagInput.nativeElement.value = ''; //Limpiar el input
  }

}
