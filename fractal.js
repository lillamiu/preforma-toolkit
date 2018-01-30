'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Preforma Toolkit');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'src'));
fractal.components.set('ext', '.html');
fractal.components.set('default.preview', '@preview');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('builder.dest', path.join(__dirname, '/build'));

/*
 * Customize theme
 */
const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module
// create a new instance with custom config options
const myCustomisedTheme = mandelbrot({
    skin: "white"
    // any other theme configuration values here
});
fractal.web.theme(myCustomisedTheme); // tell Fractal to use the configured theme by default
