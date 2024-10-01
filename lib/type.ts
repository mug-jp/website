export type Post = {
	title: string;
	tags: string[];
	author?: string;
	publishedAt: Date;
	slug: string;
};

export type Event = {
	title: string;
	plannedDate: Date;
	url?: string;
	slug: string;
};
