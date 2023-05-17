import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Component, OnInit} from '@angular/core';
import {Person} from './person';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <!-- button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button -->
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" (click)="bsModalRef.hide()"></button>
    </div>
    <!--div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div -->

    <people-view-details [person]="person"></people-view-details>

    <div class="modal-footer">
      <!-- button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button -->
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class PeopleViewDetailsModalComponent implements OnInit {
  title!: string;
  closeBtnName!: string;

  person!: Person

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {

  }
}
