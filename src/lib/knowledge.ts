export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

export const CHURCH_INFO = {
  name: 'Grace Community Church',
  tagline: 'A place to belong, believe, and become.',
  address: '1428 Maple Avenue, Cedar Falls, IA 50613',
  phone: '(319) 555-0142',
  email: 'hello@gracecommunity.org',
  pastor: 'Pastor David Thompson',
  youthPastor: 'Pastor Sarah Mitchell',
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'service-times',
    category: 'Services',
    keywords: ['time', 'times', 'service', 'services', 'when', 'schedule', 'mass', 'worship', 'hour', 'hours', 'sunday', 'saturday'],
    question: 'What are the service times?',
    answer:
      "Our Sunday worship services are at 9:00 AM (traditional) and 11:00 AM (contemporary). We also have a Wednesday evening prayer service at 7:00 PM. Everyone is welcome at any of our services!",
  },
  {
    id: 'location',
    category: 'Visit',
    keywords: ['where', 'location', 'address', 'directions', 'find', 'located', 'map', 'get there', 'drive', 'parking'],
    question: 'Where is the church located?',
    answer:
      "We're located at 1428 Maple Avenue, Cedar Falls, IA 50613. There's visitor parking right out front — look for the reserved spots near the main entrance. If you need directions, just give us a call at (319) 555-0142.",
  },
  {
    id: 'what-to-wear',
    category: 'Visit',
    keywords: ['wear', 'dress', 'clothes', 'attire', 'casual', 'formal', 'outfit'],
    question: 'What should I wear to a service?',
    answer:
      "Come as you are! You'll see everything from jeans to suits on a Sunday morning. We care about your heart, not your wardrobe. Wear whatever makes you comfortable.",
  },
  {
    id: 'kids-children',
    category: 'Family',
    keywords: ['kid', 'kids', 'child', 'children', 'nursery', 'sunday school', 'childcare', 'baby', 'babies', 'toddler', 'family', 'little ones'],
    question: 'Do you have programs for children?',
    answer:
      "Absolutely! We have a safe, loving environment for kids of all ages. Nursery care is available for infants and toddlers during both Sunday services. Sunday School for ages 3–12 runs during the 11:00 AM service. Check with the Welcome Center for details!",
  },
  {
    id: 'youth-group',
    category: 'Family',
    keywords: ['youth', 'teen', 'teens', 'teenager', 'teenagers', 'youth group', 'middle school', 'high school', 'student', 'students'],
    question: 'Is there a youth group?',
    answer:
      "Yes! Our youth group, led by Pastor Sarah Mitchell, meets every Sunday evening from 6:00–8:00 PM. It's open to students in grades 6–12 and includes games, worship, a message, and small group discussions.",
  },
  {
    id: 'new-here',
    category: 'Visit',
    keywords: ['new', 'new here', 'first time', 'first visit', 'visitor', 'visiting', 'guest', 'never been', 'plan a visit', 'come', 'coming'],
    question: "I'm new here. What should I expect?",
    answer:
      "We're so glad you're considering visiting! When you arrive, you'll be greeted at the door by our welcome team. The service lasts about 75 minutes and includes music, prayer, and a message from our pastor. We have a Welcome Center where you can ask questions or learn more about us.",
  },
  {
    id: 'become-member',
    category: 'Membership',
    keywords: ['member', 'membership', 'join', 'joining', 'become a member', 'sign up', 'enroll'],
    question: 'How do I become a member?',
    answer:
      "We'd love to have you as part of our church family! Membership starts with our 'Discover Grace' class, held the first Sunday of each month at 9:45 AM. You'll learn about our mission, beliefs, and how to get connected.",
  },
  {
    id: 'beliefs',
    category: 'About',
    keywords: ['believe', 'beliefs', 'faith', 'doctrine', 'theology', 'statement of faith', 'what do you believe', 'values', 'mission'],
    question: 'What does the church believe?',
    answer:
      "We believe in one God — Father, Son, and Holy Spirit. We trust the Bible as God's inspired Word, and we believe that Jesus Christ is our Lord and Savior, that He died for our sins and rose again.",
  },
  {
    id: 'baptism',
    category: 'Sacraments',
    keywords: ['baptism', 'baptize', 'baptized', 'baptising', 'christening', 'dedication'],
    question: 'How can I get baptized?',
    answer:
      "Baptism is a beautiful step of faith! We hold baptism services several times a year. If you're interested, sign up at the Welcome Center or call the office. Pastor David will meet with you to discuss your faith journey.",
  },
  {
    id: 'communion',
    category: 'Sacraments',
    keywords: ['communion', 'eucharist', 'lords supper', "lord's supper", 'bread', 'wine', 'sacrament'],
    question: 'How often do you have communion?',
    answer:
      "We celebrate communion on the first Sunday of every month during both morning services. All who trust in Jesus Christ are welcome to participate. We use bread and grape juice.",
  },
  {
    id: 'prayer-request',
    category: 'Pastoral Care',
    keywords: ['prayer', 'pray', 'prayer request', 'pray for', 'need prayer', 'intercession', 'praying'],
    question: 'How do I submit a prayer request?',
    answer:
      "We'd be honored to pray for you. You can submit a prayer request through our website, by calling the church office at (319) 555-0142, or by filling out a prayer card at the Welcome Center. Your requests are kept confidential.",
  },
  {
    id: 'counseling',
    category: 'Pastoral Care',
    keywords: ['counseling', 'counsel', 'counselor', 'therapy', 'pastoral care', 'help', 'struggling', 'crisis', 'support', 'grief', 'marriage'],
    question: 'Does the church offer counseling?',
    answer:
      "Yes. Pastor David offers pastoral counseling for individuals and couples by appointment. For more specialized needs, we can refer you to trusted Christian counselors in the Cedar Falls area.",
  },
  {
    id: 'wedding',
    category: 'Life Events',
    keywords: ['wedding', 'marry', 'marriage', 'get married', 'ceremony', 'venue', 'venue rental', 'reception'],
    question: 'Can I get married at the church?',
    answer:
      "Congratulations! Our sanctuary is available for weddings for both members and non-members. We require pre-marital counseling with Pastor David, which is a wonderful way to prepare for your marriage.",
  },
  {
    id: 'funeral',
    category: 'Life Events',
    keywords: ['funeral', 'memorial', 'burial', 'grief', 'loss', 'passed away', 'died', 'death', 'celebration of life'],
    question: 'Can the church host a funeral or memorial service?',
    answer:
      "We're so sorry for your loss. Our sanctuary and fellowship hall are available for funeral and memorial services. Pastor David is available to officiate and to offer grief support. Please contact us at (319) 555-0142.",
  },
  {
    id: 'small-groups',
    category: 'Community',
    keywords: ['small group', 'small groups', 'bible study', 'bible studies', 'home group', 'home groups', 'life group', 'life groups', 'community group', 'fellowship', 'study', 'group', 'groups'],
    question: 'Are there small groups or Bible studies?',
    answer:
      "Yes! We have small groups that meet in homes throughout the week — there's one for everyone, from young adults to seniors. Groups study the Bible, pray together, and build lasting friendships.",
  },
  {
    id: 'volunteer',
    category: 'Get Involved',
    keywords: ['volunteer', 'volunteering', 'serve', 'serving', 'help out', 'get involved', 'ministry', 'ministries', 'outreach', 'serve the church'],
    question: 'How can I volunteer or get involved?',
    answer:
      "There are so many ways to serve! We have teams for worship, hospitality, children's ministry, tech/media, outreach, and more. Stop by the Welcome Center to fill out a serving interest form.",
  },
  {
    id: 'giving-donate',
    category: 'Give',
    keywords: ['give', 'giving', 'donate', 'donation', 'donate', 'tithe', 'tithing', 'offering', 'offerings', 'contribute', 'financial', 'stewardship', 'online giving'],
    question: 'How can I give or donate?',
    answer:
      "Thank you for your generosity! You can give online through our website, by text, or during the offering at any Sunday service. You can also mail a check to the church office.",
  },
  {
    id: 'food-pantry',
    category: 'Outreach',
    keywords: ['food pantry', 'food', 'pantry', 'food bank', 'meals', 'meal', 'hungry', 'hunger', 'benevolence', 'assistance', 'help with food', 'groceries'],
    question: 'Do you have a food pantry or assistance program?',
    answer:
      "Yes! Our food pantry is open every Tuesday and Thursday from 10:00 AM to 1:00 PM. Anyone in need is welcome — no questions asked. We also have a benevolence fund to help with utilities and other immediate needs.",
  },
  {
    id: 'community-events',
    category: 'Community',
    keywords: ['event', 'events', 'community', 'activity', 'activities', 'fellowship', 'potluck', 'picnic', 'concert', 'vacation bible school', 'vbs', 'easter', 'christmas', 'holiday'],
    question: 'What community events do you host?',
    answer:
      "We love bringing people together! Throughout the year we host a community Easter egg hunt, Vacation Bible School in June, a summer picnic, a fall festival, and a Christmas Eve candlelight service.",
  },
  {
    id: 'contact',
    category: 'Contact',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'office', 'office hours', 'reach someone', 'talk to', 'speak to'],
    question: 'How can I contact the church?',
    answer:
      "You can reach us by phone at (319) 555-0142 or by email at hello@gracecommunity.org. Our office is open Monday–Friday, 9:00 AM to 4:00 PM.",
  },
  {
    id: 'office-hours',
    category: 'Contact',
    keywords: ['office hours', 'open', 'closed', 'when is the office', 'hours', 'available'],
    question: 'What are the office hours?',
    answer:
      "Our church office is open Monday through Friday, 9:00 AM to 4:00 PM. We're closed on major holidays. Feel free to call (319) 555-0142 or stop by during those hours.",
  },
  {
    id: 'pastor',
    category: 'About',
    keywords: ['pastor', 'preacher', 'minister', 'reverend', 'father', 'priest', 'leader', 'lead pastor', 'david', 'thompson', 'who is the pastor'],
    question: 'Who is the pastor?',
    answer:
      "Our lead pastor is Pastor David Thompson. He's been with us for over 12 years and has a heart for teaching and pastoral care. He'd love to meet you — stop by the Welcome Center after a service!",
  },
  {
    id: 'denomination',
    category: 'About',
    keywords: ['denomination', 'denominational', 'what kind of church', 'type of church', 'catholic', 'protestant', 'baptist', 'methodist', 'non-denominational', 'evangelical'],
    question: 'What denomination is the church?',
    answer:
      "Grace Community is a non-denominational Christian church. We welcome people from all backgrounds and traditions. Our focus is on Jesus Christ and the Bible.",
  },
  {
    id: 'accessible',
    category: 'Visit',
    keywords: ['accessible', 'accessibility', 'wheelchair', 'disability', 'disabled', 'handicap', 'handicapped', 'ramp', 'elevator', 'ada', 'mobility', 'hearing', 'sign language'],
    question: 'Is the church accessible?',
    answer:
      "Yes! Our building is fully accessible. We have reserved accessible parking, ramps to all entrances, an elevator to the second floor, and accessible restrooms. We also offer large-print bulletins.",
  },
  {
    id: 'livestream',
    category: 'Services',
    keywords: ['livestream', 'live stream', 'online', 'watch online', 'stream', 'streaming', 'video', 'youtube', 'facebook live', 'remote', 'from home'],
    question: 'Can I watch services online?',
    answer:
      "Yes! We livestream both Sunday services at 9:00 AM and 11:00 AM on our website and YouTube channel. You can also watch past services anytime. It's a great option if you're traveling or homebound.",
  },
  {
    id: 'salvation',
    category: 'Faith',
    keywords: ['salvation', 'saved', 'save', 'savior', 'jesus', 'christ', 'faith', 'accept jesus', 'give my life', 'born again', 'gospel', 'eternal life', 'heaven', 'sin', 'forgiveness'],
    question: 'How can I learn more about faith in Jesus?',
    answer:
      "We'd love to walk alongside you on this journey! Faith in Jesus is about trusting Him as your Lord and Savior — believing He died for your sins and rose again. Talk with someone at the Welcome Center or call us at (319) 555-0142.",
  },
  {
    id: 'greeting',
    category: 'General',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'whats up', "what's up"],
    question: 'Hello!',
    answer:
      "Hello and welcome! I'm here to help answer any questions you might have about Grace Community Church. You can ask me about service times, our location, children's programs, prayer requests, and much more!",
  },
  {
    id: 'coffee',
    category: 'General',
    keywords: ['coffee'],
    question: 'Do you serve coffee?',
    answer:
      "Yes! We are partnered with local coffee roasters to bring fresh coffee every Sunday morning!",
  },
  {
    id: 'thanks',
    category: 'General',
    keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'grateful', 'bless you'],
    question: 'Thank you!',
    answer:
      "You're so welcome! I'm glad I could help. If you have any other questions — now or later — I'm always here. May God bless you, and we hope to see you at Grace Community soon!",
  },
  {
    id: 'who-are-you',
    category: 'General',
    keywords: ['who are you', 'what are you', 'your name', 'are you a bot', 'are you real', 'are you ai', 'chatbot', 'robot', 'what can you do', 'help me', 'what do you do'],
    question: 'Who are you?',
    answer:
      "I'm the Grace Community Church assistant — a friendly chatbot here to answer your questions about our church, services, programs, and more. I can't replace a real conversation, but I can help point you in the right direction!",
  },

  // Seasonal & Holiday Events
  {
    id: 'christmas-services',
    category: 'Services',
    keywords: ['christmas', 'christmas eve', 'christmas morning', 'holiday', 'december', 'nativity', 'advent'],
    question: 'What are your Christmas service times?',
    answer:
      "During the Christmas season, we host special services and events. On Christmas Eve, we hold a candlelight service at 6:00 PM and 10:00 PM. Regular Sunday services continue on December 22nd. Check our website or call (319) 555-0142 for the most up-to-date Christmas schedule.",
  },
  {
    id: 'easter-services',
    category: 'Services',
    keywords: ['easter', 'easter sunday', 'resurrection', 'spring', 'palm sunday', 'good friday'],
    question: 'What happens at Easter?',
    answer:
      "Easter is one of our biggest celebration days! We have special services on Palm Sunday, Good Friday evening, and Easter Sunday morning. Easter Sunday features sunrise and regular morning services with special music and messages. We also host an Easter egg hunt for the community.",
  },
  {
    id: 'vacation-bible-school',
    category: 'Family',
    keywords: ['vacation bible school', 'vbs', 'summer program', 'kids summer', 'june', 'children program'],
    question: 'Tell me about Vacation Bible School.',
    answer:
      "Vacation Bible School (VBS) is held in June and is a favorite for kids ages 3–12! It's a week-long program with music, crafts, games, and Bible lessons. It's free for all children in the community. Registration usually opens in May — watch for announcements!",
  },
  {
    id: 'lent-season',
    category: 'Services',
    keywords: ['lent', 'lenten', 'fasting', 'ash wednesday', 'spring', 'ash', 'wednesday service'],
    question: 'Do you have Lenten services?',
    answer:
      "Yes! During Lent, we focus on prayer and spiritual growth. We hold special Wednesday evening services and often have Ash Wednesday services. Many people use Lent as a time to deepen their faith through prayer, fasting, and study. Join us for these reflective services.",
  },

  // Follow-up Questions
  {
    id: 'different-service-times',
    category: 'Services',
    keywords: ['different', 'traditional', 'contemporary', 'difference', '9am', '11am', 'which service', 'which one'],
    question: 'What's the difference between the 9 AM and 11 AM services?',
    answer:
      "Great question! The 9:00 AM service is traditional with organ music and hymns. The 11:00 AM service is contemporary with a full band, modern songs, and a more casual feel. Both services have the same message. Visit whichever style speaks to you!",
  },
  {
    id: 'bring-infant',
    category: 'Family',
    keywords: ['infant', 'newborn', 'baby', 'bring baby', 'nursing', 'mother', 'postpartum'],
    question: 'Can I bring my infant to the service?',
    answer:
      "Absolutely! Many parents bring their babies. We have a nursing room with comfortable seating and audio of the service if you'd like privacy. Nursery care is also available during both services for ages 0–2. Do whatever works best for your family!",
  },
  {
    id: 'kids-leave-during-service',
    category: 'Family',
    keywords: ['kids leave', 'children leave', 'when do kids leave', 'children program', 'what time', 'sunday school'],
    question: 'When do children leave for Sunday School?',
    answer:
      "Children ages 3–12 are invited to Sunday School during the 11:00 AM service. They typically leave for classrooms after a brief time of worship (around 11:15 AM). Parents can pick them up at the end of service. It's a great way for kids to learn Bible stories and make friends!",
  },
  {
    id: 'how-long-service',
    category: 'Services',
    keywords: ['how long', 'duration', 'service length', 'time', 'minutes', 'how many minutes'],
    question: 'How long does a typical service last?',
    answer:
      "Our services are typically 60–75 minutes, depending on what's happening that week. We include worship music, prayer, announcements, and a message. Everything wraps up by 12:15 PM or 1:15 PM (from the 9 AM and 11 AM services respectively).",
  },

  // FAQ Follow-ups
  {
    id: 'visiting-alone',
    category: 'Visit',
    keywords: ['visiting alone', 'come alone', 'by yourself', 'new person', 'single', 'nobody to bring'],
    question: 'Is it okay to visit by myself?',
    answer:
      "Absolutely! Many people visit alone for the first time. Our Welcome Team will greet you warmly, and you'll find a welcoming community. If you'd like to sit with a group or have someone to chat with, just let the greeters know — they're happy to help you connect.",
  },
  {
    id: 'no-religious-background',
    category: 'Visit',
    keywords: ['no background', 'never been', 'never gone to church', 'new to church', 'unfamiliar', 'atheist', 'not religious'],
    question: 'I have no religious background. Will I feel welcome?',
    answer:
      "Absolutely yes! Many people come from all backgrounds. Our community is welcoming and non-judgmental. No one will pressure you — just come, listen, and ask questions. The Welcome Center team is great at helping newcomers feel at ease.",
  },
  {
    id: 'join-after-moving',
    category: 'Membership',
    keywords: ['moving', 'moved here', 'new to area', 'relocating', 'transfer membership', 'from another church'],
    question: 'I just moved to Cedar Falls. Can I join the church?',
    answer:
      "We'd love to welcome you to Grace Community! Whether you're new to the area or transferring from another church, our 'Discover Grace' class is the perfect place to connect. It's held the first Sunday of each month at 9:45 AM. Come meet the team and learn about our church family!",
  },
  {
    id: 'questions-during-service',
    category: 'Services',
    keywords: ['questions', 'confused', 'don\'t know', 'what do we do', 'when to stand', 'confused about service'],
    question: 'What if I don\'t know what\'s happening during the service?',
    answer:
      "Don't worry! Just ask a neighbor or greeter — we're happy to help. You'll see that others follow along in the bulletin. There's no 'right way' to participate. Just be yourself and enjoy the experience.",
  },

  // Additional Practical Questions
  {
    id: 'can-i-give-online',
    category: 'Give',
    keywords: ['online giving', 'online donate', 'digital', 'app', 'paypal', 'payment app', 'text to give'],
    question: 'Can I give online or by app?',
    answer:
      "Yes! We offer online giving through our website. You can also give by text or set up recurring monthly gifts. These options make it convenient to support the church's mission. For details, visit our website or ask at the Welcome Center.",
  },
  {
    id: 'drop-off-kids-only',
    category: 'Family',
    keywords: ['drop off', 'leaving', 'drop children', 'go do something else', 'nursery only', 'childcare only'],
    question: 'Can I drop off my kids and come back later?',
    answer:
      "We ask that at least one parent or guardian stay during the service. However, if you need to step out briefly (for a phone call, etc.), our staff can watch the children. Feel free to ask a staff member. For our nursery (ages 0–2), we can arrange childcare if you have a specific need — just call ahead at (319) 555-0142.",
  },
  {
    id: 'parking-availability',
    category: 'Visit',
    keywords: ['parking', 'where to park', 'handicap', 'accessible parking', 'spots', 'lot'],
    question: 'Is parking always available?',
    answer:
      "Yes! We have plenty of parking in our lot and street parking nearby. Reserved accessible spaces are available near the main entrance. Visitor parking is clearly marked. We rarely have a shortage, even on busy Sundays.",
  },
  {
    id: 'what-to-do-first-visit',
    category: 'Visit',
    keywords: ['first visit', 'what to do', 'first time', 'tips', 'where to go', 'where do i go'],
    question: 'What should I do when I first arrive?',
    answer:
      "When you arrive, look for friendly greeters at the entrance — they'll give you a warm welcome and a bulletin. Feel free to ask them questions or for a tour. We suggest visiting the Welcome Center in the lobby to learn more about the church. Find a seat, relax, and enjoy the service!",
  },
  {
    id: 'mission-work',
    category: 'Get Involved',
    keywords: ['mission', 'missions', 'mission trips', 'mission work', 'serve globally', 'international', 'outreach abroad'],
    question: 'Does the church do mission work?',
    answer:
      "Yes! We're passionate about serving locally and globally. Throughout the year, we organize mission trips and support partner organizations around the world. We also have a strong local outreach presence. If you're interested in joining a mission trip or learning more, ask at the Welcome Center!",
  },
];

export const SUGGESTED_QUESTIONS = [
  'What time are your services?',
  'Where are you located?',
  'Is there a youth group?',
  'How do I become a member?',
  'How can I submit a prayer request?',
  'What should I wear?',
];
