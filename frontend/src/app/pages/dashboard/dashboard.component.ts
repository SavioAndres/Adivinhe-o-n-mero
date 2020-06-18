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
  form = {} as NgForm;
  response: string;
  attempt: string;
  startPlay: boolean;
  gif: string;

  constructor(private playService: PlayService) {
    this.startPlay = this.getStartPlay();
    this.response = 'Tente adivinhar o número que estou pensando, o número fica entre 0 e 1000.';
  }

  ngOnInit(): void {
  }

  player(form: NgForm) {
    this.response = 'Verificando...';
    this.form = form;
    this.playService.play(this.play).subscribe((res) => {
      this.result(res);
    });
  }

  start() {
    this.playService.play(this.play).subscribe((res) => {
    });
    this.startPlay = true;
    this.setStartPlay(true);
  }

  private restart() {
    this.startPlay = false;
    this.setStartPlay(false);
  }

  private result(play: Play) {
    this.gif = play.gif;
    if (!play.hit) {
      if (play.suggestion === 1) {
        this.response = 'O número que estou pensando é maior que ' + this.play.value;
      } else if (play.suggestion === -1) {
        this.response = 'O número que estou pensando é menor que '  + this.play.value;
      } else {
        this.startPlay = true;
      }
    } else {
      this.response = 'Parabéns, você acertou!';
      this.restart();
    }
    this.attempt = play.moves + 'ª tentativa';
    this.cleanForm(this.form);
  }

  private setStartPlay(start: boolean) {
    localStorage.setItem('start', start + '');
  }

  private getStartPlay(): boolean {
    let start: boolean = false;
    if (localStorage.getItem('start') === 'true') {
      start = true;
    }
    return start;
  }

  private cleanForm(form: NgForm) {
    form.resetForm();
    this.play = {} as Play;
  }

}
