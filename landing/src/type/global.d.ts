declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare const __PLATFORM__: 'browser' | 'node'; // eslint-disable-line
declare namespace JSX {
  export type Element = any;
}
