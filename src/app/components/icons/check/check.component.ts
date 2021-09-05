import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'icon-check',
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  `,
})
export class CheckComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
