export type Category = {
  categoryname: string;
  sport: string;
};

export type Subcategory = {
  asd: string;
  subcategory: string;
};

export type UpComingSessions = {
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  sessionStartTimex: string;
  id: string;
  meetingLink: string;
  date: string;
};

export type Doctors = {
  sessionId: string;
  Doctor: string;
  doctorid: string;
  categoryName: string;
  Startime: string;
};

export type Doctor = {
  bio: string;
  Doctor: string;
  doctorid: string;
  categoryName: string;
  Startime: string;
  Price: string;
};
