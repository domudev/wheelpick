import { Component, OnInit } from '@angular/core';
import { OptionService } from '../../services/option.service';
import { Option } from '../../shared/interface/option';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  options: Option[] = [];

  constructor(public optionService: OptionService) {}

  ngOnInit(): void {}

  async addOption(optionName: string): Promise<void> {
    const option: Option = {
      id: Math.random().toString(16).slice(2),
      name: optionName,
      visible: true,
      color: randomColor(),
    };
    await this.optionService.addOption(option);
  }

  viewAllOptions(): void {
    this.optionService.makeAllVisible();
  }

  async optionChanged(): Promise<void> {
    await this.optionService.storeOptions();
  }
}
