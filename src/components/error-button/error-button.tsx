import { ReactNode, useState } from 'react';

export function ErrorButton(): ReactNode {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('ups!');
  }

  function throwError(): void {
    setHasError(true);
  }

  return (
    <button type="button" className="btn-large" onClick={throwError}>
      big error button
    </button>
  );
}
