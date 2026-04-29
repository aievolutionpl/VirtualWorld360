/* VirtualWorld 360 — Template Library
   AI Evolution Polska · 2026
   Single source of truth for all world templates.
   Categories: Sci-Fi, Nature, Architecture, Fantasy, Business, Abstract */

(() => {
  'use strict';

  const T = (id, name, category, icon, prompt, gradient, preview) => ({
    id, name, category, icon, prompt, gradient, preview: preview || null,
  });

  const TEMPLATES = [
    /* ─── SCI-FI ─── */
    T('cyberpunk', 'Cyberpunk City', 'Sci-Fi', '🌆',
      'futuristic cyberpunk megacity at night, towering neon-lit skyscrapers, holographic advertisements in multiple languages, rain-wet streets reflecting vivid neon colors, flying vehicles, dense urban atmosphere, blade runner aesthetic',
      'linear-gradient(135deg,#1a0533,#0d1a3a)'),
    T('space', 'Space Station Orbit', 'Sci-Fi', '🛸',
      'interior of a futuristic space station in low Earth orbit, large circular panoramic windows showing Earth and starfield, astronaut equipment, glowing control panels, metallic surfaces with blue accent lighting, zero-gravity atmosphere',
      'linear-gradient(135deg,#000510,#0a1628)', 'env-space.jpg'),
    T('mars', 'Mars Base Alpha', 'Sci-Fi', '🔴',
      'Mars colony habitat interior, large windows showing red rocky Martian landscape and pale orange sky with two moons, high-tech life support systems, astronaut equipment, scientific instruments',
      'linear-gradient(135deg,#200a00,#1a0800)'),
    T('quantum', 'Quantum Server', 'Sci-Fi', '⚡',
      'futuristic quantum data center, circular array of glowing server towers, blue and purple holographic indicators, fog at floor level, cinematic depth, ultra-clean industrial design',
      'linear-gradient(135deg,#050822,#0a0f3a)', 'env-server.jpg'),
    T('neuro', 'Neural Lab', 'Sci-Fi', '🧬',
      'high-tech neuroscience laboratory, transparent bio-domes with bioluminescent neurons floating, holographic brain scans on glass walls, medical robots, cool teal-purple lighting',
      'linear-gradient(135deg,#001028,#100530)'),
    T('starport', 'Starport Hangar', 'Sci-Fi', '🚀',
      'massive interstellar spaceport hangar interior, docked starships, floor-to-ceiling viewports with planetary view, dramatic backlit gantries, sci-fi industrial scale',
      'linear-gradient(135deg,#0a0518,#1a0533)'),
    T('tokyo', 'Tokyo Neon Rooftop', 'Sci-Fi', '🗼',
      'Tokyo rooftop at night, neon cyberpunk cityscape, massive glowing kanji billboards, rain-slicked rooftop garden with modern Japanese architecture, holographic advertisements, flying taxis, ultra-detailed cinematic photoreal, purple and cyan neon',
      'linear-gradient(135deg,#0a001a,#001a2a)', 'env-tokyo.jpg'),

    /* ─── NATURE ─── */
    T('forest', 'Enchanted Forest', 'Nature', '🌿',
      'magical enchanted ancient forest at night, massive glowing bioluminescent mushrooms, fireflies, ancient twisted trees, mystical purple and blue fog, aurora borealis visible through the canopy, fairy tale atmosphere',
      'linear-gradient(135deg,#021a0a,#071a15)'),
    T('mountain', 'Alpine Dawn', 'Nature', '🏔',
      'epic mountain range at sunrise, dramatic golden light over snow-capped alpine peaks, pristine valley below with crystal clear lake, morning mist in the valleys, vast panoramic wilderness',
      'linear-gradient(135deg,#1a0e05,#0a1520)'),
    T('underwater', 'Ocean Depths', 'Nature', '🌊',
      'futuristic deep ocean research station interior, large reinforced panoramic windows showing bioluminescent sea creatures and coral reef, dramatic underwater blue lighting, marine biology equipment',
      'linear-gradient(135deg,#001520,#001030)'),
    T('desert', 'Desert Oasis', 'Nature', '🌅',
      'vast desert landscape at golden hour sunset, dramatic sand dunes, ancient ruins with carved stone, palm oasis in the foreground, spectacular orange and purple sky, warm cinematic atmosphere',
      'linear-gradient(135deg,#1a1000,#200d00)'),
    T('aurora', 'Aurora Tundra', 'Nature', '❄️',
      'arctic tundra at night with vivid aurora borealis dancing across the sky, frozen lake reflecting green and violet light, isolated wooden cabin, photoreal cinematic',
      'linear-gradient(135deg,#020e22,#082035)', 'env-arctic.jpg'),
    T('jungle', 'Jungle Temple', 'Nature', '🌴',
      'ancient jungle temple ruins, massive stone carved faces overgrown with tropical vines, golden sunbeams piercing through dense rainforest canopy, exotic colorful birds, mist rising from jungle floor, moss-covered stone steps',
      'linear-gradient(135deg,#031a0e,#0a2018)', 'env-jungle.jpg'),

    /* ─── ARCHITECTURE ─── */
    T('atrium', 'Glass Atrium', 'Architecture', '🏛',
      'ultra-modern glass atrium interior, soaring vaulted ceiling, indoor garden with mature trees, marble floors, panoramic floor-to-ceiling windows, soft daylight, museum-quality architecture',
      'linear-gradient(135deg,#161426,#1d1c30)'),
    T('penthouse', 'Penthouse Skyline', 'Architecture', '🌃',
      'luxury minimalist penthouse interior at dusk, floor-to-ceiling windows with city skyline panorama, sleek modern furniture, warm accent lighting, cinematic depth',
      'linear-gradient(135deg,#0c0a1c,#171530)'),
    T('palace', 'Royal Palace Hall', 'Architecture', '👑',
      'grand baroque palatial hall interior, soaring gilded ceilings with painted frescoes, massive crystal chandeliers, marble floors with intricate inlay, tall arched windows with golden light streaming in, ornate columns, royal throne room scale',
      'linear-gradient(135deg,#1a1000,#241800)', 'env-palace.jpg'),
    T('cathedral', 'Modern Cathedral', 'Architecture', '⛪',
      'contemporary cathedral interior, soaring concrete and glass arches, colored light beams from stained glass, polished stone floors, awe-inspiring scale',
      'linear-gradient(135deg,#181020,#221830)'),
    T('library', 'Endless Library', 'Architecture', '📚',
      'vast multi-level wooden library with seemingly endless bookshelves, brass railings, antique chandeliers, soft warm reading lamps, dust motes in light, atmospheric',
      'linear-gradient(135deg,#1a0f05,#23170a)'),
    T('loft', 'Industrial Loft', 'Architecture', '🏗',
      'high-end industrial loft interior, exposed brick walls, large factory windows, polished concrete floor, mid-century furniture, dramatic Edison-bulb lighting',
      'linear-gradient(135deg,#161210,#1f1714)'),

    /* ─── FANTASY ─── */
    T('castle', 'Fantasy Castle', 'Fantasy', '🏰',
      'grand fantasy castle throne room interior, soaring vaulted stone ceilings, stained glass windows with magical colored light, ancient stone architecture, burning torches, mystical artifacts, epic medieval fantasy',
      'linear-gradient(135deg,#1a0520,#200518)'),
    T('dragon-cave', 'Dragon Cave', 'Fantasy', '🐉',
      'massive volcanic dragon lair interior, glowing rivers of lava, mountains of gold and treasure, ancient ruins partially buried, dramatic backlight, epic scale, photoreal fantasy',
      'linear-gradient(135deg,#240a05,#330a05)'),
    T('elven-grove', 'Elven Grove', 'Fantasy', '🍃',
      'mystical elven city built into giant ancient trees, glowing crystal lanterns, suspension bridges between trunks, soft golden magical light, cinematic fantasy',
      'linear-gradient(135deg,#0a1e10,#102a18)'),
    T('necropolis', 'Necropolis Vault', 'Fantasy', '💀',
      'ancient gothic necropolis interior, towering stone sarcophagi, purple cursed mist, candle-lit altars, ominous moonbeams from broken roof, dark fantasy',
      'linear-gradient(135deg,#0a0a18,#180a22)'),
    T('astral', 'Astral Sanctum', 'Fantasy', '✨',
      'celestial astral sanctum, floating stone platforms in starry void, glowing constellations, magical runes hovering in air, sense of infinite space',
      'linear-gradient(135deg,#0a0530,#180a44)'),

    /* ─── BUSINESS ─── */
    T('hq', 'AI Evolution HQ', 'Business', '🖥️',
      'modern AI technology company headquarters interior, multiple curved ultrawide monitors showing code and neural network visualizations, blue and purple neon server racks, industrial exposed ceiling, minimalist premium design',
      'linear-gradient(135deg,#1a0533,#12122a)', '360room.png'),
    T('boardroom', 'Executive Suite', 'Business', '💼',
      'luxury executive penthouse boardroom at night, floor-to-ceiling windows with glowing city skyline panorama, long glass conference table, holographic displays, premium dark interior with warm accent lighting',
      'linear-gradient(135deg,#090914,#0d0d1c)', 'env-boardroom.jpg'),
    T('studio', 'Creative Studio', 'Business', '🎨',
      'modern creative design studio with curved ultrawide monitors, neon accent lighting, mood boards on walls, plants, premium ergonomic chairs, atmospheric depth',
      'linear-gradient(135deg,#1a0820,#22102e)', 'env-studio.jpg'),
    T('coworking', 'Coworking Hub', 'Business', '☕',
      'modern coworking space interior, multiple zones (focus, lounge, meeting), wood and glass partitions, plants, warm pendant lighting, vibrant but professional atmosphere',
      'linear-gradient(135deg,#15120c,#1c170e)'),
    T('investor', 'Investor Lounge', 'Business', '💰',
      'premium investor lounge interior, dark walnut walls, brass fixtures, leather chesterfield armchairs, panoramic financial-district view at night, cinematic warm lighting',
      'linear-gradient(135deg,#0c0a08,#1a140c)'),

    /* ─── ABSTRACT ─── */
    T('liminal', 'Liminal Void', 'Abstract', '🌌',
      'surreal liminal abstract space, infinite gradient horizon, soft pastel volumetric fog, floating geometric shapes, dreamlike atmospheric perspective, photoreal but impossible',
      'linear-gradient(135deg,#0a081c,#160a30)'),
    T('crystal', 'Crystal Cave', 'Abstract', '💎',
      'gigantic crystal cave interior, towering translucent crystal columns refracting rainbow light, prismatic reflections, otherworldly ambient glow, photoreal',
      'linear-gradient(135deg,#0a1228,#1a1040)'),
    T('chrome', 'Chrome Dimension', 'Abstract', '🪞',
      'abstract liquid chrome dimension, undulating mirror landscape, soft neon gradient sky reflections, surreal minimalist composition, ultra-glossy photoreal',
      'linear-gradient(135deg,#0e0e16,#1a1a24)'),
    T('vapor', 'Vaporwave Plaza', 'Abstract', '🌴',
      'retro vaporwave plaza, palm tree silhouettes, pink and cyan grid horizon, classical Roman busts, glitch atmosphere, 80s synthwave aesthetic',
      'linear-gradient(135deg,#220a30,#0a1a40)', 'env-neon.jpg'),
    T('paint', 'Painterly Bloom', 'Abstract', '🎨',
      'abstract painterly environment, swirling impressionist brushstrokes of vivid color, dreamlike depth, soft volumetric light, art-book quality',
      'linear-gradient(135deg,#1a0a20,#22102e)'),
  ];

  const CATEGORIES = ['All', 'Sci-Fi', 'Nature', 'Architecture', 'Fantasy', 'Business', 'Abstract'];

  window.VW_TEMPLATES = TEMPLATES;
  window.VW_CATEGORIES = CATEGORIES;
})();
