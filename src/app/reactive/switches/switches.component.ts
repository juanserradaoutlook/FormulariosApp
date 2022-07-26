import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required],
    notificaciones: [ false, Validators.required],
    condiciones: [ false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //Esta es una forma larga
    //this.miFormulario.controls['genero'].setValue(this.persona.genero);
    //this.miFormulario.controls['notificaciones'].setValue(this.persona.notificaciones);
    //Esta es una forma que puede salir mal si es que el objeto persona no tiene todos los campos que requiere el fb
    //this.miFormulario.setValue(this.persona);
    //Esta es una forma rapida donde se setea el fb sin importar que el objeto persona tenga todos los parametros
    this.miFormulario.reset({
      ...this.persona, //el operador ... es para estraer todo lo q tiene el objeto
      condiciones: false
    });
    
    this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      console.log(newValue);
    });
    //De esta forma sacamos el campo condiciones y seteamos a persona con lo q recibimos del form
    //Es una forma larga
    // this.miFormulario.valueChanges.subscribe(form => {
    //   console.log(form);
    //   delete form.condiciones;
    //   this.persona = form
    // });
    //Usamos la desestructuracion de argumentos, entonces se extraen las condicinoes y le pasamos el resto de los campos
    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) => {
      console.log(rest);
      this.persona = rest
    });
  }

    guardar(){
      //Usa el operador ... para crear una copia del formulario
      const formValue = {...this.miFormulario.value};
      console.log(formValue);
      delete formValue.condiciones; // delete borra la propiedad del objeto
      console.log(formValue);
      this.persona = formValue;
  }


}
