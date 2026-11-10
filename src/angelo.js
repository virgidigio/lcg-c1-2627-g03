import { Y_TERRENO, terreno} from "../src/livello.js";

const X_ANGELO = 150;
const L_ANGELO = 125;
const A_ANGELO = 150;

const VEL_SALTO = 1000;
const TASTO_SALTO = PP.key_codes.SPACE;
const VEL_CORSA = 375;

const TASTO_SX = PP.key_codes.LEFT;
const TASTO_DX = PP.key_codes.RIGHT;

export let angelo;
let img_angelo;

export function carica_angelo(s) {
    img_angelo = PP.assets.image.load(s,
        "assets/images/placeholderViandante.png");
}

export function crea_angelo(s) {
    angelo = PP.assets.image.add(s, img_angelo, X_ANGELO, Y_TERRENO - A_ANGELO / 2, 0.5, 0.5);
    PP.physics.add(s, angelo, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(angelo, true);
    PP.physics.add_collider(s, angelo, terreno);
}

export function muovi_angelo(s) {
    cammina(s);
    salta(s);
}

function salta(s) {
    if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO)
    && PP.physics.is_on_ground(angelo)) {
        PP.physics.set_velocity_y(angelo, -VEL_SALTO);
    }
}

function cammina(s) { 
    if (PP.interactive.kb.is_key_down(s, TASTO_SX)) {
        PP.physics.set_velocity_x(angelo, -VEL_CORSA);
    } else if (PP.interactive.kb.is_key_down(s, TASTO_DX)) {
        PP.physics.set_velocity_x(angelo, VEL_CORSA);
    } else {
        PP.physics.set_velocity_x(angelo, 0);
    }
}
