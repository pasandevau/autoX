export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  sections: { heading: string; body: string }[];
}

export const posts: BlogPost[] = [
  {
    slug: "5-signs-your-car-needs-a-service",
    title: "5 Signs Your Car Needs a Service Right Now",
    excerpt: "Ignoring these warning signs could turn a small fix into a massive repair bill. Here's what to watch for.",
    category: "Maintenance",
    categoryColor: "#FFB300",
    readTime: "4 min read",
    date: "May 12, 2025",
    sections: [
      {
        heading: "1. Warning Lights Are On",
        body: "Your car's onboard computer monitors dozens of systems continuously. When a warning light illuminates — whether it's the check engine light, oil pressure warning, or battery indicator — it's not something to ignore. These lights exist for a reason. A diagnostic scan takes minutes and could prevent thousands of dollars in damage.",
      },
      {
        heading: "2. Unusual Noises While Driving",
        body: "Squealing when you brake, grinding when you turn, or knocking from the engine are all alarm bells. Brakes that squeal are often worn to the wear indicators — a sign they need replacing immediately. Knocking from the engine can indicate low oil or worn bearings. Don't wait for these sounds to become silence — by then, the damage is done.",
      },
      {
        heading: "3. Your Car Is Vibrating",
        body: "Vibration through the steering wheel, seat, or pedals is never normal. It often points to unbalanced or worn tyres, warped brake rotors, or worn suspension components. Left unchecked, vibrations cause uneven tyre wear and can lead to loss of control at highway speeds.",
      },
      {
        heading: "4. It's Been Over 12 Months or 15,000 km",
        body: "Most modern vehicles need a service every 12 months or 15,000 km — whichever comes first. Even if your car feels fine, essential fluids degrade, filters clog, and wear items deteriorate with time. Sticking to your service schedule protects your warranty and keeps running costs predictable.",
      },
      {
        heading: "5. You Notice Fluid Leaks",
        body: "Any puddle under your parked car deserves attention. Oil, coolant, brake fluid, and transmission fluid are all critical to your car's operation. A small leak today can become a critical failure tomorrow. If you see any staining under your car, book a service immediately.",
      },
    ],
  },
  {
    slug: "when-do-brakes-need-replacing",
    title: "How to Know When Your Brakes Need Replacing",
    excerpt: "Your brakes are the single most important safety system on your car. Here's how to tell when they need attention.",
    category: "Safety",
    categoryColor: "#FF8C00",
    readTime: "5 min read",
    date: "Apr 28, 2025",
    sections: [
      {
        heading: "The Squeal You Shouldn't Ignore",
        body: "Most brake pads have built-in wear indicators — small metal tabs that contact the disc when pads wear thin, producing a high-pitched squeal. This is your first warning. At this stage you still have time to replace pads without damaging the rotors.",
      },
      {
        heading: "Grinding Means You've Gone Too Far",
        body: "If squealing becomes grinding, metal is contacting metal. Your pads are completely worn through, and you're now grinding the caliper or backing plate directly against the rotor. This damages the rotor, dramatically increases stopping distances, and can cause brake failure. Get off the road safely and call us.",
      },
      {
        heading: "Brake Pedal Feels Spongy or Pulsating",
        body: "A spongy pedal usually indicates air in the brake lines or a fluid leak — both serious. A pulsating pedal when braking typically means warped rotors. Either way, your braking performance is compromised and you need professional attention immediately.",
      },
      {
        heading: "How Long Do Brakes Last?",
        body: "Front pads typically last 30,000–60,000 km; rears last longer since they do less work. But driving style matters enormously — city driving with frequent stops wears brakes much faster than highway cruising. We check your brakes at every service and will always advise you honestly about remaining life.",
      },
      {
        heading: "Can a Mobile Mechanic Replace Brakes?",
        body: "Absolutely — brake replacement is one of our most common mobile jobs. We carry pads and rotors for the most popular vehicles on our vans, so in most cases we can complete the job the same day, at your home or workplace.",
      },
    ],
  },
  {
    slug: "why-mobile-mechanics-are-the-future",
    title: "Why Mobile Mechanics Are the Future of Car Servicing",
    excerpt: "The traditional workshop model is being disrupted — and Adelaide drivers are better off for it.",
    category: "Industry",
    categoryColor: "#FFB300",
    readTime: "3 min read",
    date: "Apr 10, 2025",
    sections: [
      {
        heading: "The Workshop Model Is Broken",
        body: "Booking your car into a workshop means arranging a lift, waiting in a waiting room, and hoping they finish before 5pm. It means taking time off work or wrangling with loan cars. For most people, it's a half-day disruption at minimum. Mobile mechanics eliminate all of that.",
      },
      {
        heading: "You Save Time and Money",
        body: "Mobile mechanics have lower overheads than traditional workshops — no expensive shopfront rent, no large team on wages. Those savings get passed on. And when you factor in the time you don't have to take off work, the value is even greater.",
      },
      {
        heading: "Transparency You Can See",
        body: "When a mobile mechanic works on your car in your driveway, you can watch. You can ask questions. You can see exactly what's being done and why. That transparency builds trust in a way that handing your keys to a counter person never can.",
      },
      {
        heading: "Growing Across Australia",
        body: "Mobile mechanic services are growing rapidly across Adelaide and all major Australian cities. The technology for booking, diagnostics, and parts sourcing has caught up to make it practical for nearly any job. From routine servicing to complex repairs — it's all possible mobile.",
      },
    ],
  },
  {
    slug: "dead-battery-what-you-need-to-know",
    title: "Dead Battery? Everything You Need to Know",
    excerpt: "A flat battery is one of the most common breakdowns on Australian roads. Here's what causes it and how to avoid it.",
    category: "Breakdowns",
    categoryColor: "#FF8C00",
    readTime: "4 min read",
    date: "Mar 22, 2025",
    sections: [
      {
        heading: "Why Batteries Go Flat",
        body: "The most common causes are leaving lights or accessories on overnight, a battery reaching the end of its life (typically 3–5 years), a failing alternator not recharging while you drive, or extreme heat — a real factor in Adelaide's summer climate. Hot temperatures accelerate battery degradation.",
      },
      {
        heading: "Jump Starting — What You Need to Know",
        body: "A jump start is a temporary fix, not a solution. If your battery goes flat once, get it tested. A battery that's discharged deeply may appear to hold charge after a jump but fail again within hours. Our roadside team carries a battery tester and can tell you within minutes whether a charge will do or you need a replacement.",
      },
      {
        heading: "How Long Does Battery Replacement Take?",
        body: "In most vehicles, a battery swap takes 20–30 minutes. We carry a wide range of batteries on our vans and can replace yours roadside or at your home. No towing, no waiting.",
      },
      {
        heading: "Choosing the Right Battery",
        body: "Not all batteries are equal. The right battery for your car depends on the engine size, whether you have stop-start technology, and how many electrical accessories you run. We always fit the correct specification — cheap generic batteries in modern vehicles often cause problems with vehicle electronics.",
      },
    ],
  },
  {
    slug: "pre-purchase-inspection-why-you-need-one",
    title: "Pre-Purchase Car Inspection: Don't Buy Without One",
    excerpt: "A $250 inspection could save you $15,000. Here's why a pre-purchase check is non-negotiable when buying a used car.",
    category: "Buying Tips",
    categoryColor: "#FFB300",
    readTime: "5 min read",
    date: "Mar 5, 2025",
    sections: [
      {
        heading: "What Can Go Wrong Without an Inspection",
        body: "Private car sales in South Australia are largely caveat emptor — buyer beware. Once you've handed over the money and driven away, recovering it if serious problems emerge is extremely difficult. We've seen buyers discover cracked chassis, flood damage, prior accidents, engine sludge, and timing chain issues — all hidden under a fresh detail and a motivated seller's pitch.",
      },
      {
        heading: "What We Check",
        body: "A thorough pre-purchase inspection covers the engine and transmission, brake system, suspension and steering, tyres and wheels, all electrical systems, cooling system, body and paint condition (looking for signs of prior accident repair), and an OBD diagnostic scan for stored fault codes. We provide a written report with photos.",
      },
      {
        heading: "We Come to the Car",
        body: "You don't need to arrange a test drive to a workshop. We come to wherever the car is — whether that's a private seller's home, a car yard, or a dealer. We're happy to inspect any vehicle in the Adelaide metropolitan area and most surrounding suburbs.",
      },
      {
        heading: "Using the Report to Negotiate",
        body: "Even if the car passes our inspection, identifying minor issues often gives you negotiating power. A worn battery, upcoming service due, or slightly low brake pads are all legitimate reasons to negotiate the price down — often by more than the cost of the inspection itself.",
      },
    ],
  },
  {
    slug: "understanding-warning-lights",
    title: "Understanding Your Car's Warning Lights",
    excerpt: "Dashboard lights can be confusing — and ignoring the wrong one can cost you an engine. Here's what each one means.",
    category: "DIY Tips",
    categoryColor: "#FF8C00",
    readTime: "6 min read",
    date: "Feb 18, 2025",
    sections: [
      {
        heading: "Red Lights: Stop Now",
        body: "Red warning lights indicate immediate action required. The oil pressure light (red oil can) means pull over safely and switch off the engine immediately — driving even 500m with no oil pressure can destroy an engine. The engine temperature light (red thermometer) means your engine is overheating — stop, let it cool, check coolant. The battery light while driving means your alternator may have failed and you're running on battery power only. Find somewhere safe to stop.",
      },
      {
        heading: "Amber/Yellow Lights: Take Action Soon",
        body: "The check engine light (amber engine icon) can mean anything from a loose fuel cap to a catalytic converter fault. It's not an emergency, but get it scanned within a few days. Tyre pressure warning means one or more tyres are significantly under-inflated — check them when safe. The service due light is a reminder that your car needs its scheduled maintenance.",
      },
      {
        heading: "The Check Engine Light: What It Usually Means",
        body: "Despite its ominous name, the check engine light most commonly triggers for oxygen sensor faults, catalytic converter efficiency codes, fuel system issues, or loose/faulty fuel caps. An OBD scan (which we can do roadside) reads the fault code and tells us exactly what triggered the light. Don't just clear the code — find and fix the root cause.",
      },
      {
        heading: "ADAS and Safety System Lights",
        body: "Modern vehicles have lights for lane departure warning, forward collision systems, blind spot monitoring, and stability control. If any of these illuminate persistently, it often indicates a sensor fault. These systems are safety-critical — don't disable or ignore them.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
