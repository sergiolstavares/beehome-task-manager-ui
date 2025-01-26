import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddAndEditTaskModalComponent } from './add-edit-task-modal.component'

describe('AddAndEditTaskModalComponent', () => {
  let component: AddAndEditTaskModalComponent
  let fixture: ComponentFixture<AddAndEditTaskModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAndEditTaskModalComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AddAndEditTaskModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
