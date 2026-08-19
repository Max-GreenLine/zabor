# Сборка: body.html + styles.css + app.js -> index.html (хостинг) и dist/artifact.html (публикация)
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$css  = Get-Content "$root\styles.css" -Raw -Encoding UTF8
$js   = Get-Content "$root\app.js"     -Raw -Encoding UTF8
$body = Get-Content "$root\body.html"  -Raw -Encoding UTF8
$title = "Заборы на сваях · Сыктывкар"

$index = @"
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$title</title>
<meta name="description" content="Монтаж заборов на винтовых сваях под ключ в Сыктывкаре: профлист, евроштакетник, рабица. Реальная цена за метр, смета в договоре, монтаж за 1–2 дня круглый год.">
<link rel="stylesheet" href="styles.css">
</head>
<body>
$body
<script src="app.js"></script>
</body>
</html>
"@

# картинки кейсов -> base64 для артефакта
$imgs = @(Get-ChildItem "$root\img\cases\*.jpg") + @(Get-ChildItem "$root\img\sketch.svg") | ForEach-Object {
  $mime = if ($_.Extension -eq ".svg") { "image/svg+xml" } else { "image/jpeg" }
  '"' + $_.Name + '":"data:' + $mime + ';base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($_.FullName)) + '"'
}
$imgMap = "<script>window.CASE_IMG={" + ($imgs -join ",") + "};</script>"

$artifact = @"
<title>$title</title>
$imgMap
<style>
$css
</style>
$body
<script>
$js
</script>
"@

# автономный файл: открывается двойным кликом, всё вшито (для отправки в мессенджер)
$standalone = @"
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$title</title>
$imgMap
<style>
$css
</style>
</head>
<body>
$body
<script>
$js
</script>
</body>
</html>
"@

$utf8 = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText("$root\index.html", $index, $utf8)
New-Item -ItemType Directory -Force "$root\dist" | Out-Null
[IO.File]::WriteAllText("$root\dist\artifact.html", $artifact, $utf8)
[IO.File]::WriteAllText("$root\dist\zabory-site.html", $standalone, $utf8)
Write-Host "built: index.html, dist/artifact.html, dist/zabory-site.html"
