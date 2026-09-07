import backgroundImage from "../Img/imgFondoReact.jpeg";

function BackgroundAtmosphere() {
  return (
    <div className="background-atmosphere" style={{ backgroundImage: `url(${backgroundImage})` }} aria-hidden="true">
      <span className="neon-flicker neon-flicker-left" />
      <span className="neon-flicker neon-flicker-right" />
      <span className="projector-beam" />
      <span className="film-grain" />
    </div>
  );
}

export default BackgroundAtmosphere;
