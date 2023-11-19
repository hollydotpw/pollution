import { useState, useCallback } from 'preact/hooks';

export default function useToggler(
  initalState = false,
): [boolean, () => void, (data: boolean) => void] {
  const [data, setData] = useState(initalState);

  const toggle = useCallback(() => setData((s) => !s), []);

  return [data, toggle, setData];
}
