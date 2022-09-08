import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from '../../redux/modules/userSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __logout } from "../../redux/modules/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = () => {
    dispatch(__logout());
    dispatch(logout());
    window.alert("로그인 페이지로 이동합니다");
    navigate('/');
  };


  return (
    <>
      <HeaderStyle>
        <StSpan onClick={() => navigate('/main')}>Home</StSpan>
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
  min-width: 900px;
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

const StSpan = styled.span`
  text-decoration: none;
  margin: 30px;
  width: 30px;
  font-size:30px;
  :hover{
    color:red;
    font-size: 40px;
  }
`;

const StTitle = styled.div`
  margin: 10px;
  font-size: 60px;
  font-weight: bold;  
`;

const StButton = styled.button`
  text-decoration: none;
  border: none;
  font-size: 16px;
  color: white;
  background-color: #4B89DC;
  border-radius: 5px;
  padding: 5px;
  margin-right: 20px;
  cursor: pointer;
`;

export default Header;