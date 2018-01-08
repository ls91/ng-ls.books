import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
    selector: 'app-author-search',
    templateUrl: './author-search.component.html',
    styleUrls: ['./author-search.component.css']
})

export class AuthorSearchComponent implements OnInit {
    
    authors$: Observable<Author[]>;
    private searchTerms = new Subject<string>();
    
    constructor(private authorService: AuthorService) { }

    ngOnInit(): void {
        this.authors$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.authorService.searchAuthors(term))
        )
    }
    
    search(term: string): void {
        this.searchTerms.next(term)
    }
    
}
