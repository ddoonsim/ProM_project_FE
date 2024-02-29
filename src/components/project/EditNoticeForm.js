import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ErrorMessages from '../commons/ErrorMessages';
import FileUpload from '../commons/FileUpload';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';
import { ButtonGroup } from '../commons/ButtonStyle';

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

  .delete_btn {
    margin: 30px 0;
    margin-left: 10px;
    background: ${white};
    font-size: ${big};
    width: 300px;
    height: 40px;
    color: black;
    border: 1px solid #000;
    cursor: pointer;
    border-radius: 3px;
  }
`;

const EditNoticeForm = ({
  form,
  errors,
  onSubmit,
  onClick,
  onChange,
  onEditor,
  setEditor,
  fileUploadCallback,
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

        <FileUpload
          gid={form.gid}
          location={'notice'}
          imageOnly={true}
          fileUploadCallback={fileUploadCallback}
        >
          이미지 첨부
        </FileUpload>
        <br />
        <ButtonGroup>
        <button type="submit" className="ok_btn">
          공지글 수정
        </button>
        <button type='button' className='delete_btn' onClick={onClick}>
          공지글 삭제
        </button>
        </ButtonGroup>
      </NoticeEditBox>
    </Container>
  );
};

export default EditNoticeForm;
