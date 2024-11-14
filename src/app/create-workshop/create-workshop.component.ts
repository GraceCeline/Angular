import { Component, inject, OnInit } from '@angular/core';
import { Workshop } from '../workshops/workshops.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { Tool } from '../workshops/tool.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-workshop',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, NgIf,],
  templateUrl: './create-workshop.component.html',
  styleUrl: './create-workshop.component.css',
  providers : [WorkshopsService, ]
})
export class CreateWorkshopComponent implements OnInit{

  tools: Tool[] = [];
  
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
      this.tools = tools;
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
    if ((event.target as HTMLInputElement).checked) {
      toolsArray.push(new FormControl({ id: tool.id, tool: tool.tool }));
    } else {
      const index = toolsArray.controls.findIndex(x => x.value.id === tool.id);
      toolsArray.removeAt(index);
    }
  }

  createWorkshop(){
    if (this.workshopForm.valid) {
    const workshopData = new Workshop(this.workshopForm.value as Partial<Workshop>);
    return this.workshopsService.createWorkshop(workshopData).subscribe({
      next: (response) => {
        console.log('Workshop saved successfully:', response);
        this.workshopForm.reset();
        },
      });
  } else {
    console.error('Form is invalid!');
    return null;
  }

  }
}
