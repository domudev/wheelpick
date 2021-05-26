import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionService } from '../../services/option.service';
import * as confetti from 'canvas-confetti';
import { Option } from '../../shared/interface/option';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
})
export class WheelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spinningWheel') wheelCanvas!: ElementRef;
  @ViewChild('spinButton') spinButton!: ElementRef;
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef;

  public wheelStrength = 0.4;
  public currentOption?: Option;
  public wheelSpun = false;
  public wheelWidth: number = window.innerWidth - 40;

  public options: Option[] = [];

  private resizeId!: any;
  private ctx!: CanvasRenderingContext2D;

  private optionsSubscription!: Subscription;
  private angleVelocity!: number;
  private angle!: number;
  private diameter = 0;
  private rad = 0;
  private tau = 0;
  private arc = 0;
  private friction = 0.96; // 0.995=soft, 0.99=mid, 0.98=hard;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.wheelWidth = event.target.innerWidth - 40;
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(() => {
      this.buildWheel(this.options);
    }, 150);
  }

  constructor(private opionService: OptionService) {}

  ngAfterViewInit(): void {
    this.startEngine();
    this.optionsSubscription = this.opionService.options$.subscribe(
      (options) => {
        this.wheelSpun = false;
        this.options = options.filter((o) => o.visible);
        this.buildWheel(this.options);
      }
    );
  }

  ngOnDestroy(): void {
    this.optionsSubscription.unsubscribe();
  }

  async buildWheel(options: Option[]): Promise<void> {
    this.currentOption = undefined;
    this.ctx = this.wheelCanvas.nativeElement.getContext('2d');
    if (this.ctx) {
      // clear canvas
      this.ctx.clearRect(
        0,
        0,
        this.wheelCanvas.nativeElement.width,
        this.wheelCanvas.nativeElement.height
      );

      const totalOptions = options.length;
      this.diameter = this.ctx.canvas.width;
      this.rad = this.diameter / 2;
      this.tau = 2 * Math.PI;
      this.arc = this.tau / totalOptions;
      this.angleVelocity = 0; // Angular velocity
      this.angle = 0; // Angle in radians

      options.forEach((option: Option, i: number) => {
        const ang = this.arc * i;

        this.ctx.save();

        // option part color
        this.ctx.beginPath();
        this.ctx.fillStyle = option.color;
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = '#fff';
        this.ctx.moveTo(this.rad, this.rad);
        this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc);
        this.ctx.lineTo(this.rad, this.rad);
        this.ctx.stroke();
        this.ctx.fill();

        // text
        this.ctx.translate(this.rad, this.rad);
        this.ctx.rotate(ang + this.arc / 2);
        this.ctx.font = '900 16px monospace';
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = this.getContrast(option.color);
        this.ctx.fillText(option.name, this.rad - 10, 10);

        this.ctx.restore();
      });
      this.rotate();
    }
  }

  private getIndex(): number {
    return (
      Math.floor(
        this.options.length - (this.angle / this.tau) * this.options.length
      ) % this.options.length
    );
  }

  private rotate(): void {
    const option = this.options[this.getIndex()];
    this.ctx.canvas.style.transform = `rotate(${this.angle - Math.PI / 2}rad)`;
    this.spinButton.nativeElement.textContent = this.angleVelocity
      ? option.name
      : 'GO';
    if (this.wheelSpun) {
      this.spinButton.nativeElement.style.background = option?.color;
      this.spinButton.nativeElement.style.color = this.getContrast(
        option?.color
      );
    }
    if (!this.angleVelocity && this.wheelSpun) {
      this.currentOption = option;
      this.confettiExplosion();
    }
  }

  private randomVelocity(a: number, b: number): number {
    return Math.random() * (b - a) + a;
  }

  private startEngine(): void {
    const engine = () => {
      const frame = () => {
        if (!this.angleVelocity) {
          return;
        }
        this.angleVelocity *= this.friction; // Decrement velocity by friction
        if (this.angleVelocity < 0.002) {
          this.angleVelocity = 0;  // Bring to stop
        }
        this.angle += this.angleVelocity; // Update angle
        this.angle %= this.tau; // Normalize angle
        this.rotate();
      };
      frame();
      requestAnimationFrame(engine);
    };

    engine();
  }

  async spinWheel(): Promise<void> {
    if (!this.angleVelocity) {
      // remove option before next turn
      if (this.currentOption && this.opionService.removeOptions) {
        await this.opionService.updateOption(this.currentOption.id, {
          ...this.currentOption,
          visible: false,
        });
        if (!this.options?.length) {
          return;
        }
      }
      this.currentOption = undefined;
      this.angleVelocity = this.randomVelocity(
        this.wheelStrength,
        this.wheelStrength + 0.1
      );
      this.wheelSpun = true;
    }
  }

  private confettiExplosion(): void {
    setTimeout(() => {
      const confettiRef = confetti.create(this.confettiCanvas.nativeElement, {
        useWorker: true,
        resize: true,
      });
      confettiRef({
        particleCount: 100,
        spread: 360,
        startVelocity: 30,
      });
    }, 0);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  getContrast(hexColor?: string): string {
    if (hexColor) {
      const rgb = this.hexToRgb(hexColor);
      if (rgb) {
        // http://www.w3.org/TR/AERT#color-contrast
        const brightness = Math.round(
          (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
        );
        return brightness > 125 ? '#000' : '#fff';
      }
    }
    return '#fff';
  }
}
