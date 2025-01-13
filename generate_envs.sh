#!/bin/bash

# Fonction pour générer le fichier env.yaml
generate_env_yaml() {
  local env_file=$1
  local output_file=$2

  # Vérifier si le fichier .env existe
  if [ ! -f "$env_file" ]; then
    echo "Le fichier $env_file n'existe pas. Abandon."
    exit 1
  fi

  echo "Génération de $output_file à partir de $env_file"

  # Commencer à écrire dans le fichier YAML
  echo "# Fichier généré automatiquement" >$output_file

  # Lire le fichier .env ligne par ligne et ajouter les variables au fichier YAML
  while IFS= read -r line; do
    # Ignorer les commentaires et les lignes vides
    if [[ "$line" =~ ^[[:space:]]*# || -z "$line" ]]; then
      continue
    fi

    # Extraire le nom de la variable et sa valeur
    var_name=$(echo $line | cut -d '=' -f 1)
    var_value=$(echo $line | cut -d '=' -f 2-)

    # Ajouter la variable au fichier YAML
    echo "$var_name: \"$var_value\"" >>$output_file
  done <"$env_file"
}

# Générer le fichier env.yaml pour le dossier client
generate_env_yaml "./client/.env" "./client/env.yaml"

# Générer le fichier env.yaml pour le dossier auth
generate_env_yaml "./auth/.env" "./auth/env.yaml"

# Générer le fichier env.yaml pour le dossier api-gateway
generate_env_yaml "./api-gateway/.env" "./api-gateway/env.yaml"

echo "Fichiers env.yaml générés avec succès."
