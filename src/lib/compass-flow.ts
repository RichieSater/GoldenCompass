import type { CompassScreen, CompassSection } from "@/types/compass";

// ---------------------------------------------------------------------------
// Section 0: Pre-Flight
// ---------------------------------------------------------------------------
const preflightScreens: CompassScreen[] = [
  {
    id: "preflight-welcome",
    sectionIndex: 0,
    sectionKey: "preflight",
    sectionTitle: "Preparation",
    type: "interstitial",
    headline: "Welcome",
    narrativeText:
      "Welcome to The Golden Compass.\n\nOver the next few hours you're going to plan the most incredible year of your life.\n\nThis is a deeply personal exercise. Take your time, be honest, and let yourself dream big.",
  },
  {
    id: "preflight-rules",
    sectionIndex: 0,
    sectionKey: "preflight",
    sectionTitle: "Preparation",
    type: "checklist",
    headline: "Before We Begin",
    narrativeText:
      "To get the most out of this exercise, please make sure you're in the right headspace.",
    checklistItems: [
      { key: "alone", label: "I'm alone in a quiet, comfortable place" },
      {
        key: "time",
        label: "I have at least 2-3 hours of uninterrupted time",
      },
      { key: "phone", label: "My phone is on silent or airplane mode" },
      { key: "open", label: "I'm open-minded and ready to be honest" },
    ],
    requireAllChecked: true,
  },
  {
    id: "preflight-ready",
    sectionIndex: 0,
    sectionKey: "preflight",
    sectionTitle: "Preparation",
    type: "interstitial",
    headline: "Let's Begin",
    narrativeText:
      "Take a deep breath.\n\nClose your eyes for a moment.\n\nWhen you're ready, continue to Step 01.",
  },
];

// ---------------------------------------------------------------------------
// Section 1: The Bonfire
// ---------------------------------------------------------------------------
const bonfireScreens: CompassScreen[] = [
  {
    id: "bonfire-intro",
    sectionIndex: 1,
    sectionKey: "bonfire",
    sectionTitle: "The Bonfire",
    type: "interstitial",
    headline: "Step 01",
    narrativeText:
      "THE BONFIRE\n\nHow to gain instant peace by clearing your mind",
    backgroundVariant: "warm",
  },
  {
    id: "bonfire-explanation",
    sectionIndex: 1,
    sectionKey: "bonfire",
    sectionTitle: "The Bonfire",
    type: "interstitial",
    narrativeText:
      "Imagine you're sitting by a bonfire on the beach at night.\n\nThe fire is warm and bright. The only sound is the crackling of the flames and the gentle waves in the background.\n\nWe're going to use this fire to clear your mind of all the noise, worry and stress that's built up.",
    backgroundVariant: "warm",
  },
  {
    id: "bonfire-write",
    sectionIndex: 1,
    sectionKey: "bonfire",
    sectionTitle: "The Bonfire",
    type: "multi-input",
    headline: "Clear Your Mind",
    narrativeText:
      "Write down everything that's on your mind right now.\n\nAll the worries, tasks, unfinished business, things that are stressing you out... get it ALL out of your head and onto the list.",
    questionText: "What's weighing on your mind?",
    placeholder: "Add a worry, task, or burden...",
    isRequired: true,
    backgroundVariant: "warm",
  },
  {
    id: "bonfire-burn",
    sectionIndex: 1,
    sectionKey: "bonfire",
    sectionTitle: "The Bonfire",
    type: "animation",
    headline: "Let It Burn",
    narrativeText:
      "Now take everything you just wrote... and throw it into the bonfire.\n\nWatch it all burn away.\n\nYou don't need to carry any of that right now.",
    animation: "bonfire-burn",
    animationDuration: 6000,
    backgroundVariant: "warm",
  },
  {
    id: "bonfire-complete",
    sectionIndex: 1,
    sectionKey: "bonfire",
    sectionTitle: "The Bonfire",
    type: "interstitial",
    narrativeText:
      "Your mind is now clear.\n\nYou're free to think about only one thing:\n\nCreating the most incredible year of your life.",
    backgroundVariant: "warm",
  },
];

// ---------------------------------------------------------------------------
// Section 2: The Past
// ---------------------------------------------------------------------------
const pastScreens: CompassScreen[] = [
  {
    id: "past-intro",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "interstitial",
    headline: "Step 02",
    narrativeText:
      "THE PAST\n\nLearning the lessons from your past year so you can move forward with wisdom",
  },
  {
    id: "past-12-months-intro",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "interstitial",
    headline: "The Last 12 Months",
    narrativeText:
      "We're going to go month by month through your past year.\n\nFor each month, list the key events, changes, achievements and setbacks that happened.",
  },
  {
    id: "past-month-jan",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "January",
    questionText: "What happened in January?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-feb",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "February",
    questionText: "What happened in February?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-mar",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "March",
    questionText: "What happened in March?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-apr",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "April",
    questionText: "What happened in April?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-may",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "May",
    questionText: "What happened in May?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-jun",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "June",
    questionText: "What happened in June?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-jul",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "July",
    questionText: "What happened in July?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-aug",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "August",
    questionText: "What happened in August?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-sep",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "September",
    questionText: "What happened in September?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-oct",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "October",
    questionText: "What happened in October?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-nov",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "November",
    questionText: "What happened in November?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-month-dec",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "December",
    questionText: "What happened in December?",
    placeholder: "Add an event, achievement, or setback...",
    isRequired: false,
  },
  {
    id: "past-snapshot",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-textarea",
    headline: "Life Snapshot",
    narrativeText: "Rate and describe where you are right now in each area:",
    inputs: [
      {
        key: "work",
        label: "Work Life & Career",
        placeholder: "How is your career/business going?",
        type: "long",
      },
      {
        key: "relationships",
        label: "Relationships & Social",
        placeholder: "How are your relationships?",
        type: "long",
      },
      {
        key: "health",
        label: "Health & Fitness",
        placeholder: "How is your physical and mental health?",
        type: "long",
      },
      {
        key: "finances",
        label: "Finances",
        placeholder: "How is your financial situation?",
        type: "long",
      },
    ],
  },
  {
    id: "past-lessons",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "textarea",
    headline: "Lessons Learned",
    questionText:
      "What are the most important lessons you learned this past year?",
    isRequired: true,
  },
  {
    id: "past-golden-moments",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "Golden Moments",
    questionText:
      "What were your top 3-5 golden moments from the past year?",
    narrativeText:
      "These are the highlights — the moments that made you feel most alive, proud, or grateful.",
    placeholder: "Add a golden moment...",
    minItems: 3,
    maxItems: 5,
    isRequired: true,
  },
  {
    id: "past-proud",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "short-text",
    questionText: "What are you most proud of yourself for?",
    isRequired: true,
  },
  {
    id: "past-challenges",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "The Challenges",
    questionText:
      "What are your three biggest challenges from the last year?",
    placeholder: "Add a challenge...",
    minItems: 3,
    maxItems: 3,
    isRequired: true,
  },
  {
    id: "past-challenges-help",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    questionText: "What or who helped you overcome these challenges?",
    placeholder: "Add a person, tool, or support source...",
    isRequired: true,
  },
  {
    id: "past-challenges-learned",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    questionText:
      "What did you learn about yourself whilst overcoming these challenges?",
    placeholder: "Add a lesson...",
    isRequired: true,
  },
  {
    id: "past-not-proud",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "short-text",
    questionText: "What are you not proud of yourself for?",
    isRequired: true,
  },
  {
    id: "past-compassion-box",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "multi-input",
    headline: "The Box of Compassion",
    narrativeText:
      "Do you feel bad, angry or sad about some of the things you've done this past year? Are there things you feel ashamed and guilty about?",
    questionText:
      "Write down all the things you're not happy with from the past year",
    placeholder: "Be honest with yourself... this is a safe space...",
    isRequired: true,
    backgroundVariant: "warm",
  },
  {
    id: "past-forgiveness",
    sectionIndex: 2,
    sectionKey: "past",
    sectionTitle: "The Past",
    type: "ritual",
    headline: "How to Finally Let Go",
    narrativeText:
      "Look at each item. Spend a few seconds consciously FORGIVING yourself for it. Say to yourself: 'It's ok. I forgive you for this.' Allow yourself to let go, then put a big cross through it to signify forgiveness.",
    animation: "forgiveness-crossout",
    backgroundVariant: "warm",
  },
];

// ---------------------------------------------------------------------------
// Section 3: The Future
// ---------------------------------------------------------------------------
const futureScreens: CompassScreen[] = [
  {
    id: "future-intro",
    sectionIndex: 3,
    sectionKey: "future",
    sectionTitle: "The Future",
    type: "interstitial",
    headline: "Step 03",
    narrativeText:
      "THE FUTURE\n\nSetting your Golden Compass to get exactly what you want in the fastest and easiest way possible",
  },
  {
    id: "future-brainstorm",
    sectionIndex: 3,
    sectionKey: "future",
    sectionTitle: "The Future",
    type: "multi-input",
    headline: "The Future",
    narrativeText:
      "A year is made up of 365 individual days. So in order to have an amazing year you need to start with having an amazing day.\n\nNow is the time to THINK AND DREAM BIG.",
    questionText:
      "Brainstorm all the things you want in an absolutely perfect day in your life without any expectations or limitations",
    placeholder: "Add something from your perfect day...",
    isRequired: true,
  },
  {
    id: "future-work",
    sectionIndex: 3,
    sectionKey: "future",
    sectionTitle: "The Future",
    type: "short-text",
    headline: "My Next Year",
    narrativeText: "This is what my next year will be about:",
    questionText: "Work Life & Wealth",
    placeholder: "Briefly summarize your plans...",
    isRequired: true,
  },
  {
    id: "future-relationships",
    sectionIndex: 3,
    sectionKey: "future",
    sectionTitle: "The Future",
    type: "short-text",
    questionText: "Relationships, Family & Friends",
    placeholder: "Briefly summarize your plans...",
    isRequired: true,
  },
  {
    id: "future-health",
    sectionIndex: 3,
    sectionKey: "future",
    sectionTitle: "The Future",
    type: "short-text",
    questionText: "Health & Fitness",
    placeholder: "Briefly summarize your plans...",
    isRequired: true,
  },
];

// ---------------------------------------------------------------------------
// Section 4: The Perfect Day
// ---------------------------------------------------------------------------
const perfectDayScreens: CompassScreen[] = [
  {
    id: "pd-intro",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "interstitial",
    headline: "Step 04",
    narrativeText: "THE PERFECT DAY",
    backgroundVariant: "dawn",
  },
  {
    id: "pd-ready",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "interstitial",
    narrativeText:
      "You're now about to live your absolute perfect day from when you open your eyes in the morning to going to bed at night.\n\nFor this section it's best to use all of your senses to create a vivid image in your mind like a mental movie.\n\nReady?",
    backgroundVariant: "dawn",
  },
  {
    id: "pd-wake-time",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    narrativeText:
      "Good morning.\n\nYou've just woken up after the perfect amount of restful sleep.",
    questionText: "What time is this?",
    placeholder: "e.g., 6:30 AM",
    isRequired: true,
  },
  {
    id: "pd-wake-feeling",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText: "What is the feeling of your body when you wake up?",
    isRequired: true,
  },
  {
    id: "pd-first-thoughts",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-input",
    questionText:
      "What are the first three things that come into your head?",
    placeholder: "Add a thought...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["thought1", "thought2", "thought3"],
    isRequired: true,
  },
  {
    id: "pd-what-you-see",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText: "When you sit up out of bed, what do you see?",
    isRequired: true,
  },
  {
    id: "pd-city",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText: "What city or place are you in?",
    isRequired: true,
  },
  {
    id: "pd-sales-message",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    narrativeText:
      "Your phone beeps with some sales stats for the last day...",
    questionText: "What does this message say?",
    isRequired: true,
  },
  {
    id: "pd-assistant-message",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "interstitial",
    narrativeText:
      "Your phone beeps again.\n\nIt's your main assistant letting you know that everything is under control and you're not needed for the day because your team has everything under control.\n\nYour Freedom Business grows without you like a well oiled machine.\n\nYou have some exciting work strategy planned for the day and a bit of adventure.",
  },
  {
    id: "pd-work-plans",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-input",
    questionText: "Work plans:",
    placeholder: "Add a work plan...",
    isRequired: true,
  },
  {
    id: "pd-fun-plans",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-input",
    questionText: "Fun plans:",
    placeholder: "Add a fun plan...",
    isRequired: true,
  },
  {
    id: "pd-plans-feeling",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText: "How does this make you feel?",
    isRequired: true,
  },
  {
    id: "pd-mirror",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    narrativeText:
      "You now jump out of bed...\n\nYou look in the mirror on the way to the shower and smile to yourself...",
    questionText: "What do you see?",
    isRequired: true,
  },
  {
    id: "pd-mirror-feeling",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText:
      "How do you feel about yourself when you look in the mirror?",
    isRequired: true,
  },
  {
    id: "pd-outfit",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText:
      "You put on the coolest outfit for the day... what does this look like?",
    isRequired: true,
  },
  {
    id: "pd-outfit-feeling",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText: "How does this outfit make you feel?",
    isRequired: true,
  },
  {
    id: "pd-breakfast",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    questionText:
      "What is your favourite healthy breakfast to start the day with?",
    narrativeText: "Visualise and feel how good it tastes.",
    isRequired: true,
  },
  {
    id: "pd-day-paragraph",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    questionText: "Write a paragraph on how your day plays out...",
    narrativeText:
      "Where you go, how you get there, who you see... Really LIVE IT in your mind and FEEL IT in your body in the most vivid way possible.",
    placeholder: "Describe your perfect day in detail...",
    isRequired: true,
  },
  {
    id: "pd-atm-amount",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    narrativeText:
      "On your way home from your day, you pass an ATM that reminds you how much money you have in your personal spending account:",
    questionText: "How much is this?",
    placeholder: "e.g., $250,000",
    isRequired: true,
  },
  {
    id: "pd-financial-feeling",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    questionText:
      "How does financial security and freedom make you feel and act in the world?",
    isRequired: true,
  },
  {
    id: "pd-charity",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    narrativeText:
      "You get a calendar reminder about giving to your favourite charity.",
    questionText: "What charity is this and how does it help them?",
    isRequired: true,
  },
  {
    id: "pd-give-back",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    questionText:
      "Since you have financial freedom... briefly summarise the way you make a difference and 'give back' to the world:",
    isRequired: true,
  },
  {
    id: "pd-weekend-trip",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "short-text",
    narrativeText:
      "On your way home you think about the awesome trip you're going to take this weekend.",
    questionText: "Where are you going and who are you going with?",
    isRequired: true,
  },
  {
    id: "pd-weekend-activities",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-input",
    questionText: "What activities are planned for the weekend?",
    placeholder: "Add a weekend activity...",
    isRequired: true,
  },
  {
    id: "pd-home",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-textarea",
    narrativeText:
      "You arrive back home, where everything has been cleaned and arranged exactly how you like it, just like a 5 star hotel...",
    inputs: [
      {
        key: "look_smell",
        label: "What does it look and smell like in your home?",
        type: "long",
      },
      {
        key: "window",
        label: "What can you see out the window?",
        type: "long",
      },
      {
        key: "cool_things",
        label: "What are some of the cool things in your house?",
        type: "long",
      },
      {
        key: "garage",
        label: "In your garage?",
        type: "long",
      },
      {
        key: "food",
        label: "What sort of food are you guys going to eat?",
        type: "long",
      },
    ],
  },
  {
    id: "pd-text-message",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    narrativeText: 'You get a text message from a "special someone"...',
    questionText: "Who is it from and what does it say?",
    isRequired: true,
  },
  {
    id: "pd-evening",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "textarea",
    questionText: "How do you finish off the rest of the night?",
    isRequired: true,
  },
  {
    id: "pd-bedtime",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "interstitial",
    narrativeText:
      "You dim the lights and climb into the most comfortable, soft bed in the world.\n\nThe room is the perfect sleeping temperature.\n\nSerene, dark and silent.\n\nYou smile as you close your eyes because you just lived your absolutely perfect day.\n\nAnd are excited to wake up and do it all again tomorrow.",
    backgroundVariant: "night",
  },
  {
    id: "pd-gratitude",
    sectionIndex: 4,
    sectionKey: "perfect-day",
    sectionTitle: "The Perfect Day",
    type: "multi-input",
    questionText:
      "What are the three things you are most grateful for that you think about as you drift off to sleep?",
    placeholder: "Add something you're grateful for...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["grateful1", "grateful2", "grateful3"],
    isRequired: true,
    backgroundVariant: "night",
  },
];

// ---------------------------------------------------------------------------
// Section 5: Calibration & Commitment
// ---------------------------------------------------------------------------
const calibrationScreens: CompassScreen[] = [
  {
    id: "calibration-feeling",
    sectionIndex: 5,
    sectionKey: "calibration",
    sectionTitle: "Calibration",
    type: "short-text",
    headline: "Calibrating Your Golden Compass",
    questionText: "How does your perfect day make you feel?",
    narrativeText: "Take a moment to reflect on this feeling.",
    isRequired: true,
  },
  {
    id: "compass-reveal",
    sectionIndex: 5,
    sectionKey: "calibration",
    sectionTitle: "Calibration",
    type: "animation",
    headline: "This Is Your Golden Compass",
    narrativeText: "And it's pointing you in the right direction.",
    animation: "compass-rose-spin",
    animationDuration: 4000,
  },
  {
    id: "commitment-write",
    sectionIndex: 5,
    sectionKey: "calibration",
    sectionTitle: "Calibration",
    type: "textarea",
    headline: "Commitment",
    narrativeText:
      "Now it's time for your total commitment to the direction of your compass.",
    questionText:
      'Write these two sentences in your own words:\n\n"I trust in the direction that my compass has set for me. From this day forward, I commit, with every fibre of my being, to moving towards my perfect day."',
    isRequired: true,
  },
  {
    id: "commitment-sign",
    sectionIndex: 5,
    sectionKey: "calibration",
    sectionTitle: "Calibration",
    type: "signature",
    headline: "Seal Your Commitment",
  },
];

// ---------------------------------------------------------------------------
// Section 6: Lighting the Path
// ---------------------------------------------------------------------------
const lightingScreens: CompassScreen[] = [
  {
    id: "lighting-intro",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "interstitial",
    headline: "Lighting the Path",
    narrativeText:
      "Now that you've set your compass, let's light a direct path for you to get there.",
  },
  {
    id: "top-3-goals",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "These are the top 3 goals I will achieve in the next 12 months",
    placeholder: "Add a goal...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["goal1", "goal2", "goal3"],
    isRequired: true,
  },
  {
    id: "morning-routine",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "These are the three things I will do every morning to feel good about myself",
    placeholder: "Add a morning ritual...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["routine1", "routine2", "routine3"],
    isRequired: true,
  },
  {
    id: "daily-environment",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "I'll use these three things to make my daily environment an absolute joy to be in",
    placeholder: "Add an environment upgrade...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["env1", "env2", "env3"],
    isRequired: true,
  },
  {
    id: "financial-help",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "short-text",
    questionText:
      "This is the person or thing I will count on to help me achieve my financial goals",
    isRequired: true,
  },
  {
    id: "health-help",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "short-text",
    questionText:
      "This is the person or thing I will count on to help me achieve my health goals",
    isRequired: true,
  },
  {
    id: "relationship-help",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "short-text",
    questionText:
      "This is the person or thing I will count on to help me achieve my relationship goals",
    isRequired: true,
  },
  {
    id: "let-go",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText: "I'm ready to let go of these things",
    placeholder: "Add something to let go of...",
    isRequired: true,
  },
  {
    id: "say-no",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText: "I'm ready to say no to these things",
    placeholder: "Add something you're saying no to...",
    isRequired: true,
  },
  {
    id: "enjoy-guilt-free",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "These are the things I will allow myself to enjoy without feeling guilty",
    placeholder: "Add something to enjoy guilt-free...",
    isRequired: true,
  },
  {
    id: "vulnerability-partners",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "These are the three people I will call on, and be vulnerable with, to help me during tough times",
    placeholder: "Add a person...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["person1", "person2", "person3"],
    isRequired: true,
  },
  {
    id: "three-places",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText: "Here's the 3 places I will visit this year",
    placeholder: "Add a place...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["place1", "place2", "place3"],
    isRequired: true,
  },
  {
    id: "three-things-loved-ones",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText: "Here's the three things I will do for my loved ones",
    placeholder: "Add something you'll do for a loved one...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["thing1", "thing2", "thing3"],
    isRequired: true,
  },
  {
    id: "three-rewards",
    sectionIndex: 6,
    sectionKey: "lighting",
    sectionTitle: "Lighting the Path",
    type: "multi-input",
    questionText:
      "Here's the three things I will buy myself as a reward this year",
    placeholder: "Add a reward...",
    minItems: 3,
    maxItems: 3,
    legacyListKeys: ["reward1", "reward2", "reward3"],
    isRequired: true,
  },
];

// ---------------------------------------------------------------------------
// Section 7: The Golden Path
// ---------------------------------------------------------------------------
const goldenPathScreens: CompassScreen[] = [
  {
    id: "golden-path-intro",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "interstitial",
    headline: "The Golden Path",
    narrativeText:
      "We are now going to draw a direct path to your perfect day, along with milestones to achieve this.",
  },
  {
    id: "point-a",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "textarea",
    headline: "A \u2014 Where Are You Now",
    questionText: "Summarise in three lines where you are at today",
    isRequired: true,
  },
  {
    id: "point-b",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "multi-input",
    headline: "B \u2014 Your Perfect Day",
    questionText: "List your top three goals you wish to achieve",
    placeholder: "Add a goal from your perfect day...",
    minItems: 3,
    maxItems: 3,
    prefillFrom: "top-3-goals",
    isRequired: true,
  },
  {
    id: "challenges-obstacles",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "multi-input",
    questionText:
      "List every major challenge or obstacle standing in your way along the timeline",
    placeholder: "Add a challenge...",
    isRequired: true,
  },
  {
    id: "make-it-fun",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "multi-input",
    narrativeText:
      "Look at each item along your roadmap and answer:",
    questionText:
      "How can I make the process of solving these challenges fun and pleasurable for me?",
    placeholder: "Add an idea for making the process enjoyable...",
    isRequired: true,
  },
  {
    id: "who-can-help",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "multi-input",
    questionText:
      "Who can help me solve these challenges faster and easier?",
    placeholder: "Add a person, mentor, or resource...",
    isRequired: true,
  },
  {
    id: "hourglass",
    sectionIndex: 7,
    sectionKey: "golden-path",
    sectionTitle: "The Golden Path",
    type: "interstitial",
    headline: "The Hourglass Principle",
    narrativeText:
      "In his book, Dale Carnegie gives an extremely useful tool:\n\nThink of your life as an hourglass. There are thousands of grains of sand in the top, and they all pass slowly through the narrow neck. Nothing you or I could do would make more than one grain pass through at a time.\n\nFOCUS ON THE FIRST CHALLENGE AND THE FIRST STEP YOU NEED TO TAKE.\n\nOne grain at a time.",
  },
];

// ---------------------------------------------------------------------------
// Section 8: Final Steps
// ---------------------------------------------------------------------------
const finalScreens: CompassScreen[] = [
  {
    id: "almost-done",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "interstitial",
    headline: "You're Almost Done",
    narrativeText: "How do you feel?",
  },
  {
    id: "final-notes",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "textarea",
    questionText: "Write a few final notes to yourself:",
    isRequired: true,
  },
  {
    id: "movie-title",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "short-text",
    questionText:
      "If your next year was the title of a movie... what would it be?",
    placeholder: "Your movie title...",
    isRequired: true,
  },
  {
    id: "final-commitment",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "signature",
    headline: "Sealing Your Commitment to Success",
    narrativeText:
      "This year I commit to being a source of light in the world.\n\nI will solve the challenges in front of me all the way up to achieving my perfect day.\n\nIf I can achieve my perfect day, this will inspire others to reach theirs as well.\n\nWhenever I feel darkness, I will remember to check in with my Golden Compass and use it to direct me back on the path to my perfect day.\n\nThis signature seals my commitment.",
  },
  {
    id: "daily-creed",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "interstitial",
    headline: "Freedom Business Daily Creed",
    narrativeText:
      "Today I'm creating a life that I LOVE to be in\n\nI am as scared as hell, but I'm going to do it anyway\n\nI can always go back and have a boring regular life, but today I choose to go after something amazing\n\nOnly I can know what's best for me\n\nI allow no outside influences to throw me off my vision\n\nI am a human being, which means I have infinite potential and value on this earth\n\nI work hard to create and put something beautiful and valuable into this world\n\nI will always keep looking for what I love\n\nMy time is limited so I will not waste it in living someone else's life\n\nI am worthwhile by default\n\nI discard all negative influences, however hard that may be\n\nI accept misfortune because I know that each failure is a step towards my dream\n\nI will never settle\n\nI can do it\n\nWhy not?",
  },
  {
    id: "congratulations",
    sectionIndex: 8,
    sectionKey: "final",
    sectionTitle: "Final Steps",
    type: "animation",
    headline: "Congratulations",
    narrativeText:
      "WELL DONE.\n\nYou should be proud of yourself.\n\nYou have now set your life compass for the next year.\n\nTo make this process even more successful, refer to your Golden Compass daily to realign your direction.",
    animation: "celebration-finale",
    animationDuration: 5000,
  },
];

// ---------------------------------------------------------------------------
// COMPASS_FLOW — The complete data-driven flow
// ---------------------------------------------------------------------------
export const COMPASS_FLOW: CompassSection[] = [
  {
    index: 0,
    key: "preflight",
    title: "Preparation",
    subtitle: "Getting ready for your journey",
    screens: preflightScreens,
  },
  {
    index: 1,
    key: "bonfire",
    title: "The Bonfire",
    subtitle: "How to gain instant peace by clearing your mind",
    screens: bonfireScreens,
  },
  {
    index: 2,
    key: "past",
    title: "The Past",
    subtitle: "Learning the lessons from your past year",
    screens: pastScreens,
  },
  {
    index: 3,
    key: "future",
    title: "The Future",
    subtitle: "Setting your compass for the next year",
    screens: futureScreens,
  },
  {
    index: 4,
    key: "perfect-day",
    title: "The Perfect Day",
    subtitle: "Living your absolute perfect day",
    screens: perfectDayScreens,
  },
  {
    index: 5,
    key: "calibration",
    title: "Calibration",
    subtitle: "Setting and sealing your compass",
    screens: calibrationScreens,
  },
  {
    index: 6,
    key: "lighting",
    title: "Lighting the Path",
    subtitle: "Setting your goals and daily practices",
    screens: lightingScreens,
  },
  {
    index: 7,
    key: "golden-path",
    title: "The Golden Path",
    subtitle: "Drawing a direct path to your perfect day",
    screens: goldenPathScreens,
  },
  {
    index: 8,
    key: "final",
    title: "Final Steps",
    subtitle: "Sealing your commitment",
    screens: finalScreens,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------
export function getAllScreens(): CompassScreen[] {
  return COMPASS_FLOW.flatMap((section) => section.screens);
}

export function getTotalScreens(): number {
  return getAllScreens().length;
}
