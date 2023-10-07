import React, { useState, useEffect } from "react";

import prod1 from '../../../assets/fotoPrueba1.jpg';
import prod2 from '../../../assets/fotoPrueba2.jpg';
import prod3 from '../../../assets/fotoPrueba3.jpg';
import prod4 from '../../../assets/fotoPrueba4.jpg';


import thumb1 from '../../../assets/fotoPrueba1.jpg';
import thumb2 from '../../../assets/fotoPrueba2.jpg';
import thumb3 from '../../../assets/fotoPrueba3.jpg';
import thumb4 from '../../../assets/fotoPrueba4.jpg';

const IMAGES = [prod1, prod2, prod3, prod4];
const THUMBS = [thumb1, thumb2, thumb3, thumb4];

const Gallery = () => {
    const [currentImage, setCurrentImage] = useState(prod1);
    const [currentPassedImage, setCurrentPassedImage] = useState(prod1);
    const [open, setOpen] = useState(false);
    const handleClick = (index) => {
        setCurrentImage(IMAGES[index]);
    };
    const handleToggle = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const removeActivatedClass = (parent) => {
      parent.childNodes.forEach((node) => {
        node.childNodes[0].classList.contains("activated") &&
          node.childNodes[0].classList.remove("activated");
      });
    };
    useEffect(() => {
      setCurrentPassedImage(currentImage);
    }, [currentImage]);
    

    return (
        <section className="gallery-holder hide-in-mobile">
          <section className="gallery">
            <div className="image">
              <img src={currentImage} alt="product-1" onClick={handleToggle} />
            </div>
            <div className="thumbnails">
              {THUMBS.map((th, index) => {
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
                    <img src={th} alt={`product-${index + 1}`} />
                  </div>
                );
              })}
            </div>
          </section>
        </section>
    )
}

export default Gallery