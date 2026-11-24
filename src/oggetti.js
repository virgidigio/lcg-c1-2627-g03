import { riempi_casella } from "./inventario.js";

const A_PEZZO = 80;
const A_POMODORO = 420;
const DISTANZA_RACCOLTA = 100;

let immagini;
let oggetti;
let pomodoro_preso;
let pezzi_presi;

export function carica_oggetti(s, lista) {
    immagini = [];
    for (let i = 0; i < lista.length; i++) {
        immagini.push(PP.assets.image.load(s, "assets/images/" + lista[i][1]));
    }
}

export function crea_oggetti(s, lista) {
    oggetti = [];
    pomodoro_preso = false;
    pezzi_presi = 0;

    for (let i = 0; i < lista.length; i++) {
        let o = PP.assets.image.add(s, immagini[i], lista[i][2], lista[i][3], 0.5, 0.5);
        let altezza = A_PEZZO;
        if (lista[i][0] === "pomodoro") {
            altezza = A_POMODORO;
        }
        let scala = altezza / o.geometry.display_height;
        o.geometry.scale_x = scala;
        o.geometry.scale_y = scala;
        o.nome = lista[i][0];
        o.preso = false;
        oggetti.push(o);
    }
}

export function raccogli_oggetti(s, angelo) {
    for (let i = 0; i < oggetti.length; i++) {
        let o = oggetti[i];
        if (o.preso) {
            continue;
        }
        let dx = Math.abs(angelo.geometry.x - o.geometry.x);
        let dy = Math.abs(angelo.geometry.y - o.geometry.y);
        if (dx < DISTANZA_RACCOLTA && dy < DISTANZA_RACCOLTA) {
            o.preso = true;
            PP.assets.destroy(o);
            if (o.nome === "pomodoro") {
                pomodoro_preso = true;
            } else {
                pezzi_presi = pezzi_presi + 1;
            }
            PP.game_state.set_variable("pomodoro", pomodoro_preso);
            PP.game_state.set_variable("pezzi", pezzi_presi);
            riempi_casella(i);
        }
    }
}
