import { max } from "rxjs";
import { Tool } from "./tool.model";

export class Workshop {
    id: number;
    workshop_title: string;
    description: string;
    tutor : string;
    date: Date ;
    further_info_link? : string;
    prerequisite : string;
    max_participants : number;
    type_of_presence: 'onsite' | 'hybrid' | 'online';
    location: string;
    registration_link?: string;  
    registration_deadline: Date;
    is_private: boolean;
    tool: number[] = [];
  
   
      constructor(data: Partial<Workshop> = {}) {

        if (!data.workshop_title) {
          console.log("Workshop Title required");
      }
        this.id = data.id || 0;
        this.workshop_title = data.workshop_title || '';
        this.description = data.description || '';
        this.tutor = data.tutor || '';
        this.date = data.date || new Date();
        this.further_info_link = data.further_info_link || '';
        this.prerequisite = data.prerequisite || '';
        this.max_participants = data.max_participants ?? 0;
        this.type_of_presence = data.type_of_presence || 'onsite';
        this.location = data.location || '';
        this.registration_link = data.registration_link || '';
        this.registration_deadline = data.registration_deadline || new Date();
        this.is_private = data.is_private || false;
        this.tool = data.tool || [];
      }

    getDate():Date {
      return this.date
    }


}
