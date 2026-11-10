import { angelo, } from "./angelo.js";

export const Y_TERRENO = 2550;
const A_TERRENO = 266;

const L_LIVELLO = 16000;
const A_LIVELLO = 2800;
const ANTICIPO_CAMERA = 200;

export let terreno;
let img_terreno;

let erba_deco;
let img_erba_deco;

let mappa;
let img_mappa;



export function carica_livello(s) {
    img_terreno = PP.assets.image.load(s,
        "assets/images/placeholderTerreno.png");
    img_erba_deco = PP.assets.image.load(s,
        "assets/images/erbetta.png");
    img_mappa = PP.assets.image.load(s,
        "assets/images/mappaPlatform.png");
}
export function crea_mappa(s) {
    mappa = PP.assets.image.add(s, img_mappa, 0, 0, 0, 0);
}

export function crea_terreno(s) {
     terreno = PP.assets.tilesprite.add(s, img_terreno, 0, Y_TERRENO, L_LIVELLO, A_TERRENO, 0, 0); 
     PP.physics.add(s, terreno, PP.physics.type.STATIC);
}

export function crea_erba_deco(s) {
    erba_deco = PP.assets.tilesprite.add(s, img_erba_deco, 0, Y_TERRENO - 21, L_LIVELLO, A_TERRENO, 0, 0);
}

export function crea_camera(s) {
    PP.physics.set_world_bounds(s, 0, 0, L_LIVELLO, A_LIVELLO);
    PP.camera.set_bounds(s, 0, 0, L_LIVELLO, A_LIVELLO);
    PP.camera.start_follow(s, angelo, - ANTICIPO_CAMERA, 0);
}


