import React from 'react';
import { TEXTS } from '../../texts';

export function Fallback() {
  function handleReloadPage() {
    window.location.reload();
  }

  return (
    <main>
      <p>{TEXTS.ERROR_TEXT}</p>
      <button type="button" onClick={handleReloadPage}>
        {TEXTS.TRY_AGAIN}
      </button>
    </main>
  );
}
