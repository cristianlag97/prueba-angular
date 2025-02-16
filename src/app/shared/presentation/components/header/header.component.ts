import { Component } from '@angular/core';
import { ButtonTranslateComponent } from "../button-translate/button-translate.component";
import { Store } from '@ngrx/store';
import { logout } from '../../../../features/auth/presentation/store/auth.action';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [ButtonTranslateComponent, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private store: Store, private router: Router){}

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/sign-in']);
  }

}
