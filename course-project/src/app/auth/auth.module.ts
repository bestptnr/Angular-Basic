import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { AuthComponents } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AuthComponents
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthComponents },

        ]),
        SharedModule
    ]
})
export class AuthModule {
}