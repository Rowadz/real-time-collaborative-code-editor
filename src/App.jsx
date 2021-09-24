import React, { useEffect, useRef } from 'react'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/lib/codemirror'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'
import io from 'socket.io-client'
import 'codemirror'

const App = () => {
  const textAreaRef = useRef()

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'material-ocean',
      mode: 'javascript',
    })

    const widget = document.createElement('span')
    widget.textContent = 'hmmm?'
    widget.style.cssText =
      'background: #F37381; padding: 0px 3px; color: #F3F5F1; cursor: pointer;'

    // const bookMark = editor.setBookmark({ line: 1, pos: 1 }, { widget })
    // widget.onclick = () => bookMark.clear()
    // console.log(editor.getAllMarks())

    const socket = io('http://localhost:3001/', { transports: ['websocket'] })

    socket.on('CODE_CHANGED', (code) => {
      console.log(code)
      editor.setValue(code)
    })

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    socket.on('connect', () => {})

    socket.on('disconnect', () => {})

    editor.on('change', (instance, changes) => {
      const { origin } = changes
      // if (origin === '+input' || origin === '+delete' || origin === 'cut') {
      if (origin !== 'setValue') {
        socket.emit('CODE_CHANGED', instance.getValue())
      }
    })
    editor.on('cursorActivity', (instance) => {
      // console.log(instance.cursorCoords())
    })
  }, [])

  return (
    <>
      <textarea id="ds" />
    </>
  )
}

export default App
