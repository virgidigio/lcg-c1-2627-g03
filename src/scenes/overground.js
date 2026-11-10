import { angelo, carica_angelo, crea_angelo, muovi_angelo } 
from "../angelo.js";
import { carica_livello, crea_mappa, crea_terreno, crea_erba_deco, crea_camera }
from "../livello.js";
import { crea_rami }
from "../rami.js";

function preload(s) {
    carica_angelo(s);
    carica_livello(s);
}

function create(s) {
    crea_mappa(s);
    crea_terreno(s);
    crea_angelo(s);
    crea_rami(s, angelo, [350, 600, 850], [2325, 2225, 2125]);
    crea_erba_deco(s);
    crea_camera(s);
}

function update(s) { 
    muovi_angelo(s);
}

function destroy(s) {

}

PP.scenes.add("overground", preload, create, update, destroy);