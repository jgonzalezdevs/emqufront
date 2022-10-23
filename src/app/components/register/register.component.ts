import { Component } from "@angular/core";
import { UsersService } from "src/app/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  email: string;
  password: string;
  password2: string;
  confirm: string;
  passwordError: boolean;

  constructor(public userService: UsersService) {}

  register() {
    const user = { email: this.email, password: this.password, password2: this.password2 };
    this.userService.register(user).subscribe(data => {
      console.log(data);
      alert('Usuario registrado correctamente')
    });
  }
}