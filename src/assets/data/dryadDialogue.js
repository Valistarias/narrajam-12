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

const beginningTest = {
  begining: {
    title: 'The First Night',
    text: [
      '***Lorem ipsum dolor sit amet***, consectetur adipiscing elit. Praesent interdum ultrices enim, vel hendrerit odio rhoncus at.',
      {
        text: ' Il fait bo.',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: ' Il fait pa bo.',
        conditions: ['hybridCount:dryad'],
      },
      'Donec sagittis bibendum ex vitae blandit.<br/>Vivamus et risus nunc.<br/><br/>****Fuck !****<br/><br/>In consequat scelerisque molestie. Ut sit amet erat lacus. **Ut cursus** velit fermentum libero pellentesque, vitae feugiat justo viverra. *Duis vel lectus nisl !* Donec nec accumsan odio. Duis ac quam eu tellus congue tempor.',
    ],
    speaker: 'regulardude',
    speakerName: 'A Guy',
    answers: [
      {
        text: 'What the **fuck** are you talking about man',
        goto: '_beginning__fuck',
        actions: [],
      },
      {
        text: '911, it,s an *emergency*',
        actions: [],
      },
      {
        text: 'Deus Vult ?',
        goto: '_beginning__deus',
        actions: [],
      },
      {
        text: 'Continue',
        goto: '_beginning__deus',
        continueButton: true,
        actions: [],
      },
    ],
  },
  _beginning__fuck: {
    text: 'Pellentesque accumsan auctor bibendum.',
    speaker: 'regulardude',
    speakerName: 'A Guy',
    answers: [
      {
        text: '...',
        actions: [],
      },
    ],
  },
  _beginning__deus: {
    text: 'Pellentesque accumsan auctor bibendum. Suspendisse porta suscipit nisl, ut tincidunt enim feugiat nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse ornare lacus sit amet metus luctus tempus non non ante. Vestibulum scelerisque non enim at faucibus. Curabitur fermentum quam eu dignissim iaculis.<l/>Integer congue, lectus in blandit commodo, risus lorem auctor felis, et auctor ex erat eu nisi. Proin augue leo, fringilla nec velit sit amet, suscipit porta magna. Nunc sit amet arcu bibendum, aliquet libero id, semper velit.',
    speaker: 'regulardude',
    speakerName: 'A Guy',
    answers: [
      {
        text: '*Slowly back off*',
        actions: [],
      },
      {
        text: 'Yeah, right... Can you repeat the question ?',
        goto: 'begining',
        actions: [],
      },
    ],
  },
};
const FirstNightDialog = {
  FirstNightDialog: {
    title: 'The First Night',
    text: [
      'Your back is nothing but painful knots and arched bones. Your legs have folded so long ago,  the pins and needles have dulled. Your hands are rough, dark nails and broken skin infected by all the microorganisms crawling along the potting ground. It’s a privilege, to touch fertile soil. It pays for the sleepless nights. ',
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
    text: 'The whole day, you’ve looked at her awake to everything. First, she reacted to the spouts, giggling and squirming away from the tickles they made her feel. Then there was the whole “leaving the room” incident. She took a good long while to stop crying from that one. Finally, she found a bucket of clear water, and she saw herself, a silhouette of twigs and leaves and branches and roots, so very much different from you. She thought long and hard after that: “Bark!”, she pointed at your hands. Well, gee. Thanks. ',
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
    'You nod along, hiding your discomfort. Teaching and growing at the same time, you’re not sure it’s right. She takes it in stride, though, one idea the root of another: “Wanna grow out! Out!”', 
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
    text: 'Tonight, you toss and turn in your bed, remembering your classes in the Order’s Caravan. None of them made it look so hard.',
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
const ThirdNightDryadDialog = {
  ThirdNightDryadDialog: {
    title: 'The Third Night',
    text: 'The cough catches you by surprise, scratchy throat turning to fistful of shredded flecks in your palm. Blackened Blood. You limp home, hiding the shocks wracking your body from anxious stares and unpleasant thoughts. When you reach your door, you freeze, forehead hanging to the hard wood while you fight for a moment of peace, a single breath that doesn’t die on its way in.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightDryadDialogStep2',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep2: {
    text: 'It was bound to happen. You did what you could: you made sure to keep your mask, to check your gloves each and every time you got close to a patient. But you’re on the frontline; you’re exposed every day. That you got spared so long is a blessing in itself. Your only regret is that every dose you’ll take is one somebody else won’t. You cough yourself in and remove your shoes.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Drink some Nectar.',
        goto: 'ThirdNightDryadDialogStep3',
        continueButton: true,
        actions: [],
      },
      {
        text: 'Reach for the sofa.',
        goto: 'ThirdNightDryadDialogStep3',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep3: {
    text: 'You hear someone singing in the lab. <br/><br/>The Dryad is out of her box, connected to the earth by a couple of supple and green roots. She’s picked up a watering can - the small one - and is doing the round of the flowers you’ve planted the last few days. One at a time, she showers them with care, lifting a leaf here and holding a bent stem there. She’s tracing your movement, like a kid playing grown-up. The song though, that’s her own.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Not too much on this one. It drowns easy.',
        goto: 'ThirdNightDryadDialogStep4',
        actions: [],
      },
      {
        text: 'Enjoy the music',
        goto: 'ThirdNightDryadDialogStep4',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep4: {
    text: [
    'When she turns around, you can see the drowsy fizz in her eyes. A lethargic joy that feeds and consumes itself. Her smile is all dreams, and somehow, you’re part of it, rough hands and a thousand-times patched clothes included. “Hi! I’m helping.”', 
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'You really are.',
        goto: 'ThirdNightDryadDialogStep5',
        actions: [],
      },
      {
        text: 'Eyes on the plants young lady!',
        goto: 'ThirdNightDryadDialogStep5',
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep5: {
    text: 'She brings the spout back over the pot of a small white carnation, spilling a few drops. In one overly exaggerated sorry pout, she has you chuckling. You feel the itch crawling up the back of your mouth, and bite hard on it. “I went out”, she says as if she was telling you she picked up some food on the way back. Was she seen? Did some stranger talk to her? Did they try something? Did she run away? Pictures of crazed idiots with dangerous ideas ice your heart and boil your stomach. You should have told her about these things.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightDryadDialogStep6',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep6: {
    text: '“It’s all grey”.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightDryadDialogStep7',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep7: {
    text: 'How do you answer that? Why should you, to begin with? She was never supposed to look any further than her box and now you’re trying to find the word to tell her the end of the world isn’t… the end of the world. “Wanna make it green again”, she continues. There is something behind the half-closed eyelid: a confidence that she’s gonna make it. Hopeful, perhaps. Youthful, certainly.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'That’d be nice to see.',
        goto: 'ThirdNightDryadDialogStep8',
        actions: [],
      },
      {
        text: 'I don’t know if that’s possible.',
        goto: 'ThirdNightDryadDialogStep8',
        actions: [],
      },
    ],
  },
  ThirdNightDryadDialogStep8: {
    text: 'She laughs, a babbling brook in the cover of stones and crowns, and turns back to her watering. Not for long though. Soon enough, she gently snores in her bed of greens and soil. Maybe she will leave. Maybe she’ll make something green again. But what about Vedinor? <br/><br/>What about you?',
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
const ThirdNightTribeDialog = {
  ThirdNightTribeDialog: {
    title: 'The Third Night',
    text: 'The cough catches you by surprise, scratchy throat turning to fistful of shredded flecks in your palms. Blackened blood. When you finally slam your door behind you, you fall to the ground, boiling forehead digging in the cold floor. A pulsating grasp reduces you to a wheeze, your lungs only allowed enough air to make it last. You worm your way to a bottle of Nectar. You breathe.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep2',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep2: {
    text: 'It was bound to happen. You can only weasel away from contamination so many times before you forget to put on your mask, or fail to see a hole in your gloves. It’s fine. It’s alright. You are not the first and you won’t be the last. You just need to do like everyone else. Take your medicine. Relax. The strength finds its way back to your legs.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Reach for your waterskin.',
        goto: 'ThirdNightTribeDialogStep3',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep3: {
    text: 'Then you notice the noise. A muttered anguish dotted around the clanking of wood against ceramic. You rush to the lab.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep4',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep4: {
    text: [
    'The Dryad is halfway uprooted, sobbing and raging against the heavy limbs she tries to rip away from the pot you’ve confined her to. She can’t leave. You fed her well. She’s bloated with Nectar, and she turned so dense her movements have gone sluggish. She notices you. Desperation pulls another root of the thick potting ground. She screams and sobs: “Let me go! I don’t want this! I don’t want to be here! I hate the thoughts in my head!”', 
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep5',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep5: {
    text: 'You look at the flowers you’ve been feeding her the last few days, carefully giving her the weak ones, the easily grown and pruned. You weren’t sure it would work but it does. She’s turning into the tool you need. What you’re turning into, you’re not sure. You can’t help but think of the sickness wrecking your inside. The timing of it. You’re doing what you must.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep6',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep6: {
    text: 'Someone bangs at the door: “Is everything alright in there?” ',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep7',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep7: {
    text: 'Shutting up the Dryad is harder than it looks. She sways left and right like the tall desiccated cacti of the desert under a wild wind; she bites your hands, scratches your face. It takes too long to feel natural. You’re still holding her when you scream:',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'We’re good. I just fell into the compost. Sorry for the trouble!',
        goto: 'ThirdNightTribeDialogStep8',
        actions: [],
      },
      {
        text: 'Piss off!',
        goto: 'ThirdNightTribeDialogStep8',
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep8: {
    text: 'No answer. You know what comes next. A couple of enforcers, sure they’ll have to teach a lesson to a bad spouse. Same enforcers wondering what in the Goddesses’ name is happening here. Then the Elders. Then the Order. When the answer finally snakes back to you, you don’t feel the blood pooling around your fingers, where the teeth of the Dryads have already let go:  “Yeah, right. Keep it down then.”',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Continue',
        goto: 'ThirdNightTribeDialogStep9',
        continueButton: true,
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep9: {
    text: 'She is limp in your arms, big eyes wet and gone. There is no sap left in her trunk to fight the growth of her roots.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'There. All calmed down. Better keep it this way.',
        goto: 'ThirdNightTribeDialogStep10',
        actions: [],
      },
      {
        text: 'I’m sorry.',
        goto: 'ThirdNightTribeDialogStep10',
        actions: [],
      },
    ],
  },
  ThirdNightTribeDialogStep10: {
    text: 'You rip away the light runes before leaving, and cut the water while you’re at it. This can’t happen again. A few more days of this, and you’ll have your damn tool again. Vedinor must survive the plague, its people count on you. You can’t fail… even if it costs you, even if it costs her.',
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
const FourthNightDialog = {
  FourthNightDialog: {
    title: 'The fourth Night',
    text: 'Your living room is a massive bush, a forest of crowded branches and buds. Roots rummage under your sofa while ivy dips in the water tanks. You push through, ignoring the buzzing of insects and the whiplash of freed wood. The lattice covering the lab’s entrance is so tight, you can barely squeeze through. The effort compresses your chest to a coughing fit. You spit a trickle of dried blood on your shoes.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep2',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep2: {
    text: [
      'There is a nest where the Dryad was.',
      {
        text: 'A cocoon of leaves and petals, wide and curtseying, tips caressing the patches of grass at its feet. Pollen and insects of dark and yellow fur dance through the air, unbothered by your presence.',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'A cocoon of twigs and spiderwebs, crawling and trembling, lit by hundred little black eyes. Gnarled knots and blooming mushrooms cover it, pungent and dense.',
        conditions: ['hybridCount:dryad'],
      },
      'Its wood is drenched in pearls of Nectar, sticky and shining like morning dew.'
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Hey, are you alright in there?!',
        goto: 'fourthNightDialogStep3',
        actions: [],
      },
      {
        text: 'Bloody Reckoning, what now?!',
        goto: 'fourthNightDialogStep3',
        actions: [],
      },
    ],
  },
  fourthNightDialogStep3: {
    text: 'Nothing but the pops and cracks of a distant tree, disappearing in the faded smell of parched flowers. You feel even less prepared than you were getting used to. It’s another change, another step, one that’s so fast and foreign you can’t imagine catching up to it. Is this even normal? Is she ill? You thought about her leaving but what if she dies? You take the pruner from your belt and cut the smallest of paths to where she lies. A faint glow pierces the hole, purring, beckoning.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
     answers: [
      {
        text: 'Please, answer me!',
        goto: 'fourthNightDialogStep4',
        actions: [],
      },
      {
        text: 'This better not be a trick.',
        goto: 'fourthhNightDialogStep4',
        actions: [],
      },
    ],
  },
  fourthNightDialogStep4: {
    text: [
    'Nothing. Something twitches inside, like a beating emerald, precious and beautiful. You extend your hand. “Hello, the voice echoes in your head. I’m sorry. Home is a bit messy.” There is a grinding, the sound of a bird pecking thin bark. A laugh? “I had to prepare.”',
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'What for?',
        goto: 'fourthNightDialogStep5',
        actions: [],
      },
    ],
  },
  fourthNightDialogStep5: {
    text: [
      '“This.” Beak against bark. “I wanted to grow, but I didn’t know how, and I didn’t know into what. Now I do.”',
      {
        text: 'She growls, but it’s an impotent anger, vanquished.',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'She whispers, strong and assured, happy.',
        conditions: ['hybridCount:dryad'],
      },
      '“You taught me." '
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep6',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep6: {
    text: [
      {
        text: 'You gave me virtue through silence.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You gave me virtue through humility.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You gave me virtue through usefulness.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You gave me virtue through a house, and a place in it.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You gave me virtue through ignorance of sin.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You gave me virtue through placidity.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'And you promised me a future through sacrifice.<br/>',
        conditions: ['hybridCount:tribe'],
      },
      {
        text: 'You allowed me joy, to be a child at heart.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'You gave me wisdom and knowledge.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'You told me I was beautiful, and to have pride in it.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'You showed me courage, and to wield it.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'You didn’t mind that I was blunt, and encouraged me to be honest.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'You taught me that worth isn’t always easy to see.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'And you promised that, in the end, you would let me go.<br/>',
        conditions: ['hybridCount:dryad'],
      },
      'So, I will be all of this, if I can.” ',
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep7',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep7: {
    text: 'The glow weakens as the last of her words ripple through you… then grows dark and ragged. Leaves, branches and roots grow inward and fall, leaving you in autumn shedding. Only creeping vines remain at the bottom of an empty water tank. You rush to your reserves, then to the outside chill to beg for more.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep8',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep8: {
    text: 'It will all be over soon. You just need to feed her, you just need to prune her, you just need to harvest her. You just need to keep this cocoon alive through the night, as it drains forces of nature long gone, as it drains you. No matter how far she goes, you’ll be her lifeline until she gets there.',
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep9',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep9: {
    text: [
      {
        text: 'Because she deserves it.',
        conditions: ['hybridCount:dryad'],
      },
      {
        text: 'Because you must, the both of you.',
        conditions: ['hybridCount:tribe'],
      },
    ],
    speaker: 'Botanist',
    speakerName: 'Botanist',
    answers: [
      {
        text: 'Continue',
        goto: 'fourthNightDialogStep10',
        continueButton: true,
        actions: [],
      },
    ],
  },
  fourthNightDialogStep10: {
    text: 'You just hope you’re making the right choice. Soon, there will be no turning back.',
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
  ...ThirdNightDryadDialog,
  ...ThirdNightTribeDialog,
  ...FourthNightDialog,
  ...beginningTest,
};
