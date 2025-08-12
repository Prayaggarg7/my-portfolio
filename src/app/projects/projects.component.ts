import { Component, OnInit } from '@angular/core';

interface ProjectStat {
  value: string;
  label: string;
}

interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  category: 'automation' | 'web' | 'tools';
  icon: string;
  technologies: string[];
  features: string[];
  stats?: ProjectStat[];
  impact?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
   subProjects?: { name: string; highlight: string }[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  selectedCategory: string = 'all';
  expandedProject: number | null = null;
  projects: Project[] = [];
  filteredProjects: Project[] = [];

  constructor() {
    this.initializeProjects();
  }

  ngOnInit(): void {
    this.filterProjects('all');
  }

  private initializeProjects(): void {
    this.projects = [
              {
          id: 1,
          title: 'Line Production Monitoring Dashboards',
          summary: 'Three specialized real-time dashboards for assembly, hobbing, and grinding lines.',
          description: 'Developed separate dashboard systems for each production line type...',
          category: 'automation',
          icon: '📊',
          technologies: ['Angular', 'Spring Boot', 'WebSocket', 'MySQL', 'Chart.js'],
          features: [
            'Assembly line KPIs and downtime logging',
            'Hobbing cycle time and tool wear tracking',
            'Grinding spindle load and quality analytics'
          ],
          stats: [
            { value: '99.2%', label: 'Uptime' },
            { value: '30%', label: 'Efficiency Gain' }
          ],
          impact: 'Overall OEE improvement across all production lines by 25% and reduced downtime by 20%.',
          subProjects: [
            { name: 'Assembly Dashboard', highlight: 'Reduced assembly downtime by 20%' },
            { name: 'Hobbing Dashboard', highlight: 'Increased throughput by 25%' },
            { name: 'Grinding Dashboard', highlight: 'Improved quality rate to 99%' }
          ]
        },
      {
        id: 2,
        title: 'Data Fetching Software',
        summary: 'Automated data collection system for industrial equipment with configurable data sources and processing.',
        description: 'Enterprise-grade data fetching solution that automatically collects, processes, and stores data from various industrial equipment and sensors. Features configurable data sources, real-time processing, and error handling mechanisms.',
        category: 'web',
        icon: '🔄',
        technologies: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Docker'],
        features: [
          'Multi-source data collection',
          'Configurable polling intervals',
          'Data transformation and validation',
          'Error handling and retry mechanisms',
          'Scalable architecture',
          'RESTful API integration'
        ],
        stats: [
          { value: '1M+', label: 'Data Points/Day' },
          { value: '15+', label: 'Data Sources' },
          { value: '99.9%', label: 'Reliability' }
        ],
        impact: 'Automated data collection from 15+ different equipment types, reducing manual data entry errors by 95% and saving 20+ hours weekly.',
        githubUrl: '#'
      },
      {
        id: 3,
        title: 'Packing Software',
        summary: 'Intelligent packing optimization system for warehouse operations with barcode integration.',
        description: 'Smart packing solution that optimizes packaging processes through automated calculations, barcode scanning, and inventory management. Integrates with existing warehouse management systems.',
        category: 'web',
        icon: '📦',
        technologies: ['Angular', 'Java', 'MySQL', 'Barcode Scanner API', 'Print API'],
        features: [
          'Barcode scanning integration',
          'Automated packing calculations',
          'Inventory level tracking',
          'Label printing automation',
          'Package optimization algorithms',
          'Integration with WMS systems'
        ],
        stats: [
          { value: '40%', label: 'Time Saved' },
          { value: '95%', label: 'Accuracy Rate' },
          { value: '1000+', label: 'Packages/Day' }
        ],
        impact: 'Streamlined packing operations resulting in 40% faster processing times and 95% reduction in packaging errors.',
        liveUrl: '#'
      },
      {
        id: 4,
        title: 'Data Analysis Tool',
        summary: 'Advanced analytics platform for industrial data with machine learning insights and predictive capabilities.',
        description: 'Comprehensive data analysis platform that processes large volumes of industrial data to provide actionable insights, trend analysis, and predictive maintenance recommendations using machine learning algorithms.',
        category: 'tools',
        icon: '📈',
        technologies: ['Python', 'Pandas', 'scikit-learn', 'Angular', 'PostgreSQL', 'Plotly'],
        features: [
          'Statistical analysis and reporting',
          'Trend identification and forecasting',
          'Machine learning model integration',
          'Interactive data visualizations',
          'Automated report generation',
          'Predictive maintenance insights'
        ],
        stats: [
          { value: '85%', label: 'Prediction Accuracy' },
          { value: '50+', label: 'KPIs Tracked' },
          { value: '10TB+', label: 'Data Processed' }
        ],
        impact: 'Enabled predictive maintenance strategies that reduced equipment downtime by 30% and maintenance costs by 25%.',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'CSV to SQL Converter',
        summary: 'Automated CSV to SQL data processing tool with duplicate detection, value checks, and part status updates.',
        description: 'An industrial-grade automation tool that reads CSV files from a designated machine directory, validates their data, checks for duplicates, updates part statuses accordingly, and writes results to SQL databases. The system automatically detects and segregates unsupported file types into a separate folder. It generates detailed logs for every operation and runs seamlessly via Docker deployment.',
        category: 'tools',
        icon: '🗄️',
        technologies: ['Python', 'Pandas', 'SQLAlchemy', 'Docker', 'Logging'],
        features: [
          'Automatic CSV file detection from machine output',
          'Duplicate value detection',
          'Automated part status updates',
          'Strict CSV-only file processing',
          'Non-CSV file segregation into a separate folder',
          'Detailed log generation for all operations',
          'Runs as a containerized Docker service'
        ],
        stats: [
          { value: '100%', label: 'Automated Processing' },
          { value: '0', label: 'Manual Interventions Needed' },
          { value: '24/7', label: 'Operation Capability' }
        ],
        impact: 'Eliminated manual CSV handling, reduced errors to zero, and ensured real-time updates to the SQL database for critical manufacturing processes.',
        githubUrl: '#'
      },
      {
        id: 6,
        title: 'Part Verifying Software',
        summary: 'Automated part verification system ensuring compliance with manufacturing specifications before assembly.',
        description: 'A verification tool that checks incoming parts against pre-defined manufacturing and quality control rules. It cross-references live data with stored reference values, flags discrepancies, and updates the system in real-time. The software integrates with production databases and supports batch verification with high-speed processing.',
        category: 'web',
        icon: '✅',
        technologies: ['Python', 'PostgreSQL', 'Pandas', 'REST API'],
        features: [
          'Automated part ID and specification matching',
          'Real-time database integration',
          'Batch verification mode',
          'Discrepancy flagging and logging',
          'Integration with production line alerts',
          'Lightweight and scalable architecture'
        ],
        stats: [
          { value: '98%', label: 'Verification Accuracy' },
          { value: '5000+', label: 'Parts Verified/Day' },
          { value: '90%', label: 'Error Reduction' }
        ],
        impact: 'Reduced faulty part usage by 90% and ensured compliance with quality control standards without slowing production.',
        githubUrl: '#'
      }
    ];
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
    this.expandedProject = null; // Collapse any expanded project when filtering
  }

  toggleProject(index: number): void {
    this.expandedProject = this.expandedProject === index ? null : index;
  }

  openProject(url: string | undefined, event: MouseEvent): void {
    if (!url) return;
    event.stopPropagation(); // Prevent card toggle when clicking buttons
    window.open(url, '_blank');
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
