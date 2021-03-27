import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
];

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }