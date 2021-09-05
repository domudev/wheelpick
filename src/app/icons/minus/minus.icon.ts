import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'icon-minus',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20 12H4"
      />
    </svg>
  `,
})
export class MinusIcon implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}