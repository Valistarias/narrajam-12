// PUNCTUATION -------------
// <br/>: new line
// ** ... ** -> bold
// * ... ** -> italic
// *** ... *** -> bold italic
// **** ... **** -> angry text

// ACTIONS -------------
// story:xxx (CHANGE) -> new story event triggered, with is as xxx
// var:xxx:yyy (CHANGE) -> change global variable xxx with value yyy
// hybridCount:xxx (IF) -> xxx is equal to 'tribe' or 'dryad', and display the most advanced path
// hybridation:xxx ( IF) -> xxx is equal to an hybridation id

const FirstNightDialog = {
  FirstNightDialog: {
    title: 'The First Night',
    text: [
      'Your back is nothing but painful knots and arched bones. Your legs have folded so long ago,  the pins and needles have dulled. Your hands are rough, dark nails and broken skin infected by all the microorganisms crawling along the potting ground. It’s a privilege, touching fertile soil. It pays for the sleepless nights. ',
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'Step2',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step2: {
    text: '“Five more days, Botanist, said Elder Aevie. Then, the wave will be under control.” The Order couldn’t have dropped you at a worst time. Vedinor was hit by the Ash Plague barely a week after you dug a hole for yourself amongst tents and mud houses. “After that, Nectar will not be in such high demand, added Elder Orion.” They paint a strange picture, the two of them: one young, the other old but both more than a hundred. It’s hard to remember that Elder Aevie is older than you when she looks half your age.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'Step3',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step3: {
    text: 'A trickle of whines brings you back from your reverie. Goddesses, you need a real night’s sleep.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Shake it off.',
        goto: 'Step4',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step4: {
    text: '“Wild.” A frail, sobbing voice, with the accent of fresh wind and fallow fields. It’s so close you could touch it, but there are no children hidden between the bags, shovel and hoe, no pranksters in the hallway, no drunkard on the other side of the window. “... row… wild!” You drag your chin forward, to a face of wood and moss. The Dryad is awake. ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Shit!',
        goto: 'Step5',
        actions: [],
      },
      {
        text: 'Stay silent.',
        goto: 'Step5',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step5: {
    text: 'She can’t be. You made sure of it! You never fed her anything but water and compost void of… <br/><br/>Seeds.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'Step6',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step6: {
    text: 'There is one, split open: a bent valerian groveling through the muck, swimming towards the artificial light of your lab. You missed it. You let the Dryad consume it, and now she talks. Quite loudly too. A strange green baby’s babbling, breathing in spent air in exchange for one heavy with the mixed scent of Coriander and grass, of Bluebell and Borage. It’s dizzying, but not as much as what you must do. What you can’t do. ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'Step7',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step7: {
    text: 'The Dryad is barely half-made, covered in mulch and hay but the words of your teachers still ring, sharp and commanding: “If you should fail to keep your charge in check. You must get rid of it. Burn it, then use it to fertilize new soil.” Your teachers were not stuck in the worst of a plague when they shared this pearl of wisdom. “Let me…” the Dryad struggles to mouth the sounds, foreign to her sap and heartwood: “Grow.. wild!”',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Grow wild?',
        goto: 'Step8',
        actions: [],
      },
      {
        text: 'No way.',
        goto: 'Step8',
        actions: [],
      },
    ],
  },
  Step8: {
    text: '“Grow free!” Her eyes twinkle with pride, a childish satisfaction that nearly wrenches a chuckle out of you. There is no way you can let her go. Without the fruits she bears, there is no Nectar. Without her, you’re no Botanist, you’re just dead weight in a village that has not much love for your kin.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'Step9',
        continueButton: true,
        actions: [],
      },
    ],
  },
  Step9: {
    text: 'You look at the few drops of the precious liquid you have left. Then the jars of the stuff you collected earlier. More than usual. Maybe enough. Was that because of the valerian? <br/><br/>“Grow wild! Feed! Fassst!” The dryad is nothing but mischievous smiles.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        actions: [],
      },
    ],
  },
};
const SecondNightDialog = {
  SecondNightDialog: {
    title: 'The Second Night',
    text: '“Aï, Aye, ih, HI, hi. Hi!” The Dryad plays with the words and laughs, beaming at failures and successes alike, reveling in the exploration of each syllable. Were she picked up said words, you’re not sure. Some are from listening to you, when the day grows lonely and you mumble to yourself, some are from somewhere else. Wherever that is, you’re not sure you approve. ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'SecondNightDialogStep2',
        continueButton: true,
        actions: [],
      },
    ],
  },
  SecondNightDialogStep2: {
    text: '“The whole day, you’ve looked at her awake to everything. First, she reacted to the spouts, giggling and squirming away from the tickles they made her feel. Then there was the whole “leaving the room” incident. She took a good long while to stop crying from that one. Finally, she found a bucket of clear water, and she saw herself, a silhouette of twigs and leaves and branches and roots, so very much different from you. She thought long and hard after that: “Bark!”, she pointed at your hands. Well, gee. Thanks. ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'SecondNightDialogStep3',
        continueButton: true,
        actions: [],
      },
    ],
  },
  SecondNightDialogStep3: {
    text: 'Then she fell silent. A succession of long stares and pinched earlobes. Every once in a while, she leans over a trowel or a pruner. Her branches brushing against the wooden handle. Does not take a genius to notice the questions racing through her head. ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'A copper for your thoughts?',
        goto: 'SecondNightDialogStep4',
        actions: [],
      },
      {
        text: 'Don’t touch those.',
        goto: 'SecondNightDialogStep4',
        actions: [],
      },
    ],
  },
  SecondNightDialogStep4: {
    text: [
    '“Not like me, she concludes. Says nothing, not even here.” She points to her temple, drilling with unopened buds.',
    {
      text: '“Quiet. Peaceful?” She looks at you, crumbling certainty kept whole on your shoulders.',
      conditions: ['hybridCount:tribe'],
    },
    {
      text: '“No fun. Sad?” She looks at you, suddenly meek after a day of horsing around.',
      conditions: ['hybridCount:dryad'],
    },
    'You nod along, hiding your discomfort. Teaching and growing at the same time, you’re not sure it’s right. She takes it in stride, though, one idea the root of another : “Wanna grow out! Out!”', 
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Out? You want to explore?',
        goto: 'SecondNightDialogStep5',
        actions: [],
      },
      {
        text: 'Not a good idea.',
        goto: 'SecondNightDialogStep5',
        actions: [],
      },
    ],
  },
  SecondNightDialogStep5: {
    text: '“Too small” she twirls around, showing with all branches her box of man-made ground. How can you explain to her? That she’s not supposed to “be”, here? That she’ll get you exiled from Vedinor and the order? That there’s nowhere to go for her, no forest to take hold in, no stream to drink her fill. No wild fey to find her place with. You don’t know which one’s worst. “Can?”',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Not yet, but maybe later?',
        goto: 'SecondNightDialogStep6',
        actions: [],
      },
      {
        text: 'No.',
        goto: 'SecondNightDialogStep6',
        actions: [],
      },
    ],
  },
  SecondNightDialogStep6: {
    text: '“But I wanna! I wanna, I wanna, I wanna!” She’s a flurry of shrill screams and trembling leaves, locked on you like you owe her, big time. There is no soothing her this time, nor any wagging of the finger, promises or threats. You just wait, feeling like someone should have prepared you for this, as she tires herself out.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'SecondNightDialogStep7',
        continueButton: true,
        actions: [],
      },
    ],
  },
  SecondNightDialogStep7: {
    text: 'Looking at the Dryad, deep slow breaths rocking back and forth a flower crown on her skin, you shiver. You got more Nectar for your trouble, but she’s growing so fast. Too fast. How long before she grows out of control, before she uproots herself and disappears. What if the flower you gave her robs her of something? What if you make it worse?',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'SecondNightDialogStep8',
        continueButton: true,
        actions: [],
      },
    ],
  },
  SecondNightDialogStep8: {
    text: '“Tonight, you toss and turn in your bed, remembering your classes in the Order’s Caravan. None of them made it look so hard.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        actions: [],
      },
    ],
  },
};

export default {
  ...FirstNightDialog,
  ...SecondNightDialog,
};
