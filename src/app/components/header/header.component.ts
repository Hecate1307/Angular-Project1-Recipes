import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuth = false;

  constructor(private dataService: DataService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuth = !user ? false : true;
      this.isAuth = !!user;

    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSaveData() {
    this.dataService.storeRecipes();

  }
  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
