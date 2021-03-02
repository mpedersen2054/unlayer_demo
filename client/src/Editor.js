import React from 'react';
import styled from 'styled-components';
import EmailEditor from 'react-email-editor';

import { createEmail } from './api';
import Modal from './Modal';

const Wrapper = styled.div`
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  height: ${({ visible }) => visible ? '100%' : '0'};
  > div:first-child {
    height: 90vh;
  }
`;

const MetaRow = styled.div`
  display: flex;
`;

const exampleProducts = [
  {
    "id": "1d1d1d1",
    "name": "ECHO BEACH ARCH 18",
    "number": "123ae311",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04515_gry0.primary.png",
    "sku": "4764",
  },
  {
    "id": "2d1d2d2d2",
    "name": "HIGHLINE PRO ARCH 19",
    "number": "1d1d12dad",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04594_kvj0.primary.png",
    "sku": "1291",
  },
  {
    "id": "3dd3da3d",
    "name": "HIGHLITE ARCH 19",
    "number": "f1f2f1f2",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04566_kta6.primary.png",
    "sku": "9242",
  },
  {
    "id": "4s4a4a4",
    "name": "SURFSILK TIJUANA 18",
    "number": "g2g2g2g2",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04530_kta6.primary.png",
    "sku": "9234",
  },
  {
    "id": "55a5a5a5",
    "name": "SURFSILK MYSTIC SESSIONS 18",
    "number": "hh4h4h4h",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04523_wbb6.primary.png",
    "sku": "1204",
  },
  {
    "id": "6h6h6hhh6",
    "name": "SURFSILK PARADISE EXPRESS 19",
    "number": "k6k6k6k",
    "image": "https://images.boardriders.com/elasticSuite/quiksilver/detail/eqybs04539_wbb6.primary.png",
    "sku": "0402",
  },
];

const Editor = ({
  asset,
  view,
  setSelectedView,
}) => {
  const emailEditorRef = React.useRef(null);
  const [emailName, setEmailName] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (asset && asset.data) {
      emailEditorRef.current.editor.loadDesign(asset.data);

      // only control the image upload if a template is selected
      emailEditorRef.current.editor.registerCallback('selectImage', openImageGallery);
    }
  }, [asset]);

  const onCreateEmail = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      const thumbnail = asset?.thumbnail || 'https://via.placeholder.com/320x250';
      const images = asset?.images || [];
      createEmail({
        name: emailName,
        data: design,
        thumbnail: thumbnail,
        images: images,
      }).then(res => {
        setEmailName('');
        setSelectedView('emails');
      });
    });
  };

  const onEmailChange = e => {
    setEmailName(e.target.value);
  };

  const openImageGallery = (data, done) => {
    setModalIsOpen(true);
    const modalImages = document.querySelectorAll('.modal-image');
    for (const modalImage of modalImages) {
      modalImage.addEventListener('click', imageClicked)
    }

    function imageClicked(e) {
      done({ url: e.target.currentSrc });
      for (const modalImage of modalImages) {
        modalImage.removeEventListener('click', imageClicked);
      }
      setModalIsOpen(false);
    };
  };

  return (
    <Wrapper visible={view === 'editor'}>
      <EmailEditor
        projectId={1071}
        ref={emailEditorRef}
        options={{
          customJS: [
            // window.location.protocol + '//' + window.location.host + '/custom.js',
            // window.location.protocol + '//' + window.location.host + '/johnDoeExample.js',
            window.location.protocol + '//' + window.location.host + '/productExample.js',
          ],
          customCSS: [
            'https://examples.unlayer.com/examples/product-library-tool/productTool.css'
          ],
        }}
        tools={{
          // productExample
          'custom#product_tool': {
            data: {
              products: exampleProducts || [],
            },
            properties: {
              productLibrary: {
                editor: {
                  data: {
                    products: exampleProducts || [],
                  },
                },
              },
            },
          },
        }}
      />
      <br/>
      <MetaRow>
        <input value={emailName} onChange={onEmailChange} type="text" placeholder="Email Name" />
        <button disabled={!emailName.length} onClick={onCreateEmail}>Create Email</button>
      </MetaRow>
      <Modal
        asset={asset}
        isOpen={modalIsOpen}
        onCloseModal={() => setModalIsOpen(false)}
      />
    </Wrapper>
  );
};

export default Editor;
