import { SubTitle } from '../commons/TitleStyle';
import { NavLink } from 'react-router-dom';
import classNames from '../../../node_modules/classnames/index';
import styled from 'styled-components';

const None = styled.a`
  display: block;
  font-size: medium;
  color: white;
  text-align: center;
`;

const ListForm = ({ items }) => {
  items = items || [];

  return (
    <>
      <br />
      <SubTitle align="center" color="white">
        Project List
      </SubTitle>

      <ul>
        {items.length > 0 ? (
          items.map(({ seq, pname }) => (
            <NavLink
              to={'/project/' + seq}
              className={({ isActive }) =>
                classNames({ on: isActive }) + ' list'
              }
              key={seq}
            >
              {pname}
            </NavLink>
          ))
        ) : (
          <None>없음</None>
        )}
      </ul>
    </>
  );
};

export default ListForm;
