import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'icon-plus',
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
        d="M12 4v16m8-8H4"
      />
    </svg>
  `,
})
export class PlusIcon implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
