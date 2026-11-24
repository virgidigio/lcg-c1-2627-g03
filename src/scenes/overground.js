const TERRA = "0xB96E54";
const GIALLO = "0xFFD95A";

const A_TERRENO = 266;
const Y_TERRENO = 475;
const X_ANGELO = 150;
const L_ANGELO = 125;
const A_ANGELO = 150;

const VEL_SALTO = 1000;
const TASTO_SALTO = PP.key_codes.SPACE;
const VEL_CORSA = 375;
const TASTO_SX = PP.key_codes.LEFT;
const TASTO_DX = PP.key_codes.RIGHT;

const L_LIVELLO = 15500;
const ANTICIPO_CAMERA = 200;

let terreno;
let angelo;
let img_terreno;
let img_angelo;
let erba_deco;

function preload(s) {
    img_terreno = PP.assets.image.load(s,
        "assets/images/placeholderTerreno.png");
    img_angelo = PP.assets.image.load(s,
        "assets/images/placeholderViandante.png");
    erba_deco = PP.assets.image.load(s,
        "assets/images/erbetta.png");
}

function crea_terreno(s) {
     terreno = PP.assets.tilesprite.add(s, img_terreno, 0, Y_TERRENO, L_LIVELLO, A_TERRENO, 0, 0); 
     PP.physics.add(s, terreno, PP.physics.type.STATIC);
}

function crea_angelo(s) {
    angelo = PP.assets.image.add(s, img_angelo, X_ANGELO, Y_TERRENO - A_ANGELO / 2, 0.5, 0.5);
    PP.physics.add(s, angelo, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(angelo, true);
    PP.physics.add_collider(s, angelo, terreno);
}

function crea_erba_deco(s) {
    erba_deco = PP.assets.tilesprite.add(s, erba_deco, 0, Y_TERRENO - 21, L_LIVELLO, A_TERRENO, 0, 0);
}

function crea_camera(s) {
    PP.physics.set_world_bounds(s, 0, 0, L_LIVELLO, ALTEZZA);
    PP.camera.set_bounds(s, 0, 0, L_LIVELLO, ALTEZZA);
    PP.camera.start_follow(s, angelo, -ANTICIPO_CAMERA, 0);
}

function create(s) {
    crea_terreno(s);
    crea_angelo(s);
    crea_erba_deco(s);
    crea_camera(s);
}

function update(s) { 
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


function destroy(s) {

}

PP.scenes.add("overground", preload, create, update, destroy);