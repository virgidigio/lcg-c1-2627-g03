const A_GERMOGLIO = 110;
const A_LAMPIONE = 200;

let img_spento;
let img_acceso;
let germogli;
let x_ripartenza;
let y_ripartenza;

export function carica_checkpoint(s) {
    img_spento = PP.assets.image.load(s, "assets/images/check_1.png");
    img_acceso = PP.assets.image.load(s, "assets/images/check_2.png");
}

export function crea_checkpoint(s, lista, x_partenza, y_partenza) {
    germogli = [];
    x_ripartenza = x_partenza;
    y_ripartenza = y_partenza;

    for (let i = 0; i < lista.length; i++) {
        let x = lista[i][0];
        let y = lista[i][1];

        let lampione = PP.assets.image.add(s, img_acceso, x, y, 0.5, 1);
        let scala = A_LAMPIONE / lampione.geometry.display_height;
        lampione.geometry.scale_x = scala;
        lampione.geometry.scale_y = scala;
        lampione.visibility.hidden = true;

        let germoglio = PP.assets.image.add(s, img_spento, x, y, 0.5, 1);
        scala = A_GERMOGLIO / germoglio.geometry.display_height;
        germoglio.geometry.scale_x = scala;
        germoglio.geometry.scale_y = scala;

        germoglio.lampione = lampione;
        germoglio.acceso = false;
        germoglio.x_punto = x;
        germoglio.y_punto = y;

        PP.physics.add(s, germoglio, PP.physics.type.STATIC);
        germogli.push(germoglio);
    }
}

export function collega_checkpoint(s, angelo) {
    for (let i = 0; i < germogli.length; i++) {
        PP.physics.add_overlap_f(s, angelo, germogli[i], accendi);
    }
}

function accendi(s, angelo, germoglio) {
    if (germoglio.acceso) {
        return;
    }
    germoglio.acceso = true;
    germoglio.visibility.hidden = true;
    germoglio.lampione.visibility.hidden = false;

    x_ripartenza = germoglio.x_punto;
    y_ripartenza = germoglio.y_punto;
}

export function riporta_al_checkpoint(angelo) {
    angelo.geometry.x = x_ripartenza;
    angelo.geometry.y = y_ripartenza - 100;
    PP.physics.set_velocity_x(angelo, 0);
    PP.physics.set_velocity_y(angelo, 0);
}
