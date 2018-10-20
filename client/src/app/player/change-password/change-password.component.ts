import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { UrlConfigService } from '../../common-service/url-config.service';


function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');
  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }
  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public userName: string;
  public changePasswordMessage: string;
  constructor(private fb: FormBuilder, private urlConfigService: UrlConfigService) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: passwordMatcher })
    });
  }

  updatePassword() {
    const payLoad = {
      password: this.changePasswordForm.value.passwordGroup.password
    };

    this.urlConfigService.putWithHeaderApi('CHANGEPASSWORD', payLoad).subscribe(
      (response) => {
        console.log(response);
        this.changePasswordMessage = response.message;
      }
    );
  }

}
