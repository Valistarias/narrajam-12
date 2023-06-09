const dryad = {
  crocus: {
    name: 'Crocus',
    meaning: 'Youthfull Gladness',
    side: 'dryad',
    nectarUpg: 2,
    flowerUpg: 1,
    flowerCost: 1,
    duration: 1,
    tier: 1,
  },
  sage: {
    name: 'Sage',
    meaning: 'Wisdom',
    side: 'dryad',
    nectarUpg: 0,
    flowerUpg: 1,
    flowerCost: 1,
    duration: 1,
    tier: 1,
  },
  callaLily: {
    name: 'Calla Lily',
    meaning: 'Beauty',
    side: 'dryad',
    nectarUpg: 2,
    flowerUpg: 2,
    flowerCost: 5,
    duration: 1,
    tier: 1,
  },
  edelweiss: {
    name: 'Edelweiss',
    meaning: 'Courage',
    side: 'dryad',
    nectarUpg: 0,
    flowerUpg: 2,
    flowerCost: 5,
    duration: 2,
    tier: 1,
  },
  borage: {
    name: 'Borage',
    meaning: 'Directness',
    side: 'dryad',
    nectarUpg: 2,
    flowerUpg: 3,
    flowerCost: 10,
    duration: 1,
    tier: 1,
  },
  coriander: {
    name: 'Coriander',
    meaning: 'Hidden Worth',
    side: 'dryad',
    nectarUpg: 0,
    flowerUpg: 3,
    flowerCost: 10,
    duration: 2,
    tier: 1,
  },
  butterflyWeed: {
    name: 'Butterfly Weed',
    meaning: 'Let Me go',
    side: 'dryad',
    nectarUpg: 2,
    flowerUpg: 3,
    flowerCost: 10,
    duration: 3,
    tier: 1,
  },
};

const tribe = {
  belladonna: {
    name: 'Belladonna',
    meaning: 'Silence',
    side: 'tribe',
    nectarUpg: 1,
    flowerUpg: 0,
    flowerCost: 1,
    duration: 1,
    tier: 1,
  },
  bluebell: {
    name: 'Bluebell',
    meaning: 'Humility',
    side: 'tribe',
    nectarUpg: 1,
    flowerUpg: 2,
    flowerCost: 1,
    duration: 1,
    tier: 2,
  },
  chives: {
    name: 'Chives',
    meaning: 'Usefulness',
    side: 'tribe',
    nectarUpg: 2,
    flowerUpg: 0,
    flowerCost: 5,
    duration: 1,
    tier: 3,
  },
  holly: {
    name: 'Holly',
    meaning: 'Domestic Happiness',
    side: 'tribe',
    nectarUpg: 2,
    flowerUpg: 2,
    flowerCost: 5,
    duration: 2,
    tier: 4,
  },
  geranium: {
    name: 'Geranium',
    meaning: 'Folly',
    side: 'tribe',
    nectarUpg: 2,
    flowerUpg: 0,
    flowerCost: 10,
    duration: 2,
    tier: 5,
  },
  candytuft: {
    name: 'Candytuft',
    meaning: 'Indiferrence',
    side: 'tribe',
    nectarUpg: 3,
    flowerUpg: 2,
    flowerCost: 10,
    duration: 2,
    tier: 6,
  },
  hyssop: {
    name: 'Hyssop',
    meaning: 'Sacrifice',
    side: 'tribe',
    nectarUpg: 3,
    flowerUpg: 0,
    flowerCost: 10,
    duration: 3,
    tier: 7,
  },
};

const neutral = {
  valerian: {
    name: 'Valerian',
    meaning: 'Readiness',
    side: 'neutral',
    nectarUpg: 1,
    flowerUpg: 1,
    flowerCost: 0,
    duration: 0,
    tier: 0,
  },
};

export default {
  ...dryad,
  ...tribe,
  ...neutral,
};
