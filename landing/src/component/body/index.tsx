import { ComponentChildren } from 'preact';

import Header from 'component/header';

type BodyProps = {
  readonly children: ComponentChildren;
};

export default function Body({ children }: BodyProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
