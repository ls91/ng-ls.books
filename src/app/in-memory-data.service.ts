import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const authors = [
            { id: 11, firstName: 'Clive', middleName: '', lastName: 'Cussler' },
            { id: 12, firstName: 'Eoin', middleName: '', lastName: 'Colfer' },
            { id: 13, firstName: 'Dan', middleName: '', lastName: 'Brown' },
            { id: 14, firstName: 'Ernist', middleName: '', lastName: 'Cline' },
            { id: 15, firstName: 'Andy', middleName: '', lastName: 'Weir' },
            { id: 16, firstName: 'Terry', middleName: '', lastName: 'Pratchet' },
            { id: 16, firstName: 'George', middleName: 'R.R.', lastName: 'Martin' }
        ];
        
        return {authors};
    }
}