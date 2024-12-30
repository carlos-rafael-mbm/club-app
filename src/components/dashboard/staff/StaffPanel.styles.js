import styled from "styled-components";

export const PanelContainer = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.white};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.primary : theme.colors.secondaryLight};
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
