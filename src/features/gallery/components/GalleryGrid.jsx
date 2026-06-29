import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Share2, X, ChevronLeft, ChevronRight, Bookmark, Maximize2, MapPin, Instagram } from "lucide-react";
import { cn } from "../../../lib/cn";

// Expanded gallery data with beautiful custom generated image assets
const fallbackGalleryItems = [
  {
    id: 1,
    label: "All Day Brunch",
    category: "menu",
    tone: "saffron",
    size: "large",
    likes: 365,
    commentsCount: 22,
    image: "/images/all-day-brunch.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez all day brunch dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 2,
    label: "Americano",
    category: "lieu",
    tone: "cream",
    size: "portrait",
    likes: 452,
    commentsCount: 20,
    image: "/images/americano.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez americano dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 3,
    label: "Avocado Croissant",
    category: "ambiance",
    tone: "pistachio",
    size: "square",
    likes: 356,
    commentsCount: 50,
    image: "/images/avocado-croissant.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez avocado croissant dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 4,
    label: "Avocado Toast",
    category: "menu",
    tone: "coffee",
    size: "large",
    likes: 184,
    commentsCount: 34,
    image: "/images/avocado-toast.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez avocado toast dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 5,
    label: "Baklava Pistachio Berries",
    category: "lieu",
    tone: "terracotta",
    size: "portrait",
    likes: 324,
    commentsCount: 28,
    image: "/images/baklava-pistachio-berries.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez baklava pistachio berries dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 6,
    label: "Baklava Pistachio Pancakes",
    category: "ambiance",
    tone: "apricot",
    size: "square",
    likes: 571,
    commentsCount: 41,
    image: "/images/baklava-pistachio-pancakes.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez baklava pistachio pancakes dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 7,
    label: "Beldi The Glace",
    category: "menu",
    tone: "saffron",
    size: "large",
    likes: 299,
    commentsCount: 9,
    image: "/images/beldi-the-glace.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez beldi the glace dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 8,
    label: "Blue Cloud Smoothie",
    category: "lieu",
    tone: "cream",
    size: "portrait",
    likes: 487,
    commentsCount: 18,
    image: "/images/blue-cloud-smoothie.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez blue cloud smoothie dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 9,
    label: "Cappuccino",
    category: "ambiance",
    tone: "pistachio",
    size: "square",
    likes: 527,
    commentsCount: 6,
    image: "/images/cappuccino.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez cappuccino dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 10,
    label: "Choco Banamlou",
    category: "menu",
    tone: "coffee",
    size: "large",
    likes: 356,
    commentsCount: 42,
    image: "/images/choco-banamlou.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez choco banamlou dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 11,
    label: "Cinnamon Rolls",
    category: "lieu",
    tone: "terracotta",
    size: "portrait",
    likes: 448,
    commentsCount: 10,
    image: "/images/cinnamon-rolls.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez cinnamon rolls dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 12,
    label: "Cookies",
    category: "ambiance",
    tone: "apricot",
    size: "square",
    likes: 388,
    commentsCount: 41,
    image: "/images/cookies.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez cookies dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 13,
    label: "Cozy Granola",
    category: "menu",
    tone: "saffron",
    size: "large",
    likes: 257,
    commentsCount: 32,
    image: "/images/cozy-granola.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez cozy granola dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 14,
    label: "Double Espresso",
    category: "lieu",
    tone: "cream",
    size: "portrait",
    likes: 472,
    commentsCount: 8,
    image: "/images/double-espresso.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez double espresso dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 15,
    label: "Egg Burger",
    category: "ambiance",
    tone: "pistachio",
    size: "square",
    likes: 170,
    commentsCount: 32,
    image: "/images/egg-burger.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez egg burger dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 16,
    label: "Energy Plate",
    category: "menu",
    tone: "coffee",
    size: "large",
    likes: 488,
    commentsCount: 14,
    image: "/images/energy-plate.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez energy plate dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 17,
    label: "Espresso",
    category: "lieu",
    tone: "terracotta",
    size: "portrait",
    likes: 445,
    commentsCount: 44,
    image: "/images/espresso.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez espresso dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 18,
    label: "Flat White",
    category: "ambiance",
    tone: "apricot",
    size: "square",
    likes: 154,
    commentsCount: 36,
    image: "/images/flat-white.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez flat white dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 19,
    label: "Granola Bowl",
    category: "menu",
    tone: "saffron",
    size: "large",
    likes: 477,
    commentsCount: 21,
    image: "/images/granola-bowl.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez granola bowl dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 20,
    label: "Grilled Cheese",
    category: "lieu",
    tone: "cream",
    size: "portrait",
    likes: 223,
    commentsCount: 50,
    image: "/images/grilled-cheese.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez grilled cheese dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 21,
    label: "Hero Maison Saha",
    category: "ambiance",
    tone: "pistachio",
    size: "square",
    likes: 312,
    commentsCount: 6,
    image: "/images/hero-maison-saha.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez hero maison saha dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 22,
    label: "Iced Mango Matcha",
    category: "menu",
    tone: "coffee",
    size: "large",
    likes: 388,
    commentsCount: 49,
    image: "/images/iced-mango-matcha.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez iced mango matcha dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 23,
    label: "Interieur 01",
    category: "lieu",
    tone: "terracotta",
    size: "portrait",
    likes: 104,
    commentsCount: 33,
    image: "/images/interieur-01.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez interieur 01 dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 24,
    label: "Latte",
    category: "ambiance",
    tone: "apricot",
    size: "square",
    likes: 151,
    commentsCount: 27,
    image: "/images/latte.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez latte dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 25,
    label: "Luxury Brunch Table",
    category: "menu",
    tone: "saffron",
    size: "large",
    likes: 446,
    commentsCount: 17,
    image: "/images/luxury-brunch-table.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez luxury brunch table dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 26,
    label: "Noisette",
    category: "lieu",
    tone: "cream",
    size: "portrait",
    likes: 279,
    commentsCount: 39,
    image: "/images/noisette.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez noisette dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 27,
    label: "Pistachio Cloud",
    category: "ambiance",
    tone: "pistachio",
    size: "square",
    likes: 105,
    commentsCount: 28,
    image: "/images/pistachio-cloud.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez pistachio cloud dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 28,
    label: "Saha Benedict",
    category: "menu",
    tone: "coffee",
    size: "large",
    likes: 416,
    commentsCount: 30,
    image: "/images/saha-benedict.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez saha benedict dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 29,
    label: "Salmon Pancakes",
    category: "lieu",
    tone: "terracotta",
    size: "portrait",
    likes: 266,
    commentsCount: 18,
    image: "/images/salmon-pancakes.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez salmon pancakes dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  },
  {
    id: 30,
    label: "Tuna Melt",
    category: "ambiance",
    tone: "apricot",
    size: "square",
    likes: 430,
    commentsCount: 50,
    image: "/images/tuna-melt.png",
    caption: "L'art de vivre selon Maison Saha. Découvrez tuna melt dans un cadre unique.",
    comments: [
      { username: "foodie_paris", text: "Incroyable ! 😍" },
      { username: "brunch_lover", text: "Il faut absolument que je vienne tester ça !" }
    ]
  }
];

const filters = [
  { value: "all", label: "Tout voir" },
  { value: "menu", label: "Le menu" },
  { value: "lieu", label: "Le lieu" },
  { value: "ambiance", label: "L’ambiance" },
];

export function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [likedItems, setLikedItems] = useState({});

  // Filter items
  const items = useMemo(() => {
    return activeFilter === "all"
      ? fallbackGalleryItems
      : fallbackGalleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Handle like toggle inside grid or lightbox
  const toggleLike = (itemId) => {
    setLikedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleShare = (item) => {
    const text = `Regarde ce moment chez Maison Saha : ${item.label}`;
    if (navigator.share) {
      navigator.share({
        title: "Maison Saha Galerie",
        text: text,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Navigating through lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  // Prevent scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activeLightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  // Aspect ratio sizing classes for Pinterest grid
  const aspectClasses = {
    large: "aspect-[4/3] md:aspect-[16/10]",
    portrait: "aspect-[2/3] md:aspect-[3/4.5]",
    square: "aspect-square",
  };

  // Apple-style background color classes based on product tone
  const toneClasses = {
    cream: "bg-linear-to-br from-[#fcfaf7] to-[#f5efe3]",
    coffee: "bg-linear-to-br from-[#2e201b] to-[#1a110e]",
    terracotta: "bg-linear-to-br from-[#8c3525] to-[#591d13]",
    saffron: "bg-linear-to-br from-[#faeed2] to-[#eddcb8]",
    pistachio: "bg-linear-to-br from-[#f2f4ec] to-[#d6ded0]",
    apricot: "bg-linear-to-br from-[#fdf4ee] to-[#ecc9ae]",
  };

  return (
    <div className="space-y-10">
      {/* Sliding Filter Bar */}
      <div className="flex items-center justify-between border-b border-ink/5 pb-4">
        <div
          aria-label="Filtrer la galerie"
          className="scrollbar-hidden flex gap-1.5 overflow-x-auto pb-1"
          role="group"
        >
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter.value}
              className={cn(
                "relative inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all select-none outline-none",
                activeFilter === filter.value
                  ? "text-cream bg-ink"
                  : "text-ink/60 hover:text-ink bg-ink/4"
              )}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-ink/40 font-semibold uppercase tracking-widest">
          <Instagram className="size-4" />
          @maisonsaha
        </div>
      </div>

      {/* Masonry Pinterest Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
        {items.map((item, index) => {
          const isLiked = !!likedItems[item.id];
          const calculatedLikes = item.likes + (isLiked ? 1 : 0);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className={cn(
                "group relative break-inside-avoid overflow-hidden rounded-[2.25rem] border border-ink/5 shadow-xs cursor-pointer",
                aspectClasses[item.size] || aspectClasses.square,
                toneClasses[item.tone] || toneClasses.cream
              )}
            >
              {/* Background Image if exists */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 size-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              ) : (
                /* Graphic Placeholder Concept if no image */
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-white/10 to-transparent" />
                  {/* Geometrics */}
                  <div className="absolute size-40 rounded-full border border-current/5" />
                  <div className="absolute size-60 rounded-full border border-current/5 rotate-45" />
                </div>
              )}

              {/* Geometric Overlay on top of image for branding */}
              <div className="absolute inset-0 border border-current/5 pointer-events-none rounded-[2.25rem]" />
              
              <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[220px] select-none pointer-events-none opacity-90 group-hover:scale-102 transition-all duration-500">
                <span className="self-start rounded-full border border-white/20 bg-black/25 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur-xs">
                  {item.category}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-none tracking-tight text-cream drop-shadow-md">
                  {item.label}
                </h3>
              </div>

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs flex flex-col justify-between p-6 text-cream">
                <div className="flex justify-between items-start">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-md">
                    {item.category}
                  </span>
                  <Maximize2 className="size-4.5 opacity-60 hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-display tracking-wide line-clamp-2">
                    {item.caption}
                  </p>
                  
                  {/* Action counters */}
                  <div className="flex items-center gap-4 text-xs font-bold pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Heart className={cn("size-4", isLiked ? "fill-red-500 text-red-500" : "fill-current")} />
                      {calculatedLikes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-4 fill-current" />
                      {item.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Instagram-Inspired Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop glass blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            />

            {/* Lightbox Container Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative flex h-full max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl md:h-auto md:max-h-[75vh] md:flex-row border border-ink/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Visual Showcase area */}
              <div className={cn(
                "relative flex min-h-[250px] items-center justify-center p-8 md:w-[60%] md:min-h-full overflow-hidden",
                toneClasses[activeLightboxItem.tone] || toneClasses.cream
              )}>
                {activeLightboxItem.image ? (
                  <img
                    src={activeLightboxItem.image}
                    alt={activeLightboxItem.label}
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <>
                    {/* Big decorative rings */}
                    <div className="absolute size-64 rounded-full border border-current/10" />
                    <div className="absolute size-96 rounded-full border border-current/5 rotate-12" />
                  </>
                )}

                {/* Dark shading layer on image for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/35 pointer-events-none" />

                <div className="relative z-10 text-center max-w-xs text-cream">
                  <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] backdrop-blur-md">
                    {activeLightboxItem.category}
                  </span>
                  <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight drop-shadow-md">
                    {activeLightboxItem.label}
                  </h2>
                </div>

                {/* Keyboard/Arrow navigation overlays */}
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors backdrop-blur-xs z-20"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors backdrop-blur-xs z-20"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              {/* Right Side: Instagram-style Detail & Comment Panel */}
              <div className="flex flex-1 flex-col justify-between overflow-hidden bg-white p-6 sm:p-8">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-ink/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-bold font-display shadow-2xs">
                      MS
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink flex items-center gap-1.5">
                        maisonsaha
                        <span className="inline-block size-3.5 rounded-full bg-sky-500 text-[0.5rem] font-bold text-white flex items-center justify-center" title="Compte vérifié">✓</span>
                      </p>
                      <p className="text-[0.68rem] text-ink/50 flex items-center gap-1">
                        <MapPin className="size-3 text-terracotta" />
                        Paris, France
                      </p>
                    </div>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="rounded-full bg-ink/5 p-1.5 text-ink/65 hover:bg-ink/10 hover:text-ink transition-colors"
                  >
                    <X className="size-4.5" />
                  </button>
                </div>

                {/* Caption & Comments List */}
                <div className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-hidden">
                  {/* Main Caption */}
                  <div className="flex gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-[0.6rem] font-bold text-terracotta">
                      MS
                    </div>
                    <div>
                      <p className="text-xs leading-relaxed">
                        <strong className="font-bold text-ink mr-1.5">maisonsaha</strong>
                        {activeLightboxItem.caption}
                      </p>
                      <span className="text-[0.62rem] text-ink/40 block mt-1.5">Il y a 3 heures</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-ink/5" />

                  {/* Mock user comments */}
                  <div className="space-y-4">
                    {activeLightboxItem.comments?.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-[0.6rem] font-bold text-ink/60">
                          {comment.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs leading-relaxed">
                            <strong className="font-bold text-ink mr-1.5">{comment.username}</strong>
                            {comment.text}
                          </p>
                          <span className="text-[0.62rem] text-ink/40 block mt-1">Répondre</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement & Action footer */}
                <div className="border-t border-ink/5 pt-4 space-y-4">
                  <div className="flex items-center justify-between text-ink/80">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleLike(activeLightboxItem.id)}
                        className="hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Heart className={cn("size-6 transition-colors", likedItems[activeLightboxItem.id] ? "fill-red-500 text-red-500" : "hover:text-ink")} />
                      </button>
                      <button className="hover:text-ink">
                        <MessageCircle className="size-6" />
                      </button>
                      <button onClick={() => handleShare(activeLightboxItem)} className="hover:text-ink">
                        <Share2 className="size-6" />
                      </button>
                    </div>
                    <button className="hover:text-ink">
                      <Bookmark className="size-6" />
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-ink">
                      {activeLightboxItem.likes + (likedItems[activeLightboxItem.id] ? 1 : 0)} J'aime
                    </p>
                    <p className="text-[0.6rem] uppercase tracking-wider text-ink/40 mt-1">29 juin 2026</p>
                  </div>

                  {/* CTA link to Menu page */}
                  <a
                    href="/menu"
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-ink py-3 text-xs font-bold uppercase tracking-wider text-cream shadow-xs hover:bg-ink/90 transition-colors"
                  >
                    <span>Consulter notre carte</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
