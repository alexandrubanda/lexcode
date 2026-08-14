export type ServiceItem = { no: string; title: string; body: string; meta: string };
export type WorkItem = { tag: string; title: string; body: string };
export type StepItem = { no: string; title: string; body: string; meta: string };
export type FactItem = { k: string; v: string };

export type Translations = {
  nav: {
    services: string;
    process: string;
    about: string;
    bookCall: string;
  };
  hero: {
    badge: string;
    heading: string;
    body: string;
    ctaBook: string;
    ctaDescribe: string;
    widget: {
      inputLabel: string;
      outputLabel: string;
      quote: string;
      pickTime: string;
      confirmBooking: string;
    };
  };
  services: {
    label: string;
    heading: string;
    subtitle: string;
    items: ServiceItem[];
    cta: { no: string; title: string; body: string; link: string };
  };
  work: {
    label: string;
    heading: string;
    subtitle: string;
    items: WorkItem[];
  };
  process: {
    label: string;
    heading: string;
    subtitle: string;
    steps: StepItem[];
  };
  about: {
    label: string;
    heading: string;
    body1: string;
    body2: string;
    comparison: {
      you: string;
      agencyLabel: string;
      agencySteps: [string, string, string];
      lexcodeLabel: string;
      sameDay: string;
      alexLabel: string;
    };
    facts: FactItem[];
  };
  contact: {
    label: string;
    heading: string;
    body: string;
    directLabel: string;
    formLabel: string;
    bookLink: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      timingLabel: string;
      timings: [string, string, string];
      submit: string;
      submitting: string;
      validationError: string;
    };
    success: {
      heading: string;
      body: string;
    };
    error: string;
  };
  booking: {
    title: string;
    weekdays: [string, string, string, string, string, string, string];
    months: [string, string, string, string, string, string, string, string, string, string, string, string];
    pickDate: string;
    pickTime: string;
    yourDetails: string;
    confirmed: string;
    noSlots: string;
    loadingSlots: string;
    back: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    confirm: string;
    confirming: string;
    successBody: string;
    joinMeet: string;
    close: string;
    slotTaken: string;
    genericError: string;
  };
  footer: {
    tagline: string;
    byline: string;
  };
};
