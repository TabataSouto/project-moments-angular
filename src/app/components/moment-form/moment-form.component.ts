import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  /* entgrega o dado para o template, sendo esse dado
  informado atravéas de "props" pelo pai. */
  @Input() btnText!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
