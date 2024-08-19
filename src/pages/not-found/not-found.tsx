import { ReactNode } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './not-found.css';

export function NotFoundPage(): ReactNode {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.status === 404 ? 'Page not found' : `${error.statusText}`;
  } else {
    throw error;
  }
  return (
    <div className="not-found-page">
      <div className="not-found-plate">
        <h1 className="not-found-title">Oops!</h1>
        <p className="not-found-message">{errorMessage}</p>
      </div>
    </div>
  );
}
