import { Link } from "react-router-dom";

const ListForm = ({ items }) => {
  items = items || [];

  return (
    <ul>
      내 프로젝트<li>
      {items.length > 0 ? (
        items.map(({seq, pname}) => <Link key={seq}>{pname}</Link>)  // to="경로" 추후 추가 예정
      ) : (
        "없음"
      )}</li>
    </ul>
  );
};

export default ListForm;
