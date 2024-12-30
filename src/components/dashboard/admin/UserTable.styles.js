import { lighten } from "polished";
import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex; /* Cambiar tabla a contenedor flex */
    flex-direction: column;
    align-items: center; /* Centrar los bloques */
    gap: 1rem; /* Espaciado entre bloques */
  }
`;

export const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 1rem;
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
  padding: 0.7rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:last-child {
    text-align: center;
  }

  @media (max-width: 768px) {
    display: flex;
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

export const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const DisabledText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;
