import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface Certification {
  badge: string;
  title: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
  certifications?: Certification[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;

  categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend',
      icon: 'fa-laptop-code',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      skills: [
        { name: 'Angular', level: 90, icon: 'fa-angular' },
        { name: 'JavaScript', level: 85, icon: 'fa-js' },
        { name: 'Swing (Java)', level: 75, icon: 'fa-java' } // using java icon as fallback
      ]
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: 'fa-server',
      color: 'linear-gradient(135deg, #10b981, #059669)',
      skills: [
        { name: 'Java', level: 95, icon: 'fa-java' },
        { name: 'Spring Boot', level: 90, icon: 'fa-leaf' }, // Leaf icon for Spring Boot (no official icon)
        { name: 'REST API', level: 88, icon: 'fa-network-wired' },
        { name: 'JWT', level: 80, icon: 'fa-key' },
        { name: 'OOP', level: 92, icon: 'fa-cogs' }
      ]
    },
    {
      id: 'database',
      title: 'Database',
      icon: 'fa-database',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      skills: [
        { name: 'MSSQL', level: 85, icon: 'fa-database' },
        { name: 'PostgreSQL', level: 80, icon: 'fa-database' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps/Infra',
      icon: 'fa-cloud',
      color: 'linear-gradient(135deg, #ef4444, #dc2626)',
      skills: [
        { name: 'Apache Tools', level: 70, icon: 'fa-server' },
        { name: 'Docker', level: 75, icon: 'fa-box' } // no official docker FA icon, using box as fallback
      ]
    },
    {
      id: 'tools',
      title: 'Misc Tools',
      icon: 'fa-tools',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      skills: [
        { name: 'Postman', level: 90, icon: 'fa-envelope' }, // envelope as postman icon
        { name: 'GitHub', level: 88, icon: 'fa-github' },
        { name: 'Excel', level: 82, icon: 'fa-file-excel' },
        { name: 'Swagger API', level: 70, icon: 'fa-file-code' } // no swagger icon, use file-code as fallback
      ]
    },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: 'fa-certificate',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)',
      skills: [],
      certifications: [
        { badge: 'GATE', title: 'GATE Qualified' },
        { badge: 'SB', title: 'Spring Boot + Java Backend Development' },
        { badge: 'SQL', title: 'SQL / DBMS Certifications' },
        { badge: 'WEB', title: 'Web Development & GitHub Workflow' }
      ]
    }
  ];

  stats = [
    { number: '15+', label: 'Technologies' },
    { number: '4+', label: 'Certifications' },
    { number: '3+', label: 'Years Experience' }
  ];

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars();
          this.animateStats();
          observer.disconnect();  // animate once only
        }
      });
    }, { threshold: 0.1 });

    if (this.skillsSection) {
      observer.observe(this.skillsSection.nativeElement);
    }
  }

  private animateSkillBars(): void {
    const skillBars = document.querySelectorAll('.level-bar');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const level = bar.getAttribute('data-level');
        if (level) {
          (bar as HTMLElement).style.width = `${level}%`;
        }
      }, index * 100);
    });
  }

  private animateStats(): void {
    const statElements = document.querySelectorAll('.stat-number');
    if (!this.stats || !statElements) return;

    statElements.forEach((element, index) => {
      if (index >= this.stats.length) return;
      const target = this.stats[index].number;
      this.animateCounter(element as HTMLElement, target);
    });
  }

  private animateCounter(element: HTMLElement, target: string): void {
    const numericValue = parseInt(target);
    const duration = 1500;
    const start = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * numericValue);

      element.textContent = current + target.replace(/\d+/, '');

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // Return complete icon class with fab or fas prefix based on icon name
  getIconClass(icon?: string): string {
    if (!icon) return 'fas fa-circle'; // fallback icon

    // Brand icons (fab) list (partial)
    const brands = ['fa-angular', 'fa-js', 'fa-github', 'fa-java'];

    // For devicons or FA, assign fab or fas accordingly
    if (brands.includes(icon)) {
      return `fab ${icon}`;
    }

    // Otherwise solid icon
    return `fas ${icon}`;
  }

  getSkillColor(level: number): string {
    if (level >= 90) return 'linear-gradient(90deg, #10b981, #059669)';
    if (level >= 80) return 'linear-gradient(90deg, #3b82f6, #2563eb)';
    if (level >= 70) return 'linear-gradient(90deg, #f59e0b, #d97706)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  }
}
