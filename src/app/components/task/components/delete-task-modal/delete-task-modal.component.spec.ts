import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DeleteTaskModalComponent } from './delete-task-modal.component'

describe('DeleteTaskModalComponent', () => {
  let component: DeleteTaskModalComponent
  let fixture: ComponentFixture<DeleteTaskModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTaskModalComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(DeleteTaskModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
