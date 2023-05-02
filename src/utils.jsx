/* eslint-disable object-property-newline */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export const fullTrim = (elt) => elt.replace(/\s+/g, ' ').trim();

export const classTrim = (elt) => fullTrim(elt.replace(/\n {2,}/g, ' '));

export const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) { return false; }

  let discrepency = false;
  arr1.every((arr1Elt) => {
    if (!arr2.includes(arr1Elt)) {
      discrepency = true;
      return false;
    }
    return true;
  });

  return !discrepency;
};

export const testDice = (dice) => {
  const regex = /^[1-9]([0-9]+)?d(4|6|8|10|12|20|100)$/g;
  return regex.test(dice);
};

export const testAlphanumerical = (string) => {
  const regex = /^[a-z 0-9]+$/g;
  return regex.test(string);
};

export const testNumber = (number) => {
  const regex = /^[0-9]+$/g;
  return regex.test(Number(number));
};

export const capitalize = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

const checkCondition = ({
  conditions,
  // vars,
  income,
  hybridationIds,
}) => {
  let conditionBool = true;
  const advantageHybridations = income._tribe < income._dryad ? 'tribe' : 'dryad';
  conditions.forEach((condition) => {
    const slicedCondition = condition.split(':');
    if (slicedCondition[0] === 'hybridCount') {
      conditionBool &&= slicedCondition[1] === advantageHybridations;
    }
    if (slicedCondition[0] === 'hybridation') {
      conditionBool &&= hybridationIds.includes(slicedCondition[1]);
    }
  });
  return conditionBool;
};

export const curateText = ({
  text,
  speaker,
  speakerName,
  vars,
  income,
  hybridationIds,
}) => {
  // Need to stringify with the right fields
  let basicString = '';
  if (Array.isArray(text)) {
    text.forEach((singleText) => {
      if (
        (singleText.condition && checkCondition({
          conditions: singleText.conditions,
          vars,
          income,
          hybridationIds,
        }))
        || !singleText.condition
        || singleText.condition.length === 0
      ) {
        basicString += ` ${singleText.text ?? singleText} `;
      }
    });
    basicString = fullTrim(basicString);
  } else {
    basicString = text;
  }
  const curatedText = [];

  // Curate Basic Markdown
  const croppedBasic = basicString.split(/((?:\*{1})+)/);
  let bold = false;
  let italic = false;
  let boldItalic = false;
  let angry = false;
  croppedBasic.forEach((croppedElt) => {
    if (croppedElt !== '') {
      // Check symbols
      if (croppedElt === '****') {
        angry = !angry;
      } else if (croppedElt === '***' && !angry) {
        boldItalic = !boldItalic;
      } else if (croppedElt === '**' && !boldItalic && !angry) {
        bold = !bold;
      } else if (croppedElt === '*' && !boldItalic && !angry) {
        italic = !italic;
      } else {
        croppedElt.split(' ').forEach((word) => {
          if (word !== '') {
            curatedText.push({
              speaker,
              speakerName,
              text: word,
              angry,
              bold: bold || boldItalic || angry,
              italic: italic || boldItalic || angry,
            });
          }
        });
      }
    }
  });
  return curatedText;
};

export const curateAndDomifyText = (props) => {
  const curatedText = curateText(props);
  const regroupedText = [];
  let noSpace = true;
  let actualGroup = null;
  let actualText = '';
  curatedText.forEach(({
    text,
    angry,
    bold,
    italic,
  }) => {
    let typeGroup;
    if (angry) {
      typeGroup = 'angry';
    } else if (bold && italic) {
      typeGroup = 'boldItalic';
    } else if (bold) {
      typeGroup = 'bold';
    } else if (italic) {
      typeGroup = 'italic';
    } else {
      typeGroup = 'none';
    }
    if (actualGroup === null) {
      actualGroup = typeGroup;
    }
    if (actualGroup !== typeGroup) {
      let typeSpan;
      switch (actualGroup) {
        case 'angry': { typeSpan = 'angry bold italic'; break; }
        case 'boldItalic': { typeSpan = 'bold italic'; break; }
        case 'bold': { typeSpan = 'bold'; break; }
        case 'italic': { typeSpan = 'italic'; break; }
        default: { typeSpan = 'regular'; }
      }
      const arraytext = [];
      actualText.split('<br/>').forEach((splitedText, index) => {
        if (index !== 0) {
          arraytext.push(<br key={splitedText} />);
        }
        arraytext.push(splitedText);
      });
      regroupedText.push(
        <span key={actualText} className={typeSpan}>
          {arraytext}
        </span>,
      );
      actualGroup = typeGroup;
      actualText = '';
    }
    if (noSpace) {
      noSpace = false;
    } else {
      actualText += ' ';
    }
    actualText += text;
  });
  let typeSpan;
  switch (actualGroup) {
    case 'angry': { typeSpan = 'angry bold italic'; break; }
    case 'boldItalic': { typeSpan = 'bold italic'; break; }
    case 'bold': { typeSpan = 'bold'; break; }
    case 'italic': { typeSpan = 'italic'; break; }
    default: { typeSpan = 'regular'; }
  }
  const arraytext = [];
  actualText.split('<br/>').forEach((splitedText, index) => {
    if (index !== 0) {
      arraytext.push(<br key={splitedText} />);
    }
    arraytext.push(splitedText);
  });
  regroupedText.push(
    <span key="last" className={typeSpan}>
      {arraytext}
    </span>,
  );
  return regroupedText;
};
