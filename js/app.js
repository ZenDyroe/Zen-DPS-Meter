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
  NIN: ["rgba(175, 25, 100, 0.95)", "rgba(175, 25, 100, 0.35)"],
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
  showCornerAid: true,
  autoGrowWindows: false,
  snapWindows: false,
  attachNewWindowsToMain: false,
  showMeterBg: true,
  meterBgColor: "#050608",
  meterBgOpacity: "0.88",
  barColorMode: "job",
  barCustomColor: "#4974C4",
  textColor: "#FFFFFF",
  textStrokeWidth: 0,
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

  showCornerAid:
    localStorage.getItem("showCornerAid") !== "false",

  autoGrowWindows:
    localStorage.getItem("autoGrowWindows") === "true",

  snapWindows:
    localStorage.getItem("snapWindows") === "true",

  attachNewWindowsToMain:
    localStorage.getItem("attachNewWindowsToMain") === "true",

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

  textColor:
    localStorage.getItem("textColor") || DEFAULT_SETTINGS.textColor,

  textStrokeWidth:
    clampTextStrokeWidth(Number(localStorage.getItem("textStrokeWidth")) || DEFAULT_SETTINGS.textStrokeWidth),

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

function clampTextStrokeWidth(value) {
  if (!Number.isFinite(value)) return DEFAULT_SETTINGS.textStrokeWidth;
  return Math.max(0, Math.min(3, Math.round(value * 4) / 4));
}

function getCombatantsMaxHeight() {
  const rowHeight = clampBarHeight(settingsState.barHeight);
  const maximumRows = clampBarMaximum(settingsState.barMaximum);
  const rowGap = 2;
  const headerHeight = 9;

  return headerHeight + (maximumRows * rowHeight) + (maximumRows * rowGap);
}

function getAutoCombatantsHeight(rowCount) {
  const rowHeight = clampBarHeight(settingsState.barHeight);
  const visibleRows = Math.min(Math.max(rowCount, 0), clampBarMaximum(settingsState.barMaximum));
  const rowGap = 2;
  const headerHeight = 9;

  return headerHeight + (visibleRows * rowHeight) + (visibleRows * rowGap);
}

function applyOverlaySettings() {
  const bgColorRgb = hexToRgb(settingsState.meterBgColor);
  const overlayBg = `rgba(${bgColorRgb}, ${settingsState.meterBgOpacity})`;

  document.documentElement.style.setProperty("--meter-bg-color", bgColorRgb);
  document.documentElement.style.setProperty("--meter-bg-opacity", settingsState.meterBgOpacity);
  document.documentElement.style.setProperty("--bg", overlayBg);
  document.documentElement.style.setProperty("--meter-text-color", settingsState.textColor);
  document.documentElement.style.setProperty(
    "--meter-text-stroke-width",
    `${clampTextStrokeWidth(settingsState.textStrokeWidth)}px`
  );

  document.querySelectorAll(".meter-window").forEach((meterWindow) => {
    meterWindow.classList.toggle("hide-ranks", !settingsState.showRanks);
    meterWindow.classList.toggle("show-deaths", settingsState.showDeaths);
    meterWindow.classList.toggle("hide-footer", !settingsState.showFooter);
    meterWindow.classList.toggle("hide-corner-aid", !settingsState.showCornerAid);
    meterWindow.classList.toggle("no-meter-bg", !settingsState.showMeterBg);
    meterWindow.style.setProperty("--meter-bg-color", bgColorRgb);
    meterWindow.style.setProperty("--meter-bg-opacity", settingsState.meterBgOpacity);
    meterWindow.style.setProperty("--bg", overlayBg);
    meterWindow.style.setProperty("--row-height", `${clampBarHeight(settingsState.barHeight)}px`);
    meterWindow.style.setProperty("--meter-text-color", settingsState.textColor);
    meterWindow.style.setProperty(
      "--meter-text-stroke-width",
      `${clampTextStrokeWidth(settingsState.textStrokeWidth)}px`
    );

    const combatants = meterWindow.querySelector(".combatants");
    if (combatants) {
      combatants.style.maxHeight = `${getCombatantsMaxHeight()}px`;
      updatePinnedPlayerState(combatants);
    }

    applyAutoWindowHeight(meterWindow, state.lastRows?.length || 0);
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

function getEncounterDurationSeconds(encounter = state.lastEncounter || {}) {
  const raw =
    encounter.duration ||
    encounter.DURATION ||
    encounter.Duration ||
    encounter.active ||
    encounter.Active ||
    "";

  const text = String(raw).trim();
  if (!text) return 0;

  const parts = text.split(":").map((part) => Number(part));
  if (parts.some((part) => !Number.isFinite(part))) {
    return numberFromACT(text);
  }

  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }

  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }

  return parts[0] || 0;
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
  const meterMode = getMeterMode(meterRoot);
  const topStatTotal = rows.reduce(
    (total, combatant) => total + getCombatantValue(combatant, meterMode, encounter),
    0
  );
  const topStatLabel = `Total ${getModeLabel(meterMode)}`;
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
    topValue.textContent = topStatTotal > 0 ? formatNumber(topStatTotal) : "-";
    topLabel.textContent = topStatLabel;
    topValue.parentElement?.setAttribute("aria-label", topStatLabel);
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
    (a, b) =>
      getCombatantValue(b, meterMode, state.lastEncounter || {}) -
      getCombatantValue(a, meterMode, state.lastEncounter || {})
  );
  const values = sortedRows.map((combatant) =>
    getCombatantValue(combatant, meterMode, state.lastEncounter || {})
  );
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
      applyAutoWindowHeight(meterRoot, rows.length);
    });
  }

  applyAutoWindowHeight(meterRoot, rows.length);
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

function getCombatantValue(combatant, mode = overlayModeState.mode, encounter = state.lastEncounter || {}) {
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

    case "dtps": {
      const directDtps = numberFromACT(
        combatant.EncDTPS ||
        combatant.ENCDTPS ||
        combatant.encDTPS ||
        combatant.encdtps ||
        combatant.DTPS ||
        combatant.dtps ||
        combatant.damageTakenPerSecond ||
        combatant.DamageTakenPerSecond ||
        combatant.damageTakenPerSec ||
        combatant.DamageTakenPerSec ||
        combatant["damageTaken/s"] ||
        combatant["DamageTaken/s"] ||
        0
      );

      if (directDtps > 0) return directDtps;

      const totalDamageTaken = numberFromACT(
        combatant.DamageTaken ||
        combatant["damageTaken"] ||
        combatant.damagetaken ||
        combatant.damageTaken ||
        0
      );
      const durationSeconds = getEncounterDurationSeconds(encounter);

      return durationSeconds > 0 ? totalDamageTaken / durationSeconds : 0;
    }

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
    [getModeLabel(mode), formatNumber(getCombatantValue(combatant, mode, state.lastEncounter || {}))],
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
  const mainWindowRect = document.getElementById("overlay")?.getBoundingClientRect();
  const mainWindowLeft = mainWindowRect?.left || 0;
  const mainWindowBottom = Math.max(mainWindowRect?.bottom || DEFAULT_MAIN_WINDOW_SIZE.height, 120);
  const isAttachedToMain = settingsState.attachNewWindowsToMain === true;

  return {
    id: `window-${Date.now()}`,
    title: `Window ${nextNumber}`,
    x: Math.round((isAttachedToMain ? mainWindowLeft : 0) + offset),
    y: Math.round(mainWindowBottom + (isAttachedToMain ? 0 : 12 + offset)),
    width: 300,
    height: 220,
    mode: "dps",
    locked: false,
    attachedToMain: isAttachedToMain,
    attachedToMainOffsetX: offset,
    attachedToMainOffsetY: 0,
  };
}

function keepWindowInOverlayBounds(windowState, windowElement) {
  const maxX = Math.max(window.innerWidth - windowElement.offsetWidth, 0);
  const maxY = Math.max(window.innerHeight - windowElement.offsetHeight, 0);

  windowState.x = Math.max(0, Math.min(windowState.x, maxX));
  windowState.y = Math.max(0, Math.min(windowState.y, maxY));
  windowElement.style.left = `${windowState.x}px`;
  windowElement.style.top = `${windowState.y}px`;
}

const WINDOW_SNAP_DISTANCE = 12;
const WINDOW_ATTACH_DISTANCE = 2;

function getRectFromElement(element) {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function rectsOverlapOnAxis(startA, endA, startB, endB) {
  return Math.min(endA, endB) - Math.max(startA, startB) >= -WINDOW_ATTACH_DISTANCE;
}

function getSecondaryWindowElement(windowId) {
  return document.querySelector(`.secondary-window[data-window-id="${windowId}"]`);
}

function getWindowRectFromState(windowState) {
  const element = getSecondaryWindowElement(windowState.id);
  if (element) return getRectFromElement(element);

  const width = element?.offsetWidth || windowState.width || 300;
  const height = element?.offsetHeight || windowState.height || 220;

  return {
    left: windowState.x || 0,
    top: windowState.y || 0,
    width,
    height,
    right: (windowState.x || 0) + width,
    bottom: (windowState.y || 0) + height,
  };
}

function areWindowsAttached(rectA, rectB) {
  const horizontalTouch =
    Math.abs(rectA.right - rectB.left) <= WINDOW_ATTACH_DISTANCE ||
    Math.abs(rectA.left - rectB.right) <= WINDOW_ATTACH_DISTANCE;
  const verticalOverlap = rectsOverlapOnAxis(rectA.top, rectA.bottom, rectB.top, rectB.bottom);
  const verticalTouch =
    Math.abs(rectA.bottom - rectB.top) <= WINDOW_ATTACH_DISTANCE ||
    Math.abs(rectA.top - rectB.bottom) <= WINDOW_ATTACH_DISTANCE;
  const horizontalOverlap = rectsOverlapOnAxis(rectA.left, rectA.right, rectB.left, rectB.right);

  return (horizontalTouch && verticalOverlap) || (verticalTouch && horizontalOverlap);
}

function moveSecondaryWindowBy(windowState, dx, dy) {
  const element = getSecondaryWindowElement(windowState.id);
  if (!element) return;

  windowState.x = Math.round((windowState.x || 0) + dx);
  windowState.y = Math.round((windowState.y || 0) + dy);
  keepWindowInOverlayBounds(windowState, element);
}

function anchorWindowToMain(windowState, mainRect) {
  const element = getSecondaryWindowElement(windowState.id);
  if (!element || !mainRect) return;

  const offsetX = Number(windowState.attachedToMainOffsetX) || 0;
  const offsetY = Number(windowState.attachedToMainOffsetY) || 0;
  const maxX = Math.max(window.innerWidth - element.offsetWidth, 0);

  windowState.x = Math.round(Math.max(0, Math.min(mainRect.left + offsetX, maxX)));
  windowState.y = Math.round(Math.max(0, mainRect.bottom + offsetY));
  element.style.left = `${windowState.x}px`;
  element.style.top = `${windowState.y}px`;
}

function updateMainAttachmentOffsets(windowState) {
  if (windowState.attachedToMain !== true) return;

  const mainRect = document.getElementById("overlay")?.getBoundingClientRect();
  if (!mainRect) return;

  windowState.attachedToMainOffsetX = Math.round((windowState.x || 0) - mainRect.left);
  windowState.attachedToMainOffsetY = Math.round((windowState.y || 0) - mainRect.bottom);
}

function moveWindowsAttachedToResize(meterRoot, beforeRect, afterRect) {
  if (!currentSecondaryWindows || !beforeRect || !afterRect) return;

  const resizedWindowState = getSecondaryWindowStateByElement(meterRoot);
  const resizedWindowId = resizedWindowState?.id || null;
  const dxRight = afterRect.right - beforeRect.right;
  const dyBottom = afterRect.bottom - beforeRect.bottom;
  const movedWindowIds = new Set();
  const beforeSecondaryRects = new Map(
    currentSecondaryWindows.map((windowState) => [
      windowState.id,
      getWindowRectFromState(windowState),
    ])
  );

  if (meterRoot.id === "overlay" && dyBottom !== 0) {
    currentSecondaryWindows.forEach((windowState) => {
      if (windowState.attachedToMain !== true) return;

      anchorWindowToMain(windowState, afterRect);
      movedWindowIds.add(windowState.id);
    });
  }

  if (!settingsState.snapWindows) {
    if (movedWindowIds.size > 0) {
      saveSecondaryWindows(currentSecondaryWindows);
    }
    return;
  }

  const moveAttachedToRect = (targetRect, dx, dy) => {
    if (dx === 0 && dy === 0) return false;

    let moved = false;
    currentSecondaryWindows.forEach((windowState) => {
      if (windowState.id === resizedWindowId || movedWindowIds.has(windowState.id)) return;
      const candidateRect = beforeSecondaryRects.get(windowState.id);
      if (!candidateRect || !areWindowsAttached(candidateRect, targetRect)) return;

      moveSecondaryWindowBy(windowState, dx, dy);
      movedWindowIds.add(windowState.id);
      moved = true;
    });

    return moved;
  };

  const rightEdgeRect = {
    left: beforeRect.right,
    right: beforeRect.right,
    top: beforeRect.top,
    bottom: beforeRect.bottom,
  };
  const bottomEdgeRect = {
    left: beforeRect.left,
    right: beforeRect.right,
    top: beforeRect.bottom,
    bottom: beforeRect.bottom,
  };

  moveAttachedToRect(rightEdgeRect, dxRight, 0);
  moveAttachedToRect(bottomEdgeRect, 0, dyBottom);

  let changed = true;
  while (changed) {
    changed = false;
    currentSecondaryWindows.forEach((targetWindow) => {
      if (!movedWindowIds.has(targetWindow.id)) return;

      const targetRect = beforeSecondaryRects.get(targetWindow.id);
      if (!targetRect) return;

      currentSecondaryWindows.forEach((candidate) => {
        if (candidate.id === resizedWindowId || movedWindowIds.has(candidate.id)) return;
        const candidateRect = beforeSecondaryRects.get(candidate.id);
        if (!candidateRect || !areWindowsAttached(candidateRect, targetRect)) return;

        moveSecondaryWindowBy(candidate, dxRight, dyBottom);
        movedWindowIds.add(candidate.id);
        changed = true;
      });
    });
  }

  if (movedWindowIds.size > 0) {
    saveSecondaryWindows(currentSecondaryWindows);
  }
}

function applyAutoWindowHeight(meterRoot, rowCount) {
  if (!settingsState.autoGrowWindows || !meterRoot) return;

  const container = meterRoot.querySelector(".combatants");
  if (!container) return;

  const beforeRect = getRectFromElement(meterRoot);
  const minHeight = meterRoot.id === "overlay" ? 80 : 120;
  const currentContainerHeight = Math.max(container.clientHeight, 0);
  const chromeHeight = Math.max(meterRoot.offsetHeight - currentContainerHeight, 0);
  const nextHeight = Math.max(minHeight, Math.ceil(chromeHeight + getAutoCombatantsHeight(rowCount)));

  meterRoot.style.height = `${nextHeight}px`;

  const windowState = getSecondaryWindowStateByElement(meterRoot);
  if (windowState) {
    keepWindowInOverlayBounds(windowState, meterRoot);
  }

  const afterRect = getRectFromElement(meterRoot);
  moveWindowsAttachedToResize(meterRoot, beforeRect, afterRect);
}

function collectAttachedWindowGroup(activeWindowState) {
  if (!settingsState.snapWindows || !currentSecondaryWindows || !activeWindowState) {
    return [activeWindowState].filter(Boolean);
  }

  const group = new Map([[activeWindowState.id, activeWindowState]]);
  let changed = true;

  while (changed) {
    changed = false;
    currentSecondaryWindows.forEach((candidate) => {
      if (group.has(candidate.id)) return;

      const candidateRect = getWindowRectFromState(candidate);
      const attachesToGroup = Array.from(group.values()).some((groupWindow) =>
        areWindowsAttached(getWindowRectFromState(groupWindow), candidateRect)
      );

      if (attachesToGroup) {
        group.set(candidate.id, candidate);
        changed = true;
      }
    });
  }

  return Array.from(group.values());
}

function getSnapTargets(activeGroup) {
  const activeIds = new Set(activeGroup.map((windowState) => windowState.id));
  const targets = [];
  const overlay = document.getElementById("overlay");

  if (overlay) {
    const rect = overlay.getBoundingClientRect();
    targets.push({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });
  }

  (currentSecondaryWindows || []).forEach((windowState) => {
    if (!activeIds.has(windowState.id)) {
      targets.push(getWindowRectFromState(windowState));
    }
  });

  return targets;
}

function getBestSnapDelta(activeRect, targets) {
  let bestDx = null;
  let bestDy = null;

  targets.forEach((target) => {
    const xCandidates = [
      target.left - activeRect.left,
      target.right - activeRect.right,
      target.right - activeRect.left,
      target.left - activeRect.right,
    ];
    const yCandidates = [
      target.top - activeRect.top,
      target.bottom - activeRect.bottom,
      target.bottom - activeRect.top,
      target.top - activeRect.bottom,
    ];

    xCandidates.forEach((dx) => {
      if (Math.abs(dx) > WINDOW_SNAP_DISTANCE) return;
      const movedTop = activeRect.top + (bestDy || 0);
      const movedBottom = activeRect.bottom + (bestDy || 0);
      if (!rectsOverlapOnAxis(movedTop, movedBottom, target.top, target.bottom)) return;
      if (bestDx === null || Math.abs(dx) < Math.abs(bestDx)) {
        bestDx = dx;
      }
    });

    yCandidates.forEach((dy) => {
      if (Math.abs(dy) > WINDOW_SNAP_DISTANCE) return;
      const movedLeft = activeRect.left + (bestDx || 0);
      const movedRight = activeRect.right + (bestDx || 0);
      if (!rectsOverlapOnAxis(movedLeft, movedRight, target.left, target.right)) return;
      if (bestDy === null || Math.abs(dy) < Math.abs(bestDy)) {
        bestDy = dy;
      }
    });
  });

  return {
    dx: bestDx || 0,
    dy: bestDy || 0,
  };
}

function clampGroupDelta(activeGroup, startPositions, dx, dy) {
  const rects = activeGroup.map((windowState) => {
    const start = startPositions.get(windowState.id);
    return {
      left: start.x,
      top: start.y,
      right: start.x + start.width,
      bottom: start.y + start.height,
    };
  });

  const bounds = {
    left: Math.min(...rects.map((rect) => rect.left)),
    top: Math.min(...rects.map((rect) => rect.top)),
    right: Math.max(...rects.map((rect) => rect.right)),
    bottom: Math.max(...rects.map((rect) => rect.bottom)),
  };

  return {
    dx: Math.max(-bounds.left, Math.min(dx, window.innerWidth - bounds.right)),
    dy: Math.max(-bounds.top, Math.min(dy, window.innerHeight - bounds.bottom)),
  };
}

function moveWindowGroup(activeGroup, startPositions, dx, dy) {
  activeGroup.forEach((groupWindow) => {
    const start = startPositions.get(groupWindow.id);
    const element = getSecondaryWindowElement(groupWindow.id);
    if (!start || !element) return;

    groupWindow.x = Math.round(start.x + dx);
    groupWindow.y = Math.round(start.y + dy);
    element.style.left = `${groupWindow.x}px`;
    element.style.top = `${groupWindow.y}px`;
  });
}

function makeResizeGrip() {
  const grip = document.createElement("div");
  grip.className = "resize-grip";
  grip.title = "Resize window";
  return grip;
}

function makeMeterResizable(meterElement, getSize, setSize, saveSize) {
  const grip = meterElement.querySelector(".resize-grip");
  if (!grip) return;

  let isResizing = false;

  const startResize = (event, moveEventName, stopEventName) => {
    if (isResizing) return;
    isResizing = true;
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startSize = getSize();

    meterElement.classList.add("is-resizing");

    const resizeWindow = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      setSize({
        width: Math.round(startSize.width + moveEvent.clientX - startX),
        height: Math.round(startSize.height + moveEvent.clientY - startY),
      });
    };

    const stopResize = (stopEvent) => {
      stopEvent?.preventDefault?.();
      stopEvent?.stopPropagation?.();
      meterElement.classList.remove("is-resizing");
      document.removeEventListener(moveEventName, resizeWindow, true);
      document.removeEventListener(stopEventName, stopResize, true);
      saveSize();
      isResizing = false;
    };

    document.addEventListener(moveEventName, resizeWindow, true);
    document.addEventListener(stopEventName, stopResize, true);
  };

  grip.addEventListener("pointerdown", (event) => {
    startResize(event, "pointermove", "pointerup");
  }, true);

  grip.addEventListener("mousedown", (event) => {
    startResize(event, "mousemove", "mouseup");
  }, true);
}

function makePanelDraggable(panel, handle) {
  if (!panel || !handle) return;

  handle.addEventListener("mousedown", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest("button, input, select, textarea")
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const rect = panel.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const originX = rect.left;
    const originY = rect.top;

    panel.style.left = `${originX}px`;
    panel.style.top = `${originY}px`;
    panel.style.right = "auto";
    panel.style.transform = "none";
    panel.classList.add("is-dragging");

    const movePanel = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const nextX = Math.max(
        4,
        Math.min(originX + moveEvent.clientX - startX, window.innerWidth - panel.offsetWidth - 4)
      );
      const nextY = Math.max(
        4,
        Math.min(originY + moveEvent.clientY - startY, window.innerHeight - panel.offsetHeight - 4)
      );

      panel.style.left = `${Math.round(nextX)}px`;
      panel.style.top = `${Math.round(nextY)}px`;
    };

    const stopDrag = (stopEvent) => {
      stopEvent?.preventDefault?.();
      stopEvent?.stopPropagation?.();
      panel.classList.remove("is-dragging");
      document.removeEventListener("mousemove", movePanel, true);
      document.removeEventListener("mouseup", stopDrag, true);
    };

    document.addEventListener("mousemove", movePanel, true);
    document.addEventListener("mouseup", stopDrag, true);
  }, true);
}

function makeSecondaryWindowDraggable(windowElement, header, windowState, saveWindows) {
  windowElement.addEventListener("mousedown", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest(".secondary-window-header, .resize-grip")
    ) {
      return;
    }
    event.stopPropagation();
  }, true);

  windowElement.addEventListener("pointerdown", (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.closest(".secondary-window-header, .resize-grip")
    ) {
      return;
    }
    event.stopPropagation();
  }, true);

  const startDrag = (event) => {
    event.stopPropagation();

    if (windowState.locked) {
      return;
    }

    if (
      event.target instanceof HTMLElement &&
      event.target.closest("button, input, select, textarea, .secondary-settings-menu")
    ) {
      return;
    }

    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const activeGroup = collectAttachedWindowGroup(windowState);
    const startPositions = new Map(
      activeGroup.map((groupWindow) => {
        const element = getSecondaryWindowElement(groupWindow.id);
        return [
          groupWindow.id,
          {
            x: groupWindow.x || 0,
            y: groupWindow.y || 0,
            width: element?.offsetWidth || groupWindow.width || 300,
            height: element?.offsetHeight || groupWindow.height || 220,
          },
        ];
      })
    );

    windowElement.classList.add("is-dragging");
    activeGroup.forEach((groupWindow) => {
      getSecondaryWindowElement(groupWindow.id)?.classList.add("is-dragging");
    });

    const moveWindow = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      let dx = Math.round(moveEvent.clientX - startX);
      let dy = Math.round(moveEvent.clientY - startY);

      if (settingsState.snapWindows) {
        const activeStart = startPositions.get(windowState.id);
        if (!activeStart) return;
        const activeRect = {
          left: activeStart.x + dx,
          top: activeStart.y + dy,
          right: activeStart.x + activeStart.width + dx,
          bottom: activeStart.y + activeStart.height + dy,
          width: activeStart.width,
          height: activeStart.height,
        };
        const snapDelta = getBestSnapDelta(activeRect, getSnapTargets(activeGroup));
        dx += snapDelta.dx;
        dy += snapDelta.dy;
      }

      const clamped = clampGroupDelta(activeGroup, startPositions, dx, dy);
      moveWindowGroup(activeGroup, startPositions, clamped.dx, clamped.dy);
    };

    const stopDrag = (stopEvent) => {
      stopEvent?.preventDefault?.();
      stopEvent?.stopPropagation?.();
      activeGroup.forEach((groupWindow) => {
        getSecondaryWindowElement(groupWindow.id)?.classList.remove("is-dragging");
        updateMainAttachmentOffsets(groupWindow);
      });
      document.removeEventListener("mousemove", moveWindow, true);
      document.removeEventListener("mouseup", stopDrag, true);
      saveWindows();
    };

    document.addEventListener("mousemove", moveWindow, true);
    document.addEventListener("mouseup", stopDrag, true);
  };

  header.addEventListener("mousedown", startDrag, true);
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

  if (overlay) {
    overlay.style.width = `${Math.max(mainWindowSize.width, 220)}px`;
    overlay.style.height = `${Math.max(mainWindowSize.height, 80)}px`;

    makeMeterResizable(
      overlay,
      () => ({
        width: mainWindowSize.width || overlay.offsetWidth,
        height: mainWindowSize.height || overlay.offsetHeight,
      }),
      (nextSize) => {
        const beforeRect = getRectFromElement(overlay);
        mainWindowSize = {
          width: Math.max(220, nextSize.width),
          height: Math.max(80, nextSize.height),
        };
        overlay.style.width = `${mainWindowSize.width}px`;
        overlay.style.height = `${mainWindowSize.height}px`;
        moveWindowsAttachedToResize(overlay, beforeRect, getRectFromElement(overlay));
      },
      () => {
        saveMainWindowSize(mainWindowSize);
      }
    );
  }

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

  const restoreManualWindowHeights = () => {
    if (overlay) {
      overlay.style.height = `${Math.max(mainWindowSize.height, 80)}px`;
    }

    secondaryWindows.forEach((windowState) => {
      const windowElement = getSecondaryWindowElement(windowState.id);
      if (windowElement) {
        windowElement.style.height = `${Math.max(windowState.height || 120, 120)}px`;
        keepWindowInOverlayBounds(windowState, windowElement);
      }
    });
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
      windowElement.classList.toggle("is-locked", windowState.locked === true);
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
          <div class="enc-dps" aria-label="Total ${getModeLabel(windowElement.dataset.mode)}">
            <span class="top-stat-value">0</span>
            <small class="top-stat-label">Total DPS</small>
          </div>
          <button class="mode-button" type="button">${getModeLabel(windowElement.dataset.mode)}</button>
          <button class="menu-button secondary-menu-button" type="button" title="Window menu">&#8942;</button>
        </div>
      `;

      const modeButton = header.querySelector(".mode-button");
      const menuButton = header.querySelector(".secondary-menu-button");

      makeSecondaryWindowDraggable(windowElement, header, windowState, () => {
        saveSecondaryWindows(secondaryWindows);
        renderWindowManagerList();
      });

      windowElement.appendChild(makeResizeGrip());

      makeMeterResizable(
        windowElement,
        () => ({
          width: windowState.width || windowElement.offsetWidth,
          height: windowState.height || windowElement.offsetHeight,
        }),
        (nextSize) => {
          windowState.width = Math.max(240, nextSize.width);
          windowState.height = Math.max(120, nextSize.height);
          windowElement.style.width = `${windowState.width}px`;
          windowElement.style.height = `${windowState.height}px`;
          keepWindowInOverlayBounds(windowState, windowElement);
        },
        () => {
          saveSecondaryWindows(secondaryWindows);
          renderWindowManagerList();
        }
      );

      modeButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        cycleMeterMode(windowElement);
      });

      menuButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        const existingMenu = windowElement.querySelector(".secondary-settings-menu");
        existingMenu?.classList.toggle("hidden");
      });

      const secondaryMenu = document.createElement("section");
      secondaryMenu.className = "settings-menu secondary-settings-menu hidden";
      secondaryMenu.innerHTML = `
        <button class="settings-action secondary-lock-window" type="button">${windowState.locked ? "Unlock" : "Lock"}</button>
        <button class="settings-action secondary-close-window" type="button">Close Window</button>
      `;

      const lockWindowButton = secondaryMenu.querySelector(".secondary-lock-window");
      const closeWindowButton = secondaryMenu.querySelector(".secondary-close-window");
      lockWindowButton?.addEventListener("click", (event) => {
        event.stopPropagation();
        windowState.locked = !windowState.locked;
        saveSecondaryWindows(secondaryWindows);
        renderSecondaryWindows();
        renderWindowManagerList();
      });

      closeWindowButton?.addEventListener("click", (event) => {
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

      windowElement.append(header, secondaryMenu, body);
      secondaryWindowsContainer.appendChild(windowElement);
      if (windowState.attachedToMain === true) {
        anchorWindowToMain(windowState, document.getElementById("overlay")?.getBoundingClientRect());
      }
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

    const updateWindowSize = (windowState, dimension, value) => {
      const minimum = dimension === "width" ? 240 : 120;
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return;

      windowState[dimension] = Math.max(minimum, Math.round(parsed));
      saveSecondaryWindows(secondaryWindows);
      renderSecondaryWindows();
      renderWindowManagerList();
    };

    const createSizeControl = (windowState, dimension, label, min) => {
      const control = document.createElement("label");
      control.className = "window-manager-size-control";

      const labelText = document.createElement("span");
      labelText.textContent = label;

      const input = document.createElement("input");
      input.type = "number";
      input.min = String(min);
      input.step = "10";
      input.value = String(Math.max(windowState[dimension] || min, min));

      input.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      input.addEventListener("change", () => {
        updateWindowSize(windowState, dimension, input.value);
      });

      control.append(labelText, input);
      return control;
    };

    secondaryWindows.forEach((windowState) => {
      const item = document.createElement("div");
      item.className = "window-manager-item";

      const title = document.createElement("span");
      title.textContent = windowState.title;
      title.className = "window-manager-title";

      const sizeControls = document.createElement("div");
      sizeControls.className = "window-manager-size-controls";
      const deleteButton = document.createElement("button");
      deleteButton.className = "window-delete";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeSecondaryWindow(windowState.id);
      });

      sizeControls.append(
        createSizeControl(windowState, "width", "W", 240),
        createSizeControl(windowState, "height", "H", 120),
        deleteButton
      );

      item.append(title, sizeControls);
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
  makePanelDraggable(preferencesWindow, preferencesWindow?.querySelector(".preferences-header"));

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
  const showCornerAidToggle =
    document.getElementById("show-corner-aid-toggle");
  const autoGrowWindowsToggle =
    document.getElementById("auto-grow-windows-toggle");
  const snapWindowsToggle =
    document.getElementById("snap-windows-toggle");
  const attachNewWindowsToggle =
    document.getElementById("attach-new-windows-toggle");

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

  if (showCornerAidToggle) {
    showCornerAidToggle.checked = settingsState.showCornerAid;

    showCornerAidToggle.addEventListener("change", () => {
      settingsState.showCornerAid = showCornerAidToggle.checked;
      localStorage.setItem("showCornerAid", String(settingsState.showCornerAid));
      applyOverlaySettings();
    });
  }

  if (autoGrowWindowsToggle) {
    autoGrowWindowsToggle.checked = settingsState.autoGrowWindows;

    autoGrowWindowsToggle.addEventListener("change", () => {
      settingsState.autoGrowWindows = autoGrowWindowsToggle.checked;
      localStorage.setItem("autoGrowWindows", String(settingsState.autoGrowWindows));
      if (!settingsState.autoGrowWindows) {
        restoreManualWindowHeights();
      }
      applyOverlaySettings();
    });
  }

  if (snapWindowsToggle) {
    snapWindowsToggle.checked = settingsState.snapWindows;

    snapWindowsToggle.addEventListener("change", () => {
      settingsState.snapWindows = snapWindowsToggle.checked;
      localStorage.setItem("snapWindows", String(settingsState.snapWindows));
    });
  }

  if (attachNewWindowsToggle) {
    attachNewWindowsToggle.checked = settingsState.attachNewWindowsToMain;

    attachNewWindowsToggle.addEventListener("change", () => {
      settingsState.attachNewWindowsToMain = attachNewWindowsToggle.checked;
      localStorage.setItem("attachNewWindowsToMain", String(settingsState.attachNewWindowsToMain));
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
  const textColorPreview = document.getElementById("text-color-preview");
  const textColorPickerPanel = document.getElementById("text-color-picker-panel");
  const textColorMap = document.getElementById("text-color-map");
  const textColorHandle = document.getElementById("text-color-handle");
  const textColorHueInput = document.getElementById("text-color-hue");
  const textColorHexInput = document.getElementById("text-color-hex");
  const textColorApplyButton = document.getElementById("text-color-apply");
  const textColorCancelButton = document.getElementById("text-color-cancel");
  const textStrokeWidthInput = document.getElementById("text-stroke-width");
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
  let textPickerHsv = { h: 0, s: 0, v: 1 };

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

  const setTextColorControls = (color, updatePicker = true) => {
    const clean = String(color).replace("#", "");
    const rgb = [
      Number(`0x${clean.substring(0, 2)}`) || 0,
      Number(`0x${clean.substring(2, 4)}`) || 0,
      Number(`0x${clean.substring(4, 6)}`) || 0,
    ];

    if (updatePicker) {
      textPickerHsv = rgbToHsv(rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0);
    }

    if (textColorHexInput) {
      textColorHexInput.value = color.toUpperCase();
    }

    if (textColorHueInput) {
      textColorHueInput.value = String(Math.round(textPickerHsv.h));
    }

    if (textColorPreview) {
      textColorPreview.style.backgroundColor = color;
    }

    if (textColorMap) {
      textColorMap.style.setProperty("--picker-hue", String(Math.round(textPickerHsv.h)));
    }

    if (textColorHandle) {
      textColorHandle.style.left = `${textPickerHsv.s * 100}%`;
      textColorHandle.style.top = `${(1 - textPickerHsv.v) * 100}%`;
    }
  };

  const setBarColorFromPicker = () => {
    const rgb = hsvToRgb(barPickerHsv.h, barPickerHsv.s, barPickerHsv.v);
    const color = rgbToHex(rgb.r, rgb.g, rgb.b);
    setBarColorControls(color, false);
    return color;
  };

  const setTextColorFromPicker = () => {
    const rgb = hsvToRgb(textPickerHsv.h, textPickerHsv.s, textPickerHsv.v);
    const color = rgbToHex(rgb.r, rgb.g, rgb.b);
    setTextColorControls(color, false);
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

  const updateTextPickerFromEvent = (event) => {
    if (!textColorMap) return;

    const rect = textColorMap.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

    textPickerHsv.s = rect.width === 0 ? 0 : x / rect.width;
    textPickerHsv.v = rect.height === 0 ? 0 : 1 - y / rect.height;

    setTextColorFromPicker();
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

  if (textColorPreview) {
    textColorPreview.style.backgroundColor = settingsState.textColor;
    textColorPreview.addEventListener("click", (event) => {
      event.stopPropagation();
      textColorPickerPanel?.classList.toggle("hidden");
    });
  }

  if (textColorHexInput) {
    textColorHexInput.value = settingsState.textColor;
    textColorHexInput.addEventListener("input", () => {
      const sanitized = sanitizeHex(textColorHexInput.value);
      if (sanitized) {
        setTextColorControls(sanitized);
      }
    });
  }

  if (textColorHueInput) {
    textColorHueInput.addEventListener("input", () => {
      textPickerHsv.h = Number(textColorHueInput.value);
      setTextColorFromPicker();
    });
  }

  if (textColorMap) {
    let isPickingTextColor = false;

    const stopPickingTextColor = () => {
      isPickingTextColor = false;
      document.removeEventListener("mousemove", movePickingTextColor);
      document.removeEventListener("mouseup", stopPickingTextColor);
    };

    const movePickingTextColor = (event) => {
      if (!isPickingTextColor) return;
      event.preventDefault();
      updateTextPickerFromEvent(event);
    };

    textColorMap.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      isPickingTextColor = true;
      updateTextPickerFromEvent(event);
      document.addEventListener("mousemove", movePickingTextColor);
      document.addEventListener("mouseup", stopPickingTextColor);
    });
  }

  textColorApplyButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const sanitized = sanitizeHex(textColorHexInput?.value);
    if (sanitized) {
      settingsState.textColor = sanitized;
      localStorage.setItem("textColor", settingsState.textColor);
      applyOverlaySettings();
    }
  });

  textColorCancelButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setTextColorControls(settingsState.textColor);
    textColorPickerPanel?.classList.add("hidden");
  });

  setTextColorControls(settingsState.textColor);

  if (textStrokeWidthInput) {
    textStrokeWidthInput.value = String(settingsState.textStrokeWidth);

    const updateTextStrokeWidth = (commitValue = false) => {
      const width = clampTextStrokeWidth(Number(textStrokeWidthInput.value));
      settingsState.textStrokeWidth = width;
      localStorage.setItem("textStrokeWidth", String(settingsState.textStrokeWidth));
      if (commitValue) {
        textStrokeWidthInput.value = String(width);
      }
      applyOverlaySettings();
    };

    textStrokeWidthInput.addEventListener("input", () => updateTextStrokeWidth());
    textStrokeWidthInput.addEventListener("change", () => updateTextStrokeWidth(true));
  }

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
    settingsState.showCornerAid = DEFAULT_SETTINGS.showCornerAid;
    settingsState.autoGrowWindows = DEFAULT_SETTINGS.autoGrowWindows;
    settingsState.snapWindows = DEFAULT_SETTINGS.snapWindows;
    settingsState.attachNewWindowsToMain = DEFAULT_SETTINGS.attachNewWindowsToMain;
    settingsState.showMeterBg = DEFAULT_SETTINGS.showMeterBg;
    settingsState.meterBgColor = DEFAULT_SETTINGS.meterBgColor;
    settingsState.meterBgOpacity = DEFAULT_SETTINGS.meterBgOpacity;
    settingsState.barColorMode = DEFAULT_SETTINGS.barColorMode;
    settingsState.barCustomColor = DEFAULT_SETTINGS.barCustomColor;
    settingsState.textColor = DEFAULT_SETTINGS.textColor;
    settingsState.textStrokeWidth = DEFAULT_SETTINGS.textStrokeWidth;
    settingsState.barHeight = DEFAULT_SETTINGS.barHeight;
    settingsState.barMaximum = DEFAULT_SETTINGS.barMaximum;

    localStorage.setItem("obscureNames", String(settingsState.obscureNames));
    localStorage.setItem("showRanks", String(settingsState.showRanks));
    localStorage.setItem("showDeaths", String(settingsState.showDeaths));
    localStorage.setItem("showFooter", String(settingsState.showFooter));
    localStorage.setItem("alwaysShowPlayer", String(settingsState.alwaysShowPlayer));
    localStorage.setItem("showCornerAid", String(settingsState.showCornerAid));
    localStorage.setItem("autoGrowWindows", String(settingsState.autoGrowWindows));
    localStorage.setItem("snapWindows", String(settingsState.snapWindows));
    localStorage.setItem("attachNewWindowsToMain", String(settingsState.attachNewWindowsToMain));
    localStorage.setItem("showMeterBg", String(settingsState.showMeterBg));
    localStorage.setItem("meterBgColor", settingsState.meterBgColor);
    localStorage.setItem("meterBgOpacity", settingsState.meterBgOpacity);
    localStorage.setItem("barColorMode", settingsState.barColorMode);
    localStorage.setItem("barCustomColor", settingsState.barCustomColor);
    localStorage.setItem("textColor", settingsState.textColor);
    localStorage.setItem("textStrokeWidth", String(settingsState.textStrokeWidth));
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

    if (showCornerAidToggle) {
      showCornerAidToggle.checked = settingsState.showCornerAid;
    }

    if (autoGrowWindowsToggle) {
      autoGrowWindowsToggle.checked = settingsState.autoGrowWindows;
    }

    if (snapWindowsToggle) {
      snapWindowsToggle.checked = settingsState.snapWindows;
    }

    if (attachNewWindowsToggle) {
      attachNewWindowsToggle.checked = settingsState.attachNewWindowsToMain;
    }

    if (showMeterBgToggle) {
      showMeterBgToggle.checked = settingsState.showMeterBg;
    }

    updateBarColorModeButtons();

    setBarColorControls(settingsState.barCustomColor);
    updateBarCustomVisibility();

    setTextColorControls(settingsState.textColor);

    if (textStrokeWidthInput) {
      textStrokeWidthInput.value = String(settingsState.textStrokeWidth);
    }

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

    if (!settingsState.autoGrowWindows) {
      restoreManualWindowHeights();
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
    textColorPreview,
    textColorPickerPanel,
    textColorMap,
    textColorHueInput,
    textColorHexInput,
    textStrokeWidthInput,
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
        "#preferences-window, #settings-menu, #window-manager, #secondary-windows, #open-preferences, #create-secondary-window, #open-window-manager, #reset-defaults, #color-picker-panel, #meter-bg-color-preview, #meter-bg-color-map, #meter-bg-hue, #meter-bg-hex, #meter-bg-opacity, #text-color-picker-panel, #text-color-preview, #text-color-map, #text-color-hue, #text-color-hex, #text-stroke-width, #meter-bar-height, #meter-bar-maximum, .settings-field, .settings-row, .settings-action, input, button"
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
