import React from "react";
import logDoc from "../my-images/hopeImgs/logindoc.png"

function LoginSlider() {
  // const [sliderIndex, setSliderIndex] = useState(0);
  // const sliderImgs = [
  //   {
  //     url: "../images/hopeImgs/mySlider/slider1.jpeg",
  //     title: "slider1",
  //   },
  //   {
  //     url: "../images/hopeImgs/mySlider/slider2.jpg",
  //     title: "slider2",
  //   },
  //   {
  //     url: "../images/hopeImgs/mySlider/slider3.jpg",
  //     title: "slider3",
  //   },
  // ];

  const mySlideStyle = {
    backgroundImage: `url(${logDoc})`,
  };

  // function handleDotClick(e){
  //   const name = e.target.getAttribute("name");
  //   setSliderIndex(parseInt(name));
  // }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSliderIndex((prevIndex) =>
  //       prevIndex === sliderImgs.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [sliderIndex]);

  return (

    <div className="mySlider-container">
      <div className="mySlides" style={mySlideStyle}></div>
      {/* <div className="dots-container">
        {sliderImgs.map((_, index) => (
          <div
            key={index}
            className={`dots ${index === sliderIndex ? "active" : ""}`}
            name={index}
            onClick={handleDotClick}
          ></div>
        ))}
      </div> */}
    </div>
  );
}

export default LoginSlider;
