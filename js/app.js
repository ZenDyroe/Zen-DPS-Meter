const state = {
  lastUpdate: null,
  hasOverlayData: false,
  mockPreviewInterval: null,
};

const overlayModeState = {
  mode: "dps",
};

const OVERLAY_MODES = [
  "dps",
  "hps",
  "dtps",
];

const JOB_COLORS = {
  // Tanks
  PLD: ["rgba(168, 215, 255, 0.95)", "rgba(168, 215, 255, 0.35)"],
  WAR: ["rgba(190, 38, 38, 0.95)", "rgba(190, 38, 38, 0.35)"],
  DRK: ["rgba(92, 54, 130, 0.95)", "rgba(92, 54, 130, 0.35)"],
  GNB: ["rgba(120, 120, 120, 0.95)", "rgba(120, 120, 120, 0.35)"],

  // Healers
  WHM: ["rgba(235, 235, 220, 0.95)", "rgba(235, 235, 220, 0.3)"],
  SCH: ["rgba(95, 130, 255, 0.95)", "rgba(95, 130, 255, 0.35)"],
  AST: ["rgba(255, 214, 102, 0.95)", "rgba(255, 214, 102, 0.35)"],
  SGE: ["rgba(105, 230, 220, 0.95)", "rgba(105, 230, 220, 0.35)"],

  // Melee
  MNK: ["rgba(214, 156, 70, 0.95)", "rgba(214, 156, 70, 0.35)"],
  DRG: ["rgba(65, 95, 210, 0.95)", "rgba(65, 95, 210, 0.35)"],
  NIN: ["rgba(90, 45, 145, 0.95)", "rgba(90, 45, 145, 0.35)"],
  SAM: ["rgba(210, 55, 55, 0.95)", "rgba(210, 55, 55, 0.35)"],
  RPR: ["rgba(80, 30, 95, 0.95)", "rgba(80, 30, 95, 0.35)"],
  VPR: ["rgba(45, 175, 95, 0.95)", "rgba(45, 175, 95, 0.35)"],

  // Physical ranged
  BRD: ["rgba(145, 190, 80, 0.95)", "rgba(145, 190, 80, 0.35)"],
  MCH: ["rgba(90, 190, 210, 0.95)", "rgba(90, 190, 210, 0.35)"],
  DNC: ["rgba(230, 115, 185, 0.95)", "rgba(230, 115, 185, 0.35)"],

  // Casters
  BLM: ["rgba(115, 65, 210, 0.95)", "rgba(115, 65, 210, 0.35)"],
  SMN: ["rgba(40, 150, 90, 0.95)", "rgba(40, 150, 90, 0.35)"],
  RDM: ["rgba(205, 55, 95, 0.95)", "rgba(205, 55, 95, 0.35)"],
  PCT: ["rgba(255, 120, 210, 0.95)", "rgba(255, 120, 210, 0.35)"],

  // Limited
  BLU: ["rgba(45, 125, 230, 0.95)", "rgba(45, 125, 230, 0.35)"],

  // Base tank
  GLA: ["rgba(168, 215, 255, 0.95)", "rgba(168, 215, 255, 0.35)"],
  MRD: ["rgba(190, 38, 38, 0.95)", "rgba(190, 38, 38, 0.35)"],

  // Base healer
  CNJ: ["rgba(235, 235, 220, 0.95)", "rgba(235, 235, 220, 0.30)"],

  // Base melee
  PGL: ["rgba(214, 156, 70, 0.95)", "rgba(214, 156, 70, 0.35)"],
  LNC: ["rgba(65, 95, 210, 0.95)", "rgba(65, 95, 210, 0.35)"],
  ROG: ["rgba(90, 45, 145, 0.95)", "rgba(90, 45, 145, 0.35)"],

  // Base physical ranged
  ARC: ["rgba(145, 190, 80, 0.95)", "rgba(145, 190, 80, 0.35)"],

  // Base casters
  THM: ["rgba(115, 65, 210, 0.95)", "rgba(115, 65, 210, 0.35)"],
  ACN: ["rgba(40, 150, 90, 0.95)", "rgba(40, 150, 90, 0.35)"],
};

const ROLE_BY_JOB = {
  PLD: "tank",
  WAR: "tank",
  DRK: "tank",
  GNB: "tank",
  GLA: "tank",
  MRD: "tank",

  WHM: "healer",
  SCH: "healer",
  AST: "healer",
  SGE: "healer",
  CNJ: "healer",

  MNK: "melee",
  DRG: "melee",
  NIN: "melee",
  SAM: "melee",
  RPR: "melee",
  VPR: "melee",
  PGL: "melee",
  LNC: "melee",
  ROG: "melee",

  BRD: "ranged",
  MCH: "ranged",
  DNC: "ranged",
  ARC: "ranged",

  BLM: "caster",
  SMN: "caster",
  RDM: "caster",
  PCT: "caster",
  BLU: "caster",
  THM: "caster",
  ACN: "caster",
};

const ROLE_COLORS = {
  tank: ["rgba(74, 144, 226, 0.95)", "rgba(74, 144, 226, 0.35)"],
  healer: ["rgba(85, 200, 118, 0.95)", "rgba(85, 200, 118, 0.35)"],
  melee: ["rgba(224, 82, 82, 0.95)", "rgba(224, 82, 82, 0.35)"],
  ranged: ["rgba(235, 170, 68, 0.95)", "rgba(235, 170, 68, 0.35)"],
  caster: ["rgba(164, 102, 226, 0.95)", "rgba(164, 102, 226, 0.35)"],
};

const SECONDARY_WINDOWS_STORAGE_KEY = "secondaryWindows";
const MAIN_WINDOW_SIZE_STORAGE_KEY = "mainWindowSize";
const DEFAULT_MAIN_WINDOW_SIZE = {
  width: 360,
  height: 180,
};

const DEFAULT_SETTINGS = {
  obscureNames: false,
  showRanks: true,
  showDeaths: false,
  showFooter: true,
  alwaysShowPlayer: false,
  showMeterBg: true,
  meterBgColor: "#050608",
  meterBgOpacity: "0.88",
  barColorMode: "job",
  barCustomColor: "#4974C4",
  barHeight: 24,
  barMaximum: 8,
};

const settingsState = {
  obscureNames:
    localStorage.getItem("obscureNames") === "true",

  showRanks:
    localStorage.getItem("showRanks") !== "false",

  showDeaths:
    localStorage.getItem("showDeaths") === "true",

  showFooter:
    localStorage.getItem("showFooter") !== "false",

  alwaysShowPlayer:
    localStorage.getItem("alwaysShowPlayer") === "true",

  showMeterBg:
    localStorage.getItem("showMeterBg") !== "false",

  meterBgColor:
    localStorage.getItem("meterBgColor") || DEFAULT_SETTINGS.meterBgColor,

  meterBgOpacity:
    localStorage.getItem("meterBgOpacity") || DEFAULT_SETTINGS.meterBgOpacity,

  barColorMode:
    localStorage.getItem("barColorMode") || DEFAULT_SETTINGS.barColorMode,

  barCustomColor:
    localStorage.getItem("barCustomColor") || DEFAULT_SETTINGS.barCustomColor,

  barHeight:
    clampBarHeight(Number(localStorage.getItem("barHeight")) || DEFAULT_SETTINGS.barHeight),

  barMaximum:
    clampBarMaximum(Number(localStorage.getItem("barMaximum")) || DEFAULT_SETTINGS.barMaximum),
};

function clampBarHeight(value) {
  if (!Number.isFinite(value)) return DEFAULT_SETTINGS.barHeight;
  return Math.max(16, Math.min(44, Math.round(value)));
}

function clampBarMaximum(value) {
  if (!Number.isFinite(value)) return DEFAULT_SETTINGS.barMaximum;
  return Math.max(1, Math.min(24, Math.round(value)));
}

function getCombatantsMaxHeight() {
  const rowHeight = clampBarHeight(settingsState.barHeight);
  const maximumRows = clampBarMaximum(settingsState.barMaximum);
  const rowGap = 2;
  const headerHeight = 9;

  return headerHeight + (maximumRows * rowHeight) + (maximumRows * rowGap);
}

function applyOverlaySettings() {
  const bgColorRgb = hexToRgb(settingsState.meterBgColor);
  const overlayBg = `rgba(${bgColorRgb}, ${settingsState.meterBgOpacity})`;

  document.querySelectorAll(".meter-window").forEach((meterWindow) => {
    meterWindow.classList.toggle("hide-ranks", !settingsState.showRanks);
    meterWindow.classList.toggle("show-deaths", settingsState.showDeaths);
    meterWindow.classList.toggle("hide-footer", !settingsState.showFooter);
    meterWindow.classList.toggle("no-meter-bg", !settingsState.showMeterBg);
    meterWindow.style.setProperty("--meter-bg-color", bgColorRgb);
    meterWindow.style.setProperty("--meter-bg-opacity", settingsState.meterBgOpacity);
    meterWindow.style.setProperty("--bg", overlayBg);
    meterWindow.style.setProperty("--row-height", `${clampBarHeight(settingsState.barHeight)}px`);

    const combatants = meterWindow.querySelector(".combatants");
    if (combatants) {
      combatants.style.maxHeight = `${getCombatantsMaxHeight()}px`;
      updatePinnedPlayerState(combatants);
    }
  });
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  return `${r || 0}, ${g || 0}, ${b || 0}`;
}

function rgbToHex(r, g, b) {
  const toHex = (value) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsv(r, g, b) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === red) {
      h = ((green - blue) / delta) % 6;
    } else if (max === green) {
      h = (blue - red) / delta + 2;
    } else {
      h = (red - green) / delta + 4;
    }
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  return {
    h,
    s: max === 0 ? 0 : delta / max,
    v: max,
  };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (h < 60) {
    red = c;
    green = x;
  } else if (h < 120) {
    red = x;
    green = c;
  } else if (h < 180) {
    green = c;
    blue = x;
  } else if (h < 240) {
    green = x;
    blue = c;
  } else if (h < 300) {
    red = x;
    blue = c;
  } else {
    red = c;
    blue = x;
  }

  return {
    r: (red + m) * 255,
    g: (green + m) * 255,
    b: (blue + m) * 255,
  };
}

function getJobGradient(job) {
  const colors = JOB_COLORS[job] || [
    "rgba(73, 116, 196, 0.95)",
    "rgba(73, 116, 196, 0.35)",
  ];

  return `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
}

function getJobTextColor(job) {
  const colors = JOB_COLORS[job] || [
    "rgba(73, 116, 196, 0.95)",
    "rgba(73, 116, 196, 0.35)",
  ];

  return colors[0].replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, "rgb($1, $2, $3)");
}

function getColorGradient(color) {
  const clean = String(color).replace("#", "");
  const r = Number(`0x${clean.substring(0, 2)}`) || 0;
  const g = Number(`0x${clean.substring(2, 4)}`) || 0;
  const b = Number(`0x${clean.substring(4, 6)}`) || 0;
  const rgb = `${r}, ${g}, ${b}`;
  return `linear-gradient(90deg, rgba(${rgb}, 0.95), rgba(${rgb}, 0.35))`;
}

function getRoleGradient(job) {
  const role = ROLE_BY_JOB[job];
  const colors = ROLE_COLORS[role] || [
    "rgba(73, 116, 196, 0.95)",
    "rgba(73, 116, 196, 0.35)",
  ];

  return `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
}

function getBarGradient(job) {
  switch (settingsState.barColorMode) {
    case "role":
      return getRoleGradient(job);
    case "custom":
      return getColorGradient(settingsState.barCustomColor);
    default:
      return getJobGradient(job);
  }
}

function numberFromACT(value) {
  if (value === undefined || value === null) return 0;
  const cleaned = String(value).replace(/,/g, "").replace("%", "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value) {
  return Math.round(numberFromACT(value)).toLocaleString();
}

function getCombatantDamagePct(combatant) {
  return (
    combatant.DamagePerc ??
    combatant.damagePerc ??
    combatant.damagePct ??
    combatant["damage%"] ??
    combatant["damagePct"] ??
    ""
  );
}

function getCombatantName(combatant) {
  return String(combatant.name ?? combatant.Name ?? combatant.NAME ?? combatant.__name ?? "").trim();
}

function isPlayerCombatant(combatant) {
  const name = getCombatantName(combatant).toLowerCase();
  return (
    name === "you" ||
    name === "yourself" ||
    combatant.isSelf === true ||
    combatant.IsSelf === true ||
    combatant.isLocalPlayer === true ||
    combatant.IsLocalPlayer === true ||
    combatant.isMe === true ||
    combatant.IsMe === true
  );
}

function hasDamageShare(combatant) {
  const damagePct = getCombatantDamagePct(combatant);
  if (damagePct === undefined || damagePct === null) return false;

  const normalized = String(damagePct).trim();
  if (!normalized || normalized === "-" || normalized === "--" || normalized.toLowerCase() === "nan") {
    return false;
  }

  return numberFromACT(normalized) > 0;
}

function getCombatantDeaths(combatant) {
  return numberFromACT(
    combatant.deaths ??
    combatant.Deaths ??
    combatant.death ??
    combatant.Death ??
    combatant.KO ??
    combatant.ko ??
    0
  );
}

function getJob(combatant) {
  const raw =
    combatant.Job ||
    combatant.job ||
    combatant.JobAbbr ||
    "";

  return String(raw).toUpperCase();
}

function normalizeRows(combatants) {
  const rows = Array.isArray(combatants)
    ? combatants
    : Object.entries(combatants || {}).map(([name, combatant]) => ({
        __name: name,
        ...combatant,
      }));

  return rows
    .filter((combatant) => combatant && getCombatantName(combatant))
    .filter((combatant) => getCombatantName(combatant) !== "Limit Break");
}

let lastGoodEncounterTitle = "Current Encounter";
let lastGoodEncounterLocation = "";

function getEncounterTitle(encounter) {
  const rawTitle =
    encounter.title ||
    encounter.Title ||
    encounter.encounter ||
    encounter.Encounter ||
    encounter.CurrentZoneName ||
    encounter.zone ||
    "";

  const title = String(rawTitle).trim();

  const badTitles = [
    "",
    "Encounter",
    "Current Encounter",
    "Unknown",
  ];

  if (!badTitles.includes(title)) {
    lastGoodEncounterTitle = title;
  }

  return lastGoodEncounterTitle;
}

function getEncounterLocation(encounter) {
  const rawLocation =
    encounter.CurrentZoneName ||
    encounter.ZoneName ||
    encounter.zoneName ||
    encounter.zone ||
    encounter.Zone ||
    encounter.area ||
    encounter.Area ||
    "";

  const location = String(rawLocation).trim();

  if (location && location !== "Unknown") {
    lastGoodEncounterLocation = location;
  }

  return lastGoodEncounterLocation || "Unknown location";
}

function updateMeterChrome(meterRoot, encounter, rows) {
  const title = getEncounterTitle(encounter);
  const location = getEncounterLocation(encounter);
  const raidDps = rows.reduce(
    (total, combatant) => total + getCombatantValue(combatant, "dps"),
    0
  );
  const duration = encounter.duration || encounter.DURATION || "00:00";
  const titleElement = meterRoot.querySelector(".title");
  const timeElement = meterRoot.querySelector(".encounter-time");
  const locationElement = meterRoot.querySelector(".encounter-location");
  const statusElement = meterRoot.querySelector(".status");
  const topValue = meterRoot.querySelector(".top-stat-value");
  const topLabel = meterRoot.querySelector(".top-stat-label");

  if (titleElement) titleElement.textContent = title;
  if (timeElement) timeElement.textContent = duration;
  if (locationElement) locationElement.textContent = location;
  if (statusElement) statusElement.textContent = `${rows.length} combatants`;

  if (topValue && topLabel) {
    topValue.textContent = raidDps > 0 ? formatNumber(raidDps) : "-";
    topLabel.textContent = "Total DPS";
  }
}

function getMeterMode(meterRoot) {
  if (meterRoot?.id === "overlay") {
    return overlayModeState.mode;
  }

  return meterRoot?.dataset.mode || "dps";
}

function setMeterMode(meterRoot, mode) {
  if (meterRoot?.id === "overlay") {
    overlayModeState.mode = mode;
  } else if (meterRoot) {
    meterRoot.dataset.mode = mode;
  }
}

function createHeaderRow() {
  const header = document.createElement("article");
  header.className = "row row-header";
  header.innerHTML = `
    <div class="rank"></div>
    <div class="job"></div>
    <div class="name">Name</div>
    <div class="dps">DPS</div>
    <div class="percent">%</div>
  `;
  return header;
}

function createCombatantRow() {
  const row = document.createElement("article");
  row.className = "row";
  row.innerHTML = `
    <div class="bar"></div>
    <div class="rank"></div>
    <div class="job">
      <img onerror="this.style.display='none'" />
    </div>
    <div class="name"></div>
    <div class="dps"></div>
    <div class="percent"></div>
  `;

  row.addEventListener("mouseenter", (event) => {
    showCombatantTooltip(event, row.combatant, row.job, row.meterMode);
  });

  row.addEventListener("mousemove", moveCombatantTooltip);
  row.addEventListener("mouseleave", hideCombatantTooltip);

  return row;
}

function getMeterStore(meterRoot) {
  if (!meterRoot.meterStore) {
    meterRoot.meterStore = {
      headerRow: null,
      rowElements: {},
      hasPinnedScrollListener: false,
    };
  }

  return meterRoot.meterStore;
}

function updatePinnedPlayerState(container) {
  const pinnedRow = container.querySelector(".row.player-pinned");
  if (!pinnedRow) return;

  const rankIndex = Number(pinnedRow.dataset.rankIndex);
  if (!Number.isFinite(rankIndex)) {
    pinnedRow.classList.remove("player-pinned-active");
    return;
  }

  const rowHeight = clampBarHeight(settingsState.barHeight);
  const rowGap = 2;
  const headerHeight = 9;
  const naturalTop = headerHeight + (rankIndex * (rowHeight + rowGap));
  const stickyThreshold = naturalTop - (container.clientHeight - rowHeight);
  const isPinnedAwayFromRank = container.scrollTop < stickyThreshold - 1;

  pinnedRow.classList.toggle("player-pinned-active", isPinnedAwayFromRank);
}

function renderRowsForMeter(meterRoot, rows, options = {}) {
  const container = meterRoot.querySelector(".combatants");
  if (!container) return;

  const meterStore = getMeterStore(meterRoot);
  const meterMode = getMeterMode(meterRoot);
  const snap = options.snap === true;
  container.classList.toggle("snap-bars", snap);

  if (!meterStore.hasPinnedScrollListener) {
    container.addEventListener("scroll", () => {
      updatePinnedPlayerState(container);
    });
    meterStore.hasPinnedScrollListener = true;
  }

  if (!meterStore.headerRow) {
    meterStore.headerRow = createHeaderRow();
  }

  container.appendChild(meterStore.headerRow);

  const sortedRows = [...rows].sort(
    (a, b) => getCombatantValue(b, meterMode) - getCombatantValue(a, meterMode)
  );
  const values = sortedRows.map((combatant) => getCombatantValue(combatant, meterMode));
  const topValue = Math.max(...values, 1);
  const seenRowKeys = new Set();

  sortedRows.forEach((combatant, index) => {
    const value = values[index];
    const barWidth = Math.min((value / topValue) * 100, 100);
    const job = getJob(combatant);
    const combatantName = getCombatantName(combatant);
    const rowKey = combatantName;

    let row = meterStore.rowElements[rowKey];
    if (!row) {
      row = createCombatantRow();
      meterStore.rowElements[rowKey] = row;
    }

    seenRowKeys.add(rowKey);
    row.combatant = combatant;
    row.job = job;
    row.meterMode = meterMode;
    row.style.setProperty("--job-bar", getBarGradient(job));

    const isPlayer = isPlayerCombatant(combatant);
    const isPinnedPlayer =
      settingsState.alwaysShowPlayer &&
      isPlayer &&
      index + 1 > clampBarMaximum(settingsState.barMaximum);

    row.classList.toggle("player-row", isPlayer);
    row.classList.toggle("player-pinned", isPinnedPlayer);
    row.classList.remove("player-pinned-active");
    row.dataset.rankIndex = String(index);

    const bar = row.querySelector(".bar");
    const rank = row.querySelector(".rank");
    const icon = row.querySelector(".job img");
    const name = row.querySelector(".name");
    const valueCell = row.querySelector(".dps");
    const percent = row.querySelector(".percent");

    if (bar) bar.style.width = `${barWidth}%`;
    if (rank) rank.textContent = `#${index + 1}`;
    if (icon && job) {
      icon.src = `./icons/${job}.png`;
      icon.alt = job;
      icon.style.display = "";
    }
    if (name) {
      const displayName = getDisplayName(combatant, job);
      const deathCount = getCombatantDeaths(combatant);
      name.textContent = displayName;
      name.title = combatantName;

      if (settingsState.showDeaths && deathCount > 0) {
        const deathMarker = document.createElement("span");
        deathMarker.className = "death-marker";
        deathMarker.textContent = `☠ ${deathCount}`;
        name.appendChild(deathMarker);
      }
    }
    if (valueCell) valueCell.textContent = formatNumber(value);
    if (percent) percent.textContent = getCombatantDamagePct(combatant);

    container.appendChild(row);
  });

  Object.keys(meterStore.rowElements).forEach((rowKey) => {
    if (seenRowKeys.has(rowKey)) return;
    meterStore.rowElements[rowKey].remove();
    delete meterStore.rowElements[rowKey];
  });

  if (snap) {
    requestAnimationFrame(() => {
      container.classList.remove("snap-bars");
      updatePinnedPlayerState(container);
    });
  }

  updatePinnedPlayerState(container);
}

function renderRows(rows, options = {}) {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    renderRowsForMeter(overlay, rows, options);
  }

  document.querySelectorAll(".secondary-window").forEach((meterRoot) => {
    renderRowsForMeter(meterRoot, rows, options);
  });
}

function getModeLabel(mode) {
  switch (mode) {
    case "hps":
      return "HPS";
    case "dtps":
      return "DTPS";
    default:
      return "DPS";
  }
}

function getCombatantValue(combatant, mode = overlayModeState.mode) {
  switch (mode) {

    case "hps":
      return numberFromACT(
        combatant.ENCHPS ||
        combatant.EncHPS ||
        combatant.encHPS ||
        combatant.HPS ||
        combatant.healedps ||
        0
      );

    case "dtps":
      return numberFromACT(
        combatant.DamageTaken ||
        combatant["damageTaken"] ||
        combatant.damagetaken ||
        combatant.DTPS ||
        0
      );

    default:
      return numberFromACT(
        combatant.ENCDPS ||
        combatant.EncDPS ||
        combatant.encdps ||
        combatant.encDPS ||
        combatant.DPS ||
        0
      );
  }
}

function getCombatantField(combatant, keys) {
  for (const key of keys) {
    const value = combatant[key];

    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }

  return "";
}

function getStatPercent(combatant, keys) {
  return getCombatantField(combatant, keys) || "-";
}

function getStatValue(combatant, keys, fallback = "-") {
  const value = getCombatantField(combatant, keys);
  return value || fallback;
}

function getNumericStatValue(combatant, keys) {
  const value = getCombatantField(combatant, keys);
  return numberFromACT(value);
}

function formatTooltipNumber(value) {
  return value > 0 ? formatNumber(value) : "-";
}

function formatTooltipPercent(value) {
  return `${Math.round(value)}%`;
}

function buildCombatantTooltip(combatant, job, mode = overlayModeState.mode) {
  const crit = getStatPercent(combatant, [
    "crithit%",
    "critHitPct",
    "crit%",
    "CritHitPct",
    "CRIT%",
  ]);

  const direct = getStatPercent(combatant, [
    "DirectHitPct",
    "directHitPct",
    "directhit%",
    "dhit%",
    "DH%",
  ]);

  const directCrit = getStatPercent(combatant, [
    "DirectCritHitPct",
    "directCritHitPct",
    "directcrithit%",
    "CritDirectHitPct",
    "CDH%",
  ]);

  const damage = getStatValue(combatant, [
    "damage",
    "Damage",
    "damageTotal",
    "DamageTotal",
    "enchitdamage",
    "ENCHITDamage",
  ]);

  const totalDamage = getNumericStatValue(combatant, [
    "damage",
    "Damage",
    "damageTotal",
    "DamageTotal",
    "enchitdamage",
    "ENCHITDamage",
  ]);

  const petDamage = getNumericStatValue(combatant, [
    "petDamage",
    "PetDamage",
    "petdamage",
    "petDmg",
    "PetDmg",
    "petsDamage",
    "PetsDamage",
    "damagePet",
    "DamagePet",
  ]);

  const playerDamage = Math.max(totalDamage - petDamage, 0);
  const breakdownTotal = Math.max(playerDamage + petDamage, 1);
  const playerDamagePct = Math.min((playerDamage / breakdownTotal) * 100, 100);
  const petDamagePct = Math.min((petDamage / breakdownTotal) * 100, 100);

  const maxHit = getStatValue(combatant, [
    "maxhit",
    "maxHit",
    "MaxHit",
    "MAXHIT",
    "biggestHit",
    "BiggestHit",
  ]);

  const deaths = getCombatantDeaths(combatant);
  const deathText = deaths > 0 ? `☠ ${deaths}` : "-";
  const displayName = getDisplayName(combatant, job);
  const statRows = [
    ["Damage", damage],
    [getModeLabel(mode), formatNumber(getCombatantValue(combatant, mode))],
    ["Share", getCombatantDamagePct(combatant) || "-"],
    ["Deaths", deathText],
    ["Critical Hit", crit],
    ["Direct Hit", direct],
    ["Direct Crit", directCrit],
    ["Max Hit", maxHit],
  ];

  return `
    <div class="tooltip-header">
      <div class="tooltip-name">${displayName}</div>
      <div class="tooltip-job">${job || "Unknown"}</div>
    </div>

    <div class="tooltip-separator"></div>

    <div class="tooltip-breakdown">
      <div class="tooltip-breakdown-row">
        <div class="tooltip-breakdown-meta">
          <span>Player Damage</span>
          <strong>${formatTooltipPercent(playerDamagePct)}</strong>
        </div>
        <div class="tooltip-mini-bar">
          <span class="tooltip-mini-bar-fill player" style="width: ${playerDamagePct}%"></span>
        </div>
      </div>

      ${petDamage > 0 ? `
        <div class="tooltip-breakdown-row">
          <div class="tooltip-breakdown-meta">
            <span>Pet Damage</span>
            <strong>${formatTooltipPercent(petDamagePct)}</strong>
          </div>
          <div class="tooltip-mini-bar">
            <span class="tooltip-mini-bar-fill pet" style="width: ${petDamagePct}%"></span>
          </div>
        </div>
      ` : ""}
    </div>

    <div class="tooltip-grid">
      ${statRows.map(([label, value]) => `
        <div class="tooltip-stat">
          <span class="tooltip-label">${label}</span>
          <span class="tooltip-value">${value}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function showCombatantTooltip(event, combatant, job, mode) {
  const tooltip = document.getElementById("combatant-tooltip");
  if (!tooltip) return;

  tooltip.style.setProperty("--tooltip-job-color", getJobTextColor(job));
  tooltip.innerHTML = buildCombatantTooltip(combatant, job, mode);
  tooltip.classList.remove("hidden");

  moveCombatantTooltip(event);
}

function moveCombatantTooltip(event) {
  const tooltip = document.getElementById("combatant-tooltip");
  if (!tooltip || tooltip.classList.contains("hidden")) return;

  const offset = 12;
  const rect = tooltip.getBoundingClientRect();

  let left = event.clientX + offset;
  let top = event.clientY + offset;

  if (left + rect.width > window.innerWidth) {
    left = event.clientX - rect.width - offset;
  }

  if (top + rect.height > window.innerHeight) {
    top = event.clientY - rect.height - offset;
  }

  tooltip.style.left = `${Math.max(4, left)}px`;
  tooltip.style.top = `${Math.max(4, top)}px`;
}

function hideCombatantTooltip() {
  const tooltip = document.getElementById("combatant-tooltip");
  if (!tooltip) return;

  tooltip.classList.add("hidden");
}

function updateOverlay(data) {
  const encounter = data.Encounter || {};
  const rows = normalizeRows(data.Combatant);
  const overlay = document.getElementById("overlay");

  state.lastRows = rows;
  state.lastEncounter = encounter;
  if (overlay) {
    overlay.classList.toggle("is-empty", rows.length === 0);
    updateMeterChrome(overlay, encounter, rows);
  }
  document.querySelectorAll(".secondary-window").forEach((meterRoot) => {
    meterRoot.classList.toggle("is-empty", rows.length === 0);
    updateMeterChrome(meterRoot, encounter, rows);
  });
  renderRows(rows);

  state.lastUpdate = new Date();
}

function refreshRows(options = {}) {
  if (state.lastRows) {
    renderRows(state.lastRows, options);
  }
}

function updateModeButtons() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    const button = overlay.querySelector(".mode-button");
    if (button) button.textContent = getModeLabel(getMeterMode(overlay));
  }

  document.querySelectorAll(".secondary-window").forEach((meterRoot) => {
    const button = meterRoot.querySelector(".mode-button");
    if (button) button.textContent = getModeLabel(getMeterMode(meterRoot));
  });
}

function syncAllMeterChrome() {
  const encounter = state.lastEncounter || {};
  const rows = state.lastRows || [];

  document.querySelectorAll(".secondary-window").forEach((meterRoot) => {
    updateMeterChrome(meterRoot, encounter, rows);
  });
}

function cycleMeterMode(meterRoot) {
  const currentMode = getMeterMode(meterRoot);
  const currentIndex = OVERLAY_MODES.indexOf(currentMode);
  const nextIndex = (currentIndex + 1) % OVERLAY_MODES.length;
  const nextMode = OVERLAY_MODES[nextIndex];

  setMeterMode(meterRoot, nextMode);
  updateModeButtons();

  const encounter = state.lastEncounter || {};
  const rows = state.lastRows || [];
  updateMeterChrome(meterRoot, encounter, rows);
  renderRowsForMeter(meterRoot, rows, { snap: true });

  if (meterRoot?.id !== "overlay") {
    const windowState = getSecondaryWindowStateByElement(meterRoot);
    if (windowState) {
      windowState.mode = nextMode;
      saveSecondaryWindows(currentSecondaryWindows || []);
    }
  }
}

let currentSecondaryWindows = null;

function getSecondaryWindowStateByElement(meterRoot) {
  if (!currentSecondaryWindows || !meterRoot?.dataset.windowId) return null;
  return currentSecondaryWindows.find((windowState) => windowState.id === meterRoot.dataset.windowId) || null;
}

function getDisplayName(combatant, job) {
  if (!settingsState.obscureNames) {
    return getCombatantName(combatant);
  }

  return job || "Unknown";
}

function loadSecondaryWindows() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SECONDARY_WINDOWS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSecondaryWindows(windows) {
  localStorage.setItem(SECONDARY_WINDOWS_STORAGE_KEY, JSON.stringify(windows));
}

function loadMainWindowSize() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MAIN_WINDOW_SIZE_STORAGE_KEY) || "null");
    if (!parsed || !Number.isFinite(parsed.width) || !Number.isFinite(parsed.height)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveMainWindowSize(size) {
  localStorage.setItem(MAIN_WINDOW_SIZE_STORAGE_KEY, JSON.stringify(size));
}

function createSecondaryWindowState(existingWindows) {
  const nextNumber = existingWindows.length + 1;
  const offset = Math.min(existingWindows.length * 18, 90);
  const mainWindowHeight = Math.max(
    document.getElementById("overlay")?.getBoundingClientRect().height || DEFAULT_MAIN_WINDOW_SIZE.height,
    120
  );

  return {
    id: `window-${Date.now()}`,
    title: `Window ${nextNumber}`,
    x: 0 + offset,
    y: Math.round(mainWindowHeight + 12 + offset),
    width: 300,
    height: 220,
    mode: "dps",
  };
}

document.addEventListener("onOverlayDataUpdate", (event) => {
  state.hasOverlayData = true;
  if (state.mockPreviewInterval) {
    clearInterval(state.mockPreviewInterval);
    state.mockPreviewInterval = null;
  }
  updateOverlay(event.detail);
});

window.zenClosePreferences = (event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  const preferencesWindow = document.getElementById("preferences-window");
  if (preferencesWindow) {
    preferencesWindow.classList.add("hidden");
    preferencesWindow.style.display = "none";
  }

  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const modeButton = document.getElementById("mode-button");
  const overlay = document.getElementById("overlay");

  const settingsMenu = document.getElementById("settings-menu");
  const openPreferencesButton = document.getElementById("open-preferences");
  const createSecondaryWindowButton = document.getElementById("create-secondary-window");
  const openWindowManagerButton = document.getElementById("open-window-manager");
  const windowManager = document.getElementById("window-manager");
  const closeWindowManagerButton = document.getElementById("close-window-manager");
  const windowManagerList = document.getElementById("window-manager-list");
  const secondaryWindowsContainer = document.getElementById("secondary-windows");
  const preferencesWindow = document.getElementById("preferences-window");
  const closePreferencesButton = document.getElementById("close-preferences");
  const obscureNamesToggle = document.getElementById("obscure-names-toggle");
  let secondaryWindows = loadSecondaryWindows();
  currentSecondaryWindows = secondaryWindows;
  let mainWindowSize = loadMainWindowSize() || { ...DEFAULT_MAIN_WINDOW_SIZE };

  modeButton?.addEventListener("click", () => {
    if (overlay) cycleMeterMode(overlay);
  });

  menuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    settingsMenu?.classList.toggle("hidden");
  });

  const persistAndRenderSecondaryWindows = () => {
    currentSecondaryWindows = secondaryWindows;
    saveSecondaryWindows(secondaryWindows);
    renderSecondaryWindows();
    renderWindowManagerList();
  };

  const removeSecondaryWindow = (windowId) => {
    secondaryWindows = secondaryWindows.filter((windowState) => windowState.id !== windowId);
    persistAndRenderSecondaryWindows();
  };
  const renderSecondaryWindows = () => {
    if (!secondaryWindowsContainer) return;

    secondaryWindowsContainer.innerHTML = "";

    secondaryWindows.forEach((windowState) => {
      const windowElement = document.createElement("article");
      windowElement.className = "secondary-window meter-window";
      windowElement.dataset.windowId = windowState.id;
      windowElement.dataset.mode = windowState.mode || "dps";
      windowElement.classList.toggle("is-empty", !state.lastRows || state.lastRows.length === 0);
      windowElement.style.left = `${windowState.x}px`;
      windowElement.style.top = `${windowState.y}px`;
      windowState.width = Math.max(windowState.width || 300, 240);
      windowState.height = Math.max(windowState.height || 220, 120);
      windowElement.style.width = `${windowState.width}px`;
      windowElement.style.height = `${windowState.height}px`;

      const header = document.createElement("div");
      header.className = "secondary-window-header topbar";

      header.innerHTML = `
        <div class="encounter-time">00:00</div>
        <div class="topbar-separator"></div>
        <div class="topbar-title">
          <div class="title">Current Encounter</div>
        </div>
        <div class="topbar-controls">
          <div class="enc-dps" aria-label="Total DPS">
            <span class="top-stat-value">0</span>
            <small class="top-stat-label">Total DPS</small>
          </div>
          <button class="mode-button" type="button">${getModeLabel(windowElement.dataset.mode)}</button>
          <button class="menu-button secondary-menu-button" type="button" title="Window menu">&#8942;</button>
          <button class="secondary-window-close" type="button" title="Close window">&times;</button>
        </div>
      `;

      const modeButton = header.querySelector(".mode-button");
      const menuButton = header.querySelector(".secondary-menu-button");
      const closeButton = header.querySelector(".secondary-window-close");

      modeButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        cycleMeterMode(windowElement);
      });

      menuButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        const existingMenu = windowElement.querySelector(".secondary-settings-menu");
        existingMenu?.classList.toggle("hidden");
      });

      closeButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        removeSecondaryWindow(windowState.id);
      });

      const body = document.createElement("div");
      body.className = "secondary-window-body";
      body.innerHTML = `
        <section class="combatants"></section>
        <section class="footer">
          <span class="encounter-location">Waiting for data</span>
          <span class="status">0 combatants</span>
        </section>
      `;

      windowElement.append(header, body);
      secondaryWindowsContainer.appendChild(windowElement);
      updateMeterChrome(windowElement, state.lastEncounter || {}, state.lastRows || []);
      renderRowsForMeter(windowElement, state.lastRows || [], { snap: true });
    });

    applyOverlaySettings();
  };

  const renderWindowManagerList = () => {
    if (!windowManagerList) return;

    windowManagerList.innerHTML = "";

    if (secondaryWindows.length === 0) {
      const empty = document.createElement("div");
      empty.className = "window-manager-empty";
      empty.textContent = "No created windows";
      windowManagerList.appendChild(empty);
      return;
    }

    secondaryWindows.forEach((windowState) => {
      const item = document.createElement("div");
      item.className = "window-manager-item";

      const title = document.createElement("span");
      title.textContent = windowState.title;

      const deleteButton = document.createElement("button");
      deleteButton.className = "window-delete";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeSecondaryWindow(windowState.id);
      });

      item.append(title, deleteButton);
      windowManagerList.appendChild(item);
    });
  };

  const openWindowManager = () => {
    settingsMenu?.classList.add("hidden");
    preferencesWindow?.classList.add("hidden");
    windowManager?.classList.remove("hidden");
    renderWindowManagerList();
  };

  const closeWindowManager = () => {
    windowManager?.classList.add("hidden");
  };

  createSecondaryWindowButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    secondaryWindows.push(createSecondaryWindowState(secondaryWindows));
    persistAndRenderSecondaryWindows();
    settingsMenu?.classList.add("hidden");
  });

  openWindowManagerButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openWindowManager();
  });

  closeWindowManagerButton?.addEventListener("click", closeWindowManager);

  renderSecondaryWindows();
  renderWindowManagerList();

  const openPreferences = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    settingsMenu?.classList.add("hidden");
    windowManager?.classList.add("hidden");
    if (preferencesWindow) {
      preferencesWindow.style.display = "";
      preferencesWindow.classList.remove("hidden");
    }
  };

  const closePreferences = (event) => {
    window.zenClosePreferences(event);
    return false;
  };

  openPreferencesButton?.addEventListener("click", (event) => {
    openPreferences(event);
  });

  closePreferencesButton?.addEventListener("pointerdown", closePreferences);
  closePreferencesButton?.addEventListener("mousedown", closePreferences);
  closePreferencesButton?.addEventListener("click", closePreferences);
  closePreferencesButton?.addEventListener("pointerdown", closePreferences, true);
  closePreferencesButton?.addEventListener("mousedown", closePreferences, true);
  closePreferencesButton?.addEventListener("mouseup", closePreferences, true);
  closePreferencesButton?.addEventListener("click", closePreferences, true);

  preferencesWindow?.addEventListener("pointerdown", (event) => {
    if (event.target instanceof HTMLElement && event.target.closest(".preferences-header")) {
      closePreferences(event);
    }
  }, true);

  preferencesWindow?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.closest(".preferences-header")) {
      closePreferences(event);
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preferencesWindow && !preferencesWindow.classList.contains("hidden")) {
      closePreferences(event);
    }
  });

  if (obscureNamesToggle) {
    obscureNamesToggle.checked = settingsState.obscureNames;

    obscureNamesToggle.addEventListener("change", () => {
      settingsState.obscureNames = obscureNamesToggle.checked;
      localStorage.setItem("obscureNames", String(settingsState.obscureNames));
    });
  }

  /* Rank settings */
  const showRankToggle =
    document.getElementById("show-rank-toggle");
  const showDeathsToggle =
    document.getElementById("show-deaths-toggle");
  const showFooterToggle =
    document.getElementById("show-footer-toggle");
  const alwaysShowPlayerToggle =
    document.getElementById("always-show-player-toggle");

  if (showRankToggle) {
    showRankToggle.checked = settingsState.showRanks;

    showRankToggle.addEventListener("change", () => {
      settingsState.showRanks =
        showRankToggle.checked;

      localStorage.setItem(
        "showRanks",
        String(settingsState.showRanks)
      );

      applyOverlaySettings();
    });
  }

  if (showDeathsToggle) {
    showDeathsToggle.checked = settingsState.showDeaths;

    showDeathsToggle.addEventListener("change", () => {
      settingsState.showDeaths = showDeathsToggle.checked;
      localStorage.setItem("showDeaths", String(settingsState.showDeaths));
      applyOverlaySettings();
    });
  }

  if (showFooterToggle) {
    showFooterToggle.checked = settingsState.showFooter;

    showFooterToggle.addEventListener("change", () => {
      settingsState.showFooter = showFooterToggle.checked;
      localStorage.setItem("showFooter", String(settingsState.showFooter));
      applyOverlaySettings();
    });
  }

  if (alwaysShowPlayerToggle) {
    alwaysShowPlayerToggle.checked = settingsState.alwaysShowPlayer;

    alwaysShowPlayerToggle.addEventListener("change", () => {
      settingsState.alwaysShowPlayer = alwaysShowPlayerToggle.checked;
      localStorage.setItem("alwaysShowPlayer", String(settingsState.alwaysShowPlayer));
      refreshRows({ snap: true });
    });
  }

  /* Meter background settings */
  const showMeterBgToggle = document.getElementById("show-meter-bg-toggle");
  const barColorModeControl = document.getElementById("bar-color-mode");
  const barColorModeButtons = Array.from(
    document.querySelectorAll("[data-bar-color-mode]")
  );
  const barCustomColorField = document.getElementById("bar-custom-color-field");
  const barCustomColorPreview = document.getElementById("bar-custom-color-preview");
  const barColorPickerPanel = document.getElementById("bar-color-picker-panel");
  const barColorMap = document.getElementById("bar-color-map");
  const barColorHandle = document.getElementById("bar-color-handle");
  const barColorHueInput = document.getElementById("bar-color-hue");
  const barColorHexInput = document.getElementById("bar-color-hex");
  const barColorApplyButton = document.getElementById("bar-color-apply");
  const barColorCancelButton = document.getElementById("bar-color-cancel");
  const meterBgColorPreview = document.getElementById("meter-bg-color-preview");
  const colorPickerPanel = document.getElementById("color-picker-panel");
  const meterBgColorMap = document.getElementById("meter-bg-color-map");
  const meterBgColorHandle = document.getElementById("meter-bg-color-handle");
  const meterBgHueInput = document.getElementById("meter-bg-hue");
  const meterBgHexInput = document.getElementById("meter-bg-hex");
  const meterBgApplyButton = document.getElementById("meter-bg-apply");
  const meterBgCancelButton = document.getElementById("meter-bg-cancel");
  const meterBgOpacityInput = document.getElementById("meter-bg-opacity");

  let pickerHsv = { h: 0, s: 0, v: 0 };
  let barPickerHsv = { h: 0, s: 0, v: 0 };

  const sanitizeHex = (value) => {
    const raw = String(value || "").trim();
    const normalized = raw.startsWith("#") ? raw.slice(1) : raw;
    if (/^[0-9A-Fa-f]{6}$/.test(normalized)) {
      return `#${normalized.toUpperCase()}`;
    }
    return null;
  };

  const setColorControls = (hex, updatePicker = true) => {
    const rgb = hexToRgb(hex)
      .split(",")
      .map((value) => Number(value.trim()));

    if (updatePicker) {
      pickerHsv = rgbToHsv(rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0);
    }

    if (meterBgHexInput) {
      meterBgHexInput.value = hex.toUpperCase();
    }

    if (meterBgHueInput) {
      meterBgHueInput.value = String(Math.round(pickerHsv.h));
    }

    if (meterBgColorPreview) {
      meterBgColorPreview.style.backgroundColor = hex;
    }

    if (meterBgColorMap) {
      meterBgColorMap.style.setProperty("--picker-hue", String(Math.round(pickerHsv.h)));
    }

    if (meterBgColorHandle) {
      meterBgColorHandle.style.left = `${pickerHsv.s * 100}%`;
      meterBgColorHandle.style.top = `${(1 - pickerHsv.v) * 100}%`;
    }
  };

  const updateBarCustomVisibility = () => {
    const isCustom = settingsState.barColorMode === "custom";
    barCustomColorField?.classList.toggle("hidden", !isCustom);
    if (!isCustom) {
      barColorPickerPanel?.classList.add("hidden");
    }
  };

  const setBarColorControls = (color, updatePicker = true) => {
    const clean = String(color).replace("#", "");
    const rgb = [
      Number(`0x${clean.substring(0, 2)}`) || 0,
      Number(`0x${clean.substring(2, 4)}`) || 0,
      Number(`0x${clean.substring(4, 6)}`) || 0,
    ];

    if (updatePicker) {
      barPickerHsv = rgbToHsv(rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0);
    }

    if (barColorHexInput) {
      barColorHexInput.value = color.toUpperCase();
    }

    if (barColorHueInput) {
      barColorHueInput.value = String(Math.round(barPickerHsv.h));
    }

    if (barCustomColorPreview) {
      barCustomColorPreview.style.backgroundColor = color;
    }

    if (barColorMap) {
      barColorMap.style.setProperty("--picker-hue", String(Math.round(barPickerHsv.h)));
    }

    if (barColorHandle) {
      barColorHandle.style.left = `${barPickerHsv.s * 100}%`;
      barColorHandle.style.top = `${(1 - barPickerHsv.v) * 100}%`;
    }
  };

  const setBarColorFromPicker = () => {
    const rgb = hsvToRgb(barPickerHsv.h, barPickerHsv.s, barPickerHsv.v);
    const color = rgbToHex(rgb.r, rgb.g, rgb.b);
    setBarColorControls(color, false);
    return color;
  };

  const updateBarPickerFromEvent = (event) => {
    if (!barColorMap) return;

    const rect = barColorMap.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

    barPickerHsv.s = rect.width === 0 ? 0 : x / rect.width;
    barPickerHsv.v = rect.height === 0 ? 0 : 1 - y / rect.height;

    setBarColorFromPicker();
  };

  const setColorFromPicker = () => {
    const rgb = hsvToRgb(pickerHsv.h, pickerHsv.s, pickerHsv.v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColorControls(hex, false);
    return hex;
  };

  const updatePickerFromEvent = (event) => {
    if (!meterBgColorMap) return;

    const rect = meterBgColorMap.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

    pickerHsv.s = rect.width === 0 ? 0 : x / rect.width;
    pickerHsv.v = rect.height === 0 ? 0 : 1 - y / rect.height;

    setColorFromPicker();
  };

  if (showMeterBgToggle) {
    showMeterBgToggle.checked = settingsState.showMeterBg;

    showMeterBgToggle.addEventListener("change", () => {
      settingsState.showMeterBg = showMeterBgToggle.checked;
      localStorage.setItem("showMeterBg", String(settingsState.showMeterBg));
      applyOverlaySettings();
    });
  }

  const updateBarColorModeButtons = () => {
    barColorModeButtons.forEach((button) => {
      const isActive = button.dataset.barColorMode === settingsState.barColorMode;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  if (barColorModeButtons.length > 0) {
    updateBarColorModeButtons();

    barColorModeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        settingsState.barColorMode = button.dataset.barColorMode || DEFAULT_SETTINGS.barColorMode;
        localStorage.setItem("barColorMode", settingsState.barColorMode);
        updateBarColorModeButtons();
        updateBarCustomVisibility();
        refreshRows();
      });
    });
  }

  if (barCustomColorPreview) {
    barCustomColorPreview.style.backgroundColor = settingsState.barCustomColor;
    barCustomColorPreview.addEventListener("click", (event) => {
      event.stopPropagation();
      barColorPickerPanel?.classList.toggle("hidden");
    });
  }

  if (barColorHexInput) {
    barColorHexInput.value = settingsState.barCustomColor;
    barColorHexInput.addEventListener("input", () => {
      const sanitized = sanitizeHex(barColorHexInput.value);
      if (sanitized) {
        setBarColorControls(sanitized);
      }
    });
  }

  if (barColorHueInput) {
    barColorHueInput.addEventListener("input", () => {
      barPickerHsv.h = Number(barColorHueInput.value);
      setBarColorFromPicker();
    });
  }

  if (barColorMap) {
    let isPickingBarColor = false;

    const stopPickingBarColor = () => {
      isPickingBarColor = false;
      document.removeEventListener("mousemove", movePickingBarColor);
      document.removeEventListener("mouseup", stopPickingBarColor);
    };

    const movePickingBarColor = (event) => {
      if (!isPickingBarColor) return;
      event.preventDefault();
      updateBarPickerFromEvent(event);
    };

    barColorMap.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      isPickingBarColor = true;
      updateBarPickerFromEvent(event);
      document.addEventListener("mousemove", movePickingBarColor);
      document.addEventListener("mouseup", stopPickingBarColor);
    });
  }

  barColorApplyButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const sanitized = sanitizeHex(barColorHexInput?.value);
    if (sanitized) {
      settingsState.barCustomColor = sanitized;
      localStorage.setItem("barCustomColor", settingsState.barCustomColor);
      refreshRows();
    }
  });

  barColorCancelButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setBarColorControls(settingsState.barCustomColor);
    barColorPickerPanel?.classList.add("hidden");
  });

  setBarColorControls(settingsState.barCustomColor);
  updateBarCustomVisibility();

  if (meterBgColorPreview) {
    meterBgColorPreview.style.backgroundColor = settingsState.meterBgColor;
    meterBgColorPreview.addEventListener("click", (event) => {
      event.stopPropagation();
      colorPickerPanel?.classList.toggle("hidden");
    });
  }

  if (meterBgHexInput) {
    meterBgHexInput.value = settingsState.meterBgColor;
    meterBgHexInput.addEventListener("input", () => {
      const sanitized = sanitizeHex(meterBgHexInput.value);
      if (sanitized) {
        setColorControls(sanitized);
      }
    });
  }

  if (meterBgHueInput) {
    meterBgHueInput.addEventListener("input", () => {
      pickerHsv.h = Number(meterBgHueInput.value);
      setColorFromPicker();
    });
  }

  if (meterBgColorMap) {
    let isPickingColor = false;

    const stopPickingColor = () => {
      isPickingColor = false;
      document.removeEventListener("mousemove", movePickingColor);
      document.removeEventListener("mouseup", stopPickingColor);
    };

    const movePickingColor = (event) => {
      if (!isPickingColor) return;
      event.preventDefault();
      updatePickerFromEvent(event);
    };

    meterBgColorMap.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      isPickingColor = true;
      updatePickerFromEvent(event);
      document.addEventListener("mousemove", movePickingColor);
      document.addEventListener("mouseup", stopPickingColor);
    });
  }

  meterBgApplyButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const sanitized = sanitizeHex(meterBgHexInput?.value);
    if (sanitized) {
      settingsState.meterBgColor = sanitized;
      localStorage.setItem("meterBgColor", settingsState.meterBgColor);
      applyOverlaySettings();
    }
  });

  meterBgCancelButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setColorControls(settingsState.meterBgColor);
    colorPickerPanel?.classList.add("hidden");
  });

  setColorControls(settingsState.meterBgColor);

  const meterBarHeightInput = document.getElementById("meter-bar-height");
  const meterBarHeightValue = document.getElementById("meter-bar-height-value");
  const meterBarMaximumInput = document.getElementById("meter-bar-maximum");
  const meterBarMaximumValue = document.getElementById("meter-bar-maximum-value");

  if (meterBgOpacityInput) {
    meterBgOpacityInput.value = settingsState.meterBgOpacity;

    meterBgOpacityInput.addEventListener("input", () => {
      settingsState.meterBgOpacity = meterBgOpacityInput.value;
      localStorage.setItem("meterBgOpacity", settingsState.meterBgOpacity);
      applyOverlaySettings();
    });
  }

  if (meterBarHeightInput) {
    const setBarHeightControl = (height) => {
      const clampedHeight = clampBarHeight(height);
      meterBarHeightInput.value = String(clampedHeight);
      if (meterBarHeightValue) {
        meterBarHeightValue.textContent = `${clampedHeight}px`;
      }
    };

    setBarHeightControl(settingsState.barHeight);

    meterBarHeightInput.addEventListener("input", () => {
      const height = clampBarHeight(Number(meterBarHeightInput.value));
      settingsState.barHeight = height;
      localStorage.setItem("barHeight", String(settingsState.barHeight));
      setBarHeightControl(settingsState.barHeight);
      applyOverlaySettings();
    });
  }

  if (meterBarMaximumInput) {
    const setBarMaximumControl = (maximum) => {
      const clampedMaximum = clampBarMaximum(maximum);
      meterBarMaximumInput.value = String(clampedMaximum);
      if (meterBarMaximumValue) {
        meterBarMaximumValue.textContent = String(clampedMaximum);
      }
    };

    setBarMaximumControl(settingsState.barMaximum);

    meterBarMaximumInput.addEventListener("input", () => {
      const maximum = clampBarMaximum(Number(meterBarMaximumInput.value));
      settingsState.barMaximum = maximum;
      localStorage.setItem("barMaximum", String(settingsState.barMaximum));
      setBarMaximumControl(settingsState.barMaximum);
      applyOverlaySettings();
      refreshRows({ snap: true });
    });
  }

  const resetDefaultsButton = document.getElementById("reset-defaults");

  resetDefaultsButton?.addEventListener("click", (event) => {
    event.stopPropagation();

    settingsState.obscureNames = DEFAULT_SETTINGS.obscureNames;
    settingsState.showRanks = DEFAULT_SETTINGS.showRanks;
    settingsState.showDeaths = DEFAULT_SETTINGS.showDeaths;
    settingsState.showFooter = DEFAULT_SETTINGS.showFooter;
    settingsState.alwaysShowPlayer = DEFAULT_SETTINGS.alwaysShowPlayer;
    settingsState.showMeterBg = DEFAULT_SETTINGS.showMeterBg;
    settingsState.meterBgColor = DEFAULT_SETTINGS.meterBgColor;
    settingsState.meterBgOpacity = DEFAULT_SETTINGS.meterBgOpacity;
    settingsState.barColorMode = DEFAULT_SETTINGS.barColorMode;
    settingsState.barCustomColor = DEFAULT_SETTINGS.barCustomColor;
    settingsState.barHeight = DEFAULT_SETTINGS.barHeight;
    settingsState.barMaximum = DEFAULT_SETTINGS.barMaximum;

    localStorage.setItem("obscureNames", String(settingsState.obscureNames));
    localStorage.setItem("showRanks", String(settingsState.showRanks));
    localStorage.setItem("showDeaths", String(settingsState.showDeaths));
    localStorage.setItem("showFooter", String(settingsState.showFooter));
    localStorage.setItem("alwaysShowPlayer", String(settingsState.alwaysShowPlayer));
    localStorage.setItem("showMeterBg", String(settingsState.showMeterBg));
    localStorage.setItem("meterBgColor", settingsState.meterBgColor);
    localStorage.setItem("meterBgOpacity", settingsState.meterBgOpacity);
    localStorage.setItem("barColorMode", settingsState.barColorMode);
    localStorage.setItem("barCustomColor", settingsState.barCustomColor);
    localStorage.setItem("barHeight", String(settingsState.barHeight));
    localStorage.setItem("barMaximum", String(settingsState.barMaximum));

    if (obscureNamesToggle) {
      obscureNamesToggle.checked = settingsState.obscureNames;
    }

    if (showRankToggle) {
      showRankToggle.checked = settingsState.showRanks;
    }

    if (showDeathsToggle) {
      showDeathsToggle.checked = settingsState.showDeaths;
    }

    if (showFooterToggle) {
      showFooterToggle.checked = settingsState.showFooter;
    }

    if (alwaysShowPlayerToggle) {
      alwaysShowPlayerToggle.checked = settingsState.alwaysShowPlayer;
    }

    if (showMeterBgToggle) {
      showMeterBgToggle.checked = settingsState.showMeterBg;
    }

    updateBarColorModeButtons();

    setBarColorControls(settingsState.barCustomColor);
    updateBarCustomVisibility();

    setColorControls(settingsState.meterBgColor);

    if (meterBgOpacityInput) {
      meterBgOpacityInput.value = settingsState.meterBgOpacity;
    }

    if (meterBarHeightInput) {
      meterBarHeightInput.value = String(settingsState.barHeight);
    }

    if (meterBarHeightValue) {
      meterBarHeightValue.textContent = `${settingsState.barHeight}px`;
    }

    if (meterBarMaximumInput) {
      meterBarMaximumInput.value = String(settingsState.barMaximum);
    }

    if (meterBarMaximumValue) {
      meterBarMaximumValue.textContent = String(settingsState.barMaximum);
    }

    applyOverlaySettings();
    refreshRows();
    settingsMenu?.classList.add("hidden");
  });

  /* Prevent clicks inside the preferences window from closing it */
  [
    preferencesWindow,
    settingsMenu,
    windowManager,
    secondaryWindowsContainer,
    barColorModeControl,
    barCustomColorPreview,
    barColorPickerPanel,
    barColorMap,
    barColorHueInput,
    barColorHexInput,
    colorPickerPanel,
    meterBgColorPreview,
    meterBgColorMap,
    meterBgHueInput,
    meterBgHexInput,
    meterBgOpacityInput,
    meterBarHeightInput,
    meterBarMaximumInput,
  ].forEach((element) => {
    element?.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    element?.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener("dragstart", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest(
        "#preferences-window, #settings-menu, #window-manager, #secondary-windows, #open-preferences, #create-secondary-window, #open-window-manager, #reset-defaults, #color-picker-panel, #meter-bg-color-preview, #meter-bg-color-map, #meter-bg-hue, #meter-bg-hex, #meter-bg-opacity, #meter-bar-height, #meter-bar-maximum, .settings-field, .settings-row, .settings-action, input, button"
      )
    ) {
      event.preventDefault();
    }
  });

  /* Close settings menu when clicking outside of it */
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (
      settingsMenu &&
      !settingsMenu.classList.contains("hidden") &&
      !settingsMenu.contains(target) &&
      !menuButton?.contains(target)
    ) {
      settingsMenu.classList.add("hidden");
    }

    if (
      windowManager &&
      !windowManager.classList.contains("hidden") &&
      !windowManager.contains(target) &&
      !openWindowManagerButton?.contains(target)
    ) {
      closeWindowManager();
    }

    document.querySelectorAll(".secondary-settings-menu:not(.hidden)").forEach((menu) => {
      if (
        menu instanceof HTMLElement &&
        !menu.contains(target) &&
        !(target instanceof HTMLElement && target.closest(".secondary-menu-button"))
      ) {
        menu.classList.add("hidden");
      }
    });
  });
  applyOverlaySettings();
});  

// Lets you preview the overlay by opening index.html directly in your browser.
function clonePreviewData(data) {
  if (typeof structuredClone === "function") {
    return structuredClone(data);
  }

  return JSON.parse(JSON.stringify(data));
}

function startMockPreview() {
  if (state.hasOverlayData || !window.MOCK_ACT_DATA || state.mockPreviewInterval) return;

  updateOverlay(window.MOCK_ACT_DATA);

  state.mockPreviewInterval = setInterval(() => {
    if (state.hasOverlayData) {
      clearInterval(state.mockPreviewInterval);
      state.mockPreviewInterval = null;
      return;
    }

    const clone = clonePreviewData(window.MOCK_ACT_DATA);

    Object.values(clone.Combatant).forEach((combatant) => {
      const current = numberFromACT(combatant.ENCDPS);
      const wobble = Math.floor(Math.random() * 400 - 160);
      combatant.ENCDPS = Math.max(current + wobble, 0);
    });

    clone.Encounter.ENCDPS = Object.values(clone.Combatant)
      .reduce((total, combatant) => total + numberFromACT(combatant.ENCDPS), 0);

    updateOverlay(clone);
  }, 1400);
}

function isMockPreviewEnabled() {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("mock") === "1" ||
    params.get("test") === "1" ||
    params.get("preview") === "1"
  );
}

if (isMockPreviewEnabled() && window.MOCK_ACT_DATA) {
  setTimeout(startMockPreview, 1000);
}
