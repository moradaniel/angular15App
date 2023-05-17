import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-demo-modal-service-static-component',
  templateUrl: './demo-modal-service-static-component.component.html',
  styleUrls: ['./demo-modal-service-static-component.component.css']
})
export class DemoModalServiceStaticComponentComponent {

  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
