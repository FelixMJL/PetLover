import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cropper from 'react-easy-crop';
import './ImageCropper.css';

function ImageCropper({ imageSelected, setImageArea }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const cropClickHandler = () => {
    setImageArea(croppedArea);
  };

  return (
    <div className="cropper">
      <div>
        <Cropper
          image={imageSelected}
          aspect={1}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: '80%',
              height: '80%',
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <button type="button" className="crop-btn" onClick={cropClickHandler}>
        Done
      </button>
    </div>
  );
}

export default ImageCropper;
