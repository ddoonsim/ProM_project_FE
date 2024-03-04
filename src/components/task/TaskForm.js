import React from 'react';
import { BigButton } from '../commons/ButtonStyle';
import { InputText } from '../commons/InputStyle';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import Select from 'react-select';
import ErrorMessages from '../commons/ErrorMessages';
import Calendar from '../../../node_modules/react-calendar/dist/cjs/Calendar';
import moment from '../../../node_modules/moment/moment';
import 'react-calendar/dist/Calendar.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUpload from '../commons/FileUpload';
import { useTranslation } from 'react-i18next';

const TaskForm = ({
  task,
  onChange,
  onSubmit,
  onChangeStatus,
  onSelectMembers,
  onChangeDate,
  onEditor,
  errors,
  members,
  fileUploadCallback,
  setEditor,
}) => {
  task = task || {};

  const { t } = useTranslation();
  const statusList = [
    ['REQUEST', t('요청')],
    ['PROGRESS', t('진행중')],
    ['SUCCESS', t('완료')],
    ['HOLD', t('보류')],
  ];
  const options = members.map((m) => ({ label: m.name, value: m.seq }));
  const selectedDates =
    task.sdate && task.edate
      ? [new Date(task.sdate), new Date(task.edate)]
      : [];
  console.log('task', task);

  return (
    <>
      <h1>{task ? task.tname : t('업무 추가')}</h1>
      <form onSubmit={onSubmit}>
        <dl>
          <dt>{t('업무_제목')}</dt>
          <dd>
            <InputText
              type="text"
              name="tname"
              value={task.tname}
              onChange={onChange}
              placeholder={t('제목을_입력하세요.')}
            ></InputText>
            <ErrorMessages errors={errors} field="tname" />
          </dd>
        </dl>
        <dl>
          <dt>{t('업무_상태')}</dt>
          <dd>
            {statusList.map((item) => (
              <span key={item[0]} onClick={() => onChangeStatus(item[0])}>
                {item[0] === task.status ? <FaCheckCircle /> : <FaRegCircle />}
                {item[1]}
              </span>
            ))}
            <ErrorMessages errors={errors} field="status" />
          </dd>
        </dl>
        <dl>
          <dt>{t('담당자')}</dt>
          <dd>
            {/* 드롭다운 다중 선택 --> react-select 라이브러리 이용 */}
            <Select
              isMulti
              options={options}
              name="members"
              value={task.members}
              placeholder={t('담당자를 선택하세요.')}
              onChange={onSelectMembers}
            />
            <ErrorMessages errors={errors} field="members" />
          </dd>
        </dl>
        <dl>
          <dt>{t('업무_진행_기간')}</dt>
          <dd>
            <div>
              <Calendar
                onChange={onChangeDate}
                next2Label={null}
                prev2Label={null}
                selectRange={true}
                value={selectedDates}
                formatDay={(locale, date) => moment(date).format('DD')}
              />
            </div>
            <ErrorMessages errors={errors} field="sDate" />
            <ErrorMessages errors={errors} field="eDate" />
          </dd>
        </dl>
        <dl>
          <dt>{t('업무_내용')}</dt>
          <dd>
            <CKEditor
              name="description"
              editor={ClassicEditor}
              data={task.description ? task.description : ''}
              onReady={(editor) => setEditor(editor)}
              onChange={onEditor}
            />
          </dd>
        </dl>
        <dl>
          <dt>{t('파일_업로드')}</dt>
          <dd>
            <FileUpload
              gid={task.gid}
              location={'notice'}
              imageOnly={true}
              fileUploadCallback={fileUploadCallback}
            >
              {t('이미지_첨부')}
            </FileUpload>
          </dd>
        </dl>
        <BigButton
          type="submit"
          className="mt10 mb10"
          name="addTaskBtn"
          width="250px"
        >
          {t('업무_등록')}
        </BigButton>
      </form>
    </>
  );
};

export default React.memo(TaskForm);
