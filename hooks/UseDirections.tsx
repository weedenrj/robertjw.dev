import { useState, useEffect } from "react";

const defaultMapLink = 'https://www.google.com/maps/place/The+Red+Shed/@43.0751411,-89.3962245,17z/data=!3m1!4b1!4m6!3m5!1s0x88065334545cec87:0x56454ce227722d2b!8m2!3d43.0751372!4d-89.3936496!16s%2Fg%2F1vd95p53?entry=ttu'

function UseDirections() {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [geoError, setGeoError] = useState<string>();
  const [run, setRun] = useState(false)
  const [googleLink, setGoogleLink] = useState<string>()


  useEffect(() => {
    if (run && window?.navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position)
          setGoogleLink(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/508+State+St,+Madison,+WI+53703/`)
          window.open(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/508+State+St,+Madison,+WI+53703/`, "_blank");
        },
        () => {
          setGeoError("Unable to retrieve your location")
          setGoogleLink(defaultMapLink)
          window.open(defaultMapLink, "_blank");
        }
      );
    } else {
      setGeoError("Geolocation not supported")
      setGoogleLink(defaultMapLink)
    }
    setRun(false)
  }, [run])


  return {
    getLocation: setRun,
    geoLocation: location,
    geoError,
    googleDirections: googleLink
  }
}

export default UseDirections;