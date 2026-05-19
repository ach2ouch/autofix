// AutoPieces.tn — Multi-photo Mercedes C 350 Plug-in Hybrid (W205) analyzer
// Accepts up to 4 photos tagged front/rear/left/right
// Returns analysis with per-view damage zones and consolidated parts list

const MERCEDES_W205_PARTS_DB = {
  "A 205 540 17 37": {
    "name": "Electrical wiring harnesscharge socket to battery chargeur",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 982 30 21": {
    "name": "Battery chargerwith charge retention function",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 982 03 21": {
    "name": "Battery chargerquick charge function 25a",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 08 00": {
    "name": "Exhaust gas turbochargerone-step the old part must no longer be installedreplaced by: a 654 090 24 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 24 00": {
    "name": "Exhaust gas turbochargerone-step first exhaust stock of old parts up to enginereplaced by: a 654 090 45 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 45 00": {
    "name": "Exhaust gas turbochargerone-step first exhaust stock of old parts up to engine part is only or also supplied as reconditioned partreplaced by: a 654 090 73 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 73 00": {
    "name": "Exhaust gas turbochargerone-step part is only or also supplied as reconditioned part",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 08 80": {
    "name": "Exhaust gas turbochargerone-step",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 02 80": {
    "name": "Exhaust gas turbochargertwo-step first exhaust stock of old parts up to enginereplaced by: a 654 090 04 80",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 090 04 80": {
    "name": "Exhaust gas turbochargertwo-step",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 098 00 00": {
    "name": "Charged air lineexhaust gas turbocompresseur to charge air cooler",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 098 00 39": {
    "name": "Bracketcharging air line to exhaust gas turbocompresseur first exhaust stock of old parts up to enginereplaced by: a 654 141 10 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 141 10 00": {
    "name": "Bracketcharging air line to exhaust gas turbocompresseur",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 142 08 80": {
    "name": "Metal, soft-mat., sealexhaust manifold to turbocompresseur",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 995 60 33": {
    "name": "Profile clamp for exhaustturbocharger to exhaust manifoldreplaced by: a 000 995 96 03",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 995 96 03": {
    "name": "Profile clamp for exhaustturbocharger to exhaust manifold",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 995 05 04": {
    "name": "Pipe clamp f exhaust sys.turbocompresseur to exhaust manifold first exhaust stock of old parts up to enginereplaced by: a 000 995 77 03",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 905 14 06": {
    "name": "Temperature sensorin turbocompresseur first exhaust stock of old parts up to enginereplaced by: a 000 905 93 07",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 905 93 07": {
    "name": "Temperature sensorin turbocompresseur first exhaust stock of old parts up to enginereplaced by: a 000 905 41 09",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 905 41 09": {
    "name": "Temperature sensorin turbocompresseur",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 010 153 45 28": {
    "name": "Pressure transducerfor exh gas turbocompresseur wastegate",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 656 203 04 02": {
    "name": "Water linefrom exhaust cooler to exhaust gas turbochargerreplaced by: a 656 203 19 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 656 203 19 00": {
    "name": "Coolant linefrom exhaust cooler to exhaust gas turbochargerreplaced by: a 656 203 20 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 656 203 20 00": {
    "name": "Coolant linefrom exhaust cooler to exhaust gas turbocompresseur",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 654 150 04 00": {
    "name": "Engine wiring harnessturbocharger/mass air flow sensor",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1050,
    "usedMaxTND": 1890
  },
  "A 000 991 25 95": {
    "name": "Plug-in fastenerradiator top",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 991 47 95": {
    "name": "Plug-in fastenerleft panelling to body",
    "category": "hybride",
    "zone": "rear_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 001 988 03 25": {
    "name": "Plug-in fastenerfor insulation to capot moteur",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 991 76 95": {
    "name": "Plug-in fastenerengine hood at gauche avant 28x10.2mm",
    "category": "hybride",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 096 00 45": {
    "name": "Support",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 090 53 00": {
    "name": "Vacuum cellfront",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 090 11 00": {
    "name": "Vacuum cellrear",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 090 13 00": {
    "name": "Air duct housingfresh air",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 098 00 00": {
    "name": "Connection fittingat air guide",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 010 59 01": {
    "name": "Ts seal stripair duct",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 906 05 00": {
    "name": "Actuator motorcharge air pressure",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 010 58 01": {
    "name": "Ts seal stripservomotor",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 203 14 00": {
    "name": "Coolant linehigh pressure",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 203 15 00": {
    "name": "Coolant linelow pressure",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 656 090 02 37": {
    "name": "Compressed-air line",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 990 67 06": {
    "name": "Combi-screw w featurem8x27",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 541 01 40": {
    "name": "Bracket18 x 24 mm",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 203 12 02": {
    "name": "Water line first exhaust stock of old parts up to enginereplaced by: a 654 203 87 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 203 87 00": {
    "name": "Coolant line",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 203 16 02": {
    "name": "Water line",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 203 40 02": {
    "name": "Water line first exhaust stock of old parts up to enginereplaced by: a 654 203 37 00",
    "category": "hybride",
    "zone": "underbody",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 096 09 00": {
    "name": "Supportcooler line fastening",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 654 200 00 00": {
    "name": "Vent line",
    "category": "hybride",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 906 06 01": {
    "name": "Rs led moduleleft phare",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 8500,
    "usedMinTND": 2550,
    "usedMaxTND": 4250
  },
  "A 205 906 74 04": {
    "name": "Rs led light source mod.gauche phare",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 8500,
    "usedMinTND": 2550,
    "usedMaxTND": 4250
  },
  "A 205 906 75 04": {
    "name": "Rs led light source mod.droite phare",
    "category": "éclairage",
    "zone": "front_right",
    "newPriceTND": 8500,
    "usedMinTND": 2550,
    "usedMaxTND": 4250
  },
  "A 000 817 07 01": {
    "name": "Information labelheadlamp adjustment theft-relevant part",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 826 01 91": {
    "name": "Gasket for light housingleft phare",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 826 02 91": {
    "name": "Gasket for light housingright phare",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 000 826 03 00": {
    "name": "Gasket for light housingheadlamp range adjustment calculateur at gauche",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 222 870 07 89": {
    "name": "Voltage converterleft phare part is only or also supplied as reconditioned part",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 900 95 34": {
    "name": "Calculateur, completeleft phare part must be checked after installation for current flashware",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 222 900 05 15": {
    "name": "Calculateur, completeheadlamp range adjustment, droite part must be checked after installation for current flashware",
    "category": "éclairage",
    "zone": "front_right",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 023 420 75 18": {
    "name": "Diaphragm unitrepair solution for headlamps gauche",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 006 990 70 12": {
    "name": "Combi-hexagon head boltmounting phare gauche 5x40",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 006 990 18 00": {
    "name": "Combi-hexagon head boltmounting phare gauche m5x35",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 222 906 25 01": {
    "name": "Fanrepair solution for headlamps gauche",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 820 05 14": {
    "name": "Rs bracketrepair solution for headlamps gauche",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 820 04 14": {
    "name": "Rs bracketrepair solution for headlamps droite",
    "category": "éclairage",
    "zone": "front_right",
    "newPriceTND": 4200,
    "usedMinTND": 1260,
    "usedMaxTND": 2100
  },
  "A 205 545 16 26": {
    "name": "Clutch housingtaillamp at gauche, with arrière antibrouillard 7-pin mcp2.8;e3*1",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 850,
    "usedMinTND": 255,
    "usedMaxTND": 425
  },
  "A 205 545 17 26": {
    "name": "Clutch housingtaillamp at gauche, without arrière antibrouillard 7-pin mcp2.8;e3*1",
    "category": "éclairage",
    "zone": "front_left",
    "newPriceTND": 850,
    "usedMinTND": 255,
    "usedMaxTND": 425
  },
  "A 210 540 36 81": {
    "name": "Clutchleft avant level sensor 6-pin mqs;b22/8",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 380,
    "usedMinTND": 114,
    "usedMaxTND": 190
  },
  "A 001 546 64 35": {
    "name": "Protective capleft avant level sensor b22/8",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 380,
    "usedMinTND": 114,
    "usedMaxTND": 190
  },
  "A 213 905 33 02": {
    "name": "Turning angle sensorleft",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 60,
    "usedMaxTND": 100
  },
  "A 213 905 34 02": {
    "name": "Turning angle sensorright",
    "category": "éclairage",
    "zone": "front_center",
    "newPriceTND": 200,
    "usedMinTND": 60,
    "usedMaxTND": 100
  },
  "A 222 810 01 17": {
    "name": "Rétroviseur, inner qft205a0600 porcelain qft205a0600 greige qft205a0600 black",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 720,
    "usedMaxTND": 1152
  },
  "A 205 810 82 00": {
    "name": "Rétroviseur, inner qft205a0602 black",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 720,
    "usedMaxTND": 1152
  },
  "A 246 810 00 00": {
    "name": "Rétroviseur, inneradditional inside rearview rétroviseur",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 720,
    "usedMaxTND": 1152
  },
  "A 205 811 04 00": {
    "name": "Rétroviseur shell",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 720,
    "usedMaxTND": 1152
  },
  "A 205 811 00 00": {
    "name": "Cover, rétroviseur basemirror base qft205a1600 porcelain qft205a1600 greige qft205a1600 greige qft205a1600 greige qft205a1600 black qft205a1600 black",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 280,
    "usedMinTND": 84,
    "usedMaxTND": 134
  },
  "A 205 811 01 00": {
    "name": "Cover, rétroviseur housingparts kit, gauche and droite",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 280,
    "usedMinTND": 84,
    "usedMaxTND": 134
  },
  "A 246 810 00 11": {
    "name": "Base plateadditional inside rearview rétroviseur",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 200,
    "usedMinTND": 60,
    "usedMaxTND": 96
  },
  "A 246 790 00 02": {
    "name": "Check strapadditional inside rearview rétroviseur",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 200,
    "usedMinTND": 60,
    "usedMaxTND": 96
  },
  "A 222 820 22 00": {
    "name": "Speakerin rétroviseur triangle,gauche",
    "category": "rétroviseur",
    "zone": "left_side",
    "newPriceTND": 200,
    "usedMinTND": 60,
    "usedMaxTND": 96
  },
  "A 205 670 89 00": {
    "name": "Pare-brise note: brand signature is visible for customer",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 3600,
    "usedMinTND": 900,
    "usedMaxTND": 1512
  },
  "A 205 670 61 01": {
    "name": "Pare-brise",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 3600,
    "usedMinTND": 900,
    "usedMaxTND": 1512
  },
  "A 205 670 79 00": {
    "name": "Pare-brise note: brand signature is visible for customerreplaced by: a 205 670 93 00",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 3600,
    "usedMinTND": 900,
    "usedMaxTND": 1512
  },
  "A 099 810 01 16": {
    "name": "Rétroviseur glass",
    "category": "vitrage",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 099 810 08 16": {
    "name": "Rétroviseur glasswarning text in english",
    "category": "vitrage",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 099 810 12 16": {
    "name": "Rétroviseur glasswarning text in arabic",
    "category": "vitrage",
    "zone": "left_side",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 205 900 66 15": {
    "name": "Calculateur, completerain and light sensor",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 213 900 67 16": {
    "name": "Calculateur, completerain and light sensor first exhaust stock of old parts up to ident no.replaced by: a 213 900 27 24",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 222 900 30 11": {
    "name": "Calculateur, completemulti-purpose camera part must be checked after installation for current flashware",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1008
  },
  "A 205 820 09 00": {
    "name": "Adj. drive, rétroviseur glassmirror glass adjustment",
    "category": "vitrage",
    "zone": "left_side",
    "newPriceTND": 380,
    "usedMinTND": 95,
    "usedMaxTND": 160
  },
  "A 205 824 00 00": {
    "name": "Cover, wiper armfor drivers side",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 118
  },
  "A 205 824 01 19": {
    "name": "Cover, wiper jointfor co-drivers side",
    "category": "vitrage",
    "zone": "windshield_front",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 118
  },
  "A 222 678 00 79": {
    "name": "Support",
    "category": "vitrage",
    "zone": "windshield_rear",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 84
  },
  "A 221 670 81 01": {
    "name": "Rs windshieldglazing; \"1-component adhesive\"replaced by: a 000 670 01 00",
    "category": "vitrage",
    "zone": "windshield_rear",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 84
  },
  "A 000 670 01 00": {
    "name": "Rs windshieldglazing; \"1-component adhesive\"",
    "category": "vitrage",
    "zone": "windshield_rear",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 84
  },
  "A 205 725 00 10": {
    "name": "Glass panefor porte gauche",
    "category": "vitrage",
    "zone": "left_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 84
  },
  "A 205 725 01 10": {
    "name": "Glass panefor porte droite",
    "category": "vitrage",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 84
  },
  "A 204 727 11 87": {
    "name": "Porte sealing, circumf.doors, gauche to be adapted during assembly",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 099 720 23 00": {
    "name": "Porte lockleft first exhaust stock of old parts up to ident no.replaced by: a 099 720 63 01",
    "category": "carrosserie",
    "zone": "underbody",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 099 720 18 00": {
    "name": "Porte lockright first exhaust stock of old parts up to ident no.replaced by: a 099 720 68 01",
    "category": "carrosserie",
    "zone": "underbody",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 099 720 17 00": {
    "name": "Porte lockleft first exhaust stock of old parts up to ident no.replaced by: a 099 720 64 01",
    "category": "carrosserie",
    "zone": "underbody",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 099 720 00 00": {
    "name": "Porte lockright first exhaust stock of old parts up to ident no.replaced by: a 099 720 66 01",
    "category": "carrosserie",
    "zone": "underbody",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 47 11": {
    "name": "Porte panel liningleft avant porte qft205a0240 greige qft205a0240 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 48 11": {
    "name": "Porte panel liningright avant porte qft205a0240 greige qft205a0240 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 53 11": {
    "name": "Porte panel liningleft avant porte qft205a0241 cranberry red qft205a0241 greige qft205a0241 silky beige qft205a0241 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 54 11": {
    "name": "Porte panel liningright avant porte qft205a0241 cranberry red qft205a0241 greige qft205a0241 silky beige qft205a0241 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 59 11": {
    "name": "Porte panel liningleft avant porte qft205a0242 greige qft205a0242 magma gray qft205a0242 silky beige qft205a0242 silky beige qft205a0242 black qft205a0242 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 60 11": {
    "name": "Porte panel liningright avant porte qft205a0242 greige qft205a0242 magma gray qft205a0242 silky beige qft205a0242 silky beige qft205a0242 black qft205a0242 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 73 29": {
    "name": "Porte panel liningleft avant porte",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 77 29": {
    "name": "Porte panel liningleft avant porte qft205a0244 cranberry red qft205a0244 greige qft205a0244 silky beige qft205a0244 saddle brown qft205a0244 black qft205a0244 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 66 11": {
    "name": "Porte panel liningright avant porte qft205a0244 cranberry red qft205a0244 greige qft205a0244 silky beige qft205a0244 saddle brown qft205a0244 black qft205a0244 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 76 29": {
    "name": "Porte panel liningright avant porte",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 71 11": {
    "name": "Porte panel liningleft avant porte qft205a0245 designo platinum white pearl two-tone qft205a0245 saddle brown",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 72 11": {
    "name": "Porte panel liningright avant porte qft205a0245 designo platinum white pearl two-tone qft205a0245 saddle brown",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 85 11": {
    "name": "Porte panel liningleft avant porte qft205a0243 greige qft205a0243 silky beige qft205a0243 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 720 86 11": {
    "name": "Porte panel liningright avant porte qft205a0243 greige qft205a0243 silky beige qft205a0243 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 41 01": {
    "name": "Porte panel liningleft arrière porte qft205a0240 greige qft205a0240 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 42 01": {
    "name": "Porte panel liningright arrière porte qft205a0240 greige qft205a0240 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 45 01": {
    "name": "Porte panel liningleft arrière porte qft205a0241 cranberry red qft205a0241 greige qft205a0241 silky beige qft205a0241 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 46 01": {
    "name": "Porte panel liningright arrière porte qft205a0241 cranberry red qft205a0241 greige qft205a0241 silky beige qft205a0241 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 49 01": {
    "name": "Porte panel liningleft arrière porte qft205a0242 greige qft205a0242 magma gray qft205a0242 silky beige qft205a0242 silky beige qft205a0242 black qft205a0242 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 730 50 01": {
    "name": "Porte panel liningright arrière porte qft205a0242 greige qft205a0242 magma gray qft205a0242 silky beige qft205a0242 silky beige qft205a0242 black qft205a0242 black",
    "category": "carrosserie",
    "zone": "left_side",
    "newPriceTND": 5500,
    "usedMinTND": 1375,
    "usedMaxTND": 2475
  },
  "A 205 750 24 00": {
    "name": "Couvercle de coffre",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 5200,
    "usedMinTND": 1300,
    "usedMaxTND": 2340
  },
  "A 205 887 01 00": {
    "name": "Capot moteur sealengine hood water deflector, gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 4500,
    "usedMinTND": 1125,
    "usedMaxTND": 2025
  },
  "A 205 887 02 00": {
    "name": "Capot moteur sealengine hood water deflector, droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 4500,
    "usedMinTND": 1125,
    "usedMaxTND": 2025
  },
  "A 212 880 00 60": {
    "name": "Hood lockleft and droite upper section",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 4500,
    "usedMinTND": 1125,
    "usedMaxTND": 2025
  },
  "A 205 880 03 47": {
    "name": "Trim, bumperrear bumper to be painted prior to installation qft205l9000 colorless",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 3200,
    "usedMinTND": 800,
    "usedMaxTND": 1440
  },
  "A 205 885 12 38": {
    "name": "Trim, bumperrear bumper, bottom",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 3200,
    "usedMinTND": 800,
    "usedMaxTND": 1440
  },
  "A 205 885 73 38": {
    "name": "Trim, bumperat center arrière bottom to be painted prior to installation qft205l9000 colorless",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 3200,
    "usedMinTND": 800,
    "usedMaxTND": 1440
  },
  "A 222 900 60 08": {
    "name": "Calculateur, completeremote trunk release part must be checked after installation for current flashware",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1080
  },
  "A 205 690 07 30": {
    "name": "Cover, wheel archrear gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1080
  },
  "A 205 690 08 30": {
    "name": "Cover, wheel archrear droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 2400,
    "usedMinTND": 600,
    "usedMaxTND": 1080
  },
  "A 001 998 55 01": {
    "name": "Water drain grommetrocker panel at avant gauche 25mm",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 1100,
    "usedMinTND": 275,
    "usedMaxTND": 495
  },
  "A 205 690 25 07": {
    "name": "Cover, arrière-end floor",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 630 72 02": {
    "name": "Side walla-pillar, droite inner",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 630 62 02": {
    "name": "Side wallc-pillar droite inside",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 637 02 22": {
    "name": "C-pillar, outeroutside droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 690 82 04": {
    "name": "Trim, trunk sillloading edge qft205a0660 black",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 690 85 04": {
    "name": "Trim, couvercle de coffre qft205a0665 single tone black",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 000 991 86 98": {
    "name": "Cover cliphandle ledge to hayon",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 743 00 82": {
    "name": "Trim striprear lid note service information in wis wis-net#si88.85-p-0003a#",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 38 23": {
    "name": "Cover, bumper areabottom gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 39 23": {
    "name": "Cover, bumper areabottom droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 26 23": {
    "name": "Cover, bumper areabottom, droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 67 02": {
    "name": "Cover, bumper areafront gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 68 02": {
    "name": "Cover, bumper areafront droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 02 24": {
    "name": "Cover, towing eyetowing eye qft205l0302 light ivory qft205l0302 patagonia red metallic qft205l0302 cavansite blue met. qft205l0302 brillant blue qft205l0302 blue anthracite met. qft205l0302 emerald green met. qft205l0302 selenite gray shape qft205l0302 tenorite grey qft205l0302 graphite gray magno qft205l0302 graphite gray metallic qft205l0302 selenite gray met. qft205l0302 citrine brown qft205l0302 black qft205l0302 polar white qft205l0302 obsidian black qft205l0302 silver iridium qft205l0302 palladium silver qft205l0302 metallic diamond white qft205l0302 mojave silver qft205l0302 diamond silver met. qft205l0302 colorless",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 12 24": {
    "name": "Cover, towing eyetowing eye upper part to be painted prior to installation qft205l9000 colorless",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 08 24": {
    "name": "Cover, towing eyetowing eye lower section",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 00 53": {
    "name": "Cover grillleft",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 01 53": {
    "name": "Cover grillright",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 29 23": {
    "name": "Cover, bumper arealeft",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 30 23": {
    "name": "Cover, bumper arearight",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 16 00": {
    "name": "Cover, bumper areabumper, center arrière",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 05 21": {
    "name": "Trim stripleft",
    "category": "carrosserie",
    "zone": "rear_center",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 885 11 24": {
    "name": "Cover, bumper areabumper,gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 280,
    "usedMinTND": 70,
    "usedMaxTND": 126
  },
  "A 205 619 03 16": {
    "name": "Reinforcementtop gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 619 04 16": {
    "name": "Reinforcementtop droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 984 17 29": {
    "name": "Screwfastening to gauche reinforcement m5",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 19 01": {
    "name": "Longitudinal memberrear gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 20 01": {
    "name": "Longitudinal memberrear droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 23 01": {
    "name": "Wheel wellrear gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 24 01": {
    "name": "Wheel wellrear droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 29 01": {
    "name": "Striker platerear gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 30 01": {
    "name": "Striker platerear droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 611 27 21": {
    "name": "Longitudinal member, rearrear gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 610 85 01": {
    "name": "Closing panelrear droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 636 06 16": {
    "name": "Reinforcementfront droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 32 03": {
    "name": "Side walloutside droite hose line for avant water drain is also supplied, for parts see dg 78",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 38 02": {
    "name": "Paneling, side walloutside droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 637 80 01": {
    "name": "Longitudinal memberoutside droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 69 02": {
    "name": "Roof frameinside gauche",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 70 02": {
    "name": "Roof frameinside droite",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 45 02": {
    "name": "Roof frameoutside gauche",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 46 02": {
    "name": "Roof frameoutside droite",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 630 66 02": {
    "name": "Wheel welloutside droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 637 01 43": {
    "name": "Strutoutside droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 646 05 45": {
    "name": "Gusset platetop gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 646 06 45": {
    "name": "Gusset platetop droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 650 37 00": {
    "name": "Paneling, roofroof; less sliding roof",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 650 41 00": {
    "name": "Paneling, roofwith sliding roof opening",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 650 01 01": {
    "name": "Roof framefront",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 651 02 01": {
    "name": "Roof frame",
    "category": "carrosserie",
    "zone": "roof",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 001 990 80 00": {
    "name": "Combi-hexagon head boltfastening, mounting console, gauche and droite m6x19",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 720 02 37": {
    "name": "Hingetop droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 720 04 37": {
    "name": "Hingebottom droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 725 38 00": {
    "name": "Side window panefor porte droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 725 48 00": {
    "name": "Window guide railfor droite window",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 099 820 20 00": {
    "name": "Adj. drv., rétroviseur housingmirror housing, droite also order: 1x n 000000 001548",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 735 06 86": {
    "name": "Impact absorberfront droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 735 02 86": {
    "name": "Impact absorberrear droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 737 12 00": {
    "name": "Reinforcementrear droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 735 38 00": {
    "name": "Side window pane, tintedfor porte droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 730 01 55": {
    "name": "Window, fixedfor porte droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 730 60 00": {
    "name": "Side window, fixedfor porte droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 730 02 19": {
    "name": "Window dividerfor porte droite",
    "category": "carrosserie",
    "zone": "right_side",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 140 990 10 17": {
    "name": "Combi-hexagon head bolthinge to couvercle de coffre at gauche and droite m6x20",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 757 00 29": {
    "name": "Draw springleft and droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 204 682 17 04": {
    "name": "Dampeningextension spring at gauche and droite",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 821 23 00": {
    "name": "Cable ductrear lid hinge,gauche qft205a0670 black",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 821 24 00": {
    "name": "Cable ductrear lid hinge,droite qft205a0670 black",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 002 998 16 50": {
    "name": "Stop plugtrunk lid at outer gauche 10mm",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 905 16 13": {
    "name": "Switch blockfor porte at gauche, couvercle de coffre function qft205a1110 greige qft205a1110 silky beige qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 222 905 23 03": {
    "name": "Switch blockfor porte at droite, couvercle de coffre function qft205a1110 greige qft205a1110 silky beige qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black qft205a1110 black",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 546 18 80": {
    "name": "Cable ductbehind trunk trim at droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 546 04 80": {
    "name": "Cable ductbelow trunk trim at droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 211 990 00 21": {
    "name": "Screwfor fender at bottom gauche m6x44.5replaced by: a 099 990 00 14",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 414 990 00 51": {
    "name": "Nutfor fender at bottom gauche m6",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 03 37": {
    "name": "Absorberto fender gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 04 37": {
    "name": "Absorberto fender droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 210 988 00 42": {
    "name": "Latchmaintenance flap gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 04 74": {
    "name": "Trimtop droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 03 74": {
    "name": "Trimtop gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 11 74": {
    "name": "Trimbottom gauche",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 12 74": {
    "name": "Trimbottom droite",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 001 990 52 00": {
    "name": "Combi-hexagon head boltbumper at fender, gauche and droite m5x16",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 990 49 62": {
    "name": "Plastic nut openfastening side support gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 880 05 03": {
    "name": "Basic carrier for bumpertop gauche",
    "category": "carrosserie",
    "zone": "rear_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 880 06 03": {
    "name": "Basic carrier for bumpertop droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 202 990 03 17": {
    "name": "Thd. rolling, head boltfastening, droite basic carrier m6x19",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 20 14": {
    "name": "Bracketbottom, droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 52 14": {
    "name": "Bracketexhaust tip at droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 94 03": {
    "name": "Bracket, bumperblind spot assist, arrière droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 885 02 02": {
    "name": "Bracket, bumperexhaust tip at droite",
    "category": "carrosserie",
    "zone": "rear_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 000 993 24 60": {
    "name": "Ball studgas-filled strut at gauche to capot moteur",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 011 990 32 01": {
    "name": "Combi-hexagon head bolthinge at gauche and droite to longitudinal member m6x14",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 205 880 00 27": {
    "name": "Spring elementengine hood, gauche and droite",
    "category": "carrosserie",
    "zone": "front_left",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 212 880 02 60": {
    "name": "Latch, upper partleft and droite upper section",
    "category": "carrosserie",
    "zone": "front_right",
    "newPriceTND": 200,
    "usedMinTND": 50,
    "usedMaxTND": 90
  },
  "A 220 421 01 71": {
    "name": "Fit screwbrake disk at moyeu, gauche m8x12",
    "category": "roues",
    "zone": "front_left",
    "newPriceTND": 850,
    "usedMinTND": 170,
    "usedMaxTND": 340
  }
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const body = JSON.parse(event.body);
    // Support both old format (single image) and new format (images array)
    let images = [];
    if (body.images && Array.isArray(body.images)) {
      images = body.images.filter(img => img && img.imageBase64);
    } else if (body.imageBase64) {
      images = [{ imageBase64: body.imageBase64, imageMediaType: body.imageMediaType, viewLabel: 'unknown' }];
    }

    if (images.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Aucune image fournie' }) };
    }
    if (images.length > 4) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Maximum 4 photos autorisées' }) };
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Clé API non configurée sur le serveur' }) };

    // Build a compact list of part REFERENCES + zones for the AI to choose from
    // Group by zone so AI can pick relevant ones per damaged zone
    const partsByZone = {};
    for (const [ref, p] of Object.entries(MERCEDES_W205_PARTS_DB)) {
      if (!partsByZone[p.zone]) partsByZone[p.zone] = [];
      partsByZone[p.zone].push(`${ref} | ${p.name} | ${p.category}`);
    }
    
    // Build the parts catalog string (one section per zone)
    let partsRefList = '';
    for (const [zone, parts] of Object.entries(partsByZone)) {
      partsRefList += `\n## Zone "${zone}" (${parts.length} pièces):\n` + parts.slice(0, 30).join('\n') + '\n';
    }

    const viewLabelsFR = {
      front: 'AVANT',
      rear: 'ARRIÈRE',
      left: 'CÔTÉ GAUCHE',
      right: 'CÔTÉ DROIT',
      unknown: 'VUE'
    };
    const photoDescriptions = images.map((img, i) =>
      `Photo ${i + 1}: ${viewLabelsFR[img.viewLabel] || 'VUE INCONNUE'}`
    ).join(', ');

    const prompt = `Tu es expert en pièces auto pour casse auto en Tunisie, spécialisé en MERCEDES-BENZ CLASSE C HYBRIDE (W205, C 350 Plug-in Hybrid).

Tu reçois ${images.length} photo(s) du même véhicule (${photoDescriptions}). Analyse-les ensemble pour avoir une vue complète du véhicule.

CONTEXTE IMPORTANT: Le propriétaire d'une casse auto a récupéré cette Mercedes Classe C hybride. Cette voiture vaut cher à la revente en pièces car c'est un modèle premium avec composants hybrides précieux.

LOGIQUE CRITIQUE À RESPECTER:
- Si la voiture a un choc à l'AVANT seulement → les pièces ARRIÈRE et CÔTÉS sont INTACTES (salvageable: true, condition: "Bon")
- Si la voiture a un choc à GAUCHE seulement → les pièces de DROITE sont INTACTES (salvageable: true)
- Si la voiture a des chocs MULTIPLES (par ex. avant ET arrière, ou avant ET côté) → les pièces de CHAQUE zone impactée sont endommagées (salvageable: false), et les pièces des zones intactes restent salvageable: true
- Si une zone n'a aucun dégât visible → ses pièces sont salvageable: true avec condition "Bon"
- Seules les pièces DIRECTEMENT dans la zone d'impact sont endommagées (salvageable: false)
- Pour un petit choc, attends-toi à 70-90% de pièces salvageable
- Pour un gros choc ou plusieurs zones impactées, attends-toi à 40-60% de pièces salvageable
- Pour total_loss, attends-toi à 20-40% de pièces salvageable

RÈGLE ABSOLUE — TOUJOURS INCLURE DES PIÈCES ENDOMMAGÉES:
Si tu détectes AU MOINS UNE zone endommagée (damageZones a au moins 1 entrée avec severity !== "none"), alors partsAnalysis DOIT contenir AU MINIMUM 2 pièces avec salvageable: false dans cette/ces zone(s).
Exemple: choc avant → tu DOIS inclure au moins 2 pièces du front_center, front_left ou front_right avec salvageable: false.
Exemple: choc avant + arrière → tu DOIS inclure au moins 2 pièces endommagées AVANT et 2 pièces endommagées ARRIÈRE.
Une analyse sans aucune pièce endommagée alors qu'il y a des dégâts visibles est INACCEPTABLE.

EXEMPLE CONCRET — Voiture avec gros choc avant + arrière (comme épave totale):
{
  "damageZones": [
    {"zone":"front_center","severity":"severe","descriptionFR":"capot déchiré, calandre détruite","photoX":50,"photoY":40},
    {"zone":"front_left","severity":"severe","descriptionFR":"aile gauche enfoncée","photoX":25,"photoY":50},
    {"zone":"rear_center","severity":"severe","descriptionFR":"pare-chocs arraché","photoX":50,"photoY":60},
    {"zone":"rear_right","severity":"severe","descriptionFR":"feu arrière droit cassé","photoX":70,"photoY":55}
  ],
  "partsAnalysis": [
    // DAMAGED parts (zones impactées) — OBLIGATOIRE:
    {"oemReference":"A 205 880 03 47","zone":"rear_center","salvageable":false,"condition":"Endommagé","damageNotesFR":"Pare-chocs arrière arraché"},
    {"oemReference":"A 205 906 06 01","zone":"front_center","salvageable":false,"condition":"Pour pièces","damageNotesFR":"Phare LED détruit dans le choc avant"},
    {"oemReference":"A 205 750 24 00","zone":"rear_center","salvageable":false,"condition":"Endommagé","damageNotesFR":"Couvercle de coffre déformé"},
    // SALVAGEABLE parts (zones intactes) — côtés généralement OK:
    {"oemReference":"A 205 810 82 00","zone":"left_side","salvageable":true,"condition":"Bon","damageNotesFR":"Rétroviseur gauche intact"},
    {"oemReference":"A 205 725 01 10","zone":"right_side","salvageable":true,"condition":"Bon","damageNotesFR":"Vitre porte droite intacte"},
    // ALWAYS include hybrid parts if hybrid car:
    {"oemReference":"A 000 982 30 21","zone":"front_center","salvageable":true,"condition":"Bon","damageNotesFR":"Chargeur batterie intact, situé loin de la zone impact"}
  ]
}

IMPORTANT: Inclus TOUJOURS au moins 2-3 pièces hybrides (catégorie "hybride") si la voiture est confirmée hybride — ce sont les pièces les plus précieuses!

INSTRUCTIONS:
1. Vérifie que c'est bien une Mercedes Classe C (W205) — sinon retourne {"error":"..."}
2. Identifie TOUTES les zones endommagées (avec photoX, photoY 0-100%). Regarde chaque photo attentivement: AVANT, ARRIÈRE, CÔTÉS.
3. Choisis 10-14 pièces RÉELLES de la base de données ci-dessous:
   - AU MOINS 3-5 pièces avec salvageable: false dans les zones impactées (obligatoire si dégâts détectés)
   - 5-9 pièces avec salvageable: true dans les zones intactes
4. Pour chaque pièce, utilise UNIQUEMENT les références OEM listées (commencent par "A ")
5. Distribue les pièces sur DIVERSES zones (pas toutes au même endroit)
6. AVANT de soumettre: relis ta liste de damageZones, puis vérifie que partsAnalysis contient bien des pièces endommagées pour CHAQUE zone identifiée comme touchée.

Réponds UNIQUEMENT en JSON valide (commence {, finit }, pas de markdown).

JSON exact:
{
  "vehicleConfirmed": true,
  "vehicleInfo": {"model":"Classe C W205 Hybride","yearRange":"2014-2021","color":"","confidence":85},
  "overallCondition": {"severity":"moderate","severityScore":6,"summaryFR":"très court"},
  "photoAnalyses": [
    {
      "photoIndex": 0,
      "viewDetected": "front",
      "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court","photoX":50,"photoY":50}]
    }
  ],
  "damageZones": [{"zone":"front_center","severity":"severe","descriptionFR":"court"}],
  "earnings": {"totalMinTND":0,"totalMaxTND":0,"wholeCarValueTND":0,"upliftPercent":0},
  "partsAnalysis": [
    {
      "oemReference":"A 205 906 06 01",
      "zone":"front_center",
      "salvageable":true,
      "condition":"Bon",
      "damageNotesFR":"très court — POURQUOI cette pièce est bonne ou endommagée"
    }
  ]
}

zones disponibles: front_left, front_center, front_right, left_side, right_side, rear_left, rear_center, rear_right, roof, windshield_front, windshield_rear, underbody
overall severity: minor|moderate|severe|total_loss
zone severity: none|minor|moderate|severe
condition: Neuf|Bon|Moyen|Endommagé|Pour pièces

PIÈCES DISPONIBLES PAR ZONE (utilise UNIQUEMENT ces références OEM exactes commençant par "A "):
${partsRefList}

Pas une Mercedes Classe C? {"error":"Cette voiture n'est pas une Mercedes Classe C (W205). Notre IA est actuellement entraînée uniquement pour ce modèle."}`;

    // Build content blocks: all images then the text prompt
    const content = [];
    images.forEach((img) => {
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: img.imageMediaType || 'image/jpeg',
          data: img.imageBase64
        }
      });
    });
    content.push({ type: 'text', text: prompt });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 23000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 3500,
        messages: [{ role: 'user', content }],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return { statusCode: response.status, headers, body: JSON.stringify({ error: `Erreur du service IA: ${response.status}` }) };
    }

    const data = await response.json();
    let rawText = data.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    console.log('=== Response length:', rawText.length, '===');

    const tryParse = (str) => { try { return JSON.parse(str); } catch (e) { return null; } };

    let parsed = tryParse(rawText.trim());
    if (!parsed) parsed = tryParse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());
    if (!parsed) {
      const first = rawText.indexOf('{');
      const last = rawText.lastIndexOf('}');
      if (first !== -1 && last > first) parsed = tryParse(rawText.substring(first, last + 1));
    }
    if (!parsed) {
      let fixed = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = fixed.indexOf('{');
      const last = fixed.lastIndexOf('}');
      if (first !== -1 && last > first) fixed = fixed.substring(first, last + 1);
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      parsed = tryParse(fixed);
    }
    if (!parsed) {
      let salvage = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const first = salvage.indexOf('{');
      if (first !== -1) salvage = salvage.substring(first);
      const lastCompleteObj = salvage.lastIndexOf('},');
      const lastCompleteArr = salvage.lastIndexOf('],');
      const cutPoint = Math.max(lastCompleteObj, lastCompleteArr);
      if (cutPoint > 0) salvage = salvage.substring(0, cutPoint + 1);
      let openBrace = 0, openBracket = 0, inString = false, escapeNext = false;
      for (let i = 0; i < salvage.length; i++) {
        const c = salvage[i];
        if (escapeNext) { escapeNext = false; continue; }
        if (c === '\\') { escapeNext = true; continue; }
        if (c === '"') inString = !inString;
        if (!inString) {
          if (c === '{') openBrace++;
          else if (c === '}') openBrace--;
          else if (c === '[') openBracket++;
          else if (c === ']') openBracket--;
        }
      }
      while (openBracket > 0) { salvage += ']'; openBracket--; }
      while (openBrace > 0) { salvage += '}'; openBrace--; }
      parsed = tryParse(salvage);
    }

    if (!parsed) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Format IA invalide. Réessayez." }) };
    }

    if (parsed.error) {
      return { statusCode: 200, headers, body: JSON.stringify(parsed) };
    }

    // Build a normalized lookup map (strip all whitespace) to handle AI formatting variations
    // The AI might return "A2058800140" or "A 205 880 01 40" or "A 205 880 0140" — all should match
    const normalizedDb = {};
    for (const [ref, p] of Object.entries(MERCEDES_W205_PARTS_DB)) {
      const norm = ref.replace(/\s+/g, '').toUpperCase();
      normalizedDb[norm] = { canonicalRef: ref, ...p };
    }
    
    function findInDb(aiRef) {
      if (!aiRef) return null;
      const norm = String(aiRef).replace(/\s+/g, '').toUpperCase();
      return normalizedDb[norm] || null;
    }

    // Enrich with database (tolerant matcher)
    let droppedRefs = []; // refs returned by AI but not in our DB
    const enrichedParts = (parsed.partsAnalysis || [])
      .map(p => {
        const dbPart = findInDb(p.oemReference);
        if (!dbPart) {
          droppedRefs.push(p.oemReference);
          return null;
        }
        return {
          oemReference: dbPart.canonicalRef, // use the properly formatted ref
          nameFR: dbPart.name,
          category: dbPart.category,
          zone: dbPart.zone,
          salvageable: p.salvageable === true,
          condition: p.condition,
          damageNotesFR: p.damageNotesFR || '',
          newPriceTND: dbPart.newPriceTND,
          usedPriceMinTND: dbPart.usedMinTND,
          usedPriceMaxTND: dbPart.usedMaxTND,
        };
      })
      .filter(Boolean);
    
    // Diagnostic logging
    const aiPartsCount = (parsed.partsAnalysis || []).length;
    const aiDamagedCount = (parsed.partsAnalysis || []).filter(p => p.salvageable === false).length;
    const dbMatchedCount = enrichedParts.length;
    const dbDamagedCount = enrichedParts.filter(p => !p.salvageable).length;
    const damageZonesCount = (parsed.damageZones || []).filter(z => z.severity !== 'none').length;
    
    console.log('=== ANALYSIS DIAGNOSTICS ===');
    console.log(`Damage zones detected: ${damageZonesCount}`);
    console.log(`AI returned parts: ${aiPartsCount} (${aiDamagedCount} damaged)`);
    console.log(`After DB match: ${dbMatchedCount} (${dbDamagedCount} damaged)`);
    if (droppedRefs.length > 0) {
      console.log(`⚠️  Dropped refs (not in DB): ${droppedRefs.slice(0, 8).join(' | ')}${droppedRefs.length > 8 ? ' ...' : ''}`);
    }
    if (damageZonesCount > 0 && dbDamagedCount === 0) {
      console.log(`🚨 BUG: ${damageZonesCount} damage zones detected but 0 damaged parts in final output!`);
      console.log(`AI partsAnalysis was:`, JSON.stringify(parsed.partsAnalysis, null, 2));
    }

    // FALLBACK: If we have very few enriched parts (AI gave bad refs), augment with DB parts
    // based on the damage zone analysis. This guarantees we always show meaningful results.
    const MIN_PARTS_TARGET = 10;
    if (enrichedParts.length < MIN_PARTS_TARGET && (parsed.damageZones || []).length > 0) {
      console.log(`🔧 Fallback: only ${enrichedParts.length} parts matched. Augmenting from DB...`);
      
      // Map of damaged zones -> severity
      const damagedZoneMap = {};
      (parsed.damageZones || []).forEach(z => {
        if (z.severity && z.severity !== 'none') {
          damagedZoneMap[z.zone] = z.severity;
        }
      });
      
      // Get all DB parts indexed by zone
      const dbByZone = {};
      for (const [ref, p] of Object.entries(MERCEDES_W205_PARTS_DB)) {
        if (!dbByZone[p.zone]) dbByZone[p.zone] = [];
        dbByZone[p.zone].push({ ref, ...p });
      }
      
      // Track which refs we already have
      const haveRefs = new Set(enrichedParts.map(p => p.oemReference));
      
      // Strategy: from each damaged zone, add up to 3 high-value damaged parts
      //           from each intact zone, add up to 2 salvageable parts
      //           always include 2 hybrid parts if not already present
      
      const addedDamaged = [];
      const addedSalvageable = [];
      
      // Sort parts in a zone by new price (most valuable first)
      const sortByPrice = (parts) => [...parts].sort((a, b) => b.newPriceTND - a.newPriceTND);
      
      // Add damaged parts from impacted zones
      for (const [zone, severity] of Object.entries(damagedZoneMap)) {
        const zoneParts = sortByPrice(dbByZone[zone] || []);
        let added = 0;
        for (const part of zoneParts) {
          if (added >= 3) break;
          if (haveRefs.has(part.ref)) continue;
          haveRefs.add(part.ref);
          const condition = severity === 'severe' ? 'Pour pièces' : severity === 'moderate' ? 'Endommagé' : 'Moyen';
          addedDamaged.push({
            oemReference: part.ref,
            nameFR: part.name,
            category: part.category,
            zone: part.zone,
            salvageable: false,
            condition,
            damageNotesFR: `Zone ${zone} impactée (${severity}) — pièce probablement à recycler`,
            newPriceTND: part.newPriceTND,
            usedPriceMinTND: part.usedMinTND,
            usedPriceMaxTND: part.usedMaxTND,
          });
          added++;
        }
      }
      
      // Add salvageable parts from INTACT zones (all zones not in damagedZoneMap)
      const allZones = Object.keys(dbByZone);
      const intactZones = allZones.filter(z => !damagedZoneMap[z]);
      for (const zone of intactZones) {
        const zoneParts = sortByPrice(dbByZone[zone] || []);
        let added = 0;
        for (const part of zoneParts) {
          if (added >= 2) break;
          if (haveRefs.has(part.ref)) continue;
          haveRefs.add(part.ref);
          addedSalvageable.push({
            oemReference: part.ref,
            nameFR: part.name,
            category: part.category,
            zone: part.zone,
            salvageable: true,
            condition: 'Bon',
            damageNotesFR: `Zone ${zone} non impactée — pièce intacte, revendable`,
            newPriceTND: part.newPriceTND,
            usedPriceMinTND: part.usedMinTND,
            usedPriceMaxTND: part.usedMaxTND,
          });
          added++;
        }
      }
      
      // Ensure hybrid parts represented
      const hybridParts = Object.entries(MERCEDES_W205_PARTS_DB)
        .filter(([_, p]) => p.category === 'hybride')
        .sort((a, b) => b[1].newPriceTND - a[1].newPriceTND)
        .slice(0, 3);
      for (const [ref, part] of hybridParts) {
        if (haveRefs.has(ref)) continue;
        const isDamaged = damagedZoneMap[part.zone];
        haveRefs.add(ref);
        const addedTo = isDamaged ? addedDamaged : addedSalvageable;
        addedTo.push({
          oemReference: ref,
          nameFR: part.name,
          category: 'hybride',
          zone: part.zone,
          salvageable: !isDamaged,
          condition: isDamaged ? 'Endommagé' : 'Bon',
          damageNotesFR: isDamaged ? 'Composant hybride dans zone impactée' : 'Composant hybride précieux, intact',
          newPriceTND: part.newPriceTND,
          usedPriceMinTND: part.usedMinTND,
          usedPriceMaxTND: part.usedMaxTND,
        });
      }
      
      enrichedParts.push(...addedDamaged, ...addedSalvageable);
      console.log(`🔧 Augmented with ${addedDamaged.length} damaged + ${addedSalvageable.length} salvageable parts. Total now: ${enrichedParts.length}`);
    }

    const salvageable = enrichedParts.filter(p => p.salvageable);
    const totalMin = salvageable.reduce((sum, p) => sum + (p.usedPriceMinTND || 0), 0);
    const totalMax = salvageable.reduce((sum, p) => sum + (p.usedPriceMaxTND || 0), 0);
    const wholeCarValue = parsed.earnings?.wholeCarValueTND || Math.round(totalMin * 0.6);

    const finalResult = {
      vehicleConfirmed: parsed.vehicleConfirmed !== false,
      vehicleInfo: parsed.vehicleInfo || { model: 'Classe C W205 Hybride' },
      overallCondition: parsed.overallCondition || {},
      damageZones: parsed.damageZones || [],
      photoAnalyses: parsed.photoAnalyses || [],
      photoCount: images.length,
      earnings: {
        totalMinTND: totalMin,
        totalMaxTND: totalMax,
        wholeCarValueTND: wholeCarValue,
        upliftPercent: wholeCarValue > 0 ? Math.round(((totalMax - wholeCarValue) / wholeCarValue) * 100) : 0,
      },
      parts: enrichedParts,
      stats: {
        totalDetected: enrichedParts.length,
        salvageableCount: salvageable.length,
        damagedCount: enrichedParts.length - salvageable.length,
      }
    };

    return { statusCode: 200, headers, body: JSON.stringify(finalResult) };

  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        statusCode: 504,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: "L'analyse a pris trop de temps. Réessayez avec moins de photos ou une seule." })
      };
    }
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur serveur: ' + err.message })
    };
  }
};
