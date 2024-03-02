import { useState } from 'react';
import { BigButton, ButtonGroup } from '../commons/ButtonStyle';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import TodoContainer from '../../containers/todolist/TodoContainer';
import Select from 'react-select';
import ErrorMessages from '../commons/ErrorMessages';
import Calendar from '../../../node_modules/react-calendar/dist/cjs/Calendar';
import moment from '../../../node_modules/moment/moment';
import 'react-calendar/dist/Calendar.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUpload from '../commons/FileUpload';
import styled from 'styled-components';

const FormDiv = styled.div`
  display: flex;
  width: 1200px;
`;
const Form = styled.form`
  display: flex;
`;

const Ckdiv = styled.div`
  .ck-editor__editable_inline:not(.ck-comment__input *) {
    height: 190px;
    overflow-y: auto;
  }
`;
const AddTaskForm = ({
  form,
  tasks,
  onSubmit,
  onChange,
  handleChange,
  options,
  errors,
  onEditor,
  setEditor,
  fileUploadCallback,
  statusChange,
  changeDate,
}) => {
  console.log('addtaskform tasks : ', tasks);

  return (
    <FormDiv>
      <Form onSubmit={onSubmit}>
        <Container>
          <h1>{tasks ? tasks.tname : `업무 추가`}</h1>
          <dl>
            <dt>업무 제목</dt>
            <dd>
              <InputText
                type="text"
                name="tName"
                value={form.tName}
                onChange={onChange}
                placeholder="제목을 입력하세요."
              ></InputText>
            </dd>
          </dl>
          <ErrorMessages errors={errors} field="tName" />
          <dl>
            <dt>업무 상태</dt>
            <dd>
              <ButtonGroup name="status">
                <input
                  onClick={statusChange}
                  type="radio"
                  name="status"
                  id="request"
                  value="REQUEST"
                />
                <label for="request">요청</label>
                <input
                  onClick={statusChange}
                  type="radio"
                  name="status"
                  id="progress"
                  value="PROGRESS"
                />
                <label for="progress">진행중</label>
                <input
                  onClick={statusChange}
                  type="radio"
                  name="status"
                  id="success"
                  value="SUCCESS"
                />
                <label for="success">완료</label>
                <input
                  onClick={statusChange}
                  type="radio"
                  name="status"
                  id="hold"
                  value="HOLD"
                />
                <label for="hold">보류</label>
              </ButtonGroup>
            </dd>
          </dl>
          <dl>
            <dt>담당자</dt>
            <dd>
              {/* 드롭다운 다중 선택 --> react-select 라이브러리 이용 */}
              <Select
                isMulti
                options={options}
                name="members"
                value={form.members}
                placeholder="담당자를 선택하세요."
                // getValue={(options) => setSelectedOption(options)}
                onChange={handleChange}
              />
            </dd>
          </dl>
          <dl>
            <dt>업무 진행 기간</dt>
            <dl>
              <div>
                <Calendar
                  onChange={changeDate}
                  next2Label={null}
                  prev2Label={null}
                  selectRange={true}
                  formatDay={(locale, date) => moment(date).format('DD')}
                />
              </div>
            </dl>
          </dl>
          <dl>
            <dt>업무 내용</dt>
            <dd>
              <Ckdiv>
                <CKEditor
                  className="ck-editor__editable_inline"
                  name="description"
                  editor={ClassicEditor}
                  data={form.description}
                  onReady={(editor) => setEditor(editor)}
                  onChange={onEditor}
                />
              </Ckdiv>
            </dd>
          </dl>
          <dl>
            <dt>파일 업로드</dt>
            <dd>
              <FileUpload
                gid={form.gid}
                location={'notice'}
                imageOnly={true}
                fileUploadCallback={fileUploadCallback}
              >
                이미지 첨부
              </FileUpload>
            </dd>
          </dl>
          <BigButton
            type="submit"
            className="mt10 mb10"
            name="addTaskBtn"
            width="250px"
          >
            업무 등록
          </BigButton>
        </Container>
        <TodoContainer />
      </Form>
    </FormDiv>
  );
};

export default AddTaskForm;
