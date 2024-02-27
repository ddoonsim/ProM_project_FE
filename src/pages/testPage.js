import { useState, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUpload from '../components/commons/FileUpload';

const TestPage = () => {
  const [editorHtml, setEditorHtml] = useState('<h1>Hi</h1>');
  const [editor, setEditor] = useState(null);

  const fileUploadCallback = useCallback(
    (files) => {
      let html = '';
      for (const file of files) {
        html += `<img src='${file.fileUrl}' />`;
      }
      editor.setData(html);
    },
    [editor],
  );

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={editorHtml}
        onReady={(editor) => setEditor(editor)}
        onChange={() => setEditorHtml(editor.getData())}
      />
      <div>{editorHtml}</div>
      <FileUpload
        gid="testgid"
        imageOnly={true}
        fileUploadCallback={fileUploadCallback}
      >
        이미지 첨부
      </FileUpload>
    </>
  );
};

export default TestPage;
