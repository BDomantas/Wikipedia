export interface searchOptions {
    limit?: number
    suggestion?: boolean
    lang?: string
}

export interface autocompletionOptions {
  limit?: number
  lang?: string
}

export interface pageOptions {
    autoSuggest?: boolean
    redirect?: boolean
    preload?: boolean
    fields?: Array<pageFunctions>
    lang?: string;
}

export interface listOptions {
    autoSuggest?: boolean
    redirect?: boolean
    limit?: number
    lang?: string
}

export interface geoOptions {
    limit?: number
    radius?: number
    lang?: string
}

export type pageFunctions =
    'summary' | 'images' | 'intro' | 'html' | 'content' | 'categories' | 'links' | 'references' | 'coordinates'
    | 'langLinks' | 'infobox' | 'tables' | 'related'

export interface eventOptions {
    type?: eventTypes,
    month?: string,
    day?: string
    lang?: string
}

export interface fcOptions {
    year?: string,
    month?: string,
    day?: string
    lang?: string
}

export type eventTypes =
    'all' | 'selected' | 'births' | 'deaths' | 'events' | 'holidays'

export type randomFormats =
    'title' | 'summary' | 'related' | 'mobile-sections' | 'mobile-sections-lead'

export type format =
    'a4' | 'letter' | 'legal'

export type pdfType =
    'desktop' | 'mobile'

export interface pdfOptions {
    autoSuggest?: boolean
    format?: format
    type?: pdfType
    lang?: string;
}

export type citationFormat =
    'mediawiki' | 'mediawiki-basefields' | 'zotero' | 'bibtex' | 'wikibase'
