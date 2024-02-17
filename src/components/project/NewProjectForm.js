import React from 'react';

const NewProjectForm = ({
  form,
  onSubmit,
  onChange,
}) => {

  return (
    <div className="container">
      <h1>새 프로젝트</h1>

      <form onSubmit={onSubmit}>
        <dl>
          <dt>프로젝트 제목</dt>
          <dd>
            <input
              type="text"
              name="pName"
              value={form.pName}
              onChange={onChange}
            />
          </dd>
        </dl>
        <dl>
          <dt>프로젝트 설명</dt>
          <dd>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={onChange}
            />
          </dd>
        </dl>
        <button type="submit" name="createBtn">
          프로젝트 만들기
        </button>
      </form>
    </div>
  );
};

export default React.memo(NewProjectForm);
