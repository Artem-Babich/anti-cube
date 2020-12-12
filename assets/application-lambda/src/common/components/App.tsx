import * as React from 'react'

const App = (props: { children: any }) => {
  const { children } = props

  return <div className="application">{children}</div>
}

export default App
