import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  /* entgrega o dado para o template, sendo esse dado
  informado atravéas de "props" pelo pai. */
  @Input() btnText!: string;

  momentForm!: FormGroup;

  constructor() { }

  /* Utilizado para inicializar coisas do Angular, nesse caso,
  precisamos inicializar o formulário */
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      // FormControl -> controla o input, no caso, o valor inputado.
      id: new FormControl(''),
      // [Validators.required] -> disparo de validação
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    /* a exclamação no final informa que no fim, os valores vão
    existir, e o erro em ".invalid" sobre o valor poder ser null
    não irá mais aparecer. */
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  /* Mesmo com validação, se não colocarmos uma trava de formulário
  inválido, será feito o envio do form da mesma forma. Para isso,
  é feita a condicional com return para que não seja finalizada
  a submissão do formulário. */
  submit() {
    if (this.momentForm.invalid) return;
  }

}
