import { useState, useRef } from 'react';
import './App.css';
import { sampleText } from './sampleText';
import printJS from 'print-js';

import marked from 'marked';

function App() {
  const [text, setText] = useState(sampleText);
  const inputRef = useRef();

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const renderText = (text) => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  const onPrint = () => {
    printJS('printArea', 'html');
  }

  const onFileChange = e => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      setText(text)
    };
    reader.readAsText(e.target.files[0])
  }

  const onUploadClick = () => {
    inputRef.current.click();
  }

  const onSave = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.md";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-5'>
          <textarea
            onChange={handleChange}
            value={text}
            className='form-control'
            rows='35' />
        </div>
        <div className='col-md-2 innerBox'>
          <div className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
          <div role="button" className='m-3 p-3  rounded-circle border border-secondary' onClick={onUploadClick}>
            <input type="file" className='d-none' ref={inputRef} onChange={onFileChange} />
            <i className='fa fa-2x fa-upload text-secondary'></i>
          </div>
          
          <div role="button" className='m-3 p-3 rounded-circle border border-secondary' onClick={onSave}>
            <i className='fa fa-2x fa-download text-secondary'></i>
          </div>
          
          <div role="button" className='m-3 p-3  rounded-circle border border-secondary' onClick={onPrint}>
            <i className='fa fa-2x fa-print text-secondary'></i>
          </div>
          </div>
        </div>
        <div className='col-md-5 border rounded' id="printArea">
          <div dangerouslySetInnerHTML={renderText(text)} />
        </div>
      </div>
    </div>
  );
}

export default App;
