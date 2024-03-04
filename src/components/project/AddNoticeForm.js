import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ErrorMessages from '../commons/ErrorMessages';
import FileUpload from '../commons/FileUpload';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import { CgClose } from 'react-icons/cg';
import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { primary, info, white } = colorNames;
const { big } = sizeNames;

const NoticeEditBox = styled.form`
  .ck-content {
    height: 500px;
  }

  .file_upload_btn {
    width: 100px;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
    background: #fff;
    color: ${info};
    border: 1px solid ${info};
    border-radius: 3px;
    position: absolute;
    left: 80px;

    &:hover {
      background-color: ${info};
      color: ${white};
    }
  }

  .ok_btn {
    margin: 30px 0;
    background: ${primary};
    font-size: ${big};
    width: 300px;
    height: 40px;
    color: ${white};
    border: 1px solid ${primary};
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background: ${primary};
    }
  }

  .files {
    background-color: #ddd;
    margin: 5px;
    padding: 3px 5px;
    border-radius: 5px;
    display: table;
  }

  .close_btn {
    background-color: #ddd;
    border: none;
    cursor: pointer;
  }
`;

const AddNoticeForm = ({
  form,
  errors,
  onSubmit,
  onChange,
  onDelete,
  onEditor,
  setEditor,
  fileUploadCallback,
  attached_file,
}) => {
  return (
    <Container>
      <h1>공지사항 등록</h1>
      <NoticeEditBox onSubmit={onSubmit}>
        <dl>
          <dt>제목</dt>
          <dd>
            <InputText
              type="text"
              name="tname"
              value={form.tname}
              onChange={onChange}
              placeholder="제목을 입력하세요."
            ></InputText>
          </dd>
        </dl>
        <ErrorMessages errors={errors} field="tname" />

        <CKEditor
          name="description"
          editor={ClassicEditor}
          data={form.description}
          onReady={(editor) => setEditor(editor)}
          onChange={onEditor}
        />
        <br />
        {attached_file.length !== 0
          ? attached_file.map(({ seq, fileName, index }) => (
              <div className="files">
                <a
                  href={`http://localhost:2000/api/v1/file/download/${seq}`}
                  key={seq}
                >
                  {fileName}
                </a>
                <button type='button' onClick={onDelete} value={seq}
                  className="close_btn"
                >
                  <CgClose />
                </button>
              </div>
            ))
          : ''}

        <FileUpload
          gid={form.gid}
          location={'notice'}
          imageOnly={false}
          fileUploadCallback={fileUploadCallback}
        >
          파일 첨부
        </FileUpload>
        <ErrorMessages errors={errors} field="description" />
        <br />
        <button type="submit" className="ok_btn">
          공지글 등록
        </button>
      </NoticeEditBox>
    </Container>
  );
};

export default AddNoticeForm;
