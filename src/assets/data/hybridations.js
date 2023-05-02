const dryad = {
  crocus: {
    name: 'Crocus',
    meaning: 'Cheerfullness/Youthfull Gladness',
    side: 'dryad',
    nectarUpg: 2,
    flowerUpg: 1,
    flowerCost: 1,
    duration: 1,
    tier: 1,
  },
};

const tribe = {
  belladonna: {
    name: 'Belladonna',
    meaning: 'Silence',
    side: 'tribe',
    nectarUpg: 2,
    flowerUpg: 2,
    flowerCost: 1,
    duration: 1,
    tier: 1,
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
