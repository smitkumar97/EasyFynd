import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { StorageService } from '../services/storage.service';
import { DataTransferService } from './../services/data-transfer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
  template: 'passed in {{ editCompanyDetails }}',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // { provide: MdDialogRef, useValue: {} }, --> deprecated
    // { provide: MatDialogRef, useValue: { editCompanyDetails: []} }
  ],
})
export class AddCompanyComponent implements OnInit {
  date = new FormControl(moment());
  public formData: FormGroup;
  message = 'Form Data Saved Successfully';
  action = 'Done';
  colorControl = new FormControl('primary' as ThemePalette);
  maxDate = new Date();
  companyFormData: string[] = [];
  @ViewChild('pickerr') datePickerElement = MatDatepicker;
  skillArr = [
    'Java',
    'Angular',
    'CSS',
    'HTML',
    'Javascript',
    'UI',
    'SQL',
    'React',
    'PHP',
    'Git',
    'AWS',
    'Python',
    'Django',
    'C',
    'C++',
    'C#',
    'Unity',
    'R',
    'AI',
    'NLP',
    'Photoshop',
    'Nodejs',
  ];

  designationArr = [
    'Developer',
    'Manager',
    'System Admin',
    'Team Lead',
    'PM',
    'Cloud Specialist',
  ];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private storageservice: StorageService,
    private datatransferservice: DataTransferService,
    @Optional() @Inject(MAT_DIALOG_DATA) public editCompanyDetails: any
  ) {
    this.formData = this.fb.group({
      companyName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      address: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{15}$'),
      ]),
      createdAt: new FormControl(new Date()),
      empInfo: this.fb.array([]),
    });
    console.log(this.editCompanyDetails);
  }
  ngOnInit(): void {
    this.addEmployee();
    this.employeesInfo();
    if (
      this.editCompanyDetails &&
      Object.keys(this.editCompanyDetails)?.length
    ) {
      this.formData.controls['companyName'].setValue(
        this.editCompanyDetails.companyName
      );
      this.setValues();
    }
  }

  setValues() {
    this.formData.controls['companyName'].setValue(
      this.editCompanyDetails.companyName
    );
    this.formData.controls['address'].setValue(this.editCompanyDetails.address);
    this.formData.controls['email'].setValue(this.editCompanyDetails.email);
    this.formData.controls['phone'].setValue(this.editCompanyDetails.phone);
    this.formData.controls['createdAt'].setValue(
      this.editCompanyDetails.createdAt
    );
    // let modalDataContainer = [];
    // modalDataContainer.push(this.editCompanyDetails);
    // for (const empInfo in modalDataContainer) {
    //   console.log('empInfo', empInfo);
    // }
    // this.patchControls(modalDataContainer);
    // this.formData.controls['empInfo']['empName'].setValue(this.editCompanyDetails.empInfo[0])
  }

  // setEmployeeValues(data: any) {
  //   console.log('contacts', data);
  //    const formArray = [];

  //    for(let empInfo of data){
  //      formArray.push(
  //        this.fb.group({
  //         empName: [empInfo.empName],
  //          designation: [empInfo.designation],
  //          joiningDate: [empInfo.joiningDate],
  //          empEmail: [empInfo.empEmail],
  //          empPhone: [empInfo.empPhone],
  //       })
  //     );
  //    }
  //   return formArray;
  //  }

  //  createAgreementsGroup(empInfo: any) {
  //   return this.fb.group({
  //     empName: [empInfo.empName],
  //     designation: [empInfo.designation],
  //     joiningDate: [empInfo.joiningDate],
  //     empEmail: [empInfo.empEmail],
  //     empPhone: [empInfo.empPhone],
  //     skills: this.fb.array(this.setEmployeeValues(empInfo))
  //   });
  // }

  //  patchControls(data2: any) {
  //   const control = <FormArray>this.formData.get('empInfo');
  //   console.log(control.value);

  //   return
  //   // const control2 = <FormArray>this.mainForm.get('contacts');
  //   console.log('form here', this.formData.controls['empInfo']);
  //   for (const obj of data2) {
  //     const addrCtrl = this.createAgreementsGroup(obj);
  //     control.push(addrCtrl);
  //     // console.log(this.mainForm.value);
  //   }
  //   //  console.log('patched here',this.mainForm)
  // }
  private employeeInfoGroup(): FormGroup {
    return new FormGroup({
      empName: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      designation: new FormControl(this.designationArr[0]),
      joiningDate: new FormControl('', [Validators.required]),
      empEmail: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      empPhone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{15}$'),
      ]),
      skillInfo: new FormArray([this.skillInfoGroup()]),
      educationInfo: new FormArray([this.educationInfoGroup()]),
    });
  }

  private skillInfoGroup(): FormGroup {
    return new FormGroup({
      skillName: new FormControl(this.skillArr[0], [Validators.required]),
      skillRating: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.max(5),
        Validators.min(1),
      ]),
    });
  }

  private educationInfoGroup(): FormGroup {
    return new FormGroup({
      instituteName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      course: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      graduationYear: new FormControl('', [Validators.required]),
    });
  }

  employeesInfo(): FormArray {
    return this.formData.get('empInfo') as FormArray;
  }

  addEmployee() {
    this.employeesInfo().push(this.employeeInfoGroup());
  }

  removeEmployee(empIndex: number) {
    this.employeesInfo().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employeesInfo().at(empIndex).get('skillInfo') as FormArray;
  }

  employeeeEducation(empIndex: number): FormArray {
    return this.employeesInfo().at(empIndex).get('educationInfo') as FormArray;
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.skillInfoGroup());
  }

  addEmployeeEdu(empIndex: number) {
    this.employeeeEducation(empIndex).push(this.educationInfoGroup());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  removeEmployeeEdu(empIndex: number, eduIndex: number) {
    this.employeeeEducation(empIndex).removeAt(eduIndex);
  }

  onSubmit() {
    this.companyFormData = this.storageservice.getData('formData');
    this.companyFormData.push(this.formData.value);
    this.storageservice.saveData('formData', this.companyFormData);
    this.formData.reset();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
