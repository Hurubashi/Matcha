export function getLocation() {
	function success(position: Position) {
		const latitude = position.coords.latitude
		const longitude = position.coords.longitude

		//   `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
		console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`)
	}

	function error(positionError: PositionError) {
		console.log('PositionError:' + positionError.message)
		console.log('Unable to retrieve your location')
	}

	if (!navigator.geolocation) {
		console.log('Geolocation is not supported by your browser')
	} else {
		//   status.textContent = 'Locating…';
		console.log(navigator.geolocation.getCurrentPosition(success, error))
	}
}
