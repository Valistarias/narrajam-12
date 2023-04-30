import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { PropTypes } from 'prop-types';
import { curateText } from '../../utils';

import './dynamicTextDisplay.scss';
import { dryadDialogType } from '../types/dialogs';

const DynamicTextDisplay = ({
  textBlocks, toSkip, setButtonDisabled, scrollBottom,
}) => {
  const [curatedTextBlocks, setCuratedTextBlocks] = useState([]);

  const actualBlock = useRef(false);
  const actualSpeaker = useRef(false);
  const dynamicDisplayDom = useRef(true);
  const wordsToDisplay = useRef([]);

  const displayLoopWords = useCallback((cb) => {
    let delayNewMessage = false;

    // Treating the html to add
    const actualWord = wordsToDisplay.current[0];
    const text = `${actualWord.text}${Array.isArray(wordsToDisplay.current) && wordsToDisplay.current.length > 0 ? ' ' : ''}`;
    let domToAdd = text;
    if (actualWord.bold || actualWord.italic) {
      domToAdd = document.createElement('span');
      domToAdd.className = `${actualWord.bold ? 'bold ' : ''}${actualWord.italic ? 'italic ' : ''}${actualWord.angry ? 'angry ' : ''}`.trim();
      domToAdd.innerHTML = text;
      domToAdd = domToAdd.outerHTML;
    }

    // Treating the creation of the main divs
    if (!actualBlock.current || actualSpeaker.current !== actualWord.speaker) {
      const newBlock = document.createElement('div');
      newBlock.className = 'dynamic-display__text-block';
      newBlock.className += ` dynamic-display__text-block--${actualWord.speaker}`;
      actualBlock.current = newBlock;
      actualSpeaker.current = actualWord.speaker;

      const newTitle = document.createElement('h2');
      newTitle.innerText = actualWord.speakerName;
      newTitle.className = 'dynamic-display__text-block__title';

      newBlock.appendChild(newTitle);
      dynamicDisplayDom.current.appendChild(newBlock);
      delayNewMessage = true;
    }

    setTimeout(() => {
      scrollBottom();
      actualBlock.current.innerHTML += domToAdd;
      wordsToDisplay.current.shift();
      if (!Array.isArray(wordsToDisplay.current) || wordsToDisplay.current.length === 0) {
        actualBlock.current = false;
        actualSpeaker.current = false;
        wordsToDisplay.current = [];
        cb();
      } else {
        setTimeout(() => {
          displayLoopWords(cb);
        }, toSkip ? 0 : 50);
      }
    }, delayNewMessage ? 500 : 0);
  }, [toSkip, scrollBottom]);

  useEffect(() => {
    if (textBlocks.length === 0 && curatedTextBlocks.length !== 0) {
      setCuratedTextBlocks([]);
    } else if (textBlocks.length !== curatedTextBlocks.length) {
      const textDifference = textBlocks.length - curatedTextBlocks.length;
      let wordsToAdd = [];
      for (let i = textBlocks.length - textDifference; i < textBlocks.length; i += 1) {
        const curatedTextBlocksToAdd = textBlocks[i];
        wordsToAdd = [
          ...wordsToAdd,
          ...(curateText(
            curatedTextBlocksToAdd.text,
            curatedTextBlocksToAdd.speaker,
            curatedTextBlocksToAdd.speakerName,
          )),
        ];
      }
      let needToRelaunchLoop = false;
      if (!Array.isArray(wordsToDisplay.current) || wordsToDisplay.current.length === 0) {
        needToRelaunchLoop = true;
      }
      wordsToDisplay.current = [
        ...wordsToDisplay.current,
        ...wordsToAdd,
      ];
      if (needToRelaunchLoop) {
        setButtonDisabled(true);
        displayLoopWords(() => {
          setButtonDisabled(false);
        });
      }
      setCuratedTextBlocks(textBlocks);
    }
  }, [curatedTextBlocks, textBlocks, displayLoopWords, setButtonDisabled]);

  return (
    <div className="dynamic-display" ref={dynamicDisplayDom} />
  );
};

DynamicTextDisplay.propTypes = {
  textBlocks: PropTypes.arrayOf(dryadDialogType),
  toSkip: PropTypes.bool,
  setButtonDisabled: PropTypes.func,
  scrollBottom: PropTypes.func,
};

DynamicTextDisplay.defaultProps = {
  textBlocks: [],
  toSkip: false,
  setButtonDisabled: () => {},
  scrollBottom: () => {},
};

export default DynamicTextDisplay;
