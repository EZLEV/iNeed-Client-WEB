import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../shared/services/services-auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/map';

@Injectable()
export class MustBeAdminGuard implements CanActivate {

  constructor(public snackBar: MatSnackBar, private router: Router, private authService: AuthService, private db: AngularFireDatabase) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem(`firebase:authUser:${environment.firebase.apiKey}:[DEFAULT]`));
    console.log(next.data);
    let canActivate;
    if (user != null) {
      return this.db.object(`users/${user.uid}`)
        .map((currentUser) => {
          if (next.data['sudo']) {
            canActivate = ((<number>currentUser.permissionLevel) >= 3);
          } else if (next.data['normal']) {
            canActivate = ((<number>currentUser.permissionLevel) >= 2);
          } else {
            canActivate = ((<number>currentUser.permissionLevel) >= 1);
          }

          if (!canActivate) {
            this.router.navigate(['/shopkeeper/dashboard/home']);
            this.snackBar.open('Você não tem permissão suficiente', 'ENTENDI');
            console.log('can\'t');
            return false;
          }
          console.log('can');
          return true;
        });
    } else {
      this.router.navigate(['/subscribe']);
      console.log('can\'t');
      return false;
    }
  }
}
