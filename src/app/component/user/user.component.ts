
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  userForm!: FormGroup;
  newUser!: User;
  searchTitle: string;
  searchStartDate: Date;
  users: User[] = [];
  //searchResult!: User;
  searchByTitleForm!: FormGroup;
  searchByStartDateForm!: FormGroup;
  currentUser!: User;
  searchResults!: any[];
  updatebtn=false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  //If wont initialize disappers the all data displayed
    this.searchTitle = '';
    this.searchStartDate = new Date(); 
    this.searchResults = [];

    this.createForm();
    this.searchTitle= ''
    this.searchStartDate= new Date();


    this.searchByTitleForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.searchByStartDateForm = this.formBuilder.group({
      startDate: ['', [Validators.required, Validators.email]]
    });

    this.getAllUsers();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      id:[],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      duration: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      syllabus: ['']
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      this.newUser = this.userForm.value;
      this.userService.createUser(this.newUser).subscribe(
        (user) => {
          this.users.push(user);
          this.userForm.reset();
        }
        // ,
        // (error) => {
        //   console.error(error);
        // }
      );
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      }
      // ,
      // (error) => {
      //   console.error(error);
      // }
    );
  }

  // updateUser(id: number): void {
  //   const updatedUser = this.userForm.value;
  //   this.userService.updateUser(id, updatedUser).subscribe(
  //     (user) => {
  //       const index = this.users.findIndex(u => u.id === id);
  //       this.users[index] = user;
  //       this.userForm.reset();
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }


  updateUser(): void {
    if (this.userForm.valid && this.currentUser) {
      const updatedUser: User = {
        id: this.currentUser.id,
        title: this.userForm.value.title,
        description: this.userForm.value.description,
        instructor: this.userForm.value.instructor,
        duration: this.userForm.value.duration,
        startDate: this.userForm.value.startDate,
        endDate: this.userForm.value.endDate,
        syllabus: this.userForm.value.syllabus,
       
      };

      this.userService.updateUser(updatedUser.id, updatedUser).subscribe((user: User) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
          this.userForm.reset();
          //this.currentUser = null;
        }
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== id);
      }
      // ,
      // (error) => {
      //   console.error(error);
      // }
    );
  }

  getUserById(userId: number): void {
    this.userService.getUser(userId).subscribe((user: User) => {
      this.currentUser = user;
      this.userForm.patchValue(user);
    });
    this.updatebtn=true;
  }


  // searchByTitle(): void {
  //   if (this.searchTitle) {
  //     this.userService.searchByTitle(this.searchTitle).subscribe(
  //       (users) => {
  //         this.users = users;
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

  // searchByStartDate(): void {
  //   if (this.searchStartDate) {
  //     this.userService.searchByStartDate(this.searchStartDate).subscribe(
  //       (users) => {
  //         this.users = users;
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }


  // searchByTitle(): void {
  //   if (this.searchByTitleForm.valid) {
  //     const title = this.searchByTitleForm.value.title;
  //     this.userService.searchByTitle(title).subscribe((user: User) => {
  //       this.searchResult = user;
  //       alert(this.searchResult)
  //       this.searchByTitleForm.reset();
  //     });
  //   }
  // }
 
  // searchByStartDate(): void {
  //   // alert(this.searchByStartDateForm.valid)
  //   // if (this.searchByStartDateForm.valid) {
  //   //   alert('2')
  //     const date = this.searchByStartDateForm.value.startDate;
  //     this.userService.searchByStartDate(date).subscribe((user: User) => {
  //       this.searchResult = user;
  //       this.searchByStartDateForm.reset();
  //     });
  //   // }
  // }

  searchByTitle(): void {
    if (this.searchByTitleForm.valid) {
      const title = this.searchByTitleForm.value.title;
      this.userService.searchByTitle(title).subscribe((result:any) => {
        this.searchResults = result;    
        this.searchByTitleForm.reset();
      });
    }
  }
 
  searchByStartDate(): void {
    // alert(this.searchByStartDateForm.valid)
    // if (this.searchByStartDateForm.valid) {
      const date = this.searchByStartDateForm.value.startDate;
      this.userService.searchByStartDate(date).subscribe((result:any) => {
        this.searchResults = result;
        this.searchByStartDateForm.reset();
      });
    // }
  }
 
}
