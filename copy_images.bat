@echo off
setlocal
set BRAIN=C:\Users\Jaideep\.gemini\antigravity\brain\466d5ab5-0a7d-44ff-955a-13ded5b9d7cd
set DEST=%~dp0images

if not exist "%DEST%" mkdir "%DEST%"

echo Copying images...
copy /Y "%BRAIN%\hero_ayurveda_1772894613023.png"   "%DEST%\hero_ayurveda.png"
copy /Y "%BRAIN%\doctor_portrait_1772894632305.png" "%DEST%\doctor_portrait.png"
copy /Y "%BRAIN%\kati_basti_1772894654087.png"      "%DEST%\kati_basti.png"
copy /Y "%BRAIN%\shirodhara_1772894671590.png"      "%DEST%\shirodhara.png"
copy /Y "%BRAIN%\panchakarma_1772894698526.png"     "%DEST%\panchakarma.png"
copy /Y "%BRAIN%\herbal_medicine_1772894718217.png" "%DEST%\herbal_medicine.png"
copy /Y "%BRAIN%\massage_therapy_1772894732954.png" "%DEST%\massage_therapy.png"
copy /Y "%BRAIN%\virechan_1772894748674.png"        "%DEST%\virechan.png"

echo.
echo Done! Images copied:
dir "%DEST%\*.png" /B
pause
