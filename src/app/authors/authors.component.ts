import { Component, OnInit } from '@angular/core';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
    authors: Author[];
    
    constructor(private authorService: AuthorService) { }
    
    ngOnInit() {
        this.getAuthors();
    }
    
    //Create
    add(name: string):void {
        name = name.trim();
        
        if (!name) {
            return;
        }
        
        this.authorService.addAuthor({ name } as Author).subscribe(author => {
            this.authors.push(author);
        });
    }
    
    //Read
    getAuthors(): void {
        this.authorService.getAuthors().subscribe(authors => this.authors = authors);
    }
    
    //Delete
    delete(author: Author): void {
        this.authors = this.authors.filter(a => a !== author);
        this.authorService.deleteAuthor(author).subscribe();
    }
}
