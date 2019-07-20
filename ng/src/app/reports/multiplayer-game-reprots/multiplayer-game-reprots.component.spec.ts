import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerGameReprotsComponent } from './multiplayer-game-reprots.component';

describe('MultiplayerGameReprotsComponent', () => {
  let component: MultiplayerGameReprotsComponent;
  let fixture: ComponentFixture<MultiplayerGameReprotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplayerGameReprotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerGameReprotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
