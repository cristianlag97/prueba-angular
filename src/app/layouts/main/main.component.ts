import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared/presentation/components/header/header.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
