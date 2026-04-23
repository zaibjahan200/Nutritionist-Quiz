// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Clinical Question Bank
// ============================================================

const BASE_QUESTIONS = [
  {
    level: "C1",
    topic: "Nutrients",
    q: `Which of the following is NOT classified as a macronutrient according to Wardlaw's Perspectives in Nutrition?`,
    opts: [`Carbohydrates`, `Proteins`, `Vitamins`, `Lipids`],
    ans: 2,
    exp: `Macronutrients are nutrients needed in large amounts that provide energy: carbohydrates, proteins, and lipids (fats). Vitamins are micronutrients — required in much smaller quantities and do not provide calories.`
  },
  {
    level: "C1",
    topic: "Energy",
    q: `How many kilocalories does one gram of carbohydrate provide?`,
    opts: [`2 kcal`, `4 kcal`, `7 kcal`, `9 kcal`],
    ans: 1,
    exp: `Both carbohydrates and proteins yield 4 kcal/g. Alcohol provides 7 kcal/g, and fats (lipids) provide 9 kcal/g. This is a fundamental concept in energy metabolism.`
  },
  {
    level: "C1",
    topic: "Vitamins",
    q: `Which vitamins are fat-soluble?`,
    opts: [`B-complex and C`, `A, D, E, and K`, `A, C, D, and K`, `B12 and folate only`],
    ans: 1,
    exp: `The four fat-soluble vitamins are A, D, E, and K (ADEK). They require dietary fat for absorption and can be stored in the liver and adipose tissue, unlike water-soluble vitamins.`
  },
  {
    level: "C1",
    topic: "Digestion",
    q: `Where does the majority of chemical digestion and nutrient absorption take place?`,
    opts: [`Stomach`, `Large intestine`, `Small intestine`, `Mouth`],
    ans: 2,
    exp: `The small intestine is the primary site of both chemical digestion and absorption of nutrients. Its large surface area, plus pancreatic and biliary secretions, make it the main digestive organ.`
  },
  {
    level: "C1",
    topic: "Carbohydrates",
    q: `Which of the following is a monosaccharide?`,
    opts: [`Sucrose`, `Lactose`, `Maltose`, `Fructose`],
    ans: 3,
    exp: `Fructose is a monosaccharide (single sugar unit). Sucrose, lactose, and maltose are disaccharides — each consisting of two monosaccharide units joined by a glycosidic bond.`
  },
  {
    level: "C1",
    topic: "Proteins",
    q: `How many essential amino acids must be obtained from the diet?`,
    opts: [`5`, `9`, `12`, `20`],
    ans: 1,
    exp: `There are 9 essential amino acids that the human body cannot synthesize in sufficient amounts: histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, and valine.`
  },
  {
    level: "C1",
    topic: "Lipids",
    q: `Which type of fatty acid contains no double bonds in its carbon chain?`,
    opts: [`Monounsaturated`, `Polyunsaturated`, `Saturated`, `Trans`],
    ans: 2,
    exp: `Saturated fatty acids have no double bonds — all carbon atoms are fully 'saturated' with hydrogen atoms. They are typically solid at room temperature and found mainly in animal fats and tropical oils.`
  },
  {
    level: "C1",
    topic: "Water",
    q: `What percentage of the human body weight is approximately water?`,
    opts: [`30–40%`, `45–50%`, `60–70%`, `80–90%`],
    ans: 2,
    exp: `Water makes up approximately 60–70% of adult body weight, though this varies with age, sex, and body composition. It is essential for virtually all physiological processes.`
  },
  {
    level: "C1",
    topic: "Minerals",
    q: `Which mineral is most abundant in the human body?`,
    opts: [`Iron`, `Sodium`, `Calcium`, `Phosphorus`],
    ans: 2,
    exp: `Calcium is the most abundant mineral in the body, making up about 1.5–2% of body weight. Approximately 99% is stored in bones and teeth.`
  },
  {
    level: "C1",
    topic: "DRI",
    q: `Which DRI value represents the average daily intake level sufficient to meet the needs of 50% of healthy individuals?`,
    opts: [`RDA`, `AI`, `EAR`, `UL`],
    ans: 2,
    exp: `The Estimated Average Requirement (EAR) is the intake level that meets the needs of 50% of a healthy population. The RDA is set higher to meet the needs of about 97–98% of the population.`
  },
  {
    level: "C1",
    topic: "Fiber",
    q: `Which type of fiber is known to lower blood cholesterol by binding bile acids in the intestine?`,
    opts: [`Insoluble fiber`, `Cellulose`, `Soluble fiber`, `Resistant starch`],
    ans: 2,
    exp: `Soluble fiber forms a viscous gel that traps bile acids and cholesterol in the intestine, preventing their reabsorption and lowering blood cholesterol.`
  },
  {
    level: "C1",
    topic: "Vitamin C",
    q: `Which of the following is a primary function of Vitamin C (ascorbic acid)?`,
    opts: [`Calcium absorption`, `Collagen synthesis`, `Fat-soluble vitamin transport`, `Blood clotting`],
    ans: 1,
    exp: `Vitamin C is essential for collagen synthesis — it is required for hydroxylation of proline and lysine, steps necessary for collagen's triple-helix structure. Deficiency causes scurvy.`
  },
  {
    level: "C1",
    topic: "Glycemic Index",
    q: `The glycemic index (GI) measures:`,
    opts: [`Total sugar content of a food`, `A food's fiber content`, `How rapidly a food raises blood glucose`, `A food's caloric density`],
    ans: 2,
    exp: `The glycemic index ranks foods based on how quickly they raise blood glucose relative to a reference food. High-GI foods cause rapid glucose spikes, while low-GI foods produce gradual rises.`
  },
  {
    level: "C1",
    topic: "Iron",
    q: `Which form of iron is more readily absorbed by the human body?`,
    opts: [`Non-heme iron`, `Heme iron`, `Ferric iron (Fe³⁺)`, `Plant-based iron`],
    ans: 1,
    exp: `Heme iron (found in animal products) is absorbed much more efficiently than non-heme iron from plant foods.`
  },
  {
    level: "C1",
    topic: "Metabolism",
    q: `ATP (adenosine triphosphate) is best described as:`,
    opts: [`A digestive enzyme`, `The body's primary energy currency`, `A structural protein`, `A type of dietary fat`],
    ans: 1,
    exp: `ATP is the cell's primary energy currency. Energy released from metabolizing macronutrients is captured in ATP, which powers cellular processes including muscle contraction, active transport, and biosynthesis.`
  },
  {
    level: "C2",
    topic: "Protein Quality",
    q: `A complete protein differs from an incomplete protein in that it:`,
    opts: [`Contains more total calories`, `Provides all 9 essential amino acids in adequate amounts`, `Is digested more slowly`, `Contains only animal-based sources`],
    ans: 1,
    exp: `A complete protein supplies all 9 essential amino acids in quantities sufficient to support protein synthesis. Most animal proteins are complete.`
  },
  {
    level: "C2",
    topic: "Lipid Metabolism",
    q: `Why are omega-3 fatty acids considered essential?`,
    opts: [`They provide more energy than saturated fats`, `The body cannot synthesize them in adequate amounts`, `They are only found in animal foods`, `They are needed for fat-soluble vitamin storage`],
    ans: 1,
    exp: `Omega-3 fatty acids are essential because the human body lacks the enzymes needed to introduce double bonds at the omega-3 position. They must be consumed through diet.`
  },
  {
    level: "C2",
    topic: "Blood Sugar",
    q: `Why does insulin secretion increase after a high-carbohydrate meal?`,
    opts: [`To stimulate fat breakdown`, `To facilitate glucose uptake into cells and lower blood glucose`, `To enhance protein synthesis only`, `To slow gastric emptying of fiber`],
    ans: 1,
    exp: `After a carbohydrate-rich meal, blood glucose rises. The pancreatic beta cells respond by secreting insulin, which stimulates glucose entry into cells and restores blood glucose to normal levels.`
  },
  {
    level: "C2",
    topic: "Antioxidants",
    q: `Which best explains how antioxidants protect the body?`,
    opts: [`They increase caloric intake`, `They neutralize free radicals before cellular damage occurs`, `They enhance fat digestion`, `They stimulate immune cell production directly`],
    ans: 1,
    exp: `Antioxidants donate electrons to unstable free radicals, neutralizing them before they can oxidize cellular components like DNA, proteins, and membranes.`
  },
  {
    level: "C2",
    topic: "Nitrogen Balance",
    q: `A person is in negative nitrogen balance when:`,
    opts: [`Protein intake exceeds protein breakdown`, `Nitrogen excreted exceeds nitrogen consumed`, `They are in a growth phase`, `Amino acid synthesis is higher than catabolism`],
    ans: 1,
    exp: `Negative nitrogen balance occurs when nitrogen excretion exceeds nitrogen intake. This indicates net protein breakdown, common during illness, starvation, surgery, or inadequate protein intake.`
  },
  {
    level: "C2",
    topic: "Fat Digestion",
    q: `What is the role of bile in fat digestion?`,
    opts: [`Bile enzymatically breaks down triglycerides`, `Bile emulsifies fat into smaller droplets, increasing surface area for lipase`, `Bile transports fatty acids across the intestinal wall`, `Bile synthesizes cholesterol from fatty acids`],
    ans: 1,
    exp: `Bile salts act as emulsifiers, breaking large fat globules into tiny droplets and increasing the surface area available for pancreatic lipase.`
  },
  {
    level: "C2",
    topic: "Nutrient Density",
    q: `A nutrient-dense food is best defined as:`,
    opts: [`A food high in total calories`, `A food providing substantial nutrients relative to its caloric content`, `A food with no added sugars`, `A food high in macronutrients only`],
    ans: 1,
    exp: `Nutrient density refers to the ratio of beneficial nutrients to total calories in a food. Nutrient-dense foods provide high levels of nutrients for relatively few calories.`
  },
  {
    level: "C2",
    topic: "Vitamin D",
    q: `Why is vitamin D sometimes called the 'sunshine vitamin'?`,
    opts: [`It improves mood by stimulating serotonin directly`, `Sunlight converts a precursor in the skin into active vitamin D`, `It is only found in yellow-colored foods`, `It enhances calcium in the GI tract without sunlight`],
    ans: 1,
    exp: `UVB radiation converts 7-dehydrocholesterol in the skin into cholecalciferol (vitamin D3), which is then hydroxylated to produce calcitriol, the active form.`
  },
  {
    level: "C2",
    topic: "Glycolysis",
    q: `During intense anaerobic exercise, why does lactic acid accumulate in the muscle?`,
    opts: [`Fat cannot be oxidized fast enough`, `Pyruvate is converted to lactate when oxygen is insufficient for aerobic metabolism`, `Glycogen stores are completely depleted`, `Insulin blocks glucose entry into cells`],
    ans: 1,
    exp: `When oxygen delivery cannot keep pace with energy demand, pyruvate is reduced to lactate to regenerate NAD⁺ and allow glycolysis to continue.`
  },
  {
    level: "C2",
    topic: "Obesity",
    q: `Which best explains why excess dietary carbohydrate can contribute to body fat storage?`,
    opts: [`Carbohydrate directly forms adipose tissue upon consumption`, `When glycogen stores are full, excess glucose is converted to fatty acids via de novo lipogenesis`, `Carbohydrates inhibit lipolysis in all tissues`, `Excess carbohydrate blocks fat-soluble vitamin absorption`],
    ans: 1,
    exp: `When carbohydrate intake exceeds the body's glycogen storage capacity, excess glucose is directed toward de novo lipogenesis in the liver and stored as triglycerides in adipose tissue.`
  },
  {
    level: "C2",
    topic: "Folate",
    q: `Why is adequate folate intake especially critical during the first trimester of pregnancy?`,
    opts: [`Folate prevents gestational diabetes`, `Folate is essential for neural tube development and DNA synthesis in early fetal growth`, `Folate enhances fat-soluble vitamin absorption in the fetus`, `Folate prevents excessive weight gain in the mother`],
    ans: 1,
    exp: `The neural tube closes within the first 28 days of conception, often before a woman knows she is pregnant. Folate is essential for DNA synthesis and cell division.`
  },
  {
    level: "C2",
    topic: "Hunger & Satiety",
    q: `Which hormone signals satiety (fullness) after eating?`,
    opts: [`Ghrelin`, `Leptin`, `Glucagon`, `Cortisol`],
    ans: 1,
    exp: `Leptin is produced by adipose tissue and signals to the hypothalamus that energy stores are adequate, suppressing appetite and increasing energy expenditure.`
  },
  {
    level: "C2",
    topic: "Fiber & Gut Health",
    q: `How does dietary fiber contribute to gut microbiome health?`,
    opts: [`Fiber kills harmful bacteria directly`, `Fiber serves as a prebiotic substrate fermented by beneficial bacteria, producing short-chain fatty acids`, `Fiber increases gastric acid to prevent infection`, `Fiber directly synthesizes beneficial microorganisms`],
    ans: 1,
    exp: `Fermentable fibers are prebiotics — they feed beneficial gut bacteria. Fermentation produces short-chain fatty acids like butyrate, which nourish colonocytes and support barrier integrity.`
  },
  {
    level: "C2",
    topic: "Cholesterol",
    q: `Why does dietary saturated fat raise LDL cholesterol levels?`,
    opts: [`It directly enters the LDL particle in the bloodstream`, `It reduces LDL receptor expression on liver cells, impairing LDL clearance`, `It increases HDL while suppressing LDL breakdown`, `It stimulates excess bile acid synthesis`],
    ans: 1,
    exp: `Saturated fatty acids downregulate LDL receptor expression on liver cells. With fewer receptors, the liver clears less LDL from the blood, causing LDL-cholesterol levels to rise.`
  },
  {
    level: "C2",
    topic: "Basal Metabolic Rate",
    q: `Which factor is most strongly associated with a higher Basal Metabolic Rate (BMR)?`,
    opts: [`Higher body fat percentage`, `Greater lean (muscle) mass`, `Older age`, `Female sex`],
    ans: 1,
    exp: `Lean muscle mass is metabolically more active than fat tissue and is the strongest predictor of BMR. Individuals with more muscle burn more calories at rest.`
  },
  {
    level: "C3",
    topic: "Clinical Application",
    q: `A 45-year-old man with type 2 diabetes is advised to follow a low-glycemic diet. Which meal choice is MOST appropriate?`,
    opts: [`White rice with fruit juice`, `Whole grain pasta with lentils and vegetables`, `White bread with jam`, `Instant mashed potatoes and soda`],
    ans: 1,
    exp: `Whole grain pasta and lentils produce a slow, gradual blood glucose response due to their high fiber and protein content. The other options are high-GI foods that cause rapid glucose spikes.`
  },
  {
    level: "C3",
    topic: "Pregnancy Nutrition",
    q: `A pregnant woman in her first trimester is a strict vegan. Which nutrient deficiency is she at GREATEST risk for?`,
    opts: [`Vitamin C`, `Vitamin B12`, `Folate`, `Iron`],
    ans: 1,
    exp: `Vitamin B12 is found almost exclusively in animal products. A strict vegan who doesn't supplement is at high risk for deficiency, and pregnancy increases fetal risk.`
  },
  {
    level: "C3",
    topic: "Weight Management",
    q: `A 30-year-old woman maintains her weight at 2,000 kcal/day. To lose 0.5 kg per week, she should target approximately:`,
    opts: [`2,500 kcal/day`, `1,500 kcal/day`, `800 kcal/day`, `1,200 kcal/day`],
    ans: 1,
    exp: `To lose about 0.5 kg per week requires a deficit of roughly 500 kcal/day. Subtracting 500 from her maintenance of 2,000 kcal gives a target of 1,500 kcal/day.`
  },
  {
    level: "C3",
    topic: "Athlete Nutrition",
    q: `An endurance athlete is competing in a 3-hour marathon. Which fuel source will become increasingly important as the race progresses and glycogen stores deplete?`,
    opts: [`Protein from muscle breakdown only`, `Fat oxidation via beta-oxidation`, `Dietary cholesterol`, `Ketone bodies from liver exclusively`],
    ans: 1,
    exp: `After prolonged exercise, muscle glycogen becomes depleted and the body increasingly relies on fat oxidation to fuel continued effort.`
  },
  {
    level: "C3",
    topic: "Osteoporosis Prevention",
    q: `A 55-year-old postmenopausal woman wants to reduce her osteoporosis risk. Beyond calcium intake, which two additional recommendations are MOST evidence-based?`,
    opts: [`Increased sodium and vitamin A supplements`, `Adequate vitamin D and weight-bearing physical activity`, `High-protein diet and vitamin C`, `Reduced phosphorus and increased magnesium only`],
    ans: 1,
    exp: `Vitamin D is essential for intestinal calcium absorption, and weight-bearing exercise stimulates osteoblast activity and bone remodeling. Together with calcium, these are cornerstone interventions.`
  },
  {
    level: "C3",
    topic: "Food Labels",
    q: `A food label states a serving contains 15g total carbohydrate, 5g dietary fiber, and 6g sugar. What are the 'net carbs' (digestible carbohydrates)?`,
    opts: [`15g`, `10g`, `9g`, `6g`],
    ans: 1,
    exp: `Net carbs = Total carbohydrates − Dietary fiber. Since fiber is not digested and absorbed by the small intestine, it does not raise blood glucose. Therefore: 15g − 5g = 10g net carbohydrates.`
  },
  {
    level: "C3",
    topic: "Anemia",
    q: `A teenage girl presents with fatigue and is found to have microcytic, hypochromic anemia. Which dietary intervention is MOST targeted?`,
    opts: [`Increase vitamin B12 from animal products`, `Increase heme iron intake and pair non-heme sources with vitamin C`, `Increase folate through leafy greens`, `Supplement with vitamin D and calcium`],
    ans: 1,
    exp: `Microcytic, hypochromic anemia indicates iron-deficiency anemia. The most targeted intervention is increasing iron — preferably heme iron — and using vitamin C to enhance non-heme absorption.`
  },
  {
    level: "C3",
    topic: "Infant Feeding",
    q: `A 4-month-old exclusively breastfed infant is at risk for deficiency of which nutrient that breast milk contains in insufficient amounts?`,
    opts: [`Protein`, `Vitamin K`, `Vitamin D`, `Calcium`],
    ans: 2,
    exp: `Breast milk is low in vitamin D. Exclusively breastfed infants should receive a vitamin D supplement of 400 IU/day beginning shortly after birth.`
  },
  {
    level: "C3",
    topic: "Malnutrition",
    q: `A 3-year-old child in a food-insecure region shows severe edema, skin lesions, and fatty liver but has adequate caloric intake from starchy foods. This presentation is MOST consistent with:`,
    opts: [`Marasmus`, `Kwashiorkor`, `Iron-deficiency anemia`, `Vitamin A deficiency`],
    ans: 1,
    exp: `Kwashiorkor results from adequate caloric intake but severe protein deficiency. The hallmark features — edema, skin lesions, irritability, and fatty liver — distinguish it from marasmus.`
  },
  {
    level: "C3",
    topic: "Cardiovascular Diet",
    q: `A patient with elevated triglycerides is counseled on diet changes. Which modification is MOST effective for reducing triglyceride levels?`,
    opts: [`Eliminating all dietary cholesterol`, `Reducing refined carbohydrates and added sugars; replacing with unsaturated fats`, `Switching from unsaturated to saturated fats`, `Increasing dietary fiber only`],
    ans: 1,
    exp: `Elevated triglycerides are driven primarily by excess refined carbohydrates and added sugars. Reducing these and replacing them with unsaturated fats is the most evidence-based dietary approach.`
  },
  {
    level: "C3",
    topic: "Alcohol & Nutrition",
    q: `A person consuming 6 alcoholic drinks daily over many years is most likely to develop deficiency of which vitamin, and why?`,
    opts: [`Vitamin A — because alcohol blocks beta-carotene conversion`, `Thiamin (B1) — because alcohol impairs its absorption and utilization while displacing nutritious food`, `Vitamin C — because alcohol destroys ascorbic acid in the stomach`, `Vitamin E — because alcohol enhances its oxidation`],
    ans: 1,
    exp: `Chronic alcohol use most classically causes thiamin deficiency through impaired intestinal absorption, reduced storage, increased urinary excretion, and poor dietary intake.`
  },
  {
    level: "C3",
    topic: "Sports Nutrition",
    q: `A strength athlete wants to maximize muscle protein synthesis after a workout. Based on nutrition principles, the BEST post-workout strategy is:`,
    opts: [`Fast for 2 hours to enhance growth hormone`, `Consume 20–40g of high-quality protein with carbohydrates within 30–60 minutes post-exercise`, `Consume fat-only foods to replenish energy stores`, `Take branched-chain amino acid supplements only, without carbohydrates`],
    ans: 1,
    exp: `Post-exercise, muscles are primed for protein synthesis. Consuming 20–40g of high-quality protein stimulates anabolic pathways, and adding carbohydrates restores glycogen and supports protein synthesis.`
  },
  {
    level: "C3",
    topic: "Food Security",
    q: `A low-income family needs to maximize protein quality on a limited budget. Which combination of plant foods provides complementary proteins equivalent to a complete protein?`,
    opts: [`White rice and potatoes`, `Brown rice and black beans`, `Corn tortillas and lettuce`, `Oats and sugar`],
    ans: 1,
    exp: `Rice is limiting in lysine but rich in methionine; beans are limiting in methionine but rich in lysine. Together, brown rice and black beans provide all essential amino acids in adequate proportions.`
  },
  {
    level: "C3",
    topic: "Hypertension & Diet",
    q: `A patient with hypertension is placed on the DASH diet. Which nutrient pattern does the DASH diet specifically emphasize?`,
    opts: [`High sodium, low potassium`, `Low saturated fat, high fruits/vegetables, adequate potassium/calcium/magnesium`, `Very low calorie, high protein`, `High fiber only with no restriction on sodium`],
    ans: 1,
    exp: `The DASH diet emphasizes fruits, vegetables, low-fat dairy, whole grains, and lean proteins, which together provide high potassium, calcium, and magnesium while limiting sodium and saturated fat.`
  },
  {
    level: "C3",
    topic: "Gut Absorption",
    q: `A patient who has had their ileum (terminal section of small intestine) surgically removed will be most at risk for deficiency of:`,
    opts: [`Iron`, `Vitamin B12 and fat-soluble vitamins`, `Vitamin C`, `Calcium and magnesium`],
    ans: 1,
    exp: `The ileum is the exclusive site of vitamin B12 absorption via intrinsic factor receptors and the major site of bile acid reabsorption. Without the ileum, B12 absorption is impaired and fat-soluble vitamins are malabsorbed.`
  }
];

const LEVEL_TO_CATEGORY = {
  C1: "fat_soluble_vitamins",
  C2: "water_soluble_vitamins",
  C3: "minerals"
};

const DIFFICULTY_BY_LEVEL = {
  C1: "intern",
  C2: "junior_dietitian",
  C3: "senior_dietitian"
};

const RARITY_BY_LEVEL = {
  C1: "common",
  C2: "rare",
  C3: "legendary"
};

const RARITY_COLOR = {
  common: "#FFD700",
  uncommon: "#FF8C00",
  rare: "#5bbfb5",
  epic: "#a78bfa",
  legendary: "#6A0DAD"
};

const ICON_RULES = [
  [/vitamin a|carotene|carrot/i, "🥕"],
  [/vitamin d|sunshine|rickets|bone/i, "🌞"],
  [/vitamin k|leafy|warfarin/i, "🌿"],
  [/vitamin e|tocopherol|sunflower/i, "🌻"],
  [/vitamin c|scurvy|citrus/i, "🍊"],
  [/thiamin|thiamine|wernicke|alcohol/i, "🌾"],
  [/niacin|pellagra|corn/i, "🌽"],
  [/folate|prenatal|neural tube/i, "🤱"],
  [/b12|vegan|ileum|methylmalonyl/i, "💜"],
  [/iron|anemia|pica/i, "🧄"],
  [/zinc|taste|wound|oyster/i, "🦪"],
  [/calcium|osteoporosis|dairy|fracture/i, "🥛"],
  [/magnesium|tremor|arrhythmia|chocolate/i, "🍫"],
  [/iodine|thyroid|seaweed/i, "🌊"],
  [/selenium|brazil/i, "🌰"],
  [/riboflavin|cheilitis|milk/i, "🥛"],
  [/biotin|egg/i, "🥚"],
  [/potassium|banana|u-waves/i, "🍌"],
  [/phosphorus|refeeding/i, "🏥"]
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function inferCategory(question) {
  const text = `${question.topic} ${question.q} ${question.exp}`.toLowerCase();
  if (/(vitamin a|vitamin d|vitamin e|vitamin k|fat-soluble)/.test(text)) return "fat_soluble_vitamins";
  if (/(vitamin c|thiamin|thiamine|niacin|folate|b12|riboflavin|biotin)/.test(text)) return "water_soluble_vitamins";
  if (/(iron|zinc|calcium|magnesium|iodine|selenium|potassium|phosphorus|refeeding)/.test(text)) return "minerals";
  return LEVEL_TO_CATEGORY[question.level] || "minerals";
}

function inferAvatarState(question) {
  const text = `${question.topic} ${question.q} ${question.exp}`.toLowerCase();
  if (/vitamin a/i.test(text) && /toxicity|supplement|50,000|100,000/i.test(`${question.q} ${question.exp}`)) return "vitaminA_toxicity";
  if (/vitamin a/i.test(text)) return "vitaminA_deficiency";
  if (/vitamin d/i.test(text) || /rickets/i.test(text)) return "vitaminD_deficiency";
  if (/vitamin k/i.test(text)) return "vitaminK_deficiency";
  if (/vitamin e/i.test(text)) return "vitaminE_deficiency";
  if (/vitamin c|scurvy/i.test(text)) return "vitaminC_deficiency";
  if (/thiamin|thiamine|wernicke|alcohol/i.test(text)) return "thiamine_deficiency";
  if (/niacin|pellagra|corn/i.test(text)) return "niacin_deficiency";
  if (/folate|neural tube|prenatal/i.test(text)) return "folate_deficiency";
  if (/b12|vegan|ileum|methylmalonyl/i.test(text)) return "b12_deficiency";
  if (/iron|anemia|pica|ferritin/i.test(text)) return "iron_deficiency";
  if (/zinc|taste|wound|acrodermatitis/i.test(text)) return "zinc_deficiency";
  if (/calcium|osteoporosis|fracture/i.test(text)) return "calcium_deficiency";
  if (/magnesium|trosseau|arrhythmia/i.test(text)) return "magnesium_deficiency";
  if (/iodine|goiter|thyroid/i.test(text)) return "iodine_deficiency";
  if (/selenium|cardiomyopathy/i.test(text)) return "selenium_deficiency";
  if (/riboflavin|angular cheilitis|magenta/i.test(text)) return "riboflavin_deficiency";
  if (/biotin|raw egg|avidin/i.test(text)) return "biotin_deficiency";
  if (/potassium|hypokalemia|u-waves|digoxin/i.test(text)) return "potassium_deficiency";
  if (/phosphorus|refeeding/i.test(text)) return "phosphorus_deficiency";
  return "healthy";
}

function inferSymptoms(question) {
  const text = `${question.topic} ${question.q} ${question.exp}`.toLowerCase();
  if (/vitamin a/.test(text)) return ["Night blindness", "Bitot's spots", "Follicular hyperkeratosis"];
  if (/vitamin d|rickets/.test(text)) return ["Bowed legs", "Delayed dentition", "Muscle weakness"];
  if (/vitamin k/.test(text)) return ["Prolonged PT/INR", "Umbilical bleeding", "Bleeding risk"];
  if (/vitamin e/.test(text)) return ["Peripheral neuropathy", "Spinocerebellar ataxia", "Ophthalmoplegia"];
  if (/vitamin c|scurvy/.test(text)) return ["Bleeding gums", "Perifollicular hemorrhages", "Poor wound healing"];
  if (/thiamin|thiamine|wernicke|alcohol/.test(text)) return ["Confusion", "Ophthalmoplegia", "Ataxia"];
  if (/niacin|pellagra|corn/.test(text)) return ["Dermatitis", "Diarrhea", "Dementia"];
  if (/folate|pregnancy|neural tube/.test(text)) return ["Megaloblastic anemia", "Macro-ovalocytes", "Neural tube defect risk"];
  if (/b12|vegan|ileum|methylmalonyl/.test(text)) return ["Megaloblastic anemia", "Peripheral neuropathy", "Subacute combined degeneration"];
  if (/iron|anemia|pica|ferritin/.test(text)) return ["Microcytic anemia", "Pica", "Pallor"];
  if (/zinc|acrodermatitis|taste|wound/.test(text)) return ["Alopecia", "Hypogeusia", "Perioral dermatitis"];
  if (/calcium|osteoporosis|fracture/.test(text)) return ["Fragility fracture", "Muscle cramps", "Bone loss"];
  if (/magnesium|trosseau|arrhythmia/.test(text)) return ["Trousseau's sign", "Arrhythmia", "Tremors"];
  if (/iodine|goiter|thyroid/.test(text)) return ["Goiter", "Hypothyroidism", "Cretinism risk"];
  if (/selenium|cardiomyopathy/.test(text)) return ["Cardiomyopathy", "Myopathy", "Oxidative stress"];
  if (/riboflavin|cheilitis|magenta/.test(text)) return ["Angular cheilitis", "Magenta glossitis", "Photophobia"];
  if (/biotin|raw egg|avidin/.test(text)) return ["Diffuse alopecia", "Periorificial dermatitis", "Depression"];
  if (/potassium|hypokalemia|u-waves|digoxin/.test(text)) return ["Hypokalemia", "U-waves", "Ileus"];
  if (/phosphorus|refeeding/.test(text)) return ["Refeeding syndrome", "Respiratory failure", "Arrhythmia"];
  return ["Concept mastery", "Clinical reasoning", "Dietary application"];
}

function makeHotspots(symptoms) {
  const coords = [
    { xPct: 0.5, yPct: 0.2 },
    { xPct: 0.35, yPct: 0.55 },
    { xPct: 0.65, yPct: 0.75 }
  ];
  return symptoms.slice(0, 3).map((label, index) => ({ ...coords[index], label }));
}

function inferBagelIcon(question) {
  const text = `${question.topic} ${question.q} ${question.exp}`;
  for (const [pattern, icon] of ICON_RULES) {
    if (pattern.test(text)) return icon;
  }
  return "🥯";
}

function inferBagel(question, index) {
  const rarity = RARITY_BY_LEVEL[question.level] || "common";
  const topicName = question.topic.replace(/\s*—\s*.+$/, "").replace(/&/g, "and");
  return {
    id: `bagel_${index + 1}_${slugify(question.topic)}`,
    name: `${topicName} Bagel`,
    icon: inferBagelIcon(question),
    rarity,
    color: RARITY_COLOR[rarity] || "#FFD700"
  };
}

function enrichQuestion(question, index) {
  const letters = ["a", "b", "c", "d"];
  const category = inferCategory(question);
  const symptoms = inferSymptoms(question);
  const patientCase = question.q;
  const avatarState = inferAvatarState(question);
  const bagel = inferBagel(question, index);

  const options = question.opts.map((label, optionIndex) => {
    const correct = optionIndex === question.ans;
    const type = correct ? "optimal" : optionIndex % 2 === 0 ? "deficient" : "toxic";
    const icon = correct ? "✅" : type === "toxic" ? "☠" : "⚠";
    return {
      id: letters[optionIndex],
      label,
      type,
      icon,
      nutri_points: correct ? 100 : type === "toxic" ? -50 : -25,
      description: correct ? question.exp : `This option does not best answer the question about ${question.topic.toLowerCase()}.`
    };
  });

  return {
    id: index + 1,
    level: question.level,
    topic: question.topic,
    q: question.q,
    opts: question.opts,
    ans: question.ans,
    exp: question.exp,
    category,
    nutrient: question.topic,
    difficulty: DIFFICULTY_BY_LEVEL[question.level] || "intern",
    patientCase,
    avatarState,
    symptoms,
    bodyHotspots: makeHotspots(symptoms),
    options,
    correctOption: letters[question.ans],
    wardlawPerspective: question.exp,
    bagel
  };
}

const QUESTION_BANK = BASE_QUESTIONS.map(enrichQuestion);
const BAGEL_REGISTRY = QUESTION_BANK.map(q => q.bagel);
const CATEGORIES = {
  fat_soluble_vitamins: { label: "Fat-Soluble Vitamins", icon: "🌟", color: "#ffd700" },
  water_soluble_vitamins: { label: "Water-Soluble Vitamins", icon: "💧", color: "#00d4ff" },
  minerals: { label: "Minerals & Electrolytes", icon: "⚗️", color: "#00ff88" }
};

function getRandomQuestions(n = 5) {
  return [...QUESTION_BANK].sort(() => Math.random() - 0.5).slice(0, n);
}
function getQuestionsByCategory(category) {
  return QUESTION_BANK.filter(q => q.category === category);
}
function getQuestionById(id) {
  return QUESTION_BANK.find(q => q.id === id);
}
