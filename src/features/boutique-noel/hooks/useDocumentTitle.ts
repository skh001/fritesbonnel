import { useEffect } from 'react';

/** Met à jour le titre de l'onglet, puis restaure le titre du site en quittant la page */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Frites Bonnel`;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
