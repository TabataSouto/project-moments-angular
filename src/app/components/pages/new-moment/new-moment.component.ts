import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IMoment } from 'src/app/interfaces/IMoment';

import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = "Compartilhar!"

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // método com operações assíncronas, ou seja, que vem do banco.
  async createHandler(moment: IMoment) {
    /* será feito o tratamento dos dados que chega através da emissão
    do evento, enviada pelo componente filho, para cadastro no
    banco de dados. */
    /* também precisamos transformar o formulário do Angular em um
    formData, que é uma estrutura de formulário padrão de envio
    quando trabalhamos com arquivos. É um método próprio do
    javascript. */
    const formData = new FormData();
    formData.append('title', moment.title)
    formData.append('description', moment.description)
    // formData.append(moment.image && 'image', moment.image)
    if (moment.image) formData.append('image', moment.image)

    // depois de feito o cadastro iremos:
    // enviar para o service, criando e adicionando no DB.
    await this.momentService.createMoment(formData).subscribe();

    // exibir mensagem de que o momento foi cadastrado com sucesso.
    this.messagesService.add('Momento adicionado com sucesso!')

    // redirecionar para home depois de adicionar um novo momento.
    this.router.navigate(['/'])
  }

}
