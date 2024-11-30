import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkshopComponent } from './delete-workshop.component';

describe('DeleteWorkshopComponent', () => {
  let component: DeleteWorkshopComponent;
  let fixture: ComponentFixture<DeleteWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWorkshopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
