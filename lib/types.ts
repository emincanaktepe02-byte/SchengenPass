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

export interface Signal {
  id: string;
  countryCode: string;
  countryName: string;
  flag: string;
  center: string;
  appointmentType: string;
  slots: number;
  foundAt: string;
  filledAt?: string;
  isActive: boolean;
  popularCity: string;
  destinationCode: string;
}
