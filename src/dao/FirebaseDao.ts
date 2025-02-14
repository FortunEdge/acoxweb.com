import { FirebaseApp } from 'firebase/app'
import { Firestore, collection, collectionGroup, doc, documentId, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { FirebaseStorage, getDownloadURL, getStorage, ref } from 'firebase/storage'
import Collection from './Collection'
import Post from './Post'
import Tag from './Tag'

/**
 * Class to encapsulate firestore access to database documents and stored data.
 * Facilitates access to all database entities (no component should get data via firestore library methods)
 */
class FirebaseDao {
    private db: Firestore
    private storage: FirebaseStorage

    constructor(firebaseApp: FirebaseApp) {
        this.db = getFirestore(firebaseApp)
        this.storage = getStorage(firebaseApp)
    }

    async getPosts(): Promise<Post[]> {
        const posts = query(collectionGroup(this.db, Collection.POSTS)).withConverter(Post.getConverter())
        const snapshot = await getDocs(posts)

        const foundPosts = snapshot.docs.map(v => v.data())
        foundPosts.forEach(this.injectCoverImage)

        return foundPosts
    }

    async getPost(documentPath: string) {
        const ref = doc(this.db, documentPath).withConverter(Post.getConverter())
        const snapshot = await getDoc(ref)

        const post = snapshot.data()
        if (post) {
            this.injectCoverImage(post)
        }
        return post
    }

    async savePost(post: Post) {
        if (!post.documentPath) {
            throw new Error('No path found for document')
        }

        const ref = doc(this.db, post.documentPath).withConverter(Post.getConverter())
        setDoc(ref, post)
    }

    async getTags(ids: string[]) {
        const tags = query(collection(this.db, Collection.TAGS), where(documentId(), 'in', ids))
        const snapshot = await getDocs(tags)

        return snapshot.docs.map(doc => doc.data() as Tag)
    }
    
    /**
     * Gets the reference to the files for the post with the passed in id
     */
    private getPostFilesRef(id: string) {
        return ref(this.storage, `posts/${id}`)
    }

    private async injectCoverImage(post: Post) {
        if (!(post?.id)) {
            throw new Error('Cannot find cover image with no ID!')
        }
        console.log(`ID: ${post?.id}`)

        try {
            const postCoverRef = ref(this.storage, `posts/${post.id}/cover.png`)
            console.log(`Path: ${postCoverRef.fullPath}`)
            getDownloadURL(postCoverRef)
                .then(url => post.image = url)
                .catch(reason => console.error(reason))
        } catch (e) {
            console.log('Why no catch error')
            console.error(e)
        }
    }

    // async getPostsForCategories(categories: Category[]): Promise<Post[]> {
    //     // Fetch categories
    //     const categoryQuery = query(collection(this.db, Collection.CATEGORIES), where(documentId(), 'in', categories.map(c => c.name)))
    //     const categorySnapshot = await getDocs(categoryQuery)

    //     // Fetch docs from categories
    //     const refs = categorySnapshot.docs.map(doc => doc.ref.parent)
    //     refs.forEach(ref => ref.withConverter)
    // }
}

export default FirebaseDao