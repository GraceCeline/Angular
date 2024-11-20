import { Component, inject, OnInit } from '@angular/core';
import { Workshop } from '../workshops/workshops.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { Tool } from '../workshops/tool.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-create-workshop',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, NgIf, ModalComponent],
  templateUrl: './create-workshop.component.html',
  styleUrl: './create-workshop.component.css',
  providers : [WorkshopsService, ]
})
export class CreateWorkshopComponent implements OnInit{

  tool: Tool[] = [];
  errorMessages : string[] = [];
  
  private formBuilder = inject(FormBuilder);

  constructor (private fb: FormBuilder, private workshopsService : WorkshopsService) {}

  ngOnInit () : void {
    this.loadTools();
    this.handleTypeOfPresenceChange();
  }

   workshopForm = new FormGroup({
    workshop_title: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl(null, Validators.required),
      prerequisite: new FormControl(''),
      further_info_link : new FormControl(''),
      max_participants: new FormControl(null, [Validators.required, Validators.min(1)]),
      typeOfPresence: new FormControl('onsite', Validators.required),
      location: new FormControl(''),
      registrationLink: new FormControl(''),
      registration_deadline: new FormControl(null, Validators.required),
      isPrivate: new FormControl(false),
      tool: this.fb.array([])
  }); 

  loadTools(): void {
    this.workshopsService.getTools().subscribe((tools: Tool[]) => {
      this.tool = tools;
    });
  }

  handleTypeOfPresenceChange(): void {
    this.workshopForm.get('typeOfPresence')?.valueChanges.subscribe((value) => {
      const locationControl = this.workshopForm.get('location');
      if (value === 'online') {
        locationControl?.setValue('none');
      }
    });
  }

  onToolChange(tool: Tool, event: Event): void {
    const toolsArray = this.workshopForm.get('tool') as FormArray;
    console.log(toolsArray);
    if ((event.target as HTMLInputElement).checked) {
      toolsArray.push(new FormControl(tool));
    } else {
      const index = toolsArray.controls.findIndex(x => x.value.id === tool.id);
      toolsArray.removeAt(index);
    }
  }

  createWorkshop() : void{
    // if (this.workshopForm.valid) {
    const workshopData = new Workshop(this.workshopForm.value as Partial<Workshop>);
    this.workshopsService.createWorkshop(workshopData).subscribe(
      response => {
        console.log('Workshop saved successfully:', response);
        this.workshopForm.reset();
        },
      error => {
          console.error('Error caught:', error); // Log error to console
          this.errorMessages = this.workshopsService.handleError(error);
        }
    );
  // }

  }
}

