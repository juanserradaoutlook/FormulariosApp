import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})


export class DinamicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm

  nuevoJuego: string = '';
  persona: Persona = {
    nombre: 'Juan',
    favoritos: [
      { id: 1, nombre: 'Mario Bros'},
      { id: 1, nombre: 'Pacman'},
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    console.log('Formulario Posteado');
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls['campoNombre']?.invalid &&
           this.miFormulario?.controls['campoNombre']?.touched;
  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    };
    this.persona.favoritos.push(nuevoFavorito);
    this.nuevoJuego = '';

  }
  eliminar(index: number){
    this.persona.favoritos.splice(index, 1);

  }
}
