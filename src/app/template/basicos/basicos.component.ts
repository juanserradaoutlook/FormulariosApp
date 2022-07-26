import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm

  initForm = {
    campoProducto: '',
    campoPrecio: 0,
    campoExistencias:10
  }
  constructor() { }

  ngOnInit(): void {
  }

  guardar(miFormulario: NgForm){
    console.log(miFormulario);
    console.log(miFormulario.value);
    // Este boton lo puedo probar cuando en el html le cambie el nombre de la funcion en el tag form, algo como guardar(miFormulario)
  }


  guardar2(){
    console.log(this.miFormulario);
    console.log(this.miFormulario.value);
    this.miFormulario.resetForm(
      {
        campoProducto: 'Algo',
        campoPrecio: 0,
        campoExistencias:0
      }
    );
    
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls['campoProducto']?.invalid &&
           this.miFormulario?.controls['campoProducto']?.touched;
  }

  precioValido(): boolean{
    return this.miFormulario?.controls['campoPrecio']?.value < 0 &&
           this.miFormulario?.controls['campoPrecio']?.touched;
  }
}
