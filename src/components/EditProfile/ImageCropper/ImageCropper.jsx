import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import './ImageCropper.css';
import back from '../../../assets/left-arrow.png';

function ImageCropper({ imageSelected, cropClickHandler, setShowImageCropper }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const backClickHandler = () => {
    setShowImageCropper(false);
  };

  return (
    <div className="imageCropper">
      <div className="imageCropper-header">
        <img
          className="btn btn-back imageCropper-header-btn"
          src={back}
          alt="back"
          onClick={backClickHandler}
        />
        <button type="button" className="crop-btn" onClick={() => cropClickHandler(croppedArea)}>
          Apply
        </button>
      </div>
      <Cropper
        image={imageSelected}
        aspect={1}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  );
}

export default ImageCropper;
