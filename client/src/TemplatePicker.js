import React from 'react';
import styled from 'styled-components';

import { getTemplates } from './api';

const Wrapper = styled.div`
`;

const Header = styled.h2``

const TemplateList = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TemplateItem = styled.li`
  border: 1px solid red;
  margin: 20px 0 0 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
`;

const TemplateItemThumbnail = styled.img`
`;

const TemplateItemName = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const TemplatePicker = ({
  setSelectedAsset,
  setSelectedView,
}) => {
  const [templates, setTemplates] = React.useState(null);

  React.useEffect(() => {
    const fetchTemplates = async () => {
      const templates = await getTemplates();
      setTemplates(templates);
    };
    fetchTemplates();
  }, []);

  const onTemplateClick = (template) => {
    setSelectedAsset(template);
    setTimeout(() => setSelectedView('editor'), 500);
  };

  return (
    <Wrapper>
      {!templates || !templates.length ? (
        <div>Loading...</div>
        ) : (
        <TemplateList>
          {templates.map(template => (
            <TemplateItem
              onClick={() => onTemplateClick(template)}
              key={template.name}
            >
              <TemplateItemThumbnail src={template.thumbnail} />
              <TemplateItemName>{template.name}</TemplateItemName>
            </TemplateItem>
          ))}
        </TemplateList>
      )}
    </Wrapper>
  );
};

export default TemplatePicker;
