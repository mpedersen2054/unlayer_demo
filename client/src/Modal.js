import React from 'react';
import styled from 'styled-components';
import * as ReactModal from 'react-modal';

import { getAssetImages } from './api';

ReactModal.setAppElement('#root');

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CloseLink = styled.div`
  color: red;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const Underline = styled.span`
  text-decoration: underline;
`;

const Header = styled.div`
  font-size: 32px;
  margin-bottom: 32px;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImageItem = styled.div`
  margin-right: 12px;
  cursor: pointer;
  max-width: 300px;
`;

const Image = styled.img.attrs(props => ({
  draggable: false,
}))`
  width: 100%;
  height: auto;
  user-select: none;
`;

const Modal = ({
  asset,
  isOpen,
  onCloseModal,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleClose = () => {
    setSelectedImage(null);
    onCloseModal();
  };

  return (
    <ReactModal
      isOpen={isOpen}
    >
      {asset && (
        <Inner>
          <CloseLink onClick={handleClose}>Close</CloseLink>
          <Header>Gallery for <Underline>{asset.name}</Underline></Header>
          <ImageList id="modal-images">
            {asset.images.map(url => (
              <ImageItem key={url}>
                <Image
                  className="modal-image"
                  selected={selectedImage === url}
                  src={url}
                  alt={url} />
              </ImageItem>
            ))}
          </ImageList>
        </Inner>
      )}
    </ReactModal>
  );
};

export default Modal;