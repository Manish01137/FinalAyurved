import shutil
import os

src = r'C:\Users\Jaideep\.gemini\antigravity\brain\466d5ab5-0a7d-44ff-955a-13ded5b9d7cd'
dst = r'C:\Users\Jaideep\Desktop\client 1\images'

os.makedirs(dst, exist_ok=True)

files = [
    ('hero_ayurveda_1772890518603.png', 'hero_ayurveda.png'),
    ('doctor_portrait_1772890535104.png', 'doctor_portrait.png'),
    ('kati_basti_1772890550549.png', 'kati_basti.png'),
    ('shirodhara_1772890567847.png', 'shirodhara.png'),
    ('panchakarma_treatment_1772890591656.png', 'panchakarma.png'),
    ('herbal_medicine_1772890606873.png', 'herbal_medicine.png'),
    ('massage_therapy_1772890621502.png', 'massage_therapy.png'),
    ('virechan_treatment_1772890638018.png', 'virechan.png'),
]

for s, d in files:
    src_path = os.path.join(src, s)
    dst_path = os.path.join(dst, d)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f'Copied: {d}')
    else:
        print(f'NOT FOUND: {s}')

print('Done. Files in images dir:', os.listdir(dst))
