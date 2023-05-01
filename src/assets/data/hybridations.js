const dryad = {
  crocus: {
    Name: 'Crocus',
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
    Name: 'Belladonna',
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
    Name: 'Valerian',
    meaning: 'Readiness',
    side: 'nautral',
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
