import { Y_TERRENO, terreni} from "./livello.js";

const X_ANGELO = 150;
const L_ANGELO = 191.7;
const A_ANGELO = 200;

const VEL_SALTO = 1000;
const TASTO_SALTO = PP.key_codes.SPACE;
const VEL_CORSA = 375;

const TASTO_SX = PP.key_codes.LEFT;
const TASTO_DX = PP.key_codes.RIGHT;

export let angelo;
let img_angelo;
let animazione;

export function carica_angelo(s) {
    img_angelo = PP.assets.sprite.load_spritesheet(s, 
    "assets/images/sprite_angelo.png", L_ANGELO, A_ANGELO);
    
}

export function crea_angelo(s, x, y) {
    animazione = " ";
    angelo = PP.assets.sprite.add(s, img_angelo, x, y - A_ANGELO / 2, 0.5, 0.5);
    PP.physics.add(s, angelo, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(angelo, true);
    for (let i = 0; i < terreni.length; i++) {
    PP.physics.add_collider(s, angelo, terreni[i]);}
    PP.assets.sprite.animation_add(angelo, "fermo", 5, 5, 1, 0);
    PP.assets.sprite.animation_add(angelo, "corsa", 1, 11, 12, -1);
    PP.assets.sprite.animation_add(angelo, "salto", 12, 23, 12, -1);
    PP.physics.set_collision_rectangle(angelo, 100, 150, 55, 40);
    }

function anima_angelo() {
let nuova = "fermo";
if (!PP.physics.is_on_ground(angelo)) {
nuova = "salto";
} else if (PP.physics.get_velocity_x(angelo) !== 0) {
nuova = "corsa";
}
if (nuova !== animazione) {
animazione = nuova;
PP.assets.sprite.animation_play(angelo, animazione);
}
}

export function muovi_angelo(s) {
    cammina(s);
    salta(s);
    anima_angelo(s);
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
        angelo.geometry.flip_x = true;
    } else if (PP.interactive.kb.is_key_down(s, TASTO_DX)) {
        PP.physics.set_velocity_x(angelo, VEL_CORSA);
        angelo.geometry.flip_x = false;
    } else {
        PP.physics.set_velocity_x(angelo, 0);
    }
}
