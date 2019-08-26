import qs from 'qs';

export const decodeQuery = query => {
  const decoder = (text) => {
    if (/^(\d+|\d*\.\d+)$/.test(text)) {
      const num = parseFloat(text)
      return num.toString() === text ? num : text
    }
    const keywords = { true: true, false: false, null: null, undefined: undefined }
    if (text in keywords) return keywords[text]
    try {
      return decodeURIComponent(text.replace(/\+/g, ' '))
    } catch (err) {
      return text
    }
  }
  return qs.parse(query, { decoder });
}

export const encodeQuery = query => {
  const result = qs.stringify(query)
  return result ? ('?' + result) : ''
}
