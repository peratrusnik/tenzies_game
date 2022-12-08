import React from "react"
import ConfettiApp from 'react-confetti'


const Confetti = () => {
    const [windowDimension, setDimension] = React.useState({ width: window.innerWidth, height: window.innerHeight })
    const detectSize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }
    React.useEffect( () => {
      window.addEventListener('resize', detectSize)
      return () => {
        window.removeEventListener('resize', detectSize)
      }
    }, [windowDimension])
    return (
        <>
            <ConfettiApp width={windowDimension.width} height={windowDimension.height} tweenDuration={1000} />
        </>
        
    )
}
  
export default Confetti