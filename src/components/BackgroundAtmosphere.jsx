import backgroundImage from "../Img/imgFondoReact.jpeg";

function BackgroundAtmosphere() {
  return (
    <div className="background-atmosphere" style={{ "--background-image": `url(${backgroundImage})` }} aria-hidden="true">
      <span className="neon-flicker neon-flicker-left" />
      <span className="neon-flicker neon-flicker-right" />
      <span className="projector-beam" />
      <span className="atmosphere-orb atmosphere-orb-one" />
      <span className="atmosphere-orb atmosphere-orb-two" />
      <span className="atmosphere-orb atmosphere-orb-three" />
      <span className="screen-flicker" />
      <span className="film-grain" />
    </div>
  );
}

export default BackgroundAtmosphere;
