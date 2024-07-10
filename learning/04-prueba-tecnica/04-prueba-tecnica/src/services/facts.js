const CAT_FACTS_URL = 'https://catfact.ninja/fact'

/*
export const getRandomCatFact = () =>{
   
    fetch(CAT_FACTS_URL)
    .then((res) => res.json())
    .then((data) => {
        const {fact} = data // Descromprime el objeto
        return fact
    })
}
*/

//TO REMEMBER:
// ASYNC FUNCTIONS ALWAYS RETURN A PROMISE
export const getRandomCatFact = async () => {
    const res = await fetch(CAT_FACTS_URL);
    const data = await res.json();
    const {fact} = data;
    return fact
}
