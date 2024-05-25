import {defineDocumentType, makeSource} from 'contentlayer/source-files'

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        id: {
            type: 'number',
            required: true,
        },
        title: {
            type: 'string',
            required: true,
        },
        content: {
            type: 'string',
            required: true,
        },
        created_at: {
            type: 'date',
            required: true,
        },
        image: {
            type: 'string',
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `blog/${doc._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: './src/blog',
    documentTypes: [Blog],
})
