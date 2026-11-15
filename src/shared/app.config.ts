import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface Config {
  build: string;
  commit: string;
}

@Injectable()
export class AppConfigService {
  private readonly http = inject(HttpClient);

  build = '';
  commit = '';

  public async load(): Promise<void> {
    try {
      const config = await firstValueFrom(this.http.get<Config>('./environment.json'));
      this.build = config.build;
      this.commit = config.commit;
    } catch (error) {
      // The build information is only displayed in the disclaimer, it should never prevent the app from starting
      console.error('Could not load environment.json', error);
    }
  }
}
