import styled from "styled-components";
import { lighten } from "polished";

export const Container = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  label {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  select {
    padding: 0.5rem;
    border: 1.5px solid ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
    font-size: 1rem;
    width: 200px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }

    &:disabled {
      background: ${({ theme }) => lighten(0.3, theme.colors.primary)};
      cursor: not-allowed;
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  text-align: center;
  font-size: 1rem;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.background};
  }

  &:hover {
    background-color: ${({ theme }) => lighten(0.4, theme.colors.secondary)};
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    align-self: center;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:last-child {
    text-align: center;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border: none;

    &:before {
      content: attr(data-label);
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
      margin-right: 1rem;
    }
  }
`;

export const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const NoDataMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
