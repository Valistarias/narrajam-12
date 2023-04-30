/* eslint-disable object-property-newline */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export const classTrim = (elt) => elt.replace(/\n {2,}/g, ' ').replace(/\s+/g, ' ').trim();

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

export const curateText = (basicString, speaker, speakerName) => {
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

export const curateAndDomifyText = (basicString, speaker) => {
  const curatedText = curateText(basicString, speaker);
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
      regroupedText.push(
        <span key={actualText} className={typeSpan}>
          {actualText}
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
  regroupedText.push(
    <span key="last" className={typeSpan}>
      {actualText}
    </span>,
  );
  return regroupedText;
};
