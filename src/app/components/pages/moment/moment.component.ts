import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

import { IMoment } from 'src/app/interfaces/IMoment';

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

  constructor(
    private momentService: MomentService,
    // usaremos para pegar o id que está na url
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // id que está na URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(
      (item) => this.moment = item.data
    )
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add("Momento excluído com sucesso!!")
    this.router.navigate(['/']);
  }

}
