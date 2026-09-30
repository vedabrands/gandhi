import os
import shutil

bundle_dir = r"C:\Users\dev\gandhi\gandhi-project-bundle"
if os.path.exists(bundle_dir):
    shutil.rmtree(bundle_dir)

os.makedirs(bundle_dir, exist_ok=True)

# 1. Copy web dist
shutil.copytree(r"C:\Users\dev\gandhi\dist", os.path.join(bundle_dir, "web-app"))

# 2. Copy PPTX presentation
shutil.copy2(r"C:\Users\dev\gandhi\gandhi-presentation.pptx", os.path.join(bundle_dir, "Gandhi-Jayanti-Presentation.pptx"))

# 3. Copy Slide Previews
if os.path.exists(r"C:\Users\dev\gandhi\slides_preview"):
    shutil.copytree(r"C:\Users\dev\gandhi\slides_preview", os.path.join(bundle_dir, "slide-previews"))

# 4. Create launcher batch file
launcher_bat = os.path.join(bundle_dir, "Start-Presentation-Web.bat")
with open(launcher_bat, "w") as f:
    f.write("@echo off\n")
    f.write("echo Starting Gandhi Jayanti Presentation...\n")
    f.write('start "" "%~dp0web-app\\index.html"\n')

readme_txt = os.path.join(bundle_dir, "README.txt")
with open(readme_txt, "w", encoding="utf-8") as f:
    f.write("========================================================\n")
    f.write("  MAHATMA GANDHI JAYANTI PRESENTATION BUNDLE\n")
    f.write("  Presenter: Dev Vashisht\n")
    f.write("========================================================\n\n")
    f.write("CONTENTS:\n")
    f.write("1. Gandhi-Jayanti-Presentation.pptx\n")
    f.write("   - Native Microsoft PowerPoint Presentation (16:9 widescreen)\n")
    f.write("   - Medieval manuscript parchment theme with leather background\n")
    f.write("   - Smooth cross-fade slide transitions & staggered fade animations\n\n")
    f.write("2. web-app/\n")
    f.write("   - Interactive Web Presentation (Vite + React + Framer Motion)\n")
    f.write('   - Double-click "Start-Presentation-Web.bat" or open web-app/index.html\n')
    f.write('   - Press "M" to toggle Slide Deck Mode / Scroll Mode\n\n')
    f.write("3. slide-previews/\n")
    f.write("   - High-resolution (1920x1080) PNG preview images of all 10 slides\n")

print("Created project folder:", bundle_dir)
for item in os.listdir(bundle_dir):
    print(" -", item)
