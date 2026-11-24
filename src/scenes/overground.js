import { angelo, carica_angelo, crea_angelo, muovi_angelo } 
from "../angelo.js";
import { carica_livello, crea_mappa, crea_terreno, crea_erba_deco, crea_camera }
from "../livello.js";
import { carica_piattaforme, crea_piattaforme }
from "../piattaforme.js";
import { carica_oggetti, crea_oggetti, raccogli_oggetti }
from "../oggetti.js";
import { crea_acqua, crea_testi_acqua, aggiorna_acqua }
from "../acqua.js";
import { carica_checkpoint, crea_checkpoint, collega_checkpoint }
from "../checkpoint.js";
import { carica_inventario, crea_inventario }
from "../inventario.js";

const X_TERRENO = [0, 0, 0, 2075, 2710, 2956, 3286, 3436, 3436, 4119, 4365, 5120, 6240, 7180, 7644, 7780, 0, 6034, 7339, 7943, 7943, 7955, 8067, 8202, 8203, 8311, 8445, 8599, 8718, 8874, 9290, 9316, 9382, 9382, 9445, 9964, 10013, 10489, 10637, 10807, 10807, 11637, 12099, 12231, 12964, 15397, 15561];
const L_TERRENO = [16000, 2075, 2396, 246, 246, 330, 150, 929, 136, 246, 2974, 136, 1164, 763, 136, 163, 200, 136, 862, 255, 136, 763, 136, 136, 163, 566, 566, 855, 4992, 442, 1347, 442, 273, 1107, 566, 214, 442, 3256, 2916, 519, 1422, 592, 1347, 136, 442, 163, 439];
const ALZATE = [0, 311, 501, 90, 90, 260, 526, 163, 291, 253, 526, 654, 654, 914, 1042, 1984, 2233, 2124, 257, 1984, 1454, 2569, 489, 1984, 1014, 1326, 1807, 526, 2569, 1139, 2092, 1042, 125, 90, 710, 125, 1326, 125, 2092, 330, 291, 330, 1777, 253, 601, 2569, 2569];
const SPESSORI = [0, 311, 190, 90, 90, 260, 526, 163, 128, 90, 526, 128, 128, 260, 128, 1070, 1732, 128, 260, 527, 128, 260, 232, 128, 1014, 315, 315, 128, 477, 232, 765, 128, 36, 88, 315, 36, 837, 124, 313, 36, 168, 36, 1175, 128, 232, 1014, 2571];

const PIATTAFORME = [
    [878, 1868, 150, 35, false],
    [1130, 1709, 300, 35, false],
    [1366, 1921, 300, 35, false],
    [1502, 1585, 300, 35, false],
    [2246, 1643, 150, 35, false],
    [2246, 2261, 300, 35, false],
    [2506, 1400, 424, 65, false],
    [2506, 1736, 424, 65, false],
    [2546, 2049, 600, 35, false],
    [2996, 1942, 150, 35, false],
    [3074, 1278, 150, 35, true],
    [3307, 1162, 150, 35, true],
    [3592, 2049, 600, 35, false],
    [3681, 1097, 424, 65, false],
    [3681, 1436, 424, 65, false],
    [3681, 1770, 424, 65, false],
    [4773, 904, 150, 35, true],
    [4847, 1526, 150, 35, false],
    [4882, 1028, 450, 35, false],
    [4968, 1616, 300, 35, false],
    [5065, 786, 300, 35, true],
    [5107, 1396, 300, 35, false],
    [5141, 1101, 300, 35, false],
    [5441, 1803, 150, 35, false],
    [5515, 654, 150, 35, true],
    [5515, 1299, 150, 35, false],
    [5515, 2015, 150, 35, false],
    [5662, 883, 300, 35, false],
    [5907, 918, 150, 35, false],
    [6101, 572, 600, 35, false],
    [6118, 1028, 300, 35, false],
    [6235, 1473, 300, 35, false],
    [6527, 849, 300, 35, false],
    [6742, 746, 150, 35, true],
    [6786, 1213, 150, 35, true],
    [6933, 573, 300, 35, false],
    [7189, 538, 300, 35, false],
    [7950, 1757, 150, 35, false],
    [8363, 2314, 150, 35, false],
    [8496, 2538, 150, 35, false],
    [9013, 887, 150, 35, true],
    [9141, 1164, 150, 35, true],
    [10815, 1087, 300, 35, false],
    [11088, 2009, 150, 35, false],
    [11113, 1219, 150, 35, false],
    [11279, 1889, 300, 35, false],
    [11307, 1368, 150, 35, true],
    [11576, 1467, 150, 35, true],
    [11649, 1740, 150, 35, false],
    [11947, 1616, 150, 35, true],
    [13445, 1517, 900, 35, false],
    [13847, 904, 150, 35, true],
    [14120, 641, 150, 35, false],
    [14120, 1232, 150, 35, false],
    [14120, 1982, 300, 35, false],
    [14370, 372, 150, 35, true],
    [14521, 2179, 150, 35, false],
    [14563, 150, 150, 35, true],
    [14597, 1753, 150, 35, false],
    [14746, 2389, 150, 35, false],
    [14811, 1515, 750, 35, false]
];

const OGGETTI = [
    ["pomodoro", "pomodoro.png", 1627, 1491],
    ["pezzo 1", "pezzo 1.png", 2158, 2349],
    ["pezzo 2", "pezzo 2.png", 5585, 607],
    ["pezzo 3", "pezzo 3.png", 7611, 2193],
    ["pezzo 4", "pezzo 4.png", 10960, 1010]
];

const CHECKPOINT = [
    [4660, 2044],
    [7949, 586]
];

const ANIMALI = [
    [3979, 1099],
    [6284, 571],
    [8773, 2046],
    [15099, 1517]
];

const TRAPPOLE = [
    [9658, 2446, 303, 32],
    [10181, 2446, 305, 32],
    [11328, 2240, 305, 34],
    [13752, 2572, 303, 34],
    [14195, 2572, 305, 34]
];

const ACQUA = [
    [2396, 2069, 890, 501],
    [2075, 2259, 321, 311]
];

const X_RIVA = 2250;
const Y_RIVA = 2069;
const X_STAGNO = 2075;
const Y_STAGNO = 2069;
const L_STAGNO = 1211;
const A_STAGNO = 501;

const X_PARTENZA = 150;
const Y_PARTENZA = 2069;

let img_terreno;
let img_stagno;

function preload(s) {
    carica_angelo(s);
    carica_livello(s);
    img_terreno = PP.assets.image.load(s, "assets/images/placeholderTerreno.png");
    img_stagno = PP.assets.image.load(s, "assets/images/sfondo_stagno.png");
    carica_piattaforme(s);
    carica_oggetti(s, OGGETTI);
    carica_checkpoint(s);
    carica_inventario(s, OGGETTI);
}

function create(s) {
    crea_mappa(s);
    crea_stagno(s);
    crea_acqua(s, ACQUA, X_RIVA, Y_RIVA);
    crea_terreno(s, img_terreno, X_TERRENO, L_TERRENO, ALZATE, SPESSORI);
    crea_checkpoint(s, CHECKPOINT, X_PARTENZA, Y_PARTENZA);
    crea_angelo(s, X_PARTENZA, Y_PARTENZA);
    collega_checkpoint(s, angelo);
    crea_piattaforme(s, angelo, PIATTAFORME);
    crea_oggetti(s, OGGETTI);
    crea_erba_deco(s);
    crea_camera(s);
    crea_testi_acqua(s);
    crea_inventario(s, OGGETTI);
}

function crea_stagno(s) {
    let stagno = PP.assets.image.add(s, img_stagno, X_STAGNO, Y_STAGNO, 0, 0);
    stagno.geometry.scale_x = L_STAGNO / stagno.geometry.display_width;
    stagno.geometry.scale_y = A_STAGNO / stagno.geometry.display_height;
}

function update(s) { 
    muovi_angelo(s);
    aggiorna_acqua(s, angelo);
    raccogli_oggetti(s, angelo);
}

function destroy(s) {

}

PP.scenes.add("overground", preload, create, update, destroy);
