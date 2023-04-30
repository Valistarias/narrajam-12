// PUNCTUATION -------------
// <br/>: new line
// ** ... ** -> bold
// * ... ** -> italic
// *** ... *** -> bold italic
// **** ... **** -> angry text

// ACTIONS -------------
// story:xxx -> new story event triggered, with is as xxx
// var:xxx:yyy -> change global variable xxx with value yyy

const trunkEvents = {
  sickHelpless: {
    title: 'The Sick and the Helpless.',
    text: '**"Good day, Botanist."** Orion speeds through your door with two linen bags full of poultices and syrups. "Do you have time?" You are two hands deep in manure: you could do with a moment away from the smell of ox dung. "Because of the wave, he continues, we had no time to treat those who were unlucky enough to catch bad colds and poorly placed sores.<br/><br/>— I\'m not a doctor, Elder.<br/>— For now, we only needs pairs of hands. You own one of those, do you not?"',
    speaker: 'elder',
    speakerName: 'The Elder',
    answers: [
      {
        text: 'Poorly placed sores it is.',
        actions: ['var:bloc:-1', 'var:flower:1'],
      },
      {
        text: 'The quietly sick will have to wait. I\'m not done with the others today.',
        actions: [],
      },
    ],
  },
};

export default {
  ...trunkEvents,
};
