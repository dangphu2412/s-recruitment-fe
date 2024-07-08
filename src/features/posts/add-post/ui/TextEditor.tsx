import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faImage } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';
import { useMutateUploadFile } from '../../../../entities/files/models';
import { API_URL } from '../../../../shared/config/constants/env';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type TextEditorProps = {
  value: string;
  onChange: (v: string) => void;
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'
];

function Toolbar() {
  return (
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue={''}
        onChange={e => e.persist()}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option selected></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value={'+1'}></button>
      <button className="ql-indent" value={'-1'}></button>
      <button className="ql-link"></button>
      <select className="ql-color">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="#d0d1d2"></option>
        <option selected></option>
      </select>

      <button className="ql-insertImageLink">
        <FontAwesomeIcon className="mr-2" icon={faImage} />
      </button>

      <button className="ql-insertHTML">
        <FontAwesomeIcon className="mr-2" icon={faCode} />
      </button>
    </div>
  );
}

export function TextEditor(props: TextEditorProps) {
  const { upload } = useMutateUploadFile();
  function insertHTML(this: any) {
    const html = prompt('Enter HTML code');
    const range = this.quill.getSelection();

    this.quill.clipboard.dangerouslyPasteHTML(range.index, html);
  }

  function insertImageLink(this: any) {
    const quill = this.quill;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;

      if (file) {
        const response = await upload({ file });

        const url = API_URL + '/files/' + response.path;

        quill.insertEmbed(this.quill.getSelection().index, 'image', url);
      }
    };
  }

  const modulesRef = useRef({
    toolbar: {
      container: '#toolbar',
      handlers: {
        insertHTML,
        insertImageLink
      }
    }
  });

  return (
    <>
      <Toolbar />
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modulesRef.current}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
