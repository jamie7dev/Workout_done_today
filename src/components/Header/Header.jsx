import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from '../../redux/modules/userSlice';
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
    return (

      <>
        <StNavigation>
          <StLink to="/"><span>로그인(임시)</span></StLink>
          <StLink to="/post"><span>게시글 작성하기</span></StLink>
          <button onClick={()=>dispatch(logout())}>로그아웃</button>
        </StNavigation>        
        <HeaderStyle>  
            <StTitle>✊ 오늘 운동 완료 했니? ✊</StTitle>
        </HeaderStyle>
      </>

    );
};

const HeaderStyle = styled.header`
  display: flex;
  color: #4B89DC;
  height: 10vh;
  padding: 20px;
 
`;

const StNavigation = styled.nav`
  padding: 10px 30px;
  button {
    float: right;
  }
`;

const StLink = styled(Link)`
  text-decoration: none;
  
  span {
    font-size: 16px;
    color: white;
    background-color: #4B89DC;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
  }
`;

const StTitle = styled.div`
  margin: 0 auto;
  font-size: 60px;
  font-weight: bold;  
`;

export default Header;