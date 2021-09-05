import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ThemeService } from './services/theme.service';
import { ThemeModeEnum } from './shared/enum/theme-mode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  themeModeEnum = ThemeModeEnum;

  constructor(public readonly themeService: ThemeService) {}

  title = environment.title;
  repoLink = environment.repoLink;
}
