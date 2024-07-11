import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEXTS } from '../../texts';
import { ROUTES } from '../../router/routes';

export function NotFoundPage() {
  const navigate = useNavigate();

  function handleGoToMain() {
    navigate(ROUTES.HOME);
  }

  return (
    <main>
      <p>{TEXTS.NOT_FOUND_TEXT}</p>
      <button type="button" onClick={handleGoToMain}>
        {TEXTS.GO_TO_MAIN}
      </button>
    </main>
  );
}
