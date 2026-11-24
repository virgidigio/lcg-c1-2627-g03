import { angelo, } from "./angelo.js";

export const Y_TERRENO = 2570;
const L_LIVELLO = 16000;
const A_TERRENO = 500;

const A_LIVELLO = 2800;
const ANTICIPO_CAMERA = 200;

export let terreni;


let erba_deco;
let img_erba_deco;

let mappa;
let img_mappa;



export function carica_livello(s) {
    img_mappa = PP.assets.image.load(s,
        "assets/images/mappaPlatform.png");
    img_erba_deco = PP.assets.image.load(s,
        "assets/images/erbetta.png");
}
export function crea_mappa(s) {
    mappa = PP.assets.image.add(s, img_mappa, 0, 0, 0, 0);
}

export function crea_terreno(s, img, x_terreno, l_terreno, alzate, spessori) {
    terreni = [];

    for (let i = 0; i < x_terreno.length; i++) {
        let y = Y_TERRENO - alzate[i];
        let altezza = (spessori && spessori[i]) ? spessori[i] : (A_LIVELLO - y);
        let t = PP.assets.tilesprite.add(s, img, x_terreno[i], y, l_terreno[i], altezza, 0, 0);

        t.visibility.alpha = 0.5;
        PP.physics.add(s, t, PP.physics.type.STATIC);
        terreni.push(t);
    }
}

export function crea_erba_deco(s) {
    erba_deco = PP.assets.tilesprite.add(s, img_erba_deco, 0, Y_TERRENO - 21, L_LIVELLO, A_TERRENO, 0, 0);
}

export function crea_camera(s) {
    PP.physics.set_world_bounds(s, 0, 0, L_LIVELLO, A_LIVELLO);
    PP.camera.set_bounds(s, 0, 0, L_LIVELLO, A_LIVELLO);
    PP.camera.start_follow(s, angelo, - ANTICIPO_CAMERA, 0);
}