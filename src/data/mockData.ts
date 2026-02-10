export type UserRole = 'client' | 'influencer';

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
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: UserRole;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
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
  const influencers: Influencer[] = [];

  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const city = indianCities[i % indianCities.length];
    const niche = niches[i % niches.length];
    const followers = Math.floor(Math.random() * 4900000) + 100000;

    influencers.push({
      id: `inf-${i + 1}`,
      name,
      avatar: generateAvatar(name, i),
      city,
      niche,
      followers,
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      bio: `${name} is a popular ${niche.toLowerCase()} content creator from ${city}, known for engaging ${niche.toLowerCase()} content and brand collaborations across India.`,
      languages: pickN(languages, 2 + Math.floor(Math.random() * 2)),
      audienceType: pick(audienceTypes),
      region: city,
      socialLinks: [
        { platform: 'Instagram', url: '#', handle: `@${firstName.toLowerCase()}${lastName.toLowerCase()}` },
        { platform: 'YouTube', url: '#', handle: `${firstName} ${lastName}` },
        { platform: 'Twitter', url: '#', handle: `@${firstName.toLowerCase()}_${lastName.toLowerCase().slice(0, 3)}` },
      ],
      pastBrands: pickN(brands, 3 + Math.floor(Math.random() * 4)),
      reviews: [
        {
          clientName: `${pick(firstNames)} ${pick(lastNames)}`,
          rating: parseFloat((4 + Math.random()).toFixed(1)),
          comment: `Great collaboration with ${firstName}! Very professional and delivered amazing content on time.`,
          date: '2025-12-15',
        },
        {
          clientName: `${pick(firstNames)} ${pick(lastNames)}`,
          rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
          comment: `${firstName} brought excellent creative ideas to our campaign. Highly recommended!`,
          date: '2025-11-20',
        },
      ],
    });
  }

  return influencers;
}

export const sampleNotifications: Notification[] = [
  { id: 'n1', type: 'collaboration', title: 'New Collaboration Request', description: 'Priya Sharma wants to collaborate on a Fashion campaign', timestamp: '2 min ago', read: false },
  { id: 'n2', type: 'message', title: 'New Message Received', description: 'Rohit Kumar sent you a message about the tech review', timestamp: '15 min ago', read: false },
  { id: 'n3', type: 'review', title: 'New Review Posted', description: 'You received a 5-star rating from MamaEarth', timestamp: '1 hour ago', read: false },
  { id: 'n4', type: 'system', title: 'Profile Update Reminder', description: 'Complete your profile to increase visibility by 40%', timestamp: '3 hours ago', read: true },
  { id: 'n5', type: 'collaboration', title: 'Collaboration Accepted', description: 'Ananya Patel accepted your collaboration request', timestamp: '5 hours ago', read: true },
  { id: 'n6', type: 'message', title: 'Message from Nykaa', description: 'Nykaa brand team wants to discuss a beauty campaign', timestamp: '1 day ago', read: true },
];

export const sampleChatThreads: ChatThread[] = [
  {
    id: 'chat1',
    participantName: 'Priya Sharma',
    participantAvatar: generateAvatar('Priya Sharma', 1),
    participantRole: 'influencer',
    lastMessage: 'Sure, I would love to collaborate on this campaign!',
    lastTimestamp: '2 min ago',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hi Priya! We loved your content on sustainable fashion. Would you be interested in a collaboration?', timestamp: '10:30 AM' },
      { id: 'm2', senderId: 'inf-2', senderName: 'Priya Sharma', senderAvatar: generateAvatar('Priya Sharma', 1), text: 'Thank you so much! I appreciate your interest. What kind of collaboration did you have in mind?', timestamp: '10:35 AM' },
      { id: 'm3', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'We are launching a new eco-friendly clothing line and would like you to create content around it — Instagram reels and a YouTube video.', timestamp: '10:40 AM' },
      { id: 'm4', senderId: 'inf-2', senderName: 'Priya Sharma', senderAvatar: generateAvatar('Priya Sharma', 1), text: 'That sounds amazing! Sustainability is close to my heart. Could you share more details about the budget and timeline?', timestamp: '10:45 AM' },
      { id: 'm5', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Budget is ₹50,000 for the full package. We need the content live by end of March.', timestamp: '10:50 AM' },
      { id: 'm6', senderId: 'inf-2', senderName: 'Priya Sharma', senderAvatar: generateAvatar('Priya Sharma', 1), text: 'Sure, I would love to collaborate on this campaign!', timestamp: '10:52 AM' },
    ],
  },
  {
    id: 'chat2',
    participantName: 'Rohit Kumar',
    participantAvatar: generateAvatar('Rohit Kumar', 2),
    participantRole: 'influencer',
    lastMessage: 'I will send you the draft by Friday',
    lastTimestamp: '1 hour ago',
    unread: 0,
    messages: [
      { id: 'm7', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Hey Rohit, how is the tech review video coming along?', timestamp: '9:00 AM' },
      { id: 'm8', senderId: 'inf-3', senderName: 'Rohit Kumar', senderAvatar: generateAvatar('Rohit Kumar', 2), text: 'Going great! I have finished the unboxing and initial impressions segments.', timestamp: '9:15 AM' },
      { id: 'm9', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Perfect! When can we expect the final draft?', timestamp: '9:20 AM' },
      { id: 'm10', senderId: 'inf-3', senderName: 'Rohit Kumar', senderAvatar: generateAvatar('Rohit Kumar', 2), text: 'I will send you the draft by Friday', timestamp: '9:25 AM' },
    ],
  },
  {
    id: 'chat3',
    participantName: 'Ananya Patel',
    participantAvatar: generateAvatar('Ananya Patel', 3),
    participantRole: 'influencer',
    lastMessage: 'Looking forward to working together! 🎉',
    lastTimestamp: '5 hours ago',
    unread: 1,
    messages: [
      { id: 'm11', senderId: 'inf-4', senderName: 'Ananya Patel', senderAvatar: generateAvatar('Ananya Patel', 3), text: 'Hi! I saw your collaboration request. The fitness brand looks interesting!', timestamp: 'Yesterday 4:00 PM' },
      { id: 'm12', senderId: 'me', senderName: 'You', senderAvatar: '', text: 'Yes! We think your fitness content is a perfect match for our brand.', timestamp: 'Yesterday 4:15 PM' },
      { id: 'm13', senderId: 'inf-4', senderName: 'Ananya Patel', senderAvatar: generateAvatar('Ananya Patel', 3), text: 'Looking forward to working together! 🎉', timestamp: 'Yesterday 4:30 PM' },
    ],
  },
];

export function formatFollowers(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
