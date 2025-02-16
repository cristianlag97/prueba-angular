import { NgStyle } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button-translate',
  imports: [NgStyle, TranslateModule],
  templateUrl: './button-translate.component.html',
  styleUrl: './button-translate.component.css'
})
export class ButtonTranslateComponent implements OnInit{

  borderColor = input<String>('white');
  textColor = input<String>('white');
  hoverBgColor = input<String>('#333');
  hoverTextColor = input<String>('white');

  isHovered = false;

  currentLanguage: string = localStorage.getItem('language') || 'es';
  translate: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.translate.use(this.currentLanguage);
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
  }
}
