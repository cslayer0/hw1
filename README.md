# ChronoLoad

This project integrates **both** a predictive model and a recommender system that work together:

### 1. The Predictive Model (Daily Energy Wave)

Just like a weather app forecasts hourly temperature or a navigation app predicts traffic, ChronoLoad predicts your **hourly mental clarity (%)** from 6:00 AM to 11:00 PM.

* **What it models:** It starts with a natural two-process circadian rhythm (modeling the morning analytical peak, the post-lunch afternoon dip, the early-evening creative second wind, and night wind-down).
* **Dynamic inputs:** The forecast shifts in real time based on how much you slept last night, your sleep quality (*Restless*, *Okay*, *Restorative*), how packed your schedule is (*Light Day*, *Moderate*, *Back-to-Back*), and quick micro-boosts during the day (like drinking matcha, taking a 15-minute sunlight walk, or taking a 20-minute power nap).

### 2. The Recommender System (Mind-Match Task Router)

Instead of showing a static list sorted only by due date, ChronoLoad uses a hybrid recommender system to score and rank your tasks for the **current time window**.

* **Effort Profiling:** Tasks are grouped into three psychological effort tiers:
  * **Deep Flow:** High analytical load (coding, math proofs, debugging).
  * **Steady Rhythm:** Associative and creative work (writing, summarizing papers, wireframing).
  * **Light & Cozy:** Low-friction tasks for low-energy windows (answering emails, tidying files, organizing notes).
* **Real-Time Re-Ranking:** When your predicted clarity is high (e.g., 92% at 9:30 AM), the recommender surfaces *Deep Flow* tasks. When your clarity dips (e.g., 46% at 2:30 PM), it protects you from burnout by swapping in *Light & Cozy* 15-minute wins.
* **Feedback Loop:** After finishing a focus session, a 1-tap check-in asks how the task felt (*Effortless Flow*, *Just Right*, or *A Bit Draining*) to calibrate future recommendations to your personal rhythm.

---

## How to Explore the Interactive Mockup

The mockup is built as a clickable, self-contained preview so a brand-new user can test the core loops right away. Here is the best way to try it out:

1. **Scrub Through Time (`Rhythm` Tab):**
   * Drag the slider on the **Today's Energy Wave** card (or click the quick preset buttons like *Morning Peak*, *Midday Dip*, *Evening Flow*, and *Wind Down*).
   * Watch how the little **Brain Aura** character at the top changes its expression and color palette, and notice how the **Matched to Your Brain Now** task cards underneath automatically re-rank their `% Brain Match` scores as the hour changes.
   * Toggle the **Gentle Boosts** pills (`Matcha`, `15m Walk`, `Power Nap`) to see the afternoon curve lift in real time.

2. **Test the AI Auto-Tagger (`Queue` Tab):**
   * Type a new task into the input box (or click one of the sample chips like *"Debug Python script"* or *"Reply to lab emails"*) and hit **Auto-Tag**.
   * The mockup previews the predicted effort category, estimated duration, and best time window before adding it to your live queue.

3. **Run a "What-If" Check-In (`Tune` Tab):**
   * Adjust your **Sleep Last Night** hours (`5.0h` to `9.5h`), sleep quality, and **Today's Schedule & Social Load**.
   * Watch the **Peak Deep Flow** and **Best Recharge Break** windows recalculate at the top of the screen, then hop back to the `Rhythm` tab to see how the wave shifted.

4. **Complete a Mindful Sprint (`Focus` Tab):**
   * Click **Start Focus** on any task to open the breathing timer and ambient soundscape selector (*Soft Rain*, *Warm Waves*, *Quiet*).
   * Click **Complete Session & Reflect** to trigger the 1-tap brain check-in that updates your personal fit score.

---

## Tech Stack (Current Prototype)

* **Frontend:** React (Hooks & memoized state simulation for the energy curve and task scoring)
* **Styling:** Tailwind CSS with a custom warm oat, lavender, sage, and peach psychology palette
* **Graphics & Icons:** Custom inline SVG for the smooth cubic-bezier energy wave and expressive character states, paired with `lucide-react` icons