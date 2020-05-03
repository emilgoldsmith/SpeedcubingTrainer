export function buildTestDescription(testCaseArgs: {
  given: string;
  when: string;
  then: string[];
}): string {
  const { given, when, then } = testCaseArgs;
  const stringBuilder = [];

  stringBuilder.push('Given ', given, ', ');
  stringBuilder.push('When ', when, ', ');
  stringBuilder.push('Then ', then.join(' and '));

  return stringBuilder.join('');
}
