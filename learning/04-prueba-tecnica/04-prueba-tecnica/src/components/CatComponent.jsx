import { useCatImg } from '../hooks/useCatImg.js'

export function CatComponent() {
    const {catImageUrl} = useCatImg ({factState: 'cat'})
    console.log(catImageUrl)
    return (
        <>
         {catImageUrl && <img src={catImageUrl} alt='Pictures of cats'></img>}
        </>
    )
}