import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  private roles: string[] = [
    "Full Stack Developer",
    "Tech Innovator", 
    "Prompt Engineer",
    "Automation Engineer"
  ];
  
  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private isPaused = false;
  private readonly typeSpeed = 100;
  private readonly deleteSpeed = 50;
  private readonly pauseTime = 2000;

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Start the typewriter effect after initial animations
    setTimeout(() => {
      this.typeRole();
    }, 1500);
    
    this.initializeScrollAnimations();
  }

  private typeRole(): void {
    const roleElement = document.getElementById('role-text');
    if (!roleElement) return;
    
    const currentRole = this.roles[this.currentRoleIndex];
    
    if (this.isPaused) {
      setTimeout(() => this.typeRole(), this.pauseTime);
      this.isPaused = false;
      this.isDeleting = true;
      return;
    }
    
    if (this.isDeleting) {
      roleElement.textContent = currentRole.substring(0, this.currentCharIndex);
      this.currentCharIndex--;
      
      if (this.currentCharIndex < 0) {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.currentCharIndex = 0;
        setTimeout(() => this.typeRole(), 500);
        return;
      }
    } else {
      roleElement.textContent = currentRole.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentRole.length) {
        this.isPaused = true;
      }
    }
    
    setTimeout(() => this.typeRole(), this.isDeleting ? this.deleteSpeed : this.typeSpeed);
  }

  private initializeScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
    
    // Add scroll-triggered animations
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
  }

  scrollToContact(): void {
    // Implement smooth scroll to contact section
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.log('Contact section not found');
    }
  }

  downloadResume(): void {
    // Implement resume download functionality
    // Option 1: Direct download from assets
    const link = document.createElement('a');
    link.href = 'assets/resume/Prayag_Garg_Resume.pdf'; // Update with your resume path
    link.download = 'Prayag_Garg_Resume.pdf';
    link.click();
    
    // Option 2: If you want to track downloads or use a service
    // this.resumeService.downloadResume();
  }

  // Optional: Add method to update stats dynamically
  updateStats(): void {
    // You can implement logic to fetch and update stats from a service
    // This could be useful if you want to show real-time data
  }
// scrollToContact() {
//     const el = document.getElementById('contact');
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth' });
//     }
//   }
}
