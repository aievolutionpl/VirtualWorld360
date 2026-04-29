/* VirtualWorld 360 — i18n module
   AI Evolution Polska · 2026
   Usage: window.t('key') → translated string for current language */

(() => {
  'use strict';

  const STRINGS = {
    en: {
      /* nav */
      nav_dashboard:   'Dashboard',
      nav_generator:   'AI Generator',
      nav_viewer:      '360° Viewer',
      nav_environments:'Environments',
      nav_shortcuts:   'Shortcuts',
      nav_last_prompt: 'Last Prompt',

      /* sidebar stats */
      stat_environments: 'Environments',
      stat_generated:    'Generated',
      stat_today:        'Today',
      stat_templates:    'Templates',

      /* hero */
      hero_title:    'Explore',
      hero_highlight:'Virtual Worlds',
      hero_sub:      'in 360° Technology',
      hero_desc:     'Immersive 360° environments generated with AI. Choose templates, upload reference photos and create VR-ready spaces in seconds.',
      hero_cta_gen:  '✨ Generate AI World',
      hero_cta_view: '🌐 Open Viewer',
      hero_stat_env: 'Environments',
      hero_stat_gen: 'Generated',
      hero_stat_360: 'Panoramas',

      /* rooms section */
      rooms_title:   '🌍 Available Environments',
      rooms_create:  '+ Create New',

      /* generated section */
      gen_title:     '✨ Your Generated Worlds',
      gen_more:      'Generate More →',

      /* tools section */
      tools_title:         '🛠 Tools',
      tool_gen_name:       'AI World Generator',
      tool_gen_desc:       'Describe your world, add reference images and let AI generate an immersive 360° panorama.',
      tool_viewer_name:    '360° Viewer',
      tool_viewer_desc:    'Three.js viewer with hotspots, auto-tour mode and lighting controls. Fullscreen & VR.',

      /* bottom */
      usage_title:    '📊 Environment Usage',
      activity_title: '⚡ Recent Activity',
      activity_empty: 'No activity yet.',
      activity_cta:   'Generate your first world →',
      act_generated:  'Generated',
      act_with_ref:   'with reference',

      /* search */
      search_placeholder: 'Search environments…',

      /* explore */
      explore: 'Explore →',

      /* generator */
      gen_hero_title:  'Generate',
      gen_hero_hl:     '360° Worlds',
      gen_hero_with:   'with AI',
      gen_hero_desc:   'Choose a template, optionally upload reference images, customize the description — and let AI generate an immersive 360° panorama ready for VR exploration.',
      step1_label:     'Choose a template',
      step2_label:     'Reference images',
      step2_opt:       '(optional, max 4)',
      step3_label:     'Customize description',
      step3_opt:       '(optional)',
      step3_clear:     '↺ Clear',
      step3_ph:        'E.g. add sunset, rain, specific climate, architectural elements…',
      quality_label:   'Quality:',
      quality_fast:    'Fast',
      quality_std:     'Standard',
      quality_premium: 'Premium ✨',
      format_label:    '360° Format:',
      variants_label:  'Variations:',
      gen_btn:         '✨ Generate 360° World',
      gen_running:     '⏳ Generating world…',
      result_explore:  '🌐 Explore in 360°',
      result_download: '💾 Download PNG',
      result_again:    '↺ Variation',
      gallery_title:   '📸 Your generated worlds',
      tpl_search_ph:   'Search templates…',
      tpl_empty:       'No templates match your search.',
      drop_hint:       '<b>Drag & drop</b> images or <span class="t-grad" style="font-weight:600;cursor:pointer;">click to select</span>',
      drop_hint2:      'JPG, PNG, WEBP · max 4 MB / image',
      last_prompt_warn:'No saved prompt.',
      last_prompt_ok:  'Last prompt loaded.',

      /* viewer */
      viewer_loading:  'Loading panorama…',
      viewer_error:    '⚠️ Failed to load image',
      viewer_home:     '← Dashboard',
      viewer_rooms:    'Rooms',
      viewer_env:      'Environment',
      viewer_rotate:   'Auto-rotate',
      viewer_hotspots: 'Hotspots',
      viewer_shot:     'Screenshot',
      viewer_fs:       'Fullscreen',
      env_ctrl_title:  '🎛 Environment Controls',
      env_brightness:  'Brightness',
      env_contrast:    'Contrast',
      env_saturation:  'Saturation',
      env_fov:         'FOV / Zoom',
      env_speed:       'Rotation Speed',
      env_tour:        '🗺 Auto-Tour (rooms)',
      env_reset:       '↺ Reset effects',
      env_generator:   '✨ AI Generator',
      hint_controls:   '🖱 Drag · 🔍 Scroll = zoom · ⌨ WASD · F = fullscreen',
      toast_shot:      '📸 Screenshot saved!',
      toast_tour_on:   '🗺 Auto-Tour enabled',
      toast_tour_off:  '⏹ Auto-Tour stopped',
      environments_panel: '🌍 Environments',
      custom_world:    'Generated World ✨',

      /* confirm dialogs */
      confirm_delete:  'Delete this world?',
      deleted:         'Deleted.',
      error_prefix:    'Error: ',
      max_images:      'Maximum 4 images.',
      not_image:       'is not an image.',
      too_large:       'exceeds 4MB.',

      /* progress steps */
      prog_init:   '🚀 Initializing gpt-image-2…',
      prog_scene:  '🎨 Composing 360° scene…',
      prog_pano:   '🌐 Generating spherical panorama…',
      prog_hdr:    '💡 Rendering HDR lighting…',
      prog_final:  '✨ Finalizing panorama 1536×1024…',
      prog_ref1:   '🔍 Analyzing reference images (Vision AI)…',
      prog_ref2:   '🧠 Extracting visual style…',
      prog_done:   '✅ Generated!',
    },

    pl: {
      /* nav */
      nav_dashboard:   'Dashboard',
      nav_generator:   'Generator AI',
      nav_viewer:      'Przeglądarka 360°',
      nav_environments:'Środowiska',
      nav_shortcuts:   'Skróty',
      nav_last_prompt: 'Ostatni prompt',

      /* sidebar stats */
      stat_environments: 'Środowiska',
      stat_generated:    'Wygenerowane',
      stat_today:        'Dziś',
      stat_templates:    'Szablony',

      /* hero */
      hero_title:    'Eksploruj',
      hero_highlight:'Wirtualne Światy',
      hero_sub:      'w technologii 360°',
      hero_desc:     'Immersyjne środowiska 360° generowane z AI. Wybieraj szablony, wgrywaj zdjęcia referencyjne i twórz przestrzenie gotowe do eksploracji w VR — w kilkanaście sekund.',
      hero_cta_gen:  '✨ Generuj Świat AI',
      hero_cta_view: '🌐 Otwórz Przeglądarkę',
      hero_stat_env: 'Środowiska',
      hero_stat_gen: 'Wygenerowane',
      hero_stat_360: 'Panoramy',

      /* rooms section */
      rooms_title:   '🌍 Dostępne Środowiska',
      rooms_create:  '+ Utwórz nowe',

      /* generated section */
      gen_title:     '✨ Twoje wygenerowane światy',
      gen_more:      'Generuj kolejny →',

      /* tools section */
      tools_title:         '🛠 Narzędzia',
      tool_gen_name:       'Generator Światów AI',
      tool_gen_desc:       'Opisz świat, dodaj zdjęcia referencyjne i pozwól AI wygenerować immersyjną panoramę 360°.',
      tool_viewer_name:    'Przeglądarka 360°',
      tool_viewer_desc:    'Three.js viewer z hotspotami, trybem auto-tour i kontrolą oświetlenia. Pełny ekran i VR.',

      /* bottom */
      usage_title:    '📊 Użycie środowisk',
      activity_title: '⚡ Ostatnia aktywność',
      activity_empty: 'Brak aktywności.',
      activity_cta:   'Wygeneruj pierwszy świat →',
      act_generated:  'Wygenerowano',
      act_with_ref:   'z referencją',

      /* search */
      search_placeholder: 'Szukaj środowisk…',

      /* explore */
      explore: 'Eksploruj →',

      /* generator */
      gen_hero_title:  'Generuj',
      gen_hero_hl:     'Światy 360°',
      gen_hero_with:   'z AI',
      gen_hero_desc:   'Wybierz szablon, opcjonalnie wgraj zdjęcia referencyjne, dostosuj opis — i pozwól AI wygenerować immersyjną panoramę 360° gotową do eksploracji w VR.',
      step1_label:     'Wybierz szablon',
      step2_label:     'Obrazy referencyjne',
      step2_opt:       '(opcjonalnie, max 4)',
      step3_label:     'Dostosuj opis',
      step3_opt:       '(opcjonalnie)',
      step3_clear:     '↺ Wyczyść',
      step3_ph:        'Np. dodaj zachód słońca, deszcz, konkretny klimat, elementy architektury…',
      quality_label:   'Jakość:',
      quality_fast:    'Szybka',
      quality_std:     'Standard',
      quality_premium: 'Premium ✨',
      format_label:    'Format 360°:',
      variants_label:  'Wariacje:',
      gen_btn:         '✨ Generuj Świat 360°',
      gen_running:     '⏳ Generowanie świata…',
      result_explore:  '🌐 Eksploruj w 360°',
      result_download: '💾 Pobierz PNG',
      result_again:    '↺ Wariacja',
      gallery_title:   '📸 Twoje wygenerowane światy',
      tpl_search_ph:   'Szukaj szablonu…',
      tpl_empty:       'Brak szablonów spełniających kryteria.',
      drop_hint:       '<b>Przeciągnij i upuść</b> obrazy lub <span class="t-grad" style="font-weight:600;cursor:pointer;">kliknij, aby wybrać</span>',
      drop_hint2:      'JPG, PNG, WEBP · max 4 MB / obraz',
      last_prompt_warn:'Brak zapisanego promptu.',
      last_prompt_ok:  'Wczytano ostatni prompt.',

      /* viewer */
      viewer_loading:  'Wczytywanie panoramy…',
      viewer_error:    '⚠️ Błąd ładowania obrazu',
      viewer_home:     '← Dashboard',
      viewer_rooms:    'Pokoje',
      viewer_env:      'Środowisko',
      viewer_rotate:   'Auto-obrót',
      viewer_hotspots: 'Hotspoty',
      viewer_shot:     'Zrzut ekranu',
      viewer_fs:       'Pełny ekran',
      env_ctrl_title:  '🎛 Kontrola Środowiska',
      env_brightness:  'Jasność',
      env_contrast:    'Kontrast',
      env_saturation:  'Nasycenie',
      env_fov:         'FOV / Zoom',
      env_speed:       'Prędkość obrotu',
      env_tour:        '🗺 Auto-Tour (pokoje)',
      env_reset:       '↺ Reset efektów',
      env_generator:   '✨ Generator AI',
      hint_controls:   '🖱 Przeciągnij · 🔍 Scroll = zoom · ⌨ WASD · F = fullscreen',
      toast_shot:      '📸 Zrzut ekranu zapisany!',
      toast_tour_on:   '🗺 Auto-Tour włączony',
      toast_tour_off:  '⏹ Auto-Tour zatrzymany',
      environments_panel: '🌍 Środowiska',
      custom_world:    'Wygenerowany Świat ✨',

      /* confirm dialogs */
      confirm_delete:  'Usunąć ten świat?',
      deleted:         'Usunięto.',
      error_prefix:    'Błąd: ',
      max_images:      'Maksymalnie 4 obrazy.',
      not_image:       'to nie jest obraz.',
      too_large:       'przekracza 4MB.',

      /* progress steps */
      prog_init:   '🚀 Inicjalizacja gpt-image-2…',
      prog_scene:  '🎨 Komponowanie sceny 360°…',
      prog_pano:   '🌐 Generowanie panoramy sferycznej…',
      prog_hdr:    '💡 Renderowanie oświetlenia HDR…',
      prog_final:  '✨ Finalizacja panoramy 1536×1024…',
      prog_ref1:   '🔍 Analiza obrazów referencyjnych (Vision AI)…',
      prog_ref2:   '🧠 Wydobywanie stylu wizualnego…',
      prog_done:   '✅ Wygenerowano!',
    },
  };

  /* Load saved preference */
  const saved = localStorage.getItem('vw-lang');
  window.VW_LANG = (saved === 'pl' || saved === 'en') ? saved : 'en';
  window.VW_I18N  = STRINGS;
  window.t = (key) => STRINGS[window.VW_LANG][key] ?? STRINGS['en'][key] ?? key;

  window.VW_SET_LANG = (lang) => {
    if (lang !== 'en' && lang !== 'pl') return;
    window.VW_LANG = lang;
    localStorage.setItem('vw-lang', lang);
    document.documentElement.lang = lang;
    /* dispatch event so pages can react */
    window.dispatchEvent(new CustomEvent('vw-lang-change', { detail: { lang } }));
  };
})();
