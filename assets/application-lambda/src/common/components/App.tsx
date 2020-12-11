import * as React from 'react'

const App = (props: { children: any }) => {
  const { children } = props

  return (
    <div>
      Layout - START
      <div>{children}</div>
      Layout - END
    </div>
  )
}

export default App
