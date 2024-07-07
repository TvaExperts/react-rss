import React from 'react';
import { TEXTS } from '../../texts';

function handleReloadPage() {
  window.location.reload();
}

export class Fallback extends React.Component {
  render() {
    return (
      <main>
        <p>{TEXTS.ERROR_TEXT}</p>
        <button type="button" onClick={handleReloadPage}>
          {TEXTS.GO_TO_MAIN}
        </button>
      </main>
    );
  }
}
