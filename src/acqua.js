import { mostra_timer, nascondi_timer } from "./inventario.js";

const VEL_AFFONDA = 120;
const VEL_NUOTO_SU = 300;
const VEL_NUOTO_GIU = 500;
const RIDUZIONE_CAMMINA = 0.6;
const VEL_SALTO_ACQUA = 1000;

const TEMPO_ARIA = 10000;
const TEMPO_MESSAGGIO = 1500;

const TASTO_SU = PP.key_codes.UP;
const TASTO_GIU = PP.key_codes.DOWN;
const TASTO_SALTO = PP.key_codes.SPACE;

let zone;
let x_riva;
let y_riva;
let in_acqua;
let salto_in_corso;
let aria_piena;
let inizio_aria;
let testo_messaggio;

export function crea_acqua(s, zone_acqua, x, y) {
    zone = zone_acqua;
    x_riva = x;
    y_riva = y;
    in_acqua = false;
    salto_in_corso = false;
    aria_piena = true;

    for (let i = 0; i < zone.length; i++) {
        let x = zone[i][0];
        let y = zone[i][1];
        let l = zone[i][2];
        let a = zone[i][3];
        PP.shapes.rectangle_add(s, x + l / 2, y + a / 2, l, a, "0x2E8FC7", 0.25);
    }
}

export function crea_testi_acqua(s) {
    testo_messaggio = PP.shapes.text_styled_add(s, 640, 300, "",
        48, "Arial", "bold", "0x000000", null, 0.5, 0.5);
    testo_messaggio.ph_obj.setScrollFactor(0);
}

function trova_zona(angelo) {
    let centro = angelo.geometry.body_x + 40;
    let piedi = angelo.geometry.body_y + 150;

    for (let i = 0; i < zone.length; i++) {
        let x = zone[i][0];
        let y = zone[i][1];
        let l = zone[i][2];
        let a = zone[i][3];
        if (centro > x && centro < x + l && piedi > y + 20 && piedi <= y + a + 5) {
            return i;
        }
    }
    return -1;
}

export function aggiorna_acqua(s, angelo) {
    let z = trova_zona(angelo);

    if (salto_in_corso) {
        if (PP.physics.get_velocity_y(angelo) < 0) {
            return;
        }
        salto_in_corso = false;
    }

    if (z === -1) {
        if (in_acqua) {
            esci_acqua(angelo);
        }
        if (PP.physics.is_on_ground(angelo)) {
            aria_piena = true;
        }
        return;
    }

    if (!in_acqua) {
        entra_acqua(s, angelo);
    }

    PP.physics.set_velocity_x(angelo, PP.physics.get_velocity_x(angelo) * RIDUZIONE_CAMMINA);

    let piedi = angelo.geometry.body_y + 150;
    let superficie = zone[z][1];

    if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO) && piedi < superficie + 60) {
        PP.physics.set_allow_gravity(angelo, true);
        PP.physics.set_velocity_y(angelo, -VEL_SALTO_ACQUA);
        salto_in_corso = true;
        return;
    }

    if (PP.interactive.kb.is_key_down(s, TASTO_SU)) {
        if (piedi < superficie + 30) {
            PP.physics.set_velocity_y(angelo, 0);
        } else {
            PP.physics.set_velocity_y(angelo, -VEL_NUOTO_SU);
        }
    } else if (PP.interactive.kb.is_key_down(s, TASTO_GIU)) {
        PP.physics.set_velocity_y(angelo, VEL_NUOTO_GIU);
    } else {
        PP.physics.set_velocity_y(angelo, VEL_AFFONDA);
    }

    let passato = PP.timers.get_time(s) - inizio_aria;
    let secondi = 10;
    if (passato > 1000) { secondi = 9; }
    if (passato > 2000) { secondi = 8; }
    if (passato > 3000) { secondi = 7; }
    if (passato > 4000) { secondi = 6; }
    if (passato > 5000) { secondi = 5; }
    if (passato > 6000) { secondi = 4; }
    if (passato > 7000) { secondi = 3; }
    if (passato > 8000) { secondi = 2; }
    if (passato > 9000) { secondi = 1; }
    mostra_timer("Aria  " + secondi + " s");

    if (passato >= TEMPO_ARIA) {
        annega(s, angelo);
    }
}

function entra_acqua(s, angelo) {
    in_acqua = true;
    if (aria_piena) {
        inizio_aria = PP.timers.get_time(s);
        aria_piena = false;
    }
    PP.physics.set_allow_gravity(angelo, false);
}

function esci_acqua(angelo) {
    in_acqua = false;
    PP.physics.set_allow_gravity(angelo, true);
    nascondi_timer();
}

function annega(s, angelo) {
    esci_acqua(angelo);
    aria_piena = true;
    torna_a_riva(angelo);

    PP.shapes.text_change(testo_messaggio, "Sei annegato");
    PP.timers.add_timer(s, TEMPO_MESSAGGIO, function (s) {
        PP.shapes.text_change(testo_messaggio, "");
    }, false);
}

function torna_a_riva(angelo) {
    angelo.geometry.x = x_riva;
    angelo.geometry.y = y_riva - 100;
    PP.physics.set_velocity_x(angelo, 0);
    PP.physics.set_velocity_y(angelo, 0);
}