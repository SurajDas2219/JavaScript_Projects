const habitList = document.getElementById("habit-list");
const days = ["M", "T", "W", "TH", "F", "SA", "SU"];

function calculateStreak(dayBoxes) {
  let streak = 0;
  for (let i = 0; i < dayBoxes.length; i++) {
    if (dayBoxes[i].classList.contains("active")) {
      streak++;
    } else {
      break; // pehle inactive mil gaya toh streak break
    }
  }
  return streak;
}

// Reusable function to create habit DOM element
function createHabitElement(habitObj) {
  const habitDiv = document.createElement("div");
  habitDiv.className = "habit";

  // Title row (habit name + delete button)
  const titleRow = document.createElement("div");
  titleRow.style.display = "flex";
  titleRow.style.justifyContent = "space-between";
  titleRow.style.alignItems = "center";

  const title = document.createElement("h3");
  title.innerText = habitObj.title;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.style.background = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.fontSize = "20px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", () => {
    habitDiv.remove();
    saveToLocalStorage();
  });

  titleRow.appendChild(title);
  titleRow.appendChild(deleteBtn);
  habitDiv.appendChild(titleRow);

  const daysDiv = document.createElement("div");
  daysDiv.className = "days";

  // Days section
  const streakDisplay = document.createElement("p");
  streakDisplay.className = "streak";
  streakDisplay.style.fontSize = "14px";
  streakDisplay.style.marginTop = "4px";

  days.forEach((day, i) => {
    const dayBox = document.createElement("div");
    dayBox.className = "day";
    dayBox.innerText = day;

    // Load saved active days
    if (habitObj.days && habitObj.days[i]) {
      dayBox.classList.add("active");
    }

    dayBox.addEventListener("click", () => {
      dayBox.classList.toggle("active");
      const allDays = habitDiv.querySelectorAll(".day");
      const streak = calculateStreak(allDays);
      streakDisplay.innerText = `🔥 Streak: ${streak}`;

      if (streak === 0) {
        streakDisplay.style.color = "red";
      } else if (streak <= 2) {
        streakDisplay.style.color = "orange";
      } else {
        streakDisplay.style.color = "green";
      }
      saveToLocalStorage();
    });

    daysDiv.appendChild(dayBox);
  });

  // Initial streak on load
  const allDays = daysDiv.querySelectorAll(".day");
  const initialStreak = calculateStreak(allDays);
  streakDisplay.innerText = `🔥 Streak: ${initialStreak}`;
  if (initialStreak === 0) {
    streakDisplay.style.color = "red";
  } else if (initialStreak <= 2) {
    streakDisplay.style.color = "orange";
  } else {
    streakDisplay.style.color = "green";
  }

  habitDiv.appendChild(streakDisplay);
  habitDiv.appendChild(daysDiv);
  return habitDiv;
}

// Add new habit
function addHabit() {
  const habitName = document.getElementById("habit-input").value;
  if (habitName.trim() === "") {
    alert("Habit naam likho!");
    return;
  }

  const habitObj = {
    title: habitName,
    days: Array(7).fill(false), // naye habit ke liye sab din off
  };

  const habitElement = createHabitElement(habitObj);
  habitList.appendChild(habitElement);

  document.getElementById("habit-input").value = "";
  saveToLocalStorage();
}

// Save all habits to localStorage
function saveToLocalStorage() {
  const habits = [];

  document.querySelectorAll(".habit").forEach((habitDiv) => {
    const title = habitDiv.querySelector("h3").innerText;
    const dayStatus = Array.from(habitDiv.querySelectorAll(".day")).map((day) =>
      day.classList.contains("active")
    );

    habits.push({ title, days: dayStatus });
  });

  localStorage.setItem("habits", JSON.stringify(habits));
}

// Load habits from localStorage
function loadHabitsFromStorage() {
  const saved = localStorage.getItem("habits");
  if (!saved) return;

  const habits = JSON.parse(saved);

  habits.forEach((h) => {
    const habitElement = createHabitElement(h);
    habitList.appendChild(habitElement);
  });
}

// Page load pe load karna
window.addEventListener("load", loadHabitsFromStorage);
