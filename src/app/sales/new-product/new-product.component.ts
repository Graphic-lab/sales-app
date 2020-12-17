import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  productForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      manager: ['', Validators.required],
      date: ['', Validators.required]
    });
  };
  get f() { return this.productForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
        return;
    }

    console.log(this.productForm.value);
    // this.router.navigate(['/welcome']);

  }
}

