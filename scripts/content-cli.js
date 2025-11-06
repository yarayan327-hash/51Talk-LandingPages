#!/usr/bin/env node
/**
 * 51Talk Landing Page Content Import CLI
 * --------------------------------------
 * 从 Excel 批量导入中英阿三语内容 + 图片路径，并更新 contentMap。
 */

import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 主入口
const args = process.argv.slice(2);
const command = args[0];

if (command === "import") {
  const fileArgIndex = args.indexOf("--file");
  const outputArgIndex = args.indexOf("--output");
  const dryRun = args.includes("--dry-run");
  const verbose = args.includes("--verbose");
  const langIndex = args.indexOf("--lang");
  const pageIdIndex = args.indexOf("--pageId");

  const filePath =
    fileArgIndex !== -1 ? args[fileArgIndex + 1] : null;
  const outputDir =
    outputArgIndex !== -1 ? args[outputArgIndex + 1] : "./content/generated";

  const lang =
    langIndex !== -1 ? args[langIndex + 1] : null;
  const pageId =
    pageIdIndex !== -1 ? args[pageIdIndex + 1] : null;

  if (!filePath) {
    console.error("❌ 请使用 --file 参数指定 Excel 文件路径");
    process.exit(1);
  }

  importContentFromExcel(filePath, outputDir, lang, pageId, dryRun, verbose);
} else {
  console.log(`
用法：
  node scripts/content-cli.js import --file "路径/文件.xlsx" [--output ./content/generated] [--lang zh|en|ar] [--pageId pageId] [--dry-run] [--verbose]

参数：
  --file "路径"        Excel文件路径（必需）
  --output "路径"      输出目录（默认：./content/generated）
  --lang zh|en|ar      仅处理指定语言
  --pageId pageId      仅处理指定页面
  --dry-run           预览模式，不写入文件
  --verbose           显示详细统计信息

示例：
  node scripts/content-cli.js import --file "data.xlsx" --verbose
  node scripts/content-cli.js import --file "data.xlsx" --lang zh --dry-run
  `);
}

/**
 * 核心函数：从 Excel 导入内容
 */
export function importContentFromExcel(filePath, outputDir, lang, pageId, dryRun, verbose = false) {
  console.log(`📘 正在读取 Excel 文件：${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets["ContentTemplate"];
  const json = XLSX.utils.sheet_to_json(sheet);

  if (verbose) {
    console.log(`📊 读取到 ${json.length} 行数据`);

    if (json.length > 0) {
      console.log(`📋 Excel文件列名:`, Object.keys(json[0]));
      console.log(`📝 第一行数据示例:`, json[0]);
    }
  }

  // 初始化语言对象
  const result = { zh: {}, en: {}, ar: {} };
  const imageMap = [];
  const stats = {
    totalPages: new Set(),
    totalFields: 0,
    languagesProcessed: new Set(),
    imagePaths: 0
  };

  json.forEach((row, index) => {
    // 如果没有pageId列，使用默认值 'academy'
    let pid = row.pageId?.trim() || 'academy';

    // 如果指定了pageId过滤，只处理匹配的页面
    if (pageId && pid !== pageId) return;

    stats.totalPages.add(pid);

    const sec = row.section?.trim();
    const key = row.fieldKey?.trim();

    if (!sec || !key) {
      if (verbose) {
        console.log(`⚠️  跳过第 ${index + 1} 行：缺少 section 或 fieldKey`);
      }
      return;
    }

    stats.totalFields++;

    ["zh", "en", "ar"].forEach((langKey) => {
      if (lang && lang !== langKey) return;
      const text = row[langKey];
      if (!text) return;

      if (!result[langKey][pid]) result[langKey][pid] = {};
      if (!result[langKey][pid][sec]) result[langKey][pid][sec] = {};
      result[langKey][pid][sec][key] = text;

      stats.languagesProcessed.add(langKey);
    });

    if (row.imagePath) {
      imageMap.push({
        pageId: pid,
        section: sec,
        fieldKey: key,
        imagePath: row.imagePath,
      });
      stats.imagePaths++;
    }
  });

  if (dryRun) {
    console.log("🧾 预览模式（未写入文件）：");
    console.log(JSON.stringify(result, null, 2));

    if (verbose) {
      console.log("\n📊 导入统计：");
      console.log(`   页面数量: ${stats.totalPages.size}`);
      console.log(`   字段数量: ${stats.totalFields}`);
      console.log(`   处理语言: ${Array.from(stats.languagesProcessed).join(', ')}`);
      console.log(`   图片路径: ${stats.imagePaths}`);
    }
    return;
  }

  // 创建输出目录
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // 写入多语言 JSON 文件
  Object.entries(result).forEach(([langKey, data]) => {
    if (Object.keys(data).length === 0) return;

    const outPath = path.join(outputDir, `content_${langKey}.json`);
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
    console.log(`✅ 写入 ${outPath}`);

    if (verbose) {
      const pageCount = Object.keys(data).length;
      const sectionCount = Object.values(data).reduce((sum, page) => sum + Object.keys(page).length, 0);
      const fieldCount = Object.values(data).reduce((sum, page) =>
        sum + Object.values(page).reduce((pageSum, section) => pageSum + Object.keys(section).length, 0), 0
      );
      console.log(`   📄 ${pageCount} 个页面, ${sectionCount} 个区块, ${fieldCount} 个字段`);
    }
  });

  // 写入图片映射文件
  if (imageMap.length > 0) {
    const imgPath = path.join(outputDir, "imageMap.json");
    fs.writeFileSync(imgPath, JSON.stringify(imageMap, null, 2), "utf8");
    console.log(`🖼️ 写入 ${imgPath}`);
  }

  console.log(`🎉 导入完成，共导入 ${json.length} 行数据。`);

  if (verbose) {
    console.log("\n📊 详细统计：");
    console.log(`   📄 处理页面: ${Array.from(stats.totalPages).join(', ')}`);
    console.log(`   📝 总字段数: ${stats.totalFields}`);
    console.log(`   🌍 涉及语言: ${Array.from(stats.languagesProcessed).join(', ')}`);
    console.log(`   🖼️ 图片路径: ${stats.imagePaths}`);
    console.log(`   📁 输出目录: ${outputDir}`);
  }
}