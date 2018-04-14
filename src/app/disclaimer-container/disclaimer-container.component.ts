import { Component } from '@angular/core';
import { AppConfig } from '../../shared/app.config';

@Component({
  selector: 'app-disclaimer-container',
  templateUrl: './disclaimer-container.component.html',
  styleUrls: ['./disclaimer-container.component.scss']
})
export class DisclaimerContainerComponent {
  public build: string;
  public commit: string;

  constructor(private appConfig: AppConfig) {
    this.build = appConfig.build;
    this.commit = appConfig.commit;
  }
}
