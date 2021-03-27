import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule { }