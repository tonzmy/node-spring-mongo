import Carousel from 'react-bootstrap/Carousel'
import '../../stylesheets/DetailImageCarouselUI.css'

const DetailImageCarouselUI = () =>
  <Carousel>
    <Carousel.Item>
      <div className="carousel-item">
      </div>
      <Carousel.Caption>
        <h3>First slide image</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <div className="carousel-item">
      </div>
      <Carousel.Caption>
        <h3>Second slide image</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <div className="carousel-item">
      </div>
      <Carousel.Caption>
        <h3>Third slide image</h3>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

export default DetailImageCarouselUI
