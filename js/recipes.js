/**
 * KITCHENOIR — Recipe Data Store
 * Global constant loaded before any other scripts to avoid CORS issues.
 */
const KITCHENOIR_DATA = {
  recipes: [
    /* ───────── STARTERS ───────── */
    {
      id: "smoky-tomato-bruschetta",
      title: "Smoky Tomato Bruschetta",
      category: "Starters",
      time: "15 min",
      servings: 4,
      difficulty: "Easy",
      description:
        "Charred sourdough topped with fire-roasted tomatoes, fresh basil, and a drizzle of aged balsamic reduction.",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
      ingredients: [
        "4 slices sourdough bread",
        "3 large vine-ripened tomatoes, diced",
        "2 cloves garlic, minced",
        "¼ cup fresh basil, chiffonade",
        "2 tbsp extra-virgin olive oil",
        "1 tbsp aged balsamic reduction",
        "½ tsp smoked paprika",
        "Flaky sea salt & cracked pepper"
      ],
      steps: [
        "Preheat grill or broiler to high. Brush sourdough slices with olive oil on both sides.",
        "Grill bread 1–2 minutes per side until charred and crisp. Rub one side with a halved garlic clove.",
        "Toss diced tomatoes with minced garlic, basil, smoked paprika, salt, and pepper.",
        "Spoon tomato mixture generously onto each toast.",
        "Finish with a drizzle of balsamic reduction and a pinch of flaky salt. Serve immediately."
      ]
    },
    {
      id: "whipped-feta-crostini",
      title: "Whipped Feta & Honey Crostini",
      category: "Starters",
      time: "20 min",
      servings: 6,
      difficulty: "Easy",
      description:
        "Creamy whipped feta on golden crostini, crowned with wildflower honey, toasted walnuts, and fresh thyme.",
      image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80",
      ingredients: [
        "1 baguette, sliced ½-inch thick",
        "200 g feta cheese, crumbled",
        "100 g cream cheese, softened",
        "2 tbsp extra-virgin olive oil",
        "3 tbsp wildflower honey",
        "¼ cup walnuts, roughly chopped",
        "Fresh thyme leaves",
        "Cracked black pepper"
      ],
      steps: [
        "Preheat oven to 190°C (375°F). Arrange baguette slices on a baking sheet and brush with olive oil.",
        "Bake 8–10 minutes until golden and crisp. Let cool slightly.",
        "Blend feta, cream cheese, and 1 tbsp olive oil in a food processor until silky smooth.",
        "Toast walnuts in a dry skillet over medium heat for 3–4 minutes, stirring often.",
        "Spread a generous layer of whipped feta on each crostini. Top with a drizzle of honey, toasted walnuts, thyme, and a crack of pepper."
      ]
    },

    /* ───────── MAINS ───────── */
    {
      id: "pan-seared-salmon",
      title: "Pan-Seared Salmon with Citrus Glaze",
      category: "Mains",
      time: "30 min",
      servings: 2,
      difficulty: "Medium",
      description:
        "Crispy-skinned Atlantic salmon finished with a bright orange-ginger glaze, served over wilted garlic spinach.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
      ingredients: [
        "2 salmon fillets (170 g each), skin-on",
        "1 tbsp avocado oil",
        "½ cup fresh orange juice",
        "2 tbsp soy sauce",
        "1 tbsp honey",
        "1 tsp freshly grated ginger",
        "2 cups baby spinach",
        "2 cloves garlic, sliced",
        "Salt & pepper to taste"
      ],
      steps: [
        "Pat salmon dry and season generously with salt and pepper.",
        "Heat avocado oil in a cast-iron skillet over medium-high heat until shimmering.",
        "Place salmon skin-side down. Press gently with a spatula for 30 seconds. Cook 4 minutes until skin is deeply golden.",
        "Flip and cook 2–3 minutes more. Remove to a plate.",
        "In the same pan, sauté garlic 30 seconds, add spinach and wilt. Season and plate.",
        "Whisk orange juice, soy sauce, honey, and ginger in the pan. Simmer until reduced by half, about 2 minutes.",
        "Plate salmon over spinach and spoon the citrus glaze on top."
      ]
    },
    {
      id: "mushroom-risotto",
      title: "Wild Mushroom Risotto",
      category: "Mains",
      time: "45 min",
      servings: 4,
      difficulty: "Medium",
      description:
        "Luxuriously creamy Arborio rice studded with a medley of wild mushrooms, finished with Parmigiano-Reggiano and truffle oil.",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
      ingredients: [
        "1½ cups Arborio rice",
        "300 g mixed wild mushrooms (shiitake, oyster, cremini), sliced",
        "1 small shallot, finely diced",
        "2 cloves garlic, minced",
        "½ cup dry white wine",
        "4 cups warm vegetable stock",
        "½ cup Parmigiano-Reggiano, finely grated",
        "2 tbsp unsalted butter",
        "1 tsp truffle oil",
        "Fresh flat-leaf parsley, chopped"
      ],
      steps: [
        "Sauté mushrooms in 1 tbsp butter over high heat until deeply golden, about 5 minutes. Set aside.",
        "In the same pan, cook shallot and garlic in remaining butter until fragrant, about 2 minutes.",
        "Add rice and stir 1 minute until edges are translucent. Pour in wine and stir until absorbed.",
        "Add warm stock one ladle at a time, stirring frequently. Wait until each addition is mostly absorbed before adding more. This takes about 18–20 minutes.",
        "When rice is al dente and creamy, fold in mushrooms, Parmigiano, and truffle oil.",
        "Rest 2 minutes off heat. Serve in warmed bowls with parsley and extra cheese."
      ]
    },

    /* ───────── DESSERTS ───────── */
    {
      id: "dark-chocolate-lava-cake",
      title: "Dark Chocolate Lava Cake",
      category: "Desserts",
      time: "25 min",
      servings: 2,
      difficulty: "Medium",
      description:
        "Individual molten-centered chocolate cakes with a crackling crust, served with vanilla bean crème fraîche.",
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
      ingredients: [
        "100 g dark chocolate (70% cacao), chopped",
        "60 g unsalted butter",
        "2 large eggs",
        "2 large egg yolks",
        "50 g caster sugar",
        "1 tbsp plain flour",
        "Pinch of flaky sea salt",
        "Cocoa powder for dusting",
        "Vanilla bean crème fraîche for serving"
      ],
      steps: [
        "Preheat oven to 220°C (425°F). Butter and cocoa-dust two ramekins.",
        "Melt chocolate and butter together in a double boiler, stirring until smooth. Cool slightly.",
        "Whisk eggs, yolks, and sugar until pale and thick, about 3 minutes.",
        "Fold the chocolate mixture into the egg mixture. Sift in flour and fold gently.",
        "Divide batter between ramekins. Bake 12–14 minutes — edges should be set but the center jiggly.",
        "Rest 1 minute, then invert onto plates. Dust with cocoa and serve with crème fraîche."
      ]
    },
    {
      id: "tiramisu-classico",
      title: "Tiramisù Classico",
      category: "Desserts",
      time: "40 min + 4 hr chill",
      servings: 6,
      difficulty: "Easy",
      description:
        "The timeless Italian layered dessert — espresso-soaked Savoiardi, rich mascarpone cream, and a veil of cocoa.",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
      ingredients: [
        "6 egg yolks",
        "¾ cup caster sugar",
        "500 g mascarpone cheese",
        "1½ cups heavy cream",
        "2 cups strong espresso, cooled",
        "3 tbsp coffee liqueur (optional)",
        "24 Savoiardi (ladyfinger) biscuits",
        "Unsweetened cocoa powder for dusting",
        "Dark chocolate shavings"
      ],
      steps: [
        "Whisk egg yolks and sugar until thick and ribbon-like, about 5 minutes.",
        "Add mascarpone and beat until smooth and combined.",
        "In a separate bowl, whip heavy cream to stiff peaks. Gently fold into the mascarpone mixture.",
        "Combine espresso and coffee liqueur. Quickly dip each Savoiardi into the coffee — do not soak.",
        "Arrange a layer of dipped biscuits in a 9×13 dish. Spread half the cream over them.",
        "Repeat with a second layer of biscuits and remaining cream. Smooth the top.",
        "Cover and chill at least 4 hours (overnight is best). Dust generously with cocoa and top with chocolate shavings before serving."
      ]
    }
  ]
};
