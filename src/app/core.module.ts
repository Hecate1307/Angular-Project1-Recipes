import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { RecipeService } from './services/recipe.service';
import { ShoppinglistService } from './services/shoppinglist.service';
import { DataService } from './shared/data.service';



@NgModule({
    providers: [
        ShoppinglistService,
        RecipeService,
        DataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }],
})
export class CoreModule { }