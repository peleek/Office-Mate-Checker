/**
 * Function will return given string in cammelCase contention
 * @example
 * @in: Sample String
 * @out: sampleString
 */

export const stringToCammelCaseConverter = (str: string) =>
	str
		.split(' ')
		.map((el, index) => (index ? el : el.toLowerCase()))
		.join('');
