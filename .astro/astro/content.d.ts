declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"1688-vs-alibaba-hi.md": {
	id: "1688-vs-alibaba-hi.md";
  slug: "1688-vs-alibaba-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"1688-vs-alibaba-ja.md": {
	id: "1688-vs-alibaba-ja.md";
  slug: "1688-vs-alibaba-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"1688-vs-alibaba-ko.md": {
	id: "1688-vs-alibaba-ko.md";
  slug: "1688-vs-alibaba-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"1688-vs-alibaba.md": {
	id: "1688-vs-alibaba.md";
  slug: "1688-vs-alibaba";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-en.md": {
	id: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-en.md";
  slug: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-en";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-hi.md": {
	id: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-hi.md";
  slug: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ja.md": {
	id: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ja.md";
  slug: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ko.md": {
	id: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ko.md";
  slug: "20260925-01_where-does-the-advantage-of-our-purchasing-agency-lie-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-en.md": {
	id: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-en.md";
  slug: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-en";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-hi.md": {
	id: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-hi.md";
  slug: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ja.md": {
	id: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ja.md";
  slug: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ko.md": {
	id: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ko.md";
  slug: "20260925-02_the-strategic-advantages-of-sourcing-from-hebei-region-in-china-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"avoid-fba-rejections-hi.md": {
	id: "avoid-fba-rejections-hi.md";
  slug: "avoid-fba-rejections-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"avoid-fba-rejections-ja.md": {
	id: "avoid-fba-rejections-ja.md";
  slug: "avoid-fba-rejections-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"avoid-fba-rejections-ko.md": {
	id: "avoid-fba-rejections-ko.md";
  slug: "avoid-fba-rejections-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"avoid-fba-rejections.md": {
	id: "avoid-fba-rejections.md";
  slug: "avoid-fba-rejections";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-fba-ready-hi.md": {
	id: "get-fba-ready-hi.md";
  slug: "get-fba-ready-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-fba-ready-ja.md": {
	id: "get-fba-ready-ja.md";
  slug: "get-fba-ready-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-fba-ready-ko.md": {
	id: "get-fba-ready-ko.md";
  slug: "get-fba-ready-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-fba-ready.md": {
	id: "get-fba-ready.md";
  slug: "get-fba-ready";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"read-inspection-report-hi.md": {
	id: "read-inspection-report-hi.md";
  slug: "read-inspection-report-hi";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"read-inspection-report-ja.md": {
	id: "read-inspection-report-ja.md";
  slug: "read-inspection-report-ja";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"read-inspection-report-ko.md": {
	id: "read-inspection-report-ko.md";
  slug: "read-inspection-report-ko";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"read-inspection-report.md": {
	id: "read-inspection-report.md";
  slug: "read-inspection-report";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"case-studies": {
"fba-shipment-relabelled-hi.md": {
	id: "fba-shipment-relabelled-hi.md";
  slug: "fba-shipment-relabelled-hi";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"fba-shipment-relabelled-ja.md": {
	id: "fba-shipment-relabelled-ja.md";
  slug: "fba-shipment-relabelled-ja";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"fba-shipment-relabelled-ko.md": {
	id: "fba-shipment-relabelled-ko.md";
  slug: "fba-shipment-relabelled-ko";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"fba-shipment-relabelled.md": {
	id: "fba-shipment-relabelled.md";
  slug: "fba-shipment-relabelled";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"first-private-label-zero-rejections-hi.md": {
	id: "first-private-label-zero-rejections-hi.md";
  slug: "first-private-label-zero-rejections-hi";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"first-private-label-zero-rejections-ja.md": {
	id: "first-private-label-zero-rejections-ja.md";
  slug: "first-private-label-zero-rejections-ja";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"first-private-label-zero-rejections-ko.md": {
	id: "first-private-label-zero-rejections-ko.md";
  slug: "first-private-label-zero-rejections-ko";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"first-private-label-zero-rejections.md": {
	id: "first-private-label-zero-rejections.md";
  slug: "first-private-label-zero-rejections";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"kitchen-defects-caught-hi.md": {
	id: "kitchen-defects-caught-hi.md";
  slug: "kitchen-defects-caught-hi";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"kitchen-defects-caught-ja.md": {
	id: "kitchen-defects-caught-ja.md";
  slug: "kitchen-defects-caught-ja";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"kitchen-defects-caught-ko.md": {
	id: "kitchen-defects-caught-ko.md";
  slug: "kitchen-defects-caught-ko";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"kitchen-defects-caught.md": {
	id: "kitchen-defects-caught.md";
  slug: "kitchen-defects-caught";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"supplier-vanished-deposit-hi.md": {
	id: "supplier-vanished-deposit-hi.md";
  slug: "supplier-vanished-deposit-hi";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"supplier-vanished-deposit-ja.md": {
	id: "supplier-vanished-deposit-ja.md";
  slug: "supplier-vanished-deposit-ja";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"supplier-vanished-deposit-ko.md": {
	id: "supplier-vanished-deposit-ko.md";
  slug: "supplier-vanished-deposit-ko";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
"supplier-vanished-deposit.md": {
	id: "supplier-vanished-deposit.md";
  slug: "supplier-vanished-deposit";
  body: string;
  collection: "case-studies";
  data: any
} & { render(): Render[".md"] };
};
"caseStudies": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "caseStudies";
  data: InferEntrySchema<"caseStudies">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
