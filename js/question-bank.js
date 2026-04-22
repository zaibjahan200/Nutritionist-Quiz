// ============================================================
// KINETIC ALCHEMY: THE BIO-FORGE — Clinical Question Bank
// ============================================================

const QUESTION_BANK = [
  {
    id: 1, category: "fat_soluble_vitamins", nutrient: "Vitamin A", difficulty: "intern",
    patientCase: "A 4-year-old child presents with difficulty seeing at dusk, frequent chest infections, foamy patches on the conjunctiva (Bitot's spots), and rough 'goosebump-like' skin on the upper arms.",
    avatarState: "vitaminA_deficiency",
    symptoms: ["Night blindness","Bitot's spots","Follicular hyperkeratosis"],
    bodyHotspots:[{xPct:.5,yPct:.2,label:"Night blindness"},{xPct:.38,yPct:.24,label:"Bitot's spots"},{xPct:.72,yPct:.55,label:"Follicular hyperkeratosis"}],
    options:[
      {id:"a",label:"Retinol-rich foods + 400 μg RAE/day supplement",type:"optimal",icon:"🥕",nutri_points:100,description:"Meets RDA safely for this age group"},
      {id:"b",label:"Wait and monitor — likely just dry eyes",type:"deficient",icon:"🚫",nutri_points:-25,description:"Misses Vitamin A deficiency — inadequate treatment"},
      {id:"c",label:"100,000 IU Vitamin A daily for 6 months",type:"toxic",icon:"☠",nutri_points:-50,description:"Grossly exceeds UL — hypervitaminosis A toxicity risk"}
    ],
    correctOption:"a",
    wardlawPerspective:"Vitamin A (retinol) is essential for rhodopsin synthesis in retinal rod cells enabling dim-light vision. Bitot's spots are pathognomonic for deficiency. The UL for children 4–8 is 900 μg RAE/day; chronic 100,000 IU/day (~30,000 μg) causes hepatotoxicity, intracranial hypertension, and teratogenicity. Dietary sources: liver, dairy, eggs, and β-carotene from orange/yellow produce (provitamin A — no toxicity risk).",
    bagel:{id:"golden_carrot",name:"The Golden Carrot Bagel",icon:"🥕",rarity:"uncommon",color:"#ff8c00"}
  },
  {
    id: 2, category: "fat_soluble_vitamins", nutrient: "Vitamin A Toxicity", difficulty: "junior_dietitian",
    patientCase: "A 28-year-old woman on a 50,000 IU/day 'beauty supplement' presents with 3 months of severe headaches, blurred vision, nausea, skin desquamation, and hair loss.",
    avatarState: "vitaminA_toxicity",
    symptoms: ["Intracranial hypertension","Skin desquamation","Alopecia"],
    bodyHotspots:[{xPct:.5,yPct:.15,label:"Headache / ↑ ICP"},{xPct:.65,yPct:.25,label:"Alopecia"},{xPct:.5,yPct:.5,label:"Skin desquamation"}],
    options:[
      {id:"a",label:"Immediately discontinue the supplement",type:"optimal",icon:"✅",nutri_points:100,description:"Removes toxin source — symptoms resolve gradually"},
      {id:"b",label:"Reduce dose to 10,000 IU/day",type:"deficient",icon:"⚠",nutri_points:-25,description:"Still exceeds UL for adults (3,000 μg RAE); symptoms persist"},
      {id:"c",label:"Add Vitamin E to counteract toxicity",type:"toxic",icon:"❌",nutri_points:-50,description:"Dangerous myth — does not resolve toxicity; worsens liver burden"}
    ],
    correctOption:"a",
    wardlawPerspective:"Preformed Vitamin A from supplements is fat-soluble and accumulates. The adult UL is 3,000 μg RAE (~10,000 IU). At 50,000 IU/day, hypervitaminosis A causes pseudotumor cerebri, hepatic fibrosis, and bone mineral loss. β-Carotene from food does NOT cause toxicity — excess is stored in skin as benign carotenodermia.",
    bagel:{id:"warning_sesame",name:"The Warning Sesame Bagel",icon:"⚠",rarity:"rare",color:"#ff4500"}
  },
  {
    id: 3, category: "fat_soluble_vitamins", nutrient: "Vitamin D", difficulty: "intern",
    patientCase: "A 14-month-old in a Northern city has bowing of the legs, delayed tooth eruption, and poor growth. Exclusively breastfed, rarely outdoors. Serum 25(OH)D = 10 ng/mL.",
    avatarState: "vitaminD_deficiency",
    symptoms: ["Bowed legs (rickets)","Delayed dentition","Muscle weakness"],
    bodyHotspots:[{xPct:.35,yPct:.75,label:"Bowed legs (genu varum)"},{xPct:.5,yPct:.3,label:"Delayed dentition"},{xPct:.5,yPct:.6,label:"Hypotonia"}],
    options:[
      {id:"a",label:"Vitamin D3 400 IU/day + sun exposure guidance",type:"optimal",icon:"☀",nutri_points:100,description:"AAP/RDA recommendation + addresses root cause"},
      {id:"b",label:"Switch to formula — no supplementation needed",type:"deficient",icon:"🍼",nutri_points:-25,description:"Formula helps but clinical deficiency needs direct supplementation"},
      {id:"c",label:"50,000 IU Vitamin D3 weekly for 3 months",type:"toxic",icon:"☠",nutri_points:-50,description:"Therapeutic adult dose — hypercalcemia risk in a toddler"}
    ],
    correctOption:"a",
    wardlawPerspective:"Vitamin D regulates calcium homeostasis by promoting intestinal Ca²⁺ absorption. Deficiency in children causes rickets — failure of bone mineralization. Breast milk contains ~20 IU/L Vitamin D; exclusively breastfed infants are high-risk. The UL for infants is 100 μg (4,000 IU)/day; toxicity causes hypercalcemia and soft-tissue calcification.",
    bagel:{id:"sunshine_sesame",name:"The Sunshine Sesame Bagel",icon:"🌞",rarity:"common",color:"#FFD700"}
  },
  {
    id: 4, category: "fat_soluble_vitamins", nutrient: "Vitamin K", difficulty: "intern",
    patientCase: "A 4-day-old neonate born at home (no routine injection) presents with umbilical stump bleeding and prolonged PT. Mother took cholestyramine during pregnancy.",
    avatarState: "vitaminK_deficiency",
    symptoms: ["Prolonged PT/INR","Umbilical bleeding","Intracranial hemorrhage risk"],
    bodyHotspots:[{xPct:.5,yPct:.55,label:"Umbilical bleeding"},{xPct:.5,yPct:.15,label:"Intracranial hemorrhage risk"},{xPct:.3,yPct:.65,label:"Ecchymoses"}],
    options:[
      {id:"a",label:"1 mg phytonadione (Vit K₁) IM immediately",type:"optimal",icon:"💉",nutri_points:100,description:"Standard HDN prophylaxis — rapidly corrects coagulopathy"},
      {id:"b",label:"Oral Vitamin K supplements only",type:"deficient",icon:"💊",nutri_points:-25,description:"Less reliable absorption; insufficient in severe HDN"},
      {id:"c",label:"Warfarin antagonist therapy",type:"toxic",icon:"❌",nutri_points:-50,description:"Warfarin blocks Vit K — giving it is contraindicated and harmful"}
    ],
    correctOption:"a",
    wardlawPerspective:"Vitamin K is cofactor for γ-carboxylation of clotting factors II, VII, IX, X. HDN occurs because breast milk is low in K₁, gut flora haven't colonized, and placental transfer is limited. Cholestyramine impairs fat-soluble vitamin absorption. Dietary K₁ (phylloquinone) from leafy greens; K₂ (menaquinone) from fermented foods.",
    bagel:{id:"leafy_green",name:"The Leafy Green Bagel",icon:"🌿",rarity:"uncommon",color:"#228B22"}
  },
  {
    id: 5, category: "fat_soluble_vitamins", nutrient: "Vitamin E", difficulty: "senior_dietitian",
    patientCase: "A 45-year-old with Crohn's disease and fat malabsorption presents with progressive loss of balance, diminished deep tendon reflexes, and gaze difficulty. Serum α-tocopherol is critically low.",
    avatarState: "vitaminE_deficiency",
    symptoms: ["Peripheral neuropathy","Spinocerebellar ataxia","Ophthalmoplegia"],
    bodyHotspots:[{xPct:.35,yPct:.7,label:"Peripheral neuropathy"},{xPct:.5,yPct:.65,label:"Ataxia"},{xPct:.5,yPct:.22,label:"Ophthalmoplegia"}],
    options:[
      {id:"a",label:"α-Tocopherol 15 mg/day in fat-soluble formulation",type:"optimal",icon:"🌻",nutri_points:100,description:"Repletes deficiency; fat-soluble form maximizes absorption"},
      {id:"b",label:"Dietary advice alone — eat more nuts",type:"deficient",icon:"🥜",nutri_points:-25,description:"Fat malabsorption makes dietary changes insufficient"},
      {id:"c",label:"Ignore — neurological symptoms are unrelated",type:"toxic",icon:"❌",nutri_points:-50,description:"Vitamin E deficiency precisely causes this neurological picture"}
    ],
    correctOption:"a",
    wardlawPerspective:"Vitamin E (α-tocopherol) protects myelin from oxidative damage. Its deficiency is rare without fat malabsorption. The classic triad — spinocerebellar ataxia, peripheral neuropathy, ophthalmoplegia — mimics Friedreich's ataxia. High doses (UL: 1,000 mg/day) inhibit Vitamin K-dependent coagulation.",
    bagel:{id:"sunflower_seed",name:"The Sunflower Seed Bagel",icon:"🌻",rarity:"epic",color:"#DAA520"}
  },
  {
    id: 6, category: "water_soluble_vitamins", nutrient: "Vitamin C", difficulty: "intern",
    patientCase: "A 52-year-old homeless man with 6 months on fast food and alcohol has fatigue, bleeding gums, perifollicular hemorrhages, joint swelling, and reopened old scars.",
    avatarState: "vitaminC_deficiency",
    symptoms: ["Bleeding gums","Perifollicular hemorrhages","Wound reopening"],
    bodyHotspots:[{xPct:.5,yPct:.3,label:"Bleeding gums (scurvy)"},{xPct:.65,yPct:.55,label:"Perifollicular hemorrhages"},{xPct:.4,yPct:.75,label:"Reopened scars"}],
    options:[
      {id:"a",label:"Vitamin C 100–300 mg/day + fresh fruits and vegetables",type:"optimal",icon:"🍊",nutri_points:100,description:"RDA (90 mg/day men) repletes stores; dietary sources essential"},
      {id:"b",label:"Iron supplements — this is just anemia",type:"deficient",icon:"❌",nutri_points:-25,description:"Misdiagnosis — scurvy is primary; anemia is secondary"},
      {id:"c",label:"Vitamin C 3,000 mg/day for rapid recovery",type:"toxic",icon:"⚠",nutri_points:-50,description:"Exceeds UL (2,000 mg/day) — GI distress and oxalate kidney stones"}
    ],
    correctOption:"a",
    wardlawPerspective:"Vitamin C is cofactor for prolyl and lysyl hydroxylases that stabilize the collagen triple-helix. Without hydroxylation, collagen is defective — causing capillary fragility, impaired wound healing, and scar reopening. Also enhances non-heme iron absorption (Fe³⁺ → Fe²⁺). Sources: citrus, strawberries, bell peppers, broccoli. UL 2,000 mg/day; excess causes osmotic diarrhea and hyperoxaluria.",
    bagel:{id:"citrus_zest",name:"The Citrus Zest Bagel",icon:"🍊",rarity:"common",color:"#FF8C00"}
  },
  {
    id: 7, category: "water_soluble_vitamins", nutrient: "Thiamine B1", difficulty: "junior_dietitian",
    patientCase: "A 38-year-old with severe alcohol use disorder arrives confused, unable to walk, with horizontal nystagmus and lateral gaze palsy. Diet = alcohol and white bread.",
    avatarState: "thiamine_deficiency",
    symptoms: ["Ophthalmoplegia","Ataxia","Confusion (Wernicke's triad)"],
    bodyHotspots:[{xPct:.5,yPct:.2,label:"Confusion / delirium"},{xPct:.5,yPct:.22,label:"Nystagmus / gaze palsy"},{xPct:.5,yPct:.65,label:"Gait ataxia"}],
    options:[
      {id:"a",label:"IV thiamine 500 mg TID × 3 days immediately",type:"optimal",icon:"💉",nutri_points:100,description:"IV thiamine BEFORE glucose — prevents/reverses Wernicke's encephalopathy"},
      {id:"b",label:"Give IV dextrose and monitor",type:"deficient",icon:"🩺",nutri_points:-25,description:"FATAL ERROR — glucose without thiamine precipitates Wernicke's"},
      {id:"c",label:"Oral B-complex and discharge",type:"toxic",icon:"❌",nutri_points:-50,description:"Inadequate route; oral absorption unreliable in severe alcoholism"}
    ],
    correctOption:"a",
    wardlawPerspective:"Thiamine (B1) is cofactor for pyruvate dehydrogenase, α-ketoglutarate dehydrogenase, and transketolase. Wernicke's encephalopathy (confusion + ophthalmoplegia + ataxia) is a medical emergency. Glucose without thiamine depletes remaining stores and precipitates or worsens Wernicke's — THIAMINE FIRST. Untreated → Korsakoff's psychosis (irreversible anterograde amnesia).",
    bagel:{id:"whole_grain_hero",name:"The Whole Grain Hero Bagel",icon:"🌾",rarity:"rare",color:"#8B6914"}
  },
  {
    id: 8, category: "water_soluble_vitamins", nutrient: "Niacin B3", difficulty: "junior_dietitian",
    patientCase: "A 35-year-old refugee on a corn-only diet for 8 months has symmetric hyperpigmented scaly rash on exposed skin, 5–6 watery stools/day, and progressive confusion.",
    avatarState: "niacin_deficiency",
    symptoms: ["Dermatitis (photosensitive)","Diarrhea","Dementia — 3 Ds of Pellagra"],
    bodyHotspots:[{xPct:.5,yPct:.33,label:"Dermatitis (Casal's necklace)"},{xPct:.5,yPct:.6,label:"GI: Diarrhea"},{xPct:.5,yPct:.17,label:"Dementia / confusion"}],
    options:[
      {id:"a",label:"Nicotinamide 300 mg/day divided + balanced diet",type:"optimal",icon:"🥩",nutri_points:100,description:"Therapeutic nicotinamide avoids flush; dietary diversification prevents relapse"},
      {id:"b",label:"Topical steroid cream for the rash",type:"deficient",icon:"🧴",nutri_points:-25,description:"Treats symptom not cause; systemic deficiency remains untreated"},
      {id:"c",label:"Niacin 2,000 mg/day (lipid-lowering dose)",type:"toxic",icon:"⚠",nutri_points:-50,description:"Exceeds UL (35 mg/day); causes flushing, hepatotoxicity, hyperglycemia"}
    ],
    correctOption:"a",
    wardlawPerspective:"Niacin (B3) forms NAD⁺ and NADP⁺ coenzymes used in 400+ metabolic reactions. Pellagra's 4 Ds: Dermatitis, Diarrhea, Dementia, Death. Corn diets: low tryptophan (niacin precursor) + niacin bound as niacytin (bioavailable only after alkali/nixtamalization). Nicotinamide preferred over nicotinic acid to avoid vasodilatory flushing.",
    bagel:{id:"iron_crusted",name:"The Iron-Crusted Rye Bagel",icon:"🌾",rarity:"rare",color:"#8B4513"}
  },
  {
    id: 9, category: "water_soluble_vitamins", nutrient: "Folate", difficulty: "intern",
    patientCase: "Week-8 prenatal: 26-year-old with no prenatal vitamins, MCV 108 fL, macro-ovalocytosis on smear, family history of neural tube defects.",
    avatarState: "folate_deficiency",
    symptoms: ["Megaloblastic anemia","Macro-ovalocytosis","Neural tube defect risk"],
    bodyHotspots:[{xPct:.5,yPct:.45,label:"Megaloblastic anemia"},{xPct:.65,yPct:.55,label:"Pallor"},{xPct:.5,yPct:.62,label:"Fetal NTD risk"}],
    options:[
      {id:"a",label:"Folic acid 5 mg/day (high-risk) + prenatal vitamin 400 μg folate",type:"optimal",icon:"💊",nutri_points:100,description:"High-risk protocol for NTD family history — 5 mg is appropriate"},
      {id:"b",label:"Diet rich in leafy greens only",type:"deficient",icon:"🥗",nutri_points:-25,description:"Food folate bioavailability ~50% of supplement; insufficient for clinical deficiency"},
      {id:"c",label:"500 mg/day folic acid — more is better",type:"toxic",icon:"❌",nutri_points:-50,description:"UL is 1,000 μg for adults; 500 mg grossly exceeds this and MASKS B12 deficiency"}
    ],
    correctOption:"a",
    wardlawPerspective:"Folate drives one-carbon transfer for purine/thymidylate synthesis in rapidly dividing cells. Neural tube closure occurs days 21–28 — before many women know they're pregnant. WHO/CDC recommend 400–800 μg folic acid for ALL women of reproductive age; 5 mg/day for high-risk. MTHFR polymorphisms may further impair folate metabolism.",
    bagel:{id:"prenatal_power",name:"The Prenatal Power Bagel",icon:"🤱",rarity:"epic",color:"#9370DB"}
  },
  {
    id: 10, category: "water_soluble_vitamins", nutrient: "Vitamin B12", difficulty: "senior_dietitian",
    patientCase: "A 68-year-old strict vegan: extreme fatigue, tingling hands/feet, difficulty walking, mild cognitive impairment. Lab: MCV 112 fL, B12 120 pg/mL, elevated MMA and homocysteine.",
    avatarState: "b12_deficiency",
    symptoms: ["Megaloblastic anemia","Subacute combined degeneration","Peripheral neuropathy"],
    bodyHotspots:[{xPct:.35,yPct:.75,label:"Peripheral neuropathy"},{xPct:.5,yPct:.55,label:"Posterior column degeneration"},{xPct:.5,yPct:.18,label:"Cognitive decline"}],
    options:[
      {id:"a",label:"Cyanocobalamin 1,000 μg IM weekly × 8 weeks then monthly",type:"optimal",icon:"💉",nutri_points:100,description:"Bypasses GI absorption — optimal for severe deficiency with neuro signs"},
      {id:"b",label:"Oral B12 50 μg/day",type:"deficient",icon:"💊",nutri_points:-25,description:"Too low — severe deficiency needs 1,000–2,000 μg/day oral or IM"},
      {id:"c",label:"High-dose folate — same blood picture",type:"toxic",icon:"☠",nutri_points:-50,description:"CRITICAL ERROR: corrects anemia but allows irreversible neurological damage to progress silently"}
    ],
    correctOption:"a",
    wardlawPerspective:"B12 is essential for methionine synthase (myelin synthesis) and methylmalonyl-CoA mutase (odd-chain fatty acid metabolism). Deficiency causes megaloblastic anemia AND subacute combined degeneration of the spinal cord. Folate corrects the anemia but allows spinal cord damage to progress irreversibly. Elevated MMA confirms B12 (not folate) deficiency.",
    bagel:{id:"vegan_iron",name:"The Vegan Iron Bagel",icon:"💜",rarity:"legendary",color:"#6A0DAD"}
  },
  {
    id: 11, category: "minerals", nutrient: "Iron", difficulty: "intern",
    patientCase: "A 19-year-old female student: fatigue, pallor, brittle nails, pica (craving ice), heavy menses 7–8 days. Lab: Hgb 9.2 g/dL, MCV 72 fL, ferritin 6 ng/mL.",
    avatarState: "iron_deficiency",
    symptoms: ["Microcytic anemia","Koilonychia","Pica (pagophagia)","Pallor"],
    bodyHotspots:[{xPct:.5,yPct:.4,label:"Pallor (skin/conjunctiva)"},{xPct:.75,yPct:.65,label:"Koilonychia (spoon nails)"},{xPct:.5,yPct:.18,label:"Cognitive fatigue"}],
    options:[
      {id:"a",label:"Ferrous sulfate 325 mg TID + dietary heme iron counseling",type:"optimal",icon:"🥩",nutri_points:100,description:"Standard oral iron repletes stores; heme iron ~25% bioavailability"},
      {id:"b",label:"Spinach-rich diet only",type:"deficient",icon:"🥬",nutri_points:-25,description:"Non-heme iron in spinach only ~5% bioavailable (oxalate-bound) — inadequate clinically"},
      {id:"c",label:"IV iron dextran 1,000 mg stat",type:"toxic",icon:"⚠",nutri_points:-50,description:"Reserved for oral failure; anaphylaxis risk without proper test dose protocol"}
    ],
    correctOption:"a",
    wardlawPerspective:"Iron deficiency anemia is the world's most prevalent nutritional deficiency. Heme iron (meat/fish) absorbs ~25%; non-heme iron ~5% (enhanced by Vitamin C, inhibited by phytates/oxalates/tannins). Ferritin <12 ng/mL = iron store depletion. Pagophagia (ice craving) is specific to iron deficiency. IV iron reserved for oral intolerance/malabsorption.",
    bagel:{id:"iron_garlic",name:"The Iron-Fortified Garlic Bagel",icon:"🧄",rarity:"uncommon",color:"#B22222"}
  },
  {
    id: 12, category: "minerals", nutrient: "Zinc", difficulty: "junior_dietitian",
    patientCase: "A child with acrodermatitis enteropathica has perioral/perianal dermatitis and alopecia. A 60-year-old post-gastrectomy patient reports impaired wound healing and diminished taste/smell.",
    avatarState: "zinc_deficiency",
    symptoms: ["Acrodermatitis","Alopecia","Hypogeusia/anosmia","Poor wound healing"],
    bodyHotspots:[{xPct:.5,yPct:.3,label:"Perioral dermatitis"},{xPct:.5,yPct:.22,label:"Hypogeusia (impaired taste)"},{xPct:.65,yPct:.2,label:"Alopecia"}],
    options:[
      {id:"a",label:"Zinc gluconate/sulfate 8–11 mg/day (RDA)",type:"optimal",icon:"🦪",nutri_points:100,description:"Repletes deficiency; oysters/red meat are best sources"},
      {id:"b",label:"Copper supplementation",type:"deficient",icon:"🔩",nutri_points:-25,description:"Incorrect — zinc deficiency produces this picture, not copper"},
      {id:"c",label:"High-dose zinc 200 mg/day",type:"toxic",icon:"☠",nutri_points:-50,description:"UL 40 mg/day; excess zinc induces copper deficiency (metallothionein competition)"}
    ],
    correctOption:"a",
    wardlawPerspective:"Zinc is a structural/catalytic component of 300+ enzymes. Critical for: cell proliferation, immune function, senses (gustin in taste buds), wound healing, and dermal integrity. Zinc and copper compete for absorption via metallothionein — chronic high-dose zinc causes hypocupremia and myelopathy. Post-gastrectomy: reduced acid impairs zinc solubilization.",
    bagel:{id:"oyster_pearl",name:"The Pearl Oyster Bagel",icon:"🦪",rarity:"uncommon",color:"#708090"}
  },
  {
    id: 13, category: "minerals", nutrient: "Calcium", difficulty: "intern",
    patientCase: "A 65-year-old postmenopausal woman has a hip fragility fracture after a minor fall. T-score: -2.8. She rarely consumes dairy, takes a PPI for GERD, and is largely housebound.",
    avatarState: "calcium_deficiency",
    symptoms: ["Osteoporosis","Fragility fracture","Muscle cramps"],
    bodyHotspots:[{xPct:.45,yPct:.68,label:"Hip fragility fracture"},{xPct:.5,yPct:.55,label:"Vertebral compression"},{xPct:.35,yPct:.75,label:"Muscle cramps / tetany"}],
    options:[
      {id:"a",label:"Calcium carbonate 1,200 mg/day + Vitamin D 800 IU/day + weight-bearing exercise",type:"optimal",icon:"🥛",nutri_points:100,description:"Evidence-based osteoporosis protocol (NOF guidelines)"},
      {id:"b",label:"Calcium alone 500 mg/day",type:"deficient",icon:"❌",nutri_points:-25,description:"Insufficient dose; without Vitamin D, calcium absorption is impaired"},
      {id:"c",label:"Calcium 3,000 mg/day for rapid bone rebuilding",type:"toxic",icon:"⚠",nutri_points:-50,description:"Exceeds UL (2,500 mg/day); causes hypercalcemia, kidney stones, milk-alkali syndrome"}
    ],
    correctOption:"a",
    wardlawPerspective:"99% of body calcium is in bone as hydroxyapatite. Serum calcium is tightly regulated by PTH-Vitamin D-calcitonin. PPIs reduce gastric acid → impair calcium carbonate dissolution → use calcium citrate instead. Vitamin D is essential for intestinal calcium absorption via calbindin upregulation. RDA for women >51: 1,200 mg/day.",
    bagel:{id:"dairy_dream",name:"The Dairy Dream Bagel",icon:"🥛",rarity:"common",color:"#FFFACD"}
  },
  {
    id: 14, category: "minerals", nutrient: "Magnesium", difficulty: "junior_dietitian",
    patientCase: "A 55-year-old diabetic on furosemide and metformin has muscle tremors, palpitations, positive Trousseau's sign, and ECG changes (prolonged PR, widened QRS). Serum Mg²⁺: 0.5 mEq/L.",
    avatarState: "magnesium_deficiency",
    symptoms: ["Hypomagnesemia","Cardiac arrhythmia","Neuromuscular hyperexcitability"],
    bodyHotspots:[{xPct:.5,yPct:.45,label:"Cardiac arrhythmia"},{xPct:.35,yPct:.65,label:"Muscle tremors"},{xPct:.65,yPct:.55,label:"Trousseau's sign"}],
    options:[
      {id:"a",label:"IV MgSO₄ 2g over 15 min + oral Mg 300 mg/day maintenance",type:"optimal",icon:"💉",nutri_points:100,description:"IV for acute arrhythmia; oral for maintenance repletion"},
      {id:"b",label:"Oral magnesium 100 mg once daily only",type:"deficient",icon:"💊",nutri_points:-25,description:"Insufficient for acute hypomagnesemia with cardiac involvement"},
      {id:"c",label:"Magnesium 5g IV bolus immediately",type:"toxic",icon:"☠",nutri_points:-50,description:"Hypermagnesia: respiratory depression, loss of reflexes, cardiac arrest"}
    ],
    correctOption:"a",
    wardlawPerspective:"Magnesium is cofactor for 300+ enzymes including ATP-dependent reactions and Na⁺/K⁺-ATPase. Hypomagnesemia causes cardiac instability by impairing Na⁺/K⁺-ATPase. Furosemide blocks Mg²⁺ reabsorption in thick ascending limb. Correct Mg²⁺ first — it restores the PTH-Ca²⁺ axis. Dietary sources: dark chocolate, nuts, seeds, legumes, whole grains.",
    bagel:{id:"dark_choc",name:"The Dark Chocolate Almond Bagel",icon:"🍫",rarity:"rare",color:"#3D1C02"}
  },
  {
    id: 15, category: "minerals", nutrient: "Iodine", difficulty: "intern",
    patientCase: "A 32-year-old pregnant woman (2nd trimester) from an inland region has fatigue, weight gain, cold intolerance, and neck swelling. TSH markedly elevated, free T4 low. Uses non-iodized salt.",
    avatarState: "iodine_deficiency",
    symptoms: ["Goiter","Hypothyroidism","Risk of fetal cretinism"],
    bodyHotspots:[{xPct:.5,yPct:.27,label:"Goiter (thyroid swelling)"},{xPct:.5,yPct:.5,label:"Weight gain / cold intolerance"},{xPct:.5,yPct:.62,label:"Fetal cretinism risk"}],
    options:[
      {id:"a",label:"Levothyroxine + iodized salt + 220 μg/day iodine supplement",type:"optimal",icon:"🧂",nutri_points:100,description:"Treats hypothyroidism + addresses deficiency + meets pregnancy RDA"},
      {id:"b",label:"Switch to iodized salt only",type:"deficient",icon:"🧂",nutri_points:-25,description:"Correct long-term but insufficient to treat established deficiency in pregnancy"},
      {id:"c",label:"Kelp supplements 6,000 μg/day iodine",type:"toxic",icon:"☠",nutri_points:-50,description:"Exceeds UL (1,100 μg/day); excess iodine causes Wolff-Chaikoff effect → fetal hypothyroidism"}
    ],
    correctOption:"a",
    wardlawPerspective:"Iodine is rate-limiting substrate for T3 and T4 synthesis. Iodine deficiency is the world's leading preventable cause of intellectual disability. Pregnancy needs 220 μg/day (lactation 290 μg/day) — fetal brain development depends on maternal T4 in the first trimester. Paradoxically, excess iodine (Wolff-Chaikoff) transiently inhibits thyroid hormone synthesis.",
    bagel:{id:"seaweed_wrap",name:"The Seaweed Wrap Bagel",icon:"🌊",rarity:"uncommon",color:"#006994"}
  },
  {
    id: 16, category: "minerals", nutrient: "Selenium", difficulty: "senior_dietitian",
    patientCase: "A 45-year-old on long-term TPN presents with dilated cardiomyopathy and skeletal muscle weakness. Serum selenium critically low. TPN formula lacked selenium supplementation.",
    avatarState: "selenium_deficiency",
    symptoms: ["Dilated cardiomyopathy","Skeletal myopathy","Oxidative stress"],
    bodyHotspots:[{xPct:.5,yPct:.43,label:"Dilated cardiomyopathy"},{xPct:.35,yPct:.6,label:"Skeletal myopathy"},{xPct:.5,yPct:.3,label:"Oxidative damage"}],
    options:[
      {id:"a",label:"Sodium selenite 60–70 μg/day added to TPN",type:"optimal",icon:"💊",nutri_points:100,description:"Repletes via parenteral route matching RDA (55 μg) with monitoring"},
      {id:"b",label:"Brazil nuts 1–2 per day added to diet",type:"deficient",icon:"🌰",nutri_points:-25,description:"Patient is on TPN — oral intake not applicable; Brazil nut selenium highly variable"},
      {id:"c",label:"Selenium 1,000 μg/day for rapid repletion",type:"toxic",icon:"☠",nutri_points:-50,description:"UL 400 μg/day; selenosis: garlic breath, hair/nail loss, peripheral neuropathy"}
    ],
    correctOption:"a",
    wardlawPerspective:"Selenium is component of glutathione peroxidases and thioredoxin reductase — critical antioxidant enzymes. Keshan disease (endemic dilated cardiomyopathy) demonstrates selenium's cardiac importance. TPN patients are at risk when micronutrients are overlooked. Selenosis: 'garlic breath' (dimethyl selenide exhalation), brittle nails, hair loss. UL 400 μg/day — narrow therapeutic window.",
    bagel:{id:"brazil_nut",name:"The Brazil Nut Bronze Bagel",icon:"🌰",rarity:"epic",color:"#CD7F32"}
  },
  {
    id: 17, category: "water_soluble_vitamins", nutrient: "Riboflavin B2", difficulty: "intern",
    patientCase: "A 24-year-old vegan woman has painful cracks at the mouth corners, a smooth magenta-colored tongue, and light sensitivity. No supplementation, no dairy.",
    avatarState: "riboflavin_deficiency",
    symptoms: ["Angular cheilitis","Magenta glossitis","Photophobia"],
    bodyHotspots:[{xPct:.5,yPct:.29,label:"Angular cheilitis"},{xPct:.5,yPct:.31,label:"Magenta glossitis"},{xPct:.5,yPct:.21,label:"Photophobia"}],
    options:[
      {id:"a",label:"Riboflavin B2 supplement 1.1 mg/day + fortified plant milk",type:"optimal",icon:"🥛",nutri_points:100,description:"Meets RDA for women; fortified plant milk replaces dairy source"},
      {id:"b",label:"Vitamin C supplement — looks like scurvy",type:"deficient",icon:"🍋",nutri_points:-25,description:"Angular cheilitis here is ariboflavinosis, not scurvy — wrong vitamin"},
      {id:"c",label:"B2 injections 50 mg/day",type:"toxic",icon:"⚠",nutri_points:-50,description:"No established UL but unjustified dose; high doses interfere with clinical assays"}
    ],
    correctOption:"a",
    wardlawPerspective:"Riboflavin (B2) forms FAD and FMN coenzymes essential for electron transport, β-oxidation, and activation of B6 and folate. Classic ariboflavinosis: Angular cheilitis, Atrophic glossitis (magenta tongue), Amblyopia. No defined UL; excess excreted renally (bright yellow-green urine). Critical note: IV bags containing B2 must be covered — riboflavin is photodegradable.",
    bagel:{id:"fortified_almond",name:"The Fortified Almond Milk Bagel",icon:"🌰",rarity:"common",color:"#F5DEB3"}
  },
  {
    id: 18, category: "water_soluble_vitamins", nutrient: "Biotin B7", difficulty: "junior_dietitian",
    patientCase: "A 29-year-old fitness influencer consuming 6 raw eggs daily for 3 months presents with diffuse hair thinning, scaly periorificial rash, and depression. Organic acids show elevated 3-hydroxyisovaleric acid.",
    avatarState: "biotin_deficiency",
    symptoms: ["Diffuse alopecia","Periorificial dermatitis","Neurological symptoms"],
    bodyHotspots:[{xPct:.5,yPct:.15,label:"Diffuse alopecia"},{xPct:.5,yPct:.28,label:"Periorificial rash"},{xPct:.5,yPct:.18,label:"Depression / fatigue"}],
    options:[
      {id:"a",label:"Stop raw egg whites + biotin 30 μg/day supplement",type:"optimal",icon:"🥚",nutri_points:100,description:"Remove avidin exposure + replete biotin; symptoms resolve within weeks"},
      {id:"b",label:"Switch to a hair-growth supplement with zinc",type:"deficient",icon:"🧴",nutri_points:-25,description:"Doesn't address avidin-biotin deficiency; root cause remains"},
      {id:"c",label:"Biotin 100 mg/day megadose supplement",type:"toxic",icon:"⚠",nutri_points:-50,description:"Megadoses interfere with thyroid and troponin immunoassays — serious diagnostic harm"}
    ],
    correctOption:"a",
    wardlawPerspective:"Biotin is cofactor for 5 carboxylase enzymes in gluconeogenesis and fatty acid synthesis. Avidin in raw egg whites binds biotin with extraordinary affinity (Kd ~10⁻¹⁵ M) — cooking denatures avidin. Critical note: high-dose biotin supplements (marketed for hair/nails) produce falsely elevated thyroid hormones and falsely normal troponins on immunoassays using biotin-streptavidin chemistry — clinically dangerous.",
    bagel:{id:"hard_boiled",name:"The Hard-Boiled Hero Bagel",icon:"🥚",rarity:"rare",color:"#FFFACD"}
  },
  {
    id: 19, category: "minerals", nutrient: "Potassium", difficulty: "junior_dietitian",
    patientCase: "A 70-year-old woman on digoxin and HCTZ for heart failure has muscle weakness, constipation, U-waves on ECG, and ST depression. Serum K⁺: 2.8 mEq/L.",
    avatarState: "potassium_deficiency",
    symptoms: ["Hypokalemia","ECG: U-waves","Muscle weakness","Digoxin toxicity risk"],
    bodyHotspots:[{xPct:.5,yPct:.43,label:"Cardiac: U-waves / arrhythmia"},{xPct:.35,yPct:.65,label:"Skeletal muscle weakness"},{xPct:.5,yPct:.57,label:"Paralytic ileus (constipation)"}],
    options:[
      {id:"a",label:"IV KCl 40 mEq over 4h (monitored) + oral K⁺ 40 mEq/day + dietary counseling",type:"optimal",icon:"🍌",nutri_points:100,description:"Corrects deficit safely; slow IV prevents fatal arrhythmia"},
      {id:"b",label:"Banana smoothie and fluids only",type:"deficient",icon:"🍌",nutri_points:-25,description:"Symptomatic hypokalemia with digoxin requires clinical correction, not diet alone"},
      {id:"c",label:"IV KCl 40 mEq bolus over 5 minutes",type:"toxic",icon:"☠",nutri_points:-50,description:"NEVER push potassium IV — rapid infusion causes cardiac arrest"}
    ],
    correctOption:"a",
    wardlawPerspective:"Potassium is the primary intracellular cation (98% intracellular); its ratio to extracellular K⁺ determines resting membrane potential. Hypokalemia → hyperpolarization → muscle weakness, ileus, and U-waves. Hypokalemia potentiates digoxin toxicity: low K⁺ increases digoxin binding to Na⁺/K⁺-ATPase → life-threatening arrhythmias. Thiazide diuretics waste K⁺ via distal Na⁺/K⁺ exchange. AI: 4,700 mg/day; sources: bananas, potatoes, avocados, beans.",
    bagel:{id:"potassium_king",name:"The Potassium King Bagel",icon:"🍌",rarity:"rare",color:"#FFE135"}
  },
  {
    id: 20, category: "minerals", nutrient: "Phosphorus — Refeeding Syndrome", difficulty: "senior_dietitian",
    patientCase: "A severely malnourished 50-year-old in ICU is started on aggressive enteral feeding (2,500 kcal/day). 48h later: serum phosphate 0.5 mmol/L, acute respiratory failure, and cardiac arrhythmias develop.",
    avatarState: "phosphorus_deficiency",
    symptoms: ["Refeeding syndrome","Respiratory failure","Cardiac arrhythmia","Hemolytic anemia"],
    bodyHotspots:[{xPct:.5,yPct:.37,label:"Respiratory failure (diaphragm)"},{xPct:.5,yPct:.44,label:"Cardiac arrhythmia"},{xPct:.35,yPct:.65,label:"Peripheral muscle weakness"}],
    options:[
      {id:"a",label:"Slow feed rate + IV phosphate replacement + thiamine",type:"optimal",icon:"🏥",nutri_points:100,description:"NICE refeeding protocol: start slow, correct electrolytes, give thiamine"},
      {id:"b",label:"Push more calories — more energy for recovery",type:"deficient",icon:"❌",nutri_points:-25,description:"Directly worsens refeeding syndrome — further drives phosphate into cells"},
      {id:"c",label:"Stop feeding entirely until electrolytes normalize",type:"toxic",icon:"⚠",nutri_points:-50,description:"Causes further catabolism; gradual reduction + correction is evidence-based"}
    ],
    correctOption:"a",
    wardlawPerspective:"Refeeding Syndrome: carbohydrate reintroduction after starvation triggers insulin surges → intracellular shift of phosphate, K⁺, and Mg²⁺. Severe hypophosphatemia (<0.5 mmol/L) impairs ATP production → respiratory muscle failure (vent failure), impairs 2,3-DPG → hemolytic anemia, and causes cardiac dysfunction. NICE: start at 10 kcal/kg/day, increase slowly over 4–7 days, aggressively replete electrolytes + thiamine. A senior-level diagnosis every dietitian must master.",
    bagel:{id:"refeeding_legendary",name:"The Refeeding Renaissance Bagel",icon:"🏆",rarity:"legendary",color:"#FFD700"}
  }
];

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
