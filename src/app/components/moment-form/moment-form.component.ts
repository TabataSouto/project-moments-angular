import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/interfaces/IMoment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>()
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

  onFileSelected(event: any) {
    // para pegar o arquivo enviado no input, no caso, a imagem.
    const file: File = event.target.files[0];
    /* patchValue -> método para inserir algo do formulário que
    não seja por meio do ngOnInit, pois no caso da imagem, precisa
    ser por meio desse método. */
    this.momentForm.patchValue({ image: file })
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
    /* é feito o envio, por meio do onSubmit, dos dados do formulário
    para o componente pai que irá fazer a inserção no banco. */
    this.onSubmit.emit(this.momentForm.value);
  }

}
