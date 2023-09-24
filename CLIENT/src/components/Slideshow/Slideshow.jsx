import SimpleImageSlider from "react-simple-image-slider";
const Slideshow = ({ imgsUrl }) => {
  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SimpleImageSlider
        style={{ backgroundPosition: "center" ,backgroundRepeat: "no-repeat", backgroundSize:"contain" }}
        width={"95%"}
        height={650}
        images={
          imgsUrl || [
            "https://cdn.pixabay.com/photo/2023/08/14/15/42/milkyway-8190232_640.jpg",
          ]
        }
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};
export default Slideshow;
