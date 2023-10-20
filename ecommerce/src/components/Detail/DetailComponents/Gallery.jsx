import React, { useState, useEffect } from "react";


const Gallery = ({producto}) => {
  const images = producto && producto.images ? producto.images : [];
  const [ind, setInd] = useState(0);
    const [currentImage, setCurrentImage] = useState();

    const handleClick = (index) => {
      setInd(index);
    };
    const removeActivatedClass = (parent) => {
      parent.childNodes.forEach((node) => {
        node.childNodes[0].classList.contains("activated") &&
          node.childNodes[0].classList.remove("activated");
      });
    };
    
    useEffect(() => {
      window.onload = () => {
        setCurrentImage(images[0]);
      };
    }, [images]); 

    return (
        <section className="gallery-holder hide-in-mobile">
          <section className="gallery">
            <div className="image">
              <img src={`data:image/jpeg;base64,${images[ind]}`} alt="product-1" />
            </div>
            <div className="thumbnails">
              {images.map((th, index) => {
                return (
                  <div
                    className="img-holder"
                    key={index}
                    onClick={(e) => {
                      handleClick(index);
                      removeActivatedClass(e.currentTarget.parentNode);
                      e.currentTarget.childNodes[0].classList.toggle("activated");
                    }}
                  >
                    <div className={`outlay ${index === 0 && "activated"}`}></div>
                    <img  src={`data:image/jpeg;base64,${th}`} alt={`product-${index + 1}`} />
                  </div>
                );
              })}
            </div>
          </section>
        </section>
    )
}

export default Gallery