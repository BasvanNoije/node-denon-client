'use strict';

/**
 * The input options
 *
 * @class InputOptions
 */

/**
* The CD attribute.
*
* @default CD
* @property {string} CD
*/

/**
* The Tuner attribute.
*
* @default TUNER
* @property {string} Tuner
*/

/**
* The DVD attribute.
*
* @default DVD
* @property {string} DVD
*/

/**
* The BD attribute.
*
* @default BD
* @property {string} BD
*/

/**
* The TV attribute.
*
* @default TV
* @property {string} TV
*/

/**
* The Sattalite attribute.
*
* @default SAT/CBL
* @property {string} Sattalite
*/

/**
* The Cable attribute.
*
* @default SAT/CBL
* @property {string} Cable
*/

/**
* The MediaPlayer attribute.
*
* @default SMPLAY
* @property {string} MediaPlayer
*/

/**
* The Game attribute.
*
* @default GAME
* @property {string} Game
*/

/**
* The Game2 attribute.
*
* @default GAME2
* @property {string} Game2
*/

/**
* The Dock attribute.
*
* @default DOCK
* @property {string} Dock
*/

/**
* The VAux attribute.
*
* @default V.AUX
* @property {string} VAux
*/

/**
* The NetUsb attribute.
*
* @default NET/USB
* @property {string} NetUsb
*/

/**
* The Aux1 attribute.
*
* @default AUX1
* @property {string} Aux1
*/

/**
 * The Aux2 attribute.
 * 
 * @default AUX2
 * @property {string} Aux2
 */

/**
* The Net attribute.
*
* @default NET
* @property {string} Net
*/

/**
* The USB attribute.
*
* @default USB
* @property {string} USB
*/

/**
* The IPod attribute.
*
* @default USB/IPOD
* @property {string} IPod
*/

/**
 * The MPlay attribute.
 * 
 * @default MPLAY
 * @property {string} MPlay
 */

/**
 * The MXPort attribute.
 * 
 * @default MXPORT
 * @property {string} MXPort
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
* @default SI
* @private
* @property {string} Base
*/

const InputOptions = {
    cd: 'CD',
    tuner: 'TUNER',
    dvd: 'DVD',
    bd: 'BD',
    tv: 'TV',
    sattalite: 'SAT/CBL',
    cable: 'SAT/CBL',
    mediaplayer: 'SMPLAY',
    game: 'GAME',
    game2: 'GAME2',
    dock: 'DOCK',
    vaux: 'V.AUX',
    netusb: 'NET/USB',
    aux: 'AUX1',
    aux2: 'AUX2',
    mplay: 'MPLAY',
    mxport: 'MXPORT',
    net: 'NET',
    ipod: 'USB/IPOD',
    usb: 'USB',
    vdp: 'VDP',
    Status: '?',
    Base: 'SI',
    // Base: 'SV'
};

module.exports = InputOptions;
