import React from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const habits = [
  {
    id: 1,
    title: "Carry a reusable bottle",
    category: "Waste",
    points: 14,
    impact: "Saves about 3 plastic bottles",
    tip: "Refill before leaving home."
  },
  {
    id: 2,
    title: "Use public transport",
    category: "Travel",
    points: 22,
    impact: "Cuts about 2.4 kg CO2",
    tip: "Plan the route the night before."
  },
  {
    id: 3,
    title: "Eat a plant-rich meal",
    category: "Food",
    points: 18,
    impact: "Uses less water and land",
    tip: "Try lentils, beans, or tofu."
  },
  {
    id: 4,
    title: "Switch off unused lights",
    category: "Energy",
    points: 10,
    impact: "Reduces home electricity use",
    tip: "Check one room before bed."
  },
  {
    id: 5,
    title: "Compost kitchen scraps",
    category: "Waste",
    points: 16,
    impact: "Keeps food waste out of landfill",
    tip: "Start with fruit and vegetable peels."
  },
  {
    id: 6,
    title: "Take a shorter shower",
    category: "Water",
    points: 12,
    impact: "Saves 15-25 liters of water",
    tip: "Use one favorite song as a timer."
  }
];

const challenges = [
  "No single-use plastic today",
  "Walk or cycle for one short trip",
  "Cook one low-waste meal",
  "Unplug idle chargers tonight"
];

function App() {
  const [completed, setCompleted] = React.useState([1, 4]);
  const [category, setCategory] = React.useState("All");
  const [household, setHousehold] = React.useState(3);

  const categories = ["All", ...new Set(habits.map((habit) => habit.category))];
  const visibleHabits =
    category === "All" ? habits : habits.filter((habit) => habit.category === category);

  const completedHabits = habits.filter((habit) => completed.includes(habit.id));
  const totalPoints = completedHabits.reduce((sum, habit) => sum + habit.points, 0);
  const progress = Math.round((completed.length / habits.length) * 100);
  const monthlyImpact = Math.round(totalPoints * household * 1.8);

  function toggleHabit(id) {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">React JS Project</p>
          <h1>EcoHabit Dashboard</h1>
          <p>
            Track small sustainable actions, build a daily streak, and estimate the impact your
            household can create over a month.
          </p>
          <div className="hero-actions">
            <a href="#habits" className="primary-action">Start Tracking</a>
            <a href="#impact" className="secondary-action">View Impact</a>
          </div>
        </div>
        <img
          className="hero-image"
          src="/assets/eco-dashboard-hero.png"
          alt="Eco habit dashboard illustration"
        />
      </section>

      <section className="stats-grid" aria-label="Eco habit summary">
        <StatCard
          label="Daily progress"
          value={`${progress}%`}
          detail={`${completed.length} of ${habits.length} habits complete`}
        />
        <StatCard label="Green points" value={totalPoints} detail="Earned from today's actions" />
        <StatCard
          label="Monthly estimate"
          value={`${monthlyImpact} kg`}
          detail="Potential CO2-style impact score"
        />
      </section>

      <section className="workspace">
        <div className="panel habits-panel" id="habits">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Daily Checklist</p>
              <h2>Choose today's actions</h2>
            </div>
            <div className="filters" aria-label="Filter habits by category">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "filter active" : "filter"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="habit-list">
            {visibleHabits.map((habit) => {
              const isDone = completed.includes(habit.id);
              return (
                <article className={isDone ? "habit-card done" : "habit-card"} key={habit.id}>
                  <label className="habit-check">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleHabit(habit.id)}
                    />
                    <span aria-hidden="true"></span>
                  </label>
                  <div>
                    <div className="habit-title-row">
                      <h3>{habit.title}</h3>
                      <strong>{habit.points} pts</strong>
                    </div>
                    <p>{habit.impact}</p>
                    <small>{habit.tip}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="panel side-panel" id="impact">
          <p className="eyebrow">Impact Planner</p>
          <h2>Household calculator</h2>
          <label className="range-label" htmlFor="household">
            Household members <strong>{household}</strong>
          </label>
          <input
            id="household"
            type="range"
            min="1"
            max="8"
            value={household}
            onChange={(event) => setHousehold(Number(event.target.value))}
          />
          <div className="impact-meter">
            <span style={{ width: `${Math.min(monthlyImpact / 4, 100)}%` }}></span>
          </div>
          <p className="impact-copy">
            If everyone repeats today's completed habits, your monthly impact score could reach
            <strong> {monthlyImpact} kg</strong>.
          </p>

          <div className="challenge-box">
            <h3>Mini challenges</h3>
            {challenges.map((challenge, index) => (
              <div className="challenge" key={challenge}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{challenge}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

function StatCard({ label, value, detail }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
