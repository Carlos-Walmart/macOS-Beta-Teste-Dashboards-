import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

/*
  macOS Beta Community Insights Dashboard by Carlito 
  ---------------------------------------
  This React component renders a preview dashboard for the macOS Beta Teams channel <added link>.

  Quick guide for me
  1) COLORS - theme colors used throughout the dashboard.
  2) DATA ARRAYS - sample data embedded below (activityTimeline, topTopics, topUsers, reactions).
     Replace these arrays with values from your exported JSON/CSV if you want the dashboard to update.
  3) Derived totals - simple JS calculations that sum values used in the summary cards.
  4) The default exported function returns the page structure (header, main grid, footer).
     Each major UI block is marked with a comment in the JSX so you can find it easily.

  To update numbers manually: edit the objects inside the data arrays (for example, change the numbers in `reactions`).
  To change the title or wording: update the text inside <h1> or the summary link in the header.
*/

// -----------------------------
// 1) Theme colors
// -----------------------------
const COLORS = {
  background: "#0D1117",      // page background color
  card: "#161B22",            // card backgrounds
  primaryText: "#E6E6E6",     // main text color
  secondaryText: "#A3A3A3",   // secondary text color (labels, hints)
  accentYellow: "#F7C843",
  accentBlue: "#58A6FF",
  accentGreen: "#3FB950",
  orange: "#FFA657",
  red: "#F85149",
  purple: "#B281EB",
  neutralGray: "#6E7681",
};

// -----------------------------
// 2) Sample data arrays
// Replace these with values from your cleaned CSV/JSON if you want live data.
// - activityTimeline: daily message counts for the line chart
// - topTopics: topic name + message count for the bar chart
// - topUsers: contributor summary used for the contributor cards
// - reactions: reaction types used in the pie chart
// -----------------------------
const activityTimeline = [
  { date: "Jul 22", messages: 3 },
  { date: "Jul 24", messages: 2 },
  { date: "Jul 28", messages: 1 },
  { date: "Aug 11", messages: 1 },
  { date: "Aug 13", messages: 2 },
  { date: "Aug 14", messages: 1 },
  { date: "Aug 18", messages: 1 },
  { date: "Aug 19", messages: 2 },
  { date: "Sep 16", messages: 1 },
  { date: "Sep 17", messages: 2 },
  { date: "Sep 18", messages: 1 },
  { date: "Sep 21", messages: 1 },
  { date: "Sep 24", messages: 2 },
  { date: "Sep 30", messages: 1 },
  { date: "Oct 6", messages: 3 },
  { date: "Oct 20", messages: 1 },
];

const topTopics = [
  { name: "News", value: 7 },
  { name: "Outlook", value: 5 },
  { name: "Password", value: 4 },
  { name: "Feedback Assistant", value: 2 },
  { name: "Speed", value: 2 },
  { name: "Performance", value: 2 },
  { name: "Connectivity", value: 1 },
  { name: "Display", value: 1 },
];

const topUsers = [
  { name: "Jesper Johansson", messages: 7, engagement: 102 },
  { name: "Carlos Garcia", messages: 8, engagement: 47 },
  { name: "Ashish Gupta", messages: 1, engagement: 26 },
  { name: "Tushar Kohli", messages: 3, engagement: 20 },
  { name: "Vinoth Boobalan", messages: 3, engagement: 20 },
];

// Expanded reactions (multiple categories to make the pie chart meaningful)
const reactions = [
  { name: "Like 👍", value: 38, color: COLORS.accentBlue },
  { name: "Love ❤️", value: 24, color: COLORS.red },
  { name: "Insightful 💡", value: 12, color: COLORS.accentYellow },
  { name: "Confused 🤔", value: 8, color: COLORS.purple },
];

// -----------------------------
// 3) Derived totals
// These are simple sums computed from the arrays above; they are used in the summary boxes.
// -----------------------------
const totalReactions = reactions.reduce((s, r) => s + (r.value || 0), 0); // sum of reaction counts
const totalResponses = topUsers.reduce((s, u) => s + (u.engagement || 0), 0);   // sum of engagement per user

/*
  Notes
  - If you want "total active users" to be dynamic, you can load the CSV and compute df["name"].nunique().
  - For now the header shows a static "190 active users" text; we can wire this to the CSV if you want.
*/

// -----------------------------
// 4) React component (JSX)
// The default exported function returns the dashboard layout. Each main block is commented so it's easy to find.
// -----------------------------
export default function ChatCommentsDashboardPreview() {
  return (
    <div className="min-h-screen p-6" style={{ background: COLORS.background, color: COLORS.primaryText }}>
      <div className="max-w-7xl mx-auto">

        {/* HEADER: Title, description, active-users link, and action buttons */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            {/* Main title - change this text to rename the dashboard */}
            <h1 className="text-2xl font-semibold" style={{ color: COLORS.primaryText }}>
              macOS Beta Community Insights
            </h1>

            {/* Short description under the title */}
            <p className="text-sm mt-1" style={{ color: COLORS.secondaryText }}>
              Based on the corrected October 2025 Beta Teams dataset.
            </p>

            {/* Active-users note (clickable) - updates to a Teams link */}
            <a
              href="https://teams.microsoft.com/l/channel/19%3AltsddcMYixLw0ftrKEKMHr7R7gLs-bsj2WP7mexxa2w1%40thread.tacv2/macOS%20Tahoe%20Feedback?groupId=05c93ec5-f53f-491d-a30f-4f083101939e&tenantId=3cbcc3d3-094d-4006-9849-0d11d61f484d"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium hover:underline"
              style={{ color: COLORS.accentGreen }}
            >
              👥 There are currently <span className="font-semibold">190 active users</span> in this Teams channel.
            </a>
          </div>

          {/* Action buttons (right side of header) */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-2 rounded-md text-sm font-medium" style={{ background: COLORS.card }}>
              Last updated: Oct 20
            </span>
            <button className="px-4 py-2 rounded-md font-medium" style={{ background: COLORS.accentBlue, color: COLORS.background }}>
              Export CSV
            </button>
          </div>
        </header>

        {/* MAIN GRID: 3 columns layout
            Left: Activity Timeline (line chart)
            Right: Top Topics (bar chart)
            Full width below: Contributors + Reactions
        */}
        <main className="grid grid-cols-3 gap-6">

          {/* Activity Timeline (left two columns) */}
          <section className="col-span-2 bg-[var(--card)] rounded-2xl p-6" style={{ background: COLORS.card }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: COLORS.primaryText }}>Activity Timeline</h2>
              <span className="text-sm" style={{ color: COLORS.secondaryText }}>Messages per day</span>
            </div>

            {/* Line chart showing activity over time. Replace `activityTimeline` with live data to reflect real history. */}
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityTimeline}> 
                  <CartesianGrid stroke="#111318" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke={COLORS.secondaryText} />
                  <YAxis stroke={COLORS.secondaryText} />
                  <Tooltip contentStyle={{ background: COLORS.card, border: 'none', color: COLORS.primaryText }} />
                  <Line type="monotone" dataKey="messages" stroke={COLORS.accentBlue} strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top Topics (right column) */}
          <section className="bg-[var(--card)] rounded-2xl p-6" style={{ background: COLORS.card }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.primaryText }}>Top Topics</h2>

            {/* Vertical bar chart showing top topics and their counts. */}
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTopics} layout="vertical">
                  <CartesianGrid stroke="#111318" />
                  <XAxis type="number" stroke={COLORS.secondaryText} />
                  <YAxis type="category" dataKey="name" stroke={COLORS.secondaryText} width={160} />
                  <Tooltip contentStyle={{ background: COLORS.card, border: 'none', color: COLORS.primaryText }} />
                  <Bar dataKey="value" fill={COLORS.accentYellow} radius={[6, 6, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Most Active Contributors (full width section) */}
          <section className="col-span-3 bg-[var(--card)] rounded-2xl p-6" style={{ background: COLORS.card }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: COLORS.primaryText }}>Most Active Contributors</h2>
              <span className="text-sm" style={{ color: COLORS.secondaryText }}>Reactions • Responses</span>
            </div>

            {/* Summary boxes: top-left = Total Reactions, top-right = Total Responses */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 rounded-lg flex items-center justify-between" style={{ background: '#0F1418' }}>
                <div>
                  {/* Label for the left summary box */}
                  <div className="text-xs" style={{ color: COLORS.secondaryText }}>Total Reactions</div>
                  {/* The numeric value shown here is computed from the `reactions` array above */}
                  <div className="text-2xl font-semibold" style={{ color: COLORS.primaryText }}>{totalReactions}</div>
                </div>
                <div className="text-sm" style={{ color: COLORS.accentBlue }}>
                  <div className="text-xs">from</div>
                  <div className="font-medium">{topUsers.length} users</div>
                </div>
              </div>

              <div className="p-4 rounded-lg flex items-center justify-between" style={{ background: '#0F1418' }}>
                <div>
                  <div className="text-xs" style={{ color: COLORS.secondaryText }}>Total Responses</div>
                  <div className="text-2xl font-semibold" style={{ color: COLORS.primaryText }}>{totalResponses}</div>
                </div>
                <div className="text-sm" style={{ color: COLORS.accentGreen }}>
                  <div className="text-xs">reactions</div>
                  <div className="font-medium">{totalReactions}</div>
                </div>
              </div>
            </div>

            {/* Grid of contributor cards (name, messages, engagement/responses) */}
            <div className="grid grid-cols-5 gap-4">
              {topUsers.map((u) => (
                <div key={u.name} className="p-4 rounded-lg flex flex-col justify-between" style={{ background: '#0F1418' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: COLORS.primaryText }}>{u.name}</div>
                      <div className="text-xs mt-1" style={{ color: COLORS.secondaryText }}>{u.messages} messages</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold" style={{ color: COLORS.accentBlue }}>{u.engagement}</div>
                      <div className="text-xs" style={{ color: COLORS.secondaryText }}>responses</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {/* small bar visual to keep card heights consistent */}
                    <div style={{ height: 6, background: '#0B0E11', borderRadius: 6 }}>
                      <div style={{ width: `${Math.min(100, u.engagement)}%`, height: 6, borderRadius: 6, background: COLORS.accentBlue }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reactions (right column) - now an expanded pie with multiple categories */}
          <section className="col-span-1 bg-[var(--card)] rounded-2xl p-6" style={{ background: COLORS.card }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.primaryText }}>Reaction Breakdown</h2>

            {/* Pie chart showing reaction types. Labels show both name and numeric value. */}
            <div style={{ height: 300 }} className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reactions}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {reactions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: COLORS.card, border: 'none', color: COLORS.primaryText }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend: simple rows showing color swatch, name, and count */}
            <div className="mt-6 space-y-2">
              {reactions.map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 14, height: 14, background: r.color, borderRadius: 3 }} />
                    <div style={{ color: COLORS.primaryText }}>{r.name}</div>
                  </div>
                  <div style={{ color: COLORS.secondaryText }}>{r.value}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer with data source note */}
        <footer className="mt-8 text-sm text-center" style={{ color: COLORS.secondaryText }}>
          Data source: macOS Beta Community Insights — Cleaned and corrected (42 records, Oct 2025)
        </footer>
      </div>
    </div>
  );
}
