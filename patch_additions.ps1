# PowerShell script to apply additions and replacements for Stackly Project

Write-Host "--- 1. Adding Back to Home buttons to Login and Signup ---"

# login.html Back to Home
if (Test-Path "login.html") {
    $content = Get-Content "login.html" -Raw -Encoding utf8
    $target = '<div class="auth-footer">`n        Don''t have an account\? <a href="signup.html" class="text-orange" style="font-weight: 600; text-decoration: none;">Create one</a>`n      </div>'
    
    # We will use simple replacement for stability
    $oldText = '<div class="auth-footer">
        Don''t have an account? <a href="signup.html" class="text-orange" style="font-weight: 600; text-decoration: none;">Create one</a>
      </div>'
      
    $newText = '<div class="auth-footer">
        Don''t have an account? <a href="signup.html" class="text-orange" style="font-weight: 600; text-decoration: none;">Create one</a>
      </div>
      <div style="text-align: center; margin-top: 16px; border-top: 1px solid var(--border); padding-top: 16px;">
        <a href="index.html" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 8px;"><i class="ph ph-arrow-left"></i> Back to Home</a>
      </div>'
      
    if ($content.Contains($oldText) -and -not $content.Contains("Back to Home")) {
        $content = $content.Replace($oldText, $newText)
        Set-Content "login.html" -Value $content -Encoding utf8
        Write-Host "Successfully added Back to Home button to login.html"
    } else {
        Write-Host "Skipped or already applied login.html patch"
    }
}

# signup.html Back to Home
if (Test-Path "signup.html") {
    $content = Get-Content "signup.html" -Raw -Encoding utf8
    $oldText = '        <div style="text-align: center; margin-top: 24px; font-size: 0.875rem;">
          Already have an account? <a href="login.html" class="text-orange" style="font-weight: 600; text-decoration: none;">Sign In</a>
        </div>
      </form>'
      
    $newText = '        <div style="text-align: center; margin-top: 24px; font-size: 0.875rem;">
          Already have an account? <a href="login.html" class="text-orange" style="font-weight: 600; text-decoration: none;">Sign In</a>
        </div>
      </form>
      <div style="text-align: center; margin-top: 16px; border-top: 1px solid var(--border); padding-top: 16px;">
        <a href="index.html" class="btn btn-outline" style="padding: 8px 16px; font-size: 0.875rem; display: inline-flex; align-items: center; gap: 8px;"><i class="ph ph-arrow-left"></i> Back to Home</a>
      </div>'
      
    if ($content.Contains($oldText) -and -not $content.Contains("Back to Home")) {
        $content = $content.Replace($oldText, $newText)
        Set-Content "signup.html" -Value $content -Encoding utf8
        Write-Host "Successfully added Back to Home button to signup.html"
    } else {
        Write-Host "Skipped or already applied signup.html patch"
    }
}


Write-Host "--- 2. Fixing Event Page Wedding and Cultural Icons ---"
if (Test-Path "events.html") {
    $content = Get-Content "events.html" -Raw -Encoding utf8
    
    # Replace broken ph-rings Weddings icon
    $content = $content.Replace('<i class="ph-fill ph-rings"></i><span>Weddings</span>', '<i class="ph-fill ph-heart"></i><span>Weddings</span>')
    # Replace broken ph-lantern Cultural icon
    $content = $content.Replace('<i class="ph-fill ph-lantern"></i><span>Cultural</span>', '<i class="ph-fill ph-palette"></i><span>Cultural</span>')
    
    Set-Content "events.html" -Value $content -Encoding utf8
    Write-Host "Patched icons in events.html"
}


Write-Host "--- 3. Redirecting 404 links to working HTML pages ---"

# index.html
if (Test-Path "index.html") {
    $content = Get-Content "index.html" -Raw -Encoding utf8
    # Hero buttons
    $content = $content.Replace('href="404.html" class="btn btn-primary">`n            Book an Event', 'href="booking.html" class="btn btn-primary">`n            Book an Event')
    $content = $content.Replace('href="404.html" class="btn btn-outline">`n            Explore Services', 'href="services.html" class="btn btn-outline">`n            Explore Services')
    # Learn More buttons
    $content = $content.Replace('<a href="404.html" class="btn btn-outline btn-sm">Learn More</a>', '<a href="services.html" class="btn btn-outline btn-sm">Learn More</a>')
    # Featured events
    $content = $content.Replace('href="404.html" class="btn btn-primary btn-sm">Book Now</a>', 'href="booking.html" class="btn btn-primary btn-sm">Book Now</a>')
    $content = $content.Replace('href="404.html" class="btn btn-primary btn-sm">Register</a>', 'href="booking.html" class="btn btn-primary btn-sm">Register</a>')
    
    Set-Content "index.html" -Value $content -Encoding utf8
    Write-Host "Redirected 404 links in index.html"
}

# services.html
if (Test-Path "services.html") {
    $content = Get-Content "services.html" -Raw -Encoding utf8
    $content = $content.Replace('href="404.html" class="btn btn-primary">Book a Consultation', 'href="booking.html" class="btn btn-primary">Book a Consultation')
    $content = $content.Replace('href="404.html" class="btn btn-outline btn-sm">View Details</a>', 'href="booking.html" class="btn btn-outline btn-sm">View Details</a>')
    
    Set-Content "services.html" -Value $content -Encoding utf8
    Write-Host "Redirected 404 links in services.html"
}

# events.html
if (Test-Path "events.html") {
    $content = Get-Content "events.html" -Raw -Encoding utf8
    $content = $content.Replace('href="404.html" class="btn btn-primary">Reserve a Seat', 'href="booking.html" class="btn btn-primary">Reserve a Seat')
    $content = $content.Replace('href="404.html" class="btn btn-primary btn-sm">Book Now</a>', 'href="booking.html" class="btn btn-primary btn-sm">Book Now</a>')
    $content = $content.Replace('href="404.html" class="btn btn-primary btn-sm">Register</a>', 'href="booking.html" class="btn btn-primary btn-sm">Register</a>')
    
    Set-Content "events.html" -Value $content -Encoding utf8
    Write-Host "Redirected 404 links in events.html"
}

# event-details.html
if (Test-Path "event-details.html") {
    $content = Get-Content "event-details.html" -Raw -Encoding utf8
    $content = $content.Replace('href="404.html" class="btn btn-primary" style="width: 100%;">Book Ticket Now', 'href="booking.html" class="btn btn-primary" style="width: 100%;">Book Ticket Now')
    $content = $content.Replace('onclick="window.location.href=''404.html''"', 'onclick="window.location.href=''contact.html''"')
    
    Set-Content "event-details.html" -Value $content -Encoding utf8
    Write-Host "Redirected 404 links in event-details.html"
}

# booking.html success redirection
if (Test-Path "booking.html") {
    $content = Get-Content "booking.html" -Raw -Encoding utf8
    $content = $content.Replace("window.location.href = '404.html';", "window.location.href = 'user-dashboard.html';")
    Set-Content "booking.html" -Value $content -Encoding utf8
    Write-Host "Redirected successful booking path to dashboard in booking.html"
}


Write-Host "--- 4. Refining Dashboard CSS for absolute mobile alignment ---"
$dashboards = @("user-dashboard.html", "admin-dashboard.html")
foreach ($dName in $dashboards) {
    if (Test-Path $dName) {
        $content = Get-Content $dName -Raw -Encoding utf8
        
        # Ensure canvas elements fit properly
        # Make topbar text and layout bulletproof
        $d_overrides = @"

    /* Dashboard mobile overrides for perfect alignment and zero overflow */
    canvas {
      max-width: 100% !important;
      height: auto !important;
    }
    @media (max-width: 768px) {
      .topbar h2 {
        font-size: 1rem !important;
      }
      .user-profile img {
        width: 32px !important;
        height: 32px !important;
      }
      .dashboard-container {
        padding: 10px !important;
      }
      .card {
        padding: 12px !important;
      }
    }
"@
        if (-not $content.Contains("Dashboard mobile overrides")) {
            $content = $content.Replace('</style>', "$d_overrides`n  </style>")
        }
        
        Set-Content $dName -Value $content -Encoding utf8
        Write-Host "Applied absolute mobile fixes in $dName"
    }
}

Write-Host "All additions completed!"
