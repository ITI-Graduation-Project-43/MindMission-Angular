import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingComponent } from './profile-setting.component';
import { RouterModule } from '@angular/router';
import { ProfileSettingRoutingModule } from './profile-setting-routing.module';
import { ProfileComponent } from './Components/profile/profile.component';
import { SecurityComponent } from './Components/security/security.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { CloseAccoutComponent } from './Components/close-accout/close-accout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeactivateAccoutComponent } from './Components/deactivate-accout/deactivate-accout.component';
import { ConfirmCloseAccountComponent } from './Components/confirm-close-account/confirm-close-account.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    ProfileSettingComponent,
    ProfileComponent,
    SecurityComponent,
    PaymentComponent,
    PrivacyComponent,
    NotificationsComponent,
    CloseAccoutComponent,
    DeactivateAccoutComponent,
    ConfirmCloseAccountComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProfileSettingRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
  ]
})
export class ProfileSettingModule { }
