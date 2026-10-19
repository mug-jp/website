import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MarkdownContent.css';
import hljs from 'highlight.js';
import { ClassAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react';

type CodeBlockProps = ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps;

const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match && match[1] ? match[1] : '';
    const html = hljs.highlightAuto(children!.toString(), [lang]).value;

    return (
        <code
            className="hljs"
            dangerouslySetInnerHTML={{ __html: html }}
        ></code>
    );
};

type ImgProps = ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement> &
    ExtraProps;

const Img = (props: ImgProps) => {
    return (
        <img {...props} loading="lazy" decoding="async" />
    );
};

export default async function MarkdownContent({
    content,
    contentDirectory,
}: {
    content: string;
    contentDirectory: string;
}) {
    // Images live beside the source Markdown, which can differ from the page URL.
    const imageSource = (src: string | undefined) => {
        if (!src || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return src;
        const path = src.startsWith('/') ? src : `${contentDirectory}/${src}`;
        return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
    };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkFrontmatter, remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code: CodeBlock,
                img: (props) => <Img {...props} src={imageSource(props.src)} />,
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
