import {isAndroid,isWechat,remoteUrl} from './lib';
import Sound from './Sound';
import iOS from '../iPad/iOS';

////////////////////////////////////////////////////
/// Sound Playing
////////////////////////////////////////////////////

let uiSounds = {};
let defaultSounds = ['cut.mp3', 'snap.mp3', 'copy.mp3', 'grab.mp3', 'boing.mp3', 'tap.mp3',
    'keydown.mp3', 'entertap.mp3', 'exittap.mp3', 'splash.mp3'];
let projectSounds = {};

export default class ScratchAudio {
    static get uiSounds () {
        return uiSounds;
    }

    static get projectSounds () {
        return projectSounds;
    }

    static sndFX (name) {
        ScratchAudio.sndFXWithVolume(name, 1.0);
    }

    static sndFXWithVolume (name, volume) {
        if (!isAndroid) {
            if (!uiSounds[name]) {
                return;
            }
            uiSounds[name].play();
        } else {
            AndroidInterface.audio_sndfxwithvolume(name, volume);
        }
    }

    static init (prefix) {
        if (!prefix) {
            prefix = '';
        }
        if (!isAndroid && !isWechat) {
            prefix = 'HTML5/';
        }
        uiSounds = {};

        for (var i = 0; i < defaultSounds.length; i++) {
            ScratchAudio.addSound(prefix + 'sounds/', defaultSounds[i], uiSounds);
        }
        ScratchAudio.addSound(prefix + 'sounds/', 'pop.mp3', projectSounds);
    }

    static addSound (url, snd, dict, fcn) {
        var name = snd;
        if (!isAndroid) {
            var whenDone =  function (str) {
                if (str != 'error') {
                    var result = snd.split (',');
                    dict[snd] = new Sound(result[0], result[1]);
                } else {
                    name = 'error';
                }
                if (fcn) {
                    fcn(name);
                }
            };
            iOS.registerSound(url, snd, whenDone);
        } else {
            // In Android, this is handled outside of JavaScript, so just place a stub here.
            dict[snd] = new Sound(url + snd);
            if (fcn) {
                fcn(snd);
            }
        }
    }

    static soundDone (name) {
        if (!projectSounds[name]) return;
        projectSounds[name].playing = false;
    }

    static loadProjectSound (md5, fcn) {
        if (!md5) {
            return;
        }
        var dir = '';
        if (!isAndroid) {
            if (md5.indexOf('/') > -1) dir = 'HTML5/';
            else if (md5.indexOf('wav') > -1 && !isWechat) dir = 'Documents';
        }
        if (remoteUrl) {
            ScratchAudio.loadFromLocal(remoteUrl+dir, md5, fcn);
        } else {
            ScratchAudio.loadFromLocal(dir, md5, fcn);
        }
    }

    static loadFromLocal (dir, md5, fcn) {
        if (projectSounds[md5] != undefined) {
            return;
        }
        ScratchAudio.addSound(dir, md5, projectSounds, fcn);
    }
}

window.ScratchAudio = ScratchAudio;
