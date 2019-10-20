import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Score } from '../model/score.enum';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private playerOne: Player;
  private playerTwo: Player;
  constructor() { }

  initGame(player1Name: string = 'Roger Federer', player2Name: string = 'Raphael Nadal'): Player[] {
    this.playerOne = new Player(1, player1Name);
    this.playerTwo = new Player(2, player2Name);
    return [this.playerOne, this.playerTwo];
  }

  addPointForPlayer(player: Player) {
    player.incrementCurrentScore();
    this.checkSetStatus(player);
  }

  checkSetStatus(lastScorer: Player) {
    // set score to deuce if both are at Fourty
    if (lastScorer.setScore === Score.ADVANTAGE) {
      // check if we need to move both back to deuce
      const otherPlayer: Player = (lastScorer.playerId === this.playerOne.playerId) ? this.playerTwo : this.playerOne;
        // if both are now at advantage, means we need to move them back to a deuce
      if (otherPlayer.setScore === Score.ADVANTAGE) {
        this.playerTwo.decrementCurrentScore();
        this.playerOne.decrementCurrentScore();
      }
    }
    if (this.playerOne.setScore === Score.FOURTY && this.playerTwo.setScore === Score.FOURTY) {
      this.playerOne.setCurrentScore(Score.DEUCE);
      this.playerTwo.setCurrentScore(Score.DEUCE);
    } else if (this.playerOne.setScore === Score.WIN || this.playerOne.setScore === Score.ADVANTAGE_WIN) {
      this.playerOne.setCurrentScore(Score.LOVE);
      this.playerTwo.setCurrentScore(Score.LOVE);
      this.playerOne.setsWon++;
    } else if (this.playerTwo.setScore === Score.WIN || this.playerTwo.setScore === Score.ADVANTAGE_WIN) {
      this.playerOne.setCurrentScore(Score.LOVE);
      this.playerTwo.setCurrentScore(Score.LOVE);
      this.playerTwo.setsWon++;
    }
  }
}
