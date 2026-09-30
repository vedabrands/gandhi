export interface SlideData {
  no: number;
  roman: string;
  kicker: string;
  title: string;
  sub: string;
  points: string[];
  photo: string;
  caption: string;
  video?: string;
  quote?: string;
  highlight?: string;
  credit?: string;
}

export const GANDHI_SLIDES: SlideData[] = [
  {
    no: 1,
    roman: 'I',
    kicker: 'CHAPTER I • 21ST CENTURY INQUIRY',
    title: 'IS GANDHIAN PHILOSOPHY STILL RELEVANT IN THE 21ST CENTURY?',
    sub: 'An Exploration of Truth, Non-Violence, and Moral Courage in the Modern Age',
    points: [
      'Gandhi Jayanti, 2 October — Commemorating the global heritage of peace and truth.',
      'Mohandas Karamchand Gandhi, 1869–1948 — Leader of India\'s non-violent freedom movement.',
      'Presented by [Your Name] — Examining the enduring relevance of Gandhian ideals today.'
    ],
    photo: '/gandhi/gandhi-2.jpg',
    caption: 'Mohandas Karamchand Gandhi (1869–1948) — Father of the Nation and apostle of non-violence.',
    video: '/gandhi/gandhi-video.mp4',
    quote: 'My life is my message.',
    highlight: 'Presented by [Your Name]'
  },
  {
    no: 2,
    roman: 'II',
    kicker: 'CHAPTER II • IDENTITY & LEGACY',
    title: 'WHO WAS GANDHI?',
    sub: 'From a Young Barrister in London to the Leader of a Global Movement',
    points: [
      'Born 2 October 1869 in Porbandar, Gujarat, India.',
      'Trained as a lawyer in London at the Inner Temple.',
      'Led India\'s historic non-violent freedom struggle against colonial rule.',
      'Called Mahatma (\'Great Soul\') and affectionately revered as Bapu (\'Father\').',
      'The central question: do his ideas and methods still work in today\'s complex world?'
    ],
    photo: '/gandhi/gandhi-2.jpg',
    caption: 'Gandhi, London, 1931',
    quote: 'In a gentle way, you can shake the world.'
  },
  {
    no: 3,
    roman: 'III',
    kicker: 'CHAPTER III • PHILOSOPHICAL PILLARS',
    title: 'THE CORE IDEAS',
    sub: 'The Timeless Foundations of Gandhian Philosophy and Ethics',
    points: [
      'Satya (Truth) — Absolute adherence to truth and honesty in thought, word, and deed.',
      'Ahimsa (Non-violence) — Active love, compassion, and refraining from harm against any living being.',
      'Satyagraha (Peaceful resistance) — Fearless soul-force standing firm against injustice without malice.',
      'Sarvodaya (Welfare of all) — Universal upliftment prioritizing the most vulnerable and marginalized.',
      'Swadeshi (Self-reliance) — Fostering local production, community strength, and economic independence.',
      'Simple living — Voluntary simplicity, mindful consumption, and harmony with the natural world.'
    ],
    photo: '/gandhi/gandhi-3.jpg',
    caption: 'Gandhi and Kasturba, South Africa, 1902',
    quote: 'Truth is the sovereign principle, which includes numerous other principles.'
  },
  {
    no: 4,
    roman: 'IV',
    kicker: 'CHAPTER IV • 21ST CENTURY REALITIES',
    title: 'THE WORLD WE LIVE IN',
    sub: 'The Urgent Humanitarian, Social, and Ecological Crises of Our Era',
    points: [
      'Wars and conflict: Escalating geopolitical hostilities, armed warfare, and global instability.',
      'Polarisation and hate online: Digital echo chambers, social fragmentation, and rising hostility.',
      'Climate crisis: Global environmental degradation, extreme weather, and resource depletion.',
      'Inequality: Widening socio-economic divides and unequal access to essential opportunities.',
      'Misinformation: Rapid algorithmic dissemination of falsehoods eroding public trust.',
      'Consumerism and waste: Hyper-materialistic lifestyles straining the planet\'s finite resources.'
    ],
    photo: '/gandhi/gandhi-4.jpg',
    caption: 'Gandhi and Nehru, Mumbai, 1946',
    quote: 'The world will live in peace only when the individuals composing it make up their minds to do so.'
  },
  {
    no: 5,
    roman: 'V',
    kicker: 'CHAPTER V • POWER OF NON-VIOLENCE',
    title: 'AHIMSA IN ACTION',
    sub: 'How Non-Violent Resistance Transformed Global Civil Rights and History',
    points: [
      'The US civil rights movement (Martin Luther King Jr.) and South African anti-apartheid struggle (Nelson Mandela) drew deeply on Gandhian ideas.',
      'Chenoweth and Stephan\'s study (analyzing 323 campaigns from 1900 to 2006) found non-violent campaigns succeeded more often than violent ones.',
      '2 October is recognized internationally by the United Nations as the International Day of Non-Violence.'
    ],
    photo: '/gandhi/gandhi-5.jpg',
    caption: 'Gandhi with Abdul Ghaffar Khan, 1940',
    quote: 'Non-violence is the greatest force at the disposal of mankind. — Mahatma Gandhi'
  },
  {
    no: 6,
    roman: 'VI',
    kicker: 'CHAPTER VI • TRUTH IN THE DIGITAL AGE',
    title: 'SATYA IN THE AGE OF MISINFORMATION',
    sub: 'Practicing Discernment, Integrity, and Civil Dialogue in a Connected Society',
    points: [
      'Fake news spreads fast: Digital algorithms amplify sensationalism and falsehoods at unprecedented speed.',
      'Verify before you speak or share: Upholding factual accuracy and critical thinking before disseminating information.',
      'Truth-telling as a daily discipline: Living with intellectual honesty and moral transparency.',
      'Dialogue instead of online outrage: Choosing constructive communication and empathy over reactionary anger.'
    ],
    photo: '/gandhi/gandhi-6.jpg',
    caption: 'The Salt March, 1930',
    quote: 'Morality is the basis of things, and truth is the substance of all morality.'
  },
  {
    no: 7,
    roman: 'VII',
    kicker: 'CHAPTER VII • ECOLOGICAL WISDOM',
    title: 'SIMPLE LIVING AND THE PLANET',
    sub: 'Sustainable Living, Mindful Consumption, and Climate Responsibility',
    points: [
      '\'The earth provides enough for everyone\'s needs, but not everyone\'s greed\' (attributed to Gandhi).',
      'Direct links to modern sustainability, conscious minimalism, and circular resource use.',
      'India\'s Mission LiFE (Lifestyle for Environment) actively promotes individual and community eco-friendly lifestyles.'
    ],
    photo: '/gandhi/gandhi-7.jpg',
    caption: 'Gandhi at Dandi, 5 April 1930',
    quote: 'The earth provides enough to satisfy every man\'s needs, but not every man\'s greed.'
  },
  {
    no: 8,
    roman: 'VIII',
    kicker: 'CHAPTER VIII • LOCAL ECONOMIES & DIGNITY',
    title: 'SWADESHI AND SARVODAYA TODAY',
    sub: 'Grassroots Empowerment, Inclusive Growth, and Universal Cleanliness',
    points: [
      'Local economies and self-reliance: Strengthening local supply networks and supporting homegrown enterprise.',
      'Khadi and village industries: Empowering rural artisans and promoting eco-conscious handloom textiles.',
      'Inclusion and dignity for all: Ensuring that progress uplift the most disadvantaged in society.',
      'Swachh Bharat Abhiyan: A nationwide sanitation and cleanliness movement launched on Gandhi Jayanti (2 Oct 2014).'
    ],
    photo: '/gandhi/gandhi-8.jpg',
    caption: 'Gandhi and Nehru, Quit India session, 1942',
    quote: 'Recall the face of the poorest and the weakest person you have seen, and ask if your step will be of any use to them.'
  },
  {
    no: 9,
    roman: 'IX',
    kicker: 'CHAPTER IX • CRITICAL PERSPECTIVE',
    title: 'LIMITS AND CRITICISMS',
    sub: 'Nuance, Context, and Thoughtful Adaptation in the Modern Era',
    points: [
      'Non-violence alone may not be enough when confronting extreme violence and ruthless authoritarian regimes.',
      'Some of Gandhi\'s views (on caste and race during his early South Africa years) are legitimately criticised.',
      'Ideas need thoughtful application and dynamic adaptation, not rigid or blind copying.'
    ],
    photo: '/gandhi/gandhi-9.jpg',
    caption: 'Portrait, late 1930s',
    quote: 'I want the cultures of all lands to be blown about my house as freely as possible, but I refuse to be blown off my feet.'
  },
  {
    no: 10,
    roman: 'X',
    kicker: 'CHAPTER X • LIVING RELEVANCE',
    title: 'THE VERDICT: STILL RELEVANT',
    sub: 'A Living Ethical Compass for Contemporary Life and Global Citizenship',
    points: [
      'A compass, not a rulebook: An enduring framework for moral decision-making in personal and public affairs.',
      'Choose peace, truth, and simplicity in everyday choices, leadership, and community action.',
      '"Be the change you wish to see in the world" (attributed to Gandhi) — Individual integrity inspires collective transformation.',
      'Thank you! Jai Hind!'
    ],
    photo: '/gandhi/gandhi-10.jpg',
    caption: 'Gandhi, London, 1931',
    quote: 'You must be the change you wish to see in the world.',
    highlight: 'Thank you! Jai Hind!',
    credit: 'Photos: Wikimedia Commons (public domain)'
  }
];
