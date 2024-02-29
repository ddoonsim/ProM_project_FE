import { NavLink } from 'react-router-dom';
import { MainTitle, SubTitle } from '../commons/TitleStyle';
import styled from 'styled-components';
import MyCalendar from './MyCalendar';
import ChatRoom from '../../pages/chatting/ChatRoom';
import colorNames from '../../styles/colors';
import Weather from './Weather';
import TodayData from '../commons/TodayData';
import ProverbForm from './ProverbForm';

const { primary, info } = colorNames;

const Container = styled.div`
  padding: 25px 50px;
  width: 90%;

  .myProjects_info {
    display: flex;
  }

  .myProjects_box {
    width: 600px;
    height: 300px;
    padding: 10px 20px;
    margin: 10px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${primary};
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: grey;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }

    a {
      font-size: medium;
      display: block;
      padding: 5px;
    }

    li {
      display: flex;
      font-size: 1.2rem;
      color: gray;

      :hover {
        color: ${primary};
        font-weight: 500;
        font-size: large;
      }

      .left {
        margin-right: auto;
      }

      .btn {
        background-color: ${info};
        color: white;
        margin: 5px;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }

  .calendar_box {
    margin: 20px;
    padding: 10px;
    background-color: white;
  }

  .weather_box {
    font-size: large;
    margin: 0 10px;
    padding: 5px;
    width: 300px;
    border: 1px solid #aaa;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const DashboardForm = ({ items }) => {
  return (
    <Container>
      <MainTitle>Dashboard</MainTitle>
      <div className="myProjects_info">
        <div className="myProjects_box">
          <SubTitle>My Projects</SubTitle>
          {items.length > 0 ? (
            items.map(({ seq, pname }) => (
              <ul>
                <li>
                  <NavLink className="left" to={'/project/' + seq} key={seq}>
                    {pname}
                  </NavLink>

                  <ChatRoom className="right" roomNo={seq + 'p'} />
                </li>
              </ul>
            ))
          ) : (
            <ul>
              <li>
                아직 참여 중인 프로젝트가 없습니다. 프로젝트를 만들어보세요!
              </li>
            </ul>
          )}
        </div>

        <div className="weather_box">
          <SubTitle>날씨</SubTitle>
          <Weather />
        </div>

        {/* 명언 랜덤 위젯 */}
        <ProverbForm />
      </div>
      <br />
      <SubTitle>My Tasks</SubTitle>
      <div className="calendar_box">
        <MyCalendar />
      </div>
    </Container>
  );
};

export default DashboardForm;
