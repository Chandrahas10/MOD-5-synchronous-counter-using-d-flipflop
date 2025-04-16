let running = false;
let interval = null;

function toggleStartPause() {
  const btn = document.getElementById("startPauseBtn");
  if (!running) {
    start();
    btn.innerHTML = "⏸ Pause";
  } else {
    pause();
    btn.innerHTML = "▶ Start";
  }
  running = !running;
}

function start() {
  const speed = document.getElementById("clockSpeed").value;
  interval = setInterval(step, speed);
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function step() {
  let curr = parseInt(document.getElementById("currentDecimal").textContent);
  let next = (curr + 1) % 5;

  const bin = next.toString(2).padStart(3, '0');
  document.getElementById("q2").textContent = bin[0];
  document.getElementById("q1").textContent = bin[1];
  document.getElementById("q0").textContent = bin[2];
  document.getElementById("currentDecimal").textContent = next;

  const nextNext = (next + 1) % 5;
  const nextBin = nextNext.toString(2).padStart(3, '0');
  document.getElementById("d2").textContent = nextBin[0];
  document.getElementById("d1").textContent = nextBin[1];
  document.getElementById("d0").textContent = nextBin[2];
  document.getElementById("nextDecimal").textContent = nextNext;
}


// Update clock speed on slider input
document.getElementById("clockSpeed").addEventListener("input", function () {
  document.getElementById("clockLabel").textContent = this.value + "ms";
  if (running) {
    pause();
    start();
  }
});

  //2nd

  let count = 0;
let clock = 0;

function nextStep() {
  clock++;

  // Current state in binary
  const bin = count.toString(2).padStart(3, '0');
  const bits = bin.split('').map(Number);

  // Next state calculation
  const next = (count + 1) % 5;
  const nextBin = next.toString(2).padStart(3, '0');
  const nextBits = nextBin.split('').map(Number);

  // Update Q (current state)
  document.getElementById("q01").textContent = bits[2];
  document.getElementById("q11").textContent = bits[1];
  document.getElementById("q21").textContent = bits[0];

  // Update D (next state)
  document.getElementById("d01").textContent = nextBits[2];
  document.getElementById("d11").textContent = nextBits[1];
  document.getElementById("d21").textContent = nextBits[0];

  // Update displays
  document.getElementById("clockCount").textContent = clock;
  document.getElementById("decimalCount").textContent = count;
  document.getElementById("binaryCount").textContent = bin;
  document.getElementById("nextDecimal").textContent = next;

  // Light indicators
  ["lightQ0", "lightQ1", "lightQ2"].forEach((id, idx) => {
    document.getElementById(id).classList.toggle("active", bits[2 - idx] === 1);
  });

  // Logic gates simulation (example)
  document.getElementById("notOut").textContent = bits[0] === 0 ? 1 : 0;
  document.getElementById("xorOut").textContent = bits[1] ^ bits[2];
  document.getElementById("andOut").textContent = bits[1] & bits[2];

  // Prepare for next step
  count = next;
}

function reset() {
  count = 0;
  clock = 0;
  nextStep(); // Initialize with step 0
}
