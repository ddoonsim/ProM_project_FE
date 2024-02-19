import { SubTitle } from '../commons/TitleStyle';
import { NavLink } from '../../../node_modules/react-router-dom/dist/index';
import classNames from '../../../node_modules/classnames/index';

const ListForm = ({ items }) => {
  items = items || [];

  return (
    <>
      <br />
      <br />
      <br />
      <SubTitle align="center" color="white">참여 중인 프로젝트</SubTitle>

      <ul>
        {items.length > 0
          ? items.map(({ seq, pname }) => (
              <NavLink
                to={'/project/' + seq}
                className={({ isActive }) => classNames({ on: isActive })+" list"}
                key={seq}
              >
                {pname}
              </NavLink>
            )) // to="경로" 추후 추가 예정
          : '없음'}
      </ul>
    </>
  );
};

export default ListForm;
