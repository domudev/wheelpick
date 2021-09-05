import { Component, OnInit } from '@angular/core';
import { OptionService } from '../../services/option.service';
import { Option } from '../../shared/interface/option';
import randomColor from 'randomcolor';
import { ThemeService } from '../../services/theme.service';
import { ThemeModeEnum } from '../../shared/enum/theme-mode.enum';
import { first } from 'rxjs/operators';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  options: Option[] = [];

  constructor(
    public optionService: OptionService,
    protected themeService: ThemeService,
    protected utilService: UtilService
  ) {}

  ngOnInit(): void {}

  async addOption(optionName: string): Promise<void> {
    const option: Option = {
      id: Math.random().toString(16).slice(2),
      name: optionName,
      visible: true,
      color: randomColor({
        hue: this.utilService.pickRandomFromList(
          (await this.themeService.theme$.pipe(first()).toPromise()) ===
            ThemeModeEnum.DARK
            ? ['orange', 'red', 'yellow']
            : ['green', 'blue']
        ),
        luminosity: this.utilService.pickRandomFromList(['dark', 'bright']),
        format: 'hex',
      }),
    };
    await this.optionService.addOption(option);
  }

  async viewAllOptions(): Promise<void> {
    await this.optionService.makeAllVisible();
  }

  async optionChanged(): Promise<void> {
    await this.optionService.storeOptions();
  }
}
