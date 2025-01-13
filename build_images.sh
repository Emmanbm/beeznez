#!/bin/bash

# Générer les environnements
bash generate_envs.sh || {
    echo "❌ Failed to generate yaml envs"
    exit 1
}

# Construire les images
docker compose -f docker-compose.prod.yml build || {
    echo "❌ Docker build failed"
    exit 1
}

# Liste des services, registres, et ports
declare -A SERVICES
SERVICES=(["auth"]="8081" ["api-gateway"]="3000" ["client"]="80")
REGISTRY="europe-west9-docker.pkg.dev/beeznez-446307/beeznez"

# Étiqueter et pousser les images
for SERVICE in "${!SERVICES[@]}"; do
    IMAGE="beeznez-$SERVICE"
    TAG="$REGISTRY/$SERVICE:latest"
    PORT="${SERVICES[$SERVICE]}"

    echo "Tagging $IMAGE as $TAG"
    docker tag "$IMAGE" "$TAG" || {
        echo "❌ Failed to tag $IMAGE"
        exit 1
    }

    echo "Pushing $TAG"
    docker push "$TAG" || {
        echo "❌ Failed to push $TAG"
        exit 1
    }

    echo "Deploying $SERVICE to europe-west9"
    gcloud run deploy "$SERVICE" \
        --image="$TAG" \
        --platform=managed \
        --region=europe-west9 \
        --allow-unauthenticated \
        --env-vars-file "$SERVICE"/env.yaml \
        --port="$PORT" || {
        echo "❌ Failed to deploy $SERVICE to europe-west9"
        exit 1
    }

    echo "Deploying $SERVICE to europe-west1"
    gcloud run deploy "$SERVICE" \
        --image="$TAG" \
        --platform=managed \
        --region=europe-west1 \
        --allow-unauthenticated \
        --env-vars-file "$SERVICE"/env.yaml \
        --port="$PORT" || {
        echo "❌ Failed to deploy $SERVICE to europe-west1"
        exit 1
    }
done
echo "✅ Everything is OK"
