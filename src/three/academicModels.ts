import * as THREE from 'three';

export interface AcademicMaterialSet {
  navyLeather: THREE.MeshStandardMaterial;
  royalLacquer: THREE.MeshPhysicalMaterial;
  brushedGold: THREE.MeshPhysicalMaterial;
  warmGoldEmissive: THREE.MeshStandardMaterial;
  royalEmissive: THREE.MeshStandardMaterial;
  creamPaper: THREE.MeshStandardMaterial;
  cedarWood: THREE.MeshStandardMaterial;
  graphite: THREE.MeshStandardMaterial;
  eraserRose: THREE.MeshStandardMaterial;
  opticalGlass: THREE.MeshPhysicalMaterial;
  bookCoverMat: THREE.MeshStandardMaterial;
  amethystGlass: THREE.MeshPhysicalMaterial;
  neonVioletEmissive: THREE.MeshStandardMaterial;
  bioCyanEmissive: THREE.MeshStandardMaterial;
  adenineFuchsia: THREE.MeshPhysicalMaterial;
  thymineCyan: THREE.MeshPhysicalMaterial;
  guanineEmerald: THREE.MeshPhysicalMaterial;
  cytosinePurple: THREE.MeshPhysicalMaterial;
  hydrogenBondMat: THREE.MeshStandardMaterial;
  dispose: () => void;
}

/**
 * Generates a procedural gold-embossed navy book cover CanvasTexture.
 */
function createBookCoverTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Deep Midnight Navy leather base
    const grad = ctx.createLinearGradient(0, 0, 256, 384);
    grad.addColorStop(0, '#16294A');
    grad.addColorStop(1, '#0D182E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 384);

    // Subtle leather grain speckles
    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    for (let i = 0; i < 650; i++) {
      const x = (i * 73) % 256;
      const y = (i * 137) % 384;
      ctx.fillRect(x, y, 2, 2);
    }

    // Gold leaf outer filigree border
    ctx.strokeStyle = '#F2B84B';
    ctx.lineWidth = 4;
    ctx.strokeRect(18, 18, 220, 348);

    ctx.strokeStyle = 'rgba(242, 184, 75, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, 204, 332);

    // Center geometric academic crest
    ctx.beginPath();
    ctx.arc(128, 168, 42, 0, Math.PI * 2);
    ctx.strokeStyle = '#F2B84B';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(128, 134);
    ctx.lineTo(156, 168);
    ctx.lineTo(128, 202);
    ctx.lineTo(100, 168);
    ctx.closePath();
    ctx.strokeStyle = '#F2B84B';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Embossed gold rule lines
    ctx.fillStyle = '#F2B84B';
    ctx.fillRect(72, 240, 112, 4);
    ctx.fillStyle = 'rgba(242, 184, 75, 0.7)';
    ctx.fillRect(92, 254, 72, 2.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

/**
 * Generates a procedural ruled academic page texture.
 */
function createPageTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#F8F6F0';
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = 'rgba(40, 85, 197, 0.16)';
    ctx.lineWidth = 1.5;
    for (let y = 24; y < 244; y += 18) {
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(240, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(242, 184, 75, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, 0);
    ctx.lineTo(32, 256);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createAcademicMaterials(
  isSoftwareGl: boolean,
  maxAnisotropy: number
): AcademicMaterialSet {
  const coverTexture = createBookCoverTexture(maxAnisotropy);
  const pageTexture = createPageTexture(maxAnisotropy);

  const navyLeather = new THREE.MeshStandardMaterial({
    color: 0x132442,
    roughness: 0.72,
    metalness: 0.08,
  });

  const bookCoverMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: coverTexture,
    roughness: 0.65,
    metalness: 0.15,
  });

  const royalLacquer = new THREE.MeshPhysicalMaterial({
    color: 0x2855c5,
    roughness: 0.22,
    metalness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.12,
  });

  const brushedGold = new THREE.MeshPhysicalMaterial({
    color: 0xf2b84b,
    roughness: 0.2,
    metalness: 0.92,
    anisotropy: 0.75,
    clearcoat: 0.4,
  });

  const warmGoldEmissive = new THREE.MeshStandardMaterial({
    color: 0xf6c96e,
    emissive: 0xf2b84b,
    emissiveIntensity: 0.85,
    roughness: 0.25,
    metalness: 0.3,
  });

  const royalEmissive = new THREE.MeshStandardMaterial({
    color: 0x4b7cf3,
    emissive: 0x2855c5,
    emissiveIntensity: 0.75,
    roughness: 0.28,
    metalness: 0.25,
  });

  const creamPaper = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: pageTexture,
    roughness: 0.88,
    metalness: 0.0,
  });

  const cedarWood = new THREE.MeshStandardMaterial({
    color: 0xd9a066,
    roughness: 0.74,
    metalness: 0.02,
  });

  const graphite = new THREE.MeshStandardMaterial({
    color: 0x1e2430,
    roughness: 0.42,
    metalness: 0.35,
  });

  const eraserRose = new THREE.MeshStandardMaterial({
    color: 0xd9727c,
    roughness: 0.85,
    metalness: 0.0,
  });

  const opticalGlass = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    metalness: 0.0,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.92,
    transparent: true,
    opacity: isSoftwareGl ? 0.36 : 1.0,
    ior: 1.55,
    thickness: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    depthWrite: false,
  });

  // Hyper-Realistic Purplish & Bioluminescent DNA Materials
  const amethystGlass = new THREE.MeshPhysicalMaterial({
    color: 0x9333ea,
    emissive: 0x581c87,
    emissiveIntensity: 0.35,
    roughness: 0.16,
    metalness: 0.14,
    transmission: isSoftwareGl ? 0 : 0.42,
    transparent: true,
    opacity: isSoftwareGl ? 0.85 : 0.95,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const neonVioletEmissive = new THREE.MeshStandardMaterial({
    color: 0xc084fc,
    emissive: 0x9333ea,
    emissiveIntensity: 0.95,
    roughness: 0.22,
    metalness: 0.25,
  });

  const bioCyanEmissive = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.9,
    roughness: 0.2,
    metalness: 0.3,
  });

  const adenineFuchsia = new THREE.MeshPhysicalMaterial({
    color: 0xf43f5e,
    emissive: 0xe11d48,
    emissiveIntensity: 0.45,
    roughness: 0.22,
    metalness: 0.18,
    clearcoat: 0.8,
  });

  const thymineCyan = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.45,
    roughness: 0.22,
    metalness: 0.18,
    clearcoat: 0.8,
  });

  const guanineEmerald = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.45,
    roughness: 0.22,
    metalness: 0.18,
    clearcoat: 0.8,
  });

  const cytosinePurple = new THREE.MeshPhysicalMaterial({
    color: 0x8b5cf6,
    emissive: 0x6d28d9,
    emissiveIntensity: 0.45,
    roughness: 0.22,
    metalness: 0.18,
    clearcoat: 0.8,
  });

  const hydrogenBondMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xfef08a,
    emissiveIntensity: 0.9,
    roughness: 0.15,
    metalness: 0.1,
  });

  const allMaterials: THREE.Material[] = [
    navyLeather,
    bookCoverMat,
    royalLacquer,
    brushedGold,
    warmGoldEmissive,
    royalEmissive,
    creamPaper,
    cedarWood,
    graphite,
    eraserRose,
    opticalGlass,
    amethystGlass,
    neonVioletEmissive,
    bioCyanEmissive,
    adenineFuchsia,
    thymineCyan,
    guanineEmerald,
    cytosinePurple,
    hydrogenBondMat,
  ];

  return {
    navyLeather,
    royalLacquer,
    brushedGold,
    warmGoldEmissive,
    royalEmissive,
    creamPaper,
    cedarWood,
    graphite,
    eraserRose,
    opticalGlass,
    bookCoverMat,
    amethystGlass,
    neonVioletEmissive,
    bioCyanEmissive,
    adenineFuchsia,
    thymineCyan,
    guanineEmerald,
    cytosinePurple,
    hydrogenBondMat,
    dispose: () => {
      coverTexture.dispose();
      pageTexture.dispose();
      allMaterials.forEach((m) => m.dispose());
    },
  };
}

/**
 * 1. Composite Hardcover Academic Book (8 parts: front cover, back cover, spine, page block,
 *    gold spine bands, and silk bookmark ribbon).
 */
export function createAcademicBookGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[],
  useRoyalCover = false
): THREE.Group {
  const group = new THREE.Group();

  const coverGeo = new THREE.BoxGeometry(0.92, 0.055, 1.26);
  const spineGeo = new THREE.CylinderGeometry(0.145, 0.145, 1.26, 16, 1, false, 0, Math.PI);
  const pagesGeo = new THREE.BoxGeometry(0.84, 0.21, 1.18);
  const bandGeo = new THREE.TorusGeometry(0.148, 0.014, 8, 20, Math.PI);
  const ribbonGeo = new THREE.BoxGeometry(0.065, 0.012, 0.42);
  geometries.push(coverGeo, spineGeo, pagesGeo, bandGeo, ribbonGeo);

  const coverMaterial = useRoyalCover ? mats.royalLacquer : mats.bookCoverMat;

  const topCover = new THREE.Mesh(coverGeo, coverMaterial);
  topCover.position.set(0.02, 0.125, 0);
  group.add(topCover);

  const bottomCover = new THREE.Mesh(coverGeo, mats.navyLeather);
  bottomCover.position.set(0.02, -0.125, 0);
  group.add(bottomCover);

  const pages = new THREE.Mesh(pagesGeo, mats.creamPaper);
  pages.position.set(0.03, 0, 0);
  group.add(pages);

  const spine = new THREE.Mesh(spineGeo, mats.navyLeather);
  spine.rotation.x = Math.PI / 2;
  spine.rotation.z = Math.PI / 2;
  spine.position.set(-0.43, 0, 0);
  group.add(spine);

  // Three gold spine ribs
  [-0.36, 0, 0.36].forEach((zPos) => {
    const band = new THREE.Mesh(bandGeo, mats.brushedGold);
    band.rotation.y = -Math.PI / 2;
    band.position.set(-0.43, 0, zPos);
    group.add(band);
  });

  // Gold bookmark ribbon extending out the bottom
  const ribbon = new THREE.Mesh(ribbonGeo, mats.brushedGold);
  ribbon.position.set(0.18, -0.02, 0.72);
  ribbon.rotation.y = 0.14;
  ribbon.rotation.x = 0.08;
  group.add(ribbon);

  return group;
}

/**
 * 2. Composite Open Study Book (6 parts: angled left/right covers, left/right curved page stacks,
 *    central spine cradle, and gold center bookmark).
 */
export function createOpenBookGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  const halfCoverGeo = new THREE.BoxGeometry(0.86, 0.04, 1.18);
  const halfPageGeo = new THREE.BoxGeometry(0.8, 0.09, 1.12);
  const spineRodGeo = new THREE.CylinderGeometry(0.055, 0.055, 1.18, 12);
  const bookmarkGeo = new THREE.BoxGeometry(0.045, 0.01, 1.35);
  geometries.push(halfCoverGeo, halfPageGeo, spineRodGeo, bookmarkGeo);

  const leftWing = new THREE.Group();
  leftWing.rotation.z = 0.24;
  leftWing.position.set(-0.44, 0.08, 0);
  const leftCover = new THREE.Mesh(halfCoverGeo, mats.navyLeather);
  const leftPages = new THREE.Mesh(halfPageGeo, mats.creamPaper);
  leftPages.position.y = 0.055;
  leftWing.add(leftCover, leftPages);

  const rightWing = new THREE.Group();
  rightWing.rotation.z = -0.24;
  rightWing.position.set(0.44, 0.08, 0);
  const rightCover = new THREE.Mesh(halfCoverGeo, mats.navyLeather);
  const rightPages = new THREE.Mesh(halfPageGeo, mats.creamPaper);
  rightPages.position.y = 0.055;
  rightWing.add(rightCover, rightPages);

  const centerSpine = new THREE.Mesh(spineRodGeo, mats.brushedGold);
  centerSpine.rotation.x = Math.PI / 2;

  const bookmark = new THREE.Mesh(bookmarkGeo, mats.brushedGold);
  bookmark.position.set(0.05, 0.09, 0.14);
  bookmark.rotation.y = -0.12;

  group.add(leftWing, rightWing, centerSpine, bookmark);
  return group;
}

/**
 * 3. Composite Rotating Graduation Mortarboard Cap (6 parts: beveled square board,
 *    skullcap dome, gold headband ring, top button, draped tassel cord, and tassel fringe).
 */
export function createGraduationCapGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  // Beveled square mortarboard using ExtrudeGeometry
  const size = 1.12;
  const half = size / 2;
  const boardShape = new THREE.Shape();
  boardShape.moveTo(-half, -half);
  boardShape.lineTo(half, -half);
  boardShape.lineTo(half, half);
  boardShape.lineTo(-half, half);
  boardShape.closePath();

  const boardGeo = new THREE.ExtrudeGeometry(boardShape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018,
  });
  boardGeo.rotateX(Math.PI / 2);

  const crownGeo = new THREE.CylinderGeometry(0.36, 0.42, 0.28, 24);
  const bandGeo = new THREE.TorusGeometry(0.41, 0.018, 10, 28);
  const buttonGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 16);

  const tasselCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.16, 0),
    new THREE.Vector3(0.34, 0.17, 0.22),
    new THREE.Vector3(0.58, 0.12, 0.36),
    new THREE.Vector3(0.64, -0.14, 0.42),
    new THREE.Vector3(0.66, -0.34, 0.44),
  ]);
  const cordGeo = new THREE.TubeGeometry(tasselCurve, 20, 0.015, 8, false);
  const fringeGeo = new THREE.ConeGeometry(0.055, 0.18, 12);

  geometries.push(boardGeo, crownGeo, bandGeo, buttonGeo, cordGeo, fringeGeo);

  const board = new THREE.Mesh(boardGeo, mats.navyLeather);
  board.position.y = 0.15;
  board.rotation.y = Math.PI / 4;

  const crown = new THREE.Mesh(crownGeo, mats.royalLacquer);
  crown.position.y = -0.02;

  const band = new THREE.Mesh(bandGeo, mats.brushedGold);
  band.rotation.x = Math.PI / 2;
  band.position.y = -0.14;

  const button = new THREE.Mesh(buttonGeo, mats.brushedGold);
  button.position.y = 0.175;

  const cord = new THREE.Mesh(cordGeo, mats.brushedGold);
  const fringe = new THREE.Mesh(fringeGeo, mats.brushedGold);
  fringe.position.set(0.66, -0.41, 0.44);

  group.add(board, crown, band, button, cord, fringe);
  return group;
}

/**
 * 4. Composite 3D Molecular Structure (10 parts: central nucleus sphere, 4 valence atoms,
 *    4 bond cylinders, and outer orbital ring).
 */
export function createMoleculeGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  const coreGeo = new THREE.SphereGeometry(0.24, 24, 24);
  const atomGeo = new THREE.SphereGeometry(0.14, 20, 20);
  const bondGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.62, 12);
  const orbitGeo = new THREE.TorusGeometry(0.76, 0.012, 10, 44);
  geometries.push(coreGeo, atomGeo, bondGeo, orbitGeo);

  const core = new THREE.Mesh(coreGeo, mats.royalLacquer);
  group.add(core);

  // Tetrahedral directions
  const dirs = [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0.94, -0.33, 0),
    new THREE.Vector3(-0.47, -0.33, 0.81),
    new THREE.Vector3(-0.47, -0.33, -0.81),
  ];

  const up = new THREE.Vector3(0, 1, 0);
  dirs.forEach((dir, idx) => {
    const n = dir.clone().normalize();
    const atom = new THREE.Mesh(
      atomGeo,
      idx % 2 === 0 ? mats.brushedGold : mats.warmGoldEmissive
    );
    atom.position.copy(n).multiplyScalar(0.62);
    group.add(atom);

    const bond = new THREE.Mesh(bondGeo, mats.brushedGold);
    bond.position.copy(n).multiplyScalar(0.31);
    bond.quaternion.setFromUnitVectors(up, n);
    group.add(bond);
  });

  const orbit = new THREE.Mesh(orbitGeo, mats.brushedGold);
  orbit.rotation.x = Math.PI / 3;
  orbit.rotation.y = Math.PI / 6;
  group.add(orbit);

  return group;
}

/**
 * 5. Composite 3D Hexagonal Academic Pencil (6 parts: hexagonal royal-blue barrel,
 *    gold collar ring, brass ferrule, eraser cap, sharpened cedar cone, and graphite tip).
 */
export function createPencilGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  const barrelGeo = new THREE.CylinderGeometry(0.095, 0.095, 1.32, 6);
  const collarGeo = new THREE.CylinderGeometry(0.098, 0.098, 0.06, 16);
  const ferruleGeo = new THREE.CylinderGeometry(0.097, 0.097, 0.16, 16);
  const eraserGeo = new THREE.CylinderGeometry(0.088, 0.092, 0.14, 16);
  const woodConeGeo = new THREE.ConeGeometry(0.095, 0.28, 16);
  const tipConeGeo = new THREE.ConeGeometry(0.034, 0.1, 16);
  geometries.push(barrelGeo, collarGeo, ferruleGeo, eraserGeo, woodConeGeo, tipConeGeo);

  const barrel = new THREE.Mesh(barrelGeo, mats.royalLacquer);
  const collar = new THREE.Mesh(collarGeo, mats.brushedGold);
  collar.position.y = -0.64;

  const ferrule = new THREE.Mesh(ferruleGeo, mats.brushedGold);
  ferrule.position.y = 0.74;

  const eraser = new THREE.Mesh(eraserGeo, mats.eraserRose);
  eraser.position.y = 0.88;

  const woodCone = new THREE.Mesh(woodConeGeo, mats.cedarWood);
  woodCone.rotation.x = Math.PI;
  woodCone.position.y = -0.8;

  const tipCone = new THREE.Mesh(tipConeGeo, mats.graphite);
  tipCone.rotation.x = Math.PI;
  tipCone.position.y = -0.9;

  group.add(barrel, collar, ferrule, eraser, woodCone, tipCone);
  group.rotation.z = -0.45;
  return group;
}

/**
 * 6. Composite 3D Mathematical Symbols:
 *    - 'pi': Sculpted 3D Pi symbol (5 parts)
 *    - 'sigma': Sculpted 3D Sigma summation symbol (6 parts)
 *    - 'infinity': Sculpted 3D TorusKnot + orbital ring (2 parts)
 */
export function createMathSymbolGroup(
  symbolType: 'pi' | 'sigma' | 'infinity',
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  if (symbolType === 'pi') {
    const topBarGeo = new THREE.BoxGeometry(0.84, 0.11, 0.14);
    const legGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.72, 14);
    const footGeo = new THREE.BoxGeometry(0.16, 0.06, 0.14);
    geometries.push(topBarGeo, legGeo, footGeo);

    const topBar = new THREE.Mesh(topBarGeo, mats.brushedGold);
    topBar.position.y = 0.34;

    const leftLeg = new THREE.Mesh(legGeo, mats.brushedGold);
    leftLeg.position.set(-0.2, -0.02, 0);

    const rightLeg = new THREE.Mesh(legGeo, mats.brushedGold);
    rightLeg.position.set(0.2, -0.02, 0);

    const leftFoot = new THREE.Mesh(footGeo, mats.royalLacquer);
    leftFoot.position.set(-0.22, -0.38, 0);

    const rightFoot = new THREE.Mesh(footGeo, mats.royalLacquer);
    rightFoot.position.set(0.24, -0.38, 0);

    group.add(topBar, leftLeg, rightLeg, leftFoot, rightFoot);
    return group;
  }

  if (symbolType === 'sigma') {
    const hBarGeo = new THREE.BoxGeometry(0.68, 0.1, 0.13);
    const diagGeo = new THREE.BoxGeometry(0.52, 0.09, 0.13);
    const serifGeo = new THREE.BoxGeometry(0.1, 0.16, 0.13);
    geometries.push(hBarGeo, diagGeo, serifGeo);

    const topBar = new THREE.Mesh(hBarGeo, mats.brushedGold);
    topBar.position.set(0, 0.38, 0);

    const bottomBar = new THREE.Mesh(hBarGeo, mats.brushedGold);
    bottomBar.position.set(0, -0.38, 0);

    const upperDiag = new THREE.Mesh(diagGeo, mats.royalLacquer);
    upperDiag.position.set(-0.08, 0.18, 0);
    upperDiag.rotation.z = -0.68;

    const lowerDiag = new THREE.Mesh(diagGeo, mats.royalLacquer);
    lowerDiag.position.set(-0.08, -0.18, 0);
    lowerDiag.rotation.z = 0.68;

    const topSerif = new THREE.Mesh(serifGeo, mats.brushedGold);
    topSerif.position.set(0.29, 0.32, 0);

    const bottomSerif = new THREE.Mesh(serifGeo, mats.brushedGold);
    bottomSerif.position.set(0.29, -0.32, 0);

    group.add(topBar, bottomBar, upperDiag, lowerDiag, topSerif, bottomSerif);
    return group;
  }

  // 'infinity' — TorusKnot mathematical sculpture
  const knotGeo = new THREE.TorusKnotGeometry(0.36, 0.085, 72, 14, 2, 3);
  const ringGeo = new THREE.TorusGeometry(0.62, 0.015, 10, 42);
  geometries.push(knotGeo, ringGeo);

  const knot = new THREE.Mesh(knotGeo, mats.brushedGold);
  const ring = new THREE.Mesh(ringGeo, mats.royalLacquer);
  ring.rotation.x = Math.PI / 2.5;
  group.add(knot, ring);
  return group;
}

/**
 * 7. Composite Optical Glass Sphere & Illuminated Core Orb (3 parts: inner glowing core,
 *    equatorial brushed-gold gimbal ring, and outer transmissive optical glass sphere).
 */
export function createGlassOrbGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[],
  royalCore = false
): THREE.Group {
  const group = new THREE.Group();

  const coreGeo = new THREE.SphereGeometry(0.18, 20, 20);
  const ringGeo = new THREE.TorusGeometry(0.32, 0.016, 10, 32);
  const shellGeo = new THREE.SphereGeometry(0.42, 28, 28);
  geometries.push(coreGeo, ringGeo, shellGeo);

  const core = new THREE.Mesh(
    coreGeo,
    royalCore ? mats.royalEmissive : mats.warmGoldEmissive
  );
  const ring = new THREE.Mesh(ringGeo, mats.brushedGold);
  ring.rotation.x = Math.PI / 3;

  const shell = new THREE.Mesh(shellGeo, mats.opticalGlass);
  shell.renderOrder = 2;

  group.add(core, ring, shell);
  return group;
}

/**
 * 8. Composite Knowledge Armillary & Geometric Polyhedron (7 parts: central faceted octahedron,
 *    3 nested armillary rings, and 3 cardinal gold nodes).
 */
export function createKnowledgeArmillaryGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): THREE.Group {
  const group = new THREE.Group();

  const octaGeo = new THREE.OctahedronGeometry(0.28, 0);
  const r1Geo = new THREE.TorusGeometry(0.46, 0.016, 10, 36);
  const r2Geo = new THREE.TorusGeometry(0.58, 0.014, 10, 40);
  const r3Geo = new THREE.TorusGeometry(0.7, 0.012, 10, 44);
  const nodeGeo = new THREE.SphereGeometry(0.055, 14, 14);
  geometries.push(octaGeo, r1Geo, r2Geo, r3Geo, nodeGeo);

  const centerGem = new THREE.Mesh(octaGeo, mats.royalLacquer);
  const ring1 = new THREE.Mesh(r1Geo, mats.brushedGold);
  ring1.rotation.x = 0.5;
  const ring2 = new THREE.Mesh(r2Geo, mats.brushedGold);
  ring2.rotation.y = 0.85;
  const ring3 = new THREE.Mesh(r3Geo, mats.royalLacquer);
  ring3.rotation.z = 0.65;

  const nodeA = new THREE.Mesh(nodeGeo, mats.warmGoldEmissive);
  nodeA.position.set(0.46, 0, 0);
  const nodeB = new THREE.Mesh(nodeGeo, mats.warmGoldEmissive);
  nodeB.position.set(0, 0.58, 0);
  const nodeC = new THREE.Mesh(nodeGeo, mats.warmGoldEmissive);
  nodeC.position.set(-0.7, 0, 0);

  group.add(centerGem, ring1, ring2, ring3, nodeA, nodeB, nodeC);
  return group;
}

/**
 * 9. Instanced Glowing Golden Particles with per-instance scale and warm gold color variation.
 */
export interface ParticleDatum {
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  phase: number;
  scale: number;
}

export function createGoldenParticles(
  count: number,
  spread: { x: number; y: number; z: number },
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[]
): { mesh: THREE.InstancedMesh; data: ParticleDatum[] } {
  const geo = new THREE.OctahedronGeometry(0.045, 0);
  geometries.push(geo);

  const mesh = new THREE.InstancedMesh(geo, mats.warmGoldEmissive, count);
  mesh.frustumCulled = false;

  const data: ParticleDatum[] = [];
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const palette = [0xf2b84b, 0xf6c96e, 0xffe29a, 0x608df8];

  for (let i = 0; i < count; i++) {
    // Deterministic golden-ratio distribution
    const t = (i + 0.5) / count;
    const angle = i * 2.399963;
    const baseX = Math.cos(angle) * Math.sqrt(t) * spread.x;
    const baseY = ((i * 1.6180339) % 1 - 0.5) * 2 * spread.y;
    const baseZ = Math.sin(angle) * Math.sqrt(t) * spread.z;
    const scale = 0.65 + ((i * 7) % 10) * 0.08;

    data.push({
      baseX,
      baseY,
      baseZ,
      speed: 0.35 + (i % 5) * 0.12,
      phase: i * 0.73,
      scale,
    });

    dummy.position.set(baseX, baseY, baseZ);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    color.setHex(palette[i % palette.length]);
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.computeBoundingSphere();

  return { mesh, data };
}

/**
 * 10. Hyper-Realistic B-DNA Double Helix Molecule.
 * Scientifically informed geometry:
 * - Two antiparallel spiraling sugar-phosphate backbones offset by 138 degrees to form authentic Major & Minor Grooves.
 * - Smooth continuous Catmull-Rom tube ribbons.
 * - Alternating PO4 phosphate & deoxyribose atomic nodes.
 * - Intercalated base-pair rungs (A=T with 2 hydrogen bonds, G≡C with 3 hydrogen bonds).
 * - Surrounding hydration counter-ion particles & bioluminescent quantum dots.
 */
export function createHyperRealisticDNAGroup(
  mats: AcademicMaterialSet,
  geometries: THREE.BufferGeometry[],
  isCompact = false
): THREE.Group {
  const group = new THREE.Group();

  const height = isCompact ? 5.8 : 8.8;
  const radius = isCompact ? 1.15 : 1.45;
  const turns = isCompact ? 1.9 : 2.6;
  const samplesPerTurn = 48;
  const totalSamples = Math.floor(turns * samplesPerTurn);
  const minorGrooveOffset = 2.41; // ~138 degrees offset creating authentic Major & Minor grooves!

  const strand1Points: THREE.Vector3[] = [];
  const strand2Points: THREE.Vector3[] = [];

  for (let i = 0; i <= totalSamples; i++) {
    const t = i / totalSamples;
    const y = (t - 0.5) * height;
    const angle = t * turns * Math.PI * 2;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    strand1Points.push(new THREE.Vector3(x1, y, z1));

    const x2 = Math.cos(angle + minorGrooveOffset) * radius;
    const z2 = Math.sin(angle + minorGrooveOffset) * radius;
    strand2Points.push(new THREE.Vector3(x2, y, z2));
  }

  const curve1 = new THREE.CatmullRomCurve3(strand1Points);
  const curve2 = new THREE.CatmullRomCurve3(strand2Points);

  const tubeGeo1 = new THREE.TubeGeometry(curve1, isCompact ? 68 : 116, 0.09, 12, false);
  const tubeGeo2 = new THREE.TubeGeometry(curve2, isCompact ? 68 : 116, 0.09, 12, false);
  geometries.push(tubeGeo1, tubeGeo2);

  // Strand 1 and 2 continuous backbone tubes in bioluminescent amethyst glass
  const strandMesh1 = new THREE.Mesh(tubeGeo1, mats.amethystGlass);
  const strandMesh2 = new THREE.Mesh(tubeGeo2, mats.amethystGlass);
  group.add(strandMesh1, strandMesh2);

  // Alternating Phosphate (PO4) & Deoxyribose Sugar Nodes along both backbones
  const nodeCount = isCompact ? 24 : 38;
  const sphereGeoPhosphate = new THREE.SphereGeometry(0.135, 14, 14);
  const sphereGeoSugar = new THREE.SphereGeometry(0.115, 12, 12);
  const baseRodGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 10);
  const hBondNodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
  geometries.push(sphereGeoPhosphate, sphereGeoSugar, baseRodGeo, hBondNodeGeo);

  for (let i = 0; i < nodeCount; i++) {
    const t = i / (nodeCount - 1);
    const p1 = curve1.getPoint(t);
    const p2 = curve2.getPoint(t);

    const isPhosphate = i % 2 === 0;
    const mat1 = isPhosphate ? mats.brushedGold : mats.royalLacquer;
    const mat2 = isPhosphate ? mats.bioCyanEmissive : mats.neonVioletEmissive;

    const n1 = new THREE.Mesh(isPhosphate ? sphereGeoPhosphate : sphereGeoSugar, mat1);
    n1.position.copy(p1);
    const n2 = new THREE.Mesh(isPhosphate ? sphereGeoPhosphate : sphereGeoSugar, mat2);
    n2.position.copy(p2);
    group.add(n1, n2);
  }

  // Intercalated Nitrogenous Base Pairs (A-T, G-C)
  const basePairCount = isCompact ? 18 : 28;
  const dummyZ = new THREE.Vector3(0, 1, 0);

  for (let b = 0; b < basePairCount; b++) {
    const t = (b + 0.5) / basePairCount;
    const p1 = curve1.getPoint(t);
    const p2 = curve2.getPoint(t);

    const fullVector = new THREE.Vector3().subVectors(p2, p1);
    const length = fullVector.length();
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

    // Biological base pair types: A=T (2 H-bonds) or G≡C (3 H-bonds)
    const pairType = b % 4; // 0: A-T, 1: G-C, 2: T-A, 3: C-G
    let matLeft: THREE.Material;
    let matRight: THREE.Material;
    let hBondCount = 2;

    switch (pairType) {
      case 0:
        matLeft = mats.adenineFuchsia;
        matRight = mats.thymineCyan;
        hBondCount = 2;
        break;
      case 1:
        matLeft = mats.guanineEmerald;
        matRight = mats.cytosinePurple;
        hBondCount = 3;
        break;
      case 2:
        matLeft = mats.thymineCyan;
        matRight = mats.adenineFuchsia;
        hBondCount = 2;
        break;
      default:
        matLeft = mats.cytosinePurple;
        matRight = mats.guanineEmerald;
        hBondCount = 3;
        break;
    }

    // Left base cylinder (from p1 to midPoint * 0.9)
    const halfLen = length * 0.44;
    const leftMid = new THREE.Vector3().copy(p1).addScaledVector(fullVector, 0.22);
    const rightMid = new THREE.Vector3().copy(p2).addScaledVector(fullVector, -0.22);

    const leftRod = new THREE.Mesh(baseRodGeo, matLeft);
    leftRod.position.copy(leftMid);
    leftRod.scale.set(1, halfLen, 1);
    leftRod.quaternion.setFromUnitVectors(dummyZ, fullVector.clone().normalize());

    const rightRod = new THREE.Mesh(baseRodGeo, matRight);
    rightRod.position.copy(rightMid);
    rightRod.scale.set(1, halfLen, 1);
    rightRod.quaternion.setFromUnitVectors(dummyZ, fullVector.clone().normalize());

    group.add(leftRod, rightRod);

    // Hydrogen bond nodes in center
    const perp = new THREE.Vector3(0, 1, 0).cross(fullVector).normalize();
    for (let h = 0; h < hBondCount; h++) {
      const hNode = new THREE.Mesh(hBondNodeGeo, mats.hydrogenBondMat);
      const hOffset = (h - (hBondCount - 1) / 2) * 0.085;
      hNode.position.copy(midPoint).addScaledVector(perp, hOffset);
      group.add(hNode);
    }
  }

  // Hydration shell & bio-luminescent counter ions floating around grooves
  const ionCount = isCompact ? 20 : 34;
  const ionGeo = new THREE.SphereGeometry(0.048, 8, 8);
  geometries.push(ionGeo);
  for (let k = 0; k < ionCount; k++) {
    const frac = k / ionCount;
    const pt = curve1.getPoint(frac);
    const pt2 = curve2.getPoint(frac);
    const ion = new THREE.Mesh(ionGeo, k % 2 === 0 ? mats.bioCyanEmissive : mats.warmGoldEmissive);
    const angle = k * 1.618;
    const radialDist = 0.45 + (k % 3) * 0.24;
    ion.position.set(
      (pt.x + pt2.x) * 0.5 + Math.cos(angle) * radialDist,
      (pt.y + pt2.y) * 0.5 + (k % 2 === 0 ? 0.12 : -0.12),
      (pt.z + pt2.z) * 0.5 + Math.sin(angle) * radialDist
    );
    group.add(ion);
  }

  return group;
}

