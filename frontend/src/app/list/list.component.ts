import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;

  projects: Project[] = [];
  selectedFiles: { file: File, type: string }[] = [];
  selectedProject: Project | null = null;
  projectToDelete: Project | null = null;
  projectFiles: { videos: ProjectFile[], docs: ProjectFile[], misc: ProjectFile[] } = { videos: [], docs: [], misc: [] };
  deleteMode = false;
  fileDeleteMode = false;
  public apiUrl = environment.PORTFOLIO_BASEURL;
  public dialogRef: MatDialogRef<any> | null = null;

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
              this.projectFiles.videos.unshift(projectFile);
            } else if (category === 'docs') {
              this.projectFiles.docs.unshift(projectFile);
            } else {
              this.projectFiles.misc.unshift(projectFile);
            }
          });
        },
        error: (error) => {
          console.error('Error fetching project files:', error);
        }
      });
    });
  }

  toggleDeleteMode(): void {
    this.deleteMode = !this.deleteMode;
  }

  toggleFileDeleteMode(): void {
    this.fileDeleteMode = !this.fileDeleteMode;
  }

  openDeleteDialog(project: Project): void {
    this.projectToDelete = project;
    this.dialog.open(this.deleteDialog);
  }

  onCancelDelete(): void {
    this.dialog.closeAll();
  }

  onConfirmDelete(): void {
    if (!this.projectToDelete) return;

    const url = `${this.apiUrl}/softdelete`;
    const body = { projectName: this.projectToDelete.projectlist };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put(url, body, { headers }).subscribe({
      next: () => {
        console.log(`Project ${this.projectToDelete?.projectlist} soft-deleted successfully`);
        this.snackBar.open('Project soft-deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.projects = this.projects.filter(p => p.projectlist !== this.projectToDelete?.projectlist);
        this.dialog.closeAll();
        this.projectToDelete = null;
      },
      error: (error) => {
        console.error('Error soft-deleting project:', error);
        this.snackBar.open('Failed to soft-delete project.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    });
  }

  confirmDeleteFile(file: ProjectFile): void {
    this.dialogRef = this.dialog.open(this.confirmationDialog, {
      data: file
    });
  }

  onConfirmDeleteFile(data: ProjectFile): void {
    if (data.file_path) {
      this.deleteFile(data, data.file_type);
    }
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  deleteFile(file: ProjectFile, category: string): void {
    if (this.selectedProject) {
      const projectName = this.selectedProject.projectlist;
      const fileName = file.file_name; 
      const url = `${this.apiUrl}/deleteFile`;
      const body = { projectName, category, fileName };

      this.http.delete(url, { body }).subscribe({
        next: () => {
          console.log('File deleted successfully');
          this.snackBar.open('File deleted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
          });
          this.fetchProjectFiles(projectName); 
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          if (error.status === 400 && error.error && error.error.error) {
            this.snackBar.open(`Failed to delete file: ${error.error.error}`, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          } else {
            this.snackBar.open('Failed to delete file.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            });
          }
        }
      });
    }
  }

  // getFileIcon(fileType: string): string {
  //   switch (fileType) {
  //     case 'mp4':
  //       return 'video_library';
  //     case 'ppt':
  //     case 'pptx':
  //       return 'slideshow';
  //     case 'doc':
  //     case 'docx':
  //     case 'pdf':
  //       return 'description';
  //     default:
  //       return 'insert_drive_file';
  //   }
  // }

  handleFileClick(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }
}
