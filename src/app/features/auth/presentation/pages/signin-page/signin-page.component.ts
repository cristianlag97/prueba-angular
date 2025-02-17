import { Component } from '@angular/core';
import { FormLoginComponent } from "../../components/form-login/form-login.component";
import { ButtonTranslateComponent } from "../../../../../shared/presentation/components/button-translate/button-translate.component";

@Component({
  selector: 'app-signin-page',
  imports: [FormLoginComponent, ButtonTranslateComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent {

}
