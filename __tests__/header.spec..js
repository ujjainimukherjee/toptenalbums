import React from 'react'
import { create } from "react-test-renderer";
import Header from '../components/Header';


describe("Header component", () => {
        
  test("matches the snapshot", () => {
    const component = create(<Header />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
