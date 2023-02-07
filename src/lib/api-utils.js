const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  // return coordsData;
};

const getCoords = async () => {
  try {
    const position = await getCurrentLocation();

    const { coords } = position;
    return { lat: coords.latitude, long: coords.longitude };
  } catch (err) {
    alert(
      "Could not get your location, please enable your location. " + err.message
    );
  }
};

export const getPosition = async () => {
  const { lat, long } = await getCoords();

  try {
    const res = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);

    if (!res.ok) {
      throw new Error(`Problem with detecting your location ${res.status}`);
    }
    const data = await res.json();

    const { state, city, staddress } = data;

    return { state, city, address: staddress };
  } catch (error) {
    alert(error.message);
  }
};
