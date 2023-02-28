import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 20px;

  font-size: 18px;
  font-weight: 400;

  &.active {
    font-weight: 600;
  }

  &.active svg {
    fill: rgba(74, 86, 226, 1);
    border: 1px solid white;
  }

  & svg {
    fill: rgba(74, 86, 226, 0.75);
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
  }
`;
