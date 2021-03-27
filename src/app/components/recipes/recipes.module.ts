import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuardService } from '../auth/auth-guard.service';

import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    {
        path: '', component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeAddComponent },
            { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeAddComponent, resolve: [RecipesResolverService] }
        ]
    },
];

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipeItemComponent,
        RecipesDetailComponent,
        RecipeStartComponent,
        RecipeAddComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [
        RecipesComponent,
        RecipesListComponent,
        RecipeItemComponent,
        RecipesDetailComponent,
        RecipeStartComponent,
        RecipeAddComponent,
    ]
})

export class RecipesModule { }