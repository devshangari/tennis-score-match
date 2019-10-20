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

  public decrementCurrentScore() {
    this.setScore--;
  }

  public setCurrentScore(toScore?: Score) {
    this.setScore = toScore;
  }

  public get verboseScore(): string {
    switch (this.setScore) {
      case Score.LOVE:
        return 'Love';
      case Score.FIFTEEN:
        return '15';
      case Score.THIRTY:
        return '30';
      case Score.FOURTY:
        return '40';
      case Score.DEUCE:
        return 'Deuce';
      case Score.ADVANTAGE:
        return 'Advantage';
      case Score.WIN:
      case Score.ADVANTAGE_WIN:
        return 'Win';
    }
  }
}
