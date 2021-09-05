import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WheelComponent } from './components/wheel/wheel.component';
import { OptionComponent } from './components/option/option.component';
import { FooterComponent } from './components/footer/footer.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArrowComponent } from './components/icons/arrow/arrow.component';
import { ChevronComponent } from './components/icons/chevron/chevron.component';
import { DoubleChevronComponent } from './components/icons/double-chevron/double-chevron.component';
import { PlusComponent } from './components/icons/plus/plus.component';
import { MinusComponent } from './components/icons/minus/minus.component';
import { TrashComponent } from './components/icons/trash/trash.component';
import { CheckComponent } from './components/icons/check/check.component';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    OptionComponent,
    FooterComponent,
    ArrowComponent,
    ChevronComponent,
    DoubleChevronComponent,
    PlusComponent,
    MinusComponent,
    TrashComponent,
    CheckComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    FlexLayoutModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
