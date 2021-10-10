import React from 'react'
import EnterName from './EnterName'
import RealTimeEditor from './RealTimeEditor'
import './App.css'
import { useStore } from './store'

const App = () => {
  const username = useStore(({ username }) => username)

  return <>{username ? <RealTimeEditor /> : <EnterName />}</>
}

export default App
