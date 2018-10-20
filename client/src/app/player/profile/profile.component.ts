import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConfigService } from '../../common-service/url-config.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public isFormNotEditable: boolean;
    public profileForm: FormGroup;
    public userName: string;
    public editIcon = 'edit.png';
    public profileUpdateMessage: string;

    constructor(private fb: FormBuilder, private urlConfigService: UrlConfigService) { }

    ngOnInit() {
        this.isFormNotEditable = true;
        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]/)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]/)]],
            email: ['', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            secretQuestionGroup: this.fb.group({
                secretQuestion: ['Your Pet Name', Validators.required],
                secretAnswer: ['', Validators.required]
            })
        });
        // GETPROFILE
        this.urlConfigService.getWithHeaderApi('GETPROFILE').subscribe(
            (response) => {
                if (response.success) {
                    const userDetail = response.userDetails;
                    this.profileForm.patchValue({
                        firstName: userDetail.firstName,
                        lastName: userDetail.lastName,
                        email: userDetail.email,
                        gender: userDetail.gender,
                        dob: new Date(userDetail.dob).toISOString().substring(0, 10),
                        secretQuestionGroup: {
                            secretQuestion: userDetail.secretQuestion,
                            secretAnswer: userDetail.secretAnswer
                        }
                    });
                    console.log(userDetail.secretQuestion);
                    // this.profileForm.get('secretQuestionGroup.secretQuestion').setValue('userDetail.secretQuestion', {onlySelf: true});
                }
            }
        );
    }

    public editForm(): void {
        this.isFormNotEditable = !this.isFormNotEditable;
        this.profileUpdateMessage = '';
        if (this.isFormNotEditable) {
            this.editIcon = 'edit.png';
        } else {
            this.editIcon = 'notedit.png';

        }
        console.log(this.isFormNotEditable);
    }
    public updateProfile() {
        console.log(this.profileForm.value);
        const payLoad = {
            dob: this.profileForm.value.dob,
            email: this.profileForm.value.email,
            firstName: this.profileForm.value.firstName,
            gender: this.profileForm.value.gender,
            lastName: this.profileForm.value.lastName,
            secretQuestion: this.profileForm.value.secretQuestionGroup.secretQuestion,
            secretAnswer: this.profileForm.value.secretQuestionGroup.secretAnswer
        };

        this.urlConfigService.putWithHeaderApi('UPDATEPROFILE', payLoad).subscribe(
            (response) => {
                console.log(response);
                if (response.success) {
                    localStorage.setItem('user', JSON.stringify(response['updatedProfile'])); // Set user in local storage as string
                    const user = localStorage.getItem('user');
                    this.userName = JSON.parse(user).FirstName;
                    this.profileUpdateMessage = response.message;
                }
            }
        );
    }
}
