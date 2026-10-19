# Exercices

1. Créer une nouvelle page index.html et intégrer un script à cette page.
2. Rajouter un bouton "Click me".
3. Ajouter un event listener sur le click du bouton,
4. Au click sur le bouton Rajouter un log "Hello world", puis une alert qui affiche "Hello world",
5. Rajouter une fonction qui va fetch l'api suivante : `https://www.googleapis.com/books/v1/volumes`
6. Rajouter la clé d'api suivante au get pour que ça fonctionne : `AIzaSyAAU-Fg7X8gopwftnbTfpLvCPxjQIgHzk0`. Vous pouvez logger la réponse pour voir comment la data est faite. Appellez cette fonction au clique du bouton.
7. Sortez le fetch du listener du clique pour charger les livres directement au chargement du script.
8. Affichez la liste des livres dans une liste en HTML en manipulant le dom
9. Au clique sur le bouton "Click me", ajoutez à la fin de la liste les livres suivant (le retour de l'api est paginé, voir la doc : <https://developers.google.com/books/docs/v1/using#pagination>)
