import {defineDocumentType, makeSource} from 'contentlayer2/source-files'

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        tags: {
            type: 'list',
            of: {type: 'string'},
            default: [],
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
