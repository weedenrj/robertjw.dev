import { useState, useEffect } from "react";

function UseDirections() {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [geoError, setGeoError] = useState<string>();
  const [run, setRun] = useState(false)

  const googleDirections = location && `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/508+State+St,+Madison,+WI+53703/`

  useEffect(() => {
    if (run && window?.navigator?.geolocation) {
      navigator?.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position)
          window.open(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/508+State+St,+Madison,+WI+53703/`, "_blank");
          setRun(false)
        },
        () => setGeoError("Unable to retrieve your location")
      );
    } else {
      setGeoError("Geolocation not supported")
    }
  }, [run])


  return {
    getLocation: setRun,
    geoLocation: location,
    geoError,
    googleDirections
  }
}

export default UseDirections;