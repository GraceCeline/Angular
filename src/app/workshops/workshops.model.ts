export class Workshop {
    id: number;
    workshop_title: string;
    description: string;
  
    constructor(id: number, title: string, description: string, date: Date) {
      this.id = id;
      this.workshop_title = title;
      this.description = description;
    }
}