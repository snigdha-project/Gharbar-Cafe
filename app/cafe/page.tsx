"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faBowlFood,
  faBowlRice,
  faLeaf,
  faDrumstickBite,
  faPizzaSlice,
  faIceCream,
  faMartiniGlassCitrus,
  faFire,
  faSearch,
  faCircle,
  faClock,
  faStar,
  faXmark,
  faCarrot,
  faBreadSlice,
  faBacon,
  faChevronLeft,
  faChevronRight,
  faMugHot,
  faEgg,
  faCheese,
  faBlender,
  faJar,
  faPepperHot,
  faAppleWhole,
  faSeedling,
  faUtensils,
  faCookieBite,
  faLemon,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Diet = "veg" | "nonveg";

type MenuItem = {
  name: string;
  price: string;
  diet: Diet;
  tag?: string;
};

type SubGroup = {
  title?: string;
  items: MenuItem[];
};

type Category = {
  id: string;
  label: string;
  icon: IconDefinition;
  blurb: string;
  groups: SubGroup[];
  prepTime?: string;
  image?: string;
};

const v = (name: string, price: string, tag?: string): MenuItem => ({
  name,
  price,
  diet: "veg",
  tag,
});
const nv = (name: string, price: string, tag?: string): MenuItem => ({
  name,
  price,
  diet: "nonveg",
  tag,
});

const menu: Category[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    icon: faMugSaucer,
    blurb: "Open at 8 AM — paranthas, eggs and a perfect cup of chai.",
    prepTime: "20–25 minutes",
    image: "/gallery/g3.png",
    groups: [
      {
        title: "Paranthas (with curd & pickle)",
        items: [
          v("Aloo Parantha", "120"),
          v("Gobhi Parantha", "130"),
          v("Onion Parantha", "130"),
          v("Mix Parantha", "140"),
          v("Paneer Parantha", "150", "Popular"),
          nv("Egg Parantha (with Schezwan sauce)", "140"),
        ],
      },
      {
        title: "Sandwiches",
        items: [
          v("Veg Grilled Sandwich", "120"),
          v("Cheese Tomato Sandwich", "150"),
          v("Veg Cheese Grilled Sandwich", "140"),
          nv("Chicken Sandwich", "180"),
          nv("Chicken Cheese Sandwich", "200", "Popular"),
          nv("Egg Sandwich", "135"),
          nv("Egg Cheese Sandwich", "155"),
        ],
      },
      {
        title: "Eggs",
        items: [
          nv("Boiled Egg (2 eggs)", "60"),
          nv("Plain Omelette", "65"),
          nv("Masala Omelette", "75"),
          nv("Cheese Omelette", "95"),
          nv("Fried Egg (Half / Full)", "85"),
          nv("Scrambled Egg", "105"),
        ],
      },
      {
        title: "Tea & Coffee",
        items: [
          v("Tea", "40"),
          v("Masala Tea", "50"),
          v("Coffee", "110"),
        ],
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks & Quick Bites",
    icon: faBowlFood,
    blurb: "Crispy, hot and built for the long evenings.",
    image: "/gallery/g7.png",
    groups: [
      {
        title: "Quick Bites",
        items: [
          v("Peanut Masala", "180"),
          v("Masala Papad", "160"),
          v("Roasted Papad", "90"),
          v("French Fries", "160"),
          v("Peri Peri Fries", "190", "Popular"),
          v("Crispy Corn", "260"),
          v("Corn Chaat", "240"),
          v("Aloo Chana Chaat", "200"),
          v("Crispy Vegetables", "280"),
          v("Vegetable Salt & Pepper", "280"),
          v("Sauté Vegetable", "290"),
          v("Vegetable Cutlet", "290"),
          v("Vegetable Pakora", "270"),
          v("Paneer Pakora", "290"),
          v("Paneer Nuggets", "360"),
          v("Paneer Cheese Bowl", "380"),
          v("Paneer Cheese Fingers", "400", "Chef's Pick"),
          v("Crispy Stuffed Mushroom", "345"),
        ],
      },
      {
        title: "Maggi",
        items: [
          v("Plain Maggi", "70"),
          v("Masala Maggi", "80"),
          v("Vegetable Maggi", "90"),
          v("Corn Mushroom Maggi", "120"),
          nv("Egg Maggi", "125"),
          v("Cheese Maggi", "140"),
          nv("Chicken Maggi", "140"),
        ],
      },
    ],
  },
  {
    id: "soups",
    label: "Soups",
    icon: faFire,
    blurb: "Hand-stirred broths to warm up the Dharamshala chill.",
    image: "/gallery/g11.png",
    groups: [
      {
        title: "Vegetarian",
        items: [
          v("Veg Hot & Sour Soup", "160"),
          v("Veg Manchow Soup", "180"),
          v("Tomato Soup", "190"),
          v("Vegetable Sweet Corn Soup", "180"),
          v("Veg Lemon Coriander Soup", "160"),
          v("Cream of Mushroom Soup", "200"),
          v("Vegetable Thupka", "180"),
        ],
      },
      {
        title: "Non-Vegetarian",
        items: [
          nv("Chicken Hot & Sour Soup", "220"),
          nv("Chicken Manchow Soup", "230"),
          nv("Chicken Sweet Corn Soup", "230"),
          nv("Cream of Chicken Soup", "240"),
          nv("Chicken Lemon Coriander Soup", "220"),
          nv("Chicken Thupka", "230"),
        ],
      },
    ],
  },
  {
    id: "salad-raita",
    label: "Salad & Raita",
    icon: faCarrot,
    blurb: "Fresh, crunchy, cooling — straight from the kitchen garden.",
    image: "/gallery/g16.png",
    groups: [
      {
        title: "Salad",
        items: [
          v("Green Salad", "150"),
          v("Russian Salad", "220"),
          v("Vegetable Tossed Salad", "210"),
          v("Caesar Salad", "240"),
          v("Kachumber Salad", "190"),
          v("Crispy Noodle Salad", "200"),
          v("Fruit Salad", "300"),
        ],
      },
      {
        title: "Raita",
        items: [
          v("Plain Curd", "70"),
          v("Boondi Raita", "120"),
          v("Mix Raita", "130"),
          v("Pineapple Raita", "150"),
        ],
      },
    ],
  },
  {
    id: "indian-veg",
    label: "Indian — Veg",
    icon: faLeaf,
    blurb: "Slow-cooked classics from across the Indian heartland.",
    image: "/gallery/g9.png",
    groups: [
      {
        title: "Main Course",
        items: [
          v("Dal Tadka", "240"),
          v("Dal Makhani", "290", "Signature"),
          v("Mix Vegetable", "300"),
          v("Kadhai Paneer", "340"),
          v("Paneer Butter Masala", "350", "Popular"),
          v("Paneer Bhurji", "350"),
          v("Paneer Do Pyaza", "340"),
          v("Paneer Lababdar", "350"),
          v("Paneer Tikka Butter Masala", "370"),
          v("Paneer Khurchan", "360"),
          v("Paneer Makhani", "350"),
          v("Shahi Paneer", "360"),
          v("Paneer Pasanda", "380"),
          v("Paneer Matar Methi Malai", "350"),
          v("Kadhai Mushroom", "330"),
          v("Matar Mushroom", "320"),
          v("Mushroom Do Pyaza", "330"),
        ],
      },
      {
        title: "Special Menu",
        items: [
          v("Kadhai Vegetable", "320"),
          v("Kashmiri Dum Aloo", "290"),
          v("Kadhi Pakora", "280"),
          v("Zeera Aloo", "260"),
          v("Methi Matar Malai", "330"),
          v("Malai Kofta", "360"),
          v("Navrattan Korma", "380"),
          v("Vegetable Jalfrezi", "320"),
          v("Vegetable Kofta Curry", "330"),
          v("Masala Champ", "290"),
          v("Kashmiri Rajmah", "270"),
          v("Rajmah Masala", "290"),
          v("Chana Masala", "290"),
        ],
      },
    ],
  },
  {
    id: "indian-nonveg",
    label: "Indian — Non-Veg",
    icon: faDrumstickBite,
    blurb: "Robust gravies, rich masalas — proper full-flavour cooking.",
    image: "/gallery/g14.png",
    groups: [
      {
        title: "Main Course",
        items: [
          nv("Chicken Curry", "380"),
          nv("Chicken Do Pyaza", "400"),
          nv("Kadhai Chicken", "390"),
          nv("Rahra Chicken", "400"),
          nv("Chicken Tikka Masala", "440"),
          nv("Butter Chicken", "460", "Signature"),
          nv("Chicken Kali Mirch", "450"),
          nv("Chicken Keema Masala", "440"),
          nv("Chicken Spinach Curry", "430"),
          nv("Muglai Chicken", "480"),
          nv("Egg Curry", "220"),
          nv("Egg Bhurji", "120"),
        ],
      },
      {
        title: "Special Menu",
        items: [
          nv("Mutton Roghan Josh", "520", "Chef's Pick"),
          nv("Kadhai Mutton", "530"),
          nv("Mutton Masala", "540"),
          nv("Rahra Mutton", "540"),
          nv("Khatta Mutton", "560"),
        ],
      },
    ],
  },
  {
    id: "rice-breads",
    label: "Rice & Breads",
    icon: faBreadSlice,
    blurb: "Tandoor-fresh breads and fragrant rice plates.",
    image: "/gallery/g8.png",
    groups: [
      {
        title: "Rice & Biryani",
        items: [
          v("Plain Rice", "180"),
          v("Zeera Rice", "220"),
          v("Vegetable Pulao", "260"),
          v("Peas Pulao", "240"),
          v("Navrattan Pulao", "280"),
          v("Vegetable Biryani (with raita)", "360"),
          nv("Egg Biryani (with raita)", "390"),
          nv("Chicken Biryani (with raita)", "460", "Popular"),
          nv("Mutton Biryani (with raita)", "550"),
        ],
      },
      {
        title: "Breads",
        items: [
          v("Plain Roti / Butter (tawa)", "15 / 20"),
          v("Tandoori Roti / Butter", "20 / 25"),
          v("Missi Roti", "65"),
          v("Lachha Parantha", "70"),
          v("Plain Naan", "75"),
          v("Stuffed Parantha", "80"),
          v("Butter Naan", "90"),
          v("Stuffed Naan", "100"),
        ],
      },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    icon: faBowlRice,
    blurb: "Indo-Chinese done loud — wok-tossed, smoky, generous.",
    image: "/gallery/g18.png",
    groups: [
      {
        title: "Special Menu (Veg)",
        items: [
          v("Paneer Chilly", "380"),
          v("Chilly Mushroom", "350"),
          v("Baby Corn Chilly", "360"),
          v("Veg Manchurian", "290"),
          v("Gobhi Manchurian", "270"),
          v("Honey Chilly Potato", "280", "Popular"),
          v("Honey Chilly Cauliflower", "280"),
          v("Veg Momo (Steam / Fry)", "160 / 180"),
          v("Chilly Momos", "220"),
        ],
      },
      {
        title: "Non-Veg",
        items: [
          nv("Chicken Chilly", "390"),
          nv("Chicken Chilly (Boneless)", "410"),
          nv("Chicken Manchurian", "380"),
          nv("Chicken Salt & Pepper", "360"),
          nv("Honey Chilly Chicken", "370"),
          nv("Lemon Chicken", "390"),
          nv("Peri Peri Chicken", "410"),
          nv("Chicken Momos (Steam / Fry)", "210 / 230"),
          nv("Chicken Momos Chilly", "250"),
          nv("Chicken Chopsy", "340"),
          nv("Chicken 65", "395"),
          nv("Chicken Pakora", "375"),
          nv("Chicken Fry", "365"),
          nv("Crispy Chicken", "390"),
          nv("Chicken Nuggets", "400"),
        ],
      },
      {
        title: "Noodles",
        items: [
          v("Veg Noodle", "180"),
          v("Veg Hakka Noodle", "200"),
          v("Veg Schezwan Noodle", "190"),
          v("Chilly Garlic Noodle", "180"),
          v("Vegetable Chopsey", "290"),
          nv("Egg Noodles", "185"),
          nv("Chicken Noodles", "210"),
          nv("Chicken Schezwan Noodles", "220"),
        ],
      },
      {
        title: "Main Course & Fried Rice",
        items: [
          v("Paneer Chilly (Gravy)", "360"),
          v("Chilly Mushroom (Gravy)", "340"),
          v("Vegetable in Sweet & Sour Sauce", "310"),
          v("Vegetable in Hot Garlic Sauce", "320"),
          nv("Chilly Chicken (Gravy)", "375"),
          nv("Chicken Manchurian (Gravy)", "360"),
          nv("Chicken in Sweet & Sour Sauce", "340"),
          nv("Chicken in Hot Garlic Sauce", "350"),
          v("Veg Fried Rice", "240"),
          v("Veg Schezwan Fried Rice", "250"),
          v("Chilly Garlic Fried Rice (Veg)", "250"),
          nv("Egg Fried Rice", "270"),
          nv("Chicken Fried Rice", "300"),
          nv("Chicken Schezwan Fried Rice", "310"),
          nv("Chilly Garlic Fried Rice (Non-Veg)", "320"),
        ],
      },
    ],
  },
  {
    id: "continental",
    label: "Continental & Italian",
    icon: faPizzaSlice,
    blurb: "Wood-fired pizzas and saucy pastas, Italian style.",
    image: "/gallery/g20.png",
    groups: [
      {
        title: "Pizza",
        items: [
          v("Margherita Pizza", "290"),
          v("Farm House Veg Pizza", "349"),
          v("Onion Mushroom Pizza", "330"),
          v("Paneer Barbeque Pizza", "370"),
          v("Kadhai Paneer Pizza", "360"),
          nv("Chicken Pizza", "380"),
          nv("Chicken Barbeque Pizza", "410", "Popular"),
          nv("Kadhai Chicken Pizza", "360"),
        ],
      },
      {
        title: "Pasta & Lasagna",
        items: [
          v("Penne Alfredo", "320"),
          v("Penne Arrabbiata", "320"),
          v("Spaghetti in White Sauce", "390"),
          v("Spaghetti in Red Sauce", "380"),
          v("Spaghetti Aglio Olio", "400"),
          v("Lasagna — Veg (1 hr time)", "450"),
          nv("Lasagna — Non-Veg (1 hr time)", "500", "Slow-cooked"),
        ],
      },
    ],
  },
  {
    id: "tandoori",
    label: "Tandoori",
    icon: faFire,
    blurb: "Char-marked, smoky, straight from the clay oven.",
    image: "/gallery/g22.png",
    groups: [
      {
        title: "Veg",
        items: [
          v("Paneer Tikka", "400"),
          v("Paneer Haryali Tikka (Seasonal)", "440"),
          v("Paneer Mint Tikka", "440"),
          v("Paneer Achari Tikka", "420"),
          v("Paneer Malai Tikka", "450"),
          v("Champ Tikka", "350"),
          v("Malai Champ Tikka", "380"),
          v("Mushroom Tikka", "360"),
          v("Vegetable Seekh Kebab", "350"),
          v("Hara Bhara Kebab", "360"),
        ],
      },
      {
        title: "Non-Veg",
        items: [
          nv("Chicken Tikka", "450", "Popular"),
          nv("Chicken Achari Tikka", "460"),
          nv("Chicken Haryali Tikka (Seasonal)", "470"),
          nv("Chicken Mint Tikka", "470"),
          nv("Lahusani Chicken Tikka", "470"),
          nv("Honey Chicken Tikka", "460"),
          nv("Chicken Malai Tikka", "480"),
          nv("Chicken Alishan Tikka", "500"),
          nv("Chicken Seekh Kebab", "470"),
          nv("Gilafi Seekh Kebab", "530", "Chef's Pick"),
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: faIceCream,
    blurb: "Warm halwa, cool ice cream — pick your finish.",
    image: "/gallery/g24.png",
    groups: [
      {
        items: [
          v("Gulab Jamun", "80"),
          v("Ice Cream", "70"),
          v("Rice Pudding (Kheer)", "120"),
          v("Gajar Ka Halwa", "80"),
          v("Moong Dal Halwa", "220", "Signature"),
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: faMartiniGlassCitrus,
    blurb: "Mocktails, hot brews and shakes — all the colours.",
    image: "/gallery/g25.png",
    groups: [
      {
        title: "Beverages",
        items: [
          v("Milk Tea", "50"),
          v("Lemon Tea", "70"),
          v("Kangra Tea", "90"),
          v("Ginger Lemon Tea", "110"),
          v("Hot Coffee", "110"),
          v("Cold Coffee", "160"),
          v("Hot Chocolate", "180"),
        ],
      },
      {
        title: "Mocktails",
        items: [
          v("Fresh Lime Soda", "100"),
          v("Lemonade", "200"),
          v("Irish Strawberry Mojito", "280"),
          v("Honey Lime Soda", "280"),
          v("Green Apple Mojito", "300", "Popular"),
          v("Winter Wonderland Mojito", "300"),
        ],
      },
      {
        title: "Shakes",
        items: [
          v("Oreo Banana Shake", "250"),
          v("Choco Cookies Shake", "250"),
          v("Brownie Shake", "280"),
          v("Red Velvet Shake", "300"),
          v("Biscoff Shake", "300", "Chef's Pick"),
        ],
      },
      {
        title: "Cup Soups",
        items: [
          v("Tomato Soup", "140"),
          v("Sweet Corn Soup", "160"),
          v("Veg Macho Soup", "200"),
          nv("Chicken Soup", "220"),
        ],
      },
    ],
  },
];

type DietFilter = "all" | "veg" | "nonveg";

const GOLD = "#e6a34d";
const DARK = "#1a1a1a";
const CREAM = "#fffaf5";

function VegDot({ diet }: { diet: Diet }) {
  const isVeg = diet === "veg";
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 border shrink-0 ${
        isVeg ? "border-[#3aa856]" : "border-[#c1272d]"
      }`}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <FontAwesomeIcon
        icon={faCircle}
        className={`text-[7px] ${isVeg ? "text-[#3aa856]" : "text-[#c1272d]"}`}
      />
    </span>
  );
}

// Pick a contextual icon for an item based on its name.
// Order matters — more specific keywords first.
function getItemIcon(name: string): IconDefinition {
  const n = name.toLowerCase();

  // Beverages first (contains words that overlap with food)
  if (n.includes("shake")) return faBlender;
  if (
    n.includes("mojito") ||
    n.includes("lemonade") ||
    n.includes("lime soda") ||
    n.includes("lime")
  )
    return faMartiniGlassCitrus;
  if (n.includes("hot chocolate")) return faMugHot;
  if (n.includes("coffee")) return faMugHot;
  if (n.includes("tea") || n.includes("chai")) return faMugSaucer;

  // Tandoori / grilled
  if (
    n.includes("tikka") ||
    n.includes("kebab") ||
    n.includes("seekh") ||
    n.includes("tandoori") ||
    n.includes("champ")
  )
    return faFire;

  // Pizza
  if (n.includes("pizza")) return faPizzaSlice;

  // Pasta / noodles / maggi
  if (
    n.includes("pasta") ||
    n.includes("spaghetti") ||
    n.includes("penne") ||
    n.includes("lasagna") ||
    n.includes("noodle") ||
    n.includes("hakka") ||
    n.includes("chopsey") ||
    n.includes("chopsy") ||
    n.includes("maggi")
  )
    return faBowlFood;

  // Rice / biryani / pulao
  if (
    n.includes("biryani") ||
    n.includes("rice") ||
    n.includes("pulao") ||
    n.includes("pulav")
  )
    return faBowlRice;

  // Soup
  if (n.includes("soup") || n.includes("thupka")) return faMugHot;

  // Bread
  if (
    n.includes("naan") ||
    n.includes("roti") ||
    n.includes("parantha") ||
    n.includes("paratha")
  )
    return faBreadSlice;
  if (n.includes("sandwich")) return faBreadSlice;

  // Eggs
  if (
    n.includes("omelette") ||
    n.includes("scrambled egg") ||
    n.includes("fried egg") ||
    n.includes("boiled egg") ||
    n.includes("egg bhurji") ||
    /^egg /.test(n) ||
    n === "egg curry"
  )
    return faEgg;

  // Mutton & chicken
  if (n.includes("mutton")) return faDrumstickBite;
  if (n.includes("chicken")) return faDrumstickBite;

  // Paneer / cheese
  if (n.includes("paneer") || n.includes("cheese")) return faCheese;

  // Salad
  if (n.includes("salad")) return faCarrot;

  // Raita / curd
  if (n.includes("raita") || n.includes("curd")) return faJar;

  // Desserts
  if (n.includes("ice cream") || n.includes("ice-cream")) return faIceCream;
  if (
    n.includes("halwa") ||
    n.includes("kheer") ||
    n.includes("pudding") ||
    n.includes("gulab jamun")
  )
    return faCookieBite;

  // Momos / dumplings
  if (n.includes("momo") || n.includes("dumpling")) return faBowlFood;

  // Spicy / chilly / manchurian
  if (
    n.includes("manchurian") ||
    n.includes("chilly") ||
    n.includes("chilli") ||
    n.includes("schezwan") ||
    n.includes("peri")
  )
    return faPepperHot;

  // Mushroom
  if (n.includes("mushroom")) return faSeedling;

  // Fruit
  if (n.includes("fruit") || n.includes("apple")) return faAppleWhole;

  // Lemon-y
  if (n.includes("lemon")) return faLemon;

  // Snacks: pakora / nuggets / fries / crispy / cutlet / fingers / papad / corn / chaat
  if (
    n.includes("pakora") ||
    n.includes("nugget") ||
    n.includes("fries") ||
    n.includes("crispy") ||
    n.includes("cutlet") ||
    n.includes("finger") ||
    n.includes("papad") ||
    n.includes("chaat") ||
    n.includes("corn") ||
    n.includes("peanut")
  )
    return faBowlFood;

  // Indian curries / dal / chana / rajmah / kofta / aloo / vegetable
  if (
    n.includes("dal") ||
    n.includes("makhani") ||
    n.includes("rajmah") ||
    n.includes("chana") ||
    n.includes("kofta") ||
    n.includes("aloo") ||
    n.includes("vegetable") ||
    n.includes("matar") ||
    n.includes("methi") ||
    n.includes("kadhi") ||
    n.includes("kadhai") ||
    n.includes("korma") ||
    n.includes("jalfrezi") ||
    n.includes("masala")
  )
    return faBowlFood;

  return faUtensils;
}

function MenuItemRow({ item, idx }: { item: MenuItem; idx: number }) {
  const icon = getItemIcon(item.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (idx % 8) * 0.04 }}
      className="group rounded-xl px-3 py-2.5 -mx-3 hover:bg-white/70 hover:shadow-[0_2px_18px_-12px_rgba(168,116,32,0.4)] transition-all"
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* veg / non-veg indicator */}
        <VegDot diet={item.diet} />

        {/* contextual dish icon */}
        <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#e6a34d]/10 border border-[#e6a34d]/30 flex items-center justify-center shrink-0 group-hover:bg-[#e6a34d]/20 group-hover:border-[#e6a34d]/60 transition-colors">
          <FontAwesomeIcon
            icon={icon}
            className="text-[#a87420] text-sm md:text-base"
          />
        </span>

        {/* item name + tag */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[15px] md:text-base font-medium leading-snug text-[#1a1a1a] group-hover:text-[#a87420] transition-colors">
            {item.name}
          </h4>
          {item.tag && (
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] uppercase tracking-[0.18em] font-bold text-[#a87420]">
              <FontAwesomeIcon icon={faStar} className="text-[8px]" />
              {item.tag}
            </span>
          )}
        </div>

        {/* price */}
        <span className="font-serif text-[15px] md:text-base font-semibold text-[#1a1a1a] tabular-nums whitespace-nowrap shrink-0">
          ₹{item.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function CafePage() {
  const [active, setActive] = useState<string>(menu[0].id);
  const [diet, setDiet] = useState<DietFilter>("all");
  const [query, setQuery] = useState("");
  const [navStuck, setNavStuck] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  useEffect(() => {
    const onScroll = () => setNavStuck(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track tab strip scrollability + translate vertical wheel into horizontal scroll
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(max > 4 && el.scrollLeft < max - 4);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (
        (e.deltaY > 0 && el.scrollLeft >= max) ||
        (e.deltaY < 0 && el.scrollLeft <= 0)
      ) {
        return;
      }
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", update);

    // ResizeObserver catches layout shifts (font loading, dynamic content)
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);

    // Re-measure once fonts settle
    type DocWithFonts = Document & {
      fonts?: { ready?: Promise<unknown> };
    };
    const docFonts = (document as DocWithFonts).fonts;
    docFonts?.ready?.then(update).catch(() => {});

    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  const scrollTabs = (dir: -1 | 1) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.6), behavior: "smooth" });
  };

  const activeCategory = useMemo(
    () => menu.find((c) => c.id === active) ?? menu[0],
    [active]
  );

  const isSearching = query.trim().length > 1;

  const visibleGroups: SubGroup[] = useMemo(() => {
    const filterItems = (items: MenuItem[]) =>
      items.filter((it) => {
        if (diet !== "all" && it.diet !== diet) return false;
        if (isSearching) {
          return it.name.toLowerCase().includes(query.trim().toLowerCase());
        }
        return true;
      });

    if (isSearching) {
      // Search across the whole menu, flatten + group by category label
      const out: SubGroup[] = [];
      menu.forEach((cat) => {
        const matched = cat.groups.flatMap((g) => filterItems(g.items));
        if (matched.length) {
          out.push({ title: cat.label, items: matched });
        }
      });
      return out;
    }

    return activeCategory.groups
      .map((g) => ({ ...g, items: filterItems(g.items) }))
      .filter((g) => g.items.length);
  }, [activeCategory, diet, isSearching, query]);

  const totalCount = useMemo(
    () => visibleGroups.reduce((sum, g) => sum + g.items.length, 0),
    [visibleGroups]
  );

  return (
    <main className="bg-[#fffaf5] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[92vh] min-h-[620px] flex items-center justify-center bg-[#0e0e0e] overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="/gallery/g10.png"
            alt="Ghar Bar Cafe ambience"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0e0e0e]" />
        </motion.div>

        {/* gold ornamental frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 mx-6 max-w-3xl text-center px-6 md:px-14 py-16 border border-[#e6a34d]/40"
        >
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#e6a34d]/20 pointer-events-none" />

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="text-[#e6a34d] uppercase text-[10px] md:text-xs font-bold mb-5"
          >
            Established 2022 · Dharamshala
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-white font-serif text-5xl md:text-7xl leading-[1.05]"
          >
            Ghar <span className="italic text-[#e6a34d]">Bar</span> Cafe
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="origin-center mx-auto mt-7 h-[1px] w-32 bg-[#e6a34d]"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/70 mt-7 max-w-xl mx-auto leading-relaxed text-sm md:text-base"
          >
            A full-day kitchen — paranthas at sunrise, tandoori smoke at dusk,
            and shakes long into the night.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-9 inline-flex items-center gap-3 text-white/80 text-xs md:text-sm uppercase tracking-[0.3em]"
          >
            <FontAwesomeIcon icon={faClock} className="text-[#e6a34d]" />
            Open 8:00 AM — 10:45 PM
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            y: { delay: 1.2, duration: 1.8, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] uppercase tracking-[0.4em] z-10"
        >
          Scroll the menu
        </motion.div>
      </section>

      {/* STICKY CONTROL BAR */}
      <section
        className={`sticky top-0 z-40 transition-all duration-500 ${
          navStuck
            ? "bg-[#fffaf5]/95 backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(0,0,0,0.15)]"
            : "bg-[#fffaf5]"
        }`}
      >
        {/* search + filter */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-5 pb-3 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any dish — paneer tikka, mojito, biryani…"
              className="w-full bg-white border border-gray-200 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/20 rounded-full pl-11 pr-10 py-3 text-sm outline-none transition-all"
              aria-label="Search menu"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </button>
            )}
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 self-start md:self-auto">
            {(
              [
                { id: "all", label: "All", icon: faBowlFood },
                { id: "veg", label: "Veg", icon: faLeaf },
                { id: "nonveg", label: "Non-Veg", icon: faBacon },
              ] as { id: DietFilter; label: string; icon: IconDefinition }[]
            ).map((f) => {
              const on = diet === f.id;
              return (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => setDiet(f.id)}
                  className={`relative px-4 py-2 text-xs uppercase tracking-[0.18em] font-bold rounded-full transition-colors flex items-center gap-2 ${
                    on ? "text-white" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="diet-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#1a1a1a]"
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <FontAwesomeIcon icon={f.icon} className="text-[10px]" />
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* category tabs */}
        <div className="border-t border-[#e6a34d]/15">
          <div className="relative max-w-7xl mx-auto">
            {/* left chevron — always rendered on desktop */}
            <button
              type="button"
              onClick={() => scrollTabs(-1)}
              aria-label="Scroll categories left"
              className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-[#e6a34d] text-white shadow-lg ring-1 ring-[#e6a34d]/40 hover:scale-110 hover:bg-[#1a1a1a] cursor-pointer transition-all ${
                canScrollLeft ? "opacity-100" : "opacity-40"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
            </button>

            {/* fade edges (desktop only, when scrollable) */}
            <div
              aria-hidden
              className={`hidden md:block pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#fffaf5] to-transparent transition-opacity ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              aria-hidden
              className={`hidden md:block pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fffaf5] to-transparent transition-opacity ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              ref={tabsRef}
              className="px-4 md:px-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              <div className="flex gap-1 md:gap-2 min-w-max py-3">
                {menu.map((cat) => {
                  const on = active === cat.id && !isSearching;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setActive(cat.id);
                        setQuery("");
                      }}
                      className={`relative px-4 md:px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors duration-300 whitespace-nowrap ${
                        on
                          ? "text-[#1a1a1a]"
                          : "text-gray-500 hover:text-[#1a1a1a]"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="cat-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-full bg-[#e6a34d]/15 border border-[#e6a34d]/40"
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={cat.icon}
                          className={`text-sm ${on ? "text-[#a87420]" : ""}`}
                        />
                        <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold">
                          {cat.label}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* right chevron — always rendered on desktop */}
            <button
              type="button"
              onClick={() => scrollTabs(1)}
              aria-label="Scroll categories right"
              className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-[#e6a34d] text-white shadow-lg ring-1 ring-[#e6a34d]/40 hover:scale-110 hover:bg-[#1a1a1a] cursor-pointer transition-all ${
                canScrollRight ? "opacity-100" : "opacity-40"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY HERO STRIP — hidden in search mode */}
      <AnimatePresence mode="wait">
        {!isSearching && (
          <motion.section
            key={`strip-${activeCategory.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[#1a1a1a] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.18]">
              {activeCategory.image && (
                <Image
                  src={activeCategory.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#e6a34d]/10 border border-[#e6a34d]/40 flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={activeCategory.icon}
                  className="text-[#e6a34d] text-2xl md:text-3xl"
                />
              </motion.div>

              <div>
                <p className="text-[#e6a34d] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-2">
                  Menu · {activeCategory.label}
                </p>
                <h2 className="text-white font-serif text-3xl md:text-5xl leading-tight">
                  {activeCategory.label}
                </h2>
                <p className="text-white/65 mt-3 max-w-2xl text-sm md:text-base leading-relaxed">
                  {activeCategory.blurb}
                </p>
                {activeCategory.prepTime && (
                  <div className="mt-5 inline-flex items-center gap-2 text-[#e6a34d] text-[10px] md:text-xs uppercase tracking-[0.3em]">
                    <FontAwesomeIcon icon={faClock} />
                    Prep time: {activeCategory.prepTime}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* MENU CONTENT */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 min-h-[60vh]">
        {isSearching && (
          <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">
              Search results for{" "}
              <span className="italic text-[#a87420]">“{query}”</span>
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {totalCount} {totalCount === 1 ? "dish" : "dishes"}
            </span>
          </div>
        )}

        {totalCount === 0 ? (
          <div className="text-center py-24">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-300 text-4xl mb-4"
            />
            <p className="text-gray-500">
              No dishes match your filters. Try clearing the search or
              switching the diet filter.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${diet}-${isSearching ? "q" : "n"}-${query}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="space-y-14 md:space-y-20"
            >
              {visibleGroups.map((group, gi) => (
                <div key={(group.title ?? "g") + gi}>
                  {group.title && (
                    <div className="flex items-center gap-4 mb-8 md:mb-10">
                      <span className="hidden md:block w-12 h-[1px] bg-[#e6a34d]" />
                      <h3 className="font-serif text-xl md:text-2xl text-[#1a1a1a]">
                        {group.title}
                      </h3>
                      <span className="flex-1 h-[1px] bg-gradient-to-r from-[#e6a34d]/40 to-transparent" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                        {group.items.length} items
                      </span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6">
                    {group.items.map((item, idx) => (
                      <MenuItemRow
                        key={item.name + idx}
                        item={item}
                        idx={idx}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* SIGNATURE / CHEF SECTION */}
      <section className="relative bg-[#0e0e0e] text-white overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#e6a34d]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#e6a34d]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] border border-[#e6a34d]/30 p-3">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/AboutUsSec-small.png"
                  alt="Chef's signature dish at Ghar Bar Cafe"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hidden md:block absolute -bottom-6 -right-6 w-40 h-40 border border-[#e6a34d]/40 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-[#e6a34d] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">
              Chef's Selection
            </p>
            <h3 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
              Slow food, <br />
              <span className="italic text-[#e6a34d]">handed down</span>.
            </h3>
            <p className="text-white/65 leading-relaxed mb-10 text-sm md:text-base">
              From the slow-simmered Dal Makhani and the smoky Butter Chicken to
              wood-fired pizzas and freshly churned shakes — each dish at Ghar
              Bar Cafe is built around locally sourced ingredients, family
              recipes, and the unhurried pace of the hills.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: faLeaf,
                  title: "Pure, local sourcing",
                  body: "Hand-picked produce from Kangra valley farms.",
                },
                {
                  icon: faFire,
                  title: "Tandoor & wood-fire",
                  body: "Live clay oven and stone-fired pizza station.",
                },
                {
                  icon: faStar,
                  title: "All-day kitchen",
                  body: "Breakfast through late dinner, 8 AM — 10:45 PM.",
                },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 w-9 h-9 rounded-full bg-[#e6a34d]/10 border border-[#e6a34d]/40 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon
                      icon={feat.icon}
                      className="text-[#e6a34d] text-sm"
                    />
                  </span>
                  <div>
                    <h5 className="text-sm uppercase tracking-[0.18em] font-bold text-white">
                      {feat.title}
                    </h5>
                    <p className="text-white/55 text-sm mt-0.5">{feat.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="bg-[#fffaf5] border-t border-[#e6a34d]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <p className="text-[#a87420] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
              Hours
            </p>
            <p className="font-serif text-xl text-[#1a1a1a]">
              8:00 AM — 10:45 PM
            </p>
            <p className="text-gray-500 text-sm mt-1">Open every day</p>
          </div>
          <div>
            <p className="text-[#a87420] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
              Prep Time
            </p>
            <p className="font-serif text-xl text-[#1a1a1a]">20 — 25 minutes</p>
            <p className="text-gray-500 text-sm mt-1">
              Slow-cooked dishes (Lasagna) take ~1 hour
            </p>
          </div>
          <div>
            <p className="text-[#a87420] uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
              Good to know
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              All prices are in INR (₹) and inclusive of applicable taxes
              unless stated otherwise. Seasonal items subject to availability.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
