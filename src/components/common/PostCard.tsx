import { CardContent, CardHeader } from '@mui/material'
import { Post } from '../../dao'
import FancyCard from '../FancyCard'

type PostCardProps = {
    post: Post
}

const PostCard = ({post}: PostCardProps) => {
    return (
        <FancyCard children={
            <>
                <CardHeader title={post.title}/>
                <CardContent>
                    <img src={post.image}/>
                </CardContent>
            </>
        }/>
    )
}

export default PostCard