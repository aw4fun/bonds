export const getAllIdeasRoute = () => '/';

export const getViewIdeaRoute = ({ ideaNick }: { ideaNick: string }): string =>
  `/ideas/${ideaNick}`;
