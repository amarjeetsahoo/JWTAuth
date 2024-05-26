import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleCreateRequest } from 'src/app/interfaces/roleCreateRequest.interface';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @Input() role!: RoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole: EventEmitter<RoleCreateRequest> =
    new EventEmitter<RoleCreateRequest>();

  constructor() { }

  ngOnInit(): void {
  }


  add() {
    this.addRole.emit(this.role);
  }

}
