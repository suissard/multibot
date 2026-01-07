#!/bin/bash

# Script pour générer et servir la documentation localement
# Prérequis : Node.js et (Docker OU Jekyll/Ruby)

echo "--- Mise à jour de la documentation ---"
node docs/generate_docs.js

echo "--- Démarrage du serveur de documentation ---"

# Fonction pour ouvrir le navigateur (optionnel/cross-platform basique)
open_browser() {
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:4000
    elif command -v open &> /dev/null; then
        open http://localhost:4000
    fi
}

# Vérifier si Docker est disponible
if command -v docker &> /dev/null; then
    echo "Docker détecté."
    
    USE_SUDO=""
    if ! docker info > /dev/null 2>&1; then
        echo "Permissions Docker insuffisantes. Tentative avec sudo..."
        USE_SUDO="sudo"
    fi

    # Nettoyage préventif : on arrête tout conteneur qui utiliserait le port 4000
    echo "Vérification des ports..."
    CONTAINER_ID=$($USE_SUDO docker ps -q --filter "publish=4000")
    if [ ! -z "$CONTAINER_ID" ]; then
        echo "Arrêt du conteneur existant sur le port 4000 ($CONTAINER_ID)..."
        $USE_SUDO docker stop $CONTAINER_ID
    fi

    echo "La documentation sera accessible sur http://localhost:4000"
    
    # On lance le navigateur après quelques secondes en arrière-plan
    (sleep 5 && open_browser) &

    # Commande Docker pour installer les dépendances et servir
    $USE_SUDO docker run --rm \
      --volume="$PWD/docs:/srv/jekyll" \
      -p 4000:4000 \
      jekyll/jekyll:latest \
      /bin/bash -c "chmod 777 /srv/jekyll/Gemfile.lock 2>/dev/null; bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"

elif command -v jekyll &> /dev/null; then
    echo "Jekyll local détecté."
    cd docs
    echo "Installation des dépendances..."
    bundle install
    
    (sleep 3 && open_browser) &
    
    echo "Lancement du serveur..."
    bundle exec jekyll serve --livereload
else
    echo "ERREUR : Impossible de lancer le serveur de documentation."
    echo "Veuillez installer Docker (recommandé) ou Ruby+Jekyll."
    echo "Documentation pour Docker : https://docs.docker.com/get-docker/"
    exit 1
fi
