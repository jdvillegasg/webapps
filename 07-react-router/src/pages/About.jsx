import { Link } from "../Link.jsx";

const i18n = {
  es: {
    title: "Sobre nosotros",
    button_text: "Ir a la pagina principal",
    description:
      "Este es un clon de React router creado por Midudev y transcrito por Julian",
  },
  en: {
    title: "About us",
    button_text: "Go to home page",
    description:
      "This is a React Router clon created by Midudev and trascripted by Julian",
  },
};

function useI18n(lang) {
  return i18n[lang] || i18n.en;
}

export default function AboutPage({ routeParams }) {
  console.log(routeParams);
  const thisi18n = useI18n(routeParams.lang ?? "es");

  return (
    <>
      <h1>{thisi18n.title}</h1>
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg"
          alt="midudev photo"
        ></img>
      </div>
      <p>{thisi18n.description}</p>
      <Link to="/">{thisi18n.button_text}</Link>
    </>
  );
}
