import { NgModule } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu'
import { MatListModule } from '@angular/material/list'

const modules = [
    MatMenuModule,
    MatListModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {  }