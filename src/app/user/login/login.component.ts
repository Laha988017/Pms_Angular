import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';
  registerData!: User; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit(f:any){
    console.log(f.value)
    this.registerData = f.value
    this.authenticationService.login(this.registerData)
      .pipe(first())
      .subscribe(
        res=>{
          if(res.status==200){
            alert(res.message)
          }
          else{
            alert(res.message)
          }
          console.log(res)
        },
        error=>{
          console.log(error)
        }
      )
    //window.location.reload();
  }


}
