import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [

    {
        path: '', component: ShoppingListComponent, children: [
        ]
    },
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes),

    ],
    exports: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],

}
)
export class ShoppingListModule { }