import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  public pickRandomFromList<T>(sourceList: T[]): T {
    return sourceList[Math.floor(Math.random() * sourceList.length)];
  }
}
