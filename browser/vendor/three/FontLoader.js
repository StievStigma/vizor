/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.FontLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.FontLoader.prototype = {

	constructor: THREE.FontLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader( this.manager );
		loader.load( url, function ( text ) {

			var json;

			try {

				json = JSON.parse( text );

			} catch ( e ) {

				console.warn( 'THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead.' );
	
				var fontDataMarker = 'loadFace('
				var fontDataStart = text.indexOf(fontDataMarker)

				var fontData = text
				if (fontDataStart === -1) {
					fontData = text
				}
				else {
					fontData = text.substring( fontDataStart + fontDataMarker.length, text.length - 2 )
				}
				
				json = JSON.parse( fontData );

			}

			var font = scope.parse( json );

			if ( onLoad ) onLoad( font );

		}, onProgress, onError );

	},

	parse: function ( json ) {

		return new THREE.Font( json );

	}

};
