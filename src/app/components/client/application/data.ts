export interface CarModel {
  make: string;
  models: string[];
}

export interface CarData {
  car_makes: CarModel[];
}

export interface AccountData {
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  birth_date: string;
}

export interface LeaseData {
  applicationId: string;
  status: string;
  applicationDate: Date;
  interestBase: String;
  leaseMargin: number;
  monthlyPayment: number;
  borrowedAmount: number;
}

export const carData: CarData = {
  car_makes: [
    {
      make: 'Acura',
      models: ['Integra', 'MDX', 'RDX', 'TLX', 'ZDX'],
    },
    {
      make: 'Alfa Romeo',
      models: ['Giulia', 'Stelvio', 'Tonale'],
    },
    {
      make: 'Aston Martin',
      models: ['DBX'],
    },
    {
      make: 'Audi',
      models: [
        'A3',
        'A4',
        'A4 allroad',
        'A5',
        'A6',
        'A6 allroad',
        'A7',
        'A8',
        'e-tron GT',
        'Q3',
        'Q4 e-tron',
        'Q4 Sportback e-tron',
        'Q5',
        'Q5 Sportback',
        'Q7',
        'Q8',
        'Q8 e-tron',
        'Q8 Sportback e-tron',
        'RS 3',
        'RS 5',
        'RS 6',
        'RS 7',
        'RS e-tron GT',
        'RS Q8',
        'S3',
        'S4',
        'S5',
        'S6',
        'S7',
        'S8',
        'SQ5',
        'SQ5 Sportback',
        'SQ7',
        'SQ8',
        'SQ8 e-tron',
        'SQ8 Sportback e-tron',
      ],
    },
    {
      make: 'BMW',
      models: [
        '2 Series',
        '3 Series',
        '4 Series',
        '5 Series',
        '7 Series',
        '8 Series',
        'i4',
        'i5',
        'i7',
        'iX',
        'M2',
        'M3',
        'M4',
        'M8',
        'X1',
        'X2',
        'X3',
        'X3 M',
        'X4',
        'X4 M',
        'X5',
        'X5 M',
        'X6',
        'X6 M',
        'X7',
        'XM',
        'Z4',
      ],
    },
    {
      make: 'Buick',
      models: ['Enclave', 'Encore GX', 'Envision', 'Envista'],
    },
    {
      make: 'Cadillac',
      models: [
        'Celestiq',
        'CT4',
        'CT5',
        'Escalade',
        'Escalade ESV',
        'LYRIQ',
        'XT4',
        'XT5',
        'XT6',
      ],
    },
    {
      make: 'Chevrolet',
      models: [
        'Blazer',
        'Blazer EV',
        'Camaro',
        'Colorado Crew Cab',
        'Corvette',
        'Equinox',
        'Equinox EV',
        'Express 2500 Cargo',
        'Express 2500 Passenger',
        'Express 3500 Cargo',
        'Express 3500 Passenger',
        'Malibu',
        'Silverado 1500 Crew Cab',
        'Silverado 1500 Double Cab',
        'Silverado 1500 Regular Cab',
        'Silverado 2500 HD Crew Cab',
        'Silverado 2500 HD Double Cab',
        'Silverado 2500 HD Regular Cab',
        'Silverado 3500 HD Crew Cab',
        'Silverado 3500 HD Double Cab',
        'Silverado 3500 HD Regular Cab',
        'Suburban',
        'Tahoe',
        'Trailblazer',
        'Traverse',
        'Traverse Limited',
        'Trax',
      ],
    },
    {
      make: 'Chrysler',
      models: ['Pacifica', 'Pacifica Hybrid'],
    },
    {
      make: 'Dodge',
      models: ['Durango', 'Hornet'],
    },
    {
      make: 'FIAT',
      models: ['500e'],
    },
    {
      make: 'Fisker',
      models: ['Ocean'],
    },
    {
      make: 'Ford',
      models: [
        'Bronco',
        'Bronco Sport',
        'E-Transit 350 Cargo Van',
        'Edge',
        'Escape',
        'Escape Plug-in Hybrid',
        'Expedition',
        'Expedition MAX',
        'Explorer',
        'F150 Lightning',
        'F150 Regular Cab',
        'F150 Super Cab',
        'F150 SuperCrew Cab',
        'F250 Super Duty Crew Cab',
        'F250 Super Duty Regular Cab',
        'F250 Super Duty Super Cab',
        'F350 Super Duty Crew Cab',
        'F350 Super Duty Regular Cab',
        'F350 Super Duty Super Cab',
        'F450 Super Duty Crew Cab',
        'F450 Super Duty Regular Cab',
        'Maverick',
        'Mustang',
        'Mustang MACH-E',
        'Ranger SuperCrew',
        'Transit 150 Cargo Van',
        'Transit 250 Cargo Van',
        'Transit 350 Cargo Van',
        'Transit 350 HD Cargo Van',
        'Transit 350 Passenger Van',
      ],
    },
    {
      make: 'Genesis',
      models: [
        'Electrified G80',
        'Electrified GV70',
        'G70',
        'G80',
        'G90',
        'GV60',
        'GV70',
        'GV80',
      ],
    },
    {
      make: 'GMC',
      models: [
        'Acadia',
        'Canyon Crew Cab',
        'HUMMER EV Pickup',
        'HUMMER EV SUV',
        'Savana 2500 Cargo',
        'Savana 2500 Passenger',
        'Savana 3500 Cargo',
        'Savana 3500 Passenger',
        'Sierra 1500 Crew Cab',
        'Sierra 1500 Double Cab',
        'Sierra 1500 Regular Cab',
        'Sierra 2500 HD Crew Cab',
        'Sierra 2500 HD Double Cab',
        'Sierra 2500 HD Regular Cab',
        'Sierra 3500 HD Crew Cab',
        'Sierra 3500 HD Double Cab',
        'Sierra 3500 HD Regular Cab',
        'Sierra EV',
        'Terrain',
        'Yukon',
        'Yukon XL',
      ],
    },
    {
      make: 'Honda',
      models: [
        'Accord',
        'Accord Hybrid',
        'Civic',
        'Civic Type R',
        'CR-V',
        'CR-V Hybrid',
        'HR-V',
        'Odyssey',
        'Passport',
        'Pilot',
        'Prologue',
        'Ridgeline',
      ],
    },
    {
      make: 'Hyundai',
      models: [
        'Elantra',
        'Elantra Hybrid',
        'IONIQ 5',
        'IONIQ 6',
        'IONIQ 7',
        'Kona',
        'Kona Electric',
        'NEXO',
        'Palisade',
        'Santa Cruz',
        'Santa Fe',
        'Santa Fe Hybrid',
        'Sonata',
        'Sonata Hybrid',
        'Tucson',
        'Tucson Hybrid',
        'Tucson Plug-in Hybrid',
        'Venue',
      ],
    },
    {
      make: 'INFINITI',
      models: ['Q50', 'QX50', 'QX55', 'QX60', 'QX80'],
    },
    {
      make: 'Jaguar',
      models: ['E-PACE', 'F-PACE', 'F-TYPE', 'I-PACE', 'XF'],
    },
    {
      make: 'Jeep',
      models: [
        'Compass',
        'Gladiator',
        'Grand Cherokee',
        'Grand Cherokee 4xe',
        'Grand Cherokee L',
        'Grand Wagoneer',
        'Grand Wagoneer L',
        'Recon',
        'Wagoneer',
        'Wagoneer L',
        'Wrangler',
        'Wrangler 2 Door',
        'Wrangler 4 Door',
        'Wrangler 4xe',
      ],
    },
    {
      make: 'Kia',
      models: [
        'Carnival',
        'EV6',
        'EV9',
        'Forte',
        'K5',
        'Niro',
        'Niro EV',
        'Niro Plug-in Hybrid',
        'Seltos',
        'Sorento',
        'Sorento Hybrid',
        'Sorento Plug-in Hybrid',
        'Soul',
        'Sportage',
        'Sportage Hybrid',
        'Sportage Plug-in Hybrid',
        'Telluride',
      ],
    },
    {
      make: 'Land Rover',
      models: [
        'Defender 110',
        'Defender 130',
        'Defender 90',
        'Discovery',
        'Discovery Sport',
        'Range Rover',
        'Range Rover Evoque',
        'Range Rover Sport',
        'Range Rover Velar',
      ],
    },
    {
      make: 'Lexus',
      models: [
        'ES',
        'GX',
        'IS',
        'LC',
        'LS',
        'LX',
        'NX',
        'RC',
        'RX',
        'RZ',
        'TX',
        'UX',
      ],
    },
    {
      make: 'Lincoln',
      models: ['Aviator', 'Corsair', 'Nautilus', 'Navigator', 'Navigator L'],
    },
    {
      make: 'Lucid',
      models: ['Air'],
    },
    {
      make: 'Maserati',
      models: ['Ghibli', 'GranTurismo', 'Grecale', 'Levante', 'Quattroporte'],
    },
    {
      make: 'MAZDA',
      models: [
        'CX-30',
        'CX-5',
        'CX-50',
        'CX-70',
        'CX-90',
        'CX-90 PHEV',
        'MAZDA3',
        'MX-5 Miata',
      ],
    },
    {
      make: 'Mercedes-Benz',
      models: [
        'C-Class',
        'CLA',
        'CLE',
        'E-Class',
        'eSprinter',
        'G-Class',
        'GLA',
        'GLB',
        'GLC',
        'GLC Coupe',
        'GLE',
        'GLS',
        'Mercedes-AMG CLA',
        'Mercedes-AMG EQE',
        'Mercedes-AMG EQE SUV',
        'Mercedes-AMG EQS',
        'Mercedes-AMG G-Class',
        'Mercedes-AMG GLA',
        'Mercedes-AMG GLB',
        'Mercedes-AMG GLE',
        'Mercedes-AMG GLE Coupe',
        'Mercedes-AMG GT',
        'Mercedes-EQ EQB',
        'Mercedes-EQ EQE',
        'Mercedes-EQ EQE SUV',
        'Mercedes-EQ EQS',
        'Mercedes-EQ EQS SUV',
        'Mercedes-Maybach EQS SUV',
        'Mercedes-Maybach GLS',
        'Mercedes-Maybach S-Class',
        'S-Class',
        'Sprinter 2500 Cargo',
        'Sprinter 2500 Crew',
        'Sprinter 2500 Passenger',
        'Sprinter 3500 Cargo',
        'Sprinter 3500 XD Cargo',
        'Sprinter 4500 Cargo',
      ],
    },
    {
      make: 'MINI',
      models: [
        'Clubman',
        'Convertible',
        'Countryman',
        'Hardtop 2 Door',
        'Hardtop 4 Door',
      ],
    },
    {
      make: 'Mitsubishi',
      models: [
        'Eclipse Cross',
        'Mirage',
        'Mirage G4',
        'Outlander',
        'Outlander PHEV',
        'Outlander Sport',
      ],
    },
    {
      make: 'Nissan',
      models: [
        'Altima',
        'Armada',
        'Frontier Crew Cab',
        'Frontier King Cab',
        'GT-R',
        'Kicks',
        'LEAF',
        'Murano',
        'Pathfinder',
        'Rogue',
        'Sentra',
        'Titan Crew Cab',
        'Titan King Cab',
        'TITAN XD Crew Cab',
        'Versa',
        'Z',
      ],
    },
    {
      make: 'Polestar',
      models: ['2', '3', '4', '5'],
    },
    {
      make: 'Porsche',
      models: [
        '718 Boxster',
        '718 Cayman',
        '718 Spyder',
        '911',
        'Cayenne',
        'Cayenne Coupe',
        'Macan',
        'Panamera',
        'Taycan',
        'Taycan Cross Turismo',
        'Taycan Sport Turismo',
      ],
    },
    {
      make: 'Ram',
      models: [
        '1500 Crew Cab',
        '1500 Quad Cab',
        '2500 Crew Cab',
        '2500 Mega Cab',
        '2500 Regular Cab',
        '3500 Crew Cab',
        '3500 Mega Cab',
        '3500 Regular Cab',
        'ProMaster Cargo Van',
        'ProMaster Window Van',
      ],
    },
    {
      make: 'Rivian',
      models: ['R1S', 'R1T'],
    },
    {
      make: 'Subaru',
      models: [
        'Ascent',
        'BRZ',
        'Crosstrek',
        'Forester',
        'Impreza',
        'Legacy',
        'Outback',
        'WRX',
      ],
    },
    {
      make: 'Tesla',
      models: [
        'Cybertruck',
        'Model 3',
        'Model S',
        'Model X',
        'Model Y',
        'Roadster',
      ],
    },
    {
      make: 'Toyota',
      models: [
        '4Runner',
        'Avalon',
        'Avalon Hybrid',
        'C-HR',
        'Camry',
        'Camry Hybrid',
        'Corolla',
        'Corolla Cross',
        'Corolla Hybrid',
        'GR 86',
        'Highlander',
        'Highlander Hybrid',
        'Land Cruiser',
        'Mirai',
        'Prius',
        'Prius Prime',
        'RAV4',
        'RAV4 Hybrid',
        'RAV4 Prime',
        'Sequoia',
        'Sienna',
        'Sienna Hybrid',
        'Supra',
        'Tacoma Access Cab',
        'Tacoma Double Cab',
        'Tundra CrewMax',
        'Tundra Double Cab',
        'Venza',
        'Yaris',
        'Yaris Cross',
      ],
    },
    {
      make: 'Volkswagen',
      models: [
        'Arteon',
        'Atlas',
        'Atlas Cross Sport',
        'Golf GTI',
        'Golf R',
        'ID.4',
        'Jetta',
        'Passat',
        'Taos',
        'Tiguan',
        'Tiguan Limited',
      ],
    },
    {
      make: 'Volvo',
      models: [
        'C40 Recharge',
        'S60',
        'S90',
        'V60',
        'V60 Cross Country',
        'V90',
        'V90 Cross Country',
        'XC40',
        'XC40 Recharge',
        'XC60',
        'XC60 Recharge',
        'XC90',
        'XC90 Recharge',
      ],
    },
  ],
};
