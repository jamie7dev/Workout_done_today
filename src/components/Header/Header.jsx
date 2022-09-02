import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <HeaderStyle>  
          <nav>
            <StLink to="/"><span>home</span></StLink>
            <StLink to="/login"><span>로그인</span></StLink>
          </nav>
            <StTitle>✊ 오늘 운동 완료 했니? ✊</StTitle>
        </HeaderStyle>
    );
};

const HeaderStyle = styled.header`
  display: flex;
  color: #4B89DC;
  height: 10vh;
  padding: 10px 15px;
  span {
    font-size: 36px;
    color: white;
    background-color: #4B89DC;
    border-radius: 10px;
    
  }
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StTitle = styled.div`
  margin  : auto;
  font-size: 60px;
  font-weight: bold;

`;

export default Header;