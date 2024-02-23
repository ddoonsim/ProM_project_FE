import { SubTitle } from '../commons/TitleStyle';
import { NavLink } from '../../../node_modules/react-router-dom/dist/index';
import classNames from '../../../node_modules/classnames/index';

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
          <NavLink>없음</NavLink>
        )}
      </ul>
    </>
  );
};

export default ListForm;
