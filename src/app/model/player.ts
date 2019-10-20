import { Score } from '../model/score.enum';

export class Player {
  private playerName: string;
  private currentSetsWon: number;
  private currentSetScore: Score;
  private gameScore: number;
  private id: number;

  constructor(playerId: number, playerName?: string) {
    this.createPlayer(playerName, playerId);
  }

  createPlayer(playerName: string, playerId: number) {
    this.name = playerName;
    this.gameScore = 0;
    this.setsWon = 0;
    this.setScore = Score.LOVE;
    this.id = playerId;
  }

  public get playerId(): number {
    return this.id;
  }

  public get name(): string {
    return this.playerName;
  }

  public set name(playerName: string) {
    this.playerName = playerName;
  }

  public set setScore(score: Score) {
    this.currentSetScore = score;
  }

  public get setScore(): Score {
    return this.currentSetScore;
  }

  public set setsWon(setsWon: number) {
    this.currentSetsWon = setsWon;
  }

  public get setsWon(): number {
    return this.currentSetsWon;
  }

  public incrementCurrentScore() {
    this.setScore++;
  }

  public setCurrentScore(toScore?: Score) {
    if (toScore !== void 0) {
      this.setScore = toScore;
    }
  }

  public decrementCurrentScore() {
    this.setScore--;
  }


  public get verboseScore(): string {
    let score: string;
    switch (this.setScore) {
      case Score.LOVE:
        score = 'Love';
        break;
      case Score.FIFTEEN:
        score = '15';
        break;
      case Score.THIRTY:
        score = '30';
        break;
      case Score.FOURTY:
        score = '40';
        break;
      case Score.DEUCE:
        score = 'Deuce';
        break;
      case Score.ADVANTAGE:
        score = 'Advantage';
        break;
      case Score.WIN:
      case Score.ADVANTAGE_WIN:
        score = 'Win';
        break;
    }
    return score;
  }
}
