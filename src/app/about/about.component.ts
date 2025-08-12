import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {

  @ViewChild('aboutContainer', { static: false }) aboutContainer!: ElementRef;

  // Data for dynamic content (can be moved to a service)
  journeySteps = [
    {
      icon: '🎯',
      title: 'IIT Preparation',
      description: 'Started with engineering aspirations'
    },
    {
      icon: '🏆',
      title: 'GATE Qualification',
      description: 'Achieved success in competitive exam'
    },
    {
      icon: '💻',
      title: 'Tech Transition',
      description: 'Moved to software development'
    }
  ];

  infoCards = [
    {
      icon: '🎓',
      title: 'Education',
      description: 'MCA Graduate'
    },
    {
      icon: '🧠',
      title: 'Achievement',
      description: 'GATE Qualified'
    },
    {
      icon: '💻',
      title: 'Expertise',
      description: 'Full Stack Developer (Java + Angular)'
    },
    {
      icon: '⚙️',
      title: 'Passion',
      description: 'Industrial Automation Enthusiast'
    },
    {
      icon: '📍',
      title: 'Location',
      description: 'Based in Gurgaon'
    }
  ];

  coreStrengths = [
    'Problem Solving',
    'System Design',
    'Automation',
    'Full Stack Development',
    'Performance Optimization'
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initializeIntersectionObserver();
    this.addScrollAnimations();
  }

  private initializeIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Add staggered animations for cards
          if (entry.target.classList.contains('info-card')) {
            const cards = entry.target.parentElement?.querySelectorAll('.info-card');
            cards?.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe elements that need scroll-triggered animations
    const elementsToObserve = [
      '.intro-text',
      '.journey-timeline',
      '.info-cards',
      '.skills-preview',
      '.philosophy'
    ];

    elementsToObserve.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => observer.observe(element));
    });
  }

  private addScrollAnimations(): void {
    // Add custom scroll-based animations
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll(): void {
    const scrollY = window.scrollY;
    const aboutSection = document.querySelector('.about-container') as HTMLElement;
    
    if (aboutSection) {
      const rect = aboutSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Add parallax effect to background elements
        const translateY = scrollY * 0.1;
        aboutSection.style.setProperty('--scroll-y', `${translateY}px`);
      }
    }
  }

  // Method to get random delay for staggered animations
  getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  // Method to track user interactions for analytics
  trackInteraction(element: string): void {
    console.log(`User interacted with: ${element}`);
    // Implement analytics tracking here
  }

  // Method to handle dynamic content updates
  updateContent(newData: any): void {
    // This method can be used to update content dynamically
    // Useful if content comes from a CMS or API
    console.log('Updating about content:', newData);
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll);
  }
}