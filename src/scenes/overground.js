import { angelo, carica_angelo, crea_angelo, muovi_angelo } 
from "../angelo.js";
import { Y_TERRENO, carica_livello, crea_mappa, crea_terreno, crea_erba_deco, crea_camera }
from "../livello.js";
import { crea_rami }
from "../rami.js";

const X_TERRENO = [0, 0, 0, 2075, 2710, 2956, 3286, 3436, 3436, 4119, 4365, 5120, 6240, 7180, 7644, 7780];
const L_TERRENO = [16000, 2075, 2396, 246, 246, 330, 150, 929, 136, 246, 2974, 136, 1164, 763, 136, 163];
const ALZATE = [0, 311, 501, 90, 90, 260, 526, 163, 291, 253, 526, 654, 654, 914, 1042, 1984];   
const SPESSORI =[0, 311, 190, 90, 90, 260, 526, 163, 128, 90, 526, 128, 128, 260, 128, 1070]; 

let img_terreno;

function preload(s) {
    carica_angelo(s);
    carica_livello(s);
    img_terreno = PP.assets.image.load(s, "assets/images/placeholderTerreno.png");
}

function create(s) {
    crea_mappa(s);
    crea_terreno(s, img_terreno, X_TERRENO, L_TERRENO, ALZATE, SPESSORI);
    crea_angelo(s, 150, Y_TERRENO - ALZATE[2]);
    crea_rami(s, angelo, [350, 600, 850, 1100, 1350, 1600], [2325, 2225, 2125, 2225, 2325, 2125]);
    crea_erba_deco(s);
    crea_camera(s);
}

function update(s) { 
    muovi_angelo(s);
}

function destroy(s) {

}

PP.scenes.add("overground", preload, create, update, destroy);