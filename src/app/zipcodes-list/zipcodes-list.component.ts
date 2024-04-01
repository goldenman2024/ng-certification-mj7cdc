// zip-codes.component.ts
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ZipCodeService } from '../shared/zip-code.service';

@Component({
  selector: 'app-zip-codes',
  templateUrl: 'zipcodes-list.component.html',
  styleUrls: ['zipcodes-list.component.css'],
})
export class ZipCodesComponent {
  newZipCode: string = '';


  addZipCode(): void {
    if (this.newZipCode.trim()) {
      this.zipCodeService.addZipCode(this.newZipCode.trim());
      this.newZipCode = '';
      this.refreshZipCodes();
    }
  }
  zipCodes: string[] = [];

  constructor(private zipCodeService: ZipCodeService) {
    this.refreshZipCodes();
  }


  refreshZipCodes(): void {
    this.zipCodes = this.zipCodeService.getZipCodes();
  }

  onDeleteZipCode(zipCode: string):void{
    this.zipCodeService.deleteZipCode(zipCode);
    this.refreshZipCodes();
  }
}
