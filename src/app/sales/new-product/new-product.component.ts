import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): any {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      manager: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  get f(): any { return this.productForm.controls; }


  onSubmit(): any {
    this.submitted = true;

    if (this.productForm.invalid) {
        return;
    }

    console.log(this.productForm.value);

  }
  onClear(): any {
    this.productForm.reset();
  }
}

