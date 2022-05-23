import React from "react";
import { observer } from "mobx-react";

function Home() {
  return (
    <div className="body">
      <img
        className="home-image"
        src="https://media.discordapp.net/attachments/978133913203515433/978134063019851786/929a2f76-33ea-4fce-881b-8192f7a0bed6.jpg?width=885&height=498"
      ></img>
      ;
    </div>
  );
}

export default observer(Home);
