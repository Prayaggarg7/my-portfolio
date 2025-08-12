import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('contactForm') contactForm!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.setupFormAnimation();
  }

  private setupFormAnimation(): void {
    const formGroups = this.contactForm.nativeElement.querySelectorAll('.form-group');
    formGroups.forEach((group: HTMLElement, index: number) => {
      group.style.animationDelay = `${index * 0.1 + 0.5}s`;
    });
  }

  // copyToClipboard(text: string): void {
  //   // this.clipboard.copy(text);
  //   // You can add a toast notification here
  //   console.log('Copied to clipboard:', text);
  // }

  // onSubmit(event: Event): void {
  //   event.preventDefault();
  //   // Add your form submission logic here
  //   console.log('Form submitted');
  //   // You can add form validation and HTTP request here
  // }
}