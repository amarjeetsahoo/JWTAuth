import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from 'src/app/interfaces/role.interface';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() roles!: Role[] | null;
  @Output() deleteRole: EventEmitter<string> = new EventEmitter<string>();

  delete(id: string) {
    this.deleteRole.emit(id);
  }

}
