"""
Run this once to copy images from the brain directory into /images.
Double-click in File Explorer or run: python copy_images.py
"""
import shutil, os, sys

BRAIN = r"C:\Users\Jaideep\.gemini\antigravity\brain\466d5ab5-0a7d-44ff-955a-13ded5b9d7cd"
DEST  = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
os.makedirs(DEST, exist_ok=True)

# Newest files first (the regenerated ones have higher timestamps)
COPIES = [
    ("hero_ayurveda_1772894613023.png",  "hero_ayurveda.png"),
    ("doctor_portrait_1772894632305.png", "doctor_portrait.png"),
    ("kati_basti_1772894654087.png",      "kati_basti.png"),
    ("shirodhara_1772894671590.png",      "shirodhara.png"),
    ("panchakarma_1772894698526.png",     "panchakarma.png"),
    ("herbal_medicine_1772894718217.png", "herbal_medicine.png"),
    ("massage_therapy_1772894732954.png", "massage_therapy.png"),
    ("virechan_1772894748674.png",        "virechan.png"),
]

ok, fail = 0, 0
for src_name, dst_name in COPIES:
    src = os.path.join(BRAIN, src_name)
    dst = os.path.join(DEST, dst_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"  OK  {dst_name}")
        ok += 1
    else:
        print(f"  MISS {src_name}")
        fail += 1

print(f"\nDone: {ok} copied, {fail} not found.")
