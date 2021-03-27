import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;


  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  private closeSub: Subscription;

  ngOnInit(): void {
  }

  isLoggedInMode: boolean = false;
  // store if user logged in
  isLoading: boolean = false;
  error: string = null;

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.msg = this.error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoggedInMode) {
      authObs = this.authService.login(email, password);
      this.isLoading = false;
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(data => {
      this.isLoading = false;
      this.error = null;
      console.log(data);
      // when finish the auth, navigate to recipe page
      this.router.navigate(['/recipes']);

    }, errorMessage => {
      this.error = errorMessage;

      this.showErrorAlert(errorMessage);

      this.isLoading = false;
    });

    form.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
