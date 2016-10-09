var request = require('request');


/*
 * Usage: 
 *   var getImage = require('./ngri.js');
 *   getImage().then( (b64image) => console.log(b64image) )
 *             .catch( (err) => console.err(err) );
 */
module.exports = () =>
  new Promise( (resolve, reject) =>
    // request.get( 'http://loremflickr.com/640/480/cat', 
    request.get( 'http://loremflickr.com/50/50/cat', 
                 { encoding: 'binary' },
                 (e, r, b) => e ? reject(e)
                                : resolve( Buffer.from(b, 'binary')
                                                 .toString('base64') )));


