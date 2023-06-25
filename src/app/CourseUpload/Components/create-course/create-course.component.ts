import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Category } from 'src/app/Models/category';
import { APIService } from 'src/app/Shared/Services/api.service';
import { APIResponseVM } from 'src/app/Shared/ViewModels/apiresponse-vm';
import { Language } from '../../../Models/Enums/CourseLanguage';
import { Level } from '../../../Models/Enums/CourseLevel';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { Course } from 'src/app/Models/course';
import { UploadService } from 'src/app/Shared/Services/upload.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  inputFileShowStatus: boolean = true;
  renderImage: string | null = null;
  languages = Object.values(Language).filter(
    (language) => typeof language === 'string'
  );
  levels = Object.values(Level).filter((level) => typeof level === 'string');
  CreateCourse: FormGroup;
  categories: Category[] = [];
  courseImg: File | undefined;
  constructor(
    private fb: FormBuilder,
    private apiService: APIService,
    private router: Router,
    private notification: NotificationService,
    private uploadService: UploadService
  ) {
    this.CreateCourse = this.fb.group({
      instructorId: ['aa8dc98a-af68-4c68-8d65-99106ba0cda7'],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      level: ['', Validators.required],
      courseImage: [''],
      learningItems: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
      enrollmentItems: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
        }),
      ]),
      courseRequirements: this.fb.array([
        this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
        }),
      ]),
    });
  }
  ngOnInit(): void {
    this.apiService
      .getAllItem('category/type/2')
      .subscribe((data: APIResponseVM) => {
        this.categories = data.items;
      });
      
  }

  get title() {
    return this.CreateCourse.get('title');
  }
  get categoryId() {
    return this.CreateCourse.get('categoryId');
  }
  get shortDescription() {
    return this.CreateCourse.get('shortDescription');
  }
  get description() {
    return this.CreateCourse.get('description');
  }
  get language() {
    return this.CreateCourse.get('language');
  }
  get price() {
    return this.CreateCourse.get('price');
  }
  get level() {
    return this.CreateCourse.get('level');
  }
  get CourseTeachings() {
    return this.CreateCourse.get('learningItems') as FormArray;
  }
  get TargetStudents() {
    return this.CreateCourse.get('enrollmentItems') as FormArray;
  }
  get CourseRequirements() {
    return this.CreateCourse.get('courseRequirements') as FormArray;
  }

  addCourseTeachingInput() {
    this.addFormArrayInput(this.CourseTeachings);
  }
  addTargetStudentInput() {
    let hasEmptyFields = false;
    for (let i = 0; i < this.TargetStudents.length; i++) {
      const formGroup = this.TargetStudents.at(i) as FormGroup;
      if (formGroup.controls?.['title'].value.trim() == '') {
        this.notification.notify('Complete Fields', 'error');
        hasEmptyFields = true;
      }
    }
    if (!hasEmptyFields) {
      const newForm = this.fb.group({
        title: ['', Validators.required],
      });
      this.TargetStudents.push(newForm);
    }
  }
  addCourseRequirmentInput() {
    this.addFormArrayInput(this.CourseRequirements);
  }

  onFileSelected($event: any) {
    this.courseImg = $event.target.files[0];
    const file = $event.target.files[0];
    this.uploadService.uploadFile(file, 'Image').subscribe(
      (response) => {
        if (response.success) {
          (this.CreateCourse.value.courseImage =
            (response.items[0] as string) || null),
            (this.renderImage = (response.items[0] as string) || null),
            this.notification.notify('File uploaded successfully');
          this.inputFileShowStatus = false;
        } else {
          this.notification.notify('File upload error', 'error');
        }
      },
      (error) => {
        this.notification.notify('File upload error', 'error');
      }
    );
  }

  CreateCourseSubmit() {
    if (this.CreateCourse.invalid) {
      return;
    }

    this.CreateCourse.value.courseImage = this.renderImage;
    const postCourseDto = JSON.parse(JSON.stringify(this.CreateCourse.value));

    const observer = {
      next: (result: any) => {
        this.router.navigate(['createCourse/step2']);
      },
      error: (err: any) => {
        console.log(err.message);
      },
    };
    localStorage.setItem('CreatedCourse', JSON.stringify(postCourseDto));
    console.log(postCourseDto);
    this.apiService.addItem('Course', postCourseDto).subscribe(observer);
  }

  addFormArrayInput(formArray: FormArray) {
    let hasEmptyFields = false;
    for (let i = 0; i < formArray.length; i++) {
      const formGroup = formArray.at(i) as FormGroup;
      if (
        formGroup.controls?.['title'].value.trim() == '' ||
        formGroup.controls?.['description'].value.trim() == ''
      ) {
        this.notification.notify('Complete Fields', 'error');
        hasEmptyFields = true;
      }
    }
    if (!hasEmptyFields) {
      const newForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
      formArray.push(newForm);
    }
  }
  back() {
    this.router.navigate([`instructor`]);
  }
  onDeleteImage() {
    this.courseImg = undefined;
    this.CreateCourse.value.courseImage = '';
    this.inputFileShowStatus = true;
  }
}
