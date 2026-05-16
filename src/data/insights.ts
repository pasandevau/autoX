export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
  readTime: string;
  tips: string[];
}

export const insights: Insight[] = [
  {
    slug: "car-maintenance-checklist",
    title: "The Complete Car Maintenance Checklist",
    excerpt: "Everything Adelaide drivers should check monthly, quarterly, and annually to keep their vehicle in peak condition.",
    icon: "clipboard-check",
    readTime: "5 min",
    tips: [
      "Check engine oil level monthly — top up if below the minimum mark",
      "Inspect tyre pressure monthly (including the spare) — refer to the placard inside your driver's door",
      "Check coolant level in the reservoir every month",
      "Test all lights — headlights, indicators, brake lights, reversing lights",
      "Inspect windscreen wipers for streaking or chattering and replace annually",
      "Have brakes inspected every 12 months or 15,000 km",
      "Check battery terminals for corrosion — clean with baking soda and water if needed",
      "Replace engine air filter every 30,000 km or 2 years",
      "Change cabin air filter every 15,000–20,000 km for clean air inside the cabin",
      "Have wheel alignment checked if the car pulls to one side",
    ],
  },
  {
    slug: "how-often-to-change-oil",
    title: "How Often Should You Really Change Your Oil?",
    excerpt: "The old '3,000 km' rule is outdated. Here's what modern engines actually need.",
    icon: "droplets",
    readTime: "3 min",
    tips: [
      "Most modern engines with synthetic oil need changes every 10,000–15,000 km",
      "Older vehicles or those using conventional oil typically need changes every 5,000–7,500 km",
      "Always follow your vehicle's log book — it specifies the correct interval",
      "Short trips (under 10 km) are harder on oil than highway driving — shorten your interval",
      "Check oil colour on the dipstick — black, gritty oil means it's overdue",
      "Never ignore the service due reminder light — it's calculated from your specific driving pattern",
      "Use the correct oil viscosity for your engine — check the cap or log book",
    ],
  },
  {
    slug: "tyre-maintenance-tips",
    title: "5 Tyre Tips That Could Save Your Life",
    excerpt: "Tyres are the only contact point between your car and the road. Here's how to keep them in peak condition.",
    icon: "circle",
    readTime: "4 min",
    tips: [
      "Check tyre pressure monthly when tyres are cold (not after driving)",
      "The correct pressure is on the placard inside your driver's door — not on the tyre sidewall",
      "Inspect tread depth monthly — insert a 20c coin into the groove. If you can see the entire platypus bill, replace the tyre",
      "Rotate tyres every 10,000 km to ensure even wear across all four",
      "Have wheel alignment checked annually — misalignment causes rapid, uneven tyre wear",
      "Never mix tyre types (all-season and performance) on the same axle",
      "Replace tyres when tread depth reaches 1.5mm — the legal minimum in Australia",
      "Check for bulges, cracks, or objects embedded in the tread — these require immediate attention",
    ],
  },
  {
    slug: "sa-summer-car-care",
    title: "SA Summer Car Care: Protect Your Car in Adelaide's Heat",
    excerpt: "Adelaide summers are brutal on vehicles. These tips will keep your car running through the heat.",
    icon: "sun",
    readTime: "4 min",
    tips: [
      "Check coolant level before summer — ensure it's at the correct level and the mixture is right",
      "Have your cooling system pressure-tested — hoses and the radiator cap fail more often in extreme heat",
      "Test your battery — heat is as damaging to batteries as cold. Adelaide summers shorten battery life significantly",
      "Check your AC system before summer — an AC regas takes 30 minutes and makes a huge comfort difference",
      "Park in the shade whenever possible — excessive heat ages everything from the dashboard to rubber seals",
      "Use a windscreen sun shade — it reduces cabin temperature dramatically and protects the dashboard",
      "Inspect drive belts for cracking — heat accelerates rubber deterioration",
      "Keep a bottle of water in the car for both you and the radiator in emergencies",
    ],
  },
  {
    slug: "how-to-check-car-fluids",
    title: "How to Check Your Car's Essential Fluids",
    excerpt: "A 5-minute fluid check every month could prevent a breakdown. Here's exactly how to do it.",
    icon: "droplets",
    readTime: "3 min",
    tips: [
      "Engine Oil: Pull the dipstick, wipe clean, reinsert fully, then pull again — level should be between MIN and MAX marks",
      "Coolant: Check the overflow reservoir (not the radiator cap when hot) — should be between MIN and MAX",
      "Brake Fluid: Located in a translucent reservoir near the firewall — level between MIN and MAX. Low level may indicate worn pads or a leak",
      "Power Steering Fluid: Check reservoir level (if your vehicle has hydraulic steering — many modern cars don't)",
      "Washer Fluid: Top up with proper washer fluid — not just water, especially in summer when bugs are worse",
      "Automatic Transmission Fluid: Check with the car warmed up and running, in Park, using the dipstick — some cars have sealed transmissions and require workshop checking",
      "If any fluid is consistently low, investigate why — a leak needs fixing, not just topping up",
    ],
  },
];
