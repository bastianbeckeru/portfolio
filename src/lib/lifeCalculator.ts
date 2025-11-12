type LifeStats = {
  birthDate: Date;
  lifeExpectancy: number;
  currentAge: number;
  lived: number;
  remaining: number;
};

type TimeUnit =
  | 'miliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

type TimeUnits = {
  miliseconds: 1000;
};

export function calculateLifeStats({
  birthDate,
  lifeExpectancy = 100,
  timeUnit = 'weeks',
}: {
  birthDate: Date;
  lifeExpectancy: number;
  timeUnit: TimeUnit;
}) {
  const now = new Date();
  const deadDate = addYears(birthDate, lifeExpectancy);

  const birthTime = birthDate.getTime();
  const nowTime = now.getTime();
  const deadTime = deadDate.getTime();

  const msLived = nowTime - birthTime;
  const msRemaining = deadTime - nowTime;

  return {
    currentAge: convertTime({ value: msLived, to: 'years' }),
    lifeExpectancy,
    deadDate,
    lived: convertTime({ value: msLived, to: timeUnit }),
    remaining: convertTime({ value: msRemaining, to: timeUnit }),
  };
}

function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

export function convertTime({
  value,
  from = 'miliseconds',
  to,
}: {
  value: number;
  from?: TimeUnit;
  to: TimeUnit;
}) {
  const units = {
    miliseconds: 1, // milisegundo base
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
    months: 30.4375 * 24 * 60 * 60 * 1000, // mes promedio
    years: 365.25 * 24 * 60 * 60 * 1000, // año promedio
  };

  if (!units[from] || !units[to]) {
    throw new Error('Unidad no válida.');
  }

  const result = (value * units[from]) / units[to];
  return Math.floor(result);
}
