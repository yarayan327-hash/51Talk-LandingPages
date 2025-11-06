#!/usr/bin/env node

/**
 * 🪄 51Talk Excel内容批量导入工具
 * -------------------------------------
 * 智能读取Excel文件并批量更新落地页多语言内容系统
 *
 * 功能：
 * ✅ 读取Excel文件内容模板
 * ✅ 匹配页面变体配置
 * ✅ 更新多语言内容映射
 * ✅ 处理图片路径映射
 * ✅ 支持命令行参数
 * ✅ 干运行预览模式
 * ✅ 内容差异对比
 */

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');


// ------------------ 配置 ------------------

const CONFIG = {
  excelFile: '51Talk_Academy_LandingPage.xlsx',
  contentDir: path.join(__dirname, '../content'),
  outputDir: path.join(__dirname, '../content/generated'),
  pageVariantsFile: path.join(__dirname, '../lib/pageVariants.ts'),
  historyDir: path.join(__dirname, '../content/history'),
  supportedLanguages: ['zh', 'en', 'ar'],
  languageNames: {
    zh: '中文',
    en: 'English',
    ar: 'العربية'
  }
};

// ------------------ 工具函数 ------------------

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 创建目录: ${dir}`);
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 已创建: ${filePath}`);
}

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  文件不存在: ${filePath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`❌ JSON解析失败: ${filePath} - ${error.message}`);
    return null;
  }
}

function saveHistory(data, pageId) {
  ensureDir(CONFIG.historyDir);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const historyFile = path.join(CONFIG.historyDir, `${pageId}_${timestamp}.json`);
  fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));
  console.log(`📝 已保存历史记录: ${historyFile}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    pageId: null,
    language: null,
    dryRun: false,
    verbose: false,
    compareHistory: true
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--pageId':
        options.pageId = args[++i];
        break;
      case '--lang':
        options.language = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--verbose':
        options.verbose = true;
        break;
      case '--no-history':
        options.compareHistory = false;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
      default:
        if (!args[i].startsWith('--') && !options.excelFile) {
          options.excelFile = args[i];
        }
    }
  }

  return options;
}

function showHelp() {
  console.log('🪄 51Talk Excel内容批量导入工具');
  console.log('=====================================\n');
  console.log('用法:');
  console.log('  node scripts/excel-content-importer.js [Excel文件] [选项]\n');
  console.log('参数:');
  console.log('  [Excel文件]                    Excel文件路径（默认：51Talk_Academy_LandingPage.xlsx）');
  console.log('');
  console.log('选项:');
  console.log('  --pageId <id>                  仅处理指定页面');
  console.log('  --lang <zh|en|ar>              仅更新指定语言');
  console.log('  --dry-run                     预览模式，不实际写入文件');
  console.log('  --verbose                     详细输出');
  console.log('  --no-history                  不进行历史对比');
  console.log('  --help, -h                    显示帮助信息\n');
  console.log('Excel文件格式要求:');
  console.log('  - 包含工作表: ContentTemplate（主要数据）');
  console.log('  - 列名: pageId, section, fieldKey, zh, en, ar, imagePath\n');
  console.log('示例:');
  console.log('  node scripts/excel-content-importer.js');
  console.log('  node scripts/excel-content-importer.js --pageId academy --dry-run');
  console.log('  node scripts/excel-content-importer.js --lang zh --verbose\n');
}

// ------------------ Excel读取功能 ------------------

function readExcelFile(filePath) {
  try {
    const workbook = xlsx.readFile(path.resolve(filePath));
    const worksheet = workbook.Sheets['ContentTemplate'];

    if (!worksheet) {
      throw new Error('Excel文件中未找到 ContentTemplate 工作表');
    }

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(`📊 成功读取Excel文件: ${data.length} 行数据`);

    return data;
  } catch (error) {
    console.error(`❌ 读取Excel文件失败: ${error.message}`);
    process.exit(1);
  }
}

// ------------------ 页面变体读取 ------------------

async function getPageVariants() {
  try {
    const pageVariantsPath = path.join(__dirname, '../dist/pageVariants.js');
    if (fs.existsSync(pageVariantsPath)) {
      // 读取编译后的文件内容
      const content = fs.readFileSync(pageVariantsPath, 'utf-8');

      // 简单解析页面变体
      const pageVariants = {};
      const exportMatch = content.match(/export\s*{\s*(pageVariants|default)\s*:\s*{([^}]+)}/s);

      if (exportMatch) {
        const variantsText = exportMatch[1];
        const variantMatches = variantsText.match(/(\w+):\s*{[^}]+layout:\s*['"`]([^'"`]+)['"`]/g);

        variantMatches.forEach(match => {
          const variantMatch = match.match(/(\w+):[^:]+layout:\s*['"`]([^'"`]+)['"`]/);
          if (variantMatch) {
            const variantName = variantMatch[1];
            const layoutName = variantMatch[2];
            if (!pageVariants.academy) {
              pageVariants.academy = {};
            }
            pageVariants.academy[variantName] = { layout: layoutName };
          }
        });
      }

      return pageVariants;
    }

    // 如果编译版本不存在，尝试读取源文件
    const sourcePath = CONFIG.pageVariantsFile;
    const content = fs.readFileSync(sourcePath, 'utf-8');

    // 简单解析页面变体配置
    const pageVariants = {};
    const variantMatches = content.match(/export const pageVariants\s*=\s*{([^}]+)}/s);

    if (variantMatches) {
      const variantsText = variantMatches[1];
      const variantMatches2 = variantsText.match(/(\w+):\s*{[^}]+layout:\s*['"`]([^'"`]+)['"`][^}]+}/g);

      variantMatches2.forEach(match => {
        const variantMatch = match.match(/(\w+):[^:]+layout:\s*['"`]([^'"`]+)['"`]/);
        if (variantMatch) {
          const variantName = variantMatch[1];
          const layoutName = variantMatch[2];
          if (!pageVariants.academy) {
            pageVariants.academy = {};
          }
          pageVariants.academy[variantName] = { layout: layoutName };
        }
      });
    }

    console.log('📋 读取页面变体配置成功');
    return pageVariants;
  } catch (error) {
    console.error(`❌ 读取页面变体配置失败: ${error.message}`);
    return {};
  }
}

// ------------------ 内容处理功能 ------------------

function processExcelData(data, pageVariants, options) {
  console.log('\n🔄 开始处理Excel数据...\n');

  // 按页面ID分组数据
  const groupedData = {};
  data.forEach(row => {
    const pageId = row.pageId || row.PageId || row.page_id;
    if (!pageId) {
      console.warn('⚠️  跳过没有pageId的行:', row);
      return;
    }

    if (!groupedData[pageId]) {
      groupedData[pageId] = [];
    }
    groupedData[pageId].push(row);
  });

  console.log(`📊 发现页面: ${Object.keys(groupedData).join(', ')}`);

  const results = {};
  const globalLanguageStats = {};
  const stats = {
    totalPages: Object.keys(groupedData).length,
    totalFields: 0,
    totalLanguages: 0,
    imagePaths: 0
  };

  // 处理每个页面的数据
  Object.entries(groupedData).forEach(([pageId, rows]) => {
    if (options.pageId && pageId !== options.pageId) {
      return;
    }

    console.log(`\n📄 处理页面: ${pageId} (${rows.length} 个字段)`);

    // 验证页面是否存在
    if (!pageVariants[pageId]) {
      console.warn(`⚠️  页面变体中未找到: ${pageId}，将使用默认配置`);
    }

    const pageContent = {};
    const imageMap = [];
    const languageStats = {};

    rows.forEach((row, index) => {
      const section = row.section || row.Section || '';
      const fieldKey = row.fieldKey || row.FieldKey || row.field_key || '';
      const imagePath = row.imagePath || row.ImagePath || row.image_path || '';

      if (!section || !fieldKey) {
        console.warn(`    ⚠️  跳过缺少section或fieldKey的行: ${index + 1}`);
        return;
      }

      stats.totalFields++;

      // 处理每个语言
      CONFIG.supportedLanguages.forEach(lang => {
        if (options.language && lang !== options.language) {
          return;
        }

        const content = row[lang] || row[lang.toUpperCase()] || '';
        if (content) {
          if (!pageContent[lang]) {
            pageContent[lang] = {};
          }

          // 构建嵌套结构
          if (!pageContent[lang][section]) {
            pageContent[lang][section] = {};
          }

          pageContent[lang][section][fieldKey] = content;

          if (!languageStats[lang]) {
            languageStats[lang] = 0;
          }
          languageStats[lang]++;

          // 累积全局语言统计
          if (!globalLanguageStats[lang]) {
            globalLanguageStats[lang] = 0;
          }
          globalLanguageStats[lang]++;
        }
      });

      // 处理图片路径
      if (imagePath) {
        imageMap.push({
          pageId,
          section,
          fieldKey,
          imagePath
        });
        stats.imagePaths++;
      }
    });

    results[pageId] = {
      content: pageContent,
      imageMap,
      stats: languageStats
    };

    console.log(`    🌍 语言统计:`, Object.entries(languageStats).map(([lang, count]) =>
      `${CONFIG.languageNames[lang]}(${lang}): ${count}个字段`
    ).join(', '));

    if (imageMap.length > 0) {
      console.log(`    🖼️  图片路径: ${imageMap.length}个`);
    }
  });

  stats.totalLanguages = Object.keys(globalLanguageStats).length;

  return { results, stats };
}

// ------------------ 内容对比功能 ------------------

function compareWithHistory(content, pageId, language) {
  const historyFiles = fs.readdirSync(CONFIG.historyDir)
    .filter(file => file.startsWith(`${pageId}_`) && file.endsWith('.json'))
    .sort()
    .reverse();

  if (historyFiles.length === 0) {
    return { hasChanges: true, newContent: content };
  }

  const lastHistoryFile = path.join(CONFIG.historyDir, historyFiles[0]);
  const lastContent = readJSON(lastHistoryFile);

  if (!lastContent || !lastContent[language]) {
    return { hasChanges: true, newContent: content };
  }

  const lastLangContent = JSON.stringify(lastContent[language], null, 2);
  const newLangContent = JSON.stringify(content[language], null, 2);

  const hasChanges = lastLangContent !== newLangContent;

  return {
    hasChanges,
    lastContent: lastContent[language],
    newContent: content[language],
    changes: hasChanges ? '内容已更新' : '内容无变化'
  };
}

// ------------------ 文件写入功能 ------------------

function writeContentFiles(results, options) {
  console.log('\n📝 开始写入内容文件...\n');

  ensureDir(CONFIG.outputDir);

  const allContent = {};
  const allImageMap = [];
  const writeStats = {
    filesWritten: 0,
    filesUpdated: 0,
    filesUnchanged: 0
  };

  Object.entries(results).forEach(([pageId, { content, imageMap, stats }]) => {
    // 合并所有页面内容
    CONFIG.supportedLanguages.forEach(lang => {
      if (options.language && lang !== options.language) {
        return;
      }

      if (content[lang]) {
        if (!allContent[lang]) {
          allContent[lang] = {};
        }
        Object.assign(allContent[lang], content[lang]);
      }
    });

    // 合并图片映射
    allImageMap.push(...imageMap);
  });

  // 写入语言文件
  Object.entries(allContent).forEach(([lang, langContent]) => {
    const fileName = `content_${lang}.json`;
    const filePath = path.join(CONFIG.outputDir, fileName);

    if (options.dryRun) {
      console.log(`🔍 预览模式 - 将写入: ${fileName}`);
      console.log(`   ${Object.keys(langContent).length} 个区块, ${Object.values(langContent).reduce((sum, section) => sum + Object.keys(section).length, 0)} 个字段`);
      writeStats.filesWritten++;
      return;
    }

    // 对比历史记录
    let comparison = null;
    if (options.compareHistory) {
      const primaryPageId = Object.keys(results)[0];
      comparison = compareWithHistory(results, primaryPageId, lang);
    }

    // 写入文件
    const fileContent = JSON.stringify(langContent, null, 2);
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    if (comparison) {
      if (comparison.hasChanges) {
        console.log(`📝 已更新: ${fileName} (${comparison.changes})`);
        writeStats.filesUpdated++;

        // 保存历史记录
        const primaryPageId = Object.keys(results)[0];
        saveHistory(results, `${primaryPageId}_${lang}`);
      } else {
        console.log(`📄 未变化: ${fileName}`);
        writeStats.filesUnchanged++;
      }
    } else {
      console.log(`✅ 已写入: ${fileName}`);
      writeStats.filesWritten++;
    }
  });

  // 写入图片映射文件
  if (allImageMap.length > 0) {
    const imageMapFile = path.join(CONFIG.outputDir, 'imageMap.json');
    const imageMapContent = JSON.stringify(allImageMap, null, 2);

    if (!options.dryRun) {
      fs.writeFileSync(imageMapFile, imageMapContent, 'utf-8');
      console.log(`🖼️  已写入: imageMap.json (${allImageMap.length} 个图片路径)`);
    } else {
      console.log(`🔍 预览模式 - 将写入: imageMap.json (${allImageMap.length} 个图片路径)`);
    }
  }

  return writeStats;
}

// ------------------ 主函数 ------------------

async function main() {
  console.log('🪄 51Talk Excel内容批量导入工具');
  console.log('=====================================\n');

  const options = parseArgs();
  const excelFile = options.excelFile || CONFIG.excelFile;

  console.log(`📊 读取Excel文件: ${excelFile}`);
  if (options.pageId) console.log(`🎯 仅处理页面: ${options.pageId}`);
  if (options.language) console.log(`🌍 仅更新语言: ${CONFIG.languageNames[options.language]} (${options.language})`);
  if (options.dryRun) console.log(`🔍 预览模式 - 不实际写入文件`);
  if (options.verbose) console.log(`📝 详细输出模式`);

  // 读取Excel文件
  const data = readExcelFile(excelFile);

  // 读取页面变体配置
  const pageVariants = await getPageVariants();

  // 处理Excel数据
  const { results, stats } = processExcelData(data, pageVariants, options);

  // 写入文件
  const writeStats = writeContentFiles(results, options);

  // 输出统计信息
  console.log('\n📊 导入统计:');
  console.log(`   处理页面: ${stats.totalPages} 个`);
  console.log(`   总字段数: ${stats.totalFields} 个`);
  console.log(`   涉及语言: ${stats.totalLanguages} 种`);
  console.log(`   图片路径: ${stats.imagePaths} 个`);

  if (options.dryRun) {
    console.log(`   预览文件: ${writeStats.filesWritten} 个`);
  } else {
    console.log(`   写入文件: ${writeStats.filesWritten} 个`);
    console.log(`   更新文件: ${writeStats.filesUpdated} 个`);
    console.log(`   未变化: ${writeStats.filesUnchanged} 个`);
  }

  console.log('\n🎉 Excel内容导入完成！');

  if (!options.dryRun) {
    console.log(`\n📁 输出目录: ${CONFIG.outputDir}`);
    console.log(`📝 历史记录: ${CONFIG.historyDir}`);
  }
}

// 运行主函数
main().catch(error => {
  console.error('❌ 程序执行失败:', error.message);
  process.exit(1);
});