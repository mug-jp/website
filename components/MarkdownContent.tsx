import ReactMarkdown, { ExtraProps } from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './MarkdownContent.css';
import hljs from 'highlight.js';
import { ClassAttributes, HTMLAttributes } from 'react';

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

export default async function MarkdownContent({
    content,
}: {
    content: string;
}) {
    return (
        <div>
            <ReactMarkdown
                remarkPlugins={[remarkFrontmatter, remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{ code: CodeBlock }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
