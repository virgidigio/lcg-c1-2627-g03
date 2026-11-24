import { Y_TERRENO, terreni} from "./livello.js";

const X_ANGELO = 150;
const L_ANGELO = 191.7;
const A_ANGELO = 200;

const L_HITBOX = 80;
const A_HITBOX = 150;
const X_HITBOX = 73;
const Y_HITBOX = 40;

const VEL_SALTO = 1000;
const VEL_DOPPIO_SALTO = 800;
const TASTO_SALTO = PP.key_codes.SPACE;
const VEL_CORSA = 375;

const TASTO_SX = PP.key_codes.LEFT;
const TASTO_DX = PP.key_codes.RIGHT;

export let angelo;
let img_angelo;
let animazione;
let doppio_salto_disponibile;

export function carica_angelo(s) {
    img_angelo = PP.assets.sprite.load_spritesheet(s, 
    "assets/images/sprite_angelo.png", L_ANGELO, A_ANGELO);
    
}

export function crea_angelo(s, x, y) {
    animazione = " ";
    doppio_salto_disponibile = true;
    angelo = PP.assets.sprite.add(s, img_angelo, x, y - A_ANGELO / 2, 0.5, 0.5);
    PP.physics.add(s, angelo, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(angelo, true);
    for (let i = 0; i < terreni.length; i++) {
    PP.physics.add_collider(s, angelo, terreni[i]);}
    PP.assets.sprite.animation_add(angelo, "fermo", 5, 5, 1, 0);
    PP.assets.sprite.animation_add(angelo, "corsa", 1, 11, 12, -1);
    PP.assets.sprite.animation_add(angelo, "salto", 12, 23, 12, -1);
    PP.physics.set_collision_rectangle(angelo, L_HITBOX, A_HITBOX, X_HITBOX, Y_HITBOX);
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
    if (PP.physics.is_on_ground(angelo)) {
        doppio_salto_disponibile = true;
    }

    if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO)) {
        if (PP.physics.is_on_ground(angelo)) {
            PP.physics.set_velocity_y(angelo, -VEL_SALTO);
        } else if (doppio_salto_disponibile) {
            PP.physics.set_velocity_y(angelo, -VEL_DOPPIO_SALTO);
            doppio_salto_disponibile = false;
        }
    }
}

function cammina(s) { 
    if (PP.interactive.kb.is_key_down(s, TASTO_SX)) {
        PP.physics.set_velocity_x(angelo, -VEL_CORSA);
        angelo.geometry.flip_x = true;
        PP.physics.set_collision_offset(angelo, L_ANGELO - L_HITBOX - X_HITBOX, Y_HITBOX);
    } else if (PP.interactive.kb.is_key_down(s, TASTO_DX)) {
        PP.physics.set_velocity_x(angelo, VEL_CORSA);
        angelo.geometry.flip_x = false;
        PP.physics.set_collision_offset(angelo, X_HITBOX, Y_HITBOX);
    } else {
        PP.physics.set_velocity_x(angelo, 0);
    }
}