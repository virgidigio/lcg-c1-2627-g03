const L_CASELLA = 76;
const SPAZIO = 10;
const X_INIZIO = 20;
const Y_INIZIO = 20;

const A_ICONA = 58;
const A_ICONA_POMODORO = 330;

const L_TIMER = 200;
const X_TIMER = 1280 - 20 - L_TIMER;

let icone;
let caselle;
let box_timer;
let testo_timer;

export function carica_inventario(s, lista) {
    icone = [];
    for (let i = 0; i < lista.length; i++) {
        icone.push(PP.assets.image.load(s, "assets/images/" + lista[i][1]));
    }
}

export function crea_inventario(s, lista) {
    caselle = [];

    let l_pannello = lista.length * (L_CASELLA + SPAZIO) + SPAZIO;
    let pannello = PP.shapes.rectangle_add(s, X_INIZIO - SPAZIO + l_pannello / 2,
        Y_INIZIO + L_CASELLA / 2, l_pannello, L_CASELLA + 2 * SPAZIO, "0x000000", 0.3);
    pannello.ph_obj.setScrollFactor(0);

    for (let i = 0; i < lista.length; i++) {
        let x = X_INIZIO + i * (L_CASELLA + SPAZIO) + L_CASELLA / 2;
        let y = Y_INIZIO + L_CASELLA / 2;

        let casella = PP.shapes.rectangle_add(s, x, y, L_CASELLA, L_CASELLA, "0x000000", 0.45);
        PP.shapes.set_stroke(casella, 2, "0xFFFFFF", 0.6);
        casella.ph_obj.setScrollFactor(0);

        let icona = PP.assets.image.add(s, icone[i], x, y, 0.5, 0.5);
        let altezza = A_ICONA;
        if (lista[i][0] === "pomodoro") {
            altezza = A_ICONA_POMODORO;
        }
        let lato = icona.geometry.display_height;
        if (icona.geometry.display_width > lato) {
            lato = icona.geometry.display_width;
        }
        let scala = altezza / lato;
        icona.geometry.scale_x = scala;
        icona.geometry.scale_y = scala;
        icona.ph_obj.setScrollFactor(0);
        icona.ph_obj.setTint(0x000000);
        icona.visibility.alpha = 0.5;

        casella.icona = icona;
        caselle.push(casella);
    }

    box_timer = PP.shapes.rectangle_add(s, X_TIMER + L_TIMER / 2, Y_INIZIO + L_CASELLA / 2,
        L_TIMER, L_CASELLA, "0x000000", 0.45);
    PP.shapes.set_stroke(box_timer, 2, "0xFFFFFF", 0.6);
    box_timer.ph_obj.setScrollFactor(0);

    testo_timer = PP.shapes.text_styled_add(s, X_TIMER + L_TIMER / 2, Y_INIZIO + L_CASELLA / 2, "",
        30, "Arial", "bold", "0xFFFFFF", null, 0.5, 0.5);
    testo_timer.ph_obj.setScrollFactor(0);

    nascondi_timer();
}

export function riempi_casella(i) {
    let casella = caselle[i];
    casella.icona.ph_obj.clearTint();
    casella.icona.visibility.alpha = 1;
    PP.shapes.set_stroke(casella, 3, "0xF2D16B", 1);
}

export function mostra_timer(testo) {
    box_timer.visibility.hidden = false;
    testo_timer.visibility.hidden = false;
    PP.shapes.text_change(testo_timer, testo);
}

export function nascondi_timer() {
    box_timer.visibility.hidden = true;
    testo_timer.visibility.hidden = true;
}