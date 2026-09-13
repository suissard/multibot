#!/bin/bash

# Script pour générer et servir la documentation localement
# Prérequis : Node.js (avec Docker ou serveur Node intégré)

echo "--- Mise à jour de la documentation ---"
node docs/generate_docs.js

echo "--- Démarrage du serveur de documentation ---"

open_browser() {
    local target_url="http://localhost:4000/multibot/"
    if command -v xdg-open &> /dev/null; then
        xdg-open "$target_url"
    elif command -v open &> /dev/null; then
        open "$target_url"
    fi
}

# Mode 1 : Si Docker est disponible et utilisable
if command -v docker &> /dev/null && (docker info > /dev/null 2>&1 || sudo -n docker info > /dev/null 2>&1); then
    echo "Docker détecté et opérationnel."
    
    USE_SUDO=""
    if ! docker info > /dev/null 2>&1; then
        USE_SUDO="sudo"
    fi

    # Nettoyage préventif sur le port 4000
    CONTAINER_ID=$($USE_SUDO docker ps -q --filter "publish=4000")
    if [ ! -z "$CONTAINER_ID" ]; then
        echo "Arrêt du conteneur existant sur le port 4000 ($CONTAINER_ID)..."
        $USE_SUDO docker stop $CONTAINER_ID
    fi

    echo "La documentation sera accessible sur http://localhost:4000/multibot/"
    (sleep 4 && open_browser) &

    $USE_SUDO docker run --rm \
      --volume="$PWD/docs:/srv/jekyll" \
      -p 4000:4000 \
      jekyll/jekyll:latest \
      /bin/bash -c "chmod 777 /srv/jekyll/Gemfile.lock 2>/dev/null; bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"

# Mode 2 : Si Jekyll est installé directement en local
elif command -v jekyll &> /dev/null; then
    echo "Jekyll local détecté."
    cd docs
    bundle install
    (sleep 3 && open_browser) &
    bundle exec jekyll serve --livereload

# Mode 3 : Serveur léger Node.js intégré (Ultra-rapide, 0 dépendance externe)
else
    echo "Lancement via le serveur Node.js rapide (sans Docker ni Ruby requis)..."
    (sleep 2 && open_browser) &
    node docs/preview_server.js
fi
