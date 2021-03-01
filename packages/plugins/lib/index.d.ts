/**
 * @file 内部插件集
 *       顺序不可变否则收集的信息不完整: runtime、export、defineConfig
 */
export default function (): {
    presets: string[];
};
