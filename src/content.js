import React from 'react'
import ReactDOM from 'react-dom'
import { useColorScheme } from 'use-color-scheme'
import ContentApp from './components/content-app'
import {
  onVisibilityChange,
  onViewingStart,
  onViewingEnd,
} from './content/timing'
import { ColorThemeProvider } from './hooks/use-theme'
import { compose } from './lib/functional'

const startTimer = () => {
  onViewingStart()
  window.document.addEventListener(
    'visibilitychange',
    onVisibilityChange,
    true
  )
  window.addEventListener('beforeunload', onViewingEnd)
}

const renderContentApp = () => {
  // React app in content script
  const el = document.createElement('div')
  el.id = 'mujo-extension'

  document.body.appendChild(el)

  const App = () => {
    const { scheme } = useColorScheme()
    return (
      <ColorThemeProvider value={scheme}>
        <ContentApp />
      </ColorThemeProvider>
    )
  }

  ReactDOM.render(<App />, el)
}

const startContentScript = compose(
  renderContentApp,
  startTimer
)

if (!window.hasBeenInjected) {
  window.hasBeenInjected = true
  startContentScript()
}
