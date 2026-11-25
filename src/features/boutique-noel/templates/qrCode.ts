// Générateur de QR code autonome (aucune dépendance), utilisé par le modèle de bon de commande.
// Mode octet, correction d'erreur niveau M, versions 1 à 6 (jusqu'à 106 caractères : largement assez pour une URL).
// Implémentation fidèle à la norme ISO/IEC 18004.

const MAX_VERSION = 6;
// Niveau de correction M (index = version)
const ECC_CODEWORDS_PER_BLOCK = [-1, 10, 16, 26, 18, 24, 16];
const NUM_ERROR_CORRECTION_BLOCKS = [-1, 1, 1, 1, 2, 2, 4];
const ECC_FORMAT_BITS_M = 0;

const getBit = (value: number, index: number) => ((value >>> index) & 1) !== 0;

const getNumRawDataModules = (version: number) => {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const numAlign = Math.floor(version / 7) + 2;
    result -= (25 * numAlign - 10) * numAlign - 55;
  }
  return result;
};

const getNumDataCodewords = (version: number) =>
  Math.floor(getNumRawDataModules(version) / 8) -
  ECC_CODEWORDS_PER_BLOCK[version] * NUM_ERROR_CORRECTION_BLOCKS[version];

// --- Reed-Solomon sur GF(2^8) ---
const rsMultiply = (x: number, y: number) => {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
};

const rsDivisor = (degree: number) => {
  const result = new Array<number>(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < result.length; j++) {
      result[j] = rsMultiply(result[j], root);
      if (j + 1 < result.length) result[j] ^= result[j + 1];
    }
    root = rsMultiply(root, 0x02);
  }
  return result;
};

const rsRemainder = (data: number[], divisor: number[]) => {
  const result = divisor.map(() => 0);
  for (const byte of data) {
    const factor = byte ^ (result.shift() as number);
    result.push(0);
    divisor.forEach((coef, i) => {
      result[i] ^= rsMultiply(coef, factor);
    });
  }
  return result;
};

const encodeData = (text: string, version: number) => {
  const bytes = Array.from(new TextEncoder().encode(text));
  const bits: number[] = [];
  const append = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  append(0b0100, 4); // mode octet
  append(bytes.length, 8); // compteur (versions 1 à 9)
  bytes.forEach((b) => append(b, 8));

  const capacityBits = getNumDataCodewords(version) * 8;
  append(0, Math.min(4, capacityBits - bits.length)); // terminateur
  append(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < capacityBits; pad ^= 0xec ^ 0x11) append(pad, 8);

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) codewords.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  return codewords;
};

const addEccAndInterleave = (data: number[], version: number) => {
  const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[version];
  const blockEccLen = ECC_CODEWORDS_PER_BLOCK[version];
  const rawCodewords = Math.floor(getNumRawDataModules(version) / 8);
  const numShortBlocks = numBlocks - (rawCodewords % numBlocks);
  const shortBlockLen = Math.floor(rawCodewords / numBlocks);
  const divisor = rsDivisor(blockEccLen);

  const blocks: number[][] = [];
  for (let i = 0, k = 0; i < numBlocks; i++) {
    const dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
    k += dat.length;
    const ecc = rsRemainder(dat, divisor);
    if (i < numShortBlocks) dat.push(0);
    blocks.push(dat.concat(ecc));
  }

  const result: number[] = [];
  for (let i = 0; i < blocks[0].length; i++) {
    blocks.forEach((block, j) => {
      if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
    });
  }
  return result;
};

const MASKS: ((x: number, y: number) => boolean)[] = [
  (x, y) => (x + y) % 2 === 0,
  (_x, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
];

const FINDER_LIKE = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];

/** Pénalité (règles de la norme) : sert à choisir le masque le plus lisible */
const penaltyScore = (modules: boolean[][]) => {
  const size = modules.length;
  let penalty = 0;
  const line = (i: number, horizontal: boolean) =>
    Array.from({ length: size }, (_, j) => (horizontal ? modules[i][j] : modules[j][i]));

  for (let i = 0; i < size; i++) {
    for (const horizontal of [true, false]) {
      const cells = line(i, horizontal);
      // Règle 1 : suites de 5 modules ou plus de même couleur
      let run = 1;
      for (let j = 1; j <= size; j++) {
        if (j < size && cells[j] === cells[j - 1]) run++;
        else {
          if (run >= 5) penalty += 3 + (run - 5);
          run = 1;
        }
      }
      // Règle 3 : motifs ressemblant aux repères de position
      const bits = cells.map(Number);
      for (let j = 0; j + FINDER_LIKE.length <= size; j++) {
        const forward = FINDER_LIKE.every((b, k) => bits[j + k] === b);
        const backward = FINDER_LIKE.every((b, k) => bits[j + k] === FINDER_LIKE[FINDER_LIKE.length - 1 - k]);
        if (forward) penalty += 40;
        if (backward) penalty += 40;
      }
    }
  }
  // Règle 2 : blocs 2×2 de même couleur
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const c = modules[y][x];
      if (c === modules[y][x + 1] && c === modules[y + 1][x] && c === modules[y + 1][x + 1]) penalty += 3;
    }
  }
  // Règle 4 : équilibre clair / foncé
  const dark = modules.flat().filter(Boolean).length;
  const total = size * size;
  penalty += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
  return penalty;
};

/** Encode un texte (ex. une URL) et renvoie la matrice du QR code : true = module noir */
export const createQrMatrix = (text: string): boolean[][] => {
  const length = new TextEncoder().encode(text).length;
  let version = 1;
  while (version <= MAX_VERSION && getNumDataCodewords(version) < length + 2) version++;
  if (version > MAX_VERSION) throw new Error('Texte trop long pour le QR code (106 caractères maximum).');

  const size = version * 4 + 17;
  const modules = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const isFunction = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const setFunction = (x: number, y: number, dark: boolean) => {
    modules[y][x] = dark;
    isFunction[y][x] = true;
  };

  // Motifs fixes : lignes de synchronisation, repères de position, motif d'alignement
  for (let i = 0; i < size; i++) {
    setFunction(6, i, i % 2 === 0);
    setFunction(i, 6, i % 2 === 0);
  }
  for (const [cx, cy] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) setFunction(x, y, dist !== 2 && dist !== 4);
      }
    }
  }
  if (version >= 2) {
    const pos = size - 7;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) setFunction(pos + dx, pos + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
  }

  const drawFormatBits = (mask: number) => {
    const data = (ECC_FORMAT_BITS_M << 3) | mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412;
    for (let i = 0; i <= 5; i++) setFunction(8, i, getBit(bits, i));
    setFunction(8, 7, getBit(bits, 6));
    setFunction(8, 8, getBit(bits, 7));
    setFunction(7, 8, getBit(bits, 8));
    for (let i = 9; i < 15; i++) setFunction(14 - i, 8, getBit(bits, i));
    for (let i = 0; i < 8; i++) setFunction(size - 1 - i, 8, getBit(bits, i));
    for (let i = 8; i < 15; i++) setFunction(8, size - 15 + i, getBit(bits, i));
    setFunction(8, size - 8, true);
  };
  drawFormatBits(0); // réserve les emplacements du format

  // Placement des données en zigzag
  const codewords = addEccAndInterleave(encodeData(text, version), version);
  let bitIndex = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (!isFunction[y][x] && bitIndex < codewords.length * 8) {
          modules[y][x] = getBit(codewords[bitIndex >>> 3], 7 - (bitIndex & 7));
          bitIndex++;
        }
      }
    }
  }

  const applyMask = (mask: number) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!isFunction[y][x] && MASKS[mask](x, y)) modules[y][x] = !modules[y][x];
      }
    }
  };

  // Choix du masque le plus lisible
  let bestMask = 0;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    applyMask(mask);
    drawFormatBits(mask);
    const score = penaltyScore(modules);
    if (score < bestScore) {
      bestScore = score;
      bestMask = mask;
    }
    applyMask(mask); // annule (le masque est une inversion)
  }
  applyMask(bestMask);
  drawFormatBits(bestMask);
  return modules;
};
