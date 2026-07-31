export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  price: string;
  tag?: string;
  imageUrl: string;
  description: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
}

export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface PendingEvent {
  id: string;
  title: string;
  type: string;
  expectedAttendees: string;
  organizerName: string;
  organizerInitials: string;
  organizerBgClass: string;
  dateSubmitted: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
}

// Landing Page Data
export const popularCategories = [
  "Tech Summits",
  "Art Exhibitions",
  "Music Festivals",
  "Networking"
];

export const featuredEvents: EventItem[] = [
  {
    id: "featured-1",
    title: "Design Leadership Summit",
    category: "Design",
    date: "Oct 24,2016 • 9:00 AM",
    location: "San Francisco, CA",
    price: "$299",
    tag: "Almost Full",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBvZ_CUepyGnmovfBf_-eZwc3rqxFyRXFZQM2rqXFDhE7zYXFCEgRhPtQ9vMSbimQNnv67UjISG1AwcvB0kkiaIykKC-b06KL8BdNBToFRuhW0cBm41OipvHyNH5xOwInJPa86WvJM10KtUhbuywfUS2BdfFgT2Znecmv7Pc8Cvxff4BBwAYsymQ-Zm1jrNDFOkP61MSZggTcjAEYRgeKybUWz0Ud-MW5XgVPJN8MF63PbhGLoTKebw",
    description: "A gathering of top design minds exploring the future of digital product creation and team dynamics."
  },
  {
    id: "featured-2",
    title: "Art & Tech Mixer",
    category: "Networking",
    date: "Nov 05,2016 • 6:30 PM",
    location: "New York, NY",
    price: "Free",
    tag: "Networking",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbH_2m1oEkxUd31uPGJc-fXGQw3-GvMypAiUAfiLtiFDdhC-Ce4GYvPQHk0AZ79TyXLELjpM_-EgyrikXM3gNg8iLHhFEMqRRinl43D7Of0qmE16nPdmQbf9ze7S29w_bXQkuVigAU19ji7ZclEIl0zqR5AlAnwUEvLT48HiSbBUbGF0k6SdZK6aS2MidahlFmNKSCgY-4mDnSmZZS740QAcTDykSKTzZlUfctqT2f36GgINjE8oecfw",
    description: "An evening of networking for creatives and technologists in a stunning gallery space."
  },
  {
    id: "featured-3",
    title: "Sustainable Future Expo",
    category: "Conference",
    date: "Dec 12,2016 • 10:00 AM",
    location: "Austin, TX",
    price: "$150",
    tag: "Conference",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyScamyVoRhS7QAcboNWlItepWRrAvauwTa-eXonXHIVwIiTlOHr0bDQkcbdomEWB2GFccW-Y4zpvzjgHftf81Xq-r2CNLJijGRTDyqmlmlFQT0lsTqzFLnF4hUZKSOTlSyn09gXp_wMovakt2M1DOGqLS0ZFFCds3TzyeCuYpceikDq8nIDNSQTHwugHOk4xv87bLyLei8FrOmNztV_Cqrh-ToIIfOUfU6y5SU6iMPMTcXE-fer5z5w",
    description: "Discover the latest innovations in sustainable technology and eco-friendly business practices."
  }
];

// Admin Dashboard Data
export const statsOverview: StatCard[] = [
  {
    id: "stat-revenue",
    title: "Total Revenue",
    value: "$124,500",
    change: "+12.5% from last month",
    isPositive: true,
    icon: "payments",
    iconBgClass: "bg-primary-container/20",
    iconTextClass: "text-primary-container"
  },
  {
    id: "stat-events",
    title: "Active Events",
    value: "342",
    change: "+5.2% from last month",
    isPositive: true,
    icon: "event_available",
    iconBgClass: "bg-secondary-container/20",
    iconTextClass: "text-secondary"
  },
  {
    id: "stat-registrations",
    title: "New Registrations",
    value: "1,893",
    change: "-2.1% from last month",
    isPositive: false,
    icon: "person_add",
    iconBgClass: "bg-tertiary-container/20",
    iconTextClass: "text-tertiary"
  }
];

export const chartRegistrationData = {
  labels: ["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24"],
  data: [1200, 1450, 1300, 1650, 1893, 1720, 1893]
};

export const quickActions: QuickAction[] = [
  {
    id: "action-organizers",
    title: "Manage Organizers",
    subtitle: "Review pending approvals",
    icon: "manage_accounts"
  },
  {
    id: "action-announcement",
    title: "Send Announcement",
    subtitle: "Broadcast to all users",
    icon: "campaign"
  },
  {
    id: "action-reports",
    title: "Export Reports",
    subtitle: "Generate CSV downloads",
    icon: "description"
  }
];

export const pendingEvents: PendingEvent[] = [
  {
    id: "pending-1",
    title: "Global Tech Summit2016",
    type: "Conference",
    expectedAttendees: "500+ expected",
    organizerName: "Jane Smith",
    organizerInitials: "JS",
    organizerBgClass: "bg-secondary-container text-on-secondary-container",
    dateSubmitted: "Oct 24,2016"
  },
  {
    id: "pending-2",
    title: "Design Leadership Workshop",
    type: "Workshop",
    expectedAttendees: "50 expected",
    organizerName: "Marcus Doe",
    organizerInitials: "MD",
    organizerBgClass: "bg-tertiary-container text-on-tertiary-container",
    dateSubmitted: "Oct 23,2016"
  },
  {
    id: "pending-3",
    title: "Annual Charity Gala",
    type: "Networking",
    expectedAttendees: "200 expected",
    organizerName: "Elena Hayes",
    organizerInitials: "EH",
    organizerBgClass: "bg-primary-container/30 text-primary",
    dateSubmitted: "Oct 22,2016"
  }
];

// About Page Data
export const aboutValues: ValueItem[] = [
  {
    id: "val-connection",
    title: "Human Connection",
    description: "Events should feel personal and alive. We design our features to foster real conversations, not just attendance.",
    icon: "groups",
    iconBgClass: "bg-primary-container/20",
    iconTextClass: "text-primary-container"
  },
  {
    id: "val-design",
    title: "Premium Design",
    description: "Minimalism meets utility. Our interface is elegant and out of the way, giving your events the presentation they deserve.",
    icon: "design_services",
    iconBgClass: "bg-secondary-container/20",
    iconTextClass: "text-secondary"
  },
  {
    id: "val-flow",
    title: "Effortless Flow",
    description: "Say goodbye to clunky software. Gatherly streamlines invitation, RSVP, seating layout, and registration in a single click.",
    icon: "offline_bolt",
    iconBgClass: "bg-tertiary-container/20",
    iconTextClass: "text-tertiary"
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "member-thomas",
    name: "Thomas Vance",
    role: "Co-Founder & CEO",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg2Sv2DNhMmgwgkfFYks_GRzoMLeZ6XJYePrP3UNcXUH5XDB-Km-FMcx-KMOu_3-x0mw_HKXxhUsTtlxqLgqE2vezXlqUxz166vDkePGTCogBanc_VYaqjQu1ZCsSVJ6Q6EW-AyfpBuxGGkg08CYZxNl5hY4hgpMgqCgSw0nsx8RwalDAvOtXANXY93-hUGr2-Bp6xNKHCXTD_2RDBOqpMeLzm5c-O-S0hQ5cth_K-qQq6MusROJur7w",
    bio: "Thomas has built and scaled products for over a decade. He is passionate about product aesthetics and simplifying workflows for high-end corporate events."
  },
  {
    id: "member-sophia",
    name: "Sophia Jenkins",
    role: "Co-Founder & Head of Experience",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg2Sv2DNhMmgwgkfFYks_GRzoMLeZ6XJYePrP3UNcXUH5XDB-Km-FMcx-KMOu_3-x0mw_HKXxhUsTtlxqLgqE2vezXlqUxz166vDkePGTCogBanc_VYaqjQu1ZCsSVJ6Q6EW-AyfpBuxGGkg08CYZxNl5hY4hgpMgqCgSw0nsx8RwalDAvOtXANXY93-hUGr2-Bp6xNKHCXTD_2RDBOqpMeLzm5c-O-S0hQ5cth_K-qQq6MusROJur7w",
    bio: "Sophia is an award-winning UI designer and event coordinator. She ensures that every pixel and transition in Gatherly captures the essence of sophisticated design."
  }
];
