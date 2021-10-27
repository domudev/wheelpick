import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  timerDone = false;

  private timerIsDoneSubscription!: Subscription;
  private alertTime = 5000;

  constructor(public timerService: TimerService) {}

  ngOnInit() {
    this.timerIsDoneSubscription = this.timerService.timerDone$.subscribe(
      () => {
        this.timerIsDone();
      }
    );
  }

  ngOnDestroy() {
    this.timerIsDoneSubscription.unsubscribe();
  }

  private timerIsDone() {
    this.timerDone = true;
    setTimeout(() => {
      this.timerDone = false;
    }, this.alertTime);
  }
}
