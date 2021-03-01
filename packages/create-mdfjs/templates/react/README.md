### `create-mdfjs`

#### 说明

#### `env`

- `MDF_ENV` - 'dev' | 'qa' | 'prod'

#### 配置

- `sentry` 在非开发环境，即 `MDF_ENV === prod` 时启用
- `growingio` 在 `MDF_ENV === prod` 时启用
- `vconsole` 在非线上环境由开发者配置启用

#### 使用
yarn create mdfjs
yarn dev