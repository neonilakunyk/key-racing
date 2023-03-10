import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { HttpError } from 'common/exceptions';
import { useState } from 'hooks';
import { ICropData } from './interfaces';

type Props = {
  isShown: boolean;
  src: string;
  handleClose: () => void;
  updateAvatar: (croppedImageCanvas: HTMLCanvasElement) => void;
};

const CropAvatar: React.FC<Props> = ({
  isShown,
  src,
  handleClose,
  updateAvatar,
}) => {
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: '%',
    height: 128,
    aspect: 1,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const onCropChange = (newCrop: Crop): void => {
    setCrop(newCrop);
  };

  const onImageLoaded = (img: HTMLImageElement): void => {
    setImage(img);
  };

  const getCroppedImg = (
    img: HTMLImageElement,
    cropData: ICropData,
  ): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = cropData.width;
    canvas.height = cropData.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(
      img,
      cropData.x * scaleX,
      cropData.y * scaleY,
      cropData.width * scaleX,
      cropData.height * scaleY,
      0,
      0,
      cropData.width,
      cropData.height,
    );

    return canvas;
  };

  const onSave = async (): Promise<void> => {
    try {
      const croppedImage = getCroppedImg(
        image as HTMLImageElement,
        crop as ICropData,
      );
      updateAvatar(croppedImage);
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    }
  };

  return (
    <Modal
      className="d-flex align-items-center"
      dialogClassName="w-25 rounded"
      show={isShown}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">Crop the avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactCrop
          src={src}
          onChange={onCropChange}
          crop={crop}
          keepSelection
          circularCrop
          minHeight={128}
          onImageLoaded={onImageLoaded}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CropAvatar };
