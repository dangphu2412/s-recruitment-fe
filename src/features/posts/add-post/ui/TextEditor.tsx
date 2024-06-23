import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type TextEditorProps = {
  value: string;
  onChange: (v: string) => void;
};

export function TextEditor(props: TextEditorProps) {
  return (
    <ReactQuill theme="snow" value={props.value} onChange={props.onChange} />
  );
}
