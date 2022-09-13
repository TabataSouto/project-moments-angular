import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';

import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { CommentService } from 'src/app/services/comment/comment.service';

import { IMoment } from 'src/app/interfaces/IMoment';
import { IComment } from 'src/app/interfaces/IComment';

import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent implements OnInit {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  // adição de um comentário;
  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    // usaremos para pegar o id que está na url
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    // id que está na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(
      (item) => this.moment = item.data
    )

    // comentário de um momento;
    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add("Momento excluído com sucesso!!")
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) return;
    const data: IComment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe(
        (comment) => this.moment!.comments!.push(comment.data)
      );
    this.messageService.add("Comentário adicionado!")
    // reseta os campos do form;
    this.commentForm.reset();
    formDirective.resetForm();
  }

}
