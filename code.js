let points = 0;
let pointsPerSecond = 1; // Start with 1 point per second
let upg1Power = 1; // How much each level of Upgrade I contributes to points/sec
let upg2Power = 1; // Multiplier effect for Upgrade I (UII effect)
let upg3Power = 1; // Multiplier effect for Upgrade II (UIII effect)

let upgrade1Cost = 10;
let upgrade2Cost = 100;
let upgrade3Cost = 1000;

let upgrade1Level = 0;
let upgrade2Level = 0;
let upgrade3Level = 0;

const pointsDisplay = document.getElementById('pointsDisplay');
const upgrade1Btn = document.getElementById('upgrade1Btn');
const upgrade2Btn = document.getElementById('upgrade2Btn');
const upgrade3Btn = document.getElementById('upgrade3Btn');

// Function to calculate the power of Upgrade I
function calculateUpg1Power() {
    return 1 + (upgrade2Level * upg2Power);
}

// Function to calculate the total points per second
function calculatePointsPerSecond() {
    return 1 + (upgrade1Level * calculateUpg1Power());
}

// Function to update the points display and button texts
function updateDisplay() {
    pointsDisplay.textContent = `You have ${points} Points (${calculatePointsPerSecond()}/sec)`;
    upgrade1Btn.textContent = `Upgrade I ${upgrade1Level + 1} - +${calculateUpg1Power()} Points/sec - ${upgrade1Cost} Points`;
    upgrade2Btn.textContent = `Upgrade II ${upgrade2Level + 1} - +${upg2Power} to UI effect - ${upgrade2Cost} Points`;
    upgrade3Btn.textContent = `Upgrade III ${upgrade3Level + 1} - +${upg3Power} to UII effect - ${upgrade3Cost} Points`;
}

// Function to increase points per second level and update cost for Upgrade I
function upgrade1() {
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        upgrade1Level++;
        upgrade1Cost = Math.round(upgrade1Cost * 1.5);
        updateDisplay();
        checkButtonAvailability();
    }
}

// Function to increase the power of Upgrade I by upg2Power and update cost for Upgrade II
function upgrade2() {
    if (points >= upgrade2Cost) {
        points -= upgrade2Cost;
        upgrade2Level++;
        upg1Power = calculateUpg1Power(); // Recalculate upg1Power
        upgrade2Cost = Math.round(upgrade2Cost * 2.75);
        updateDisplay();
        checkButtonAvailability();
    }
}

// Function to increase the power of Upgrade II and update cost for Upgrade III
function upgrade3() {
    if (points >= upgrade3Cost) {
        points -= upgrade3Cost;
        upgrade3Level++;
        upg2Power += 1; // Increase the power of Upgrade II
        upgrade3Cost = Math.round(upgrade3Cost * 4.5);
        updateDisplay();
        checkButtonAvailability();
    }
}

// Function to check if the buttons should be enabled or disabled
function checkButtonAvailability() {
    upgrade1Btn.disabled = points < upgrade1Cost;
    upgrade2Btn.disabled = points < upgrade2Cost;
    upgrade3Btn.disabled = points < upgrade3Cost;
}

// Function to update points every second
function updatePoints() {
    points += calculatePointsPerSecond();
    updateDisplay();
    checkButtonAvailability();
}

// Set interval to update points every second
setInterval(updatePoints, 1000);

// Event listeners for the buttons
upgrade1Btn.addEventListener('click', upgrade1);
upgrade2Btn.addEventListener('click', upgrade2);
upgrade3Btn.addEventListener('click', upgrade3);

// Initial call to update display and button status
updateDisplay();
checkButtonAvailability();
