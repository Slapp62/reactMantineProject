export const ISRAELI_CITIES_BY_REGION = {
  // Northern Israel - Galilee Region
  GALILEE: [
    'Haifa',
    'Nahariya',
    'Acre (Akko)',
    'Safed (Tzfat)',
    'Tiberias',
    'Carmiel',
    'Ma\'alot-Tarshiha',
    'Kiryat Shmona',
    'Migdal HaEmek',
    'Afula',
    'Beit She\'an',
    'Yokneam',
    'Nesher',
    'Qiryat Bialik',
    'Kiryat Ata',
    'Kiryat Motzkin',
    'Kiryat Yam',
    'Tirat Carmel',
    'Kiryat Tivon',
    'Or Akiva',
    'Zikhron Ya\'akov',
    'Binyamina-Giv\'at Ada',
    'Pardes Hanna-Karkur',
    'Caesarea',
    'Rosh Pina',
    'Metula',
    'Katzrin'
  ],

  // Golan Heights
  GOLAN: [
    'Katzrin',
    'Merom Golan',
    'Neve Ativ',
    'Nimrod',
    'El Rom',
    'Keshet',
    'Odem',
    'Alonei HaBashan',
    'Ramat Trump'
  ],

  // Central Israel - Tel Aviv Metro & Sharon
  CENTER: [
    'Tel Aviv',
    'Petah Tikva',
    'Rishon LeZion',
    'Netanya',
    'Holon',
    'Ramat Gan',
    'Bnei Brak',
    'Bat Yam',
    'Kfar Saba',
    'Herzliya',
    'Hadera',
    'Ra\'anana',
    'Ramat HaSharon',
    'Givatayim',
    'Rehovot',
    'Ashdod',
    'Ashkelon',
    'Rosh HaAyin',
    'Or Yehuda',
    'Yehud-Monosson',
    'Kiryat Ono',
    'Azor',
    'Bet Dagan',
    'Savyon',
    'Even Yehuda',
    'Kadima-Zoran',
    'Mishmar HaSharon',
    'Kfar Yona',
    'Ness Ziona',
    'Gedera',
    'Yavne',
    'Gan Yavne',
    'Kiryat Ekron',
    'Kiryat Malakhi',
    'Lod',
    'Ramla',
    'Modi\'in-Maccabim-Re\'ut',
    'Shoham',
    'Mazkeret Batya'
  ],

  // Jerusalem District & Surroundings
  JERUSALEM_DISTRICT: [
    'Jerusalem',
    'Beit Shemesh',
    'Mevasseret Zion',
    'Abu Ghosh',
    'Zur Hadassah',
    'Kiryat Ye\'arim',
    'Tzur Hadassah',
    'Neve Ilan',
    'Ma\'ale HaHamisha'
  ],

  // West Bank - Judea & Samaria
  WEST_BANK: [
    'Ma\'ale Adumim',
    'Ariel',
    'Modiin Illit',
    'Beitar Illit',
    'Efrat',
    'Gush Etzion',
    'Giv\'at Ze\'ev',
    'Har Adar',
    'Alfei Menashe',
    'Oranit',
    'Sha\'arei Tikva',
    'Elkana',
    'Kedumim',
    'Karnei Shomron',
    'Emmanuel',
    'Yakir',
    'Nofim',
    'Revava',
    'Ginot Shomron',
    'Har Bracha',
    'Yitzhar',
    'Elon Moreh',
    'Itamar',
    'Beit El',
    'Ofra',
    'Psagot',
    'Neve Tzuf',
    'Halamish',
    'Nili',
    'Na\'ale',
    'Hashmonaim',
    'Kiryat Sefer',
    'Mattityahu',
    'Lapid',
    'Barkan',
    'Kokhav HaShahar',
    'Rimonim',
    'Shilo',
    'Ma\'ale Levona',
    'Eli',
    'Shvut Rachel',
    'Dolev',
    'Talmon',
    'Bet Horon',
    'Givon HaHadasha'
  ],

  // Southern Israel - Negev
  SOUTH: [
    'Beer Sheva',
    'Eilat',
    'Ashdod',
    'Ashkelon',
    'Sderot',
    'Netivot',
    'Kiryat Gat',
    'Dimona',
    'Arad',
    'Ofakim',
    'Yerucham',
    'Mitzpe Ramon',
    'Metar',
    'Omer',
    'Lehavim',
    'Rahat',
    'Tel Sheva',
    'Hura',
    'Lakiya',
    'Shaqib al-Salam',
    'Kuseife'
  ],

  // Ultra-Orthodox Cities (across regions)
  HAREDI_CENTERS: [
    'Bnei Brak',
    'Modiin Illit',
    'Beitar Illit',
    'Elad',
    'Kiryat Sefer',
    'Emmanuel',
    'Rechasim',
    'Kochav Ya\'akov'
  ]
};

// Helper function to get all cities as a flat array
export const getAllCities = () => {
  return [... new Set(Object.values(ISRAELI_CITIES_BY_REGION).flat())];
};

export const allSortedCities = getAllCities().sort();

// Helper function to get cities by specific region
export const getCitiesByRegion = (region: keyof typeof ISRAELI_CITIES_BY_REGION) => {
  return ISRAELI_CITIES_BY_REGION[region] || [];
};

// Helper function to get all region names
export const getRegions = () => {
  return Object.keys(ISRAELI_CITIES_BY_REGION);
};