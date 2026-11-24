import { crea_rami } from "../rami.js";

const VEL_CAMMINA = 300;
const VEL_SALTO = 900;

const BLU = "0x2E6FD8";
const VERDE = "0x4CAF50";
const VERDE_PRATO = "0x5B8C3A";
const BIANCO = "0xFFFFFF";

const TASTO_DESTRA = PP.key_codes.RIGHT;
const TASTO_SINISTRA = PP.key_codes.LEFT;
const TASTO_SALTO = PP.key_codes.SPACE;
const TASTO_RICOMINCIA = PP.key_codes.R;

let protagonista;

function preload(s) {}

function create(s) {

  let terreno = PP.shapes.rectangle_add(s, LARGHEZZA / 2, ALTEZZA,
    LARGHEZZA, 80, VERDE_PRATO, 1);
  PP.physics.add(s, terreno, PP.physics.type.STATIC);
  
  let arrivo = PP.shapes.rectangle_add(s, 1120, 320, 200, 20, VERDE, 1);
  PP.physics.add(s, arrivo, PP.physics.type.STATIC);

  protagonista = PP.shapes.rectangle_add(s, 100, ALTEZZA - 100,
    40, 60, BLU, 1);
  PP.physics.add(s, protagonista, PP.physics.type.DYNAMIC);
  PP.physics.add_collider(s, protagonista, terreno);
  PP.physics.add_collider(s, protagonista, arrivo);

  crea_rami(s, protagonista, [350, 600, 850], [560, 440, 320]);

  PP.shapes.text_styled_add(s, 20, 20,
    "Frecce: muovi   Spazio: salta   R: ricomincia",
    20, "Arial", "normal", BIANCO, null, 0, 0);
}

function update(s) {

  if (PP.interactive.kb.is_key_down(s, TASTO_DESTRA)) {
    PP.physics.set_velocity_x(protagonista, VEL_CAMMINA);
  } else if (PP.interactive.kb.is_key_down(s, TASTO_SINISTRA)) {
    PP.physics.set_velocity_x(protagonista, -VEL_CAMMINA);
  } else {
    PP.physics.set_velocity_x(protagonista, 0);
  }
  
  if (PP.interactive.kb.is_key_just_down(s, TASTO_SALTO)
      && PP.physics.is_on_ground(protagonista)) {
    PP.physics.set_velocity_y(protagonista, -VEL_SALTO);
  }
  if (PP.interactive.kb.is_key_just_down(s, TASTO_RICOMINCIA)) {
    PP.scenes.start("prova_rami");
  }
}

function destroy(s) {}

PP.scenes.add("prova_rami", preload, create, update, destroy);
