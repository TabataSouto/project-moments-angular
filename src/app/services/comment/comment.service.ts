import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IComment } from 'src/app/interfaces/IComment';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments/14/comments`

  constructor(private http: HttpClient) { }

  createComment(data: IComment): Observable<IResponse<IComment>> {
    const urlApi = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<IResponse<IComment>>(this.apiUrl, data);
  }
}
