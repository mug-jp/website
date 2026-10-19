export function formatDate(date: string) {
    return date.slice(0, 10).replaceAll('-', '/');
}

export function contentAssetUrl(
    src: string | undefined,
    directory: string,
    base = import.meta.env.BASE_URL,
) {
    if (!src || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return src;
    const path = src.startsWith('/') ? src : `${directory}/${src}`;
    return `${base.replace(/\/$/, '')}${path}`;
}

export function pageHead(title: string, description: string) {
    return {
        meta: [
            { title: `${title} - MapLibre User Group Japan` },
            { name: 'description', content: description },
        ],
    };
}
