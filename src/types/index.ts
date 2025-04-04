type Measurement = {
  meters: number;
  feet: number;
};

type Mass = {
  kg: number;
  lb: number;
};

type Thrust = {
  kN: number;
  lbf: number;
};

type ISP = {
  sea_level: number;
  vacuum: number;
};

type PayloadWeight = {
  id: string;
  name: string;
  kg: number;
  lb: number;
};

type CompositeFairing = {
  height: Measurement;
  diameter: Measurement;
};

type Payloads = {
  composite_fairing: CompositeFairing;
  option_1: string;
};

type FirstStage = {
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
};

type SecondStage = {
  thrust: Thrust;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
};

type Engine = {
  isp: ISP;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
};

type LandingLegs = {
  number: number;
  material: string | null;
};

export type Rocket = {
  height: Measurement;
  diameter: Measurement;
  mass: Mass;
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engine;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
};


export type inputRocket = {
  name: string,
  type: string,
  active: boolean,
  stages: number,
  boosters: number,
  cost_per_launch: number,
  success_rate_pct: number,
  first_flight: string,
  country: string,
  company: string,
  wikipedia: string,
  description: string
}
