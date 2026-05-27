  export interface LaunchPatch {
    small: string | null;
    large: string | null;
  }

  export interface LaunchLinks {
    patch: LaunchPatch;
    webcast: string | null;
    article: string | null;
    wikipedia: string | null;
  }

  export interface Launch {
    id: string;
    name: string;
    flight_number: number;
    date_local: string;
    success: boolean | null;
    details: string | null;
    links: LaunchLinks;
  }