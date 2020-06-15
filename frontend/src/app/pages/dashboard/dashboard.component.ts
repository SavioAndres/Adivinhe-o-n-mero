import { Component, OnInit } from '@angular/core';
import { Play } from 'src/app/models/play';
import { PlayService } from 'src/app/services/play.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  play = {} as Play;
  //playResponse = {} as Play;
  response: string;

  constructor(private playService: PlayService) {
    this.response = 'Tente adivinhar o número que estou pensando, o número fica entre 0 e 1000.';
  }

  ngOnInit(): void {
  }

  player(form: NgForm) {
    this.response = 'Verificando...';
    this.playService.play(this.play).subscribe((res) => {
      this.play = res;
      console.log(res);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.play = {} as Play;
  }

}
