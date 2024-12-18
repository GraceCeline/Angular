import { Component, inject, OnInit } from '@angular/core';
import { Workshop } from '../workshops/workshops.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { Tool } from '../workshops/tool.model';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-workshop',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, NgIf, ModalComponent, MatCardModule, MatFormFieldModule ],
  templateUrl: './create-workshop.component.html',
  styleUrl: './create-workshop.component.css',
  providers : [WorkshopsService, ]
})
export class CreateWorkshopComponent implements OnInit{

  tool: Tool[];
  errorMessages : string[];
  message: string;
  workshop_id : number;
  toolRetrieved : number[];
  isEditMode: boolean = false;
  statusCode: number;
  

  constructor (private route : ActivatedRoute, private fb: FormBuilder, private workshopsService : WorkshopsService, private router:Router, private modalService : NgbModal, private http: HttpClient) {}

  ngOnInit () : void {
    this.loadTools();
    this.handleTypeOfPresenceChange();

    const w_id = this.route.snapshot.paramMap.get('id');
    if (w_id) {
      this.isEditMode = true;
      this.workshop_id = +w_id;
      this.workshopsService.getDetailWorkshop(this.workshop_id).subscribe((data: Partial<Workshop>) => {
        console.log(data);
        this.workshopForm.patchValue(data);
        this.toolRetrieved = data.tool || [];
      });
      
    } 
  }

   workshopForm = new FormGroup({
    workshop_title: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl(new Date(), [Validators.required, this.futureDateValidator()]),
      prerequisite: new FormControl(''),
      further_info_link : new FormControl(''),
      max_participants: new FormControl(0,[Validators.required, Validators.min(1)]),
      typeOfPresence: new FormControl('onsite', Validators.required),
      location: new FormControl(''),
      registrationLink: new FormControl(''),
      registration_deadline: new FormControl(new Date(), [Validators.required, this.futureDateValidator()]),
      isPrivate: new FormControl(false),
      tool: this.fb.array([])
  }); 

   loadTools() {
    this.workshopsService.getTools().subscribe(data => {
      // const tool_list = data.results;
      this.tool = data.results;
      console.log(this.tool);
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
      toolsArray.push(new FormControl(tool.id));
    } else {
      const index = toolsArray.controls.findIndex(x => x.value.id === tool.id);
      toolsArray.removeAt(index);
    }
  }


  isToolSelected(id: number): boolean {
    const selectedTools = this.workshopForm.value.tool || [];
    return selectedTools.includes(id);
  }

  submitWorkshop() : void{
    const workshopData = new Workshop(this.workshopForm.value as Partial<Workshop>);
    console.log(workshopData.tool);
    if (this.workshop_id) {
      this.workshopsService.updateWorkshop(this.workshop_id, workshopData).subscribe({
        next: (response) => {
          console.log(response.status);
          this.workshopsService.openModal(response.status,"Updated successfully"); // Added manually for now since getting http status is problematic
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Update failed:', error);
        }
      });
    } else   {
      this.workshopsService.createWorkshop(workshopData).subscribe(
        response => {
          console.log('Workshop saved successfully:', response.status);
          this.workshopsService.openModal(response.status, "Workshop saved successfully ");
          this.workshopForm.reset();
          this.router.navigate(['']);
          },
        error => {
            console.error('Error caught:', error); // Log error to console
            this.errorMessages = this.workshopsService.handleError(error);
          }
      );
    }
  }



  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      return selectedDate >= currentDate ? null : { futureDate: true };
    };   
  }
}

