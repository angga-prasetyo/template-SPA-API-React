import '@testing-library/jest-dom';

const originalGetComputedStyle = window.getComputedStyle;

window.getComputedStyle = (element: Element, pseudoElement?: string | null) => {
  if (pseudoElement) {
    return {
      getPropertyValue: () => '',
    } as unknown as CSSStyleDeclaration;
  }
  return originalGetComputedStyle(element);
};
