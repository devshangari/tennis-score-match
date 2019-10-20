import { TestBed } from '@angular/core/testing';
import { Player } from '../model/player';
import { Score } from '../model/score.enum';
import { MatchService } from './match.service';

describe('MatchService', () => {
  let service: MatchService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(MatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize game with correct player information', () => {
    let players: Player[] = service.initGame();
    let p1 = players[0];
    let p2 = players[1];
    expect(p1.name).toEqual('Roger Federer');
    expect(p2.name).toEqual('Raphael Nadal');

    service.resetGame(); // clear player information
    players = service.initGame('Andre Agassi', 'Nick Kyrgios');
    p1 = players[0];
    p2 = players[1];
    expect(p1.name).toEqual('Andre Agassi');
    expect(p2.name).toEqual('Nick Kyrgios');
    expect(p2.playerId).not.toEqual(p1.playerId);
  });

  it('should update points for corect player, and update status', () => {
    const players: Player[] = service.initGame('Andre Agassi', 'Nick Kyrgios');
    const p1 = players[0];
    const p2 = players[1];
    service.addPointForPlayer(p1);
    expect(p1.setScore).toEqual(Score.FIFTEEN);
    service.addPointForPlayer(p2);
    service.addPointForPlayer(p2);
    expect(p2.setScore).toEqual(Score.THIRTY);
    service.addPointForPlayer(p2);
    expect(p2.setScore).toEqual(Score.FOURTY);
    service.addPointForPlayer(p1);
    service.addPointForPlayer(p1);
    expect(p1.setScore).toEqual(Score.DEUCE);
    expect(p2.setScore).toEqual(Score.DEUCE);
    service.addPointForPlayer(p1);
    expect(p1.setScore).toEqual(Score.ADVANTAGE);
    const p1DecrementSpy = spyOn(p1, 'decrementCurrentScore').and.callThrough();
    service.addPointForPlayer(p2);
    expect(p1.setScore).toEqual(Score.DEUCE);
    expect(p2.setScore).toEqual(Score.DEUCE);
    expect(p1DecrementSpy).toHaveBeenCalled();
    expect(p1DecrementSpy).toHaveBeenCalledTimes(1);
    service.addPointForPlayer(p2);
    expect(p2.setScore).toEqual(Score.ADVANTAGE);
    service.addPointForPlayer(p2);
    const incrementCurrentScoreFn = p2.incrementCurrentScore;
    p2.incrementCurrentScore = () => {
      p2.setScore++;
      expect(p2.setScore).toEqual(Score.ADVANTAGE_WIN);
    };
    p2.incrementCurrentScore = incrementCurrentScoreFn;
    expect(p2.setScore).toEqual(Score.LOVE);
    expect(p1.setScore).toEqual(Score.LOVE);
    expect(p2.setsWon).toEqual(1);
    expect(p1.setsWon).toEqual(0);
    p2.setsWon = 5;
    p1.setsWon = 4;
    service.addPointForPlayer(p2); // 0-15
    service.addPointForPlayer(p2); // 0-30
    service.addPointForPlayer(p2); // 0-40
    service.addPointForPlayer(p2); // 0-Win
    expect(p2.setsWon).toEqual(6);
    expect(p1.setsWon).toEqual(4);
    expect(p2.setScore).toEqual(Score.LOVE);
    expect(p1.setScore).toEqual(Score.LOVE);
    p1.setsWon = 5;
    p2.setsWon = 4;
    service.addPointForPlayer(p1); // 15-0
    service.addPointForPlayer(p1); // 30-0
    service.addPointForPlayer(p1); // 40-30
    service.addPointForPlayer(p1); // win-0
    expect(p1.setsWon).toEqual(6);
    expect(p2.setsWon).toEqual(4);
    expect(p1.setScore).toEqual(Score.LOVE);
    expect(p2.setScore).toEqual(Score.LOVE);
  });
});
