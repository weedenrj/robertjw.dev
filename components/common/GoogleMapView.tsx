'use client'

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useWindowDimensions from '@hooks/UseWindowDimensions';

const containerStyle = {
  width: 'auto',
  height: '572px'
};

const center = {
  lat: 43.07514890261202,
  lng: -89.39364996444267
};

function GoogleMapView() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API
  })
  const { width, height } = useWindowDimensions()
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={(width >= 768 || width < 375) ? containerStyle : { width, height: width }}
      center={center}
      zoom={0}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapView)