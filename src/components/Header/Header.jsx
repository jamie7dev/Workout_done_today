import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from '../../redux/modules/userSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(logout());
    window.alert("로그인 페이지로 이동합니다");
    navigate('/');
  };

  return (
    <>
      <HeaderStyle>
        <StLink to="/main"><span>Home</span></StLink>
        <StTitle>✊ 오늘 운동 완료 했니? ✊</StTitle>

        <StButton style={{ float: "right" }}
          onClick={onClickHandler}>
          로그아웃
        </StButton>
      </HeaderStyle>
    </>
  );
};

const HeaderStyle = styled.header`
  color: #4B89DC;
  height: 8%;
  padding: 10px;
  button {
    float: right;
  }
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-between;
`;

const StButton = styled.button`
  text-decoration: none;
  border: none;
  font-size: 16px;
  color: white;
  background-color: #4B89DC;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  
`;


const StLink = styled(Link)`
  text-decoration: none;
  
  span {
    font-size: 25px;
    color: white;
    background-color: #4B89DC;
    border-radius: 5px;
    padding: 20%;
  }
`;

const StTitle = styled.div`
  margin: 0 auto;
  font-size: 60px;
  font-weight: bold;  
`;

export default Header;