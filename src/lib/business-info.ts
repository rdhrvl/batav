const rawWa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281383793037';

// Format 6281383793037 -> 0813-8379-3037 for display
function formatWaDisplay(num: string): string {
  const local = num.startsWith('62') ? '0' + num.slice(2) : num;
  return local.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
}

export const BUSINESS_INFO = {
  name: 'Batapav Coffee & Eatery',
  address: 'Jl. Citayam, RT.7/RW.1, Rw. Bar., Kebayoran Baru, Jakarta Selatan',
  hours: 'Setiap hari, 10.00–23.00',
  contact: {
    whatsapp: rawWa, // normalized for links
    display: formatWaDisplay(rawWa),
  },
  rating: {
    score: 4.9,
    maxScore: 5,
    reviewsCount: 533,
  },
  socials: {
    instagram: 'https://instagram.com/batapav', // example, replace with real
  },
  maps: {
    url: 'https://maps.app.goo.gl/E9t8UbRAznBWsxec7',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1951556012674!2d106.80683110000001!3d-6.2357575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f12f4da726c5%3A0xe12c172434bbd902!2sBatapav%20Coffee%20%26%20Eatery!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  }
} as const;
