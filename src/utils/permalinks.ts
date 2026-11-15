import { SITE } from '~/config';
import { trim } from './utils';

const trimSlash = (value: string) => trim(trim(value, '/'));

const BASE_PATHNAME = SITE.basePathname;

export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
