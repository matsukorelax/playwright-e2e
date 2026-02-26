# Playwright ログイン認証 E2E テスト

[![Playwright](https://img.shields.io/badge/Playwright-1.50.0-blue?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![dotenv](https://img.shields.io/badge/dotenv-17.x-blue)](https://www.npmjs.com/package/dotenv)

## 概要 (Introduction)

このコードは、E2E（End-to-End）テストフレームワークであるPlaywrightを用いて、Webアプリケーションのログイン認証機能を自動テストするものです。具体的には、環境変数で指定したユーザー名とパスワードを用いてログインを試み、ログイン後のリダイレクト先URLと要素の表示状態を検証します。dotenvを利用して環境変数を読み込み、認証情報を安全に管理します。

## 想定される利用シーン (Use Case)

このテストコードは、以下のような状況で役立ちます。

*   **CI/CDパイプラインでの自動テスト:** 継続的インテグレーション環境で、デプロイ前にログイン機能が正常に動作するかを検証します。
*   **リグレッションテスト:** 新機能の追加や既存機能の修正後に、ログイン機能が壊れていないかを確認します。
*   **開発時の動作確認:** 開発者がローカル環境でログイン機能を実装する際に、動作確認を効率化します。

## 処理フロー (Architecture)

```
Start -> ブラウザ起動 -> ログインページへ遷移 -> ユーザー名/パスワード入力 -> ログインボタンクリック -> inventory ページへ遷移検証 -> inventory list表示検証 -> テスト終了
```

## 主な機能 (Features)

*   **ページ遷移:** `page.goto('/')` を使用して、指定されたURLにブラウザを遷移させます。
*   **フォーム入力:** `page.fill()` を使用して、ユーザー名とパスワードの入力フィールドに値を入力します。環境変数から認証情報を取得することで、コードに直接記述するのを避けています。
*   **クリック:** `page.click()` を使用して、ログインボタンをクリックします。
*   **URL検証:** `expect(page).toHaveURL(/.*inventory\.html/)` を使用して、ログイン後のリダイレクト先URLが期待どおりであるかを検証します。
*   **要素の可視性検証:** `expect(page.locator('.inventory_list')).toBeVisible()` を使用して、ログイン後のページに特定の要素が表示されているかを検証します。
*   **一時停止:** `page.pause()` を使用して、テスト実行を一時停止し、ブラウザの状態を目視確認できます。

## 技術スタック (Tech Stack)

*   **Playwright:**  Microsoftが開発するE2Eテストフレームワーク。Chromium, Firefox, WebKitをサポートし、高速かつ安定したテスト実行を実現します。
*   **TypeScript:**  JavaScriptに静的型付けを追加する言語。コードの可読性、保守性、信頼性を向上させます。
*   **dotenv:**  環境変数を`.env`ファイルから読み込むためのライブラリ。認証情報などの機密情報をコードに埋め込むことを避けます。

## 設計・実装のポイント (Key Points)

*   **可読性と保守性を重視した設計:**  テストコードは簡潔に記述されており、処理の流れを容易に理解できます。
*   **環境変数による認証情報の管理:**  認証情報をコードに直接記述せず、環境変数として分離することで、セキュリティを向上させています。
*   **アサーションによる厳密な検証:**  ログイン後のURLと要素の可視性を検証することで、ログイン処理が正しく完了したことを保証します。
*   **Playwright標準機能の活用:** Playwrightが提供する豊富なAPIを活用することで、効率的なテスト実装を実現しています。
