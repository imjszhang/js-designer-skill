# Generate board presentation slides using dall-e-2 via LLMCORE
# 运行前设置: $env:OPENAI_API_KEY, 可选 $env:OPENAI_API_BASE / OPENAI_API_BASE_BACKUP / OPENAI_API_KEY_BACKUP
$repoRoot = Split-Path $PSScriptRoot -Parent
$apiKey = $env:OPENAI_API_KEY
$baseUrl = if ($env:OPENAI_API_BASE) { $env:OPENAI_API_BASE } else { "https://api.openai.com/v1" }

if (-not $apiKey) {
    Write-Error "请设置环境变量 OPENAI_API_KEY"
    exit 1
}

$slides = @(
    @{
        name = "Slide 4 - 历史复盘"
        session = "board-v2-04"
        prompt = "AIPOCH presentation slide, Frame layout, 16:9 safe frame. Warm #FCFCFA canvas. Title: 历史复盘. Horizontal timeline with three equal stages: 岗位化 2006-2012, 工业化 2013-2017, 中台化 2018-2022. Lucide-style outline icons. One #FBDD67 accent only. No global hard shadows."
    },
    @{
        name = "Slide 5 - 康威定律"
        session = "board-v2-05"
        prompt = "AIPOCH presentation slide, Split layout, 16:9 safe frame. Warm #FCFCFA canvas. Title: 康威定律的现实. Left organizational chart, right fragmented architecture, dashed connectors. One #FBDD67 accent only."
    },
    @{
        name = "Slide 8 - AI产品经理对比传统PM"
        session = "board-v2-08"
        prompt = "AIPOCH presentation slide, Split layout, 16:9 safe frame. Warm #FCFCFA canvas. Left 传统PM waterfall, right AI产品经理 loop. One #FBDD67 accent on the loop only."
    },
    @{
        name = "Slide 9 - 微型生产线"
        session = "board-v2-09"
        prompt = "AIPOCH presentation slide, Hero process diagram, 16:9 safe frame. Warm #FCFCFA canvas. Title: 微型生产线. One directional flow of small autonomous teams to end users. Lucide-style nodes. One #FBDD67 accent only."
    },
    @{
        name = "Slide 10 - 我们招什么样的人"
        session = "board-v2-10"
        prompt = "AIPOCH presentation slide, two-by-two Frame layout, 16:9 safe frame. Warm #FCFCFA canvas. Title: 我们招什么样的人. Four equal modules numbered 1-4. Lucide-style icons. One #FBDD67 highlight only."
    }
)

# 可选备用 API（通过环境变量配置）
$localLanUrl = $env:OPENAI_API_BASE_BACKUP
$localLanKey = $env:OPENAI_API_KEY_BACKUP

function Generate-Slide {
    param(
        [string]$ImageUrl,
        [string]$ApiKey,
        [string]$Session,
        [string]$SlideName,
        [string]$Prompt
    )
    
    Write-Host "Generating: $SlideName"
    
    $body = @{
        model = "dall-e-2"
        prompt = $Prompt
        n = 1
        size = "1024x1024"
    } | ConvertTo-Json
    
    Write-Host "  Requesting image generation..."
    
    try {
        $response = Invoke-RestMethod -Uri "$ImageUrl/images/generations" `
            -Headers @{ "Authorization" = "Bearer $ApiKey"; "Content-Type" = "application/json" } `
            -Body $body -Method Post -UseBasicParsing -TimeoutSec 120
        
        $imageUrl = $response.data[0].url
        
        if ($imageUrl) {
            $outputDir = Join-Path $repoRoot "work_dir\generated_images_gpt_image_2\$Session"
            if (-not (Test-Path $outputDir)) {
                New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
            }
            
            $outputPath = Join-Path $outputDir "01.png"
            Write-Host "  Downloading to: $outputPath"
            
            Invoke-WebRequest -Uri $imageUrl -OutFile $outputPath -UseBasicParsing -TimeoutSec 60
            Write-Host "  SUCCESS: $outputPath"
            return $true
        }
        else {
            Write-Host "  FAILED: No URL in response"
            return $false
        }
    }
    catch {
        Write-Host "  ERROR: $_"
        return $false
    }
}

# Try LLMCORE first (has dall-e-2)
$apiUrl = $baseUrl

Write-Host "=== Using LLMCORE API ($apiUrl) ===" -ForegroundColor Cyan

foreach ($slide in $slides) {
    Write-Host ""
    $result = Generate-Slide -ImageUrl $apiUrl -ApiKey $apiKey -Session $slide.session -SlideName $slide.name -Prompt $slide.prompt
    
    if (-not $result -and $localLanUrl -and $localLanKey) {
        Write-Host "  Trying with backup API..." -ForegroundColor Yellow
        $result = Generate-Slide -ImageUrl $localLanUrl -ApiKey $localLanKey -Session $slide.session -SlideName $slide.name -Prompt $slide.prompt
    }
    
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Green
Get-ChildItem (Join-Path $repoRoot "work_dir\generated_images_gpt_image_2") -Recurse -Filter "*.png"
