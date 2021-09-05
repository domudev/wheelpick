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
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    OptionComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
    IconsModule,
    FlexLayoutModule,
    ColorPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
