import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validationService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validationService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validationService.validacionExterna]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    Validators: [ this.validationService.camposIguales('password', 'password2')]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']){
      return 'El email es obligatorio';
    } else if (errors?.['pattern']){
      return 'El valor no tiene formato de correo';
    } else if (errors?.['emailTomado']){
      return 'El correo ya esta tomado';
    }
    return '';
  }

  constructor( private fb: FormBuilder, 
               private validationService: ValidatorService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'juancserrada',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string){
    return (this.miFormulario.get(campo)?.invalid 
           && this.miFormulario.get(campo)?.touched);
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    
  }

}
