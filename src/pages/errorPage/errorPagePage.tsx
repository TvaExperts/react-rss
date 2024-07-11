import React from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { TEXTS } from '../../texts';
import { ROUTES } from '../../router/routes';

export function ErrorPagePage() {
  const navigate = useNavigate();
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  function handleGoToMain() {
    navigate(ROUTES.HOME);
  }

  return (
    <main>
      <p>{TEXTS.ERROR_TEXT}</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <button type="button" onClick={handleGoToMain}>
        {TEXTS.GO_TO_MAIN}
      </button>
    </main>
  );
}
