/**
 * GFM tablo sözdizimini ham HTML <table> bloğuna çevirir.
 * rehype-raw ile birlikte MDXRemote'a verilir; MDX components'taki
 * table/thead/th/td/tr override'ları otomatik uygulanır.
 */
function parseTableRow(line: string): string[] {
  const normalized = line.replace(/\r$/, "").trim()
  const cells = normalized.split("|").map((s) => s.trim().replace(/\r/g, ""))
  if (cells[0] === "") cells.shift()
  if (cells[cells.length - 1] === "") cells.pop()
  return cells
}

function isTableRow(line: string): boolean {
  const t = line.replace(/\r$/, "").trim()
  return t.startsWith("|") && t.endsWith("|") && t.length > 2
}

function isSeparatorRow(line: string): boolean {
  const t = line.replace(/\r$/, "").trim()
  if (!t.startsWith("|") || !t.endsWith("|")) return false
  const cells = parseTableRow(line)
  return cells.every((cell) => /^[\s\-:]+$/.test(cell))
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function processCell(c: string): string {
  const escaped = escapeHtml(c)
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
}

function buildHtmlTable(rows: string[][]): string {
  const [headerRow, ...bodyRows] = rows
  const ths = headerRow.map((c) => `<th class="px-4 py-3 font-semibold text-left whitespace-nowrap">${processCell(c)}</th>`).join("")
  const trs = bodyRows
    .map((row) => `<tr class="border-b border-ln-gray-100 dark:border-ln-gray-800/60 last:border-0">${row.map((c) => `<td class="px-4 py-3">${processCell(c)}</td>`).join("")}</tr>`)
    .join("\n")
  return `<div class="not-prose my-6 w-full overflow-x-auto rounded-xl border border-ln-gray-200 dark:border-ln-gray-800 shadow-sm">\n<table class="w-full min-w-[320px] border-collapse text-left text-sm">\n<thead class="border-b border-ln-gray-200 dark:border-ln-gray-800 bg-ln-gray-50 dark:bg-ln-gray-800/80"><tr>${ths}</tr></thead>\n<tbody>\n${trs}\n</tbody>\n</table>\n</div>`
}

export function markdownTablesToHtml(content: string): string {
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const lines = normalizedContent.split("\n")
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!isTableRow(line)) {
      out.push(line)
      i += 1
      continue
    }

    const rows: string[][] = []
    rows.push(parseTableRow(line))
    i += 1

    if (i < lines.length && isSeparatorRow(lines[i])) {
      i += 1
    }

    while (i < lines.length && isTableRow(lines[i]) && !isSeparatorRow(lines[i])) {
      rows.push(parseTableRow(lines[i]))
      i += 1
    }

    if (rows.length >= 1) {
      out.push("", buildHtmlTable(rows), "")
    }
  }

  return out.join("\n")
}
