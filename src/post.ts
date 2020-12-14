import display from './display'
import fs from './fpselector'
import fd from './fpdisplay'
import { importExternalFacePacks } from 'face-pack/src/FacePacksImporter'
(() => {
    display()
    importExternalFacePacks('https://cdn.jsdelivr.net/gh/YukiCat-Dev/yukicat.facepack/facepacks.json')
        .then(fp => {  fd(fp);fs(fp); })
})()
