import { Component, OnInit } from '@angular/core';
import { Workshop } from '../workshops/workshops.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkshopsService } from '../workshops.service';
import { NgFor, NgIf } from '@angular/common';
import { Tool } from '../workshops/tool.model';

@Component({
  selector: 'app-detail-workshop',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './detail-workshop.component.html',
  styleUrl: './detail-workshop.component.css',
  providers: [WorkshopsService,]
})
export class DetailWorkshopComponent implements OnInit {

  workshop: Workshop | undefined;
  tool: Tool[];
  toolIds: number[] = [];

  constructor(private route: ActivatedRoute, private workshopsService: WorkshopsService) { }

  ngOnInit(): void {
    const workshop_id = +this.route.snapshot.paramMap.get('id')!;

    this.workshopsService.getDetailWorkshop(workshop_id).subscribe(
      (data) => {
        this.workshop = data;
        //´this.toolIds = this.converttoIds(this.workshop.tool);
      },
      error => console.error('Error fetching workshop:', error)
    );

    this.loadTools();
  }

  loadTools(): void {
    this.workshopsService.getTools().subscribe((tools: any) => {
      this.tool = tools.results;
      console.log(this.tool);
    });
  }

  getToolName(too: number): string {
    if (!this.tool || this.tool.length === 0) {
      console.log("No tool data")
  }

    const tool = this.tool.find((t) => t.id === too);
    return tool ? tool.tool : 'Unknown Tool';
  }


}
