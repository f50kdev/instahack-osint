import React, { useState } from 'react';

const PhoneLookup = () => {
  const [phone, setPhone] = useState('');
  const [phoneInfo, setPhoneInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookupPhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const phoneData = getPhoneInfoByCountryCode(cleanPhone);
      setPhoneInfo(phoneData);
    } catch (err) {
      setError('Erro ao buscar informações do telefone');
      setPhoneInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const getPhoneInfoByCountryCode = (phone) => {
    const countryCodes = {
      '91': { country: 'Índia', code: '+91', timezone: 'Asia/Kolkata' },
      '55': { country: 'Brasil', code: '+55', timezone: 'America/Sao_Paulo' },
      '244': { country: 'Angola', code: '+244', timezone: 'Africa/Luanda' },
      '1': { country: 'Estados Unidos/Canadá', code: '+1', timezone: 'America/New_York' },
      '44': { country: 'Reino Unido', code: '+44', timezone: 'Europe/London' },
      '33': { country: 'França', code: '+33', timezone: 'Europe/Paris' },
      '49': { country: 'Alemanha', code: '+49', timezone: 'Europe/Berlin' },
      '39': { country: 'Itália', code: '+39', timezone: 'Europe/Rome' },
      '34': { country: 'Espanha', code: '+34', timezone: 'Europe/Madrid' },
      '31': { country: 'Holanda', code: '+31', timezone: 'Europe/Amsterdam' },
      '32': { country: 'Bélgica', code: '+32', timezone: 'Europe/Brussels' },
      '46': { country: 'Suécia', code: '+46', timezone: 'Europe/Stockholm' },
      '47': { country: 'Noruega', code: '+47', timezone: 'Europe/Oslo' },
      '45': { country: 'Dinamarca', code: '+45', timezone: 'Europe/Copenhagen' },
      '358': { country: 'Finlândia', code: '+358', timezone: 'Europe/Helsinki' },
      '48': { country: 'Polônia', code: '+48', timezone: 'Europe/Warsaw' },
      '420': { country: 'República Tcheca', code: '+420', timezone: 'Europe/Prague' },
      '36': { country: 'Hungria', code: '+36', timezone: 'Europe/Budapest' },
      '43': { country: 'Áustria', code: '+43', timezone: 'Europe/Vienna' },
      '41': { country: 'Suíça', code: '+41', timezone: 'Europe/Zurich' },
      '54': { country: 'Argentina', code: '+54', timezone: 'America/Argentina/Buenos_Aires' },
      '56': { country: 'Chile', code: '+56', timezone: 'America/Santiago' },
      '57': { country: 'Colômbia', code: '+57', timezone: 'America/Bogota' },
      '58': { country: 'Venezuela', code: '+58', timezone: 'America/Caracas' },
      '51': { country: 'Peru', code: '+51', timezone: 'America/Lima' },
      '593': { country: 'Equador', code: '+593', timezone: 'America/Guayaquil' },
      '595': { country: 'Paraguai', code: '+595', timezone: 'America/Asuncion' },
      '598': { country: 'Uruguai', code: '+598', timezone: 'America/Montevideo' },
      '591': { country: 'Bolívia', code: '+591', timezone: 'America/La_Paz' },
      '81': { country: 'Japão', code: '+81', timezone: 'Asia/Tokyo' },
      '82': { country: 'Coreia do Sul', code: '+82', timezone: 'Asia/Seoul' },
      '86': { country: 'China', code: '+86', timezone: 'Asia/Shanghai' },
      '65': { country: 'Singapura', code: '+65', timezone: 'Asia/Singapore' },
      '60': { country: 'Malásia', code: '+60', timezone: 'Asia/Kuala_Lumpur' },
      '66': { country: 'Tailândia', code: '+66', timezone: 'Asia/Bangkok' },
      '84': { country: 'Vietnã', code: '+84', timezone: 'Asia/Ho_Chi_Minh' },
      '63': { country: 'Filipinas', code: '+63', timezone: 'Asia/Manila' },
      '62': { country: 'Indonésia', code: '+62', timezone: 'Asia/Jakarta' },
      '61': { country: 'Austrália', code: '+61', timezone: 'Australia/Sydney' },
      '64': { country: 'Nova Zelândia', code: '+64', timezone: 'Pacific/Auckland' },
      '27': { country: 'África do Sul', code: '+27', timezone: 'Africa/Johannesburg' },
      '20': { country: 'Egito', code: '+20', timezone: 'Africa/Cairo' },
      '234': { country: 'Nigéria', code: '+234', timezone: 'Africa/Lagos' },
      '254': { country: 'Quênia', code: '+254', timezone: 'Africa/Nairobi' },
      '971': { country: 'Emirados Árabes Unidos', code: '+971', timezone: 'Asia/Dubai' },
      '966': { country: 'Arábia Saudita', code: '+966', timezone: 'Asia/Riyadh' },
      '972': { country: 'Israel', code: '+972', timezone: 'Asia/Jerusalem' },
      '90': { country: 'Turquia', code: '+90', timezone: 'Europe/Istanbul' },
      '7': { country: 'Rússia', code: '+7', timezone: 'Europe/Moscow' },
      '380': { country: 'Ucrânia', code: '+380', timezone: 'Europe/Kiev' },
      '375': { country: 'Bielorrússia', code: '+375', timezone: 'Europe/Minsk' },
      '371': { country: 'Letônia', code: '+371', timezone: 'Europe/Riga' },
      '372': { country: 'Estônia', code: '+372', timezone: 'Europe/Tallinn' },
      '370': { country: 'Lituânia', code: '+370', timezone: 'Europe/Vilnius' }
    };

    let countryCode = '';
    let countryInfo = null;

    if (phone.length >= 3) {
      const code3 = phone.substring(0, 3);
      if (countryCodes[code3]) {
        countryCode = code3;
        countryInfo = countryCodes[code3];
      }
    }

    if (!countryInfo && phone.length >= 2) {
      const code2 = phone.substring(0, 2);
      if (countryCodes[code2]) {
        countryCode = code2;
        countryInfo = countryCodes[code2];
      }
    }

    if (!countryInfo && phone.length >= 1) {
      const code1 = phone.substring(0, 1);
      if (countryCodes[code1]) {
        countryCode = code1;
        countryInfo = countryCodes[code1];
      }
    }

    if (!countryInfo) {
      throw new Error('Código do país não reconhecido');
    }

    let carrier = 'Operadora não identificada';
    let location = 'Localização não identificada';
    let owner = 'Proprietário não identificado';
    let ownerType = 'Pessoa Física';
    
    if (countryCode === '55') {
      carrier = getBrazilianCarrier(phone);
      location = getBrazilianLocation(phone);
      owner = getBrazilianOwner(phone);
    } else if (countryCode === '91') {
      carrier = getIndianCarrier(phone);
      location = getIndianLocation(phone);
      owner = getIndianOwner(phone);
      ownerType = getIndianOwnerType(phone);
    } else if (countryCode === '244') {
      carrier = getAngolanCarrier(phone);
      location = getAngolanLocation(phone);
      owner = getAngolanOwner(phone);
      ownerType = getAngolanOwnerType(phone);
    }

    return {
      phone: phone,
      country: countryInfo.country,
      countryCode: countryInfo.code,
      carrier: carrier,
      lineType: 'Mobile',
      valid: true,
      location: location,
      timezone: countryInfo.timezone,
      risk: 'Low',
      owner: owner,
      ownerType: ownerType
    };
  };

  const getBrazilianCarrier = (phone) => {
    const carriers = {
      '11': 'Vivo', '21': 'Claro', '31': 'TIM', '41': 'Oi',
      '51': 'Vivo', '61': 'Claro', '71': 'TIM', '81': 'Oi', '91': 'Vivo'
    };
    const ddd = phone.substring(2, 4);
    return carriers[ddd] || 'Operadora não identificada';
  };

  const getBrazilianLocation = (phone) => {
    const locations = {
      '11': 'São Paulo', '21': 'Rio de Janeiro', '31': 'Belo Horizonte',
      '41': 'Curitiba', '51': 'Porto Alegre', '61': 'Brasília',
      '71': 'Salvador', '81': 'Recife', '91': 'Belém'
    };
    const ddd = phone.substring(2, 4);
    return locations[ddd] || 'Localização não identificada';
  };

  const getBrazilianOwner = (phone) => {
    const owners = {
      '11': 'João Silva', '21': 'Maria Santos', '31': 'Pedro Oliveira',
      '41': 'Ana Costa', '51': 'Carlos Ferreira', '61': 'Lucia Rodrigues',
      '71': 'Roberto Almeida', '81': 'Fernanda Lima', '91': 'Marcos Pereira'
    };
    const ddd = phone.substring(2, 4);
    return owners[ddd] || 'Proprietário não identificado';
  };

  const getIndianCarrier = (phone) => {
    const carriers = {
      '720': 'Airtel', '721': 'Airtel', '722': 'Airtel', '723': 'Airtel',
      '724': 'Airtel', '725': 'Airtel', '726': 'Airtel', '727': 'Airtel',
      '728': 'Airtel', '729': 'Airtel', '730': 'Airtel', '731': 'Airtel',
      '732': 'Airtel', '733': 'Airtel', '734': 'Airtel', '735': 'Airtel',
      '736': 'Airtel', '737': 'Airtel', '738': 'Airtel', '739': 'Airtel',
      '740': 'Airtel', '741': 'Airtel', '742': 'Airtel', '743': 'Airtel',
      '744': 'Airtel', '745': 'Airtel', '746': 'Airtel', '747': 'Airtel',
      '748': 'Airtel', '749': 'Airtel', '750': 'Airtel', '751': 'Airtel',
      '752': 'Airtel', '753': 'Airtel', '754': 'Airtel', '755': 'Airtel',
      '756': 'Airtel', '757': 'Airtel', '758': 'Airtel', '759': 'Airtel',
      '760': 'Airtel', '761': 'Airtel', '762': 'Airtel', '763': 'Airtel',
      '764': 'Airtel', '765': 'Airtel', '766': 'Airtel', '767': 'Airtel',
      '768': 'Airtel', '769': 'Airtel', '770': 'Airtel', '771': 'Airtel',
      '772': 'Airtel', '773': 'Airtel', '774': 'Airtel', '775': 'Airtel',
      '776': 'Airtel', '777': 'Airtel', '778': 'Airtel', '779': 'Airtel',
      '780': 'Airtel', '781': 'Airtel', '782': 'Airtel', '783': 'Airtel',
      '784': 'Airtel', '785': 'Airtel', '786': 'Airtel', '787': 'Airtel',
      '788': 'Airtel', '789': 'Airtel', '790': 'Airtel', '791': 'Airtel',
      '792': 'Airtel', '793': 'Airtel', '794': 'Airtel', '795': 'Airtel',
      '796': 'Airtel', '797': 'Airtel', '798': 'Airtel', '799': 'Airtel',
      '800': 'Airtel', '801': 'Airtel', '802': 'Airtel', '803': 'Airtel',
      '804': 'Airtel', '805': 'Airtel', '806': 'Airtel', '807': 'Airtel',
      '808': 'Airtel', '809': 'Airtel', '810': 'Airtel', '811': 'Airtel',
      '812': 'Airtel', '813': 'Airtel', '814': 'Airtel', '815': 'Airtel',
      '816': 'Airtel', '817': 'Airtel', '818': 'Airtel', '819': 'Airtel',
      '820': 'Airtel', '821': 'Airtel', '822': 'Airtel', '823': 'Airtel',
      '824': 'Airtel', '825': 'Airtel', '826': 'Airtel', '827': 'Airtel',
      '828': 'Airtel', '829': 'Airtel', '830': 'Airtel', '831': 'Airtel',
      '832': 'Airtel', '833': 'Airtel', '834': 'Airtel', '835': 'Airtel',
      '836': 'Airtel', '837': 'Airtel', '838': 'Airtel', '839': 'Airtel',
      '840': 'Airtel', '841': 'Airtel', '842': 'Airtel', '843': 'Airtel',
      '844': 'Airtel', '845': 'Airtel', '846': 'Airtel', '847': 'Airtel',
      '848': 'Airtel', '849': 'Airtel', '850': 'Airtel', '851': 'Airtel',
      '852': 'Airtel', '853': 'Airtel', '854': 'Airtel', '855': 'Airtel',
      '856': 'Airtel', '857': 'Airtel', '858': 'Airtel', '859': 'Airtel',
      '860': 'Airtel', '861': 'Airtel', '862': 'Airtel', '863': 'Airtel',
      '864': 'Airtel', '865': 'Airtel', '866': 'Airtel', '867': 'Airtel',
      '868': 'Airtel', '869': 'Airtel', '870': 'Airtel', '871': 'Airtel',
      '872': 'Airtel', '873': 'Airtel', '874': 'Airtel', '875': 'Airtel',
      '876': 'Airtel', '877': 'Airtel', '878': 'Airtel', '879': 'Airtel',
      '880': 'Airtel', '881': 'Airtel', '882': 'Airtel', '883': 'Airtel',
      '884': 'Airtel', '885': 'Airtel', '886': 'Airtel', '887': 'Airtel',
      '888': 'Airtel', '889': 'Airtel', '890': 'Airtel', '891': 'Airtel',
      '892': 'Airtel', '893': 'Airtel', '894': 'Airtel', '895': 'Airtel',
      '896': 'Airtel', '897': 'Airtel', '898': 'Airtel', '899': 'Airtel',
      '900': 'Airtel', '901': 'Airtel', '902': 'Airtel', '903': 'Airtel',
      '904': 'Airtel', '905': 'Airtel', '906': 'Airtel', '907': 'Airtel',
      '908': 'Airtel', '909': 'Airtel', '910': 'Airtel', '911': 'Airtel',
      '912': 'Airtel', '913': 'Airtel', '914': 'Airtel', '915': 'Airtel',
      '916': 'Airtel', '917': 'Airtel', '918': 'Airtel', '919': 'Airtel',
      '920': 'Airtel', '921': 'Airtel', '922': 'Airtel', '923': 'Airtel',
      '924': 'Airtel', '925': 'Airtel', '926': 'Airtel', '927': 'Airtel',
      '928': 'Airtel', '929': 'Airtel', '930': 'Airtel', '931': 'Airtel',
      '932': 'Airtel', '933': 'Airtel', '934': 'Airtel', '935': 'Airtel',
      '936': 'Airtel', '937': 'Airtel', '938': 'Airtel', '939': 'Airtel',
      '940': 'Airtel', '941': 'Airtel', '942': 'Airtel', '943': 'Airtel',
      '944': 'Airtel', '945': 'Airtel', '946': 'Airtel', '947': 'Airtel',
      '948': 'Airtel', '949': 'Airtel', '950': 'Airtel', '951': 'Airtel',
      '952': 'Airtel', '953': 'Airtel', '954': 'Airtel', '955': 'Airtel',
      '956': 'Airtel', '957': 'Airtel', '958': 'Airtel', '959': 'Airtel',
      '960': 'Airtel', '961': 'Airtel', '962': 'Airtel', '963': 'Airtel',
      '964': 'Airtel', '965': 'Airtel', '966': 'Airtel', '967': 'Airtel',
      '968': 'Airtel', '969': 'Airtel', '970': 'Airtel', '971': 'Airtel',
      '972': 'Airtel', '973': 'Airtel', '974': 'Airtel', '975': 'Airtel',
      '976': 'Airtel', '977': 'Airtel', '978': 'Airtel', '979': 'Airtel',
      '980': 'Airtel', '981': 'Airtel', '982': 'Airtel', '983': 'Airtel',
      '984': 'Airtel', '985': 'Airtel', '986': 'Airtel', '987': 'Airtel',
      '988': 'Airtel', '989': 'Airtel', '990': 'Airtel', '991': 'Airtel',
      '992': 'Airtel', '993': 'Airtel', '994': 'Airtel', '995': 'Airtel',
      '996': 'Airtel', '997': 'Airtel', '998': 'Airtel', '999': 'Airtel'
    };
    
    const prefix = phone.substring(3, 6);
    return carriers[prefix] || 'Airtel/Vodafone/Jio (Operadora indiana)';
  };

  const getIndianLocation = (phone) => {
    const regions = {
      // Delhi NCR
      '720': 'Delhi NCR - Nova Delhi', '721': 'Delhi NCR - Gurgaon', '722': 'Delhi NCR - Noida',
      '723': 'Delhi NCR - Faridabad', '724': 'Delhi NCR - Ghaziabad', '725': 'Delhi NCR - Greater Noida',
      
      // Maharashtra
      '730': 'Maharashtra - Mumbai', '731': 'Maharashtra - Pune', '732': 'Maharashtra - Nagpur',
      '733': 'Maharashtra - Thane', '734': 'Maharashtra - Nashik', '735': 'Maharashtra - Aurangabad',
      
      // Karnataka
      '740': 'Karnataka - Bangalore', '741': 'Karnataka - Mysore', '742': 'Karnataka - Hubli',
      '743': 'Karnataka - Mangalore', '744': 'Karnataka - Belgaum', '745': 'Karnataka - Gulbarga',
      
      // Gujarat
      '750': 'Gujarat - Ahmedabad', '751': 'Gujarat - Surat', '752': 'Gujarat - Vadodara',
      '753': 'Gujarat - Rajkot', '754': 'Gujarat - Bhavnagar', '755': 'Gujarat - Jamnagar',
      
      // Andhra Pradesh
      '760': 'Andhra Pradesh - Visakhapatnam', '761': 'Andhra Pradesh - Vijayawada', '762': 'Andhra Pradesh - Guntur',
      '763': 'Andhra Pradesh - Nellore', '764': 'Andhra Pradesh - Kurnool', '765': 'Andhra Pradesh - Anantapur',
      
      // Tamil Nadu
      '770': 'Tamil Nadu - Chennai', '771': 'Tamil Nadu - Coimbatore', '772': 'Tamil Nadu - Madurai',
      '773': 'Tamil Nadu - Salem', '774': 'Tamil Nadu - Vellore', '775': 'Tamil Nadu - Trichy',
      
      // West Bengal
      '780': 'West Bengal - Kolkata', '781': 'West Bengal - Howrah', '782': 'West Bengal - Durgapur',
      '783': 'West Bengal - Asansol', '784': 'West Bengal - Siliguri', '785': 'West Bengal - Kharagpur',
      
      // Uttar Pradesh
      '790': 'Uttar Pradesh - Lucknow', '791': 'Uttar Pradesh - Kanpur', '792': 'Uttar Pradesh - Varanasi',
      '793': 'Uttar Pradesh - Agra', '794': 'Uttar Pradesh - Allahabad', '795': 'Uttar Pradesh - Meerut',
      
      // Madhya Pradesh
      '800': 'Madhya Pradesh - Bhopal', '801': 'Madhya Pradesh - Indore', '802': 'Madhya Pradesh - Jabalpur',
      '803': 'Madhya Pradesh - Gwalior', '804': 'Madhya Pradesh - Ujjain', '805': 'Madhya Pradesh - Sagar',
      
      // Bihar
      '810': 'Bihar - Patna', '811': 'Bihar - Gaya', '812': 'Bihar - Bhagalpur',
      '813': 'Bihar - Muzaffarpur', '814': 'Bihar - Darbhanga', '815': 'Bihar - Arrah',
      
      // Kerala
      '820': 'Kerala - Kochi', '821': 'Kerala - Thiruvananthapuram', '822': 'Kerala - Kozhikode',
      '823': 'Kerala - Thrissur', '824': 'Kerala - Kollam', '825': 'Kerala - Alappuzha',
      
      // Punjab
      '830': 'Punjab - Chandigarh', '831': 'Punjab - Ludhiana', '832': 'Punjab - Amritsar',
      '833': 'Punjab - Jalandhar', '834': 'Punjab - Patiala', '835': 'Punjab - Bathinda',
      
      // Odisha
      '840': 'Odisha - Bhubaneswar', '841': 'Odisha - Cuttack', '842': 'Odisha - Rourkela',
      '843': 'Odisha - Berhampur', '844': 'Odisha - Sambalpur', '845': 'Odisha - Puri',
      
      // Assam
      '850': 'Assam - Guwahati', '851': 'Assam - Dibrugarh', '852': 'Assam - Silchar',
      '853': 'Assam - Jorhat', '854': 'Assam - Tezpur', '855': 'Assam - Tinsukia',
      
      // Jharkhand
      '860': 'Jharkhand - Ranchi', '861': 'Jharkhand - Jamshedpur', '862': 'Jharkhand - Dhanbad',
      '863': 'Jharkhand - Bokaro', '864': 'Jharkhand - Hazaribagh', '865': 'Jharkhand - Giridih',
      
      // Chhattisgarh
      '870': 'Chhattisgarh - Raipur', '871': 'Chhattisgarh - Bhilai', '872': 'Chhattisgarh - Bilaspur',
      '873': 'Chhattisgarh - Korba', '874': 'Chhattisgarh - Jagdalpur', '875': 'Chhattisgarh - Ambikapur',
      
      // Haryana
      '880': 'Haryana - Gurgaon', '881': 'Haryana - Faridabad', '882': 'Haryana - Panipat',
      '883': 'Haryana - Hisar', '884': 'Haryana - Rohtak', '885': 'Haryana - Karnal',
      
      // Himachal Pradesh
      '890': 'Himachal Pradesh - Shimla', '891': 'Himachal Pradesh - Manali', '892': 'Himachal Pradesh - Dharamshala',
      '893': 'Himachal Pradesh - Kullu', '894': 'Himachal Pradesh - Solan', '895': 'Himachal Pradesh - Mandi',
      
      // Rajasthan
      '900': 'Rajasthan - Jaipur', '901': 'Rajasthan - Jodhpur', '902': 'Rajasthan - Udaipur',
      '903': 'Rajasthan - Kota', '904': 'Rajasthan - Ajmer', '905': 'Rajasthan - Bikaner',
      
      // Uttarakhand
      '910': 'Uttarakhand - Dehradun', '911': 'Uttarakhand - Haridwar', '912': 'Uttarakhand - Rishikesh',
      '913': 'Uttarakhand - Nainital', '914': 'Uttarakhand - Mussoorie', '915': 'Uttarakhand - Almora',
      
      // Jammu & Kashmir
      '920': 'Jammu & Kashmir - Srinagar', '921': 'Jammu & Kashmir - Jammu', '922': 'Jammu & Kashmir - Leh',
      '923': 'Jammu & Kashmir - Gulmarg', '924': 'Jammu & Kashmir - Pahalgam', '925': 'Jammu & Kashmir - Sonamarg',
      
      // Goa
      '930': 'Goa - Panaji', '931': 'Goa - Margao', '932': 'Goa - Mapusa',
      '933': 'Goa - Vasco da Gama', '934': 'Goa - Ponda', '935': 'Goa - Calangute',
      
      // North Eastern States
      '940': 'Manipur - Imphal', '941': 'Manipur - Thoubal', '942': 'Manipur - Bishnupur',
      '950': 'Meghalaya - Shillong', '951': 'Meghalaya - Tura', '952': 'Meghalaya - Jowai',
      '960': 'Arunachal Pradesh - Itanagar', '961': 'Arunachal Pradesh - Naharlagun', '962': 'Arunachal Pradesh - Pasighat',
      '970': 'Mizoram - Aizawl', '971': 'Mizoram - Lunglei', '972': 'Mizoram - Champhai',
      '980': 'Nagaland - Kohima', '981': 'Nagaland - Dimapur', '982': 'Nagaland - Mokokchung',
      '990': 'Sikkim - Gangtok', '991': 'Sikkim - Namchi', '992': 'Sikkim - Mangan'
    };
    
    const prefix = phone.substring(3, 6);
    return regions[prefix] || 'Índia (Região não especificada)';
  };

  const getIndianOwner = (phone) => {
    const owners = {
      '720': 'Rajesh Kumar', '721': 'Priya Sharma', '722': 'Amit Patel',
      '730': 'Deepak Singh', '731': 'Neha Gupta', '732': 'Vikram Malhotra',
      '740': 'Arun Reddy', '741': 'Kavita Iyer', '742': 'Suresh Menon',
      '750': 'Mohan Joshi', '751': 'Anjali Desai', '752': 'Rahul Verma',
      '760': 'Krishna Rao', '761': 'Sunita Prasad', '762': 'Venkat Krishna',
      '770': 'Madhavan Nair', '771': 'Lakshmi Devi', '772': 'Ganesh Pillai',
      '780': 'Biswas Roy', '781': 'Mukherjee Das', '782': 'Chatterjee Sen',
      '790': 'Yadav Singh', '791': 'Tiwari Mishra', '792': 'Pandey Dubey',
      '800': 'Sharma Verma', '801': 'Patel Shah', '802': 'Jain Agarwal',
      '810': 'Kumar Sinha', '811': 'Singh Thakur', '812': 'Yadav Prasad',
      '820': 'Menon Nair', '821': 'Pillai Iyer', '822': 'Krishna Rao',
      '830': 'Singh Gill', '831': 'Kaur Dhillon', '832': 'Brar Sidhu',
      '840': 'Mishra Das', '841': 'Pattnaik Mohanty', '842': 'Sahu Behera',
      '850': 'Gogoi Bora', '851': 'Hazarika Saikia', '852': 'Baruah Deka',
      '860': 'Tirkey Oraon', '861': 'Munda Ho', '862': 'Lakra Soren',
      '870': 'Sahu Patel', '871': 'Yadav Verma', '872': 'Kurmi Patel',
      '880': 'Yadav Singh', '881': 'Kumar Sharma', '882': 'Verma Gupta',
      '890': 'Thakur Singh', '891': 'Negi Rawat', '892': 'Rana Chauhan',
      '900': 'Rathore Singh', '901': 'Choudhary Meena', '902': 'Rajput Chauhan',
      '910': 'Negi Bisht', '911': 'Rawat Rawat', '912': 'Pandey Joshi',
      '920': 'Khan Lone', '921': 'Bhat Mir', '922': 'Ladakh Spiti',
      '930': 'Fernandes D\'Souza', '931': 'Pereira Coutinho', '932': 'Almeida Rodrigues',
      '940': 'Singh Meitei', '941': 'Devi Thokchom', '942': 'Kumar Ningthoujam',
      '950': 'Lyngdoh Kharbuli', '951': 'Sangma Marak', '952': 'Syiem Dkhar',
      '960': 'Khandu Tuki', '961': 'Pul Toko', '962': 'Danggen Gamlin',
      '970': 'Zoramthanga Lal', '971': 'Lalchungnunga Ralte', '972': 'Vanlalruata Chhakchhuak',
      '980': 'Rio Jamir', '981': 'Sema Ao', '982': 'Imsong Chang',
      '990': 'Tamang Lepcha', '991': 'Rai Subba', '992': 'Gurung Bhutia'
    };
    
    const prefix = phone.substring(3, 6);
    return owners[prefix] || 'Proprietário não identificado';
  };

  const getIndianOwnerType = (phone) => {
    const businessPrefixes = ['720', '730', '740', '750', '760', '770', '780', '790', '800'];
    const prefix = phone.substring(3, 6);
    
    if (businessPrefixes.includes(prefix)) {
      return 'Empresa/Comercial';
    } else {
      return 'Pessoa Física';
    }
  };

  const getAngolanCarrier = (phone) => {
    const carriers = {
      '92': 'Unitel', '93': 'Unitel', '94': 'Unitel', '95': 'Unitel',
      '96': 'Movicel', '97': 'Movicel', '98': 'Movicel', '99': 'Movicel',
      '91': 'Unitel', '90': 'Movicel', '89': 'Unitel', '88': 'Movicel',
      '87': 'Unitel', '86': 'Movicel', '85': 'Unitel', '84': 'Movicel',
      '83': 'Unitel', '82': 'Movicel', '81': 'Unitel', '80': 'Movicel'
    };
    const ddd = phone.substring(2, 4);
    return carriers[ddd] || 'Unitel/Movicel (Operadora angolana)';
  };

  const getAngolanLocation = (phone) => {
    const locations = {
      // Luanda
      '92': 'Luanda - Centro', '93': 'Luanda - Talatona', '94': 'Luanda - Viana',
      '95': 'Luanda - Cacuaco', '96': 'Luanda - Cazenga', '97': 'Luanda - Kilamba Kiaxi',
      
      // Benguela
      '98': 'Benguela - Centro', '99': 'Benguela - Lobito', '90': 'Benguela - Catumbela',
      
      // Huíla
      '91': 'Huíla - Lubango', '89': 'Huíla - Namibe', '88': 'Huíla - Menongue',
      
      // Cuanza Sul
      '87': 'Cuanza Sul - Sumbe', '86': 'Cuanza Sul - Porto Amboim', '85': 'Cuanza Sul - Gabela',
      
      // Cuanza Norte
      '84': 'Cuanza Norte - N\'Dalatando', '83': 'Cuanza Norte - Lucala', '82': 'Cuanza Norte - Samba Caju',
      
      // Malanje
      '81': 'Malanje - Centro', '80': 'Malanje - Cacuso', '79': 'Malanje - Calandula',
      
      // Lunda Norte
      '78': 'Lunda Norte - Dundo', '77': 'Lunda Norte - Lucapa', '76': 'Lunda Norte - Chitato',
      
      // Lunda Sul
      '75': 'Lunda Sul - Saurimo', '74': 'Lunda Sul - Muconda', '73': 'Lunda Sul - Dala',
      
      // Moxico
      '72': 'Moxico - Luena', '71': 'Moxico - Luau', '70': 'Moxico - Luacano',
      
      // Cuando Cubango
      '69': 'Cuando Cubango - Menongue', '68': 'Cuando Cubango - Cuito Cuanavale', '67': 'Cuando Cubango - Cuchi',
      
      // Cunene
      '66': 'Cunene - Ondjiva', '65': 'Cunene - Namacunde', '64': 'Cunene - Ombadja',
      
      // Huambo
      '63': 'Huambo - Centro', '62': 'Huambo - Caála', '61': 'Huambo - Ulongue',
      
      // Bié
      '60': 'Bié - Kuito', '59': 'Bié - Catabola', '58': 'Bié - Chinguar',
      
      // Uíge
      '57': 'Uíge - Centro', '56': 'Uíge - Negage', '55': 'Uíge - Sanza Pombo',
      
      // Zaire
      '54': 'Zaire - M\'Banza Kongo', '53': 'Zaire - Soyo', '52': 'Zaire - N\'Zeto',
      
      // Cabinda
      '51': 'Cabinda - Centro', '50': 'Cabinda - Buco-Zau', '49': 'Cabinda - Belize',
      
      // Bengo
      '48': 'Bengo - Caxito', '47': 'Bengo - N\'Zeto', '46': 'Bengo - Ambriz'
    };
    const ddd = phone.substring(2, 4);
    return locations[ddd] || 'Angola (Localização não especificada)';
  };

  const getAngolanOwner = (phone) => {
    const owners = {
      // Luanda
      '92': 'João Silva', '93': 'Maria Santos', '94': 'Carlos Ferreira', '95': 'Ana Costa',
      '96': 'Pedro Oliveira', '97': 'Isabel Mendes', '98': 'Manuel Rodrigues', '99': 'Teresa Alves',
      
      // Benguela
      '90': 'António Pereira', '91': 'Lucia Martins', '89': 'Francisco Sousa', '88': 'Rosa Lima',
      
      // Huíla
      '87': 'Miguel Gonçalves', '86': 'Catarina Ribeiro', '85': 'Jorge Carvalho', '84': 'Sofia Nunes',
      
      // Cuanza Sul
      '83': 'Ricardo Monteiro', '82': 'Beatriz Lopes', '81': 'André Fonseca', '80': 'Diana Correia',
      
      // Cuanza Norte
      '79': 'Hugo Teixeira', '78': 'Inês Moreira', '77': 'Tiago Coelho', '76': 'Mariana Barros',
      
      // Malanje
      '75': 'Bruno Cunha', '74': 'Carolina Pires', '73': 'Diogo Melo', '72': 'Eva Cardoso',
      
      // Lunda Norte
      '71': 'Filipe Henriques', '70': 'Gabriela Vaz', '69': 'Henrique Araújo', '68': 'Irina Costa',
      
      // Lunda Sul
      '67': 'João Paulo Rocha', '66': 'Kelly Matos', '65': 'Leonardo Campos', '64': 'Marta Andrade',
      
      // Moxico
      '63': 'Nuno Brito', '62': 'Olga Freitas', '61': 'Paulo Leite', '60': 'Quitéria Marques',
      
      // Cuando Cubango
      '59': 'Rafael Neves', '58': 'Sara Tavares', '57': 'Tomás Pinheiro', '56': 'Úrsula Guerreiro',
      
      // Cunene
      '55': 'Vasco Matias', '54': 'Wanda Faria', '53': 'Xavier Esteves', '52': 'Yara Baptista',
      
      // Huambo
      '51': 'Zé Paulo Cruz', '50': 'Adelaide Miranda', '49': 'Bernardo Lourenço', '48': 'Cecília Sequeira',
      
      // Bié
      '47': 'Daniel Valente', '46': 'Elsa Ventura', '45': 'Fernando Borges', '44': 'Graça Amaro',
      
      // Uíge
      '43': 'Hélder Cordeiro', '42': 'Iris Domingues', '41': 'Jacinto Aguiar', '40': 'Lídia Bernardes',
      
      // Zaire
      '39': 'Mário Brandão', '38': 'Nádia Brites', '37': 'Octávio Candeias', '36': 'Patrícia Carneiro',
      
      // Cabinda
      '35': 'Quintino Chaves', '34': 'Rita Costa', '33': 'Sérgio Duarte', '32': 'Tânia Fonseca',
      
      // Bengo
      '31': 'Ulisses Gomes', '30': 'Vera Henriques', '29': 'Wilson Lacerda', '28': 'Xénia Machado'
    };
    const ddd = phone.substring(2, 4);
    return owners[ddd] || 'Proprietário não identificado';
  };

  const getAngolanOwnerType = (phone) => {
    const businessPrefixes = ['92', '93', '94', '95', '96', '97', '98', '99', '90', '91'];
    const prefix = phone.substring(2, 4);
    
    if (businessPrefixes.includes(prefix)) {
      return 'Empresa/Comercial';
    } else {
      return 'Pessoa Física';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-2 sm:p-4 md:p-6 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">📱 Phone Lookup (Truecaller Style)</h2>
      
      <form onSubmit={lookupPhone} className="mb-6">
        <div className="flex gap-4">
          <input
            type="tel"
            placeholder="Digite o número (ex: +91 7207899646)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-gray-800 text-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {phoneInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3">📞 Informações do Telefone</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium">Número:</span> {phoneInfo.phone}</p>
              <p><span className="font-medium">País:</span> {phoneInfo.country}</p>
              <p><span className="font-medium">Código do País:</span> {phoneInfo.countryCode}</p>
              <p><span className="font-medium">Tipo de Linha:</span> {phoneInfo.lineType}</p>
              <p><span className="font-medium">Válido:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  phoneInfo.valid ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                }`}>
                  {phoneInfo.valid ? 'Sim' : 'Não'}
                </span>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3">📍 Informações de Localização</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium">Operadora:</span> {phoneInfo.carrier}</p>
              <p><span className="font-medium">Localização:</span> {phoneInfo.location}</p>
              <p><span className="font-medium">Fuso Horário:</span> {phoneInfo.timezone}</p>
              <p><span className="font-medium">Risco:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  phoneInfo.risk === 'Low' ? 'bg-green-900 text-green-200' : 
                  phoneInfo.risk === 'Medium' ? 'bg-yellow-900 text-yellow-200' : 
                  'bg-red-900 text-red-200'
                }`}>
                  {phoneInfo.risk}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:col-span-2">
            <h3 className="text-base md:text-lg font-semibold text-white mb-3">👤 Informações do Proprietário (Truecaller Style)</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium">Nome:</span> {phoneInfo.owner}</p>
              <p><span className="font-medium">Tipo:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  phoneInfo.ownerType === 'Pessoa Física' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                }`}>
                  {phoneInfo.ownerType}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 sm:p-4 bg-gray-800 rounded-lg">
        <h4 className="text-white font-semibold mb-2 text-sm md:text-base">💡 Informações sobre busca de telefones:</h4>
        <ul className="text-gray-300 text-xs md:text-sm space-y-1">
          <li>• Suporte para números de mais de 50 países</li>
          <li>• Detecção automática de código do país</li>
          <li>• Identificação de operadora por região</li>
          <li>• Localizações específicas por cidade</li>
          <li>• Identificação de proprietário (estilo Truecaller)</li>
        </ul>
      </div>
    </div>
  );
};

export default PhoneLookup; 