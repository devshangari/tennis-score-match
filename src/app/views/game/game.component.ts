import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchService } from '../../shared/match.service';
import { Player } from '../../model/player';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.styl']
})
export class GameComponent implements OnInit, OnDestroy {
  public currentStep = 1;
  public players: Player[];
  public addPoint$ = new Subject<number>();
  public playersInfo = this.formBuilder.group({
    player1: ['', Validators.required],
    player2: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private matchService: MatchService) { }

  ngOnInit() {
    this.addPoint$.subscribe((playerIndex: number) => {
      const player = this.players[playerIndex];
      this.matchService.addPointForPlayer(player);
    });
  }

  ngOnDestroy() {
    this.addPoint$.unsubscribe();
  }

  startGame() {
    this.players = this.matchService.initGame(this.playersInfo.value.player1, this.playersInfo.value.player2);
    this.currentStep = 2; // show the match and begin scoring
  }

  startNewGame() {
    this.matchService.resetGame();
    this.playersInfo.reset();
    this.currentStep = 1;
  }

}
