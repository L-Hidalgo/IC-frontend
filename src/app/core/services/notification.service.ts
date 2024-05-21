import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 5000,
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
