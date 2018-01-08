import { Component, OnInit } from '@angular/core';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    authors: Author[] = [];
    
    constructor(private authorService: AuthorService) { }

    ngOnInit() {
        this.getAuthors();
    }
    
    getAuthors():void {
        this.authorService.getAuthors().subscribe(authors => this.authors = authors.slice(1, 5));
    }

}
