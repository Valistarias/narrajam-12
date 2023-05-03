/* eslint-disable import/prefer-default-export */
import { PropTypes } from 'prop-types';

export const tribeShape = PropTypes.shape({
  name: PropTypes.string,
  infected: PropTypes.number,
  newInfected: PropTypes.number,
  deaths: PropTypes.number,
  newDeaths: PropTypes.number,
  people: PropTypes.number,
  nectar: PropTypes.number,
});
