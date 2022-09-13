import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

import { IMoment } from 'src/app/interfaces/IMoment';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})

export class EditMomentComponent implements OnInit {
  moment!: IMoment;
  btnText: string = 'Editar';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(
      (item) => this.moment = item.data
    )
  }

  async editHandler(momentData: IMoment) {
    const id = this.moment.id;
    const formData = new FormData()
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    if (momentData.image) {
      formData.append('image', momentData.image);
    }
    await this.momentService.updateMoment(id!, formData).subscribe();
    this.messagesService.add(`Momento ${id} foi atualizado com sucesso!`);
    this.router.navigate(['/']);
  }

}
