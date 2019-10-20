import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { GameScoreComponent } from '../game-score/game-score.component';
import { GameComponent } from './game.component';
import { MatchService } from '../../shared/match.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let matchService: MatchService;
  let formBuilder = FormBuilder;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, GameScoreComponent ],
      imports: [ReactiveFormsModule, NoopAnimationsModule, SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    matchService = TestBed.get(MatchService);
    // formBuilder = TestBed.get(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add point for player on button click', async () => {
    const addPointForPlayerSpy = spyOn(matchService, 'addPointForPlayer').and.callThrough();
    component.startGame();
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const pointButtons = fixture.debugElement.nativeElement.querySelectorAll('.point-button button');
        const p1Button = pointButtons[0];
        const p2Button = pointButtons[1];
        p1Button.click();
        expect(addPointForPlayerSpy).toHaveBeenCalled();
        expect(addPointForPlayerSpy).toHaveBeenCalledWith(component.players[0]);
        p1Button.click();
        expect(addPointForPlayerSpy).toHaveBeenCalledWith(component.players[0]);
        p2Button.click();
        expect(addPointForPlayerSpy).toHaveBeenCalledWith(component.players[1]);
      });
  });

  it('should reset and start new game', async () => {
    const resetGameSpy = spyOn(matchService, 'resetGame').and.callThrough();
    component.startGame();
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        const resetGameButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
        resetGameButton.click();
        expect(resetGameSpy).toHaveBeenCalled();
        expect(component.currentStep).toEqual(1);
      });
  });
});
