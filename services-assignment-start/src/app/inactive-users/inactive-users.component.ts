import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  @Input() users: string[];

  constructor(private userService : UsersService){}

  ngOnInit(): void {
      this.users = this.userService.inactiveUsers
  }
  onSetToActive(id: number) {
    this.userService.onSetToActive(id)
  }
}
