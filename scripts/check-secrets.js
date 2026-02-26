#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

const PATTERNS = [
  { name: 'Discord Webhook URL',            pattern: /discord\.com\/api\/webhooks\//i },
  { name: 'Slack Webhook URL',              pattern: /hooks\.slack\.com\/services\//i },
  { name: 'GitHub Personal Access Token',   pattern: /ghp_[A-Za-z0-9]{36}/ },
  { name: 'GitHub OAuth Token',             pattern: /gho_[A-Za-z0-9]{36}/ },
  { name: 'AWS Access Key ID',              pattern: /AKIA[0-9A-Z]{16}/ },
  { name: 'AWS Secret Access Key',          pattern: /aws[_\-]?secret[_\-]?access[_\-]?key\s*[:=]\s*['"]?[A-Za-z0-9\/+]{40}/i },
  { name: 'Generic API Key (assignment)',   pattern: /api[_\-]?key\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i },
  { name: 'Generic Token (assignment)',     pattern: /token\s*[:=]\s*['"][A-Za-z0-9_\-\.]{16,}['"]/i },
  { name: 'Generic Password (assignment)',  pattern: /password\s*[:=]\s*['"][^'"]{4,}['"]/i },
  { name: 'Generic Secret (assignment)',    pattern: /secret\s*[:=]\s*['"][A-Za-z0-9_\-!@#$%^&*]{8,}['"]/i },
  { name: 'Private Key Header',             pattern: /-----BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { name: 'Bearer Token in code',           pattern: /Authorization\s*:\s*['"`]Bearer\s+[A-Za-z0-9_\-\.]{20,}/i },
];

// .envファイル自体がステージされていないか確認
function checkEnvFileStaged(stagedFiles) {
  // .env.example / .env.sample は許可
  const envFiles = stagedFiles.filter(f => /^\.env(\..+)?$/.test(f.split('/').pop()) && !/\.(example|sample|template)$/.test(f));
  if (envFiles.length > 0) {
    envFiles.forEach(f => console.error(`[check-secrets] .env ファイルがステージされています: ${f}`));
    return true;
  }
  return false;
}

// ステージされたファイル一覧を取得
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACMR')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

if (stagedFiles.length === 0) {
  process.exit(0);
}

let blocked = false;

if (checkEnvFileStaged(stagedFiles)) {
  blocked = true;
}

for (const file of stagedFiles) {
  if (!fs.existsSync(file)) continue;

  let content;
  try {
    content = fs.readFileSync(file, 'utf-8');
  } catch {
    continue; // バイナリファイルはスキップ
  }

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const { name, pattern } of PATTERNS) {
      if (pattern.test(lines[i])) {
        console.error(`[check-secrets] ${name} が検出されました: ${file}:${i + 1}`);
        console.error(`  > ${lines[i].trim()}`);
        blocked = true;
      }
    }
  }
}

if (blocked) {
  console.error('\n[check-secrets] コミットをブロックしました。秘匿情報を削除してから再度コミットしてください。');
  process.exit(1);
} else {
  console.log('[check-secrets] 秘匿情報は検出されませんでした。');
}
