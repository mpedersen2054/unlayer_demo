import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EmailEditor from 'react-email-editor';

import TemplatePicker from './TemplatePicker';
import EmailPicker from './EmailPicker';
import Editor from './Editor';

const Wrapper = styled.div`
`;

const Nav = styled.div`
  display: flex;
`;

const NavLink = styled.div`
  padding: 10px 30px;
  cursor: pointer;
  text-decoration: underline;
  color: ${({ selected }) => selected ? 'red' : 'blue'};
`;

const App = () => {
  const [view, setView] = React.useState('templates');
  const [asset, setAsset] = React.useState(null);

  const setSelectedView = (v) => {
    if (v === 'templates' || v === 'emails') setAsset(null);
    setView(v);
  };
  const setSelectedAsset = (a) => setAsset(a);

  return (
    <Wrapper>
      <Nav>
        <NavLink
          onClick={() => setSelectedView('templates')}
          selected={view === 'templates'}
        >Templates</NavLink>
        <NavLink
          selected={view === 'emails'}
          onClick={() => setSelectedView('emails')}
        >Emails</NavLink>
        <NavLink
          selected={view === 'editor'}
          onClick={() => setSelectedView('editor')}
        >Editor</NavLink>
      </Nav>
      {(view === 'templates' && !asset) && <TemplatePicker
        setSelectedView={setSelectedView}
        setSelectedAsset={setSelectedAsset} 
      />}
      {(view === 'emails' && !asset) && <EmailPicker
        setSelectedView={setSelectedView}
        setSelectedAsset={setSelectedAsset} 
      />}
      {<Editor
        asset={asset}
        view={view}
        setSelectedView={setSelectedView}
      />}
    </Wrapper>
  );
};

export default App;
