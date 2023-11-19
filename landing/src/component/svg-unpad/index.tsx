import { FunctionalComponent } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

type SvgUnpadProps = {
  readonly component: FunctionalComponent;
};

export default function SvgUnpad({
  component: Component,
}: SvgUnpadProps): JSX.Element {
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current);
    const bbox = ref.current.base.getBBox();
    const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(' ');

    ref.current.base.setAttribute('viewBox', viewBox);
  }, []);

  return <Component ref={ref} />;
}
