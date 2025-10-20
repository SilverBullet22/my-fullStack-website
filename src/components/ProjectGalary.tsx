import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const ProjectGallery = ({setIsGalleryOpen, index, images }) => {
  return (
      <Lightbox
        open={true}
        close={() => { 
            setIsGalleryOpen(false);
            window.history.back();
          }}
        slides={images.map((img) => ({ src: img }))}
        index={index}
        plugins={[Thumbnails]}
        thumbnails={{ vignette: true }}
        
      />
  );
};

export default ProjectGallery;
