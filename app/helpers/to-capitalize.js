import { helper } from '@ember/component/helper';

export function toCapitalize([str]) {
  if (!str) return '';
  return [].reduce.call(
    str.split(' '),
    (result, word) => result.concat([word.charAt(0).toUpperCase() + word.slice(1)]),
    []
  ).join(' ');
}

export default helper(toCapitalize);
