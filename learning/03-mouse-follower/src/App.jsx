import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabledState, setEnabledState] = useState(false);
  const [positionState, setPostitionState] = useState({x:0, y:0});
  useEffect(() => {
    const handleMove = (event) => {
      
      const {clientX, clientY} = event
      setPostitionState({x:clientX, y:clientY});
    }
    
    if (enabledState) {
      window.addEventListener("mousemove", handleMove);
    }

    // Clean the subsciption 
    // When the component is unmounted
    // when the dependencies change
    return () => {
      window.removeEventListener("mousemove", handleMove);
    }
  }, [enabledState])

  return (
    <>
     <div style={{
      position: 'absolute',
      top: -20,
      left: -20,      
      width: 40,
      height: 40,
      pointerEvents: 'none',
      backgroundColor: '#08f',
      borderRadius: '50%',
      opacity: 0.8,      
      transform: `translate(${positionState.x}px, ${positionState.y}px)`
     }}>

     </div>
     <button onClick={() => setEnabledState(!enabledState)}>
      {enabledState? 'Desactivar': 'Activar'} seguir puntero
     </button>
    </>
  )
}

function App() {
  const [mountedState, setMountedState] = useState(true);

  return (
    <main>
      {mountedState && <FollowMouse></FollowMouse>}
      <button onClick={()=>setMountedState(!mountedState)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
    
  )  
}

export default App
