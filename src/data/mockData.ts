export type UserRole = 'client' | 'influencer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  company?: string;
  city?: string;
  niche?: string;
  followers?: number;
  rating?: number;
  languages?: string[];
  socialLinks?: { platform: string; url: string }[];
  audienceType?: string;
  region?: string;
  // New fields for premium profile
  roleLabel?: string;
  experienceLevel?: string;
  favoriteItems?: string[]; // e.g. Artists for influencers, Brands for clients
  primaryGenre?: string;
  softwareOrEquipment?: string;
  preferredMood?: string;
  availability?: boolean;
  badges?: string[];
  tags?: string[];
  isPremium?: boolean;
}

export interface NewsArticle {
  title: string;
  source: string;
  url: string;
  date: string;
  thumbnail?: string;
}

export interface Influencer {
  id: string;
  name: string;
  avatar: string;
  city: string;
  niche: string;
  followers: number;
  rating: number;
  bio: string;
  languages: string[];
  audienceType: string;
  region: string;
  socialLinks: { platform: string; url: string; handle: string }[];
  pastBrands: string[];
  reviews: { clientName: string; rating: number; comment: string; date: string }[];
  newsArticles?: NewsArticle[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: UserRole;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  isOnline?: boolean;
  lastSeen?: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  type: 'collaboration' | 'message' | 'review' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore', 'Goa', 'Surat',
  'Nagpur', 'Bhopal', 'Coimbatore', 'Vadodara', 'Thiruvananthapuram'
];

const niches = [
  'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 'Tech', 'Lifestyle',
  'Photography', 'Gaming', 'Education', 'Finance', 'Health', 'Parenting',
  'Music', 'Comedy', 'Sports', 'Art', 'Sustainability', 'Automotive', 'Pets'
];

const firstNames = [
  'Aarav', 'Priya', 'Rohit', 'Ananya', 'Vikram', 'Ishita', 'Arjun', 'Neha',
  'Karan', 'Diya', 'Raj', 'Meera', 'Aditya', 'Kavya', 'Siddharth', 'Riya',
  'Varun', 'Tanvi', 'Nikhil', 'Shruti', 'Amit', 'Pooja', 'Rahul', 'Simran',
  'Manish', 'Deepika', 'Akash', 'Nisha', 'Suresh', 'Anjali', 'Dhruv', 'Swati',
  'Gaurav', 'Ritika', 'Harsh', 'Divya', 'Pranav', 'Sakshi', 'Yash', 'Kriti',
  'Dev', 'Tara', 'Kunal', 'Bhavna', 'Rohan', 'Sneha', 'Vivek', 'Aditi', 'Mohit', 'Pallavi'
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Reddy', 'Nair', 'Verma',
  'Iyer', 'Joshi', 'Malhotra', 'Kapoor', 'Mehta', 'Desai', 'Chauhan',
  'Rao', 'Pillai', 'Bhat', 'Chopra', 'Agarwal'
];

const audienceTypes = ['Gen Z', 'Millennials', 'Parents', 'Professionals', 'Students', 'Women 18-35', 'Men 18-35', 'Fitness Enthusiasts'];
const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];
const brands = ['Nike', 'Zara', 'Samsung', 'Apple', 'Lakme', 'Myntra', 'Flipkart', 'Nykaa', 'Boat', 'MamaEarth', 'Sugar Cosmetics', 'Puma', 'H&M', 'Amazon', 'Swiggy'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function generateAvatar(name: string, index: number): string {
  const colors = ['7c3aed', '3b82f6', 'ec4899', '10b981', 'f59e0b', 'ef4444', '8b5cf6', '06b6d4'];
  const color = colors[index % colors.length];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=200&bold=true`;
}

export function generateInfluencers(): Influencer[] {
  const influencers: Influencer[] = [
    // --- FITNESS ---
    {
      id: "pavan-hari",
      name: "Pavan Hari",
      avatar: "/creators/Pavan Hari.jpg",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 450000,
      rating: 4.6,
      bio: "Fitness enthusiast and content creator focused on bodybuilding and lifestyle vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@pavanhari000", handle: "Pavan Hari" },
        { platform: "Instagram", url: "https://www.instagram.com/_pavanhari000__", handle: "@_pavanhari000__" }
      ],
      pastBrands: ["Nike", "Fast&Up"],
      reviews: []
    },
    {
      id: "tarun-kumar",
      name: "Tarun Kumar",
      avatar: "/creators/tarun kumar.png",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 320000,
      rating: 4.5,
      bio: "Sharing fitness journeys and workout routines to inspire health and wellness.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@mr.tarunkumar", handle: "Mr. Tarun Kumar" },
        { platform: "Instagram", url: "https://www.instagram.com/mr.tarunkumar7", handle: "@mr.tarunkumar7" }
      ],
      pastBrands: ["Reebok"],
      reviews: []
    },
    {
      id: "mehaboob",
      name: "Mehaboob",
      avatar: "/creators/mehaboob.jpg",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 2400000,
      rating: 4.9,
      bio: "Dancer, fitness icon, and lifestyle creator. Known for high-energy content and professional fitness training.",
      languages: ["Telugu", "Hindi", "English"],
      audienceType: "Gen Z",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@mehaboobdilse", handle: "Mehaboob Dilse" },
        { platform: "Instagram", url: "https://www.instagram.com/mehaboobdilse", handle: "@mehaboobdilse" }
      ],
      pastBrands: ["Samsung", "Adidas"],
      reviews: []
    },
    {
      id: "sravan-sai",
      name: "Sravan Sai",
      avatar: "/creators/sravan sai.png",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 280000,
      rating: 4.7,
      bio: "Get fit with Sravan. Professional fitness coach and lifestyle vlogger.",
      languages: ["Telugu", "English"],
      audienceType: "Professionals",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@getfitwithsravan", handle: "Get Fit With Sravan" },
        { platform: "Instagram", url: "https://www.instagram.com/__sravan.__", handle: "@__sravan.__" }
      ],
      pastBrands: ["Optimum Nutrition"],
      reviews: []
    },
    {
      id: "mallika-raghavender",
      name: "Mallika Raghavender",
      avatar: "/creators/Mallika Raghavender.png",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 650000,
      rating: 4.8,
      bio: "Dedicated to fitness, health, and empowering women through wellness content.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@mallikaraghavender", handle: "Mallika Raghavender" },
        { platform: "Instagram", url: "https://www.instagram.com/mallika_raghavender_official_", handle: "@mallika_raghavender_official_" }
      ],
      pastBrands: ["cult.fit", "Ajio"],
      reviews: []
    },

    // --- FASHION ---
    {
      id: "demon-pavan",
      name: "Demon Pavan",
      avatar: "/creators/demon-pavan.webp",
      city: "Hyderabad",
      niche: "Fashion",
      followers: 850000,
      rating: 4.7,
      bio: "Krishna Pavan, aka Demon Pavan, is a bold fashion and lifestyle icon. He blends high-intensity fitness with cutting-edge streetwear and urban style.",
      languages: ["Telugu", "Hindi", "English"],
      audienceType: "Gen Z",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@demon_pavan", handle: "Demon_Pavan_Official" },
        { platform: "Instagram", url: "https://www.instagram.com/demon_pavan", handle: "@demon_pavan" }
      ],
      pastBrands: ["Puma", "Monster Energy"],
      reviews: [{ clientName: "Arjun Mehta", rating: 4.7, comment: "Inspirational style!", date: "2025-12-05" }]
    },
    {
      id: "namratha-nitish",
      name: "Namratha Nitish",
      avatar: "/creators/namratha nitish.jpg",
      city: "Bangalore",
      niche: "Fashion",
      followers: 520000,
      rating: 4.7,
      bio: "Fashion and lifestyle influencer sharing daily style inspiration and beauty tips.",
      languages: ["Telugu", "English", "Kannada"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@namrathanitish1694", handle: "Namratha Nitish" },
        { platform: "Instagram", url: "https://www.instagram.com/namrathanitish/", handle: "@namrathanitish" }
      ],
      pastBrands: ["Nykaa", "Zivame"],
      reviews: []
    },
    {
      id: "srijaya",
      name: "Srijaya",
      avatar: "/creators/srijaya.jpg",
      city: "Hyderabad",
      niche: "Fashion",
      followers: 380000,
      rating: 4.6,
      bio: "Curating trends and personal style for the modern woman.",
      languages: ["Telugu", "English"],
      audienceType: "Students",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@srijaya434", handle: "Srijaya" },
        { platform: "Instagram", url: "https://www.instagram.com/srijaya434", handle: "@srijaya434" }
      ],
      pastBrands: ["H&M", "Zara"],
      reviews: []
    },
    {
      id: "shreemayi-reddy",
      name: "Shreemayi Reddy",
      avatar: "/creators/shreemayi.jpg",
      city: "Hyderabad",
      niche: "Fashion",
      followers: 410000,
      rating: 4.7,
      bio: "Style enthusiast exploring the intersection of traditional and modern fashion.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@shreemayireddyy", handle: "Shreemayi Reddy" },
        { platform: "Instagram", url: "https://www.instagram.com/shreemayireddyy", handle: "@shreemayireddyy" }
      ],
      pastBrands: ["Myntra", "Lakme"],
      reviews: []
    },
    {
      id: "ajay-hanumanthu",
      name: "Ajay Hanumanthu",
      avatar: "/creators/top100/aye-dude.jpg",
      city: "Hyderabad",
      niche: "Fashion",
      followers: 1200000,
      rating: 4.9,
      bio: "Aye Jude - Men's fashion, lifestyle, and grooming expert. Breaking fashion boundaries in India.",
      languages: ["Telugu", "English"],
      audienceType: "Men 18-35",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@ayejude", handle: "Aye Jude" },
        { platform: "Instagram", url: "https://www.instagram.com/ajayfromayejude", handle: "@ajayfromayejude" }
      ],
      pastBrands: ["Samsung", "Ray-Ban", "Levi's"],
      reviews: []
    },

    // --- FOOD ---
    {
      id: "soma-shekar",
      name: "Soma Shekar (Telugu Foodie)",
      avatar: "/creators/soma shekar.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 850000,
      rating: 4.9,
      bio: "Exploring the best flavors of South India. The ultimate guide for Telugu food lovers.",
      languages: ["Telugu", "Hindi"],
      audienceType: "Parents",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@telugufoodie", handle: "Telugu Foodie" },
        { platform: "Instagram", url: "https://www.instagram.com/telugu_foodiess", handle: "@telugu_foodiess" }
      ],
      pastBrands: ["Zomato", "Swiggy"],
      reviews: []
    },
    {
      id: "tasty-teja",
      name: "Tasty Teja",
      avatar: "/creators/tasty teja.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 2200000,
      rating: 4.9,
      bio: "Entertainer and food lover. Bringing you the tastiest reviews and fun food challenges.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@tastytejaofficial", handle: "Tasty Teja Official" },
        { platform: "Instagram", url: "https://www.instagram.com/tastyteja", handle: "@tastyteja" }
      ],
      pastBrands: ["Coca-Cola", "KFC"],
      reviews: []
    },
    {
      id: "keerthi-raaz",
      name: "Keerthi Raaz",
      avatar: "/creators/top100/keerthi-raz.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 550000,
      rating: 4.7,
      bio: "Food and lifestyle vlogger sharing delicious recipes and restaurant discoveries.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@keerthiraaz", handle: "Keerthi Raaz" },
        { platform: "Instagram", url: "https://www.instagram.com/keerthi_raaz", handle: "@keerthi_raaz" }
      ],
      pastBrands: ["Amazon Fresh"],
      reviews: []
    },
    {
      id: "soulfulvlogs",
      name: "Soulful Vlogs",
      avatar: "/creators/top100/soulful.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 480000,
      rating: 4.6,
      bio: "Catching the soul of food and travel across South India.",
      languages: ["Telugu", "English"],
      audienceType: "Travelers",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@soulfulsouthvlogss", handle: "Soulful South Vlogs" },
        { platform: "Instagram", url: "https://www.instagram.com/soulfulvlogs07", handle: "@soulfulvlogs07" }
      ],
      pastBrands: ["Uber Eats"],
      reviews: []
    },
    {
      id: "chandu-talks",
      name: "Chandana & Chandini's Talks",
      avatar: "/creators/chandana and chandini's talks..jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 620000,
      rating: 4.7,
      bio: "Duo vlogs sharing food experiences, lifestyle stories, and fun conversations.",
      languages: ["Telugu", "English"],
      audienceType: "Students",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@chandusquaretalkss", handle: "Chandu Square Talks" },
        { platform: "Instagram", url: "https://www.instagram.com/chandusquare_talkss", handle: "@chandusquare_talkss" }
      ],
      pastBrands: ["Licious"],
      reviews: []
    },

    // --- COMEDY ---
    {
      id: "ravi-mantri",
      name: "Ravi Mantri",
      avatar: "/creators/ravi-mantri.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 2100000,
      rating: 4.9,
      bio: "Ravi Mantri is a celebrated comedian, author and storyteller. Known for 'Amma Diarylo Konni Pageelu' and his unique blend of humor and life stories.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@ravimantrii", handle: "RaviMantrii" },
        { platform: "Instagram", url: "https://www.instagram.com/ravimantrii", handle: "@ravimantrii" }
      ],
      pastBrands: ["Amazon", "Flipkart"],
      reviews: [{ clientName: "Aarav Sharma", rating: 5, comment: "Authentic storytelling at its best.", date: "2025-12-01" }]
    },
    {
      id: "sudheer-sudheer",
      name: "Sudigali Sudheer",
      avatar: "/creators/sudheer.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 5200000,
      rating: 5.0,
      bio: "Sudheer Anand Bayana, known as Sudigali Sudheer, is a powerhouse of entertainment in the Telugu industry, famed for his comedy, hosting, and acting skills.",
      languages: ["Telugu", "Hindi", "English"],
      audienceType: "Gen Z & Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@sudheeranandbayana", handle: "SUDHEER ANAND BAYANA" },
        { platform: "Instagram", url: "https://www.instagram.com/sudheeranandbayana", handle: "@sudheeranandbayana" }
      ],
      pastBrands: ["Santoor", "Sprite"],
      reviews: [{ clientName: "Vikram Reddy", rating: 5, comment: "The King of entertainment!", date: "2025-12-10" }]
    },
    {
      id: "gnaneswar-kumar",
      name: "Gnaneswar Kumar (aura_things)",
      avatar: "/creators/Gnaneswar Kumar(aura_things).jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 450000,
      rating: 4.8,
      bio: "Aura Things - Relatable comedy skits and lifestyle humor for the younger generation.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@aura_things", handle: "Aura Things" },
        { platform: "Instagram", url: "https://www.instagram.com/aura_thingss", handle: "@aura_thingss" }
      ],
      pastBrands: ["Garena Free Fire"],
      reviews: []
    },
    {
      id: "emmanuel",
      name: "Emmanuel",
      avatar: "/creators/eammanuel.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 1800000,
      rating: 4.9,
      bio: "Jabardasth fame comedian known for his impeccable timing and expressive humor.",
      languages: ["Telugu", "Hindi"],
      audienceType: "Family",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@jabardasthemmanuelofficial", handle: "Emmanuel Official" },
        { platform: "Instagram", url: "https://www.instagram.com/jabardasth_emmanuel", handle: "@jabardasth_emmanuel" }
      ],
      pastBrands: ["PhonePe"],
      reviews: []
    },
    {
      id: "avinash",
      name: "Avinash",
      avatar: "/creators/avinash.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 2500000,
      rating: 5.0,
      bio: "Mukku Avinash - The master of mimicry and entertainment. Spreading joy through every video.",
      languages: ["Telugu", "Hindi", "English"],
      audienceType: "Family",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@mukkuavinashofficial", handle: "Mukku Avinash" },
        { platform: "Instagram", url: "https://www.instagram.com/jabardasth_avinash", handle: "@jabardasth_avinash" }
      ],
      pastBrands: ["Paytm", "Disney+ Hotstar"],
      reviews: []
    },

    // --- TRAVEL ---
    {
      id: "bangkok-pilla",
      name: "Bangkok Pilla",
      avatar: "/creators/bangkok-pilla.jpg",
      city: "Bangkok / Hyderabad",
      niche: "Travel",
      followers: 1500000,
      rating: 4.8,
      bio: "Sravani Varma, popularly known as Bangkok Pilla, shares her vibrant life in Thailand, blending Telugu culture with international travel and food vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Travelers",
      region: "Global",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@bangkokpilla", handle: "Bangkok Pilla" },
        { platform: "Instagram", url: "https://www.instagram.com/bangkok.pilla", handle: "@bangkok.pilla" }
      ],
      pastBrands: ["Tourism Thailand", "Myntra", "Samsung"],
      reviews: [{ clientName: "Neha Gupta", rating: 4.8, comment: "Love her travel recommendations!", date: "2025-11-25" }]
    },
    {
      id: "uma-traveler",
      name: "Uma Telugu Traveller",
      avatar: "/creators/uma traveller.jpg",
      city: "Hyderabad",
      niche: "Travel",
      followers: 950000,
      rating: 4.9,
      bio: "Exploring the world, one vlog at a time. The first Telugu world traveler documenting global cultures.",
      languages: ["Telugu", "English", "Hindi"],
      audienceType: "Adventure Seekers",
      region: "Global",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@umatelugutraveller", handle: "Uma Telugu Traveller" },
        { platform: "Instagram", url: "https://www.instagram.com/umatelugutraveller", handle: "@umatelugutraveller" }
      ],
      pastBrands: ["Goibibo", "Skyscanner"],
      reviews: []
    },
    {
      id: "abhigna-reddy",
      name: "Abhigna Reddy",
      avatar: "/creators/abhigna-reddy-chat.jpg",
      city: "Hyderabad",
      niche: "Travel",
      followers: 350000,
      rating: 4.7,
      bio: "Lifestyle and travel vlogger sharing stories from across the country.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@abhignareddylakkireddy", handle: "Abhigna Reddy" },
        { platform: "Instagram", url: "https://www.instagram.com/abhignaaaaaaaaa_", handle: "@abhignaaaaaaaaa_" }
      ],
      pastBrands: ["Airbnb"],
      reviews: []
    },
    {
      id: "anvesh",
      name: "Naa Anvesana", // Updated name display
      avatar: "/creators/naa-anvesana-chat.jpg",
      city: "Hyderabad",
      niche: "Travel",
      followers: 3200000,
      rating: 5.0,
      bio: "Naa Anveshana - Uncovering hidden gems around the world. Bringing global travel to the Telugu audience.",
      languages: ["Telugu", "English", "Spanish"],
      audienceType: "Travel Enthusiasts",
      region: "Global",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@naaanveshana", handle: "Naa Anveshana" },
        { platform: "Instagram", url: "https://www.instagram.com/naa_anveshana", handle: "@naa_anveshana" }
      ],
      pastBrands: ["Emirates", "Booking.com"],
      reviews: []
    },
    {
      id: "sanjana-sahithi",
      name: "Sanjana & Sahithi",
      avatar: "/creators/sanjana and sahithoi.jpg",
      city: "Hyderabad",
      niche: "Travel",
      followers: 780000,
      rating: 4.8,
      bio: "Akka and Chelli vlogs. Travel, fun, and lifestyle stories from two sisters.",
      languages: ["Telugu", "English"],
      audienceType: "Family",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@akkaandchelli", handle: "Akka and Chelli" },
        { platform: "Instagram", url: "https://www.instagram.com/akkaandchelli", handle: "@akkaandchelli" }
      ],
      pastBrands: ["Himalaya", "Sugar Cosmetics"],
      reviews: []
    },

    // --- TOP 100 (ADDED) ---
    {
      id: "raju-kanneboina",
      name: "Raju Kanneboina",
      avatar: "/creators/top100/raju.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 380000,
      rating: 4.7,
      bio: "Telugu comedy and entertainment creator known for relatable sketches and fun vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@rajukanneboina?si=47tI0f-4Nl5loLMA", handle: "@rajukanneboina" },
        { platform: "Instagram", url: "https://www.instagram.com/rajukanneboina?igsh=MnJhYzM4ZW9kOHpm", handle: "@rajukanneboina" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sneha-panda",
      name: "Sneha Panda",
      avatar: "/creators/top100/the-glutton-journal.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 420000,
      rating: 4.7,
      bio: "Food reviewer and storyteller behind The Glutton Journal, sharing cafe hops, recipes, and local food finds.",
      languages: ["English", "Telugu"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@thegluttonjournal?si=eJMt1-ikBjeIck6X", handle: "@thegluttonjournal" },
        { platform: "Instagram", url: "https://www.instagram.com/thegluttonjournal?igsh=NHZ6MGhrNmIxZmF5", handle: "@thegluttonjournal" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "nidhis-food-and-travel",
      name: "Nidhis Food And Travel",
      avatar: "/creators/top100/nidhi.jpg",
      city: "Hyderabad",
      niche: "Travel",
      followers: 360000,
      rating: 4.6,
      bio: "Travel and food creator featuring budget-friendly itineraries, hotel reviews, and authentic eats across India.",
      languages: ["English", "Telugu"],
      audienceType: "Travelers",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@nidhisfoodandtravel?si=0n9sAW_8bw5Qb5QV", handle: "@nidhisfoodandtravel" },
        { platform: "Instagram", url: "https://www.instagram.com/nidhisfoodandtravel?igsh=OTJ6cGJhOXFybGpl", handle: "@nidhisfoodandtravel" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "er-yamini",
      name: "ER Yamini",
      avatar: "/creators/top100/er-yamini.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 520000,
      rating: 4.7,
      bio: "Lifestyle creator sharing everyday vlogs, personal growth, and positive routines.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@eryamini?si=REE7rAucX1gRP1uS", handle: "@eryamini" },
        { platform: "Instagram", url: "https://www.instagram.com/yamini.e.r?igsh=MTlnNDNxanMzcXR4aA==", handle: "@yamini.e.r" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "ramya-sree",
      name: "Ramya Sree",
      avatar: "/creators/top100/ramya-sri-jpg-1.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 440000,
      rating: 4.6,
      bio: "Lifestyle and beauty creator known for reels, styling, and daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@ramyasree14?si=QvBPaKwu9Po5WlUz", handle: "@ramyasree14" },
        { platform: "Instagram", url: "https://www.instagram.com/devilic_cutie_?igsh=MW1oaWtxempibm9iOQ==", handle: "@devilic_cutie_" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "preethi-priya",
      name: "Preethi Priya",
      avatar: "/creators/top100/preethi-priya-jpg-1.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 410000,
      rating: 4.6,
      bio: "Lifestyle influencer creating short-form content across fashion, trends, and everyday moments.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@preeethipriyaofficial4467?si=8bVpSAafhzg4ml-i", handle: "@preeethipriyaofficial4467" },
        { platform: "Instagram", url: "https://www.instagram.com/preethipriya926?igsh=aHcwZGZ5ZW5yc3py", handle: "@preethipriya926" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "abhinav-lifestyle",
      name: "Abhinav Lifestyle",
      avatar: "/creators/top100/abhinav.jpg",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 490000,
      rating: 4.7,
      bio: "Fitness and lifestyle creator sharing workouts, transformation tips, and motivational content.",
      languages: ["Telugu", "English"],
      audienceType: "Fitness Enthusiasts",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@de_abhinav?si=9eQ1FGqnlddq84-Q", handle: "@de_abhinav" },
        { platform: "Instagram", url: "https://www.instagram.com/abhinavfitness?igsh=ZDh1NzgyeXU3ajdh", handle: "@abhinavfitness" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "vaishnavi-chaitanya",
      name: "Vaishnavi Chaitanya",
      avatar: "/creators/top100/vaishnavi.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 620000,
      rating: 4.8,
      bio: "Lifestyle creator sharing fashion, daily vlogs, and relatable content for young audiences.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@iamvaishnavi_chaitanya?si=Ti_GqmFJ7DnMXyuU", handle: "@iamvaishnavi_chaitanya" },
        { platform: "Instagram", url: "https://www.instagram.com/vaishnavi_chaitanya_?igsh=ZWs4M29xd2U5dW11", handle: "@vaishnavi_chaitanya_" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "geethu-royal",
      name: "Geethu Royal",
      avatar: "/creators/top100/geethu-royal.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 380000,
      rating: 4.6,
      bio: "Creator focused on lifestyle content, fashion picks, and fun daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@geeturoyal_?si=NZf3r1NCw48wdtg8", handle: "@geeturoyal_" },
        { platform: "Instagram", url: "https://www.instagram.com/geeturoyal_?igsh=ZzcwZndkdzFocDJ4", handle: "@geeturoyal_" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "nikhil-vijayendra",
      name: "Nikhil Vijayendra",
      avatar: "/creators/top100/nikhil-vijayendra-simha.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 340000,
      rating: 4.5,
      bio: "Lifestyle creator sharing vlogs, personal style, and pop-culture commentary.",
      languages: ["English", "Telugu"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@nikhiluuuuuuuuuuuu?si=PPzadS2-K-Zlfiwu", handle: "@nikhiluuuuuuuuuuuu" },
        { platform: "Instagram", url: "https://www.instagram.com/nikhilvijayendrasimha?igsh=MXc1ZGZkMTQzbTA3dQ==", handle: "@nikhilvijayendrasimha" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "prasadtechintelugu",
      name: "Prasadtechintelugu",
      avatar: "/creators/top100/prasadtechintelugu.jpg",
      city: "Hyderabad",
      niche: "Tech",
      followers: 980000,
      rating: 4.8,
      bio: "Tech creator known for gadget reviews, smartphone updates, and easy-to-understand Telugu tech content.",
      languages: ["Telugu", "English"],
      audienceType: "Professionals",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@prasadtechintelugu?si=Bilv6xKF3QDDvRIT", handle: "@prasadtechintelugu" },
        { platform: "Instagram", url: "https://www.instagram.com/prasadtechinshortsunofficial?igsh=N2VldXh2eWh5eTEz", handle: "@prasadtechinshortsunofficial" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "siddarth-varma",
      name: "Siddharth Varma (sidshnu)",
      avatar: "/creators/top100/siddarthvarma.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 360000,
      rating: 4.6,
      bio: "Lifestyle creator and performer sharing entertaining shorts, vlogs, and trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@sidshnuofficial?si=LDy38U8o_H4i-vDS", handle: "@sidshnuofficial" },
        { platform: "Instagram", url: "https://www.instagram.com/siddhardhvarma_official?igsh=aHhtY3M4cnJvYXo3", handle: "@siddhardhvarma_official" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "shravan-kotha",
      name: "Shravan Kotha",
      avatar: "/creators/top100/shravan-kotha.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 420000,
      rating: 4.6,
      bio: "Lifestyle creator sharing travel snippets, routines, and entertaining daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@shravankotha?si=a9ACxsUtS3FjLWuM", handle: "@shravankotha" },
        { platform: "Instagram", url: "https://www.instagram.com/shravan.kotha?igsh=Y3ptOWVvY25iNDFk", handle: "@shravan.kotha" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sowmya-says",
      name: "Sowmya Says",
      avatar: "/creators/top100/sowmya-says.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 310000,
      rating: 4.5,
      bio: "Lifestyle creator sharing tips, relatable moments, and short-form content with a fun vibe.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@sowmyasayss07?si=F0fgIGzGJusyT_AW", handle: "@sowmyasayss07" },
        { platform: "Instagram", url: "https://www.instagram.com/sowmya_sayss?igsh=MTBtN2luM2MwMHZzag==", handle: "@sowmya_sayss" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "niha-sisters",
      name: "Niha Sisters",
      avatar: "/creators/top100/neha-sisters.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 520000,
      rating: 4.7,
      bio: "Sisters creating lifestyle content, trends, and fun vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@nihasisters?si=AmB2M-dul-plXotD", handle: "@nihasisters" },
        { platform: "Instagram", url: "https://www.instagram.com/niharika_platinum?igsh=MXEyeWZuMmYxanp2bg==", handle: "@niharika_platinum" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "vr-raja",
      name: "Vr Raja",
      avatar: "/creators/top100/vr-raja.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 410000,
      rating: 4.6,
      bio: "Lifestyle and entertainment creator sharing trendy reels and energetic vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@iamvrraja?si=zLeGkBOqXx6hCX9X", handle: "@iamvrraja" },
        { platform: "Instagram", url: "https://www.instagram.com/iamvrraja?igsh=MXZwb20xcGFnbm41OQ==", handle: "@iamvrraja" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "food-on-farm",
      name: "Food on Farm",
      avatar: "/creators/top100/food-on-farms.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 260000,
      rating: 4.6,
      bio: "Farm-to-table food content featuring fresh ingredients, cooking, and rustic food experiences.",
      languages: ["Telugu", "English"],
      audienceType: "Parents",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@foodonfarm?si=g_1s0Lx_MxTBctwj", handle: "@foodonfarm" },
        { platform: "Instagram", url: "https://www.instagram.com/foodonfarm?igsh=b2xucXNiYWVtd29t", handle: "@foodonfarm" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "swaroop-talks",
      name: "Swaroop Talks",
      avatar: "/creators/top100/swaroop.jpg",
      city: "Hyderabad",
      niche: "Education",
      followers: 220000,
      rating: 4.5,
      bio: "Talks and interviews on careers, life, and learning with practical takeaways.",
      languages: ["Telugu", "English"],
      audienceType: "Students",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@swaroopvitb?si=xJatEu18u7De3u8K", handle: "@swaroopvitb" },
        { platform: "Instagram", url: "https://www.instagram.com/raw_talks_with_swaroop?igsh=N3B3dTY5ajl4NGpm", handle: "@raw_talks_with_swaroop" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "tejaswini-gowda",
      name: "Tejaswini Gowda",
      avatar: "/creators/top100/tejaswini-gowda.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 740000,
      rating: 4.8,
      bio: "Lifestyle creator sharing trend content, fashion, and daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@tejaswini_gowda?si=jRU8V5x7Czv5P6O4", handle: "@tejaswini_gowda" },
        { platform: "Instagram", url: "https://www.instagram.com/_tejaswini_gowda_official?igsh=MWpreG9sOHI3cm1mNw==", handle: "@_tejaswini_gowda_official" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "amardeep-chowdary",
      name: "Amardeep Chowdary",
      avatar: "/creators/top100/amardeep.png",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 560000,
      rating: 4.7,
      bio: "Creator sharing lifestyle content and entertaining vlogs for Telugu audiences.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@amardeeprajathegreat?si=gqUtrerlT_RY1tNI", handle: "@amardeeprajathegreat" },
        { platform: "Instagram", url: "https://www.instagram.com/amardeep_chowdary?igsh=Z3Jscm0xaWtlOHN1", handle: "@amardeep_chowdary" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "prerana-kambam",
      name: "Prerana Kambam Official",
      avatar: "/creators/top100/prerana.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 420000,
      rating: 4.6,
      bio: "Lifestyle creator sharing vlogs, reels, and trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@preranakambamofficial?si=7ndd30Om4Aa8J4Rn", handle: "@preranakambamofficial" },
        { platform: "Instagram", url: "https://www.instagram.com/prerana.kambam?igsh=MTJhamdyb3F3YXliMg==", handle: "@prerana.kambam" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "nainika-anasuru",
      name: "Nainika Anasuru",
      avatar: "/creators/top100/nainika.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 310000,
      rating: 4.5,
      bio: "Lifestyle creator sharing reels, vlogs, and relatable trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@nainikaanasuruofficial468?si=EuqjIwErli5FwioM", handle: "@nainikaanasuruofficial468" },
        { platform: "Instagram", url: "https://www.instagram.com/nainika.anasuru26?igsh=ajI3dXAxbTQ2bnRv", handle: "@nainika.anasuru26" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sushma-gopal",
      name: "Sushma Gopal",
      avatar: "/creators/top100/sushma-gopal.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 340000,
      rating: 4.6,
      bio: "Lifestyle creator sharing daily vlogs, fashion moments, and trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@sushma_gopal?si=_mdq1HnRhCs81wAF", handle: "@sushma_gopal" },
        { platform: "Instagram", url: "https://www.instagram.com/sushma_gopal__?igsh=Nmc2eDR3cnp6M2Jx", handle: "@sushma_gopal__" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "vandana-warangal",
      name: "Vandana Warangal",
      avatar: "/creators/top100/warangal-vandana.jpg",
      city: "Warangal",
      niche: "Lifestyle",
      followers: 280000,
      rating: 4.5,
      bio: "Lifestyle creator sharing vlogs and trend content with a strong local connect.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "Telangana",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@vandanaoff?si=gLBqugWle66EneO1", handle: "@vandanaoff" },
        { platform: "Instagram", url: "https://www.instagram.com/aishwarya.govardan?igsh=MXdoM3IzM2dsYnA3Yg==", handle: "@aishwarya.govardan" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sumi-talks",
      name: "Sumi Talks",
      avatar: "/creators/top100/sumi.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 260000,
      rating: 4.5,
      bio: "Talks and short-form content with lifestyle topics and relatable moments.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@sumiitalks?si=UNS-iAybiW_xcwmH", handle: "@sumiitalks" },
        { platform: "Instagram", url: "https://www.instagram.com/sumii_talks?igsh=NTl4MWwwcDBiOXVy", handle: "@sumii_talks" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "riya-manoj",
      name: "Riya Manoj",
      avatar: "/creators/top100/riya-manoj.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 380000,
      rating: 4.6,
      bio: "Lifestyle creator sharing daily vlogs, trends, and fun reels.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@riyaann?si=Z6xxa6cxC-TPKwVL", handle: "@riyaann" },
        { platform: "Instagram", url: "https://www.instagram.com/riyamanoj?igsh=bG1rN3UxajUwdTN0", handle: "@riyamanoj" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "jogipet-ratnam",
      name: "Jogipet Ratnam",
      avatar: "/creators/top100/jogipeta-ratnam.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 460000,
      rating: 4.7,
      bio: "Comedy creator delivering relatable Telugu humor and entertaining short videos.",
      languages: ["Telugu", "English"],
      audienceType: "Family",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@jogipetratnam?si=gz3khj9AhG9Oc2k8", handle: "@jogipetratnam" },
        { platform: "Instagram", url: "https://www.instagram.com/jogipet_ratnam?igsh=MXF1YzUzeW9xc2dpdA==", handle: "@jogipet_ratnam" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "shettyxvibe",
      name: "Shettyxvibe",
      avatar: "/creators/top100/shetty.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 300000,
      rating: 4.5,
      bio: "Lifestyle and fitness-forward content with vlogs, reels, and energetic edits.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "https://youtube.com/@hrithik_shetty?si=wtuoR4DkSa_d2jp7", handle: "@hrithik_shetty" },
        { platform: "Instagram", url: "https://www.instagram.com/shettyxvibe?igsh=MW01ZmlpMzZuNWsyNg==", handle: "@shettyxvibe" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "akhil",
      name: "Akhil",
      avatar: "/creators/top100/akhil.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 220000,
      rating: 4.5,
      bio: "Lifestyle creator sharing daily vlogs, trends, and relatable moments.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Akhil" },
        { platform: "Instagram", url: "#", handle: "@akhil" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "akshaya-reddy",
      name: "Akshaya Reddy",
      avatar: "/creators/top100/akshaya-reddy.jpg",
      city: "Hyderabad",
      niche: "Fashion",
      followers: 310000,
      rating: 4.6,
      bio: "Fashion and lifestyle creator sharing styling tips, outfits, and trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Akshaya Reddy" },
        { platform: "Instagram", url: "#", handle: "@akshaya" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "alekhya-harika",
      name: "Alekhya Harika",
      avatar: "/creators/top100/alekhya-harika.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 260000,
      rating: 4.5,
      bio: "Lifestyle content focused on routines, travel snippets, and fun short videos.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Alekhya Harika" },
        { platform: "Instagram", url: "#", handle: "@alekhya" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "ashtrixx",
      name: "Ashtrixx",
      avatar: "/creators/top100/ashtrixx.jpg",
      city: "Hyderabad",
      niche: "Gaming",
      followers: 390000,
      rating: 4.6,
      bio: "Gaming creator known for entertaining gameplay, reactions, and community streams.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Ashtrixx" },
        { platform: "Instagram", url: "#", handle: "@ashtrixx" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "bindhu-madhavi",
      name: "Bindhu Madhavi",
      avatar: "/creators/top100/bindhu-madhavi.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 280000,
      rating: 4.6,
      bio: "Lifestyle creator sharing family-friendly content, routines, and everyday moments.",
      languages: ["Telugu", "English"],
      audienceType: "Family",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Bindhu Madhavi" },
        { platform: "Instagram", url: "#", handle: "@bindhumadhavi" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "deepthi-sunaina",
      name: "Deepthi Sunaina",
      avatar: "/creators/top100/deepthi-sunaina.jpg",
      city: "Hyderabad",
      niche: "Beauty",
      followers: 520000,
      rating: 4.7,
      bio: "Beauty and lifestyle creator sharing makeup looks, skincare routines, and daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Deepthi Sunaina" },
        { platform: "Instagram", url: "#", handle: "@deepthisunaina" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "dhanush",
      name: "Dhanush",
      avatar: "/creators/top100/dhanush.jpg",
      city: "Hyderabad",
      niche: "Fitness",
      followers: 240000,
      rating: 4.5,
      bio: "Fitness creator sharing workout routines, motivation, and lifestyle content.",
      languages: ["Telugu", "English"],
      audienceType: "Fitness Enthusiasts",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Dhanush" },
        { platform: "Instagram", url: "#", handle: "@dhanush" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "dynamo",
      name: "Dynamo",
      avatar: "/creators/top100/dynamo.jpg",
      city: "Hyderabad",
      niche: "Tech",
      followers: 320000,
      rating: 4.6,
      bio: "Tech creator sharing gadget content, short reviews, and practical tips.",
      languages: ["Telugu", "English"],
      audienceType: "Professionals",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Dynamo" },
        { platform: "Instagram", url: "#", handle: "@dynamo" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "harika",
      name: "Harika",
      avatar: "/creators/top100/harika.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 210000,
      rating: 4.5,
      bio: "Lifestyle creator sharing vlogs, fashion moments, and trend content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Harika" },
        { platform: "Instagram", url: "#", handle: "@harika" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "harsha-chemudu",
      name: "Harsha Chemudu",
      avatar: "/creators/top100/harsha-chemudu.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 680000,
      rating: 4.8,
      bio: "Comedy and entertainment creator known for humorous sketches and on-screen presence.",
      languages: ["Telugu", "English"],
      audienceType: "Family",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Harsha Chemudu" },
        { platform: "Instagram", url: "#", handle: "@harshachemudu" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "harsha",
      name: "Harsha",
      avatar: "/creators/top100/harsha.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 260000,
      rating: 4.6,
      bio: "Comedy creator sharing short skits, fun reels, and entertaining videos.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Harsha" },
        { platform: "Instagram", url: "#", handle: "@harsha" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "madhuri-krishna",
      name: "Madhuri Krishna",
      avatar: "/creators/top100/madhuri-krishna.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 240000,
      rating: 4.5,
      bio: "Lifestyle creator sharing daily vlogs, fashion, and relatable content.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Madhuri Krishna" },
        { platform: "Instagram", url: "#", handle: "@madhuri" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "mahathalli",
      name: "Mahathalli",
      avatar: "/creators/top100/mahathalli.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 820000,
      rating: 4.8,
      bio: "Comedy creator known for relatable Telugu humor, skits, and entertaining reels.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Mahathalli" },
        { platform: "Instagram", url: "#", handle: "@mahathalli" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "maheswari",
      name: "Maheswari",
      avatar: "/creators/top100/maheswari.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 230000,
      rating: 4.5,
      bio: "Lifestyle creator sharing fashion picks, routines, and everyday moments.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Maheswari" },
        { platform: "Instagram", url: "#", handle: "@maheswari" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "mou-living",
      name: "Mou Living",
      avatar: "/creators/top100/mou-living.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 190000,
      rating: 4.5,
      bio: "Lifestyle vlogger sharing home, travel snippets, and daily routines.",
      languages: ["English", "Telugu"],
      audienceType: "Millennials",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Mou Living" },
        { platform: "Instagram", url: "#", handle: "@mouliving" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "muna-bhai",
      name: "Muna Bhai",
      avatar: "/creators/top100/muna-bhai.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 340000,
      rating: 4.6,
      bio: "Comedy creator with fun characters and short-form entertainment videos.",
      languages: ["Telugu", "English"],
      audienceType: "Family",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Muna Bhai" },
        { platform: "Instagram", url: "#", handle: "@munabhai" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "nandhu",
      name: "Nandhu",
      avatar: "/creators/top100/nandhu.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 210000,
      rating: 4.5,
      bio: "Lifestyle creator sharing reels, vlogs, and daily moments.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Nandhu" },
        { platform: "Instagram", url: "#", handle: "@nandhu" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "niharika",
      name: "Niharika",
      avatar: "/creators/top100/niharika.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 260000,
      rating: 4.6,
      bio: "Lifestyle creator sharing trendy reels, short vlogs, and fun content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Niharika" },
        { platform: "Instagram", url: "#", handle: "@niharika" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sai-prasanna",
      name: "Sai Prasanna",
      avatar: "/creators/top100/sai-prasanna.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 180000,
      rating: 4.5,
      bio: "Lifestyle creator sharing relatable content, routines, and short vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Sai Prasanna" },
        { platform: "Instagram", url: "#", handle: "@saiprasanna" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "shanmukh",
      name: "Shanmukh",
      avatar: "/creators/top100/shanmukh.jpg",
      city: "Hyderabad",
      niche: "Comedy",
      followers: 720000,
      rating: 4.8,
      bio: "Comedy and storytelling creator known for entertaining sketches and web content.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Shanmukh" },
        { platform: "Instagram", url: "#", handle: "@shanmukh" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "shiva-jyothi",
      name: "Shiva Jyothi",
      avatar: "/creators/top100/shiva-jyothi.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 200000,
      rating: 4.5,
      bio: "Lifestyle creator sharing routines, fashion moments, and everyday vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Millennials",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Shiva Jyothi" },
        { platform: "Instagram", url: "#", handle: "@shivajyothi" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "sirihanumanth",
      name: "Siri Hanumanth",
      avatar: "/creators/top100/sirihanumanth.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 300000,
      rating: 4.6,
      bio: "Lifestyle creator sharing daily vlogs, relatable content, and trend videos.",
      languages: ["Telugu", "English"],
      audienceType: "Gen Z",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Siri Hanumanth" },
        { platform: "Instagram", url: "#", handle: "@sirihanumanth" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "vismai",
      name: "Vismai",
      avatar: "/creators/top100/vismai.jpg",
      city: "Hyderabad",
      niche: "Food",
      followers: 1200000,
      rating: 4.9,
      bio: "Food creator sharing recipes, cooking tips, and Telugu cuisine favorites.",
      languages: ["Telugu", "English"],
      audienceType: "Parents",
      region: "India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Vismai" },
        { platform: "Instagram", url: "#", handle: "@vismai" }
      ],
      pastBrands: [],
      reviews: []
    },
    {
      id: "vithika",
      name: "Vithika",
      avatar: "/creators/top100/vithika.jpg",
      city: "Hyderabad",
      niche: "Lifestyle",
      followers: 260000,
      rating: 4.6,
      bio: "Lifestyle creator sharing fashion, wellness, and daily vlogs.",
      languages: ["Telugu", "English"],
      audienceType: "Women 18-35",
      region: "South India",
      socialLinks: [
        { platform: "YouTube", url: "#", handle: "Vithika" },
        { platform: "Instagram", url: "#", handle: "@vithika" }
      ],
      pastBrands: [],
      reviews: []
    }
  ];

  return influencers;
}

export const sampleNotifications: Notification[] = [
  { id: 'n1', type: 'collaboration', title: 'New Collaboration Request', description: 'Divya wants to collaborate on a Handcrafted Banarasi Saree campaign', timestamp: '2 min ago', read: false },
  { id: 'n2', type: 'message', title: 'New Message Received', description: 'Sivaathmika sent you a message about the homemade pickles', timestamp: '15 min ago', read: false },
  { id: 'n3', type: 'review', title: 'New Review Posted', description: 'You received a 5-star rating from G दादी Traditional Pickles', timestamp: '1 hour ago', read: false },
  { id: 'n4', type: 'system', title: 'Profile Update Reminder', description: 'Complete your profile to increase visibility by 40%', timestamp: '3 hours ago', read: true },
  { id: 'n5', type: 'collaboration', title: 'Collaboration Accepted', description: 'Ananya accepted your collaboration request for block prints', timestamp: '5 hours ago', read: true },
  { id: 'n6', type: 'message', title: 'Message from Yashoda', description: 'Yashoda wants to discuss an Ethnic Fusion Wear campaign', timestamp: '1 day ago', read: true },
];

export const sampleChatThreads: ChatThread[] = [
  {
    id: 'chat1',
    participantName: 'Demon Pavan',
    participantAvatar: '/creators/demon-pavan.webp',
    participantRole: 'client',
    lastMessage: 'Sure, I would love to collaborate on this campaign!',
    lastTimestamp: '2 min ago',
    unread: 2,
    isOnline: true,
    lastSeen: 'Online',
    messages: [
      { id: 'm1', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hi Demon Pavan! I loved your collection of Banarasi sarees. Would you be interested in a collaboration?', timestamp: '10:30 AM' },
      { id: 'm2', senderId: 'demon-pavan', senderName: 'Demon Pavan', senderAvatar: '/creators/demon-pavan.webp', text: 'Thank you so much! I appreciate your interest. What kind of collaboration did you have in mind?', timestamp: '10:35 AM' },
      { id: 'm3', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'I am launching a new heritage series and would like to feature your sarees in my next set of reels.', timestamp: '10:40 AM' },
      { id: 'm4', senderId: 'demon-pavan', senderName: 'Demon Pavan', senderAvatar: '/creators/demon-pavan.webp', text: 'That sounds amazing! Our heritage weaves are perfect for that. Could you share more details about the budget and timeline?', timestamp: '10:45 AM' },
      { id: 'm5', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Budget is ₹75,000 for the full package. We need the content live by next month.', timestamp: '10:50 AM' },
      { id: 'm6', senderId: 'demon-pavan', senderName: 'Demon Pavan', senderAvatar: '/creators/demon-pavan.webp', text: 'Sure, I would love to collaborate on this campaign!', timestamp: '10:52 AM' },
    ],
  },
  {
    id: 'chat2',
    participantName: 'Naa Anvesana',
    participantAvatar: '/creators/naa-anvesana-chat.jpg',
    participantRole: 'client',
    lastMessage: 'I will send you the samples by Friday',
    lastTimestamp: '1 hour ago',
    unread: 0,
    isOnline: false,
    lastSeen: 'last seen 1 hour ago',
    messages: [
      { id: 'm7', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hey Naa Anvesana, how are the pickle samples coming along?', timestamp: '9:00 AM' },
      { id: 'm8', senderId: 'anvesh', senderName: 'Naa Anvesana', senderAvatar: '/creators/naa-anvesana-chat.jpg', text: 'Going great! We have prepared the Avakaya and Gongura varieties.', timestamp: '9:15 AM' },
      { id: 'm9', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Perfect! When can I expect them?', timestamp: '9:20 AM' },
      { id: 'm10', senderId: 'anvesh', senderName: 'Naa Anvesana', senderAvatar: '/creators/naa-anvesana-chat.jpg', text: 'I will send you the samples by Friday', timestamp: '9:25 AM' },
    ],
  },
  {
    id: 'chat3',
    participantName: 'Abhigna Reddy',
    participantAvatar: '/creators/abhigna-reddy-chat.jpg',
    participantRole: 'client',
    lastMessage: 'Looking forward to working together! 🎉',
    lastTimestamp: '5 hours ago',
    unread: 1,
    isOnline: false,
    lastSeen: 'last seen 5 hours ago',
    messages: [
      { id: 'm11', senderId: 'abhigna-reddy', senderName: 'Abhigna Reddy', senderAvatar: '/creators/abhigna-reddy-chat.jpg', text: 'Hi! I saw your collaboration request for the block prints. Let\'s do it!', timestamp: 'Yesterday 4:00 PM' },
      { id: 'm12', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Awesome! We think your textiles are beautiful.', timestamp: 'Yesterday 4:15 PM' },
      { id: 'm13', senderId: 'abhigna-reddy', senderName: 'Abhigna Reddy', senderAvatar: '/creators/abhigna-reddy-chat.jpg', text: 'Looking forward to working together! 🎉', timestamp: 'Yesterday 4:30 PM' },
    ],
  },
];

export const sampleInfluencerChats: ChatThread[] = [
  {
    id: 'chat-brand-1',
    participantName: 'TechStart Inc.',
    participantAvatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    participantRole: 'client',
    lastMessage: 'We would like to sponsor your next gaming stream.',
    lastTimestamp: '10 min ago',
    unread: 1,
    isOnline: true,
    lastSeen: 'Online',
    messages: [
      { id: 'mb1', senderId: 'brand-1', senderName: 'TechStart Inc.', senderAvatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop', text: 'Hi! We have a new gaming peripheral launching soon. Are you interested in reviewing it?', timestamp: 'Yesterday 2:00 PM' },
      { id: 'mb2', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hello! That sounds interesting. What kind of peripheral is it?', timestamp: 'Yesterday 2:30 PM' },
      { id: 'mb3', senderId: 'brand-1', senderName: 'TechStart Inc.', senderAvatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop', text: 'It is a mechanical keyboard with custom switches. We would like to sponsor your next gaming stream.', timestamp: 'Yesterday 3:00 PM' },
    ],
  },
  {
    id: 'chat-brand-2',
    participantName: 'EthnicVibes',
    participantAvatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    participantRole: 'client',
    lastMessage: 'Do you do fashion hauls?',
    lastTimestamp: '3 hours ago',
    unread: 0,
    isOnline: false,
    lastSeen: 'last seen 3 hours ago',
    messages: [
      { id: 'mb4', senderId: 'brand-2', senderName: 'EthnicVibes', senderAvatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop', text: 'Loved your recent reel! Your style really resonates with our brand.', timestamp: 'Mon 10:00 AM' },
      { id: 'mb5', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Thank you! I appreciate that. I love ethnic wear.', timestamp: 'Mon 10:15 AM' },
      { id: 'mb6', senderId: 'brand-2', senderName: 'EthnicVibes', senderAvatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop', text: 'Do you do fashion hauls? We have a new collection suitable for the upcoming festive season.', timestamp: 'Mon 11:00 AM' },
    ],
  },
  {
    id: 'chat-client-3',
    participantName: 'Rahul Verma',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    participantRole: 'client',
    lastMessage: 'Is the date confirmed for the shoot?',
    lastTimestamp: '1 day ago',
    unread: 0,
    isOnline: false,
    lastSeen: 'last seen 1 day ago',
    messages: [
      { id: 'mb7', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hi Rahul, regarding the product shoot next week.', timestamp: 'Fri 4:00 PM' },
      { id: 'mb8', senderId: 'client-3', senderName: 'Rahul Verma', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', text: 'Yes, we are finalizing the location. Will let you know by EOD.', timestamp: 'Fri 4:15 PM' },
      { id: 'mb9', senderId: 'client-3', senderName: 'Rahul Verma', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', text: 'Is the date confirmed for the shoot? We prefer Saturday.', timestamp: 'Fri 5:30 PM' },
    ],
  },
];

export function formatFollowers(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
