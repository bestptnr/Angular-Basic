import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false
  private userSub: Subscription
  constructor(private dataStorageService: DataStorageService, private authService: AuthService,private router : Router) { }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user

    })
  }
  onSaveData() {
    this.dataStorageService.storeRecipes()

  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }
  onLogOut(){
    this.authService.logout()
    this.router.navigate(['/auth'])
  }
  ngOnDestroy(): void {
      this.userSub.unsubscribe()
  }

}
