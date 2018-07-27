import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAsRecipeComponent } from './save-as-recipe.component';

describe('SaveAsRecipeComponent', () => {
  let component: SaveAsRecipeComponent;
  let fixture: ComponentFixture<SaveAsRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveAsRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAsRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
