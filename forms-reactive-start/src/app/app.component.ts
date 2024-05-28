import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  singupForm: FormGroup
  forbiddenUsername = ['Chirs', 'Best']

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.singupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.singupForm.valueChanges.subscribe((value) => {
      console.log(value)
    })
    this.singupForm.statusChanges.subscribe((status) => {
      console.log(status)
    })
    this.singupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': "test@gmail.com"
      },
      'gender': 'male',
      'hobbies': []
    })
    this.singupForm.patchValue({
      'userData':{
        'username':'Anna'
      }
    })
  }
  onSubmit() {
    console.log(this.singupForm)
    this.singupForm.reset()
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singupForm.get("hobbies")).push(control)
  }
  getControls() {
    return (<FormArray>this.singupForm.get('hobbies')).controls;
  }

  forbiddenNames(controls: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsername.indexOf(controls.value) !== -1) {
      return { "nameIsForbidden": true }
    }
    return null
  }
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ "emailIsForbidden": true })
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise
  }
}
