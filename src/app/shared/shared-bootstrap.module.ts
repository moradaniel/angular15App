
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [AccordionModule.forRoot(),
              BsDropdownModule.forRoot(),
              ModalModule.forRoot(),
              TabsModule.forRoot()],
    exports: [AccordionModule, BsDropdownModule, ModalModule, TabsModule],
    declarations: [],
    providers: []
})

/**
 * http://www.mukeshkumar.net/articles/angular5/building-an-angular-5-cli-project-with-ngx-bootstrap
 */
export class SharedBootstrapModule {

}
