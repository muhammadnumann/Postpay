export function mergeStrings(strings: String[], language = 'en') {
  if (language === 'en') {
    return strings.join('');
  } else {
    return strings.reverse().join('');
  }
}
