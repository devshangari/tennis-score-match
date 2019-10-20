import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../model/player';
import { Score } from '../../model/score.enum';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.styl']
})
export class GameScoreComponent implements OnInit {
  @Input() players: Player[];
  public scoreFourty = Score.DEUCE;
  public scoreAdvantage = Score.ADVANTAGE;
  constructor() { }

  ngOnInit() {
  }

}
