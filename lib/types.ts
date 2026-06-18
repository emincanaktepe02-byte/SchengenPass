export interface Country {
  code: string;
  name: string;
  flag: string;
  popularCity: string;
  destinationCode: string;
  centers: string[];
  visible: boolean;
  tips: string[];
  requirements: string[];
  processingTime: string;
  avgWait: string;
}

export interface Appointment {
  id: string;
  country: string;
  flag: string;
  center: string;
  appointmentDate: string;
  source?: string;
  note?: string;
  sharedAt: string;
  screenshotUrl?: string;
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  date: string;
  price: string;
  airline: string;
  sourceLabel?: string;
  sourceUrl?: string;
  note?: string;
  postedAt: string;
}
