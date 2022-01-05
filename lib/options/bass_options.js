'use strict';

/**
 * The power options
 *
 * @class PowerOptions
 */

/**
* The On attribute.
*
* @default ON
* @property {string} On
*/

/**
* The Off attribute.
*
* @default OFF
* @property {string} Off
*/

/**
* The Status attribute.
*
* @default ?
* @property {string} Status
*/

/**
* The Base attribute.
*
* @default PW
* @private
* @property {string} Base
*/

module.exports = {
  up: "UP",
  down: "DOWN",
  min: 44,
  max: 56,
  Status: '?',
  Base: 'PSBAS '
}
