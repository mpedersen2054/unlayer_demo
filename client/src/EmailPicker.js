import React from 'react';
import styled from 'styled-components';

import { getEmails } from './api';

const Wrapper = styled.div`
`;

const Header = styled.h2``

const EmailList = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const EmailItem = styled.li`
  border: 1px solid red;
  margin: 20px 0 0 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
`;

const EmailItemThumbnail = styled.img`
`;

const EmailItemName = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const EmailPicker = ({
  setSelectedAsset,
  setSelectedView,
}) => {
  const [emails, setEmails] = React.useState(null);

  React.useEffect(() => {
    const fetchEmails = async () => {
      const emails = await getEmails();
      setEmails(emails);
    };
    fetchEmails();
  }, []);

  const onEmailClick = (email) => {
    setSelectedAsset(email);
    setTimeout(() => setSelectedView('editor'), 500);
  };

  return (
    <Wrapper>
      {!emails || !emails.length ? (
        <div>Loading...</div>
        ) : (
        <EmailList>
          {emails.map(email => (
            <EmailItem
              onClick={() => onEmailClick(email)}
              key={email.name}
            >
              <EmailItemThumbnail src={email.thumbnail} />
              <EmailItemName>{email.name}</EmailItemName>
            </EmailItem>
          ))}
        </EmailList>
      )}
    </Wrapper>
  );
};

export default EmailPicker;
