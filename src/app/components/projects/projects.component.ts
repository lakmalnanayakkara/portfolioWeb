import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectDetails } from 'src/app/shared/project-details';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectDetails[] = [];
  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  projectOpen(i: number) {
    window.open(this.projectsService.getProjectById(i).projectLink, '_blank');
  }

  plusSlides(project: ProjectDetails, n: number) {
    project.currentImageIndex += n;
    if (
      project.currentImageIndex === project?.images?.length ||
      project.currentImageIndex < 0
    ) {
      project.currentImageIndex = 0;
    }
  }
}
