import rss from '@astrojs/rss';

import { SITE } from '~/config.mjs';

export const get = async () => {
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: import.meta.env.SITE,
    items: []
  });
};
