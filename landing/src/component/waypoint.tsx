import {
  useCallback, useEffect, useRef, useState,
} from 'preact/hooks';
// TODO: move to purr

type WaypointProps<E, L> = {
  onEnter?: (event: Event) => E;
  onLeave?: (event: Event) => L;
};

export default function Waypoint<E, L>({
  onEnter,
  onLeave,
}: WaypointProps<E, L>): JSX.Element {
  const ref = useRef<HTMLSpanElement>();
  const [previous, setPrevious] = useState(false);

  const isInside = useCallback(() => {
    const waypointTop = ref.current.getBoundingClientRect().top;

    // grab this.props.container's height
    const contextHeight = window.innerHeight;

    // grab this.props.container's scrollTop (window is always 0)
    const contextScrollTop = 0;

    // if waypoint is in between container's top and bottom edges
    // return true, false if above top or below bottom
    return (
      contextScrollTop <= waypointTop
      && waypointTop <= contextScrollTop + contextHeight
    );
  }, []);

  const handleScroll = useCallback(
    (event: Event) => {
      const current = isInside();
      setPrevious(current);

      if (previous === current) {
        return;
      }

      // default callbacks
      if (current && onEnter) {
        onEnter(event);
      }

      if (previous && onLeave) {
        onLeave(event);
      }
    },
    [onEnter, onLeave, isInside, previous],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <span ref={ref} />;
}
