const LARGHEZZA_RAMO = 160;
const ALTEZZA_RAMO = 20;
const MARRONE = "0x8B5A2B";

const TEMPO_CREPA = 700;        
const TEMPO_ROTTURA = 1500;     
const TEMPO_SPARIZIONE = 2000;  

export function crea_rami(s, protagonista, x_rami, y_rami) {
  for (let i = 0; i < x_rami.length; i++) {
    let r = PP.shapes.rectangle_add(s, x_rami[i], y_rami[i],
      LARGHEZZA_RAMO, ALTEZZA_RAMO, MARRONE, 1);
    PP.physics.add(s, r, PP.physics.type.STATIC);
    r.calpestato = false;
    PP.physics.add_collider_f(s, protagonista, r, tocca_ramo);
  }
}

function tocca_ramo(s, p, r) {
  if (r.calpestato) {
    return;
  }
  if (!PP.physics.is_on_ground(p) || p.geometry.y > r.geometry.y) {
    return;
  }
  r.calpestato = true;
  r.visibility.alpha = 0.7;
  PP.timers.add_timer(s, TEMPO_CREPA, function (s) {
    r.visibility.alpha = 0.4;
  }, false);
  PP.timers.add_timer(s, TEMPO_ROTTURA, function (s) {
    spezza_ramo(s, r);
  }, false);
}

export function crea_rami_a_tempo(s, protagonista, x_rami, y_rami, secondi) {
  for (let i = 0; i < x_rami.length; i++) {
    let r = PP.shapes.rectangle_add(s, x_rami[i], y_rami[i],
      LARGHEZZA_RAMO, ALTEZZA_RAMO, MARRONE, 1);
    PP.physics.add(s, r, PP.physics.type.STATIC);
    PP.physics.add_collider(s, protagonista, r);
    // 3 secondi prima di spezzarsi il ramo inizia a crepare
    PP.timers.add_timer(s, (secondi - 3) * 1000, function (s) {
      r.visibility.alpha = 0.5;
    }, false);
    PP.timers.add_timer(s, secondi * 1000, function (s) {
      spezza_ramo(s, r);
    }, false);
  }
}

function spezza_ramo(s, r) {
  let x = r.geometry.x;
  let y = r.geometry.y;
  PP.shapes.destroy(r);

  let pezzo = PP.shapes.rectangle_add(s, x, y,
    LARGHEZZA_RAMO, ALTEZZA_RAMO, MARRONE, 0.4);
  PP.physics.add(s, pezzo, PP.physics.type.DYNAMIC);
  PP.timers.add_timer(s, TEMPO_SPARIZIONE, function (s) {
    PP.shapes.destroy(pezzo);
  }, false);
}
