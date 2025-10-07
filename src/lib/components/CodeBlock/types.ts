export interface CodeBlockProps {
	code?: string;
	lang?: 'c' | 'console';
	themeName?: string;
	themeData?: object;
	// Base Style Props
	base?: string;
	rounded?: string;
	shadow?: string;
	classes?: string;
	// Pre Style Props
	preBase?: string;
	prePadding?: string;
	preClasses?: string;
}
