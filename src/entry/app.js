import {preprocessAndLoadCss} from '../utils/lib';
import Localization from '../utils/Localization';
import AppUsage from '../utils/AppUsage';
import iOS from '../iPad/iOS';
import IO from '../iPad/IO';
import MediaLib from '../iPad/MediaLib';

import {indexMain} from './index';
import {homeMain} from './home';
import {editorMain} from './editor';
import {gettingStartedMain} from './gettingstarted';
import {inappInterfaceGuide, inappAbout, inappBlocksGuide, inappPaintEditorGuide} from './inapp';



const DEBUG = true;//  remote.getCurrentWebContents().browserWindowOptions.isDebug;  // grab the DEBUG variable from main. This is passed through the BrowserWindow creation
const DEBUG_FILEIO =  DEBUG && true;       // saving and loading user files
const DEBUG_RESOURCEIO = DEBUG && false;  // files from the application directory
const DEBUG_NYI = DEBUG && true;          // stuff not yet implemented
const DEBUG_DATABASE = DEBUG &&  false;    // database access
const DEBUG_CAMERA = DEBUG && false;      // camera access
const DEBUG_AUDIO = DEBUG && true;           // audio interface
const DEBUG_AUDIOMETER = DEBUG &&  false;  // volume feedback
const DEBUG_WRITE_ERRLOG = DEBUG && true;

let hasCapturedErrors;

// Debugging the electron process:
// note to use a debugger use 'npm run debugMain' and load up chrome://inspect
// ============================================================================
// use one wrapper for debugging so we can turn it on and off at a
// central place
function debugLog(...args) {
    if (DEBUG) {
        console.log(...args); // eslint-disable-line no-console
    }
    
    return true;
}
debugLog('electronClient debugLog enabled =======================');

class ElectronDesktopInterface {


    constructor () {
        this.currentAudio = {};
    }

    database_stmt(json) {
        return json;//ipcRenderer.sendSync('database_stmt', json);

    }
    database_query(json) {
        if (DEBUG_DATABASE) debugLog('beginning database_query', json);
        let res = json;//ipcRenderer.sendSync('database_query', json);
        if (DEBUG_DATABASE) debugLog('end database_query', res);
        return res;

    }

    io_getsettings(){

        if (DEBUG_RESOURCEIO) debugLog('io_getsettings');
        let settings = null;//ipcRenderer.sendSync('io_getsettings', null);
        return settings;


    }

    io_getmedia(file){

        if (DEBUG_FILEIO) debugLog('io_getmedia', file);
        return file;//ipcRenderer.sendSync('io_getmedia', file);

    }

    io_getmediadata(key, offset, length){

        if (DEBUG_FILEIO) debugLog('io_getmediadata', key, offset, length);
        return key;//ipcRenderer.sendSync('io_getmediadata', key, offset, length);

    }

    io_getmediadone(key){

        if (DEBUG_FILEIO) debugLog('io_getmediadone', key);
        return key;//ipcRenderer.sendSync('io_getmediadone', key);

    }
    io_getmedialen(file, key){

        if (DEBUG_FILEIO) debugLog('io_getmedialen', file, key);
        return key;//ipcRenderer.sendSync('io_getmedialen', file, key);

    }

    io_setmedia(str,  ext){
        if (DEBUG_FILEIO)  debugLog('io_setmedia', str, ext);
        return str;//ipcRenderer.sendSync('io_setmedia', str,  ext);

    }

    io_setmedianame(str, name, ext){
        if (DEBUG_FILEIO) debugLog('io_setmedianame', name, ext);

        return str;//ipcRenderer.sendSync('io_setmedianame', str, name, ext);
    }

    io_getmd5(str){
        if (DEBUG_FILEIO) debugLog('io_getmd5', str);
        return (str) //? ipcRenderer.sendSync('io_getmd5', str) : null;
    }


    io_remove(str){
        if (DEBUG_NYI)  debugLog('io_remove - NYI', str);
        return str;//ipcRenderer.sendSync('io_remove', str);

    }

    io_cleanassets(str){
        if (DEBUG_NYI) {
            debugLog('io_cleanassets - NYI', str);
        }
        return str;//ipcRenderer.sendSync('io_cleanassets', str);

    }


    io_registersound(dir, name){

        if (!this.currentAudio[name]) {
            let dataUri = name;//ipcRenderer.sendSync('io_getAudioData', name);
            this.loadSoundFromDataURI(name, dataUri);

        }


    }

    loadSoundFromDataURI(name, dataUri) {
        if (dataUri && name) {
            let audio = new window.Audio(dataUri);
            audio.volume = 0.8;  // don't oversaturate the speakers
            audio.onended = function() {
                // we need to tell ScratchJR the sound is done
                // so that it will progress to the next block.
                iOS.soundDone(name); // eslint-disable-line no-undef

            };
            
            this.currentAudio[name] = audio;
        }
    }

    io_getfile(str){
        if (DEBUG_FILEIO) debugLog('io_getfile', str);

        // returns a file from the scratch jr documents folder
        return str;//ipcRenderer.sendSync('io_getfile', str);


    }

    io_gettextresource(filename){
        if (DEBUG_RESOURCEIO) debugLog('io_gettextresource', filename);

        // returns a file from the app resource folder
        return filename;//ipcRenderer.sendSync('io_gettextresource', filename);


    }




    io_setfile(name, btoa_str){
        if (DEBUG_FILEIO)  debugLog('io_setfile', name, btoa_str);

        return {name: name, contents: btoa_str};//ipcRenderer.sendSync('io_setfile', {name: name, contents: btoa_str});
    }




    getAudioCaptureElement() {
        if (!this.audioCaptureElement) {
            this.audioCaptureElement = new AudioCapture();
            // this is mainly used for debugging purposes
            // so we can test when there is no microphone.
            this.audioCaptureElement.isRecordingPermitted = true;
             
        }
        return this.audioCaptureElement;
    }

    // sounds
    io_playsound(name){
        if (DEBUG_AUDIO) debugLog('io_playsound', name);

		let audioElement = this.currentAudio[name];
        if (!audioElement) {
            debugLog('io_playsound: unable to play unregistered sound - skipping', name);
         
         	// tell scratch the empty sound has finished - otherwise
         	// the green blocks will not progress
         	setTimeout(function() {
         		iOS.soundDone(name); // eslint-disable-line no-undef 
         	}, 1);
         
            return;
        }

        //https://medium.com/@Jeff_Duke_io/working-with-html5-audio-in-electron-645b2d2202bd

        try {
            let playPromise = audioElement.play();

            // In browsers that don’t yet support this functionality,
            // playPromise won’t be defined.
            if (playPromise !== undefined) {
				  playPromise.then(
				  	function() {
					// Automatic playback started!
					}).catch(function(error) {
					// Automatic playback failed.
					// Show a UI element to let the user manually start playback.
					debugLog(error);
				  });
            }
        }  catch (e) {
            debugLog('could not play sound', e);
        }
    }


    io_stopsound(name){
        if (DEBUG_AUDIO) debugLog('io_stopsound', name);

		let audioElement = this.currentAudio[name];
    
        if (audioElement) {
          audioElement.pause();  
        }
        
    }



    /** called when the record button is pressed*/
    recordsound_recordstart(){
        return this.getAudioCaptureElement().startRecord();
    }

    /** called when the stop button is pressed or the tickmark is pressed during the record operation*/
    recordsound_recordstop(){

        this.getAudioCaptureElement().stopRecord();

    }

    /** called during recording to display volume on the volume meter */
    recordsound_volume (){

        return this.getAudioCaptureElement().getVolume();

    }

    /** called when the tickmark is chosen in the record dialog*/
    recordsound_recordclose(keep) {

		try {
			let electronDesktopInterface =  this;

			let audioCaptureElement = this.getAudioCaptureElement();

			if (keep === 'YES') {

				let blob = audioCaptureElement.captureRecordingAsBlob();
				if (blob) {
					let filename = audioCaptureElement.getId();

					let fileReader = new FileReader();
					fileReader.onload = function () {
						// saving new sound...  will save as a webm file.
						electronDesktopInterface.io_setmedianame(fileReader.result, filename, 'webm');
						electronDesktopInterface.loadSoundFromDataURI(filename + '.webm', fileReader.result);
			
					};
					fileReader.readAsDataURL(blob);
				}

			}
        } catch (e) {
    		debugLog('Error saving sound', e);
        }

    }


    recordsound_startplay (){
        if (DEBUG_AUDIO) debugLog('recordsound_recordstart');
        this.getAudioCaptureElement().startPlay();



    }
    recordsound_stopplay(){
        if (DEBUG_AUDIO) debugLog('recordsound_stopplay');
        this.getAudioCaptureElement().stopPlay();

    }


    askForPermission(){
        if (DEBUG_AUDIO) debugLog('askForPermission', name);
        return true;
    }

    hideSplash(){
    	return true;
    }

    deviceName(){
        return 'desktop';
    }

    analyticsEvent(category, action, usageLabel, value) {
        if (DEBUG_NYI) debugLog('Analytics Event!', category, action, usageLabel, value);
    }


    scratchjr_stopfeed() {
        if (DEBUG_CAMERA) debugLog('scratchjr_stopfeed NYI');
        if (this.cameraPickerDialog) {
            this.cameraPickerDialog.hide();
            this.cameraPickerDialog = null;

        }

    }
    scratchjr_choosecamera(mode) {
        if (DEBUG_CAMERA) debugLog('scratchjr_choosecamera NYI', mode);
    }

    scratchjr_captureimage(whenDone) {
        if (DEBUG_CAMERA) debugLog('scratchjr_captureimage NYI', whenDone);


        if (this.cameraPickerDialog) {
           let imgData =    this.cameraPickerDialog.snapshot();
           if (imgData) {
                let base64resultNoDataPrefix = imgData.split(',')[1];

                Camera.processimage(base64resultNoDataPrefix); // eslint-disable-line no-undef
           }


        }

    }

    scratchjr_cameracheck(...args) {
        if (DEBUG_CAMERA || DEBUG_NYI) debugLog('scratchjr_cameracheck', args);

        return true;
    }
    scratchjr_startfeed(str) {
        if (DEBUG_CAMERA) debugLog('scratchjr_startfeed', str);
        let data = JSON.parse(str);

        if (!this.cameraPickerDialog) {

            this.cameraPickerDialog = new CameraPickerDialog(data);
            this.cameraPickerDialog.show();

        }




    }




} // class ElectronDesktopInterface


window.tablet = new ElectronDesktopInterface();

function loadSettings (settingsRoot, whenDone) {
    IO.requestFromServer(settingsRoot + 'settings.json', (result) => {
        window.Settings = {
            "edition": "free",
            "scratchJrVersion": "iOSv01",
            "useStoryStarters": false,
            "shareEnabled": true,
            "defaultSprite": "Star.svg",
            "spriteOutlineColor": "white",
            "stageColor": "#F5F2F7",
            "textSpriteFont": "Helvetica",
            "blockArgFont": "Verdana",
            "paletteBalloonFont": "Roboto",
            "categoryStartColor": "#FFE75A",
            "categoryMotionColor": "#4B8CC2",
            "categoryLooksColor": "#CD7CD1",
            "categorySoundColor": "#48CC7E",
            "categoryFlowColor": "#FFBE57",
            "categoryStopColor": "#D62222",
            "paletteBlockShadowOpacity": 0.8,
            "autoSaveInterval": 30000,
            "defaultLocale": "en",
            "defaultLocaleShort": "en",
            "supportedLocales": {
                "Català": "ca",
                "Cymraeg": "cy",
                "Dansk": "da",
                "Deutsch": "de",
                "English": "en",
                "简体中文": "zh-cn",
                "繁體中文": "zh-tw"
            },
            "settingsPageDisabled": false
        };
        whenDone();
    });
}

// App-wide entry-point
window.onload = () => {
    // Function to be called after settings, locale strings, and Media Lib
    // are asynchronously loaded. This is overwritten per HTML page below.
    let entryFunction = () => {};

    // Root directory for includes. Needed in case we are in the inapp-help
    // directory (and root becomes '../')
    let root = './';

    // scratchJrPage is defined in the HTML pages
    let page = window.scratchJrPage;

    // Load CSS and set root/entryFunction for all pages
    switch (page) {
    case 'index':
        // Index page (splash screen)
        preprocessAndLoadCss('css', 'css/font.css');
        preprocessAndLoadCss('css', 'css/base.css');
        preprocessAndLoadCss('css', 'css/start.css');
        preprocessAndLoadCss('css', 'css/thumbs.css');
        /* For parental gate. These CSS properties should be refactored */
        preprocessAndLoadCss('css', 'css/editor.css');
        entryFunction = () => iOS.waitForInterface(indexMain);
        break;
    case 'home':
        // Lobby pages
        preprocessAndLoadCss('css', 'css/font.css');
        preprocessAndLoadCss('css', 'css/base.css');
        preprocessAndLoadCss('css', 'css/lobby.css');
        preprocessAndLoadCss('css', 'css/thumbs.css');
        entryFunction = () => iOS.waitForInterface(homeMain);
        break;
    case 'editor':
        // Editor pages
        preprocessAndLoadCss('css', 'css/font.css');
        preprocessAndLoadCss('css', 'css/base.css');
        preprocessAndLoadCss('css', 'css/editor.css');
        preprocessAndLoadCss('css', 'css/editorleftpanel.css');
        preprocessAndLoadCss('css', 'css/editorstage.css');
        preprocessAndLoadCss('css', 'css/editormodal.css');
        preprocessAndLoadCss('css', 'css/librarymodal.css');
        preprocessAndLoadCss('css', 'css/paintlook.css');
        entryFunction = () => iOS.waitForInterface(editorMain);
        break;
    case 'gettingStarted':
        // Getting started video page
        preprocessAndLoadCss('css', 'css/font.css');
        preprocessAndLoadCss('css', 'css/base.css');
        preprocessAndLoadCss('css', 'css/gs.css');
        entryFunction = () => iOS.waitForInterface(gettingStartedMain);
        break;
    case 'inappAbout':
        // About ScratchJr in-app help frame
        preprocessAndLoadCss('style', 'style/about.css');
        entryFunction = () => inappAbout();
        root = '../';
        break;
    case 'inappInterfaceGuide':
        // Interface guide in-app help frame
        preprocessAndLoadCss('style', 'style/style.css');
        preprocessAndLoadCss('style', 'style/interface.css');
        entryFunction = () => inappInterfaceGuide();
        root = '../';
        break;
    case 'inappPaintEditorGuide':
        // Paint editor guide in-app help frame
        preprocessAndLoadCss('style', 'style/style.css');
        preprocessAndLoadCss('style', 'style/paint.css');
        entryFunction = () => inappPaintEditorGuide();
        root = '../';
        break;
    case 'inappBlocksGuide':
        // Blocks guide in-app help frame
        preprocessAndLoadCss('style', 'style/style.css');
        preprocessAndLoadCss('style', 'style/blocks.css');
        entryFunction = () => inappBlocksGuide();
        root = '../';
        break;
    }

    // Start up sequence
    // Load settings from JSON
    loadSettings(root, () => {
        // Load locale strings from JSON
        Localization.includeLocales(root, () => {
            // Load Media Lib from JSON
            MediaLib.loadMediaLib(root, () => {
                entryFunction();
            });
        });
        // Initialize currentUsage data
        AppUsage.initUsage();
    });
};
