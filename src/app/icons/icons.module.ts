import { NgModule } from '@angular/core';

import { ArrowIcon } from './arrow/arrow.icon';
import { ChevronIcon } from './chevron/chevron.icon';
import { DoubleChevronIcon } from './double-chevron/double-chevron.icon';
import { PlusIcon } from './plus/plus.icon';
import { MinusIcon } from './minus/minus.icon';
import { TrashIcon } from './trash/trash.icon';
import { CheckIcon } from './check/check.icon';
import { SunIcon } from './sun/sun.icon';
import { MoonIcon } from './moon/moon.icon';

@NgModule({
  declarations: [
    ArrowIcon,
    ChevronIcon,
    DoubleChevronIcon,
    PlusIcon,
    MinusIcon,
    TrashIcon,
    CheckIcon,
    SunIcon,
    MoonIcon,
  ],
  exports: [
    ArrowIcon,
    ChevronIcon,
    DoubleChevronIcon,
    PlusIcon,
    MinusIcon,
    TrashIcon,
    CheckIcon,
    SunIcon,
    MoonIcon,
  ],
})
export class IconsModule {}
