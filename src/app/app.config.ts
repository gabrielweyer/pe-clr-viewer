import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

interface Config {
  build: string;
  commit: string;
}

@Injectable()
export class AppConfig {
  public build: string;
  public commit: string;

  constructor(private http: HttpClient) {}

  public load() {
    return new Promise((resolve, reject) => {
      this.http
        .get<Config>('./assets/environment.json')
        .pipe(catchError(this.handleError))
        .subscribe(config => {
          this.build = config.build;
          this.commit = config.commit;
          resolve(true);
        });
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error when reading the configuration file: ';

    if (error.error.error instanceof SyntaxError) {
      errorMessage += 'malformed JSON';
    } else if (error.status === 404) {
      errorMessage += 'file not found';
    } else {
      errorMessage += 'other error';
    }

    errorMessage += ' - ' + JSON.stringify(error);

    return new ErrorObservable(errorMessage);
  }
}
