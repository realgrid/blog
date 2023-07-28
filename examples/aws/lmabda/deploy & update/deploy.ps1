Get-ChildItem -Directory -Exclude 'lib', '.', '.vscode', '.git' | ForEach-Object {
    $function_name = $_.Name
    Write-Host "Deploying $function_name ..."

    Set-Location -Path $_.FullName

    # 필요한 경우에만
    # npm install

    Compress-Archive -Path "../lib/*", "*.*" -DestinationPath "archive.zip"
    $env:AWS_PAGER="" ; aws lambda create-function --region ap-northeast-2 --function-name $function_name --zip-file fileb://archive.zip --handler index.handler --runtime nodejs16.x --role YOUR_IAM_ROLE_ARN --architectures arm64 --no-paginate
    Remove-Item -Path "archive.zip"
    Set-Location -Path ..
}
