import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const authors = [
            { id: 11, name: 'Clive Cussler' },
            { id: 12, name: 'Eoin Colfer' },
            { id: 13, name: 'Dan Brown' },
            { id: 14, name: 'Ernist Cline' },
            { id: 15, name: 'Andy Weir' },
            { id: 16, name: 'Terry Pratchet' }
        ];
        
        return {authors};
    }
}