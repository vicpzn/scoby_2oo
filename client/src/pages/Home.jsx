import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import apiHandler from "./../api/apiHandler";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    allItems: [],
    selectedItem: null,
  };

  componentDidMount() {
    apiHandler
      .getItems()
      .then((items) => {
        this.setState({ allItems: items });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[2.3315, 48.8567]}
        >
          {this.state.allItems.map((item) => (
            <Marker
              key={item._id}
              coordinates={item.location.coordinates}
              anchor="bottom"
              style={{ backgroundColor: "white", border: "1px solid black" }}
              onClick={() => {
                this.setState({ selectedItem: item });
              }}
            >
              <img style={{ width: "50px" }} src={item.image} alt={item.name} />
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default Home;
