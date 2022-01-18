import { render, screen } from '@testing-library/react';
import App from './App';
import Card from './components/Card/Card.jsx';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



// describe("<Card/>", () => {
//   it('Debería renderizar un tag "h4" que muestre lo que contiene el "Temperaments:"', () => {
    
//     expect(Card([3]).find("h4").at(0).text()).toBe("Temperaments:");
// })});