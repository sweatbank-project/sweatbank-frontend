import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EuriborService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = 'https://data-api.ecb.europa.eu/service/data';

  getCombinedEuriborData(): Observable<any> {
    const euribor3MD$ = this.client.get(
      `${this.baseUrl}/FM/M.U2.EUR.RT.MM.EURIBOR3MD_.HSTA`,
      {
        params: {
          startPeriod: '2024-03-01',
          detail: 'dataonly',
          format: 'jsondata',
        },
      }
    );

    const euribor6MD$ = this.client.get(
      `${this.baseUrl}/FM/M.U2.EUR.RT.MM.EURIBOR6MD_.HSTA`,
      {
        params: {
          startPeriod: '2024-03-01',
          detail: 'dataonly',
          format: 'jsondata',
        },
      }
    );

    const euribor1YD$ = this.client.get(
      `${this.baseUrl}/FM/M.U2.EUR.RT.MM.EURIBOR1YD_.HSTA`,
      {
        params: {
          startPeriod: '2024-03-01',
          detail: 'dataonly',
          format: 'jsondata',
        },
      }
    );

    return forkJoin([euribor3MD$, euribor6MD$, euribor1YD$]).pipe(
      catchError((error) => {
        console.error('Error fetching Euribor data:', error);
        return [];
      })
    );
  }
}
