import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Author } from './author';
import { MessageService } from './message.service';
  

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  
@Injectable()
export class AuthorService {
    
    private authorsUrl = 'api/authors';
    
    constructor(private messageService: MessageService, private httpClient: HttpClient) { }
    
    private log(message: string) {
        this.messageService.add('AuthorService: ' + message);
    }
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }
    
    //Create
    addAuthor(author: Author): Observable<Author> {
        return this.httpClient.post<Author>(this.authorsUrl, author, httpOptions)
                .pipe(
                    tap((author: Author) => this.log(`added author w/ id=${ author.id }`)),
                    catchError(this.handleError<Author>('addAuthor'))
                );
    }
    
    //Read
    getAuthors(): Observable<Author[]> {
        this.log('fetched authors');
        return this.httpClient.get<Author[]>(this.authorsUrl)
                .pipe(
                    tap(authors => this.log('fetched authors')),
                    catchError(this.handleError<Author[]>(`getAuthors`, []))
                );
    }
    
    getAuthor(id: number): Observable<Author> {
        const url = `${this.authorsUrl}/${id}`;
        return this.httpClient.get<Author>(url)
                .pipe(
                    tap(_ => this.log(`fetched author id=${id}`)),
                    catchError(this.handleError<Author>(`getAuthor id=${id}`))
                );
    }
    
    searchAuthors(term: string): Observable<Author[]> {
        if (!term.trim()) {
            return of([]);
        }
        
        return this.httpClient.get<Author[]>(`${this.authorsUrl}?name=${term}`)
                .pipe(
                    tap(_ => this.log(`found authors matching ${term}`)),
                    catchError(this.handleError<Author[]>('searchAuthors', []))
                )
    }
    
    //Update
    updateAuthor(author: Author): Observable<any> {
        return this.httpClient.put(this.authorsUrl, author, httpOptions)
                .pipe(
                    tap(_ => this.log(`updated author id=${author.id}`)),
                    catchError(this.handleError<any>('updateAuthor'))
                );
    }
    
    //Delete
    deleteAuthor(author: Author | number): Observable<Author> {
        const id = typeof author === 'number' ? author : author.id;
        const url = `${this.authorsUrl}/${id}`;
        
        return this.httpClient.delete<Author>(url, httpOptions)
                .pipe(
                    tap(_ => this.log(`deleted author id=${id}`)),
                    catchError(this.handleError<Author>('deleteAuthor'))
                );
    }
}
