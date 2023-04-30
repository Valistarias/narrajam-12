/* eslint-disable import/prefer-default-export */
import { PropTypes } from 'prop-types';

export const dryadDialogType = PropTypes.shape({
  title: PropTypes.string,
  speaker: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    goto: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.string),
  })),
});
