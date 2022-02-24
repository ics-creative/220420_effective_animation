export const appendAll = (parent: Element, elems: Element[]) => {
  elems.forEach(elem => parent.appendChild(elem))
}

export const removeAll = (elems: Element[]) => {
  elems.forEach(elem => elem.parentNode?.removeChild(elem))
}

export const createElementsWithClass = (count: number, tagName = 'div', className = '') => {
  return Array(count)
    .fill(0)
    .map(() => {
      const elem = document.createElement(tagName)
      elem.className = className
      return elem
    });
}