export type Post = {
    title: string;
    tags: string[];
    author?: string;
    publishedAt: string;
    slug: string;
    content: string;
};

export type Event = {
    title: string;
    plannedDate: string;
    url?: string;
    slug: string;
    content: string;
};

export type RadioEpisode = { title: string; plannedDate: string; url: string };
export type SiteContent = {
    posts: Post[];
    events: Event[];
    spaces: Event[];
    radio: RadioEpisode[];
};
