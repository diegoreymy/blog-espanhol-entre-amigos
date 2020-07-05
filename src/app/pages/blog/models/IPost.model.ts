export interface IPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: GUID;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: GUID;
    content: Content;
    excerpt: Content;
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: Meta;
    categories: number[];
    tags: any[];
    'jetpack-related-posts': any[];
    jetpack_featured_media_url: string;
    jetpack_publicize_connections: any[];
    jetpack_shortlink: string;
    jetpack_sharing_enabled: boolean;
    jetpack_likes_enabled: boolean;
    _links: Links;
}

export interface Links {
    self: About[];
    collection: About[];
    about: About[];
    author: Author[];
    replies: Author[];
    'version-history': VersionHistory[];
    'predecessor-version': PredecessorVersion[];
    'wp:featuredmedia': Author[];
    'wp:attachment': About[];
    'wp:term': WpTerm[];
    curies: Cury[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href: string;
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}

export interface PredecessorVersion {
    id: number;
    href: string;
}

export interface VersionHistory {
    count: number;
    href: string;
}

export interface WpTerm {
    taxonomy: string;
    embeddable: boolean;
    href: string;
}

export interface Content {
    rendered: string;
    protected: boolean;
}

export interface GUID {
    rendered: string;
}

export interface Meta {
    _coblocks_attr: string;
    _coblocks_dimensions: string;
    _coblocks_responsive_height: string;
    _coblocks_accordion_ie_support: string;
    advanced_seo_description: string;
    amp_status: string;
    spay_email: string;
    jetpack_publicize_message: string;
}
