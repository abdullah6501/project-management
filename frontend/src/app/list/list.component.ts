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

interface ProjectFile {
  file_path: any;
  file_name: string;
  file_url: string;
  file_type: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  projects: Project[] = [];
  selectedFiles: { file: File, type: string }[] = [];
  selectedProject: Project | null = null;
  projectFiles: { videos: ProjectFile[], docs: ProjectFile[], misc: ProjectFile[] } = { videos: [], docs: [], misc: [] };
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

  onFileSelect(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles.push({ file: input.files[0], type });
    }
  }

  onUploadAll(): void {
    if (!this.selectedFiles.length) {
      console.error('No file selected');
      return;
    }
  
    if (!this.selectedProject) {
      console.error('No project selected');
      return;
    }
  
    const uploadPromises = this.selectedFiles.map(selectedFile => {
      const formData = new FormData();
      formData.append('file', selectedFile.file, selectedFile.file.name);
      formData.append('projectName', this.selectedProject!.projectlist);
      formData.append('category', selectedFile.type);  
  
      const url = `${this.apiUrl}/upload`;
      const headers = new HttpHeaders();
  
      return this.http.post(url, formData, { headers }).toPromise();
    });
  
    Promise.all(uploadPromises)
      .then(() => {
        console.log('All files uploaded successfully');
        this.snackBar.open('Files uploaded successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.fetchProjectFiles(this.selectedProject!.projectlist);
        this.selectedFiles = []; 
      })
      .catch(error => {
        console.error('Error uploading files:', error);
        this.snackBar.open('Failed to upload files.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      });
  }
  

  handleProjectClick(project: Project): void {
    this.selectedProject = project;
    console.log('Clicked project:', project);
    this.fetchProjectFiles(project.projectlist);
  }

  fetchProjectFiles(projectName: string): void {
    const categories = ['videos', 'docs', 'misc'];
    this.projectFiles = { videos: [], docs: [], misc: [] };
  
    categories.forEach(category => {
      const url = `${this.apiUrl}/files/${projectName}/${category}`;
      this.http.get<ProjectFile[]>(url).subscribe({
        next: (files) => {
          files.forEach(file => {
            const fileUrl = `${this.apiUrl}/${file.file_path}`;
            const projectFile: ProjectFile = {
              file_name: file.file_name, 
              file_url: fileUrl, 
              file_type: category, 
              file_path: file.file_path
            };
  
            if (category === 'videos') {
              this.projectFiles.videos.push(projectFile);
            } else if (category === 'docs') {
              this.projectFiles.docs.push(projectFile);
            } else {
              this.projectFiles.misc.push(projectFile);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching project files:', error);
        }
      });
    });
  }
  

  getFileIcon(fileType: string): string {
    switch (fileType) {
      case 'mp4':
        return 'video_library';
      case 'ppt':
      case 'pptx':
        return 'slideshow';
      case 'doc':
      case 'docx':
      case 'pdf':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  handleFileClick(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }
}
