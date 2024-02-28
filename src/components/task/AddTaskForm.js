import { BigButton, ButtonGroup } from '../commons/ButtonStyle';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import Select from 'react-select';
import ErrorMessages from '../commons/ErrorMessages';
import AddTaskCalendar from './AddTaskCalendar';

const AddTaskForm = ({
  form,
  onSubmit,
  onChange,
  handleChange,
  options,
  errors,
  onClick,
}) => {
  return (
    <Container>
      <h1>업무 추가</h1>
      <form onSubmit={onSubmit}>
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
            <ButtonGroup name="status" value={form.status}>
              <input
                onClick={onChange}
                type="radio"
                name="status"
                id="request"
                value="request"
              />
              <label for="request">요청</label>
              <input
                onClick={onChange}
                type="radio"
                name="status"
                id="progress"
                value="progress"
              />
              <label for="progress">진행중</label>
              <input
                onClick={onChange}
                type="radio"
                name="status"
                id="success"
                value="success"
              />
              <label for="success">완료</label>
              <input
                onClick={onChange}
                type="radio"
                name="status"
                id="hold"
                value="hold"
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
              placeholder="담당자를 선택하세요."
              // getValue={(options) => setSelectedOption(options)}
              onChange={handleChange}
            />
          </dd>
        </dl>
        <dl>
          <dt>업무 진행 기간</dt>
          <dl>
            <AddTaskCalendar form={form} onChange={onChange} />
          </dl>
        </dl>
        <dl>
          <dt>업무 내용</dt>
          <dd>
            <textarea
              type="text"
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="업무 내용 상세"
            ></textarea>
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
      </form>
    </Container>
  );
};

export default AddTaskForm;