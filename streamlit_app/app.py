"""
kinetic-alchemy: The Bio-Forge
Streamlit Cloud Application

This app hosts both the HTML5 Clinical Simulator Game and the Python Analytics Dashboard.
Everything works seamlessly from a single Streamlit URL.
"""

import streamlit as st
import json
import base64
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime

# ──────────────────────────────────────────────
# Page config
# ──────────────────────────────────────────────
st.set_page_config(
    page_title="Bio-Forge | kinetic-alchemy",
    page_icon="🧬",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ──────────────────────────────────────────────
# Check for Analytics Data in URL
# ──────────────────────────────────────────────
# When the user clicks "Advanced Analytics" in the game dashboard,
# it redirects the parent window to /?data=<base64_encoded_state>
encoded_data = st.query_params.get("data", None)

if not encoded_data:
    # ──────────────────────────────────────────────
    # GAME VIEW (HTML/JS)
    # ──────────────────────────────────────────────
    # Serve the static HTML game
    st.components.v1.iframe("/app/static/index.html", height=900, scrolling=True)

else:
    # ──────────────────────────────────────────────
    # ANALYTICS DASHBOARD VIEW (Python)
    # ──────────────────────────────────────────────
    try:
        decoded = base64.b64decode(encoded_data).decode("utf-8")
        data = json.loads(decoded)
    except Exception as e:
        st.error(f"❌ Invalid progress data. Please launch analytics from the game dashboard again.")
        data = None

    if data:
        # Custom CSS for Analytics
        st.markdown("""
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');

        :root {
            --neon-blue: #00d4ff;
            --neon-gold: #ffd700;
            --neon-green: #00ff88;
            --neon-red: #ff3366;
            --neon-purple: #7b2eff;
            --bg-dark: #0d0d1e;
        }

        html, body, [class*="css"] {
            font-family: 'Inter', sans-serif;
            background-color: #0d0d1e;
            color: #e8eaff;
        }

        .stApp { background: linear-gradient(135deg, #08080f 0%, #0d0d1e 50%, #12122a 100%); }

        h1, h2, h3 { font-family: 'Orbitron', monospace !important; }

        .metric-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(0,212,255,0.2);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            backdrop-filter: blur(20px);
        }
        .metric-val {
            font-family: 'Orbitron', monospace;
            font-size: 2rem;
            font-weight: 900;
        }
        .metric-label {
            font-size: 0.72rem;
            color: #8892b0;
            letter-spacing: 0.08em;
            margin-top: 4px;
        }
        .section-divider {
            border: none;
            border-top: 1px solid rgba(0,212,255,0.15);
            margin: 24px 0;
        }
        </style>
        """, unsafe_allow_html=True)

        # Back to Game button
        col1, col2 = st.columns([1, 5])
        with col1:
            if st.button("← Back to Game", use_container_width=True):
                st.query_params.clear()
                st.rerun()

        # Header
        player_name = data.get("n", "Unknown")
        ts = data.get("ts", 0)
        last_played = datetime.fromtimestamp(ts / 1000).strftime("%B %d, %Y at %I:%M %p") if ts else "Unknown"

        st.markdown(f"""
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:32px;flex-wrap:wrap">
            <div style="font-size:3rem">🧑‍⚕️</div>
            <div>
                <h1 style="font-family:'Orbitron',monospace;font-size:1.6rem;margin:0;
                    background:linear-gradient(135deg,#00d4ff,#7b2eff);
                    -webkit-background-clip:text;-webkit-text-fill-color:transparent">
                    {player_name}'s Advanced Analytics
                </h1>
                <div style="color:#8892b0;font-size:0.8rem;margin-top:4px">Snapshot: {last_played}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)

        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)

        # ──── STAT CARDS ────
        total_pts = data.get("tp", 0)
        high_score = data.get("hs", 0)
        questions  = data.get("qa", 0)
        correct    = data.get("ca", 0)
        accuracy   = data.get("acc", 0)
        max_streak = data.get("ms", 0)
        bagels     = data.get("bc", 0)

        # Level mapping
        LEVELS = [
            ("Intern", 0, "🩺"),
            ("Junior Dietitian", 300, "📋"),
            ("Senior Dietitian", 800, "🔬"),
            ("Chief Nutritionist", 1600, "🏆"),
            ("Bio-Alchemist", 2800, "⚗️"),
        ]
        current_level = LEVELS[0]
        for lv in LEVELS:
            if total_pts >= lv[1]:
                current_level = lv

        c1, c2, c3, c4, c5, c6 = st.columns(6)
        metrics = [
            (c1, "⭐ Nutri-Points", f"{total_pts:,}", "#ffd700"),
            (c2, "🎯 Accuracy",     f"{accuracy}%",   "#00ff88"),
            (c3, "📋 Questions",    questions,         "#00d4ff"),
            (c4, "✅ Correct",      correct,           "#00ff88"),
            (c5, "🔥 Max Streak",   max_streak,        "#ff8c00"),
            (c6, "🥯 Bagels",       bagels,            "#ffd700"),
        ]
        for col, label, val, color in metrics:
            with col:
                st.markdown(f"""
                <div class="metric-card">
                    <div class="metric-val" style="color:{color}">{val}</div>
                    <div class="metric-label">{label}</div>
                </div>
                """, unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)

        # Level display
        next_level = None
        for lv in LEVELS:
            if lv[1] > total_pts:
                next_level = lv
                break

        st.markdown(f"""
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.2);
            border-radius:12px;padding:16px;margin-bottom:24px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-family:'Orbitron',monospace;color:#00d4ff">{current_level[2]} {current_level[0]}</span>
                <span style="font-family:'Orbitron',monospace;font-size:0.75rem;color:#8892b0">
                    {"→ " + next_level[0] + " (" + str(next_level[1]) + " pts)" if next_level else "🏆 Maximum Level Achieved"}
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        if next_level:
            range_pts = next_level[1] - current_level[1]
            prog_pts  = total_pts - current_level[1]
            pct = min(int(prog_pts / range_pts * 100), 100) if range_pts > 0 else 100
            st.progress(pct / 100, text=f"{pct}% to {next_level[0]}")

        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)

        # ──── CHARTS ────
        col_left, col_right = st.columns([1, 1])

        # Radar chart — category accuracy
        with col_left:
            st.markdown("### 🎯 Category Accuracy Radar")
            cat_stats = data.get("cs", {})
            cat_labels = {
                "fat_soluble_vitamins":   "Fat-Soluble Vitamins",
                "water_soluble_vitamins": "Water-Soluble Vitamins",
                "minerals":               "Minerals & Electrolytes"
            }
            radar_cats = []
            radar_vals = []
            for k, v in cat_stats.items():
                total_q = v.get("total", 0)
                correct_q = v.get("correct", 0)
                pct = round((correct_q / total_q) * 100, 1) if total_q > 0 else 0
                radar_cats.append(cat_labels.get(k, k))
                radar_vals.append(pct)

            if radar_cats and any(v > 0 for v in radar_vals):
                fig_radar = go.Figure()
                fig_radar.add_trace(go.Scatterpolar(
                    r=radar_vals + [radar_vals[0]],
                    theta=radar_cats + [radar_cats[0]],
                    fill='toself',
                    fillcolor='rgba(0, 212, 255, 0.15)',
                    line=dict(color='#00d4ff', width=2),
                    marker=dict(color='#00d4ff', size=8),
                    name="Accuracy %"
                ))
                fig_radar.update_layout(
                    polar=dict(
                        radialaxis=dict(visible=True, range=[0, 100],
                                        tickfont=dict(color="#8892b0", size=10),
                                        gridcolor="rgba(255,255,255,0.08)"),
                        angularaxis=dict(tickfont=dict(color="#e8eaff", size=11),
                                         gridcolor="rgba(255,255,255,0.08)")
                    ),
                    paper_bgcolor="rgba(0,0,0,0)",
                    plot_bgcolor="rgba(0,0,0,0)",
                    font=dict(color="#e8eaff"),
                    showlegend=False,
                    height=360,
                    margin=dict(t=40, b=40, l=60, r=60)
                )
                st.plotly_chart(fig_radar, use_container_width=True)
            else:
                st.info("Play at least one round of each category to see your radar chart!")

        # Bar chart — category breakdown
        with col_right:
            st.markdown("### 📊 Category Performance Breakdown")
            cat_data_rows = []
            for k, v in cat_stats.items():
                total_q = v.get("total", 0)
                correct_q = v.get("correct", 0)
                wrong_q = total_q - correct_q
                pct = round((correct_q / total_q) * 100, 1) if total_q > 0 else 0
                cat_data_rows.append({
                    "Category": cat_labels.get(k, k),
                    "Correct": correct_q,
                    "Wrong": wrong_q,
                    "Accuracy %": pct,
                    "Total": total_q
                })

            if cat_data_rows and any(r["Total"] > 0 for r in cat_data_rows):
                df_cat = pd.DataFrame(cat_data_rows)
                fig_bar = go.Figure()
                fig_bar.add_trace(go.Bar(
                    x=df_cat["Category"], y=df_cat["Correct"],
                    name="Correct", marker_color="#00ff88",
                    text=df_cat["Correct"], textposition="inside"
                ))
                fig_bar.add_trace(go.Bar(
                    x=df_cat["Category"], y=df_cat["Wrong"],
                    name="Wrong", marker_color="#ff3366",
                    text=df_cat["Wrong"], textposition="inside"
                ))
                fig_bar.update_layout(
                    barmode="stack",
                    paper_bgcolor="rgba(0,0,0,0)",
                    plot_bgcolor="rgba(0,0,0,0)",
                    font=dict(color="#e8eaff"),
                    legend=dict(bgcolor="rgba(0,0,0,0)", font=dict(color="#e8eaff")),
                    xaxis=dict(gridcolor="rgba(255,255,255,0.05)", tickfont=dict(size=10)),
                    yaxis=dict(gridcolor="rgba(255,255,255,0.05)"),
                    height=360,
                    margin=dict(t=20, b=20)
                )
                st.plotly_chart(fig_bar, use_container_width=True)
            else:
                st.info("No category data yet.")

        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)

        # ──── KNOWLEDGE GAP HEATMAP ────
        st.markdown("### 🔥 Knowledge Gap Heatmap")
        gap_data = []
        for k, v in cat_stats.items():
            total_q = v.get("total", 0)
            correct_q = v.get("correct", 0)
            pct = round((correct_q / total_q) * 100, 1) if total_q > 0 else 0
            gap = 100 - pct
            gap_data.append({"Category": cat_labels.get(k, k), "Knowledge Gap %": gap, "Accuracy %": pct, "Questions Attempted": total_q})

        if gap_data and any(r["Questions Attempted"] > 0 for r in gap_data):
            df_gap = pd.DataFrame(gap_data).sort_values("Knowledge Gap %", ascending=False)
            fig_gap = px.bar(
                df_gap, x="Knowledge Gap %", y="Category", orientation="h",
                color="Knowledge Gap %",
                color_continuous_scale=["#00ff88", "#ffd700", "#ff3366"],
                range_color=[0, 100],
                text=df_gap["Knowledge Gap %"].apply(lambda x: f"{x}% gap"),
                height=250
            )
            fig_gap.update_layout(
                paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
                font=dict(color="#e8eaff"),
                coloraxis_showscale=False,
                xaxis=dict(range=[0, 100], gridcolor="rgba(255,255,255,0.05)"),
                yaxis=dict(gridcolor="rgba(255,255,255,0.05)"),
                margin=dict(t=10, b=10)
            )
            fig_gap.update_traces(textposition="outside", marker_line_color="rgba(0,0,0,0)")
            st.plotly_chart(fig_gap, use_container_width=True)

            # Recommendations
            worst = df_gap.iloc[0] if not df_gap.empty else None
            if worst is not None and worst["Knowledge Gap %"] > 40:
                st.warning(f"⚠️ Your biggest knowledge gap is **{worst['Category']}** ({worst['Knowledge Gap %']}% gap). Focus more clinical cases here!")
            elif all(r["Accuracy %"] >= 70 for r in gap_data if r["Questions Attempted"] > 0):
                st.success("✅ Excellent across all categories! You're performing at Senior Dietitian level.")
        else:
            st.info("Play more rounds across all categories to see your knowledge gap heatmap.")

        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)

        # ──── PERFORMANCE GAUGES ────
        st.markdown("### ⚗️ Performance Indicators")
        g1, g2, g3 = st.columns(3)

        def make_gauge(val, title, color, suffix="%", max_val=100):
            fig = go.Figure(go.Indicator(
                mode="gauge+number",
                value=val,
                number={"suffix": suffix, "font": {"color": color, "size": 28, "family": "Orbitron"}},
                title={"text": title, "font": {"color": "#8892b0", "size": 12}},
                gauge={
                    "axis": {"range": [0, max_val], "tickcolor": "#4a5268", "tickfont": {"color": "#8892b0"}},
                    "bar": {"color": color, "thickness": 0.3},
                    "bgcolor": "rgba(255,255,255,0.04)",
                    "borderwidth": 0,
                    "steps": [
                        {"range": [0, max_val * 0.4], "color": "rgba(255,51,102,0.1)"},
                        {"range": [max_val * 0.4, max_val * 0.7], "color": "rgba(255,215,0,0.1)"},
                        {"range": [max_val * 0.7, max_val], "color": "rgba(0,255,136,0.1)"}
                    ],
                    "threshold": {"line": {"color": color, "width": 2}, "thickness": 0.8, "value": val}
                }
            ))
            fig.update_layout(
                paper_bgcolor="rgba(0,0,0,0)", font=dict(color="#e8eaff"),
                height=220, margin=dict(t=30, b=10, l=20, r=20)
            )
            return fig

        with g1:
            st.plotly_chart(make_gauge(accuracy, "Accuracy", "#00ff88"), use_container_width=True)
        with g2:
            streak_pct = min(max_streak * 10, 100)
            st.plotly_chart(make_gauge(max_streak, "Max Streak", "#ff8c00", suffix="", max_val=10), use_container_width=True)
        with g3:
            bagel_pct = min(int((bagels / 20) * 100), 100)
            st.plotly_chart(make_gauge(bagel_pct, "Vault Completion", "#ffd700"), use_container_width=True)

        st.markdown("<hr class='section-divider'>", unsafe_allow_html=True)

        # ──── RECOMMENDATIONS ────
        st.markdown("### 📋 Clinical Recommendations")
        recs = []
        if accuracy < 50:
            recs.append(("🔴 High Priority", "Your overall accuracy is below 50%. Review fundamental micronutrient pathophysiology before your next session.", "error"))
        elif accuracy < 70:
            recs.append(("🟡 Improving", "Accuracy is between 50–70%. Focus on understanding RDAs vs ULs and the clinical presentations more carefully.", "warning"))
        else:
            recs.append(("🟢 Strong Performance", "Accuracy above 70%! You have solid foundational knowledge. Push for harder cases.", "success"))

        if max_streak >= 5:
            recs.append(("🔥 Streak Master", f"Your {max_streak}x max streak shows exceptional consistency. Keep it up!", "success"))
        elif max_streak == 0 and questions > 0:
            recs.append(("⚠️ Consistency Needed", "No streaks recorded. Try to maintain focus across consecutive questions.", "warning"))

        if bagels < 5 and questions > 0:
            recs.append(("🥯 Vault Seeker", "Only a few bagels collected. Answer more questions correctly to build your trophy collection!", "info"))
        elif bagels >= 15:
            recs.append(("🏆 Vault Champion", f"Incredible! {bagels}/20 bagels collected — you're a Bio-Alchemist in the making!", "success"))

        for badge_type, msg, alert_type in recs:
            getattr(st, alert_type)(f"**{badge_type}** — {msg}")

        # ──── FOOTER ────
        st.markdown("<br><hr class='section-divider'>", unsafe_allow_html=True)
        st.markdown("""
        <div style="text-align:center;color:#4a5268;font-size:0.75rem;padding:16px 0">
            kinetic-alchemy: The Bio-Forge © 2026 · Analytics powered by Streamlit Cloud<br>
            Grounded in Wardlaw's Contemporary Nutrition
        </div>
        """, unsafe_allow_html=True)
