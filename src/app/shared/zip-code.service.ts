import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  private zipCodes: string[] = [];

  constructor() {
    this.initializeFromLocalStorage();
  }
  addZipCode(zipCode: string): void {
    // Check if the zip code already exists in the array
    if (this.indexOfZipCode(zipCode) === -1) {
        this.zipCodes.push(zipCode);
        this.saveZipCodesToLocalStorage();
    } else {
        // Alert the user that the zip code is already included
        alert("The zip code is already included.");
    }
}

// Function to check if the zip code already exists
indexOfZipCode(zipCode: string): number {
    return this.zipCodes.indexOf(zipCode);
}

  // Read operation
  getZipCodes(): string[] {
    return this.zipCodes.slice(); // Return a copy to prevent direct modification of the array
  }

  // Delete operation
  deleteZipCode(zipCode: string): void {
    const index = this.zipCodes.indexOf(zipCode);
    if (index !== -1) {
      this.zipCodes.splice(index, 1);
      this.saveZipCodesToLocalStorage();
    }
  }

  // Private method to save zip codes to local storage
  private saveZipCodesToLocalStorage(): void {
    localStorage.setItem('zipCodes', JSON.stringify(this.zipCodes));
  }

  // Initialize zip codes from local storage on service initialization
  private initializeFromLocalStorage(): void {
    const storedZipCodes = localStorage.getItem('zipCodes');
    if (storedZipCodes) {
      this.zipCodes = JSON.parse(storedZipCodes);
    }
  }
}
