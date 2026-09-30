"""
build_gandhi_presentation_com.py
Generates the Gandhi Jayanti presentation using native PowerPoint COM automation.
Guarantees 100% native animation playback, smooth slide cross-fades,
precise grouped shape layout (zero misplaced text or badges), and exports
high-resolution PNG previews for instant visual verification.
"""

import os
import win32com.client
from PIL import Image, ImageEnhance
import numpy as np

def rgb(r, g, b):
    """Convert RGB (0-255) to Win32 integer (0xBBGGRR)."""
    return r + (g << 8) + (b << 16)

# Exact Medieval Manuscript Palette
COLOR_LEATHER_BG    = rgb(42, 26, 14)       # #2A1A0E - Dark Leather Canvas
COLOR_PARCHMENT     = rgb(250, 244, 230)     # #FAF4E6 - Main Slide Parchment Fill
COLOR_CARD_PARCH    = rgb(241, 228, 195)     # #F1E4C3 - Card Parchment Fill
COLOR_MAROON        = rgb(122, 31, 31)       # #7A1F1F - Deep Maroon
COLOR_GOLD          = rgb(184, 134, 43)      # #B8862B - Antique Gold
COLOR_BRIGHT_GOLD   = rgb(212, 175, 55)      # #D4AF37 - Bright Accent Gold
COLOR_PALE_GOLD     = rgb(212, 190, 136)     # #D4BE88 - Pale Gold Accent
COLOR_DARK_BROWN    = rgb(61, 39, 23)        # #3D2717 - Dark Subtitle/Box Brown
COLOR_TEXT_DARK     = rgb(42, 26, 14)        # #2A1A0E - Main Body Text Dark
COLOR_TEXT_LIGHT    = rgb(250, 244, 230)     # #FAF4E6 - Light Text for dark boxes
COLOR_SUBTITLE_BROWN= rgb(74, 50, 32)        # #4A3220 - Subtitle & Chapter Brown

FONT_SERIF = "Georgia"
FONT_TITLE = "Georgia"
FONT_BODY  = "Georgia"

# Slide Data Definition
SLIDES_DATA = [
  {
    "no": 1,
    "roman": 'I',
    "kicker": 'CHAPTER I • 21ST CENTURY INQUIRY',
    "title": 'IS GANDHIAN PHILOSOPHY STILL RELEVANT IN THE 21ST CENTURY?',
    "sub": 'An Exploration of Truth, Non-Violence, and Moral Courage in the Modern Age',
    "points": [
      'Gandhi Jayanti, 2 October — Commemorating the global heritage of peace and truth.',
      'Mohandas Karamchand Gandhi, 1869–1948 — Leader of India\'s non-violent freedom movement.',
      'Presented by [Your Name] — Examining the enduring relevance of Gandhian ideals today.'
    ],
    "photo": 'public/gandhi/gandhi-2.jpg',
    "caption": 'Mohandas Karamchand Gandhi (1869–1948) — Father of the Nation and apostle of non-violence.',
    "quote": 'My life is my message.',
    "highlight": 'Presented by Dev Vashisht'
  },
  {
    "no": 2,
    "roman": 'II',
    "kicker": 'CHAPTER II • IDENTITY & LEGACY',
    "title": 'WHO WAS GANDHI?',
    "sub": 'From a Young Barrister in London to the Leader of a Global Movement',
    "points": [
      'Born 2 October 1869 in Porbandar, Gujarat, India.',
      'Trained as a lawyer in London at the Inner Temple.',
      'Led India\'s historic non-violent freedom struggle against colonial rule.',
      'Called Mahatma (\'Great Soul\') and affectionately revered as Bapu (\'Father\').',
      'The central question: do his ideas and methods still work in today\'s complex world?'
    ],
    "photo": 'public/gandhi/gandhi-2.jpg',
    "caption": 'Gandhi, London, 1931',
    "quote": 'In a gentle way, you can shake the world.'
  },
  {
    "no": 3,
    "roman": 'III',
    "kicker": 'CHAPTER III • PHILOSOPHICAL PILLARS',
    "title": 'THE CORE IDEAS',
    "sub": 'The Timeless Foundations of Gandhian Philosophy and Ethics',
    "points": [
      'Satya (Truth) — Absolute adherence to truth and honesty in thought, word, and deed.',
      'Ahimsa (Non-violence) — Active love, compassion, and refraining from harm against any living being.',
      'Satyagraha (Peaceful resistance) — Fearless soul-force standing firm against injustice without malice.',
      'Sarvodaya (Welfare of all) — Universal upliftment prioritizing the most vulnerable and marginalized.',
      'Swadeshi (Self-reliance) — Fostering local production, community strength, and economic independence.',
      'Simple living — Voluntary simplicity, mindful consumption, and harmony with the natural world.'
    ],
    "photo": 'public/gandhi/gandhi-3.jpg',
    "caption": 'Gandhi and Kasturba, South Africa, 1902',
    "quote": 'Truth is the sovereign principle, which includes numerous other principles.'
  },
  {
    "no": 4,
    "roman": 'IV',
    "kicker": 'CHAPTER IV • 21ST CENTURY REALITIES',
    "title": 'THE WORLD WE LIVE IN',
    "sub": 'The Urgent Humanitarian, Social, and Ecological Crises of Our Era',
    "points": [
      'Wars and conflict: Escalating geopolitical hostilities, armed warfare, and global instability.',
      'Polarisation and hate online: Digital echo chambers, social fragmentation, and rising hostility.',
      'Climate crisis: Global environmental degradation, extreme weather, and resource depletion.',
      'Inequality: Widening socio-economic divides and unequal access to essential opportunities.',
      'Misinformation: Rapid algorithmic dissemination of falsehoods eroding public trust.',
      'Consumerism and waste: Hyper-materialistic lifestyles straining the planet\'s finite resources.'
    ],
    "photo": 'public/gandhi/gandhi-4.jpg',
    "caption": 'Gandhi and Nehru, Mumbai, 1946',
    "quote": 'The world will live in peace only when the individuals composing it make up their minds to do so.'
  },
  {
    "no": 5,
    "roman": 'V',
    "kicker": 'CHAPTER V • POWER OF NON-VIOLENCE',
    "title": 'AHIMSA IN ACTION',
    "sub": 'How Non-Violent Resistance Transformed Global Civil Rights and History',
    "points": [
      'The US civil rights movement (Martin Luther King Jr.) and South African anti-apartheid struggle (Nelson Mandela) drew deeply on Gandhian ideas.',
      'Chenoweth and Stephan\'s study (analyzing 323 campaigns from 1900 to 2006) found non-violent campaigns succeeded more often than violent ones.',
      '2 October is recognized internationally by the United Nations as the International Day of Non-Violence.'
    ],
    "photo": 'public/gandhi/gandhi-5.jpg',
    "caption": 'Gandhi with Abdul Ghaffar Khan, 1940',
    "quote": 'Non-violence is the greatest force at the disposal of mankind. — Mahatma Gandhi'
  },
  {
    "no": 6,
    "roman": 'VI',
    "kicker": 'CHAPTER VI • TRUTH IN THE DIGITAL AGE',
    "title": 'SATYA IN THE AGE OF MISINFORMATION',
    "sub": 'Practicing Discernment, Integrity, and Civil Dialogue in a Connected Society',
    "points": [
      'Fake news spreads fast: Digital algorithms amplify sensationalism and falsehoods at unprecedented speed.',
      'Verify before you speak or share: Upholding factual accuracy and critical thinking before disseminating information.',
      'Truth-telling as a daily discipline: Living with intellectual honesty and moral transparency.',
      'Dialogue instead of online outrage: Choosing constructive communication and empathy over reactionary anger.'
    ],
    "photo": 'public/gandhi/gandhi-6.jpg',
    "caption": 'The Salt March, 1930',
    "quote": 'Morality is the basis of things, and truth is the substance of all morality.'
  },
  {
    "no": 7,
    "roman": 'VII',
    "kicker": 'CHAPTER VII • ECOLOGICAL WISDOM',
    "title": 'SIMPLE LIVING AND THE PLANET',
    "sub": 'Sustainable Living, Mindful Consumption, and Climate Responsibility',
    "points": [
      '\'The earth provides enough for everyone\'s needs, but not everyone\'s greed\' (attributed to Gandhi).',
      'Direct links to modern sustainability, conscious minimalism, and circular resource use.',
      'India\'s Mission LiFE (Lifestyle for Environment) actively promotes individual and community eco-friendly lifestyles.'
    ],
    "photo": 'public/gandhi/gandhi-7.jpg',
    "caption": 'Gandhi at Dandi, 5 April 1930',
    "quote": 'The earth provides enough to satisfy every man\'s needs, but not every man\'s greed.'
  },
  {
    "no": 8,
    "roman": 'VIII',
    "kicker": 'CHAPTER VIII • LOCAL ECONOMIES & DIGNITY',
    "title": 'SWADESHI AND SARVODAYA TODAY',
    "sub": 'Grassroots Empowerment, Inclusive Growth, and Universal Cleanliness',
    "points": [
      'Local economies and self-reliance: Strengthening local supply networks and supporting homegrown enterprise.',
      'Khadi and village industries: Empowering rural artisans and promoting eco-conscious handloom textiles.',
      'Inclusion and dignity for all: Ensuring that progress uplift the most disadvantaged in society.',
      'Swachh Bharat Abhiyan: A nationwide sanitation and cleanliness movement launched on Gandhi Jayanti (2 Oct 2014).'
    ],
    "photo": 'public/gandhi/gandhi-8.jpg',
    "caption": 'Gandhi and Nehru, Quit India session, 1942',
    "quote": 'Recall the face of the poorest and the weakest person you have seen, and ask if your step will be of any use to them.'
  },
  {
    "no": 9,
    "roman": 'IX',
    "kicker": 'CHAPTER IX • CRITICAL PERSPECTIVE',
    "title": 'LIMITS AND CRITICISMS',
    "sub": 'Nuance, Context, and Thoughtful Adaptation in the Modern Era',
    "points": [
      'Non-violence alone may not be enough when confronting extreme violence and ruthless authoritarian regimes.',
      'Some of Gandhi\'s views (on caste and race during his early South Africa years) are legitimately criticised.',
      'Ideas need thoughtful application and dynamic adaptation, not rigid or blind copying.'
    ],
    "photo": 'public/gandhi/gandhi-9.jpg',
    "caption": 'Portrait, late 1930s',
    "quote": 'I want the cultures of all lands to be blown about my house as freely as possible, but I refuse to be blown off my feet.'
  },
  {
    "no": 10,
    "roman": 'X',
    "kicker": 'CHAPTER X • LIVING RELEVANCE',
    "title": 'THE VERDICT: STILL RELEVANT',
    "sub": 'A Living Ethical Compass for Contemporary Life and Global Citizenship',
    "points": [
      'A compass, not a rulebook: An enduring framework for moral decision-making in personal and public affairs.',
      'Choose peace, truth, and simplicity in everyday choices, leadership, and community action.',
      '"Be the change you wish to see in the world" (attributed to Gandhi) — Individual integrity inspires collective transformation.',
      'Thank you! Jai Hind!'
    ],
    "photo": 'public/gandhi/gandhi-10.jpg',
    "caption": 'Gandhi, London, 1931',
    "quote": 'You must be the change you wish to see in the world.',
    "highlight": 'Thank you! Jai Hind!',
    "credit": 'Photos: Wikimedia Commons (public domain)'
  }
]

def set_zero_margins(tf):
    try:
        tf.MarginLeft = 0
        tf.MarginRight = 0
        tf.MarginTop = 0
        tf.MarginBottom = 0
    except Exception:
        pass

def crop_and_process_photo(image_path, target_w_pt, target_h_pt, out_path):
    if not os.path.exists(image_path):
        return None
    
    img = Image.open(image_path).convert('RGB')
    
    scale = 2.0
    tw = int(target_w_pt * scale)
    th = int(target_h_pt * scale)
    
    target_ratio = tw / th
    current_ratio = img.width / img.height
    
    if current_ratio > target_ratio:
        new_w = int(img.height * target_ratio)
        left = int((img.width - new_w) / 2)
        img = img.crop((left, 0, left + new_w, img.height))
    else:
        new_h = int(img.width / target_ratio)
        if 'gandhi-9' in image_path:
            top = int((img.height - new_h) * 0.28)
        else:
            top = 0
        top = max(0, min(top, img.height - new_h))
        img = img.crop((0, top, img.width, top + new_h))
        
    img = img.resize((tw, th), Image.Resampling.LANCZOS)
    
    enh_bri = ImageEnhance.Brightness(img)
    img = enh_bri.enhance(0.95)
    enh_con = ImageEnhance.Contrast(img)
    img = enh_con.enhance(1.05)
    
    arr = np.array(img, dtype=np.float32)
    sepia_matrix = np.array([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131]
    ])
    sepia_arr = arr.dot(sepia_matrix.T)
    sepia_arr = np.clip(sepia_arr, 0, 255)
    blended = arr * 0.65 + sepia_arr * 0.35
    blended = np.clip(blended, 0, 255).astype(np.uint8)
    final_img = Image.fromarray(blended)
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    final_img.save(out_path, format='JPEG', quality=90, optimize=True)
    return out_path

def build_deck():
    os.makedirs('processed_images', exist_ok=True)
    os.makedirs('slides_preview', exist_ok=True)
    
    ppt = win32com.client.Dispatch('PowerPoint.Application')
    ppt.Visible = 1
    
    pres = ppt.Presentations.Add(WithWindow=1)
    
    # 16:9 Widescreen (960 pt x 540 pt)
    pres.PageSetup.SlideWidth = 960
    pres.PageSetup.SlideHeight = 540
    
    total_slides = len(SLIDES_DATA)
    total_roman = "X"
    
    for idx, data in enumerate(SLIDES_DATA):
        slide = pres.Slides.Add(idx + 1, 12) # 12 = ppLayoutBlank
        
        # 1. Slide Cross-Fade Transition
        slide.SlideShowTransition.EntryEffect = 3844 # ppEffectFadeSmoothly
        slide.SlideShowTransition.Duration = 0.75
        slide.SlideShowTransition.AdvanceOnClick = -1 # msoTrue
        
        is_photo_left = (data["no"] % 2 == 0)
        
        # 2. Dark Leather Background (#2A1A0E)
        bg = slide.Shapes.AddShape(1, 0, 0, 960, 540) # 1 = msoShapeRectangle
        bg.Fill.Solid()
        bg.Fill.ForeColor.RGB = COLOR_LEATHER_BG
        bg.Line.Visible = 0
        
        # 3. Parchment Sheet Container (#FAF4E6)
        sheet_l = 28
        sheet_t = 16
        sheet_w = 904
        sheet_h = 508
        
        sheet = slide.Shapes.AddShape(5, sheet_l, sheet_t, sheet_w, sheet_h) # 5 = msoShapeRoundedRectangle
        sheet.Fill.Solid()
        sheet.Fill.ForeColor.RGB = COLOR_PARCHMENT
        sheet.Line.ForeColor.RGB = COLOR_MAROON
        sheet.Line.Weight = 2.5
        
        # Inner Gold Border
        inner_inset = 5
        inner_b = slide.Shapes.AddShape(5, sheet_l + inner_inset, sheet_t + inner_inset, sheet_w - (inner_inset * 2), sheet_h - (inner_inset * 2))
        inner_b.Fill.Background()
        inner_b.Line.ForeColor.RGB = COLOR_GOLD
        inner_b.Line.Weight = 0.75
        
        # Corner ❖ Flourishes
        corners = [
            (sheet_l + 9, sheet_t + 7),
            (sheet_l + sheet_w - 21, sheet_t + 7),
            (sheet_l + 9, sheet_t + sheet_h - 23),
            (sheet_l + sheet_w - 21, sheet_t + sheet_h - 23)
        ]
        for cx, cy in corners:
            cf = slide.Shapes.AddTextbox(1, cx, cy, 16, 16)
            set_zero_margins(cf.TextFrame)
            cf.TextFrame.TextRange.Text = "❖"
            cf.TextFrame.TextRange.Font.Name = FONT_SERIF
            cf.TextFrame.TextRange.Font.Size = 9.5
            cf.TextFrame.TextRange.Font.Color.RGB = COLOR_GOLD
            
        # 4. Header Section
        head_l = sheet_l + 22
        head_w = sheet_w - 44
        head_t = sheet_t + 16
        
        # Top Header Bar: Kicker + Folio Badge
        kicker_box = slide.Shapes.AddTextbox(1, head_l, head_t, 600, 18)
        set_zero_margins(kicker_box.TextFrame)
        kp = kicker_box.TextFrame.TextRange
        kp.Text = f"❖  {data['kicker']}"
        kp.Font.Name = FONT_SERIF
        kp.Font.Size = 9.5
        kp.Font.Bold = -1
        kp.Font.Color.RGB = COLOR_MAROON
        
        # Folio Badge
        badge_w = 140
        badge_h = 20
        badge_l = head_l + head_w - badge_w
        folio_b = slide.Shapes.AddShape(5, badge_l, head_t - 2, badge_w, badge_h)
        folio_b.Fill.Solid()
        folio_b.Fill.ForeColor.RGB = COLOR_CARD_PARCH
        folio_b.Line.ForeColor.RGB = COLOR_GOLD
        folio_b.Line.Weight = 0.75
        fp = folio_b.TextFrame.TextRange
        fp.ParagraphFormat.Alignment = 2 # Center
        fp.Text = f"FOLIO {data['roman']} DE {total_roman}"
        fp.Font.Name = FONT_SERIF
        fp.Font.Size = 8.5
        fp.Font.Bold = -1
        fp.Font.Color.RGB = COLOR_SUBTITLE_BROWN
        
        # Title
        title_t = head_t + 22
        title_box = slide.Shapes.AddTextbox(1, head_l, title_t, head_w, 32)
        title_box.TextFrame.WordWrap = -1
        set_zero_margins(title_box.TextFrame)
        tp = title_box.TextFrame.TextRange
        tp.Text = data['title']
        tp.Font.Name = FONT_TITLE
        tlen = len(data['title'])
        tp.Font.Size = 16 if tlen > 45 else (18 if tlen > 30 else 20)
        tp.Font.Bold = -1
        tp.Font.Color.RGB = COLOR_TEXT_DARK
        
        # Gold Divider Line
        div_t = title_t + 32
        div_line = slide.Shapes.AddShape(1, head_l, div_t + 4, head_w, 1)
        div_line.Fill.Solid()
        div_line.Fill.ForeColor.RGB = COLOR_GOLD
        div_line.Line.Visible = 0
        
        # Subtitle
        sub_t = div_t + 8
        sub_box = slide.Shapes.AddTextbox(1, head_l, sub_t, head_w, 18)
        sub_box.TextFrame.WordWrap = -1
        set_zero_margins(sub_box.TextFrame)
        sp = sub_box.TextFrame.TextRange
        sp.Text = data['sub']
        sp.Font.Name = FONT_SERIF
        sp.Font.Size = 10.5
        sp.Font.Italic = -1
        sp.Font.Color.RGB = COLOR_SUBTITLE_BROWN
        
        # 5. Main Body Geometry
        body_t = sub_t + 24
        body_h = 344
        gap = 20
        
        content_w = 515
        photo_w = head_w - content_w - gap # 325 pt
        
        if is_photo_left:
            photo_l = head_l
            content_l = head_l + photo_w + gap
        else:
            content_l = head_l
            photo_l = head_l + content_w + gap
            
        # ====================================================
        # 5A. PHOTO COLUMN
        # ====================================================
        has_quote = bool(data.get('quote'))
        
        # Photo Frame Container
        photo_frame = slide.Shapes.AddShape(5, photo_l, body_t, photo_w, body_h)
        photo_frame.Fill.Solid()
        photo_frame.Fill.ForeColor.RGB = COLOR_LEATHER_BG
        photo_frame.Line.ForeColor.RGB = COLOR_GOLD
        photo_frame.Line.Weight = 1.5
        
        # 4 Diamond Corner Studs (Inside Photo Frame corners)
        stud_sz = 7
        stud_coords = [
            (photo_l + 6, body_t + 6),
            (photo_l + photo_w - 13, body_t + 6),
            (photo_l + 6, body_t + body_h - 13),
            (photo_l + photo_w - 13, body_t + body_h - 13)
        ]
        for sx, sy in stud_coords:
            st = slide.Shapes.AddShape(12, sx, sy, stud_sz, stud_sz) # 12 = msoShapeDiamond
            st.Fill.Solid()
            st.Fill.ForeColor.RGB = COLOR_BRIGHT_GOLD
            st.Line.ForeColor.RGB = COLOR_MAROON
            st.Line.Weight = 0.5
            
        # Crop and embed photo
        img_inset = 10
        img_l = photo_l + img_inset
        img_t = body_t + img_inset
        img_w = photo_w - (img_inset * 2)
        img_h = 160 if has_quote else 225
        
        processed_img_path = os.path.abspath(f'processed_images/photo_slide_{data["no"]}.jpg')
        crop_and_process_photo(data['photo'], img_w, img_h, processed_img_path)
        
        if os.path.exists(processed_img_path):
            slide.Shapes.AddPicture(processed_img_path, 0, 1, img_l, img_t, img_w, img_h)
            
        # Archive Ribbon
        ribbon_w = 110
        ribbon_h = 18
        ribbon = slide.Shapes.AddShape(5, img_l + 6, img_t + 6, ribbon_w, ribbon_h)
        ribbon.Fill.Solid()
        ribbon.Fill.ForeColor.RGB = COLOR_LEATHER_BG
        ribbon.Line.ForeColor.RGB = COLOR_GOLD
        ribbon.Line.Weight = 0.75
        rp = ribbon.TextFrame.TextRange
        rp.ParagraphFormat.Alignment = 2
        rp.Text = f"ARCHIVE • CH. {data['roman']}"
        rp.Font.Name = FONT_SERIF
        rp.Font.Size = 7.5
        rp.Font.Bold = -1
        rp.Font.Color.RGB = COLOR_CARD_PARCH
        
        # Caption
        cap_t = img_t + img_h + 6
        cap_box = slide.Shapes.AddTextbox(1, img_l, cap_t, img_w, 40)
        cap_box.TextFrame.WordWrap = -1
        set_zero_margins(cap_box.TextFrame)
        cpp = cap_box.TextFrame.TextRange
        cpp.Text = data['caption']
        cpp.Font.Name = FONT_SERIF
        cpp.Font.Size = 9
        cpp.Font.Italic = -1
        cpp.Font.Color.RGB = COLOR_TEXT_LIGHT
        
        if data.get('credit'):
            c2 = cpp.InsertAfter(f"\n• {data['credit']}")
            c2.Font.Name = FONT_SERIF
            c2.Font.Size = 8
            c2.Font.Italic = -1
            c2.Font.Color.RGB = COLOR_PALE_GOLD
            
        # Dictum Quote Card
        quote_grp = None
        if has_quote:
            quote_t = body_t + body_h - 96
            quote_h = 86
            quote_bg = slide.Shapes.AddShape(5, img_l, quote_t, img_w, quote_h)
            quote_bg.Fill.Solid()
            quote_bg.Fill.ForeColor.RGB = COLOR_DARK_BROWN
            quote_bg.Line.ForeColor.RGB = COLOR_GOLD
            quote_bg.Line.Weight = 1
            
            qtf = quote_bg.TextFrame
            qtf.WordWrap = -1
            try:
                qtf.MarginLeft = 8
                qtf.MarginRight = 8
                qtf.MarginTop = 6
                qtf.MarginBottom = 4
            except Exception:
                pass
            
            qp = qtf.TextRange
            qp.Text = "❝ DICTUM MAHATMA GANDHI\n"
            qp.Font.Name = FONT_SERIF
            qp.Font.Size = 7.5
            qp.Font.Bold = -1
            qp.Font.Color.RGB = COLOR_BRIGHT_GOLD
            
            qp2 = qp.InsertAfter(f'"{data["quote"]}"')
            qp2.Font.Name = FONT_SERIF
            qp2.Font.Size = 9.5
            qp2.Font.Italic = -1
            qp2.Font.Color.RGB = COLOR_CARD_PARCH
            quote_grp = quote_bg
            
        # ====================================================
        # 5B. CONTENT / BULLET CARDS COLUMN
        # ====================================================
        points = data['points']
        num_points = len(points)
        has_highlight = bool(data.get('highlight'))

        if num_points <= 3:
            card_gap = 14
            card_h = 58
            pt_font_sz = 11.5
        elif num_points == 4:
            card_gap = 10
            card_h = 52
            pt_font_sz = 11.0
        elif num_points == 5:
            card_gap = 8
            card_h = 46
            pt_font_sz = 10.5
        else: # 6 points
            card_gap = 6
            card_h = 42
            pt_font_sz = 9.5

        card_groups = []
        for p_idx, point_text in enumerate(points):
            cur_card_t = body_t + (p_idx * (card_h + card_gap))

            # Card Outer Box
            c_bg = slide.Shapes.AddShape(5, content_l, cur_card_t, content_w, card_h)
            c_bg.Fill.Solid()
            c_bg.Fill.ForeColor.RGB = COLOR_CARD_PARCH
            c_bg.Line.ForeColor.RGB = COLOR_GOLD
            c_bg.Line.Weight = 0.75

            # Badge - cleanly inset from left rounded corner
            badge_sz = min(24, card_h - 14)
            badge_inset_t = cur_card_t + ((card_h - badge_sz) / 2)
            badge_l = content_l + 12
            nb = slide.Shapes.AddShape(5, badge_l, badge_inset_t, badge_sz, badge_sz)
            nb.Fill.Solid()
            nb.Fill.ForeColor.RGB = COLOR_MAROON
            nb.Line.ForeColor.RGB = COLOR_GOLD
            nb.Line.Weight = 0.75
            set_zero_margins(nb.TextFrame)
            try:
                nb.TextFrame.VerticalAnchor = 3 # msoAnchorMiddle
            except Exception:
                pass
            nbp = nb.TextFrame.TextRange
            nbp.ParagraphFormat.Alignment = 2
            nbp.Text = str(p_idx + 1)
            nbp.Font.Name = FONT_SERIF
            nbp.Font.Size = 9.5
            nbp.Font.Bold = -1
            nbp.Font.Color.RGB = COLOR_CARD_PARCH

            # Text Box - spanning the full height of the card with vertical center alignment
            tb_l = badge_l + badge_sz + 12
            tb_w = content_w - (tb_l - content_l) - 12
            tb_t = cur_card_t
            tb_h = card_h

            tb = slide.Shapes.AddTextbox(1, tb_l, tb_t, tb_w, tb_h)
            tb.TextFrame.WordWrap = -1
            set_zero_margins(tb.TextFrame)

            tbp = tb.TextFrame.TextRange
            tbp.Text = point_text
            tbp.Font.Name = FONT_BODY
            tbp.Font.Size = pt_font_sz
            tbp.Font.Color.RGB = COLOR_TEXT_DARK

            tb.TextFrame.AutoSize = 0 # ppAutoSizeNone
            tb.Height = card_h
            try:
                tb.TextFrame.VerticalAnchor = 3 # msoAnchorMiddle
                tb.TextFrame2.VerticalAnchor = 3
            except Exception:
                pass

            # Group card elements to lock layout permanently as atomic unit
            grp = slide.Shapes.Range([c_bg.Name, nb.Name, tb.Name]).Group()
            card_groups.append(grp)

        # Highlight Banner (Slide 1 & Slide 10)
        hl_grp = None
        if has_highlight:
            hl_t = body_t + body_h - 38
            hl_box = slide.Shapes.AddShape(5, content_l, hl_t, content_w, 38)
            hl_box.Fill.Solid()
            hl_box.Fill.ForeColor.RGB = COLOR_LEATHER_BG
            hl_box.Line.ForeColor.RGB = COLOR_GOLD
            hl_box.Line.Weight = 1.5
            set_zero_margins(hl_box.TextFrame)
            try:
                hl_box.TextFrame.VerticalAnchor = 3 # msoAnchorMiddle
            except Exception:
                pass

            hlp = hl_box.TextFrame.TextRange
            hlp.ParagraphFormat.Alignment = 2
            hlp.Text = f"❖   {data['highlight'].upper()}       —       IN MEMORIAM MAHATMA GANDHI"
            hlp.Font.Name = FONT_SERIF
            hlp.Font.Size = 9.5
            hlp.Font.Bold = -1
            hlp.Font.Color.RGB = COLOR_BRIGHT_GOLD
            hl_grp = hl_box

        # 6. Ornate Footer Row
        foot_t = sheet_t + sheet_h - 22
        foot_w = head_w

        ft_line = slide.Shapes.AddShape(1, head_l, foot_t - 2, foot_w, 1)
        ft_line.Fill.Solid()
        ft_line.Fill.ForeColor.RGB = COLOR_MAROON
        ft_line.Line.Visible = 0

        fl_box = slide.Shapes.AddTextbox(1, head_l + 10, foot_t + 1, 240, 16)
        set_zero_margins(fl_box.TextFrame)
        flp = fl_box.TextFrame.TextRange
        flp.Text = "❖  GANDHI JAYANTI • II OCTOBER"
        flp.Font.Name = FONT_SERIF
        flp.Font.Size = 7.5
        flp.Font.Bold = -1
        flp.Font.Color.RGB = COLOR_MAROON

        fc_box = slide.Shapes.AddTextbox(1, head_l + 240, foot_t + 1, 380, 16)
        set_zero_margins(fc_box.TextFrame)
        fcp = fc_box.TextFrame.TextRange
        fcp.ParagraphFormat.Alignment = 2
        fcp.Text = "TRUTH  •  NON-VIOLENCE  •  PEACE  •  DIGNITY"
        fcp.Font.Name = FONT_SERIF
        fcp.Font.Size = 7.5
        fcp.Font.Bold = -1
        fcp.Font.Color.RGB = COLOR_MAROON

        fr_box = slide.Shapes.AddTextbox(1, head_l + foot_w - 180, foot_t + 1, 170, 16)
        set_zero_margins(fr_box.TextFrame)
        frp = fr_box.TextFrame.TextRange
        frp.ParagraphFormat.Alignment = 3 # Right
        frp.Text = f"FOLIO {data['roman']} / {total_roman}  ❖"
        frp.Font.Name = FONT_SERIF
        frp.Font.Size = 7.5
        frp.Font.Bold = -1
        frp.Font.Color.RGB = COLOR_SUBTITLE_BROWN
        
        # ====================================================
        # 7. NATIVE ANIMATIONS SEQUENCE
        # ====================================================
        # Sequential Staggered Fade-in for Bullet Point Cards
        for c_i, grp_item in enumerate(card_groups):
            eff = slide.TimeLine.MainSequence.AddEffect(grp_item, 10, 0, 3) # Fade, AfterPrevious
            eff.Timing.Duration = 0.35
            eff.Timing.TriggerDelayTime = 0.08
            
        if hl_grp:
            eff_hl = slide.TimeLine.MainSequence.AddEffect(hl_grp, 10, 0, 3)
            eff_hl.Timing.Duration = 0.35
            eff_hl.Timing.TriggerDelayTime = 0.08
            
        if quote_grp:
            eff_q = slide.TimeLine.MainSequence.AddEffect(quote_grp, 10, 0, 3)
            eff_q.Timing.Duration = 0.35
            eff_q.Timing.TriggerDelayTime = 0.08

        # Export high-res preview image for visual verification
        preview_file = os.path.abspath(f'slides_preview/slide_{data["no"]}.png')
        slide.Export(preview_file, 'PNG', 1920, 1080)
        print(f"Generated Slide {data['no']} / 10 -> {preview_file}")
        
    out_pptx = os.path.abspath('gandhi-presentation.pptx')
    pres.SaveAs(out_pptx)
    pres.Close()
    ppt.Quit()
    print(f"SUCCESS: Saved Native PowerPoint Presentation -> {out_pptx}")

if __name__ == '__main__':
    build_deck()
