import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cropper from 'react-easy-crop';
import './ImageCropper.css';

function ImageCropper({ imageSelected, cropClickHandler }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="imageCropper">
      <div className="imageCropper-header">
        <h1>111</h1>
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
