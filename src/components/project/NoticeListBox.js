import classNames from '../../../node_modules/classnames/index';
import { NavLink } from '../../../node_modules/react-router-dom/dist/index';
import styled from 'styled-components';

const NoticeBox = styled.div`
  min-height: 120px;
  padding: 10px 20px;
  background-color: white;
  border-radius: 20px;
  overflow-y: auto;

  .list {
    display: block;
    font-size: medium;
  }
`;

const NoticeListBox = ({ items }) => {
  items = items || [];

  return (
    <NoticeBox>
      {items.length > 0 ? (
        items.map(({ seq, tname }) => (
          <NavLink
            //   to={'/project/' + seq}
            className={({ isActive }) => classNames({ on: isActive }) + ' list'}
            key={seq}
          >
            {'📌 ' + tname}
          </NavLink>
        ))
      ) : (
        <div>없음</div>
      )}
    </NoticeBox>
  );
};

export default NoticeListBox;
