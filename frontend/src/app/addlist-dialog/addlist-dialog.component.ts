import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addlist-dialog',
  templateUrl: './addlist-dialog.component.html',
  styleUrls: ['./addlist-dialog.component.css']
})
export class AddlistDialogComponent {

  textInput: string = '';
  public apiUrl = environment.PORTFOLIO_BASEURL;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddlistDialogComponent>) { }

  submitForm() {
    const url = `${this.apiUrl}/text`;

    this.http.post(url, { data: this.textInput }).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
        this.snackBar.open('Project added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
        this.textInput = '';
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error saving data:', error);
        this.snackBar.open('Failed to add Project.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
