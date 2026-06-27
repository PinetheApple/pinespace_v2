import { Fragment } from 'react'

export type Lang = 'ts' | 'tsx' | 'js' | 'jsx' | 'json' | 'bash' | 'text'

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'switch', 'case', 'break', 'continue', 'new', 'class', 'extends', 'super',
  'import', 'export', 'default', 'from', 'as', 'async', 'await', 'yield',
  'typeof', 'instanceof', 'in', 'of', 'void', 'delete', 'this', 'throw',
  'try', 'catch', 'finally', 'type', 'interface', 'enum', 'implements',
  'public', 'private', 'protected', 'readonly', 'static', 'get', 'set',
])
const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN'])

const colors = {
  comment: 'text-faint italic',
  string: 'text-success',
  number: 'text-warning',
  keyword: 'text-violet-300',
  literal: 'text-violet-300',
  fn: 'text-violet-400',
} as const

// comment | string | number | identifier — single-pass tokenizer
const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|(["'`])(?:\\.|(?!\2)[\s\S])*?\2|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g

function highlightCode(code: string): React.ReactNode {
  const out: Array<React.ReactNode> = []
  let last = 0
  let m: RegExpExecArray | null
  let i = 0

  while ((m = TOKEN.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const [tok, comment, , number, ident] = m

    let cls: string | null = null
    if (comment) cls = colors.comment
    else if (number) cls = colors.number
    else if (ident) {
      if (JS_KEYWORDS.has(ident)) cls = colors.keyword
      else if (LITERALS.has(ident)) cls = colors.literal
      else if (code[TOKEN.lastIndex] === '(') cls = colors.fn
    } else cls = colors.string // matched quote group

    out.push(
      cls ? (
        <span key={i++} className={cls}>
          {tok}
        </span>
      ) : (
        <Fragment key={i++}>{tok}</Fragment>
      ),
    )
    last = TOKEN.lastIndex
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

const SUPPORTED = new Set<Lang>(['ts', 'tsx', 'js', 'jsx', 'json', 'bash'])

export function highlight(code: string, lang: Lang = 'text'): React.ReactNode {
  return SUPPORTED.has(lang) ? highlightCode(code) : code
}
