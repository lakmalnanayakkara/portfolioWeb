import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  responseMessage: any;
  key = environment.emailJSKey;
  serviceId = environment.mailService;
  templateId = environment.templateId;
  toMail: string = 'Pasindu Lakmal';

  contactForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [
        null,
        [Validators.required, Validators.pattern(Globalconstant.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(Globalconstant.emailRegex)],
      ],
      subject: [null, [Validators.required, Validators.minLength(10)]],
      message: [null, [Validators.required, Validators.minLength(20)]],
    });
  }

  onSubmit = async (): Promise<void> => {
    if (this.contactForm.invalid) {
      this.snackbar.openSnackBar('Invalid Data.Please check and resubmit.');
    } else {
      this.router.navigate(['/confirm']);
      emailjs.init(this.key);
      const formData = this.contactForm.value;
      let response = await emailjs.send(this.serviceId, this.templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      this.contactForm.reset();
    }
  };
}
