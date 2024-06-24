import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faImage } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
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

function insertHTML(this: any) {
  const html = prompt('Enter HTML code');
  const range = this.quill.getSelection();

  this.quill.clipboard.dangerouslyPasteHTML(range.index, html);
}

function insertImageLink(this: any) {
  const url = prompt('Enter the URL of the image');

  this.quill.insertEmbed(this.quill.getSelection().index, 'image', url);
}

const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertHTML,
      insertImageLink
    }

    // container: [
    //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //   ['bold', 'italic', 'underline', 'strike'],
    //   [
    //     { list: 'ordered' },
    //     { list: 'bullet' },
    //     { indent: '-1' },
    //     { indent: '+1' }
    //   ],
    //   ['image', 'link'],
    //   [
    //     {
    //       color: [
    //         '#000000',
    //         '#e60000',
    //         '#ff9900',
    //         '#ffff00',
    //         '#008a00',
    //         '#0066cc',
    //         '#9933ff',
    //         '#ffffff',
    //         '#facccc',
    //         '#ffebcc',
    //         '#ffffcc',
    //         '#cce8cc',
    //         '#cce0f5',
    //         '#ebd6ff',
    //         '#bbbbbb',
    //         '#f06666',
    //         '#ffc266',
    //         '#ffff66',
    //         '#66b966',
    //         '#66a3e0',
    //         '#c285ff',
    //         '#888888',
    //         '#a10000',
    //         '#b26b00',
    //         '#b2b200',
    //         '#006100',
    //         '#0047b2',
    //         '#6b24b2',
    //         '#444444',
    //         '#5c0000',
    //         '#663d00',
    //         '#666600',
    //         '#003700',
    //         '#002966',
    //         '#3d1466'
    //       ]
    //     }
    //   ]
    // ]
  }
};

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
  return (
    <>
      <Toolbar />
      <ReactQuill
        theme="snow"
        formats={formats}
        modules={modules}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
