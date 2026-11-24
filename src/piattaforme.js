const L_MATTONE = 150;
const EXTRA_HITBOX = 5;

const TEMPO_CREPA = 250;
const TEMPO_ROTTURA = 600;
const TEMPO_SPARIZIONE = 1200;
const TEMPO_RICOMPARSA = 3000;

let img_platform;

export function carica_piattaforme(s) {
    img_platform = PP.assets.image.load(s, "assets/images/platform A.PNG");
}

export function crea_piattaforme(s, angelo, piattaforme) {
    for (let i = 0; i < piattaforme.length; i++) {
        let x = piattaforme[i][0];
        let y = piattaforme[i][1];
        let l = piattaforme[i][2];
        let a = piattaforme[i][3];
        let fragile = piattaforme[i][4];

        let n = Math.round(l / L_MATTONE);
        if (a > 35) {
            n = 1;
        }
        let l_mattone = l / n;

        let immagini = [];
        for (let j = 0; j < n; j++) {
            let img = PP.assets.image.add(s, img_platform, x + j * l_mattone, y, 0, 0);
            img.geometry.scale_x = l_mattone / img.geometry.display_width;
            img.geometry.scale_y = a / img.geometry.display_height;
            immagini.push(img);
        }

        let hitbox = PP.shapes.rectangle_add(s, x + l / 2, y + a / 2,
            l + 2 * EXTRA_HITBOX, a, "0x7A3CF0", 0);
        PP.physics.add(s, hitbox, PP.physics.type.STATIC);
        hitbox.ph_obj.body.checkCollision.down = false;
        hitbox.ph_obj.body.checkCollision.left = false;
        hitbox.ph_obj.body.checkCollision.right = false;

        hitbox.immagini = immagini;
        hitbox.y_sopra = y;
        hitbox.calpestata = false;

        if (fragile) {
            PP.physics.add_collider_f(s, angelo, hitbox, tocca_piattaforma);
        } else {
            PP.physics.add_collider(s, angelo, hitbox);
        }
    }
}

function trasparenza(p, valore) {
    for (let i = 0; i < p.immagini.length; i++) {
        p.immagini[i].visibility.alpha = valore;
    }
}

function tocca_piattaforma(s, angelo, p) {
    if (p.calpestata) {
        return;
    }
    let piedi = angelo.geometry.body_y + 150;
    if (piedi > p.y_sopra + 2) {
        return;
    }
    p.calpestata = true;
    trasparenza(p, 0.7);
    PP.timers.add_timer(s, TEMPO_CREPA, function (s) {
        trasparenza(p, 0.4);
    }, false);
    PP.timers.add_timer(s, TEMPO_ROTTURA, function (s) {
        sgretola(s, p);
    }, false);
}

function sgretola(s, p) {
    p.ph_obj.body.enable = false;
    trasparenza(p, 0);

    for (let i = 0; i < p.immagini.length; i++) {
        let img = p.immagini[i];
        let pezzo = PP.assets.image.add(s, img_platform, img.geometry.x, img.geometry.y, 0, 0);
        pezzo.geometry.scale_x = img.geometry.scale_x;
        pezzo.geometry.scale_y = img.geometry.scale_y;
        pezzo.visibility.alpha = 0.5;
        PP.physics.add(s, pezzo, PP.physics.type.DYNAMIC);
        PP.timers.add_timer(s, TEMPO_SPARIZIONE, function (s) {
            PP.assets.destroy(pezzo);
        }, false);
    }

    PP.timers.add_timer(s, TEMPO_RICOMPARSA, function (s) {
        p.ph_obj.body.enable = true;
        trasparenza(p, 1);
        p.calpestata = false;
    }, false);
}