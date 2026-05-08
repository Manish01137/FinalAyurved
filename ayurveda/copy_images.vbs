Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")

brain = "C:\Users\Jaideep\.gemini\antigravity\brain\466d5ab5-0a7d-44ff-955a-13ded5b9d7cd\"
dest  = fso.GetParentFolderName(WScript.ScriptFullName) & "\images\"

If Not fso.FolderExists(dest) Then fso.CreateFolder(dest)

files = Array( _
  Array("hero_ayurveda_1772894613023.png",   "hero_ayurveda.png"), _
  Array("doctor_portrait_1772894632305.png",  "doctor_portrait.png"), _
  Array("kati_basti_1772894654087.png",       "kati_basti.png"), _
  Array("shirodhara_1772894671590.png",       "shirodhara.png"), _
  Array("panchakarma_1772894698526.png",      "panchakarma.png"), _
  Array("herbal_medicine_1772894718217.png",  "herbal_medicine.png"), _
  Array("massage_therapy_1772894732954.png",  "massage_therapy.png"), _
  Array("virechan_1772894748674.png",         "virechan.png") _
)

ok   = 0
miss = 0
For Each f In files
  src = brain & f(0)
  dst = dest & f(1)
  If fso.FileExists(src) Then
    fso.CopyFile src, dst, True
    ok = ok + 1
  Else
    miss = miss + 1
  End If
Next

MsgBox "Done! " & ok & " images copied to /images" & Chr(10) & _
       miss & " files not found." & Chr(10) & Chr(10) & dest, 64, "Aksharam Ayurved – Images"
