import _ from 'lodash';

export const ideas = _.times(100, (i) => ({
  nick: `some-nick-${i}`,
  name: `element ${i}`,
  description: `Element ${i}`,
  text: _.times(11, () => '<div>Lorem ipsum dolor.</div>').join(''),
}));
