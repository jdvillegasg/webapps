import {useState} from 'react'  // this is a hook (like an utility)

export function TwitterFollowCard ({children, functionOnName, personName, username, initialIsFollowing}) {
  //children is a RESERVED PARAMETER in React

  const initialFollowingState = initialIsFollowing ? "Siguiendo" : "Seguir"

  // useState can be initialized with a string also or other things
  // initial state of useState is set only once
  const [followingState, setFollowingState] = useState(initialFollowingState);
  const[hoverCssClassState, setHoverCssClassState] = useState("tw-follow-card-button");
  const follow_text = followingState;
  
  const setFollowTextClick = (event) => {

    switch (event.type) {
      case 'click':
        switch (followingState) {
          case 'Seguir':
            setFollowingState("Siguiendo");
            setHoverCssClassState("tw-follow-card-button");
            break;
          case 'Dejar de seguir':
            setFollowingState("Seguir");
            setHoverCssClassState("tw-follow-card-button-2");
            break;
          default:
            console.warn('Unknown event');
        }
        break;
      case 'mouseenter':
        switch (followingState) {
          case 'Seguir':
            setHoverCssClassState("tw-follow-card-button-2");
            break;
          case 'Siguiendo':
            setFollowingState("Dejar de seguir");
            setHoverCssClassState("tw-follow-card-button");
            break;
          default:
            console.warn('Unknown event');
        }
        break;
      case 'mouseleave':
        switch (followingState) {
          case 'Dejar de seguir':
            setFollowingState("Siguiendo");
            setHoverCssClassState("tw-follow-card-button");
            break;
          default:
            console.warn('Unknown event');
        }
        break;
      default:
        console.log('Unknown event');
    }
    
  }


  const imgSrc = "https://unavatar.io/kikobeats"
  
  return (
      <article className='tw-follow-card'>
        <header className='tw-follow-card-header'>
          <img className='tw-follow-card-img' alt="Un avatar" src={imgSrc}>
          </img>
          <div className='tw-follow-card-container'>
            <strong>{personName} - {children}</strong>
              <span className='tw-follow-card-info'>
                {functionOnName(username)}
              </span>
          </div>
        </header>
        <aside>
          <button className={hoverCssClassState}
                  onClick={(e) =>{setFollowTextClick(e)}}
                  onMouseEnter={(e) =>{setFollowTextClick(e)}}
                  onMouseLeave={(e) =>{setFollowTextClick(e)}}
          >
            {follow_text}
          </button>
        </aside>
      </article>    
  )
}