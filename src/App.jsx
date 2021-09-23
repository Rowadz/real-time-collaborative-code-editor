import React, { useEffect, useRef } from 'react'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/lib/codemirror'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'
import 'codemirror'

const App = () => {
  const textAreaRef = useRef()
  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('ds'), {
      lineNumbers: true,
      keyMap: 'sublime',
      theme: 'material-ocean',
      mode: 'javascript',
      // cursorBlinkRate: 1,
      // cursorWidth: 10,
      // height: '100vh',
    })

    console.log(editor.getAllMarks())
    const widget = document.createElement('span')
    widget.textContent = 'hmmm?'
    widget.style.cssText =
      'background: #F37381; padding: 0px 3px; color: #F3F5F1; cursor: pointer;'

    const bookMark = editor.setBookmark({ line: 1, pos: 1 }, { widget })
    widget.onclick = () => bookMark.clear()
    console.log(editor.getAllMarks())

    editor.on('change', (instance, changes) => {
      // console.log(instance, changes)
      console.log(changes, instance.getValue())
    })
    editor.on('cursorActivity', (instance) => {
      // console.log(instance.cursorCoords())
    })
  }, [])

  return <textarea id="ds" />
}

export default App
