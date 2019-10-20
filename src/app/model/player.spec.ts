import { Player } from './player';
import { Score } from '../model/score.enum';

describe('Player', () => {
  let player: Player;
  beforeEach(() => {
    player = new Player(1, 'Player 1');
  });

  it('should create an instance', () => {
    expect(player).toBeTruthy();
    expect(player.name).toEqual('Player 1');
    expect(player.playerId).toEqual(1);
    expect(player.setScore).toEqual(Score.LOVE);
    expect(player.setsWon).toEqual(0);
    expect(player.verboseScore).toEqual('Love');
  });

  it('should increment a players score', () => {
    expect(player.setScore).toEqual(Score.LOVE);
    player.incrementCurrentScore();
    expect(player.setScore).toEqual(Score.FIFTEEN);
    expect(player.verboseScore).toEqual('15');
    player.incrementCurrentScore();
    expect(player.setScore).toEqual(Score.THIRTY);
    expect(player.verboseScore).toEqual('30');
    player.incrementCurrentScore();
    expect(player.setScore).toEqual(Score.FOURTY);
    expect(player.verboseScore).toEqual('40');
    player.incrementCurrentScore();
    expect(player.setScore).toEqual(Score.WIN);
    expect(player.verboseScore).toEqual('Win');
    player.decrementCurrentScore();
    expect(player.setScore).toEqual(Score.FOURTY);
    expect(player.verboseScore).toEqual('40');
    player.setCurrentScore(Score.DEUCE); // set score to deuce
    expect(player.setScore).toEqual(Score.DEUCE);
    expect(player.verboseScore).toEqual('Deuce');
    player.incrementCurrentScore();
    expect(player.setScore).toEqual(Score.ADVANTAGE);
    expect(player.verboseScore).toEqual('Advantage');
    player.decrementCurrentScore();
    expect(player.setScore).toEqual(Score.DEUCE);
    expect(player.verboseScore).toEqual('Deuce');
    player.setCurrentScore(Score.ADVANTAGE_WIN);
    expect(player.setScore).toEqual(Score.ADVANTAGE_WIN);
    expect(player.verboseScore).toEqual('Win');
  });

  it('should update sets won', () => {
    expect(player.setsWon).toEqual(0);
    player.setsWon++;
    expect(player.setsWon).toEqual(1);
    player.setsWon++;
    expect(player.setsWon).toEqual(2);
    player.setsWon++;
    expect(player.setsWon).toEqual(3);
  });
});
