import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MarkdownContent.css';
import hljs from 'highlight.js/lib/common';
import type { ClassAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react';
import { contentAssetUrl } from '@/lib/utils';

type CodeBlockProps = ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps;

const CodeBlock = ({ className, children }: CodeBlockProps) => {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match && match[1] ? match[1] : '';
    const code = String(children ?? '');
    const html = lang && hljs.getLanguage(lang)
        ? hljs.highlight(code, { language: lang }).value
        : hljs.highlightAuto(code).value;

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

const Img = ({ node: _node, ...props }: ImgProps) => {
    return (
        <img {...props} loading="lazy" decoding="async" />
    );
};

export default function MarkdownContent({
    content,
    contentDirectory,
}: {
    content: string;
    contentDirectory: string;
}) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code: CodeBlock,
                img: (props) => <Img {...props} src={contentAssetUrl(typeof props.src === 'string' ? props.src : undefined, contentDirectory)} />,
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
