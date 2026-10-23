import type { Employee } from '../types/employee';

export const initialEmployees: Employee[] = [
    {
        id: 1,
        name: 'John Smith',
        gender: 'Male',
        dob: new Date('1996-05-15'),
        pob: 'Phnom Penh',
        position: 'Developer',
        salary: 1200,
        phone: '012345678',
        email: 'john@example.com',
        province: 'Phnom Penh',
        district: 'Daun Penh',
        commune: 'Chey Chumneah',
        village: 'Village 1',
        fullAddress: 'Village 1, Chey Chumneah, Daun Penh, Phnom Penh'
    },
    {
        id: 2,
        name: 'Sokha Chan',
        gender: 'Female',
        dob: new Date('1998-08-20'),
        pob: 'Phnom Penh',
        position: 'Accountant',
        salary: 1000,
        phone: '098765432',
        email: 'sokha@example.com',
        province: 'Phnom Penh',
        district: 'Chamkar Mon',
        commune: 'Tonle Bassac',
        village: 'Village 2',
        fullAddress: 'Village 2, Tonle Bassac, Chamkar Mon, Phnom Penh'
    }
];