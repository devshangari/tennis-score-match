import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchService } from '../../shared/match.service';
import { Player } from '../../model/player';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.styl']
})
export class GameComponent implements OnInit {
  public currentStep = 1;
  public players: Player[];
  public addPoint$ = new Subject<number>();
  constructor(private formBuilder: FormBuilder, private matchService: MatchService) { }

  playersInfo = this.formBuilder.group({
    player1: ['Dev', Validators.required],
    player2: ['Devil', Validators.required]
  });

  ngOnInit() {
    this.addPoint$.subscribe((playerIndex: number) => {
      // console.log(ev);
      const player = this.players[playerIndex];
      this.matchService.addPointForPlayer(player);
    });
  }

  startGame() {
    this.players = this.matchService.initGame(this.playersInfo.value.player1, this.playersInfo.value.player2);
    this.currentStep = 2; // show the match and begin scoring
  }

  startNewGame() {
    this.matchService.resetGame();
    this.currentStep = 1;
  }

}
