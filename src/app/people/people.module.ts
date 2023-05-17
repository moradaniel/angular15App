import {NgModule} from '@angular/core';


import {PeopleListComponent} from './people-list.component';
import {PeopleViewDetailsComponent} from "./people-view-details.component";
import {ContentFilterPipe} from "./content-filter.pipe";

//import { ModalModule } from 'ngx-bootstrap';
import {PeopleManagementComponent} from "./people-management.component";
import {PeopleEditComponent} from "./people-edit.component";
//import {CommonModule} from "@angular/common";
import {PeopleRoutingModule} from "./people-routing.module";
import {CommonModule} from '@angular/common';
import {AppModule} from '../app.module';
import {DemoModalServiceStaticComponentComponent} from '../demo-modal-service-static-component/demo-modal-service-static-component.component';
import {SharedBootstrapModule} from '../shared/shared-bootstrap.module';
import {PeopleModalServiceFromComponentComponent} from './people-modal-service-from-component.component';
import {PeopleViewDetailsModalComponent} from './people-view-details-modal.component';
import {PeopleEditModalComponent} from './people-edit-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {PeopleAddComponent} from "./people-add.component";

@NgModule({
  imports: [/* ModalModule.forRoot(),*/
    PeopleRoutingModule,
    CommonModule,
    SharedBootstrapModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [PeopleManagementComponent,
                 PeopleListComponent,
                 PeopleViewDetailsComponent,
                 PeopleViewDetailsModalComponent
                /*,PeopleAddComponent*/
                , PeopleEditComponent
                , PeopleEditModalComponent
                , DemoModalServiceStaticComponentComponent
              , PeopleModalServiceFromComponentComponent
                , ContentFilterPipe],
  exports: [PeopleManagementComponent,
            PeopleListComponent/*,
            PeopleViewDetailsComponent,
            PeopleViewDetailsModalComponent
            ,PeopleAddComponent*/
            , PeopleEditComponent
            , DemoModalServiceStaticComponentComponent
           , PeopleModalServiceFromComponentComponent
           , PeopleViewDetailsModalComponent
            , ContentFilterPipe],
  /**
   * https://stackoverflow.com/questions/46990389/angular-4-no-component-factory-found-did-you-add-it-to-ngmodule-entrycomponent/46990483
   * In the case of a dynamically loaded component and in order for a ComponentFactory to be
   * generated, the component must also be added to the module’s entryComponents:
   */
  entryComponents: [PeopleViewDetailsModalComponent,
                    PeopleEditModalComponent]
})
export class PeopleModule { }
