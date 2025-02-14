import { Card, CardHeader } from '@mui/material'
import { MouseEvent, ReactNode, useContext, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { MouseContext, MousePosition } from '../context/MouseContextProvider'
import CardRotation from '../objects/CardRotation'

export interface FancyCardProps {
    // Child node
    children: ReactNode
    // Card width defaults to 275
    width?: number
    // Card height defaults to 385
    height?: number
}

/** 
 * The base card component for the portfolio allows cards to interact with mouse position and device orientation
 */
const FancyCard = ({children, width = 275, height = 385}: FancyCardProps) => {
    const [localPos, setLocalPos] = useState<MousePosition>({x: 0, y: 0})
    const [hover, setHover] = useState<boolean>(false)
    const [currentRotation, setCardRotation] = useState<CardRotation>(new CardRotation())
    const [{xRotation: prevX, yRotation: prevY, zRotation: prevZ}, setPrevRotation] = useState<CardRotation>(new CardRotation())
    const animationRef = useRef(null)

    let {xRotation, yRotation, zRotation} = currentRotation

    const animationDuration = 10
    const defaultRoatation = new CardRotation()

    const defaultStyle = {
        transition: `transform ${animationDuration}ms ease-in-out`,
    }

    const transitionStyles = {
        entering: { transform: `${prevX} ${prevY} ${prevZ}` },
        entered: { transform: `${xRotation} ${yRotation} ${zRotation}` },
        exiting: { transform: `${xRotation} ${yRotation} ${zRotation}` },
        exited: { transform: `${defaultRoatation.xRotation} ${defaultRoatation.yRotation} ${defaultRoatation.zRotation}` },
        unmounted: { transform: `${defaultRoatation.xRotation} ${defaultRoatation.yRotation} ${defaultRoatation.zRotation}` }
    }

    const handleMouseMove = (event:MouseEvent<HTMLDivElement>) => {
        setLocalPos(prev => ({
            ...prev,
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY
        }))

        setPrevRotation(currentRotation)

        let newRotation = generateRotation(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
        setCardRotation(newRotation)
    }

    const generateRotation = (offsetX: number, offsetY: number) => {
        if (hover) {
            const midPointX = width / 2
            const midPointY = height / 2
            return new CardRotation(-1 * (offsetY - midPointY) / midPointY, (offsetX - midPointX) / midPointX, 0, 5)
        } else {
            return new CardRotation()
        }
    }

    const handleMouseHover = (setTo: boolean) => () => {
        setHover(setTo)
    }

    return (
        <Transition nodeRef={animationRef} in={hover} timeout={animationDuration}>
            {state =>
                <Card onMouseMove={handleMouseMove} 
                    onMouseEnter={handleMouseHover(true)} 
                    onMouseLeave={handleMouseHover(false)} 
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                    }}
                    sx={{width: width, height: height}}
                    ref={animationRef}>
                    {children}
                    {/* <CardHeader title={`Local position x:${localPos.x}, y: ${localPos.y}, hover: ${hover}`}></CardHeader>
                    <CardHeader title={`Card rotation ${xRotation} ${yRotation} ${zRotation}`}></CardHeader> */}
                </Card>
            }
        </Transition>
    )
}

export default FancyCard