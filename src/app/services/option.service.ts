import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { StorageMode } from '../shared/enum/storage-mode.enum';
import { Option } from '../shared/interface/option';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  get storageMode(): StorageMode {
    return this._storageMode;
  }
  set storageMode(mode: StorageMode) {
    this._storageMode = mode;
    this._storageMode === StorageMode.URL
      ? this.readQueryParams()
      : this.readStorage();
  }

  get removeOptions(): boolean {
    return this._removeOptions;
  }
  set removeOptions(rmOpt: boolean) {
    this._removeOptions = rmOpt;
    this.storeSettings();
  }

  private maxOptions = 20;
  private _storageMode = StorageMode.URL; // where to store the options
  private _removeOptions = false; // whether options shall be removed from wheel after selection

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this._storageMode === StorageMode.URL
      ? this.readQueryParams()
      : this.readStorage();
  }

  private options: Option[] = [];
  options$: BehaviorSubject<Option[]> = new BehaviorSubject<Option[]>([]);

  async addOption(option: Option): Promise<void> {
    if (this.options.length < this.maxOptions) {
      this.options.push(option);
      await this.storeOptions();
    } else {
      console.warn(`Max Options: ${this.maxOptions}`);
      this.options$.next(this.options);
    }
  }

  async removeOption(option: Option): Promise<void> {
    if (this.options.includes(option)) {
      this.options.splice(this.options.indexOf(option), 1);
      await this.storeOptions();
    }
    this.options$.next(this.options);
  }

  async clearOptions(): Promise<void> {
    this.options = [];
    await this.storeOptions();
    this.options$.next(this.options);
  }

  async updateOption(id: string, option: Option): Promise<void> {
    this.options = this.options.map((o) => {
      if (o.id === id) {
        return option;
      }
      return o;
    });
    await this.storeOptions();
  }

  hasInvisible(): boolean {
    return this.options.findIndex((o) => !o.visible) !== -1;
  }

  async makeAllVisible(): Promise<void> {
    this.options = this.options.map((option) => {
      return { ...option, visible: true };
    });
    await this.storeOptions();
  }

  async storeOptions(): Promise<void> {
    if (this._storageMode === StorageMode.URL) {
      await this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { options: JSON.stringify(this.options) },
        queryParamsHandling: 'merge',
      });
      if (location.href.length > 2048) {
        console.warn(`URL Length > 2048: ${location.href.length}`);
      }
    } else {
      localStorage.setItem('options', JSON.stringify(this.options));
    }
    this.options$.next(this.options);
  }

  private async storeSettings(): Promise<void> {
    if (this._storageMode === StorageMode.URL) {
      await this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          settings: JSON.stringify({
            removeOptions: this.removeOptions,
          }),
        },
        queryParamsHandling: 'merge',
      });
      if (location.href.length > 2048) {
        console.warn(`URL Length > 2048: ${location.href.length}`);
      }
    } else {
      localStorage.setItem(
        'settings',
        JSON.stringify({
          removeOptions: this.removeOptions,
        })
      );
    }
  }

  private async readQueryParams(): Promise<void> {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let r = this.activatedRoute;
        while (r.firstChild) {
          r = r.firstChild;
        }
        r.queryParams.pipe(first()).subscribe((params) => {
          if (params.options) {
            try {
              this.options = JSON.parse(params.options);
              this.options$.next(this.options);
            } catch (err) {
              console.warn(`URL Options parsing error: ${err.message}`);
            }
          }

          if (params.settings) {
            try {
              this.removeOptions =
                JSON.parse(params.settings).removeOptions || false;
            } catch (err) {
              console.warn(`URL Options parsing error: ${err.message}`);
            }
          }
        });
      });
  }

  private readStorage(): void {
    const options = localStorage.getItem('options');
    const settings = localStorage.getItem('settings');
    if (options) {
      try {
        this.options = JSON.parse(options);
        this.options$.next(this.options);
      } catch (err) {
        console.warn(`URL Options parsing error: ${err.message}`);
      }
    }
    if (settings) {
      try {
        this.removeOptions = JSON.parse(settings).removeOptions || false;
      } catch (err) {
        console.warn(`URL Options parsing error: ${err.message}`);
      }
    }
  }
}
