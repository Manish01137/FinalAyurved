$src = 'C:\Users\Jaideep\.gemini\antigravity\brain\466d5ab5-0a7d-44ff-955a-13ded5b9d7cd'
$dst = 'C:\Users\Jaideep\Desktop\client 1\images'

$files = @(
    @{ Src = 'hero_ayurveda_1772890518603.png'; Dst = 'hero_ayurveda.png' },
    @{ Src = 'doctor_portrait_1772890535104.png'; Dst = 'doctor_portrait.png' },
    @{ Src = 'kati_basti_1772890550549.png'; Dst = 'kati_basti.png' },
    @{ Src = 'shirodhara_1772890567847.png'; Dst = 'shirodhara.png' },
    @{ Src = 'panchakarma_treatment_1772890591656.png'; Dst = 'panchakarma.png' },
    @{ Src = 'herbal_medicine_1772890606873.png'; Dst = 'herbal_medicine.png' },
    @{ Src = 'massage_therapy_1772890621502.png'; Dst = 'massage_therapy.png' },
    @{ Src = 'virechan_treatment_1772890638018.png'; Dst = 'virechan.png' }
)

foreach ($f in $files) {
    $srcPath = Join-Path $src $f.Src
    $dstPath = Join-Path $dst $f.Dst
    if (Test-Path $srcPath) {
        Copy-Item $srcPath $dstPath -Force
        Write-Host "Copied: $($f.Dst)"
    } else {
        Write-Host "NOT FOUND: $($f.Src)"
    }
}
Write-Host "Done"
