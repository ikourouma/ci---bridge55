/**
 * Bridge55 African Countries DB (flags + names)
 * Used for AfCON flows and anywhere we want "🇸🇳 Senegal" formatting.
 *
 * Exposes:
 * - window.B55_AFRICAN_COUNTRIES (array)
 * - window.B55_COUNTRY_UTILS = { byCode, byName, flagFor, formatCountry, formatTeam }
 */
(function () {
  if (window.B55_COUNTRY_UTILS && window.B55_AFRICAN_COUNTRIES) return;

  const AFRICAN_COUNTRIES = [
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
    { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩' },
    { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
    { code: 'CG', name: 'Congo', flag: '🇨🇬' },
    { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩' },
    { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
    { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
    { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
    { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
    { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' }
  ];

  function normalize(str) {
    return String(str || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // strip accents
      .replace(/['’]/g, '')
      .replace(/\s+/g, ' ');
  }

  const byCode = {};
  const byName = {};

  AFRICAN_COUNTRIES.forEach(c => {
    const code = normalize(c.code);
    byCode[code] = c;
    byName[normalize(c.name)] = c;
  });

  // Common aliases so "Ivory Coast" also maps, etc.
  const aliases = {
    'cape verde': 'CV',
    'cabo verde': 'CV',
    'ivory coast': 'CI',
    "cote divoire": 'CI',
    'cote d ivoire': 'CI',
    'dr congo': 'CD',
    'drc': 'CD',
    'democratic republic of the congo': 'CD',
    'republic of the congo': 'CG',
    'congo republic': 'CG',
    'swaziland': 'SZ',
    'sao tome and principe': 'ST'
  };
  Object.keys(aliases).forEach(a => {
    const code = normalize(aliases[a]);
    if (byCode[code]) byName[normalize(a)] = byCode[code];
  });

  function countryFor(value) {
    const v = normalize(value);
    if (!v) return null;
    if (byCode[v]) return byCode[v];
    if (byName[v]) return byName[v];
    // If it's something like "Senegal (SN)" take first token
    const first = v.split(' ')[0];
    if (byName[first]) return byName[first];
    return null;
  }

  function flagFor(value) {
    const c = countryFor(value);
    return c?.flag || '🏳️';
  }

  function formatCountry(value) {
    const c = countryFor(value);
    if (!c) return String(value || '').trim();
    return `${c.flag} ${c.name}`;
  }

  function formatTeam(value) {
    // Teams in AfCON are countries; keep same formatting for now.
    return formatCountry(value);
  }

  window.B55_AFRICAN_COUNTRIES = AFRICAN_COUNTRIES;
  window.B55_COUNTRY_UTILS = {
    byCode,
    byName,
    normalize,
    countryFor,
    flagFor,
    formatCountry,
    formatTeam
  };
})();








