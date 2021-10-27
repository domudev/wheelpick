import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ThemeService } from './services/theme.service';
import { ThemeModeEnum } from './shared/enum/theme-mode.enum';
import { OptionService } from './services/option.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  themeModeEnum = ThemeModeEnum;

  constructor(
    public readonly themeService: ThemeService,
    public readonly optionService: OptionService
  ) {}

  title = environment.title;
  repoLink = environment.repoLink;
}
