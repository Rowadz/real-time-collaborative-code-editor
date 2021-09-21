import React, { useEffect, useRef } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror'
// import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import CodeMirror from 'codemirror'
import 'codemirror'

const App = () => {
  const textAreaRef = useRef()
  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      // theme: 'material-ocean',
      // mode: 'javascript',
      // cursorBlinkRate: 1,
      // cursorWidth: 10,
      // height: '100vh',
    })

    console.log(editor.getAllMarks())
    editor.setBookmark({ line: 1, ch: 1 })
    console.log(editor.getAllMarks())

    editor.on('change', (instance, changes) => {
      // console.log(instance, changes)
      console.log(1)
    })
    editor.on('cursorActivity', (instance) => {
      console.log(instance.cursorCoords())
    })
  }, [])

  return <textarea id="ds" value="const a = 'rowad'"></textarea>
}

export default App
