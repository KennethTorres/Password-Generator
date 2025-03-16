const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const checkBoxes = document.querySelectorAll(".password-options input[type='checkbox']");
const generateBtn = document.querySelector(".generate-btn");
const passwordOutput = document.querySelector(".password-text");
const strengthMeter = document.getElementById("strengthMeter");
const strengthText = document.querySelector(".strength-text");
const tooltip = document.querySelector(".tooltip");
const copyBtn = document.querySelector(".copy-btn");

const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;':\",./<>?"
};

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

const generatePassword = () => {
    const length = parseInt(lengthSlider.value);

    const selectedSets = [...checkBoxes].filter((check) => check.checked).map((check) => charSets[check.id.replace("Check", "")]);

    if (!selectedSets.length) {
        alert("Please select at least one character type");
        return;
    }

    let password = selectedSets.map((set) => set[Math.floor(Math.random() * set.length)]).join("");

    const allChars = selectedSets.join("");

    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password.split("").sort(() => 0.5 - Math.random()).join("");

    passwordOutput.textContent = password;
    calculateStrength(password);
};

const calculateStrength = (password) => {
    let strength = 0;
    const length = password.length;

    if (length >= 8) strength += 1;
    if (length >= 12) strength += 2;
    if (length >= 16) strength += 2;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    const variety = hasUpper + hasLower + hasNumbers + hasSymbols;

    strength += variety;

    if (length < 6) strength = 1;
    if (length < 8 && variety < 3) strength = 2;

    const strengthPercentage = Math.min((strength / 8) * 100, 100);

    let color, strengthLabel;

    if (strengthPercentage <= 20) {
        strengthLabel = "very weak";
        color = "#ff4757";
    } else if (strengthPercentage <= 40) {
        strengthLabel = "weak";
        color = "#ffa502";
    } else if (strengthPercentage <= 70) {
        strengthLabel = "medium";
        color = "#26de81";
    } else {
        strengthLabel = "strong";
        color = "#0bbe65";
    }
    

    strengthMeter.style.width = `${strengthPercentage}%`;
    strengthMeter.style.backgroundColor = color;
    strengthText.textContent = `Strength: ${strengthLabel}`;


};

generatePassword();

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordOutput.textContent).then(() => {
        tooltip.classList.add("visible");
        setTimeout(() => {
            tooltip.classList.remove("visible");
        }, 1000);
    });
});
