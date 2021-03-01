# `@medlinker/create-app-template-react-mobile-typescript`

[请移步这里](https://mca.mlfe.club)

## 说明

### `env`

- `MEDLINKER_APP_ENV` - 'dev' | 'qa' | 'prod'

### 配置

- `sentry` 在非开发环境，即 `process.env.NODE_ENV === 'production'` 时启用
- `growingio` 在 `MEDLINKER_APP_ENV = prod` 时启用
- `vconsole` 在 `MEDLINKER_APP_ENV = qa` 时启用
