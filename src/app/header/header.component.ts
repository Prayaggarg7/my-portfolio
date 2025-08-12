import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  activeSection: string = 'home';
  mobileMenuOpen: boolean = false;
  scrolled: boolean = false;

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', ['$event'])
  checkScrollPosition() {
    this.scrolled = window.scrollY > 50;
    
    // Update active section based on scroll position
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}