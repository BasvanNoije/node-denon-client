'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const Connection = require('./connection');
const Options = require('./options');
const DenonRegex = require('./denon_regex');
const transformers = require('./transformers');

/**
 * The Denon AVR RPC class.
 *
 * @class DenonClient
 * @extends EventEmitter
 */
class DenonClient extends Connection {
  /**
   * Initializes the telnet connection and sets up events.
   *
   * @constructor
   * @param  {string} host [The Denon AVR address]
   * @param  {number} port [The Denon AVR port, default 23]

   */
  constructor(host,port=23) {
    super(host,port);

    this.Options = Options;

    this.regExTable = {
      // 'masterVolume': {
      'Volume': {
        regEx: /(?:(MV))(?:(\d{2,3}))\r/,
        /**
         * @event masterVolumeChanged
         * @param {object} volume The current volume
         */
        emit: 'masterVolumeChanged',
        transform: transformers.volumeToHumanTransform
      },
      'masterVolumeMax': {
        regEx: /(?:(MVMAX ))(?:(\d{2,3}))\r/,
        /**
         * @event masterVolumeMaxChanged
         * @param {object} maxVolume The maximal volume
         */
        emit: 'masterVolumeMaxChanged',
        transform: transformers.volumeToHumanTransform
      },
      'Mute': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.MuteOptions),
        /**
         * @event muteChanged
         * @param {MuteOptions} mute The current mute status
         */
        emit: 'muteChanged'
      },
      'Input': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.InputOptions),
        /**
         * @event inputChanged
         * @param {InputOptions} input The current input status
         */
        emit: 'inputChanged'
      },
      'Power': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.PowerOptions),
        /**
         * @event powerChanged
         * @param {PowerOptions} power The current power status
         */
        emit: 'powerChanged'
      },
      'Surround': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.SurroundOptions),
        /**
         * @event surroundChanged
         * @param {SurroundOptions} surround The current surround status
         */
        emit: 'surroundChanged'
      },
      'Displaydim': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.DisplayDimOptions),
        /**
         * @event displayDimChanged
         * @param {DisplayDimOptions} displayDim The current display dim status
         */
        emit: 'displayDimChanged'
      },
      'Zone2': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.Zone2Options),
        /**
         * @event zone2Changed
         * @param {Zone2Options} zone2Status The current display dim status
         */
        emit: 'zone2Changed'
      },
      'Subwooferlevel': {
        // regEx: /(?:(PSSWL ))(?:(UP|DOWN|ON|OFF|(\d{2,3})))/,
        regEx: DenonRegex.constructStatusChangedRegex(Options.SubwooferlevelOptions),
        /**
         * @event subwooferLevelChanged
         * @param {SubwooferlevelOptions} subwooferlevel The current subwoofer status
         */
        emit: 'subwooferLevelChanged'
      },
      'Tone': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.ToneOptions),
        /**
         * @event toneChanged
         * @param {ToneOptions} tone The current bass status
         */
        emit: 'toneChanged'
      },
      'Multieq': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.MultieqOptions),
        /**
         * @event multieqChanged
         * @param {MultieqOptions} multieq The current multieq status
         */
        emit: 'multieqChanged'
      },
      'Bass': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.BassOptions),
        /**
         * @event bassChanged
         * @param {BassOptions} bass The current bass status
         */
        emit: 'bassChanged'
      }
    };

    this.on('data', (data) => {
      this._onData(data);
    });

    // Tiny hack. When nothing listens to the error event,
    // the 'once' handler in the connect function won't work.
    // You are still able to grab the error event from the outside.
    this.on('error', (error) => {});
  }

  getEvent(key)
  {
    if (typeof this.regExTable[key] !== 'undefined') {
      return this.regExTable[key].emit;
    } else {
      return undefined;
    }
  }

  /**
   * Does the RegEx magic.
   *
   * @method _applyRegex
   * @private
   * @param  {[string]} data  [The incoming data]
   * @return {[string|undefined]} [Response or undefined]
   */
  _applyRegex(data) {
    //const expression = new RegExp(regEx);
    const keys = _(this.regExTable).keys();
    const matches = [];

    _(keys).each((key) => {

      const handler = this.regExTable[key];
      const match = data.match(handler.regEx);

      if (match != null) {
        const matchResult = handler;

        // If the event hook has a transform method call it before applying the result value
        if (matchResult.transform) {
          matchResult.value = matchResult.transform(match[2]);
        } else {

          matchResult.value = match[2];
        }

        matches.push(matchResult);
      }
    });

    return matches;
  }

  /**
   * Receives the incoming data. Does some RegEx magic.
   * Calls the defined events and resolves promises.
   *
   * @method _onData
   * @private
   * @param  {[string]} data [The incoming data]
   */
  _onData(data) {
    if (typeof data === 'string') {
      const results = this._applyRegex(data);

      results.forEach((result) => {

        this.emit(result.emit, result.value);
      });
    }
  }

  /**
   * Sends a command to the Denon AVR
   *
   * @method sendCommand
   * @param  {string} command   [The command]
   * @param  {string} parameter [The parameter]
   * @return {Promise} [A response]
   */
  sendCommand(command, parameter, hook) {
    return new Promise((resolve) => {

      if (typeof hook === 'string') {
        this.once(hook, (result) => {
          resolve(result);
        });
      }

      return this
        .write(`${command}${parameter}`)
        .then(() => {
          if (typeof hook === 'undefined') {
            resolve();
          }
        });
    })
  }
}

module.exports = DenonClient;
