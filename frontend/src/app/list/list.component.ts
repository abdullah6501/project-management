import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddlistDialogComponent } from '../addlist-dialog/addlist-dialog.component';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Project {
  id: number;
  projectlist: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  projects: Project[] = [];
  selectedFile: File | null = null;
  selectedProject: Project | null = null;
  public apiUrl = environment.PORTFOLIO_BASEURL;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchProjects();
  }

  openAddlistDialog(): void {
    const dialogRef = this.dialog.open(AddlistDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchProjects();
    });
  }

  fetchProjects() {
    const url = `${this.apiUrl}/show`;
    this.http.get<Project[]>(url).subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onFileUpload(event: Event): void {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    if (!this.selectedProject) {
      console.error('No project selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('projectName', this.selectedProject.projectlist);

    const url = `${this.apiUrl}/upload`;
    const headers = new HttpHeaders();

    this.http.post(url, formData, { headers }).subscribe({
      next: (response) => {
        console.log('File uploaded successfully', response);
        this.snackBar.open('File added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.snackBar.open('Failed to upload file.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    });
  }

  handleProjectClick(project: Project): void {
    this.selectedProject = project;
    console.log('Clicked project:', project);
  }

  videos() {
    if (this.selectedProject) {
      this.router.navigate(['/videos'], { queryParams: { projectName: this.selectedProject.projectlist } });
    }
  }
}
