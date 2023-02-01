import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function RecipeInProgress() {
  return (
    <Carousel
      className="container"
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://upload.wikimedia.org/wikipedia/az/b/b7/Ash-and-pikachu-original.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/51/07/75/510775920002ed607ff0a5582932214a.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.showmetech.com.br/wp-content/uploads//2021/02/capa-dog-1920x1024.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image01_grd.png"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.ibxk.com.br/2017/07/13/13160112901226.jpg"
          alt="Sixth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default RecipeInProgress;
