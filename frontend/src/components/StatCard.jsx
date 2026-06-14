import React from "react";

function StatCard({ label, value, icon, tone }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__icon">{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export default StatCard;
