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

  // passos para realização do search
  faSearch = faSearch;
  serachTerm: string = '';

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

  search(e: Event): void {
    /* é preciso fazer a linha 45 para pegar o value, pois
    o TypeScript não deixa pegar o value do targer direto
    do evento. */
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter(
      (moment) => moment.title.toLowerCase().includes(value)
    );
  }

}
