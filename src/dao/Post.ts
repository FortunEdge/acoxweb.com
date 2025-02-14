import { 
    DocumentData, 
    FirestoreDataConverter,  
    QueryDocumentSnapshot, 
    SnapshotOptions, 
    WithFieldValue 
} from 'firebase/firestore'
import Collection from './Collection'

/**
 * Represents a single portfolio or blog post
 */
export default class Post {
    // Unique identifier for the post
    id?: string
    // Title of the post
    title?: string
    // Subtitle of the post
    subtitle?: string
    // Date posted (exited draft mode)
    datePosted?: Date
    // Date last updated
    dateUpdated?: Date
    // Content, in markdown
    content: string = ''
    // Cover image url
    image?: string
    // Category for the post
    category?: string
    // List of tags associated with the post
    tags: string[] = []

    static getConverter(): FirestoreDataConverter<Post> {
        return new PostConverter()
    }

    static getCollectionPath(category: string): string {
        return `${Collection.CATEGORIES}/${category}/${Collection.POSTS}`
    }

    static getDocumentPath(category: string): (documentId: string) => string {
        return documentId => `${this.getCollectionPath(category)}/${documentId}`
    }

    /**
     * Creates a new Post object using data from the DB
     * @param dbData 
     */
    constructor(id: string, category: string, dbData: PostDbModel) {
        this.id = id
        this.category = category

        this.content = dbData.content
        this.datePosted = dbData.datePosted
        this.dateUpdated = dbData.dateUpdated
        this.subtitle = dbData.subtitle
        this.tags = dbData.tags
        this.title = dbData.title
    }

    get collectionPath(): string | undefined {
        if (this.category === undefined) {
            return undefined
        }

        return Post.getCollectionPath(this.category)
    }

    get documentPath(): string | undefined {
        if (this.category === undefined || this.id === undefined) {
            return undefined
        }

        return Post.getDocumentPath(this.category)(this.id)
    }
}

export interface PostDbModel {
    content: string
    datePosted?: Date
    dateUpdated?: Date
    subtitle?: string
    title: string
    tags: string[]
}

class PostConverter implements FirestoreDataConverter<Post> {
    toFirestore(post: WithFieldValue<Post>): DocumentData {
        if (!post.title) {
            throw new Error('Post must have a title!')
        }
        const postData: WithFieldValue<PostDbModel> = {
            title: post.title,
            content: post.content,
            datePosted: post.datePosted,
            dateUpdated: post.dateUpdated,
            subtitle: post.subtitle,
            tags: post.tags
        }

        return postData as DocumentData
    }
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): Post {
        const data = snapshot.data(options)
        return new Post(snapshot.id, snapshot.ref.parent.id, data as PostDbModel)
    }

}