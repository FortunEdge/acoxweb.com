/**
 * Abstraction for grids of {@link FancyCard} elements
 * Abstracts converting lisable data to card grids
 */

import styled from '@emotion/styled'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Post } from '../dao'
import testPost from '../dev/TestPost'
import { useFirebaseDao } from '../firebase/FirebaseDaoContextProvider'
import FancyCard from './FancyCard'
import PostCard from './common/PostCard'

type FancyCardGridProps = DefaultFancyCardGridProps | DebugFancyCardGridProps

interface DefaultFancyCardGridProps {
    debugMode?: false,
}

interface DebugFancyCardGridProps {
    debugMode: true,
    cardQuantity: number,
}

const PerspectiveGrid = styled(Grid)`
    perspective: 1000px;
`

const FancyCardGrid = (props: FancyCardGridProps) => {
    if(props?.debugMode) {
        return (
            <DebugFancyCardGridProps {...props}/>
        )
    } else {
        return (
            <DefaultFancyCardGrid {...props}/>
        )
    }
}

// TODO: Alter debug mode to wrap default and inject sample data for offline development
const DebugFancyCardGridProps = ({cardQuantity}: DebugFancyCardGridProps) => {
    return (
        <Grid container spacing={2} my={0.5}>
            {Array(cardQuantity).fill(
                <PerspectiveGrid item>
                    <PostCard post={new Post('Local Test Post', 'test category', {content: 'Test post text', title: 'Local Test Post', tags: []})}/>
                </PerspectiveGrid>
            )}
        </Grid>
    )
}

const DefaultFancyCardGrid = (props: DefaultFancyCardGridProps) => {
    const {firebaseDao} = useFirebaseDao()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        firebaseDao?.getPosts().then(posts => setPosts(posts))
    }, [firebaseDao])

    useEffect(() => {
        console.log(posts)
    }, [posts])

    return (
        <Grid container spacing={2} my={0.5}>
            {posts && posts.map(post => (
                <PerspectiveGrid>
                    <PostCard post={post}/>
                </PerspectiveGrid>
            ))}
        </Grid>
    )
}

export default FancyCardGrid