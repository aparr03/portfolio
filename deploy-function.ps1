# PowerShell script to deploy Supabase Edge Function

# Check if supabase CLI is in the path
if (Get-Command "supabase" -ErrorAction SilentlyContinue) {
    Write-Host "Found Supabase CLI in PATH"
    $supabase = "supabase"
} else {
    Write-Host "Using npx to run Supabase CLI"
    $supabase = "npx supabase"
}

# Step 1: Login
Write-Host "Step 1: Logging in to Supabase..."
Invoke-Expression "$supabase login"
Write-Host "After logging in, press Enter to continue..."
Read-Host

# Step 2: Link project
Write-Host "Step 2: Linking to your Supabase project..."
Invoke-Expression "$supabase link --project-ref ikkpkkfzjvmshbaleazq"

# Step 3: Deploy function
Write-Host "Step 3: Deploying the Edge Function..."
Invoke-Expression "$supabase functions deploy send-email --no-verify-jwt"

# Step 4: Set environment variables
Write-Host "Step 4: Setting up environment variables..."
$resendApiKey = Read-Host "Enter your Resend API Key" -AsSecureString
$email = Read-Host "Enter your email address"

$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($resendApiKey)
$resendApiKeyPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)

Invoke-Expression "$supabase secrets set RESEND_API_KEY=$resendApiKeyPlain YOUR_EMAIL=$email"

Write-Host "Deployment complete!"
Write-Host "Next steps:"
Write-Host "1. Go to Supabase SQL Editor and run the SQL from supabase/setup.sql"
Write-Host "2. Test your form to make sure everything works" 