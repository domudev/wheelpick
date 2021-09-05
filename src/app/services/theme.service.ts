import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ThemeModeEnum } from '../shared/enum/theme-mode.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly theme$: BehaviorSubject<ThemeModeEnum>;
  private readonly themeKey = `${environment.title}_theme`;

  constructor() {
    const themeOnStart = this.retrieveTheme();
    this.theme$ = new BehaviorSubject(themeOnStart);
    this.theme$.subscribe((userSelectedTheme) => {
      if (userSelectedTheme === ThemeModeEnum.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
    this.theme$.next(themeOnStart);
  }

  public changeTheme(theme: ThemeModeEnum) {
    localStorage[this.themeKey] = theme;
    this.theme$.next(theme);
  }

  private retrieveTheme(): ThemeModeEnum {
    let theme: ThemeModeEnum;
    if (
      localStorage[this.themeKey] === ThemeModeEnum.DARK ||
      (!(this.themeKey in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      theme = ThemeModeEnum.DARK;
    } else {
      theme = ThemeModeEnum.LIGHT;
    }

    // If not present in storage yet
    if (localStorage[this.themeKey] !== theme) {
      localStorage[this.themeKey] = theme;
    }
    return theme;
  }
}
