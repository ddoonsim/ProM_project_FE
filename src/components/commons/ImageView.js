import React from "react";

const ImageView = ({image, mode}) => {
    const { seq, fileUrl, thumbsUrl, fileName } = image;
    const imageUrl = mode ==='thumbnail' ? thumbsUrl[0] : fileUrl;

    return (
        <div>
            <img src={imageUrl} alt={fileName} />
        </div>
    )

};

export default React.memo(ImageView);