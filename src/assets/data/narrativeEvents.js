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
    title: 'The Sick and the Helpless',
    text: '"Good day, Botanist." Orion speeds through your door with two linen bags full of poultices and syrups. "Do you have time?" You are two hands deep in manure: you could do with a moment away from the smell of ox dung. "Because of the wave, he continues, we had no time to treat those who were unlucky enough to catch bad colds and poorly placed sores.<br/>— I\'m not a doctor, Elder.<br/>— For now, we only needs pairs of hands. You own one of those, do you not?"',
    speaker: 'elderOrion',
    speakerName: 'Elder Orion',
    answers: [
      {
        text: 'Poorly placed sores it is.',
        actions: ['var:flower:1', 'var:nectar:-1'],
      },
      {
        text: 'Sniffy noses will have to wait. I\'m not done with the others today.',
        actions: [],
      },
    ],
    eventType: 'trunk',
    chainNode: 1,
  },
  /*farmHelp: {
    title: 'Farm Help',
    text: 'An old elvish woman crumbles through your door with a sack of stringy brown vegetables and dessicated fruits. She catches her breath in laborious rasps: "Why in Eu Coé’s name would you live so high up a hill? My poor heart..." she straightens her back then wipes the sweat pooling in her wrinkles, "Here is a little something from Elder Orion, to thank you again for the last batch of Nectar. I’d have brought more, but if I pluck one more carrot, my bones will shoot out of my hands!"',
    speaker: 'elderOrion',
    speakerName: 'Elder Orion',
    answers: [
      {
        text: 'What if I picked enough for the both of us? Spare you the trouble of working the field tomorrow.',
        actions: ['var:flower:2'],
      },
      {
        text: 'My thanks to you and Elder Orion.',
        actions: [],
      },
    ],
    eventType: 'trunk',
    chainNode: 2,
  },
  rememberTheReckoning: {
    title: 'Remember The Reckoning',
    text: '"Botanist."<br/>You keep quiet: Orion is jumping between the lines of a tight leatherbound notebook, only stopping to munch his pen, thinking. You cough. His eye darts from the yellowed vellum to you. "You have to forgive my rudeness. We are close to Reckoning Day and my mind is ill at ease. <br/>— It’s alright Elder. Were you there back then? <br/>— I was. I saw the walls of House Pent fall and our forest disintegrate to ashes. We... I still see it. How foolish were the Nethgwaith to let such a thing happen."',
    speaker: 'elderOrion',
    speakerName: 'Elder Orion',
    answers: [
      {
        text: 'Chamomille and Valerian roots are good for the nerves. Let me get you some.',
        actions: ['var:flower:1','var:nectar:-1'],
      },
      {
        text: 'Last I checked, the Nethgwaith weren’t the only one to let the Reckoning happen.',
        actions: [],
      },
    ],
    eventType: 'trunk',
    chainNode: 3,
  },
  weaknessOfYouth: {
    title: 'Weakness of Youth',
    text: '"I should not have provoked Aevie. Her hysterics remind me of her father’s.<br/>— Must have been a good provocation." You point at the red outline of five fingers on Orion’s cheek. "She speaks of exploring the Ley Line in our mines, Orion answers. I have forbidden it.<br/>— I thought the Triumvirat took decisions together. <br/>— We do, on matters of common interest. Elder Pent did not take kindly to my "behaving as if I was her Lord and Father." My tone doesn’t matter, the Ley Lines are dead, and should better stay so." ',
    speaker: 'elderOrion',
    speakerName: 'Elder Orion',
    answers: [
      {
        text: 'You might be right. Messing with those is how we got there.',
        actions: ['var:flower:2','var:nectar:-2'],
      },
      {
        text: 'You should not stop her. The Ley Lines are our only link to the Reckoning and the Ash Plague.',
        actions: ['var:nectar:1','var:flower:-1'],
      },
    ],
    eventType: 'trunk',
    chainNode: 4,
  },
  scholarAndCareless: {
    title: 'Scholar and Careless',
    text: '"Get in my way one more time, Orion, and you’ll see how truly "immature" I am!" <br/>Elder Aevie stampedes out of your house while Orion picks up what’s left of his dignity out of your potting ground. <br/>"I apologize, he says. You should not have to see that. <br/>— She really hates you, doesn’t she. <br/>— I fear she will never forgive me for spoiling her of her father’s legacy. The Triumvirat would not exist if I had not challenged her ascension to Lordship."<br/>Orion’s knuckles whiten around the brass of a dented pocket watch. "I will not apologize for it but I fear I might have pushed her too far this time."',
    speaker: 'elderOrion',
    speakerName: 'Elder Orion',
    answers: [
      {
        text: 'It’s not easy, doing the right thing.',
        actions: ['var:nectar:3'],
      },
      {
        text: 'You should talk to her. You never know, she might not forgive you... but maybe she will understand.',
        actions: ['var:flower:3'],
      },
    ],
    eventType: 'trunk',
    chainNode: 5,
  },*/
};

const branchesEvents = {
  roughHands: {
    title: 'Rough Hands',
    text: 'Loud thumps send the splinters of your door flying. « Well enter then ! » <br/>Elder Aevie wobbles in, dwarfed by boxes of pipes and wrenches: « Sorry about the noise but this is heavy. Help ? »<br/>Her luggage safely back on the ground, she takes a swig of water : « You reported an issue with your irrigation system, right ?<br/>— I did. Feels like a leak hiding between the pots and the sink.<br/>— Well, I’m here to fix it. <br/>— An Elder’s gonna fix my plumbing ? » <br/>She laughs : « There are not enough of us for me to twiddle my thumbs all day... I could use a hand however. »',
    speaker: 'elderAevie',
    speakerName: 'Elder Aevie',
    answers: [
      {
        text: 'I don’t like twiddling my thumbs either. Let get this fixed.',
        actions: ['var:nectar:1'],
      },
      {
        text: 'Sorry, no hand to spare.',
        actions: [],
      },
    ],
    eventType: 'branches',
    chainNode: 1,
  },
  /*hiddenTeachings: {
    title: 'Hidden Teachings',
    text: '« What is it with Nethgwaiths and Ier ? Any Bengwaith dares even mentionning the name and you clamp down like... like...<br/>— A bear trap with a vengeance ?<br/>— Exactly, that ! <br/>Ier is the last god of the Nethgwaith, and he only answers to often unsavoury expiations rites. Not exactly what you’d want to share in a town that already looks down on you.<br/>« Care to share what you know for my archives? I can’t push Leaves to talk with Miglia around... but you’re another story.»',
    speaker: 'elderAevie',
    speakerName: 'Elder Aevie',
    answers: [
      {
        text: 'Alright, but don’t go tell everyone I’m teaching you this.',
        actions: ['var:nectar:1','var:flower:-1'],
      },
      {
        text: 'Nethgwaith faith isn’t meant to be shared, especially Ier’s. Sorry.',
        actions: ['var:flower:+1','var:nectar:-1'],
      },
    ],
    eventType: 'branches',
    chainNode: 2,
  },
  researchingTheReckoning: {
    title: 'Researching the Reckoning',
    text: '« This is huge ! We can’t mess this up. » <br/>Aevie is beaming like an elf half her age and with half her responsabilities. The Branches researchers around her can’t help but smile... respectfully. « This Ley Line might be dead, but we’ll never have such an opportunity to study one again. Everyone has their Nectar ? » <br/>Ley Lines were mined until they provoked the Reckoning, then the Ash Plague. « We could use some more, she whispers to you. That old fool Orion blocked my request for additional doses ».',
    speaker: 'elderAevie',
    speakerName: 'Elder Aevie',
    answers: [
      {
        text: 'I have some in the back, but you better bring me some materials.',
        actions: ['var:flower:+2','var:nectar:-2'],
      },
      {
        text: 'I can manage the normal amount, but no more.',
        actions: ['var:flower:+1','var:nectar:-1'],
      },
    ],
    eventType: 'branches',
    chainNode: 3,
  },
  messageOfHope: {
    title: 'Message of Hope',
    text: '« Over my dead body, ladie ! Not a Nethgwaith will touch a Ley Line as long as I’m Elder. » <br/>Elder Miglia is a mass of knotted muscles and clenched jaws. <br/>— Why are you like this!?" says Aevie. "It’s perfectly safe as long as you—<br/>— It’s perfectly safe for Bengwaith! Your Nectar doesn’t protect us as wel as you and you want to send us to the source of the Ash Plague?<br/>— It’s dead! » She regains her composure in the echo of her screaming. "Fine. What if I get you twice the Nectar dosage?" <br/>You catch the glint of a silent plea at the corner of her eye.',
    speaker: 'elderAevie',
    speakerName: 'Elder Aevie',
    answers: [
      {
        text: 'You should accept Miglia. Twice the dosage is more than enough.',
        actions: ['var:flower:+6','var:nectar:-3'],
      },
      {
        text: 'Twice the dosage! This... this is beyond me Aevie.',
        actions: [],
      },
    ],
    eventType: 'branches',
    chainNode: 4,
  },
  leyLineTheory: {
    title: 'Ley Line Theory',
    text: 'You find Aevie surrounded by scholars and scrolls. It’s the first time you see her in her formal dress, all white and embroided branches: "Hello Elder, you asked for me?"<br/>She waves the other away: "Thank you for coming so fast. I have... news I wanted to share.<br/>— What about? <br/>— The Ley Line. What learned all we could from it, and it was not much, but there’s a silver lining." She grins: "We have been told of another. It is not close, but not so far that we can’t reach it."<br/>The corner of her lips limp down. She looks tired, beaten: "I do not think I will be allowed to study it if the Branches do not leave Vedinor. Progress requires sacrifices but... I do not want to divide us even more.<br/>— Sounds like quite the dillema."<br/>She laughs: "What would you do?"',
    speaker: 'elderAevie',
    speakerName: 'Elder Aevie',
    answers: [
      {
        text: 'I would go. If you truly believe the Ley Lines are worth it, Vedinor can’t keep you. ',
        actions: ['var:nectar:3'],
      },
      {
        text: 'I would stay. Without you, Vedinor is stuck in the past. ',
        actions: ['var:flower:3'],
      },
    ],
    eventType: 'branches',
    chainNode: 5,
  },*/
};

const leavesEvents = {
  packingLunch: {
    title: 'Packing Lunch',
    text: '"Hi there." <br/>Two orcs and a dwarf led by Elder Miglia stomp in your home, dusty coats over bulky shoes. "We’re going on a short trip. Commonwealth Ruin a few miles from here, she continues. We could use a care package if you got one to spare. We’ll bring you a souvenir in exchange. What do you say?"',
    speaker: 'elderMiglia',
    speakerName: 'Elder Miglia',
    answers: [
      {
        text: 'Sure thing, but you better make it a nice one.',
        actions: ['var:flower:1','var:nectar:-1'],
      },
      {
        text: 'I have a half-eaten sandwich to spare.',
        actions: [],
      },
    ],
    eventType: 'leaves',
    chainNode: 1,
  },
  /*nethgwaithTroubles: {
    title: 'Nethgwaith troubles',
    text: '"You old fucks wouldn’t survive a week without us! <br/>— And you half-wit Nethgwaith can’t survive even with a whole world to burn through.How was the rat leg by the way?" <br/>A skewer of grey meat caked in wet ash lay between an emaciated orc, drawn sword weighting on limp arms. The elf insulting him stands two heads lower but his hair flutters with streaks of magic. This will end poorly for the green-skin.',
    speaker: 'elderMiglia',
    speakerName: 'Elder Miglia',
    answers: [
      {
        text: 'He’s not worth the trouble. Come, we’ll grab something else. My treat.',
        actions: ['var:flower:-1'],
      },
      {
        text: 'A Nectar on the orc!',
        actions: ['var:nectar:-1'],
      },
    ],
    eventType: 'leaves',
    chainNode: 2,
  },
  theEmpireThatWas: {
    title: 'The Empire That Was.',
    text: '"Long-lived bastards. Can’t admit they fucked up to save their skin." <br/>Elder Miglia looks like two stout beers and a shot of burning coffee. "Can you believe this? I bring the dwarf in front of them, I show them pretties the festering wound, and those two idiots can’t even say sorry for putting the wrong gwaith behind bars." She snorts "Orion could barely be bothered to lift his head from his papers.<br/>— Can’t be easy, being the only Nethgwaith in the Triumvirat.<br/>— It’s not. Orion bothers to hide it, but he hates us. Aevie’s too biased, she thinks we’re immature. Can’t think were she picked that idea." She spits. "Days like this, I miss the Commonwealth." <br/>You weren’t born when the Nethgwaith Empire pumped all life from the Ley Lines. Miglia couldn’t have been either, but you see what she means. When you’re at the bottom, it’s easy to dream of the top.',
    speaker: 'elderMiglia',
    speakerName: 'Elder Miglia',
    answers: [
      {
        text: 'They’ll come around. In the mean time, here’s for your wounded.',
        actions: ['var:flower:1','var:nectar:-1'],
      },
      {
        text: 'To the Commonwealth!',
        actions: [],
      },
    ],
    eventType: 'leaves',
    chainNode: 3,
  },
  raisingOurVoice: {
    title: 'Raising Our Voice',
    text: 'You feel the crowd before hearing it: all the stomping and clamoring shakes your vials and pouches. Outside, you see Elder Miglia at the top of a pack of raised fists and open mouths: "We won’t pay! We won’t pay! We won’t pay!"<br/>You know what this is about. The Triumvirat "voted" a new tax on Nethgwaith’s food and drink. The elves barely use the stuff, but orcs and dwarves... You’ll be fine, but will they?<br/>Miglia lets her people move past her. Through fluttering silhouettes, she beckons you.',
    speaker: 'elderMiglia',
    speakerName: 'Elder Miglia',
    answers: [
      {
        text: 'Join the crowd',
        actions: ['var:flower:2','var:nectar:-1'],
      },
      {
        text: 'Close your door',
        actions: [],
      },
    ],
    eventType: 'leaves',
    chainNode: 4,
  },
  theEmpireThatWillBe: {
    title: 'The Empire That Will Be',
    text: '"Hi there," says Miglia. "Did you get my letter?<br/>— Wouldn’t be here if I hadn’t, would I?"<br/>She laughs, a bellowing howl that would scare bears if there were any left: "No, you wouldn’t." <br/>Miglia’s home is a warren of comfy couches overlooked by alien hunting trophees. The fire pit casts waving shadows over the Elder’s face. "I’ll cut to the chase then. I’ve sent letters to Nethgwaith leaders in other villages. I wanted to know what they thought of the elves... and of a new Commonwealth.<br/>— That’s daring.<br/>— I’m nothing but, and it was worth it. They share my sentiments, all of them: we’re tired of being treated like dung."<br/>A log cracks in the chimney, spreading a flurry of sparks over the thick carpet. "I’m thinking we’d have better luck amongst our own." ',
    speaker: 'elderMiglia',
    speakerName: 'Elder Miglia',
    answers: [
      {
        text: 'It’s worth following up. More collaboration between Nethgwaith can only be good for us.',
        actions: ['var:nectar:3'],
      },
      {
        text: 'You should stop. The Commonwealth did enough wrong. It does not need a second chance. ',
        actions: ['var:flower:3'],
        actions: [],
      },
    ],
    eventType: 'leaves',
    chainNode: 5,
  },*/
};

export default {
  ...trunkEvents,
  ...branchesEvents,
  ...leavesEvents,
};
