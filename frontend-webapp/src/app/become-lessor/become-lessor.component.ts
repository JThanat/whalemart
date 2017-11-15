import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-become-lessor',
  templateUrl: './become-lessor.component.html',
  styleUrls: ['./become-lessor.component.scss'],
})
export class BecomeLessorComponent implements OnInit {
  becomeLessorForm: FormGroup;

  constructor(
    // private router: Router
  ) { }

  ngOnInit() {
    this.becomeLessorForm = new FormGroup({
      lessorName: new FormControl('', [Validators.required]),
      isOrganization: new FormControl('', [Validators.required]),
      organizationName: new FormControl(''),
      organizationContactName: new FormControl(''),
      organizationEmail: new FormControl(''),
      organizationPhone: new FormControl(''),
    }, { updateOn: 'blur' });
  }

  becomeLessor() {
    this.becomeLessorForm.updateValueAndValidity();
  }
}
