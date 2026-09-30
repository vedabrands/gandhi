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
}

export const GANDHI_SLIDES: SlideData[] = [
  {
    no: 1,
    roman: 'I',
    kicker: 'CHAPTER I • COMMEMORATION',
    title: 'THE FATHER OF THE NATION',
    sub: 'Mohandas Karamchand Gandhi (1869–1948) — The Architect of Non-Violent Resistance',
    points: [
      'Born on 2 October 1869 in Porbandar, Gujarat, India.',
      'Revered across India as the Father of the Nation (Rashtrapita).',
      '2 October is celebrated nationwide as Gandhi Jayanti, a National Holiday in India.',
      'Presented as an interactive tribute to his timeless ideals of Truth, Peace, and Courage.'
    ],
    photo: '/assets/image1.png',
    caption: 'Mohandas Karamchand Gandhi in his timeless iconic portrait of peaceful resolve.',
    quote: 'Generations to come will scarce believe that such a one as this ever in flesh and blood walked upon this earth. — Albert Einstein',
    highlight: 'Presented by Team Gandhi Jayanti'
  },
  {
    no: 2,
    roman: 'II',
    kicker: 'CHAPTER II • IDENTITY & LEGACY',
    title: 'WHO WAS MAHATMA GANDHI',
    sub: 'From a Barrister in London to the Moral Compass of a Global Revolution',
    points: [
      'Trained in jurisprudence and law at the Inner Temple in London.',
      'Spearheaded India’s non-violent freedom struggle against British colonial rule.',
      'Conferred the honorific title "Mahatma" (Great Soul) by Rabindranath Tagore and affectionately known as "Bapu".',
      'Pioneered universal methods of peaceful protest that inspired civil rights movements across the globe.'
    ],
    photo: '/assets/image2.png',
    caption: 'Mahatma Gandhi spinning khadi on the charkha — a symbol of self-reliance and peace.',
    quote: 'My life is my message.'
  },
  {
    no: 3,
    roman: 'III',
    kicker: 'CHAPTER III • FORMATIVE YEARS',
    title: 'EARLY LIFE AND EDUCATION',
    sub: 'Roots of Integrity, Deep Humility, and Pursuit of Knowledge',
    points: [
      'Born to Karamchand Gandhi, Chief Minister of Porbandar, and deeply devout mother Putlibai.',
      'Married Kasturba Kapadia at age 13 in accordance with contemporary customs.',
      'Traveled to England in 1888 to study law at University College London and qualified as a barrister.',
      'Sailed for South Africa in 1893 on a one-year legal assignment that transformed his life.'
    ],
    photo: '/assets/image3.png',
    caption: 'Young Mohandas Gandhi during his legal studies and early barrister career.',
    quote: 'Truth resides in every human heart, and one has to search for it there.'
  },
  {
    no: 4,
    roman: 'IV',
    kicker: 'CHAPTER IV • THE AWAKENING',
    title: 'THE SOUTH AFRICA CRUCIBLE',
    sub: 'Pietermaritzburg 1893: The Spark that Ignited Modern Non-Violent Struggle',
    points: [
      'Thrown off a train at Pietermaritzburg railway station in 1893 for refusing to vacate a first-class compartment.',
      'Witnessed systemic racial prejudice and injustice against the Indian diaspora in Natal.',
      'Conceptualized and formulated "Satyagraha" (the devotion and adherence to Truth through Non-Violence).',
      'Dedicated 21 transformative years fighting for civil liberties before returning triumphantly to India in 1915.'
    ],
    photo: '/assets/image4.png',
    caption: 'Gandhi during his South Africa campaign establishing the Phoenix Settlement and Satyagraha.',
    quote: 'They may torture my body, break my bones, even kill me. Then they will have my dead body, not my obedience.'
  },
  {
    no: 5,
    roman: 'V',
    kicker: 'CHAPTER V • MORAL FOUNDATION',
    title: 'FIVE CORE PRINCIPLES',
    sub: 'The Pillars of Satyagraha and Universal Moral Philosophy',
    points: [
      'SATYA (Truth): Absolute adherence to truth in thought, word, and deed as the ultimate reality.',
      'AHIMSA (Non-Violence): Active, positive love and compassion; refraining from causing mental or physical harm.',
      'SATYAGRAHA (Soul Force): Fearless, peaceful resistance against tyranny without malice towards the oppressor.',
      'SARVODAYA (Universal Upliftment): Welfare and progress of all beings, beginning with the most marginalized.',
      'SWADESHI (Self-Reliance): Economic independence through local production, indigenous crafts, and Khadi.'
    ],
    photo: '/assets/image5.png',
    caption: 'Gandhi addressing thousands with clarity, moral clarity, and non-violent conviction.',
    quote: 'Non-violence is the greatest force at the disposal of mankind.'
  },
  {
    no: 6,
    roman: 'VI',
    kicker: 'CHAPTER VI • MASS RESISTANCE',
    title: 'MAJOR NATIONAL MOVEMENTS',
    sub: 'Four Epochal Campaigns that Dismantled Colonial Hegemony',
    points: [
      'CHAMPARAN SATYAGRAHA (1917): First major victory defending exploited indigo farmers in Bihar.',
      'NON-COOPERATION MOVEMENT (1920–1922): Mass boycott of British goods, titles, legal courts, and institutions.',
      'SALT MARCH & CIVIL DISOBEDIENCE (1930): Nationwide defiance of unjust colonial salt monopoly taxation.',
      'QUIT INDIA MOVEMENT (1942): Final mass uprising with the historic clarion call "Do or Die" (Karo ya Maro).'
    ],
    photo: '/assets/image6.png',
    caption: 'Mass mobilization during historic Satyagraha demonstrations across India.',
    video: '/assets/media1.mp4',
    quote: 'First they ignore you, then they laugh at you, then they fight you, then you win.'
  },
  {
    no: 7,
    roman: 'VII',
    kicker: 'CHAPTER VII • DEFIANCE & SALT',
    title: 'THE HISTORIC DANDI MARCH',
    sub: '24 Days, 240 Miles, 78 Marchers — The Pinch of Salt that Shook an Empire',
    points: [
      'Commenced on 12 March 1930 from Sabarmati Ashram in Ahmedabad heading towards the Arabian Sea coast.',
      'Started with 78 dedicated Satyagrahis; thousands joined along the 240-mile coastal route.',
      'Reached the shores of Dandi on 6 April 1930, where Gandhi broke the Salt Law by lifting natural sea salt.',
      'Galvanized over 60,000 peaceful arrests nationwide and captivated international press and global headlines.'
    ],
    photo: '/assets/image7.png',
    caption: 'Mahatma Gandhi leading 78 trusted volunteers on the 240-mile march to Dandi in 1930.',
    quote: 'With this salt, I am shaking the foundations of the British Empire.'
  },
  {
    no: 8,
    roman: 'VIII',
    kicker: 'CHAPTER VIII • SOCIAL HARMONY',
    title: 'VISION FOR AN IDEAL SOCIETY',
    sub: 'Constructive Program for Social Reformation, Dignity, and Human Harmony',
    points: [
      'Eradication of Untouchability: Fierce advocacy for caste equality and honoring all as Harijans (Children of God).',
      'Communal & Religious Unity: Uncompromising brotherhood between Hindu, Muslim, Sikh, Christian, and all faiths.',
      'Gram Swaraj (Village Republics): Self-sufficient rural economy powered by agriculture, handlooms, and cottage crafts.',
      'Nai Talim (Basic Education): Holistic learning combining intellectual development, character building, and physical labor.',
      'Sanitation & Cleanliness: Personal hygiene and community sanitation as an essential spiritual discipline.'
    ],
    photo: '/assets/image8.png',
    caption: 'Bapu walking through rural villages promoting grassroots community empowerment and unity.',
    quote: 'The best way to find yourself is to lose yourself in the service of others.'
  },
  {
    no: 9,
    roman: 'IX',
    kicker: 'CHAPTER IX • WORLD HERITAGE',
    title: 'GLOBAL INFLUENCE & LEGACY',
    sub: 'Inspiring Civil Rights Champions and Global Peace Across Continents',
    points: [
      'Dr. Martin Luther King Jr. adopted Gandhian non-violence as the cornerstone of the American Civil Rights Movement.',
      'Nelson Mandela drew deep spiritual strength from Satyagraha in dismantling South African Apartheid.',
      '2 October designated by the United Nations General Assembly as the International Day of Non-Violence.',
      'Guiding light for human rights, environmental movements, disarmament summits, and peace activism worldwide.'
    ],
    photo: '/assets/image9.png',
    caption: 'World leaders and global freedom movements carrying forward Gandhi’s torch of Ahimsa.',
    quote: 'Christ gave us the goals and Mahatma Gandhi the tactics. — Dr. Martin Luther King Jr.'
  },
  {
    no: 10,
    roman: 'X',
    kicker: 'CHAPTER X • LIVING RELEVANCE',
    title: 'MESSAGE FOR TODAY',
    sub: 'Timeless Wisdom for a Fractured World — The Call to Conscience',
    points: [
      '"Be the change you wish to see in the world" — Embody the values and compassion you demand from society.',
      'Choose non-violent dialogue and empathy over aggression in personal, social, and digital spheres.',
      'Embrace truth, honesty, moral clarity, and simplicity in lifestyle and governance.',
      'Champion Swachh Bharat: Cleanliness in our environment, our thoughts, and our communities.',
      'Celebrate pluralism and profound respect for every religion, culture, and individual identity.'
    ],
    photo: '/assets/image1.png',
    caption: 'Let us carry forward Bapu’s eternal message of Truth, Love, Peace, and Human Dignity.',
    quote: 'In a gentle way, you can shake the world.',
    highlight: 'Thank you! Jai Hind!'
  }
];
