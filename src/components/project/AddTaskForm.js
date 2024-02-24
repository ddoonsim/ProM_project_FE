import { useState, useEffect } from 'react';
import { BigButton } from '../commons/ButtonStyle';
import { InputText } from '../commons/InputStyle';
import { Container } from '../commons/ModalStyle';
import Select from 'react-select';

const AddTaskForm = ({ form, onSubmit, onChange }) => {
  const options = [
    { value: 'user01', label: 'user01' },
    { value: 'user02', label: 'user02' },
    { value: 'user03', label: 'user03' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

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
        <dl>
          <dt>담당자</dt>
          <dd>
            {/* 드롭다운 다중 선택 --> react-select 라이브러리 이용 */}
            <Select
              isMulti
              options={options}
              placeholder="담당자를 선택하세요."
              getValue={(options) => setSelectedOption(options)}
            />
            <input type="text"></input>
          </dd>
        </dl>
        <dl>
          <dt>업무 진행 기간</dt>
          <dl>{/* 업무 기간 --> react-calendar 라이브러리 이용(예정) */}</dl>
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
