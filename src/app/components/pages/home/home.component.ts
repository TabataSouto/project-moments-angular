import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/interfaces/IMoment';
import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  baseApiUrl = environment.baseApiUrl;

  // lista para realização do search

  constructor(
    private momentService: MomentService
  ) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;
      /* por padrão, a data vem no formato americado, dessa forma
      é preciso fazer o tratamento para o formato brasileiro antes
      de ser renderizado. */
      data.map((item) => {
        item.created_at = new Date(item.created_at!)
          .toLocaleDateString('pt-br');
      })
      this.allMoments = data;
      this.moments = data;
    })
  }

}
