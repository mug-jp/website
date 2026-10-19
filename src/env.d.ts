/// <reference types="vite/client" />

declare module 'virtual:mug-content' {
    const content: import('../lib/content').SiteContent;
    export default content;
}
