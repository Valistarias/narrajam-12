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
    title: 'A peculiar meeting',
    text: [
      '***Lorem ipsum dolor sit amet***, consectetur adipiscing elit. Praesent interdum ultrices enim, vel hendrerit odio rhoncus at.',
      {
        text: ' Il fait bo.',
        conditions: ['hybridCount:tribe', 'hybridation:xxx'],
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

export default {
  ...beginningTest,
};
